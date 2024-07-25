import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import ProductDataContext, { ProductDataCxt } from "../Context/ProductDataContext";
import BreadCrumbs from "../Containers/BreadCrumbs";
import AxiosService from "../common/ApiService";
import Sidebar from "../Containers/Sidebar";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  // Context for product data
  const Productdata = useContext(ProductDataCxt);

  // State for storing orders and product details
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to fetch order data and product details
  const fetchData = async () => {
    try {
      // Fetch user data (including orders) from API
      let res = await AxiosService.get("/user/userId");
      console.log(res);

      if (res.status === 200) {
        // Set orders state with user orders
        setOrders(res.data.user.MyOrders);

        // Create a mapping of product IDs to product details
        const productMap = Productdata.data.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});

        console.log(productMap);
        
        // Set product details state
        setProductDetails(productMap);
      } else {
        // Clear orders if response status is not 200
        setOrders([]);
      }
    } catch (error) {
      // Show error message if fetching fails
      toast.error("Failed to fetch order data.");
    }
  };

  // Fetch data when component mounts or product data changes
  useEffect(() => {
    fetchData();
  }, [Productdata]);

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          <BreadCrumbs />
        </div>
        <div className="container-fluid login-content p-3">
          <div className="row justify-content-between align-items-center text-center m-2">
            <div className="col-lg-3 col-md-3 col-12 p-2">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-9 col-12 p-2">
              <h3>My Orders</h3>
              {orders.length === 0 ? (
                <div className="card p-3 m-3 text-center">
                  <div className="card-body m-3">
                    <p className="card-text">Enjoy your first order with exciting offers.</p>
                    <button type="button" className="btn btn-dark" onClick={() => navigate("/collection")}>
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card">
                  {/* Render each order */}
                  {orders.map(order => (
                    <div key={order._id} className="order-card p-3 m-3">
                      <h5>Order ID: {order._id}</h5>
                      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <Table responsive="md">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Model</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Render each product in the order */}
                          {order.products.map(product => {
                            // Get product details from state
                            const productDetail = productDetails[product.product];
                            const itemTotal = productDetail ? productDetail.price * product.quantity : 0;

                            return productDetail ? (
                              <tr key={product.product}>
                                <td>
                                  {/* Product image */}
                                  <img src={productDetail.imgurl[0] || ""} alt="" className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                                </td>
                                <td>{productDetail.ProductTitle}</td>
                                <td>{productDetail.ProductCode}</td>
                                <td>{product.quantity}</td>
                                <td>${productDetail.price}</td>
                                <td>${itemTotal.toFixed(2)}</td>
                              </tr>
                            ) : null;
                          })}
                        </tbody>
                      </Table>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
