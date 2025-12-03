"use client";

import SearchBar from "./Searchbar";

export default function Dashboard() {
  return (
    <section className="w-[70%] bg-gray-200  shadow">
      <SearchBar onSearch={(text) => console.log("Searching:", text)} />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
    </section>
  );
}
