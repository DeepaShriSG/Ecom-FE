import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

function HCard({ product }) {

  const [quantity, setQuantity] = useState(1);
  const { addToCart} = useCart();

  let navigate = useNavigate();

  let userData = sessionStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;

  const addToCartHandler = (product) => {
   console.log(product)
    addToCart({ ...product, quantity });
    toast.success("Product Added to cart");
  };


  return (
    <div className="container m-auto" style={{ maxWidth: "1200px" }}>
      <div className="row justify-content-evenly align-items-center">
        <div className="col-6 p-3">
          <img
            src={product.imgurl[1]}
            className="d-block w-100 p-5"
            alt="Product"
            style={{
              width: "500px",  
              height: "500px", 
              objectFit: "cover", 
            }}
          />
        </div>
        <div className="col-6 p-3">
          <div className="description d-grid justify-content-center align-items-center text-center p-3">
            <div className="product-left-title">
              <h1 className="product-title">{product.ProductTitle}</h1>
            </div>
            <ul className="list-unstyled price">
              <li>
                <h2 className="product-price">₹{product.price}</h2>
              </li>
            </ul>
          </div>
          <div className="inner-box-desc">
            <ul className="list-unstyled">
              <li className="brand">
                Brand:
                <a href="#" style={{ color: "#777" }}>
                  {product.brand}
                </a>
              </li>
              <li className="model">
                Product Code:
                <span style={{ color: "#777" }}>{product.ProductCode}</span>
              </li>
              <li className="stock">
                Availability:
                <span style={{ color: "#777" }}>
                  {product.Availability ? "In stock" : "Out Of Stock"}
                </span>
              </li>
            </ul>
          </div>
          <div className="Product-Quantity m-3 text-center">
            <div className="d-flex align-items-center justify-content-center">
              <label htmlFor="quantity" className="mx-2">
                Qty:
              </label>
              <input
                type="number"
                id="quantity"
                className="form-control mx-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                style={{
                  width: "70px",
                  height: "calc(1.5em + .75rem + 2px)",
                  padding: ".375rem .75rem",
                }}
              />
              <button className="btn btn-dark" onClick={() => addToCartHandler(product)}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        <div className="about text-start m-3">
          <h3>Description:</h3>
          <hr />
          <p style={{ fontSize: "18px" }}>{product.description}</p>
          <ul className="list-unstyled">
            <li>Comodous in tempor ullamcorper miaculis</li>
            <li>Pellentesque vitae neque mollis urna mattis laoreet.</li>
            <li>Divamus sit amet purus justo.</li>
            <li>
              Proin molestie egestas orci ac suscipit risus posuere loremou.
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  );
}



export default HCard;
