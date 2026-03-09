"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
  FiTarget,
} from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getTypeBadge } from "@/utils/helpers/badge";
import { DashboardSummaryProps } from "@/utils/interfaces/transactionInterface";
import { getTransactionSummary } from "@/services/transaction.Services";
import StatCard from "@/components/StatCard";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-md">
      {label && (
        <p className="mb-1 text-xs font-semibold text-slate-600">{label}</p>
      )}
      {payload.map((item: any, i: number) => (
        <p
          key={i}
          className="text-xs"
          style={{ color: item.color ?? item.fill }}
        >
          {item.name}:{" "}
          <span className="font-semibold">
            {Number(item.value).toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
};

const page = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<DashboardSummaryProps>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    monthlyData: [],
    categoryExpenses: [],
    budgetVsActual: [],
    recentTransactions: [],
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await getTransactionSummary();
      if (res.success) {
        setSummary(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const budgetUsagePercent =
    summary.budgetVsActual.length > 0
      ? Math.round(
          (summary.budgetVsActual.reduce((acc, b) => acc + b.spent, 0) /
            summary.budgetVsActual.reduce((acc, b) => acc + b.budget, 0)) *
            100,
        )
      : 0;

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Total Income"
          value={Number(summary.totalIncome)}
          icon={<FiArrowUpCircle className="h-4 w-4 text-emerald-500" />}
        />
        <StatCard
          label="Total Expenses"
          value={Number(summary.totalExpense)}
          icon={<FiArrowDownCircle className="h-4 w-4 text-rose-500" />}
        />
        <StatCard
          label="Current Balance"
          value={Number(summary.balance)}
          icon={<FiDollarSign className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          label="Budget Usage"
          value={`${budgetUsagePercent}%`}
          icon={<FiTarget className="h-4 w-4 text-amber-500" />}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <figure className="col-span-2 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Monthly Income vs Expenses
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={summary.monthlyData}
              barSize={16}
              margin={{ top: 0, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f8fafc" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span className="text-xs text-slate-600 capitalize">{v}</span>
                )}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </figure>

        <figure className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Expense by Category
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={summary.categoryExpenses}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {summary.categoryExpenses.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span className="text-xs text-slate-600">{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </figure>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <figure className="col-span-1 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Budget vs Actual
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={summary.budgetVsActual}
              layout="vertical"
              barSize={12}
              margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={64}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f8fafc" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span className="text-xs text-slate-600 capitalize">{v}</span>
                )}
              />
              <Bar
                dataKey="budget"
                name="Budget"
                fill="#cbd5e1"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="spent"
                name="Spent"
                fill="#f43f5e"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </figure>

        <figure className="col-span-2 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Recent Transactions
            </h3>
          </div>
          <div className="hide-scrollbar max-h-64 overflow-y-auto">
            <ul className="w-full divide-y divide-slate-50">
              {summary.recentTransactions.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  No transactions yet
                </p>
              ) : (
                summary.recentTransactions.map((txn) => (
                  <li
                    key={txn.id}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${txn.category?.color}20` }}
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: txn.category?.color }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {txn.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {txn.category?.name} •{" "}
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-xs font-bold ${txn.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {txn.type === "income" ? "+" : "-"}
                        {Number(txn.amount).toLocaleString()}
                      </span>
                      {getTypeBadge(txn.type)}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </figure>
      </section>
    </div>
  );
};

export default page;
