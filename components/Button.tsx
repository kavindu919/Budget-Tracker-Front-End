import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "reset" | "button";
  isLoading: boolean;
  disabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type,
  isLoading,
  disabled,
  ...rest
}) => {
  return (
    <button
      type={type}
      className="w-full cursor-pointer rounded bg-black p-3 text-base font-bold shadow-md focus:drop-shadow-xl"
      {...rest}
      disabled={disabled || isLoading}
    >
      <div className="flex flex-row items-center justify-center gap-5 text-white">
        {text}
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-white sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        )}
      </div>
    </button>
  );
};
export default Button;
