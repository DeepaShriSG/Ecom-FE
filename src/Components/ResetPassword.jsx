import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../Containers/BreadCrumbs";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import Sidebar from "../Containers/Sidebar";

function ResetPassword() {
  // State to handle form submission status and error messages
  let [errorMessage, setErrorMessage] = useState("");
  let [submit, setSubmit] = useState(false);

  // Schema for form validation using Yup
  const UserSchema = Yup.object().shape({
    newpassword: Yup.string().required("* Required"), // New password is required
    confirmpassword: Yup.string().required("*Required") // Confirm password is required
  });

  // Hook to programmatically navigate to different routes
  let navigate = useNavigate();

  // Function to handle form submission
  const handleAddUser = async (values, { setSubmitting, setErrors }) => {
    try {
      // Make API call to reset password
      const res = await AxiosService.post("/user/resetpassword", {
        newpassword: values.newpassword,
        confimpassword: values.confirmpassword,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully"); // Show success message
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set form errors from API response
      } else {
        toast.error("An error occurred. Please try again later."); // Show error message
      }
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <div className="w-100 p-0 m-0">
        <div className="row">
          <BreadCrumbs /> {/* Breadcrumbs for navigation */}
        </div>
        <div className="container login-content">
          <div className="row m-2 p-2 justify-content-between align-items-start text-start">
            <div className="col-12 col-md-4 col-lg-4">
              <Sidebar /> {/* Sidebar component */}
            </div>
            <div className="col-12 col-md-8 col-lg-8">
              <h2>Reset Password</h2>
              <Formik
                initialValues={{
                  newpassword: "", // Initial value for new password
                  confirmpassword: "", // Initial value for confirm password
                }}
                validationSchema={UserSchema} // Validation schema
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  handleAddUser(values, { setSubmitting, setErrors }); // Handle form submission
                }}
              >
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="newpassword"
                        placeholder="Enter password"
                        value={values.newpassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.newpassword && touched.newpassword ? (
                        <div style={{ color: "red" }}>{errors.newpassword}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmpassword"
                        placeholder="Enter password again"
                        value={values.confirmpassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.confirmpassword && touched.confirmpassword ? (
                        <div style={{ color: "red" }}>{errors.confirmpassword}</div>
                      ) : null}
                    </Form.Group>

                    <button
                      type="submit"
                      className="btn btn-dark"
                      disabled={submit}
                    >
                      {isSubmitting ? "Submitting" : "Submit"} {/* Button text based on submission status */}
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

export default ResetPassword;
