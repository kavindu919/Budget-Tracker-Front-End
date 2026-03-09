import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

interface InputDataProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  type: string;
  name: string;
}

const PasswordField = ({ text, type, name, ...rest }: InputDataProps) => {
  const [inputType, setInputType] = useState(type);
  const handleVisibility = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <div className="relative my-1 w-full">
      <input
        id={name}
        name={name}
        type={inputType}
        {...rest}
        className="peer w-full appearance-none rounded-md border-2 border-gray-400 bg-white px-3 focus:ring-0 focus:drop-shadow-xl h-10 sm:h-11 md:h-12"
        required
        autoComplete="off"
      />
      {inputType == "password" ? (
        <FaEyeSlash
          role="button"
          aria-label="Hide password"
          className="absolute right-3 top-2 h-5 w-5 cursor-pointer md:top-3"
          onClick={handleVisibility}
        />
      ) : (
        <FaRegEye
          className="absolute right-3 top-2 h-5 w-5 cursor-pointer md:top-3"
          onClick={handleVisibility}
        />
      )}

      <label className="pointer-events-none absolute left-0 top-0.5 ml-5 mt-0.5 text-base font-medium text-gray-400 transition-all duration-300 ease-in-out peer-valid:-top-4 peer-valid:left-0 peer-valid:ml-0 peer-valid:-translate-y-1/2 peer-valid:scale-90 peer-valid:p-0.5 peer-valid:text-sm peer-valid:font-medium peer-valid:text-black peer-focus:-top-4 peer-focus:left-0 peer-focus:ml-0 peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:p-0.5 peer-focus:text-sm peer-focus:font-medium peer-focus:text-black md:top-1 md:mt-1.5 md:peer-valid:-top-5 md:peer-focus:-top-5">
        {text}
      </label>
    </div>
  );
};

export default PasswordField;
