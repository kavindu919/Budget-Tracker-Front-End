import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "reset" | "button";
  isLoading: boolean;
  disabled: boolean;
}

export const PopupButton: React.FC<ButtonProps> = ({
  text,
  type,
  isLoading,
  disabled,
  ...rest
}) => {
  return (
    <button
      type={type}
      className="bg-secondary inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
export default PopupButton;
