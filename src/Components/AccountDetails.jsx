import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import BreadCrumbs from "../Containers/BreadCrumbs";
import { toast } from "react-toastify";
import Sidebar from "../Containers/Sidebar";

function AccountDetails() {

  // State to manage the submission status
  let [submit, setSubmit] = useState(false);

  // Hook to programmatically navigate users
  let navigate = useNavigate();

  // Retrieve user data from session storage
  const userData = sessionStorage.getItem("user");
  let user = userData ? JSON.parse(userData) : null;

  // State to hold user information
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  // Effect to set user details on component mount
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setPhonenumber(user.phonenumber || "");
      setAddress(user.address || "");
    }else{
      toast.error("Please Login")
    }
  }, [user]);

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          <BreadCrumbs /> {/* Display breadcrumbs for navigation */}
        </div>
        <div className="container login-content">
          <div className="row m-2 p-2 justify-content-between align-items-start text-start">
            <div className="col-12 col-md-4 col-lg-4">
              <Sidebar /> {/* Display sidebar for navigation */}
            </div>
            <div className="col-12 col-md-8 col-lg-8">
              <h2>Account Details</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={email} 
                  placeholder="example@yahoo.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled // Disabled as user details are not editable in this view
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="phonenumber" 
                  value={phonenumber} 
                  placeholder="78688xxxx"
                  onChange={(e) => setPhonenumber(e.target.value)} 
                  disabled // Disabled as user details are not editable in this view
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea 
                  className="form-control" 
                  id="address" 
                  rows="3" 
                  value={address} 
                  placeholder="example address"
                  onChange={(e) => setAddress(e.target.value)} 
                  disabled // Disabled as user details are not editable in this view
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
