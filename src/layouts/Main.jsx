import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Main;
