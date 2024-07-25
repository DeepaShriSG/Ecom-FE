import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to potentially handle routing-related logic if needed
import BreadCrumbs from "../Containers/BreadCrumbs"; // Import BreadCrumbs component for navigation
import Sidebar from "../Containers/Sidebar"; // Import Sidebar component for navigation

function Success() {

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          <BreadCrumbs /> {/* Display breadcrumbs for navigation */}
        </div>
        <div className="container-fluid login-content p-3">
          <div className="row justify-content-between align-items-center text-center m-2">
            <div className="col-lg-3 col-md-3 col-12 p-2">
              <Sidebar /> {/* Display sidebar for navigation */}
            </div>
            <div className="col-lg-9 col-md-9 col-12 p-2">
              <>
                <h1>
                  Order Confirmation <i className="bi bi-patch-check-fill"></i>
                </h1>
                <p>
                  Thank you for your purchase! Your order has been placed successfully.
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
