import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);


  const handelInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length -1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const handleSubmit = async () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div className="flex items-center justify-center relative min-h-screen bg-linear-to-bl from-blue-300 to-cyan-400 p-4">
      <img
        src={assets.logo}
        alt="Logo"
        className="absolute w-[7rem] cursor-pointer top-[3%] left-[4%] "
        onClick={() => navigate("/")}
      />

      <form onSubmit={handleSubmit} className="w-[280px] sm:w-[340px] p-4 py-7 sm:p-6 rounded-2xl bg-slate-900">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300 text-[15px]">
          Enter the 6-degit code sent to your email id
        </p>

        <div className="flex items-center justify-between" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
              key={index}
                type="text"
                className="w-9 h-9 sm:text-xl text-center text-white sm:w-11 sm:h-11 outline-white  rounded-sm border-none bg-slate-500 "
                maxLength="1"
                ref={(e) => inputRefs.current[index] = e}
                onInput={(e) => handelInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        
        </div>
        <button className="w-full cursor-pointer py-2 rounded-full mt-5 bg-gradient-to-r to-indigo-500 from-indigo-900 text-white hover:opacity-80 font-medium">Verify</button>
      </form>
    </div>
  );
};

export default EmailVerify;
