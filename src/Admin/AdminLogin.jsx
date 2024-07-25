import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../Containers/BreadCrumbs";
import { toast } from "react-toastify";
import AxiosService from "../common/ApiService";

function AdminLogin() {
  // State to manage form submission status and error messages
  let [submit, setSubmit] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  // Hook to programmatically navigate to other routes
  let navigate = useNavigate();

  // Validation schema using Yup to validate the form inputs
  const UserSchema = Yup.object().shape({
    email: Yup.string().email("* Invalid Email").required("* Required"),
    password: Yup.string().required("* Required"),
  });

  // Function to handle login submission
  const handleLogin = async (values) => {
    setSubmit(true); // Set submitting state to true
    try {
      // Sending POST request to the server to authenticate the user
      let res = await AxiosService.post("/user/login", {
        email: values.email,
        password: values.password,
        role: "admin" // Specifying role as admin for the login
      });
      if (res.status === 200) {
        // On successful login, store token and user info in session storage
        toast.success("Login Successful");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/"); // Navigate to home page after login
      }
    } catch (error) {
      // Handle errors and show error messages
      toast.error(error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      console.log(error); // Log the error to the console
    } finally {
      setSubmit(false); // Reset submitting state
    }
  };

  return (
    <div className="w-100 p-0 m-0">
      {/* Breadcrumbs component for navigation */}
      <div className="row">
        <BreadCrumbs />
      </div>
      <div className="container login-content">
        <div className="row m-3 p-3 justify-content-between align-items-center text-start">
          <div className="col-6">
            <h2>Admin Login</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={UserSchema} // Apply validation schema
              onSubmit={(values) => {
                handleLogin(values); // Handle form submission
              }}>
              {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Email Input Field */}
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

                  {/* Password Input Field */}
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
                      <div style={{ color: "red" }}>{errorMessage}{errors.password}</div>
                    ) : null}
                  </Form.Group>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={submit}>
                    {submit ? "Submitting" : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
