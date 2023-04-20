import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";

import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";

const Signup = React.lazy(() => import("../pages/Signup"));
const Routers = () => {
  return (
    <Suspense fallback={<h2>Loading....</h2>}>
      <Routes>
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />

        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/add-products" element={<AddProducts />} />
          <Route path="dashboard/all-products" element={<AllProducts />} />
          <Route path="dashboard/users" element={<Users />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
