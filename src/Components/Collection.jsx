import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDataContext, { ProductDataCxt } from "../Context/ProductDataContext";
import Navbar from "./Navbar";
import Card from "../Containers/Card";
import Footer from "./Footer";
import Loading from "../Containers/Loading";

function Collection() {
  // Access product data from context
  // const Productdata = useContext(ProductDataCxt);
  const { data, setQuantity } = useContext(ProductDataCxt);
  console.log(data)

  // Get location state from the router (used for category filtering)
  const location = useLocation();
  const { category } = location.state || {};
  
  // State to store the filtered product data
  const [productdata, setproductData] = useState([]);

  // Effect to filter products based on the selected category
  useEffect(() => {
    const filteredData = category ? data.filter((item) => item.category === category) : data;

    setproductData(filteredData);
  }, [data, category]); // Dependencies: Productdata and category

  return (
    <>
      <div className="w-100">
        <div className="row">
          <div className="container">
            <section>
              <h1>Products</h1>
              <div className="container text-center m-auto">
                <div className="row">
                  <Card data={productdata} /> {/* Render cards with filtered product data */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collection;
