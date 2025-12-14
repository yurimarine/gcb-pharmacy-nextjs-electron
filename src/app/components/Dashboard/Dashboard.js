"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./Searchbar/Searchbar";
import Cart from "./Cart";
import TransactionBar from "./Transaction";

export default function Dashboard({ products }) {
  const searchInputRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 🔥 GLOBAL F1 KEYBIND
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F1") {
        e.preventDefault(); // prevent browser help
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="flex flex-col p-6 bg-main-gray gap-6 flex-1">
      <SearchBar
        products={products}
        onSelectProduct={handleAddToCart}
        ref={searchInputRef}
      />
      <div className="flex flex-1 gap-6 ">
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
        <TransactionBar cartItems={cartItems} />
      </div>
    </section>
  );
}
