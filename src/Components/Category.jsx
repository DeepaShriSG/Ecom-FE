import React from "react";
import { useNavigate } from "react-router-dom";

function Category() {
  // Hook for navigation
  const navigate = useNavigate();

  // Sample data for categories
  const data = [
    {
      id: 1,
      imgurl: "/category-1.png",
      ProductTitle: "SKINCARE",
      path: "/collection",
    },
    {
      id: 2,
      imgurl: "/category-2.png",
      ProductTitle: "BODYLOTION",
      path: "/collection",
    },
    {
      id: 3,
      imgurl: "/category-3.png",
      ProductTitle: "NAILPOLISH",
      path: "/collection",
    },
  ];

  // Function to handle navigation on card click
  const handleClick = (item) => {
    if (item._id) {
      navigate(`/productInfo/${item._id}`); // Navigate to product details if `_id` exists
    } else {
      navigate(item.path, { state: { category: item.ProductTitle } }); // Navigate to category page with state
    }
  };

  return (
    <section>
      <div className="container-fluid p-2 m-2">
        <div className="row justify-content-evenly align-items-center">
          <h3 className="text-center title p-3">Choose Your Type</h3>
          <div className="row justify-content-center">
            {data.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 my-2 d-flex justify-content-center">
                <div
                  className="card"
                  style={{ width: "25rem" }}
                  onClick={() => handleClick(item)} // Handle click event
                >
                  <img
                    src={item.imgurl}
                    alt="category"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <button type="button">{item.ProductTitle}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
