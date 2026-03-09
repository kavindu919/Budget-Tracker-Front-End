import React from "react";
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
  type: string;
  label: string;
}

const FormInput = ({
  placeholder,
  name,
  label,
  type,
  ...rest
}: FormInputProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        className="bg-moonstone h-10 w-full rounded-md border border-slate-300 px-3 text-sm"
        placeholder={placeholder}
        name={name}
        type={type}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
