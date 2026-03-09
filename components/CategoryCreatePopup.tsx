"use client";

import React, { memo, useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import ColorPicker from "@/components/ColorPicker";
import FormDropdown from "@/components/FormDropdown";
import FormInput from "@/components/FormInput";
import { COLORS } from "@/utils/helpers/colors";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { categorySchema } from "@/utils/validation/categorySchema";
import { createCategory } from "@/services/category.Services";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCategoryModal = memo(
  ({ isOpen, onClose, onSuccess }: CreateCategoryModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<categoryInterface>({
      name: "",
      type: "expense",
      color: "#3B82F6",
    });

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      },
      [],
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
          const validData = categorySchema.parse(data);
          const res = await createCategory(validData);

          if (res.success) {
            toast.success(res.message);
            setData({
              name: "",
              type: "expense",
              color: "#3B82F6",
            });
            onSuccess?.();
            onClose();
          } else {
            toast.error(res.message);
          }
        } catch (error: any) {
          if (error instanceof ZodError) {
            toast.error(error.issues[0]?.message || "Validation error");
            return;
          }
          toast.error(error?.message || "Failed to create category");
        } finally {
          setLoading(false);
        }
      },
      [data, onClose, onSuccess],
    );

    const handleClose = useCallback(() => {
      if (!loading) {
        setData({ name: "", type: "expense", color: "#3B82F6" });
        onClose();
      }
    }, [loading, onClose]);

    const handleColorChange = useCallback((color: string) => {
      setData((prev) => ({ ...prev, color }));
    }, []);

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
              <div>
                <h5 className="text-lg font-semibold">Create Category</h5>
              </div>
              <button
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
                      <header className="flex flex-col items-start justify-start gap-1">
                        <h4 className="text-base font-medium">
                          Category Details
                        </h4>
                        <h5 className="text-sm font-normal text-slate-400">
                          Create a new category to organize your transactions.
                        </h5>
                      </header>
                      <section className="flex flex-col gap-3">
                        <FormInput
                          label="Category Name"
                          name="name"
                          type="text"
                          value={data.name}
                          placeholder="e.g. Groceries, Rent, Salary"
                          onChange={handleChange}
                          disabled={loading}
                          required
                        />
                      </section>
                    </div>

                    <div className="flex w-full flex-1 flex-col gap-3 rounded-lg border border-slate-300 px-3 py-4">
                      <header className="flex flex-col items-start justify-start gap-1">
                        <h4 className="text-base font-medium">Preview</h4>
                        <h5 className="text-sm font-normal text-slate-400">
                          How your category will appear
                        </h5>
                      </header>
                      <div
                        className="inline-flex items-center gap-3 rounded-lg px-4 py-2"
                        style={{ backgroundColor: data.color + "20" }}
                      >
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
                          style={{ backgroundColor: data.color }}
                        >
                          {data.name.charAt(0).toUpperCase() || "C"}
                        </div>
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: data.color }}
                          >
                            {data.name || "Category Name"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.type === "income" ? "Income" : "Expense"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 self-stretch rounded-lg border border-slate-300 px-3 py-4 md:w-1/2">
                    <header className="flex flex-col items-start justify-start gap-1">
                      <h4 className="text-base font-medium">
                        Category Settings
                      </h4>
                      <h5 className="text-sm font-normal text-slate-400">
                        Choose type and color
                      </h5>
                    </header>
                    <section className="grid w-full grid-cols-1 gap-3">
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
                      <ColorPicker
                        label="Color"
                        name="color"
                        value={data.color}
                        onChange={handleColorChange}
                        colors={COLORS}
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
                  className="bg-secondary h-10 w-32 cursor-pointer rounded-md border border-slate-300 text-sm font-bold text-white shadow-md focus:drop-shadow-xl disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  },
);

export default CreateCategoryModal;
