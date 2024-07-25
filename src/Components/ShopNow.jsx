import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import ProductDataContext, { ProductDataCxt } from "../Context/ProductDataContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "../Containers/Card";

function ShopNow() {
  // Access product data context
  const Productdata = useContext(ProductDataCxt);

  // Access location state to retrieve search data
  let location = useLocation();
  let { searchData } = location.state || {};

  // Filter products based on search data
  let data = searchData ? (Productdata.filter(product => {
    // Check if any field of the product contains the search term
    for (const key in product) {
      if (Object.prototype.hasOwnProperty.call(product, key)) {
        const value = product[key];
        // If the field value is a string and includes the search term (case-insensitive), include this product
        if (typeof value === "string" && value.toLowerCase().includes(searchData.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  })) : (Productdata); // If no search data, show all products

  return (
    <>
      <div className="container">
        <section>
          <h1>Products</h1>
          <div className="container text-center m-auto">
            <div className="row">
              {/* Render products using the Card component */}
              <Card data={data} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ShopNow;
