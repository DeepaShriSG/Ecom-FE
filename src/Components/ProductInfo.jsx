import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductDataCxt } from "../Context/ProductDataContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HCard from "../Containers/HCard";
import Loading from "../Containers/Loading";

function ProductInfo() {
  // Access the product data and setQuantity function from context
  const { data, setQuantity } = useContext(ProductDataCxt);

  // Extract product ID from URL parameters
  const params = useParams();
  const id = params.id;

  // State to store the product information
  const [product, setProduct] = useState(null);

  // Effect to filter and set the selected product based on ID
  useEffect(() => {
    // Find the product with the matching ID
    const filteredProduct = data.filter((e) => e._id === id);
    
    // Update the product state if a matching product is found
    if (filteredProduct.length > 0) {
      setProduct(filteredProduct[0]);
    }
  }, [data, id]); // Dependency array includes data and id

  return (
    <>
      {/* Main container */}
      <div className="w-100">
        {/* Breadcrumb navigation */}
        <div className="row justify-content-center align-items-center text-center">
          <nav
            aria-label="breadcrumb p-0"
            style={{ padding: "0 !important" }}
          >
            <ol
              className="breadcrumb d-flex justify-content-center align-items-center p-5"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              {/* Home link */}
              <li className="breadcrumb-item">
                <Link to="/">
                  <i
                    className="bi bi-house-door-fill"
                    style={{ fontSize: "14px", color: "black" }}
                  ></i>
                </Link>
              </li>
              {/* Shop Now link */}
              <li className="breadcrumb-item">
                <Link to="/shopnow">Shop Now</Link>
              </li>
              {/* Current page link */}
              <li className="breadcrumb-item active" aria-current="page">
                {product ? product.ProductTitle : "Loading..."}
              </li>
            </ol>
          </nav>
        </div>
        {/* Product details or loading indicator */}
        <div className="row justify-content-between align-items-center">
          {product ? <HCard product={product} /> : <Loading />}
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
