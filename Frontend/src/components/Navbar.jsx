import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full py-5 flex items-center justify-between">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-[7rem] cursor-pointer hover:opacity-80 transition-opacity duration-200"
      />
      <div
        onClick={() => navigate("/login")}
        className="flex items-center relative overflow-hidden gap-2.5 py-2 px-5 cursor-pointer rounded-full border border-slate-600 group shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out "
      >
        <span className="absolute z-0 inset-0 bg-slate-300 transition-transform transform -translate-x-full group-hover:translate-x-0 duration-500 ease-in-out"></span>
        <button className="cursor-pointer z-50">Login</button>
        <img src={assets.arrow_icon} alt="arrow" className="z-50" />
      </div>
    </div>
  );
};

export default Navbar;
