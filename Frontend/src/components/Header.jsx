import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <img src={assets.header_img} alt="header-img" className="w-[16rem]" />
      <div className="flex gap-3 items-center">
        <h2 className="text-2xl text-center font-bold">Hey Developer</h2>
        <img src={assets.hand_wave} alt="hand" className="w-[2rem]" />
      </div>
      <h1 className="text-3xl text-center sm:text-4xl mt-2 font-bold">
        Welcome to our app
      </h1>
      <p className="mt-4 text-center">
        let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="px-6 relative py-2.5 rounded-full border border-slate-600 cursor-pointer mt-4 overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <span className="absolute inset-0 bg-slate-300 transition-transform transform -translate-x-full group-hover:translate-x-0 duration-500 ease-in-out"></span>
        <span className="relative z-10">Get Started</span>
      </button>
    </div>
  );
};

export default Header;
