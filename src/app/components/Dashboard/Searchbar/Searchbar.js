"use client";

import { AiOutlineBarcode } from "react-icons/ai";
import { useState, forwardRef, useEffect } from "react";
import InventoryModal from "./InventoryModal";

const SearchBar = forwardRef(function SearchBar(
  { products, onSelectProduct },
  inputRef
) {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleKeyDown = (e) => {
    if (isModalOpen) return;

    if (e.key === "Enter") {
      const results = products.filter((product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
      setIsModalOpen(true);
    }
  };

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    setQuery("");
    setIsModalOpen(false);

    // 🔥 Return focus to scanner/search
    setTimeout(() => inputRef?.current?.focus(), 0);
  };

  // Auto-focus when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      inputRef?.current?.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <header className="flex items-center font-bold gap-3 text-gray-800 text-2xl">
        <AiOutlineBarcode className="w-10 h-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 shadow-md rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        />
      </header>

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={filteredProducts}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
});

export default SearchBar;
