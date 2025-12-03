"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // pass search text to parent
  };

  return (
    <header className="flex items-center bg-gray-100 px-4 py-3 shadow gap-3 text-2xl">
      <span> Items : </span>
      <div className="relative w-full  max-w-md">
        {/* <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="w-full px-2 py-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-blue-300 focus:outline-none"
        />
      </div>
    </header>
  );
}
