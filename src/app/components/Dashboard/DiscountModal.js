"use client";
import { useState, useEffect } from "react";

export default function DiscountModal({ isOpen, onClose, item, onApply }) {
  const [discount, setDiscount] = useState(0);

  // Reset when item changes
  useEffect(() => {
    setDiscount(item?.discount ?? 0);
  }, [item]);

  // Lock background scroll + keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleApply();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, discount]);

  if (!isOpen || !item) return null;

  const handleApply = () => {
    const value = Number(discount);

    if (isNaN(value)) return;

    const clamped = Math.min(100, Math.max(0, value));
    onApply(clamped);
    onClose();
  };

  const discountedPrice =
    item.unit_cost * (1 - (Number(discount) || 0) / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-3">Apply Discount</h2>

        <p className="mb-2 font-medium">
          {item.product_name}
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Original: ₱{item.unit_cost.toFixed(2)} →{" "}
          <span className="font-bold">
            ₱{discountedPrice.toFixed(2)}
          </span>
        </p>

        <input
          type="number"
          min="0"
          max="100"
          step="1"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 text-lg"
          placeholder="Discount %"
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

