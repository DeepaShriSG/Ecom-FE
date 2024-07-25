import React, { useState, useCallback } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../common/ApiService";
import Payment from "../common/Payment";
import Table from "react-bootstrap/Table";
import CartModal from "../Containers/CartModal";

function Cart() {
  
  // Cart context hooks
  const { cart, addToCart, updateCart, removeFromCart,
    calculateSubTotal, calculateBagMRP, calculateBagDiscount, shipping, total } = useCart();

  // Hook for navigation
  const navigate = useNavigate();

  // Retrieve user data from session storage
  const userData = sessionStorage.getItem("user");
  let user = userData ? JSON.parse(userData) : null;

  // Handler to update item quantity
  const handleQuantityChange = useCallback((item, newQuantity) => {
    if (newQuantity !== item.quantity) {
      updateCart(item._id, Math.max(newQuantity, 1));
    }
  }, [updateCart]);

  // Handler to remove item from cart
  const handleTrash = useCallback((item) => {
    removeFromCart(item._id);
  }, [removeFromCart]);

  // State for controlling the display of the payment modal
  const [show, setShow] = useState(false);

  // Function to close the payment modal
  const handleClose = () => setShow(false);

  // Function to open the payment modal
  const handleShow = () => setShow(true);

  // Function to handle cart checkout
  const handleCart = async () => {
    try {
      if (!user) {
        toast.error("Please Login or Signup");
        return;
      }
      
      // Open the payment modal
      handleShow();

      // Send cart data to the server
      for (let item of cart) {
        let res = await AxiosService.post("/user/cart", {
          ProductId: item._id,
          quantity: item.quantity,
          price: item.price
        });

        if (res.status === 201) {
          updateCart(item);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Offcanvas cart drawer */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {cart && cart.length > 0 ? (
            cart.map((e) => (
              <div key={e._id} className="cart-item d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img src={`${e.imgurl[0]}`} alt="" className="img-thumbnail" />
                  <div className="ms-3">
                    <h6 className="mb-1">
                      {e.quantity} x {e.ProductTitle}
                    </h6>
                    <p className="mb-0">${e.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* Quantity adjustment buttons */}
                <i className="bi bi-plus-lg mx-2" onClick={() => handleQuantityChange(e, e.quantity + 1)}></i>
                <i className="bi bi-dash-circle mx-2" onClick={() => handleQuantityChange(e, e.quantity - 1)}></i>
                {/* Trash button to remove item */}
                <i className="bi bi-trash3" onClick={() => handleTrash(e)}></i>
              </div>
            ))
          ) : (
            <div className="card p-3 m-3 text-center">
              <div className="card-body m-3">
                <p className="card-text">Your cart is empty.</p>
                <button type="button" className="btn btn-dark" onClick={() => navigate("/collection")}>
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
          {/* Cart summary table */}
          <div className="card">
            <Table responsive="md">
              <tfoot>
                <tr>
                  <td colSpan="5" className="text-end">
                    <strong>Bag-MRP</strong>
                  </td>
                  <td className="text-end">₹{calculateBagMRP.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="text-end">
                    <strong>Bag Discount</strong>
                  </td>
                  <td className="text-end">₹{calculateBagDiscount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="text-end">
                    <strong>Shipping</strong>
                  </td>
                  <td className="text-end">₹{shipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td className="text-end">₹{total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>

        {/* Cart action buttons */}
        <div className="cart-buttons mt-4 d-flex justify-content-between">
          <button type="button" className="btn btn-light" onClick={() => navigate("/tablecart")}>
            VIEW CART
          </button>
          <button type="button" className="btn btn-dark" onClick={handleCart}>
            CHECKOUT
          </button>
        </div>
      </div>

      {/* Payment modal */}
      <Payment show={show} handleClose={handleClose} />
    </>
  );
}

export default Cart;
