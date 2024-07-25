import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductDataCxt } from "../Context/ProductDataContext";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

function Card() {

  const { data, setQuantity } = useContext(ProductDataCxt);
  console.log(data)
 
  const { addToCart} = useCart();
  
  const navigate = useNavigate();

  // Local state to manage quantity for each product
  const [localQuantities, setLocalQuantities] = useState(
    data.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );

  
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    setQuantity(id, quantity);
    setLocalQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleClick = (e) => {
    if (e._id) {
      navigate(`/productInfo/${e._id}`);
    }
  };

  const handleEdit = (e) => {
    if (e._id) {
      navigate(`/editProduct/${e._id}`);
    }
  };

  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const addToCartHandler = (product) => {
    const quantity = localQuantities[product._id] || 1;
    addToCart({ ...product, quantity });
    toast.success("Product Added to cart");
  };

  return (
    <>
      {data &&
        data.map((e) => (
          <div className="card col-lg-3 mx-auto my-3 p-3 position-relative" style={{ width: "18rem" }} key={e._id}>
            {e.stock !== 0 ? (
              <>
              <img
              src={`${e.imgurl[0]}`}
              className="card-img-top w-100"
              alt={`${e.ProductTitle}`}
              onClick={() => handleClick(e)}
            />
            <div className="card-body" onClick={() => handleClick(e)}>
              <span className="d-flex text-center justify-content-center align-items-center"><p className="p-2"><del>${e.price * 1.5}</del></p>
              <p className="p-2">${e.price}</p></span>
              <h5>{e.ProductTitle}</h5>
            </div>
            </>
            ) : (
              <>
                <img
                  src={`${e.imgurl[0]}`}
                  className="card-img-top w-100"
                  alt={`${e.ProductTitle}`}
                />
                <div className="card-body">
                  <p>₹{e.price}</p>
                  <h5>{e.ProductTitle}</h5>
                </div>

                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-gradient bg-opacity-75">
                <p className="m-0">Out of Stock</p>
              </div>
              </>
            )}

            {user?.role !== "admin" && e.path !== "/collection" && e.stock !== 0 && (
              <div className="Product-Quantity m-3 text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <label htmlFor={`quantity-${e._id}`} className="mx-2">
                    Qty:
                  </label>
                  <span className="d-flex justify-content-center align-items-center">
                    <input
                      type="number"
                      id={`quantity-${e._id}`}
                      className="form-control"
                      value={localQuantities[e._id] || 1}
                      onChange={(event) => handleQuantityChange(e._id, parseInt(event.target.value))}
                      min="1"
                      style={{
                        width: "70px",
                        height: "calc(1.5em + .75rem + 2px)",
                        padding: ".375rem .75rem",
                      }}
                    />
                  </span>
                  <i
                    className="fa-solid fa-cart-shopping m-2"
                    onClick={() => addToCartHandler(e)}
                    type="button"
                  ></i>
                </div>
              </div>
            )}

            {user?.role === "admin" && e.path !== "/collection" && (
              <button type="button" className="m-2 btn btn-dark" onClick={() => handleEdit(e)}>
                <i className="bi bi-pencil-square"></i>
              </button>
            )}
          </div>
        ))}
    </>
  );
}

export default Card;
