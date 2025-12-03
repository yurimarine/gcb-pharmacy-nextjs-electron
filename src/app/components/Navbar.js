"use client";

import { useRouter } from "next/navigation";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {
  ArrowLeftStartOnRectangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  async function onLogout() {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      dispatch(logout());
      router.replace("/");
    }
  }

  async function onExit() {
    const result = await Swal.fire({
      title: "Exit?",
      text: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, exit",
    });

    if (result.isConfirmed) {
      window.electronAPI.exitApp();
    }
  }

  return (
    <header className="flex justify-between items-center border-b border-gray-300 bg-white px-4 py-5">
      <div>GCB Pharmacy</div>
      <div className="flex items-center gap-2">
        <button
          onClick={onLogout}
          className="mt-auto flex bg-blue-300 items-center gap-2 py-2 px-6 rounded hover:bg-blue-500 hover:scale-105 transition"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onExit}
          className="mt-auto flex bg-red-400 items-center gap-2 py-2 px-6 rounded hover:bg-red-500 hover:scale-105 transition"
        >
          <PowerIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
