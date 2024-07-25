import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import BreadCrumbs from "../Containers/BreadCrumbs";
import Sidebar from "../Containers/Sidebar";
import Payment from "./Payment";

function Cancel() {
  // Retrieve the cart data from the CartContext
  const { cart } = useCart();
  
  // Log the cart data to the console for debugging
  console.log(cart);

  // Retrieve the current location object for potential use (e.g., to get query params)
  const location = useLocation();

  // Manage the visibility state of the Payment component
  const [show, setShow] = useState(false);

  // Function to close the Payment modal
  const handleclose = () => setShow(false);

  // Function to open the Payment modal
  const handleShow = () => setShow(true);

  // Retrieve and parse user data from session storage
  const userData = sessionStorage.getItem("user");
  let user = userData ? JSON.parse(userData) : null;

  // Function to handle retrying payment by sending cart items to the server
  const handleCart = async () => {
    try {
      // Check if user is logged in; if not, show an error message
      if (!user) {
        toast.error("Please Login or Signup");
        return;
      }
      
      // Show the Payment modal
      handleShow();

      // Iterate over each item in the cart and send a request to add items back to the user's cart
      for (let item of cart) {
        let res = await AxiosService.post("/user/cart", {
          ProductCode: item.ProductCode,
          quantity: item.quantity,
        });

        // Log the user data if the request is successful
        if (res.status === 201) {
          console.log(user);
        }
      }
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          {/* Render BreadCrumbs component for navigation */}
          <BreadCrumbs />
        </div>
        <div className="container-fluid login-content p-3">
          <div className="row justify-content-between align-items-center text-center m-2">
            <div className="col-lg-3 col-md-3 col-12 p-2">
              {/* Render Sidebar component */}
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-9 col-12 p-2">
              <>
                <h1>
                  Order Cancellation <i className="bi bi-x-circle-fill"></i>
                </h1>
                <p>Your order has been canceled. If you have any questions, please contact our support team.</p>
                <p>If you want to retry payment, click below:</p>
                {/* Button to trigger the retry payment process */}
                <button type="button" className="btn btn-dark" onClick={handleCart}>
                  RETRY PAYMENT
                </button>
              </>
            </div>
          </div>
        </div>
      </div>
      {/* Render Payment component with show and handleclose props */}
      <Payment show={show} handleclose={handleclose} />
    </>
  );
}

export default Cancel;
