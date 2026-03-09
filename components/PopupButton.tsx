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
      className="bg-secondary inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      {...rest}
      disabled={disabled || isLoading}
    >
      {text}
    </button>
  );
};
export default PopupButton;
