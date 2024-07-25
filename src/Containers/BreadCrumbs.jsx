import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbs() {
  return (
    
    <nav aria-label="breadcrumb p-0" >
    <ol className="breadcrumb d-flex justify-content-center align-items-center">
      <li className="breadcrumb-item">
        <Link to="/">
          <span>
            <i className="bi bi-house-door-fill" style={{ fontSize: "14px", color: "black" }}></i>
          </span>
        </Link>
      </li>
      <li className="breadcrumb-item">
        <a href="/accounts" >Account</a>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        Login
      </li>
    </ol>
  </nav>
  );
}

export default BreadCrumbs;
