import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../Containers/BreadCrumbs";
import Category from "./Category";
import Navbar from "./Navbar";
import Sidebar from "../Containers/Sidebar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import AxiosService from "../common/ApiService";

function Login() {
  // State to manage form submission status and error messages
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Schema for validating login form inputs using Yup
  const UserSchema = Yup.object().shape({
    email: Yup.string().email("* Invalid Email").required("* Required"),
    password: Yup.string().required("* Required"),
    role: Yup.string(),
  });

  // Function to handle login submission
  const handleLogin = async (values) => {
    setSubmit(true); // Set submit state to true to indicate loading
    try {
      // Make API call to login endpoint
      const res = await AxiosService.post("/user/login", {
        email: values.email,
        password: values.password,
        role: "user",
      });

      // On successful login, save token and user data, and navigate based on role
      if (res.status === 200) {
        toast.success("Login Successful");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "user") {
          navigate("/collection"); // Navigate to collection page for regular users
        } else {
          navigate("/"); // Navigate to home page for other roles
        }
      }
    } catch (error) {
      // On error, show toast notification and set error message
      toast.error("Login Failed");
      setErrorMessage(error.response?.data?.message || "An error occurred"); // Update error message state
      console.log(error);
    } finally {
      setSubmit(false); // Reset submit state
    }
  };

  return (
    <>
      <div className="w-100 p-0 m-0">
        {/* Breadcrumbs component for navigation indication */}
        <div className="row">
          <BreadCrumbs />
        </div>
        <div className="container-fluid login-content p-3">
          <div className="row justify-content-between align-items-start text-start m-2">
            {/* Sidebar component */}
            <div className="col-lg-3 col-md-3 col-12 p-2">
              <Sidebar />
            </div>
            {/* Login form */}
            <div className="col-lg-4 col-md-4 col-12 p-2">
              <div className="card p-3">
                <h2>Returning Customer</h2>
                <p>
                  <strong>I am a returning Customer</strong>
                  <span className="m-2">or</span>
                  <a href="/adminLogin" className="adminLogin">
                    Admin Login
                  </a>
                </p>

                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    role: "user",
                  }}
                  validationSchema={UserSchema}
                  onSubmit={(values) => {
                    handleLogin(values); // Handle form submission
                  }}
                >
                  {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                        />
                        {errors.email && touched.email ? (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                        />
                        {errors.password && touched.password ? (
                          <div style={{ color: "red" }}>
                            {errorMessage} {errors.password}
                          </div>
                        ) : null}
                      </Form.Group>
                      <button type="submit" className="btn btn-dark m-2" disabled={submit}>
                        {submit ? "Logging in" : "Login"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* New customer section */}
            <div className="col-lg-5 col-md-4 col-12 p-2">
              <div className="card mb-3">
                <div className="card-body">
                  <h2>New Customer</h2>
                  <p>
                    <strong>Register Account</strong>
                  </p>
                  <p className="mb-4">
                    By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                  </p>
                  {/* Button to navigate to the signup page */}
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
