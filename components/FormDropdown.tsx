"use client";
import React, { useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
interface Option {
  value: string;
  label: string;
}
interface FormDropdownProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

const FormDropdown = ({
  label,
  name,
  options,
  placeholder = "Select an option",
  ...rest
}: FormDropdownProps) => {
  const [state, setState] = useState<boolean>(false);
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>

      <div className="relative w-full">
        <select
          name={name}
          className="bg-moonstone h-10 w-full appearance-none rounded-md border border-slate-300 px-3 pr-10 text-sm focus:outline-none"
          onClick={() => {
            setState(!state);
          }}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <MdOutlineArrowDownward
          className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-transform duration-200 ${state ? "rotate-180" : "rotate-0"}`}
        />
      </div>
    </div>
  );
};

export default FormDropdown;
