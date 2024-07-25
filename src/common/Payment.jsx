import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AxiosService from "../common/ApiService";

function Payment({ show, handleclose }) {
  // Retrieve cart details and total from CartContext
  const { cart, total } = useCart();
  
  // Local state to manage form submission status
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  
  // Retrieve user information from sessionStorage
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  
  // Retrieve cart data from sessionStorage
  const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");

  // Function to handle payment process
  const handlePayment = async () => {
    setSubmit(true); // Set submit state to true to disable buttons during submission
    try {
      // Make a POST request to the checkout endpoint
      const res = await AxiosService.post("/user/checkout", {
        cart: cartData,
        price: total,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address
      });

      if (res.status === 200) {
        // On successful response, remove cart from sessionStorage
        sessionStorage.removeItem('cart');
        
        // Redirect the user to the payment URL
        const { url } = res.data;
        window.location.href = url;
        
        // Close the modal
        handleclose();
      }
    } catch (error) {
      // Log error and show toast notification on failure
      console.log(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      // Reset submit state to false after the operation is complete
      setSubmit(false);
    }
  };

  return (
    <Modal show={show} onHide={handleclose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {/* Display cart items if available */}
          {cart && cart.length > 0 ? (
            cart.map((e) => (
              <div key={e._id} className="cart-item d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <img src={e.imgurl[0] || "default-image-url"} alt={e.ProductTitle} className="img-thumbnail" />
                  <div className="ms-3">
                    <h6 className="mb-1">{e.quantity} x {e.ProductTitle}</h6>
                    <p className="mb-0">${e.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-end">${(e.price * e.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
          {/* Display total price */}
          <div className="d-flex justify-content-end">
            <h5>Total: ₹{total.toFixed(2)}</h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Cancel button to close the modal */}
        <Button variant="light" onClick={handleclose} disabled={submit}>
          Cancel
        </Button>
        {/* Pay button to initiate the payment process */}
        <Button variant="dark" onClick={handlePayment} disabled={submit}>
          Pay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Payment;
