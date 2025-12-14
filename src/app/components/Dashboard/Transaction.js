"use client";

export default function TransactionBar({ cartItems }) {
  // Compute grand total
  const total = cartItems.reduce(
    (sum, item) => sum + item.unit_cost * item.qty,
    0
  );

  return (
    <section className="w-[30%] bg-main-gray">
      <div className="bg-white border-black shadow-xl rounded-lg p-6 gap-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center  text-gray-900 text-2xl font-bold ">
          Checkout
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto  space-y-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-900 text-lg"
              >
                <span>
                  {item.product_name} x {item.qty}
                </span>
                <span>₱{(item.unit_cost * item.qty).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
        {/* Discount   */}
        <div className="flex  text-gray-500 justify-between text-xl font-semibold ">
          <span>Discount</span>
          <span>{total.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="flex  text-gray-900 justify-between text-4xl font-semibold ">
          <span>Total</span>
          <span>{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-center ">
          <button className="w-full py-3 bg-blue-300 text-gray-900 text-2xl font-bold rounded-lg hover:bg-blue-500 hover:scale-105 transform duration-500">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
