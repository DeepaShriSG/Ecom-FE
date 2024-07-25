import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import BreadCrumbs from "../Containers/BreadCrumbs";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

function AddProducts() {
  // State to handle the form submission status and error messages
  let [submit, setSubmit] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  // Hook to navigate programmatically
  let navigate = useNavigate();

  // Validation schema for the form using Yup
  const ProductSchema = Yup.object().shape({
    ProductTitle: Yup.string().required("Product Title is Required"),
    ProductCode: Yup.string().required("Product Code is Required"),
    imgurl: Yup.array().of(Yup.string().required("Image URL is Required")).required("Image URLs are Required"),
    brand: Yup.string().required("Brand is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required").integer("Stock must be an integer"),
    category: Yup.string().required("Category is required"),
    offer: Yup.boolean(),
    Availability: Yup.boolean().required("Availability is required"),
  });

  // Function to handle form submission
  const handleAddProducts = async (values) => {
    setSubmit(true); // Set submitting state to true
    try {
      let res = await AxiosService.post("/products/create", values);
      if (res.status === 201) {
        toast.success("Product created successfully"); // Show success message
        navigate("/collection"); // Navigate to the collection page
      }
    } catch (error) {
      toast.error(error.message); // Show error message
      setErrorMessage(error.response); // Set error message to state
      console.log(error); // Log the error to the console
    } finally {
      setSubmit(false); // Reset submitting state
    }
  };

  return (
    <>
      <div className="w-100">
        <BreadCrumbs /> {/* Breadcrumbs component for navigation */}
        <div className="container login-content">
          <div className="row m-3 p-3 justify-content-between align-items-center text-start">
            <div className="col-lg-6 col-12">
              <h2>Add new Products</h2>
              <Formik
                initialValues={{
                  ProductTitle: "",
                  ProductCode: "",
                  imgurl: [""],
                  brand: "",
                  description: "",
                  price: "",
                  stock: "",
                  category: "",
                  offer: false,
                  Availability: true,
                }}
                validationSchema={ProductSchema} // Apply validation schema
                onSubmit={(values) => {
                  handleAddProducts(values); // Handle form submission
                }}>
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Product Title Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Title:</Form.Label>
                      <Form.Control type="text" name="ProductTitle" placeholder="Enter Product Title" onBlur={handleBlur} onChange={handleChange} value={values.ProductTitle} />
                      {errors.ProductTitle && touched.ProductTitle ? <div style={{ color: "red" }}>{errors.ProductTitle}</div> : null}
                    </Form.Group>

                    {/* Product Code Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Code:</Form.Label>
                      <Form.Control type="text" name="ProductCode" placeholder="Enter Product Code" onBlur={handleBlur} onChange={handleChange} value={values.ProductCode} />
                      {errors.ProductCode && touched.ProductCode ? <div style={{ color: "red" }}>{errors.ProductCode}</div> : null}
                    </Form.Group>

                    {/* Image URLs Field Array */}
                    <FieldArray name="imgurl">
                      {({ push, remove, replace }) => (
                        <div>
                          {values.imgurl.map((url, index) => (
                            <div key={index} className="mb-3">
                              <Form.Group>
                                <Form.Label>Image URL {index + 1}:</Form.Label>
                                <Form.Control type="text" name={`imgurl.${index}`} placeholder="Enter Image URL" onBlur={handleBlur} onChange={handleChange} value={url} />
                                {errors.imgurl && errors.imgurl[index] && touched.imgurl && touched.imgurl[index] ? (
                                  <div style={{ color: "red" }}>{errors.imgurl[index]}</div>
                                ) : null}
                                <div className="d-flex justify-content-end">
                                  {/* Buttons to add, remove, or replace image URLs */}
                                  <i className="bi bi-trash-fill m-2" onClick={() => replace(index, "")}></i> 
                                  <i className="bi bi-cloud-plus-fill m-2" onClick={() => push("")}></i>
                                  {index !== 0 ? (  <i className="bi bi-x-circle m-2" onClick={() => remove(index)}></i> ) : null}
                                </div>
                              </Form.Group>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                   
                    {/* Brand Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Brand:</Form.Label>
                      <Form.Control type="text" name="brand" placeholder="Enter Brand" onBlur={handleBlur} onChange={handleChange} value={values.brand} />
                      {errors.brand && touched.brand ? <div style={{ color: "red" }}>{errors.brand}</div> : null}
                    </Form.Group>

                    {/* Price Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Price:</Form.Label>
                      <Form.Control type="text" name="price" placeholder="Enter Price" onBlur={handleBlur} onChange={handleChange} value={values.price} />
                      {errors.price && touched.price ? <div style={{ color: "red" }}>{errors.price}</div> : null}
                    </Form.Group>

                    {/* Stock Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Stock:</Form.Label>
                      <Form.Control type="text" name="stock" placeholder="Enter Stock" onBlur={handleBlur} onChange={handleChange} value={values.stock} />
                      {errors.stock && touched.stock ? <div style={{ color: "red" }}>{errors.stock}</div> : null}
                    </Form.Group>

                    {/* Category Field */}
                    <Form.Group>
                      <Form.Label>Category:</Form.Label>
                      <Form.Select aria-label="Default select example" name="category" onChange={handleChange} value={values.category}>
                        <option value="">Select Category</option>
                        <option value="SKINCARE">SkinCare</option>
                        <option value="BODYLOTION">BodyLotion</option>
                        <option value="NAILPOLISH">NailPolish</option>
                      </Form.Select>
                      {errors.category && touched.category ? <div style={{ color: "red" }}>{errors.category}</div> : null}
                    </Form.Group>

                    {/* Description Field */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} name="description" onBlur={handleBlur} onChange={handleChange} value={values.description} />
                      {errors.description && touched.description ? <div style={{ color: "red" }}>{errors.description}</div> : null}
                    </Form.Group>

                    {/* Offer and Availability Checkboxes */}
                    <div className="d-flex">
                      <div className="flex-fill me-3">
                        <Form.Group controlId="formOffer" className="mb-3">
                          <Form.Check type="checkbox" name="offer" checked={values.offer} onChange={handleChange} label="Offer" />
                        </Form.Group>
                      </div>
                      <div className="flex-fill">
                        <Form.Group controlId="formAvailability" className="mb-3">
                          <Form.Check type="checkbox" name="Availability" checked={values.Availability} onChange={handleChange} label="Availability" />
                        </Form.Group>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-dark m-2" disabled={submit}>
                      {submit ? "Submitting" : "Submit"}
                    </button>
                    &nbsp; &nbsp;
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

export default AddProducts;
