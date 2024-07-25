import React, { useState, useEffect, useCallback } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import BreadCrumbs from "./BreadCrumbs";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import CartModal from "../Containers/CartModal";
import Payment from "../common/Payment";

function TableCart() {
  // Destructure cart-related functions and data from CartContext
  const { cart, addToCart, updateCart, removeFromCart, clearCart, calculateSubTotal, calculateBagMRP, calculateBagDiscount, shipping, total } = useCart();
 
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Memoized callback for handling quantity change in the cart
  const handleQuantityChange = useCallback((item, newQuantity) => {
    if (newQuantity !== item.quantity) {
      // Ensure quantity is at least 1
      updateCart(item._id, Math.max(newQuantity, 1));
    }
  }, [updateCart]);

  // Memoized callback for handling item removal from the cart
  const handleTrash = useCallback((item) => {
    removeFromCart(item._id);
  }, [removeFromCart]);

  // Retrieve user data from session storage
  let userData = sessionStorage.getItem("user");
  let user = userData ? JSON.parse(userData) : null;

  // State to control the visibility of the payment modal
  const [show, setShow] = useState(false);
  
  // Handler to close the payment modal
  const handleclose = () => setShow(false);
  
  // Handler to show the payment modal
  const handleShow = () => setShow(true);

  // Handler for checking out the cart
  const handleCart = async () => {
    try {
      if (!user) {
        // If no user is logged in, prompt to login or signup
        toast.error("Please Login or Signup");
        return;
      }
      
      // Show the payment modal
      handleShow();

      // Iterate through cart items and make API calls to process each item
      for (let item of cart) {
        let res = await AxiosService.post("/user/cart", {
          ProductCode: item.ProductCode,
          quantity: item.quantity,
        });

        if (res.status === 201) {
          console.log(user)
        }
      }
    } catch (error) {
      // Log any errors encountered during the API request
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="container-fluid login-content p-3">
          <div className="row justify-content-between align-items-center text-center m-2">
            <div className="col-lg-3 col-md-3 col-12 p-2">
              {/* Render sidebar */}
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-9 col-12 p-2">
              <h3>Cart</h3>
              {cart && cart.length === 0 ? (
                // Display message if the cart is empty
                <div className="card p-3 m-3 text-center">
                  <div className="card-body m-3">
                    <p className="card-text">Your cart is empty.</p>
                    <button type="button" className="btn btn-dark" onClick={() => navigate("/collection")}>
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                // Display cart table if there are items in the cart
                <div className="card">
                  <Table responsive="md">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Model</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((e) => {
                        // Calculate total price for each item
                        const itemTotal = e.price * e.quantity;
                        return (
                          <tr key={e._id} colSpan="6">
                            <td>
                              <img src={`${e.imgurl[0]}`} alt="" className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                            </td>
                            <td>{e.ProductTitle}</td>
                            <td>{e.ProductCode}</td>
                            <td>
                              <span className="d-flex justify-content-center align-items-center">
                                {/* Input for quantity with increment and decrement controls */}
                                <input
                                  type="number"
                                  id="quantity"
                                  className="form-control"
                                  value={e.quantity}
                                  onChange={(event) => handleQuantityChange(e, parseInt(event.target.value))}
                                  min="1"
                                  style={{
                                    width: "70px",
                                    height: "calc(1.5em + .75rem + 2px)",
                                    padding: ".375rem .75rem",
                                  }}
                                />
                                <i className="bi bi-plus-lg mx-2" onClick={() => handleQuantityChange(e, e.quantity + 1)}></i>
                                <i className="bi bi-dash-circle mx-2" onClick={() => handleQuantityChange(e, e.quantity - 1)}></i>
                              </span>
                            </td>
                            <td>${e.price}</td>
                            <td>${itemTotal.toFixed(2)}</td>
                            <td>
                              <i className="bi bi-trash3" onClick={() => handleTrash(e)}></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      {/* Display summary of cart totals */}
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
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="m-2 btn btn-dark" onClick={() => navigate("/collection")}>
                      Continue Shopping
                    </button>
                    <button type="button" className="m-2 btn btn-dark" onClick={handleCart}>
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Render Payment modal */}
      <Payment show={show} handleclose={handleclose} />
    </>
  );
}

export default TableCart;
