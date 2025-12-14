// "use client";

// import SearchBar from "./Dashboard/Searchbar/Searchbar";
// import { fetchProducts } from "@/app/store/productSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ArrowPathIcon } from "@heroicons/react/24/outline";

// export default function Menubar() {
//   const dispatch = useDispatch();

//   const {
//     products,
//     loading: loadingProducts,
//     error: errorProducts,
//   } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   console.log("products", products);

//   // const products = [
//   //   { id: 1, name: "Apple Juice" },
//   //   { id: 2, name: "Banana Smoothie" },
//   //   { id: 3, name: "Orange Soda" },
//   // ];

//   return (
//     <header className="flex bg-gray-100 px-5 py-3">
//       <div className="flex gap-2">
//         {/* <button className="mt-auto flex bg-orange-300 items-center gap-2 px-10 py-6 rounded hover:bg-orange-500 hover:scale-105 transition">
//           <ArrowPathIcon className="w-5 h-5" />
//         </button> */}
//         <SearchBar products={products} onSelectProduct={handleAddToCart} />
//       </div>
//     </header>
//   );
// }
