"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import FormInput from "@/components/FormInput";
import FormDropdown from "@/components/FormDropdown";
import { transactionInterface } from "@/utils/interfaces/transactionInterface";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { transactionSchema } from "@/utils/validation/transactionSchema";
import { createTransaction } from "@/services/transaction.Services";
import { getAllCategory } from "@/services/category.Services";

interface CreateTransactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  categories: categoryInterface[];
}

const CreateTransactionPopup = memo(
  ({ isOpen, onClose, onSuccess, categories }: CreateTransactionPopupProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<transactionInterface>({
      title: "",
      amount: 0,
      categoryId: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });

    useEffect(() => {
      if (!isOpen) {
        setData({
          title: "",
          amount: 0,
          categoryId: "",
          type: "expense",
          date: new Date().toISOString().split("T")[0],
          note: "",
        });
      }
    }, [isOpen]);

    const categoryOptions = categories.map((cat) => ({
      value: cat.id!,
      label: cat.name,
    }));

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prev) => ({
          ...prev,
          [e.target.name]:
            e.target.name === "amount"
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
          const validData = transactionSchema.parse(data);
          const res = await createTransaction(validData);
          if (res.success) {
            toast.success(res.message);
            onSuccess?.();
            onClose();
          } else {
            toast.error(res.message);
          }
        } catch (error: any) {
          console.log(error);
          if (error instanceof ZodError) {
            toast.error(error.issues[0]?.message);
            return;
          }
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Unexpected error occurred");
          }
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
              <h5 className="text-lg font-semibold">Create Transaction</h5>
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
                    <div className="flex w-full flex-col gap-3 rounded-lg border border-slate-300 px-3 py-4">
                      <header className="flex flex-col gap-1">
                        <h4 className="text-base font-medium">
                          Transaction Details
                        </h4>
                        <h5 className="text-sm font-normal text-slate-400">
                          Enter the transaction information.
                        </h5>
                      </header>
                      <section className="flex flex-col gap-3">
                        <FormInput
                          label="Title"
                          name="title"
                          type="text"
                          value={data.title}
                          placeholder="e.g. Grocery shopping"
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                        <FormInput
                          label="Amount"
                          name="amount"
                          type="number"
                          min={1}
                          value={data.amount}
                          placeholder="e.g. 1500"
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                        <FormInput
                          label="Date"
                          name="date"
                          type="date"
                          placeholder=""
                          value={data.date}
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </section>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 self-stretch rounded-lg border border-slate-300 px-3 py-4 md:w-1/2">
                    <header className="flex flex-col gap-1">
                      <h4 className="text-base font-medium">
                        Transaction Settings
                      </h4>
                      <h5 className="text-sm font-normal text-slate-400">
                        Choose type and category.
                      </h5>
                    </header>
                    <section className="flex flex-col gap-3">
                      <FormDropdown
                        label="Type"
                        name="type"
                        options={[
                          { value: "income", label: "Income" },
                          { value: "expense", label: "Expense" },
                        ]}
                        value={data.type}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <FormDropdown
                        label="Category"
                        name="categoryId"
                        options={categoryOptions}
                        value={data.categoryId}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <FormInput
                        label="Note (optional)"
                        name="note"
                        type="text"
                        value={data.note ?? ""}
                        placeholder="Any additional notes"
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
                  {loading ? "Creating..." : "Create Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  },
);

export default CreateTransactionPopup;
