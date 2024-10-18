import React from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate= useNavigate();

  const onLogout= ()=>{
    navigate("/login");
  }
  return (
      <div className="bg-[#7db0f2] text-primary-foreground py-3 px-6 drop-shadow-md justify-between flex items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <ProfileInfo onLogout={onLogout} />
      </div>

  );
}

export default Header;
