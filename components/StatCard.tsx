import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  const styles: Record<string, { card: string; text: string }> = {
    "Total Income": {
      card: "border-emerald-200 bg-emerald-50",
      text: "text-emerald-700",
    },
    "Total Expenses": {
      card: "border-rose-200 bg-rose-50",
      text: "text-rose-700",
    },
    "Current Balance": {
      card: "border-blue-200 bg-blue-50",
      text: "text-blue-700",
    },
    "Budget Usage": {
      card: "border-amber-200 bg-amber-50",
      text: "text-amber-700",
    },
    Open: {
      card: "border-blue-200 bg-blue-50",
      text: "text-blue-800",
    },
    "In Progress": {
      card: "border-red-200 bg-red-50",
      text: "text-red-800",
    },
    Resolved: {
      card: "border-yellow-200 bg-yellow-50",
      text: "text-yellow-800",
    },
    Closed: {
      card: "border-green-200 bg-green-50",
      text: "text-green-800",
    },
  };

  const style = styles[label] ?? {
    card: "border-slate-200 bg-slate-50",
    text: "text-slate-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${style.card}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {icon && <span>{icon}</span>}
      </div>
      <p className={`mt-1 text-2xl font-bold ${style.text}`}>{value}</p>
    </div>
  );
};

export default StatCard;
