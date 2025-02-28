import React, { useRef } from "react";

const Test = () => {
  const inputRefs = useRef([]);
  console.log(inputRefs.current);
  
  return (
    <div className="w-92 p-6 bg-slate-900 flex items-center justify-center m-12">
    <div className="flex items-center justify-between gap-3.5" >
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            className="w-9 h-9 sm:text-xl text-center text-white sm:w-11 sm:h-11 outline-white  rounded-sm border-none bg-slate-500 "
            maxLength="1"
            ref={(e) => inputRefs.current[index] = e}
            // onInput={(e) => handelInput(e, index)}
            // onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
    </div>
    </div>
  );
};

export default Test;
