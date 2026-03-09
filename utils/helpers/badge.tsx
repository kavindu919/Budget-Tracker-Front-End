import { budgetInterface } from "../interfaces/budgetInterface";

export const getTypeBadge = (type: string) => {
  const styles: Record<
    string,
    { border: string; bg: string; text: string; dot: string }
  > = {
    income: {
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      dot: "bg-emerald-400",
    },
    expense: {
      border: "border-rose-200",
      bg: "bg-rose-50",
      text: "text-rose-600",
      dot: "bg-rose-500",
    },
  };

  const style = styles[type] ?? {
    border: "border-slate-200",
    bg: "bg-slate-50",
    text: "text-slate-600",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${style.border} ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {type ?? "-"}
    </span>
  );
};

export const getColorDisplay = (color: string) => {
  if (!color) return "-";

  return (
    <span
      className="inline-flex h-6 w-16 rounded-full border"
      style={{
        backgroundColor: color,
        borderColor: `${color}80`,
      }}
    />
  );
};

export const getStatusBadge = (budget: budgetInterface) => {
  if (budget.isExceeded) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Exceeded
      </span>
    );
  }
  if (budget.isNearLimit) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Near Limit
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      On Track
    </span>
  );
};
