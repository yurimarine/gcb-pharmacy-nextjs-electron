"use client";
import { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function QuantityModal({ isOpen, product, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleConfirm();
      if (e.key === "+" || e.key === "=")
        setQuantity((q) => q + 1);
      if (e.key === "-" && quantity > 1)
        setQuantity((q) => Math.max(1, q - 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, quantity]);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    const qty = Math.max(1, Number(quantity) || 1);
    onConfirm(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>

        <h2 className="text-xl font-bold mb-2">Enter Quantity</h2>

        <p className="mb-3 font-medium">{product.product_name}</p>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded px-3 py-2 text-lg mb-4 text-center"
          autoFocus
        />

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white py-2 rounded text-lg hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
