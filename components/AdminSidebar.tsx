"use client";

import { useState } from "react";
import Link from "next/link";
import { removeCookie } from "@/lib/client-cookies";
import { redirect } from "next/navigation";

interface AdminSidebarProps {
  children?: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  const logout = () => {
    removeCookie("token");
    redirect("/login");
  };

  return (
    <div className="md:flex block">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        md:relative fixed min-h-screen z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/user" className="block p-2 rounded hover:bg-gray-700">
            User
          </Link>
          <Link href="/admin/barang" className="block p-2 rounded hover:bg-gray-700">
            Barang
          </Link>
          <Link href={"#"} onClick={logout} className="block p-2 rounded hover:bg-gray-700">
            Logout
          </Link>
        </nav>
      </aside>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}