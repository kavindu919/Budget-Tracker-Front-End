export const getTypeBadge = (type: string) => {
  const styles: Record<string, string> = {
    income: "bg-green-50 text-green-700 border border-green-100",
    expense: "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[type] ?? "border border-slate-100 bg-slate-50 text-slate-600"}`}
    >
      {type ?? "-"}
    </span>
  );
};

export const getColorDisplay = (color: string) => {
  if (!color) return "-";

  return (
    <div className="flex items-center gap-2">
      <div
        className="h-4 w-4 rounded-full border border-slate-200 shadow-sm"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-slate-400">{color}</span>
    </div>
  );
};
