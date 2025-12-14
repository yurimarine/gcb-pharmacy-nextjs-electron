"use client";
import { useState, useEffect } from "react";
import DiscountModal from "./DiscountModal";

export default function Cart({ cartItems, setCartItems }) {
  const [discountMode, setDiscountMode] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [editingDiscount, setEditingDiscount] = useState(false);
  const [discountIndex, setDiscountIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDiscount = (index) => {
    setDiscountIndex(index);
    setModalOpen(true);

    setDiscountMode(false);
    setHighlightedIndex(null);
    setEditingDiscount(false);
  };

  const applyDiscount = (percentage) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === discountIndex ? { ...item, discount: percentage } : item
      )
    );

    setModalOpen(false);
    setDiscountIndex(null);
  };

  // Keyboard navigation for discount mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // CTRL + D
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (cartItems.length > 0 && !modalOpen) {
          setDiscountMode(true);
          setHighlightedIndex(0);
          setEditingDiscount(true);
        }
      }

      if (!discountMode || modalOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % cartItems.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === null
            ? cartItems.length - 1
            : (prev - 1 + cartItems.length) % cartItems.length
        );
      } else if (e.key === "Enter" && highlightedIndex !== null) {
        e.preventDefault();
        handleDiscount(highlightedIndex);
      } else if (e.key === "Escape") {
        setDiscountMode(false);
        setHighlightedIndex(null);
        setEditingDiscount(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [discountMode, modalOpen, cartItems, highlightedIndex]);

  return (
    <section className="w-full bg-main-gray flex-1">
      <div className="bg-white shadow-xl overflow-hidden rounded-lg flex flex-col h-full">
        {/* Header */}
        <div className="grid grid-cols-12 border-b border-gray-500 text-xl font-bold px-4 py-2">
          <div className="col-span-4">Product</div>
          <div className="col-span-2 text-center">Barcode</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-1 text-center">Qty</div>
          <div className="col-span-1 text-center">Disc %</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-500 text-xl">
            No items in cart
          </div>
        ) : (
          cartItems.map((item, index) => {
            const discount = item.discount || 0;
            const subtotal = item.qty * item.unit_cost * (1 - discount / 100);

            return (
              <div
                key={item.id}
                className={`grid grid-cols-12 px-4 py-3 text-lg border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                  discountMode && highlightedIndex === index
                    ? "bg-gray-200"
                    : ""
                }`}
                onDoubleClick={() => handleDiscount(index)}
              >
                <div className="col-span-4 font-semibold">
                  {item.product_name}
                </div>
                <div className="col-span-2 text-center">{item.barcode}</div>
                <div className="col-span-2 text-center">
                  {item.unit_cost.toFixed(2)}
                </div>
                <div className="col-span-1 text-center">{item.qty}</div>
                <div className="col-span-1 text-center">{discount}%</div>
                <div className="col-span-2 text-right font-bold">
                  {subtotal.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {discountIndex !== null && (
        <DiscountModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setDiscountIndex(null);
          }}
          item={cartItems[discountIndex]}
          onApply={applyDiscount}
        />
      )}
    </section>
  );
}
