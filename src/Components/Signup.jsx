import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../Containers/BreadCrumbs";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import Sidebar from "../Containers/Sidebar";

function Signup() {
  // State variables for error messages and form submission status
  let [errorMessage, setErrorMessage] = useState("");
  let [submit, setSubmit] = useState(false);

  // Schema for validating form fields using Yup
  const UserSchema = Yup.object().shape({
    name: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("*Required"),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "* Invalid Phone Number")
      .required("* Required"),
    password: Yup.string().required("*Required"),
    address: Yup.string().required("*Required"),
  });

  // Hook to navigate programmatically
  let navigate = useNavigate();

  // Function to handle user registration
  const handleAddUser = async (values, { setSubmitting, setErrors }) => {
    try {
      // Send a POST request to the backend to register the user
      const res = await AxiosService.post("/user/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
        phonenumber: values.phonenumber,
        address: values.address,
        role: "user",
      });

      if (res.status === 201) {
        // Show success message and redirect to login page on successful registration
        toast.success("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      // Handle errors from the backend
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      // Reset the submitting state after the request is completed
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          {/* Breadcrumbs for navigation */}
          <BreadCrumbs />
        </div>
        <div className="container login-content">
          <div className="row m-2 p-2 justify-content-between align-items-start text-start">
            <div className="col-12 col-md-4 col-lg-4">
              {/* Sidebar component */}
              <Sidebar />
            </div>
            <div className="col-12 col-md-8 col-lg-8">
              <h2>Customer Registration</h2>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  phonenumber: "",
                  address: "",
                  role: "user",
                }}
                validationSchema={UserSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  handleAddUser(values, { setSubmitting, setErrors });
                }}
              >
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Form field for name */}
                    <Form.Group className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter Name" 
                        value={values.name} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                      />
                      {errors.name && touched.name ? <div style={{ color: "red" }}>{errors.name}</div> : null}
                    </Form.Group>

                    {/* Form field for email */}
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        value={values.email} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                      />
                      {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
                    </Form.Group>

                    {/* Form field for password */}
                    <Form.Group className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Enter password" 
                        value={values.password} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                      />
                      {errors.password && touched.password ? <div style={{ color: "red" }}>{errors.password}</div> : null}
                    </Form.Group>

                    {/* Form field for phone number */}
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number:</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="phonenumber" 
                        placeholder="Enter Phone Number" 
                        value={values.phonenumber} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                      />
                      {errors.phonenumber && touched.phonenumber ? <div style={{ color: "red" }}>{errors.phonenumber}</div> : null}
                    </Form.Group>

                    {/* Form field for address */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Address:</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="address" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.address} 
                      />
                      {errors.address && touched.address ? <div style={{ color: "red" }}>{errors.address}</div> : null}
                    </Form.Group>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-dark" disabled={submit}>
                      {isSubmitting ? "Submitting" : "Signup"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
