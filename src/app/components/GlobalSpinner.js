"use client";

import { useSelector } from "react-redux";

export default function GlobalSpinner() {
  const loadingCount = useSelector((s) => s.ui.loadingCount);

  if (!loadingCount) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-black/40 absolute inset-0" />
      <div className="p-4 rounded shadow-lg bg-white z-50">
        <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent rounded-full" />
      </div>
    </div>
  );
}
