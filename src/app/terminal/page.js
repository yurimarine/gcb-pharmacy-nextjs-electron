"use client";

import Cart from "../components/Dashboard/Cart";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import TransactionBar from "../components/Dashboard/Transaction";
import Protected from "../utils/Protected";
import Dashboard from "../components/Dashboard/Dashboard";
import { fetchProducts } from "@/app/store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Terminal() {
  const dispatch = useDispatch();
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Protected>
      <div className="flex min-h-screen flex-col ">
        <Navbar />
        <Dashboard products={products} />
      </div>
    </Protected>
  );
}
