import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./Containers/ErrorPage";

import ProductDataContext from "./Context/ProductDataContext";
import CartProvider, { CartContext } from "./Context/CartContext";

import Navbar from "./Components/Navbar";
import Loading from "./Containers/Loading";
import Footer from "./Components/Footer";
import BreadCrumbs from "./Containers/BreadCrumbs"
import ProtectedRoute from "./common/ProtectedRoute"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

import "./App.css";

// Lazy load components
const Home = lazy(() => import("./Components/Home"));
const Category = lazy(() => import("./Components/Category"));
const ShopNow = lazy(() => import("./Components/ShopNow"));
const ProductInfo = lazy(() => import("./Components/ProductInfo"));
const Login = lazy(() => import("./Components/Login"));
const Signup = lazy(() => import("./Components/Signup"));
const AdminLogin = lazy(() => import("./Admin/AdminLogin"));
const AddProducts = lazy(() => import("./Admin/AddProducts"));
const Collection = lazy(() => import("./Components/Collection"));
const EditProducts = lazy(() => import("./Admin/EditProducts"));
const ResetPassword = lazy(() => import("./Components/ResetPassword"));
const TableCart = lazy(() => import("./Containers/TableCart"));
const Cart = lazy(() => import("./Components/Cart"));
const CartModal = lazy(() => import("./Containers/CartModal"));
const Payment = lazy(() => import("./common/Payment"));
const OrderHistory = lazy(() => import("./Components/OrderHistory"));
const Success = lazy(() => import("./common/Success"));
const Cancel = lazy(()=>import("./common/Cancel"))
const WishList = lazy(() => import("./Components/WishList"));
const Checkout = lazy(() => import("./common/Checkout"));
const Sidebar = lazy(()=>import("./Containers/Sidebar.jsx"))
const AccountDetails = lazy(()=>import("./Components/AccountDetails"))

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductDataContext>
          <CartProvider>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={({ error }) => <ErrorPage statusCode={error.statusCode || "500"} message={error.message || "An unexpected error occurred."} />}>
              <Navbar /> 
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/shopnow" element={<ShopNow />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/productInfo/:id" element={<ProductInfo />} />
                  <Route path="/editProduct/:id" element={<ProtectedRoute><EditProducts /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/resetpassword" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
                  <Route path="/adminLogin" element={<AdminLogin />} />
                  <Route path="/addProducts" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
                  <Route path="/tablecart" element={<TableCart />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/cartModal" element={<CartModal />} />
                  <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                  <Route path="/orderHistory" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                  <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                  <Route path="/cancel" element={<ProtectedRoute><Cancel /></ProtectedRoute>} />
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/checkout" element={ <ProtectedRoute><Elements stripe={stripePromise}> <Checkout /> </Elements></ProtectedRoute>  } />
                  <Route path="/sidebar" element={<Sidebar/>}/>
                  <Route path="/accountDetails" element={<AccountDetails/>}/>
                
                </Routes>
                <Footer/>
              </ErrorBoundary>
            </Suspense>
          </CartProvider>
        </ProductDataContext>
      </BrowserRouter>
    </>
  );
}

export default App;
