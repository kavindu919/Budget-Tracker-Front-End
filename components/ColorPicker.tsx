"use client";

interface ColorPickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (color: string) => void;
  colors: string[];
  disabled?: boolean;
}

const ColorPicker = ({
  label,
  name,
  value,
  onChange,
  colors,
  disabled = false,
}: ColorPickerProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            disabled={disabled}
            className={`h-10 rounded-lg border-2 transition ${
              value === color
                ? "border-transparent scale-110"
                : "border-transparent"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default ColorPicker;
