import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../Containers/ProfilePic";
import Cart from "./Cart";
import Typed from "typed.js";
import { useCart } from "../Context/CartContext";

function Navbar() {
  // Cart context for managing cart state
  const { cart, clearCart } = useCart();

  // State to manage the search input data
  const [searchData, setSearchData] = useState("");
  
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();
  
  // Ref for the text element in the header that will have animated text
  const ref = useRef();

  // Function to handle user logout
  const logout = () => {
    sessionStorage.clear(); // Clear session storage
    localStorage.clear(); // Clear local storage
    clearCart(); // Clear cart
    navigate("/"); // Navigate to the home page
  };

  // Retrieve token and user data from session storage
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("user");
  let user = userData ? JSON.parse(userData) : null;
  
  // Determine user role
  const userRole = user ? user.role : null;

  // Initialize Typed.js for animated text in the header
  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: ["<span>GET $50 OFF ON YOUR FIRST ORDER</span>", "<span>GET $75 OFF ON YOUR FIRST ORDER</span>"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    });
    return () => {
      typed.destroy(); // Clean up Typed.js instance on component unmount
    };
  }, []);

  // Handle search input and navigate to the shopnow page with search data
  const handleSearch = () => {
    navigate("/shopnow", { state: { searchData } });
  };

  return (
    <>
      <header>
        <div className="w-100 header" data-bs-theme="dark">
          <div className="header-item">
            {/* Animated text */}
            <span className="py-3 mb-0" ref={ref} style={{ fontSize: "14px" }}>
              GET $50 OFF ON YOUR FIRST ORDER
            </span>
          </div>
        </div>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              {/* Brand name linking to home */}
              <a className="navbar-brand text-center" href="/">
                SHALLOW
              </a>
              {/* Navbar toggler for responsive design */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="bi bi-list"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* Conditional rendering of admin links */}
                  {userRole === "admin" ? (
                    <>
                      <li className="nav-item">
                        <a className="nav-link" href="/addProducts">
                          AddProducts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/collection">
                          All Products
                        </a>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </ul>
                <div className="nav-icons d-flex justify-content-center align-items-center">
                  {/* Search form */}
                  <form className="d-flex inputForm" role="search">
                    <div className="search-container">
                      <i className="bi bi-search searchIcon m-2" onClick={handleSearch}></i>
                      <input
                        className="form-control m-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                      />
                    </div>
                  </form>
                  <div className="btn-group">
                    {/* Conditional rendering of user profile or login icon */}
                    {token ? (
                      <ProfilePic />
                    ) : (
                      <i
                        className="me-2 bi bi-person p-3"
                        style={{ fontSize: "30px" }}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                    )}
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a className="nav-link px-3 dropdown-item" href="/login">
                          Register
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link px-3 dropdown-item" href="/accountDetails">
                          My Account
                        </a>
                      </li>
                      {token ? (
                        <li className="nav-item">
                          <a className="nav-link px-3 dropdown-item" href="#" onClick={logout}>
                            Logout
                          </a>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <a className="nav-link px-3 dropdown-item" href="/login">
                            Login
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Cart icon with item count */}
                  <div className="notification-icon">
                    <i className="bi bi-cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                    <span className="count">{cart.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Shopping Cart Component */}
      <Cart />
    </>
  );
}

export default Navbar;
