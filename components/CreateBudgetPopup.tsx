"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import FormInput from "@/components/FormInput";
import FormDropdown from "@/components/FormDropdown";
import { budgetInterface } from "@/utils/interfaces/budgetInterface";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import toast from "react-hot-toast";
import { ZodError } from "zod";

import { budgetSchema } from "@/utils/validation/budgetSchema";
import { createBudget } from "@/services/budget.Services";

interface CreateBudgetPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  categories: categoryInterface[];
}

const CreateBudgetPopup = memo(
  ({ isOpen, onClose, onSuccess, categories }: CreateBudgetPopupProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<budgetInterface>({
      amount: 0,
      period: "monthly",
      alertLimit: undefined,
      categoryId: "",
    });

    useEffect(() => {
      if (!isOpen)
        setData({
          amount: 0,
          period: "monthly",
          alertLimit: undefined,
          categoryId: "",
        });
    }, [isOpen]);

    const categoryOptions = categories
      .filter((cat) => cat.type === "expense")
      .map((cat) => ({ value: cat.id!, label: cat.name }));

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prev) => ({
          ...prev,
          [e.target.name]:
            e.target.name === "amount" || e.target.name === "alertLimit"
              ? Number(e.target.value)
              : e.target.value,
        }));
      },
      [],
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
          const validData = budgetSchema.parse(data);
          const res = await createBudget(validData);
          if (res.success) {
            toast.success(res.message);
            onSuccess?.();
            onClose();
          } else {
            toast.error(res.message);
          }
        } catch (error: any) {
          if (error instanceof ZodError) {
            toast.error(error.issues[0]?.message);
            return;
          }
          toast.error(error?.message);
        } finally {
          setLoading(false);
        }
      },
      [data, onClose, onSuccess],
    );

    const handleClose = useCallback(() => {
      if (!loading) onClose();
    }, [loading, onClose]);

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={handleClose}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h5 className="text-lg font-semibold">Create Budget</h5>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <IoClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-3 p-6">
                <div className="flex w-full flex-1 flex-col gap-3 md:flex-row md:items-stretch">
                  <div className="flex w-full flex-col gap-3 md:w-1/2">
                    <div className="flex w-full flex-1 flex-col gap-3 rounded-lg border border-slate-300 px-3 py-4">
                      <header className="flex flex-col gap-1">
                        <h4 className="text-base font-medium">
                          Budget Details
                        </h4>
                        <h5 className="text-sm font-normal text-slate-400">
                          Set your spending limit for a category.
                        </h5>
                      </header>
                      <section className="flex flex-col gap-3">
                        <FormInput
                          label="Budget Amount"
                          name="amount"
                          type="number"
                          value={data.amount}
                          min={1}
                          placeholder="e.g. 5000"
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                        <FormInput
                          label="Alert Limit (optional)"
                          name="alertLimit"
                          type="number"
                          value={data.alertLimit ?? ""}
                          placeholder="e.g. 4000"
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </section>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 self-stretch rounded-lg border border-slate-300 px-3 py-4 md:w-1/2">
                    <header className="flex flex-col gap-1">
                      <h4 className="text-base font-medium">Budget Settings</h4>
                      <h5 className="text-sm font-normal text-slate-400">
                        Choose category and time period.
                      </h5>
                    </header>
                    <section className="flex flex-col gap-3">
                      <FormDropdown
                        label="Category"
                        name="categoryId"
                        options={categoryOptions}
                        value={data.categoryId}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      />
                      <FormDropdown
                        label="Period"
                        name="period"
                        options={[
                          { value: "daily", label: "Daily" },
                          { value: "weekly", label: "Weekly" },
                          { value: "monthly", label: "Monthly" },
                          { value: "yearly", label: "Yearly" },
                        ]}
                        value={data.period}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </section>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-secondary h-10 w-36 cursor-pointer rounded-md border border-slate-300 text-sm font-bold text-white shadow-md disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Budget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  },
);

export default CreateBudgetPopup;
