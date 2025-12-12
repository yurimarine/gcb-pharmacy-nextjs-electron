"use client";

import Dashboard from "../components/Dashboard";
import Menubar from "../components/Menubar";
import Navbar from "../components/Navbar";
import TransactionBar from "../components/Transaction";
import Protected from "../utils/Protected";

export default function Terminal() {
  return (
    <Protected>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Menubar />
        <div className="flex flex-1">
          <Dashboard />
          <TransactionBar />
        </div>
      </div>
    </Protected>
  );
}
