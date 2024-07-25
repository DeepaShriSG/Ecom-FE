import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService from "../common/ApiService";
import Navbar from "../Components/Navbar";
import BreadCrumbs from "../Containers/BreadCrumbs";
import Footer from "../Components/Footer";
import Loading from "../Containers/Loading";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

function EditProducts() {
  
  // State to manage form submission status, error messages, and product data
  let [submit, setSubmit] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let [product, setProduct] = useState(null);

  // Hook to programmatically navigate to other routes
  let navigate = useNavigate();
  // Hook to access URL parameters
  let params = useParams();

  // Validation schema using Yup for form validation
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

  // Function to fetch product data based on ID from URL parameters
  const getProduct = async () => {
    try {
      let res = await AxiosService.get(`/products/${params.id}`);
      if (res.status === 200) {
        setProduct(res.data.product); // Set product data to state
      }
    } catch (error) {
      // Handle errors and show error messages
      toast.error(error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      console.log(error); // Log the error to the console
    }
  };

  // Function to handle form submission and update product data
  const handleEdit = async (values) => {
    setSubmit(true); // Set submitting state to true
    try {
      let res = await AxiosService.put(`/products/${params.id}`, values);
      if (res.status === 200) {
        // On successful update, show success message and navigate to collection
        toast.success("Product updated successfully");
        navigate("/collection");
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

  // Fetch product data when component mounts or when ID changes
  useEffect(() => {
    getProduct();
  }, [params.id]);

  return (
    <div className="w-100">
      {/* Breadcrumbs component for navigation */}
      <BreadCrumbs />
      <div className="container login-content">
        <div className="row m-3 p-3 justify-content-between align-items-center text-start">
          <div className="col-lg-6 col-12">
            <h2>Edit Product</h2>
            {product ? (
              <Formik
                initialValues={{
                  ProductTitle: product.ProductTitle || "",
                  ProductCode: product.ProductCode || "",
                  imgurl: product.imgurl || [""],
                  brand: product.brand || "",
                  description: product.description || "",
                  price: product.price || "",
                  stock: product.stock || "",
                  category: product.category || "",
                  offer: product.offer || false,
                  Availability: product.Availability || false,
                }}
                validationSchema={ProductSchema} // Apply validation schema
                onSubmit={(values) => {
                  handleEdit(values); // Handle form submission
                }}>
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Product Title Input Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Title:</Form.Label>
                      <Form.Control type="text" name="ProductTitle" placeholder="Enter Product Title" onBlur={handleBlur} onChange={handleChange} value={values.ProductTitle} />
                      {errors.ProductTitle && touched.ProductTitle ? <div style={{ color: "red" }}>{errors.ProductTitle}</div> : null}
                    </Form.Group>

                    {/* Product Code Input Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Code:</Form.Label>
                      <Form.Control type="text" name="ProductCode" placeholder="Enter Product Code" onBlur={handleBlur} onChange={handleChange} value={values.ProductCode} />
                      {errors.ProductCode && touched.ProductCode ? <div style={{ color: "red" }}>{errors.ProductCode}</div> : null}
                    </Form.Group>

                    {/* FieldArray for Image URLs */}
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
                                <div>
                                  <div className="d-flex justify-content-end">
                                    {/* Replace, Add, and Remove buttons for image URLs */}
                                    <i className="bi bi-trash-fill m-2" onClick={() => replace(index, "")}></i> 
                                    <i className="bi bi-cloud-plus-fill m-2" onClick={() => push("")}></i>
                                    {index !== 0 ? (
                                      <i className="bi bi-x-circle m-2" onClick={() => remove(index)}></i>
                                    ) : null}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>

                    {/* Brand Input Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Brand:</Form.Label>
                      <Form.Control type="text" name="brand" placeholder="Enter Brand" onBlur={handleBlur} onChange={handleChange} value={values.brand} />
                      {errors.brand && touched.brand ? <div style={{ color: "red" }}>{errors.brand}</div> : null}
                    </Form.Group>

                    {/* Price Input Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Price:</Form.Label>
                      <Form.Control type="text" name="price" placeholder="Enter Price" onBlur={handleBlur} onChange={handleChange} value={values.price} />
                      {errors.price && touched.price ? <div style={{ color: "red" }}>{errors.price}</div> : null}
                    </Form.Group>

                    {/* Stock Input Field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Stock:</Form.Label>
                      <Form.Control type="text" name="stock" placeholder="Enter Stock" onBlur={handleBlur} onChange={handleChange} value={values.stock} />
                      {errors.stock && touched.stock ? <div style={{ color: "red" }}>{errors.stock}</div> : null}
                    </Form.Group>

                    {/* Category Selection */}
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

                    {/* Description Textarea */}
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
            ) : (
              // Show loading component while product data is being fetched
              <Loading />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default EditProducts;
