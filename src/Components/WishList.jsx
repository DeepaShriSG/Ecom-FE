import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDataContext, { ProductDataCxt } from "../Context/ProductDataContext";
import Card from "../Containers/Card";
import Loading from "../Containers/Loading";

function WishList() {
  // Access the product data from context
  const Productdata = useContext(ProductDataCxt);
  
  // Retrieve location data using React Router's useLocation hook
  const location = useLocation();
  
  // State to hold the filtered product data
  const [data, setData] = useState([]);
  
  // Extract the category from location state if available
  const category = location.state?.category; // Adjust based on how the category is passed in location.state

  useEffect(() => {
    // Check if a category is specified in the location state
    // Filter products based on the category if provided, otherwise show all products
    const filteredData = category 
      ? Productdata.filter((item) => item.category === category) 
      : Productdata;

    // Update the state with the filtered or complete product list
    setData(filteredData);
  }, [Productdata, category]); // Dependency array ensures effect runs when Productdata or category changes

  return (
    <>
      <div className="w-100">
        <div className="row">
          <div className="container">
            <section>
              <h1>Products</h1>
              <div className="container text-center m-auto">
                <div className="row">
                  {/* Render Card components with the filtered product data */}
                  <Card data={data} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
