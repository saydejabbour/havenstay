// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ isLoggedIn, username }) {
  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] text-slate-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} username={username} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
