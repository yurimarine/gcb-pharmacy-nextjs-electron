"use client";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import QuantityModal from "./QuantityModal";

export default function InventoryModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  // Reset highlight when modal opens
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
    setSelectedProduct(null);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Keyboard navigation (disabled when quantity modal open)
  useEffect(() => {
    if (!isOpen || showQuantityModal) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % products.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + products.length) % products.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (products.length > 0) {
          openQuantityModal(products[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showQuantityModal, highlightedIndex, products]);

  const openQuantityModal = (product) => {
    setSelectedProduct(product);
    setShowQuantityModal(true);
  };

  const handleConfirmQuantity = (product, quantity) => {
    onSelectProduct({ ...product, qty: quantity });
    setShowQuantityModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl w-3/4 min-h-3/4 flex flex-col">
          <div className="flex p-4 justify-between items-center border-b">
            <h2 className="text-xl font-bold">Select a Product</h2>
            <button onClick={onClose}>
              <XCircleIcon className="w-10 h-10 text-red-500" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xl text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Barcode</th>
                  <th className="px-4 py-2">SKU</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Unit Cost</th>
                  <th className="px-4 py-2">Packaging</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    onClick={() => openQuantityModal(product)}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      highlightedIndex === index ? "bg-gray-200" : ""
                    }`}
                  >
                    <td className="px-4 py-4">{product.barcode}</td>
                    <td className="px-4 py-4">{product.sku}</td>
                    <td className="px-4 py-4">{product.product_name}</td>
                    <td className="px-4 py-4">
                      ₱{product.unit_cost.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      {product.packaging_amount} {product.volume_unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <QuantityModal
        isOpen={showQuantityModal}
        product={selectedProduct}
        onConfirm={handleConfirmQuantity}
        onClose={() => setShowQuantityModal(false)}
      />
    </>
  );
}
