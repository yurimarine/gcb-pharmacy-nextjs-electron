"use client";

import SearchBar from "./Searchbar";
import { fetchProducts } from "@/app/store/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
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
    <section className="w-[70%] bg-gray-200  shadow">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
    </section>
  );
}
