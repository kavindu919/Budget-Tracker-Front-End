"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import PopUpModalComponent from "../../../components/PopUpModalComponent";
import {
  budgetInterface,
  BudgetQueryProps,
  BudgetPaginationProps,
} from "@/utils/interfaces/budgetInterface";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import { deleteBudget, getAllBudgets } from "../../../services/budget.Services";
import { getAllCategory } from "@/services/category.Services";
import PopupButton from "@/components/PopupButton";
import CreateBudgetPopup from "@/components/CreateBudgetPopup";
import EditBudgetPopup from "@/components/EditBudgetPopup";
import { getStatusBadge } from "@/utils/helpers/badge";

const DEFAULT_DELETE_STATE = { id: "", isOpen: false };

const PERIOD_OPTIONS = [
  { value: "", label: "All Periods" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const AllBudgets = () => {
  const pathname = usePathname();
  const [isDeletePopupOpen, setIsDeletePopupOpen] =
    useState(DEFAULT_DELETE_STATE);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<BudgetQueryProps>({
    period: "",
    categoryId: "",
    page: 1,
    limit: 20,
  });
  const [page, setPage] = useState<BudgetPaginationProps>({
    total: 0,
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState<budgetInterface[]>([]);
  const [categories, setCategories] = useState<categoryInterface[]>([]);
  const [editData, setEditData] = useState<budgetInterface | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getAllCategory({
        page: 1,
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      if (res.success) setCategories(res.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllBudgets(query);
      if (res.success) {
        setData(res.data);
        setPage(res.meta);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [query.page, query.limit, query.period, query.categoryId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = useCallback((budget: budgetInterface) => {
    setEditData(budget);
    setOpenEditPopup(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditData(null);
    setOpenEditPopup(false);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    setIsDeletePopupOpen({ id, isOpen: true });
  }, []);

  const handleDeleteClose = useCallback(() => {
    setIsDeletePopupOpen(DEFAULT_DELETE_STATE);
  }, []);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await deleteBudget(id);
        if (res.success) {
          toast.success(res.message);
          handleDeleteClose();
          fetchData();
        } else {
          toast.error(res.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    },
    [fetchData, handleDeleteClose],
  );

  const handlePageChange = useCallback((newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleCreateClose = useCallback(() => setOpenCreatePopup(false), []);
  const handleCreateSuccess = useCallback(() => {
    setOpenCreatePopup(false);
    fetchData();
  }, [fetchData]);

  const handleEditSuccess = useCallback(() => {
    handleEditClose();
    fetchData();
  }, [handleEditClose, fetchData]);

  const getProgressColor = (budget: budgetInterface) => {
    if (budget.isExceeded) return "bg-rose-500";
    if (budget.isNearLimit) return "bg-amber-400";
    return "bg-emerald-500";
  };

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <header className="flex flex-row items-center justify-between">
        <h5 className="text-xs text-slate-500 uppercase">
          {pathname.substring(1).split("/").join(" / ")}
        </h5>
        <PopupButton
          text="Create Budget"
          type="button"
          isLoading={loading}
          disabled={loading}
          onClick={() => setOpenCreatePopup(true)}
        />
      </header>

      <section className="flex items-center gap-3">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              setQuery((prev) => ({ ...prev, period: opt.value, page: 1 }))
            }
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              query.period === opt.value
                ? "border-secondary bg-secondary text-white"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </section>

      <section>
        <table className="tableoutline">
          <thead className="tablehead">
            <tr>
              <th className="tableheadcell">Category</th>
              <th className="tableheadcell">Period</th>
              <th className="tableheadcell">Budget</th>
              <th className="tableheadcell">Spent</th>
              <th className="tableheadcell">Remaining</th>
              <th className="tableheadcell">Progress</th>
              <th className="tableheadcell">Status</th>
              <th className="tableheadcell">Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={8} className="px-4 py-3">
                    <div className="h-5 w-full animate-pulse rounded-md bg-slate-100" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-slate-400">
                      No budgets found
                    </p>
                    <p className="text-xs text-slate-300">
                      Create a budget to start tracking your spending
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="tablerow">
                  <td className="tabledata">
                    {item.category ? (
                      <div className="inline-flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.category.color }}
                        />
                        <span className="font-medium text-slate-700">
                          {item.category.name}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="tabledata">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">
                      {item.period}
                    </span>
                  </td>
                  <td className="tabledata font-medium text-slate-700">
                    {item.amount}
                  </td>
                  <td className="tabledata">
                    <span
                      className={
                        item.isExceeded
                          ? "font-semibold text-rose-600"
                          : "text-slate-600"
                      }
                    >
                      {item.spent ?? 0}
                    </span>
                  </td>
                  <td className="tabledata">
                    <span
                      className={
                        item.remaining === 0
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }
                    >
                      {item.remaining ?? 0}
                    </span>
                  </td>
                  <td className="tabledata w-36">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item)}`}
                          style={{ width: `${item.percentage ?? 0}%` }}
                        />
                      </div>
                      <span className="w-9 text-xs text-slate-400">
                        {item.percentage ?? 0}%
                      </span>
                    </div>
                  </td>
                  <td className="tabledata">{getStatusBadge(item)}</td>
                  <td className="tabledata">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-600"
                        onClick={() => handleEditClick(item)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
                        onClick={() => handleDeleteClick(item.id!)}
                      >
                        <MdDeleteOutline size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="flex w-full flex-row items-center justify-center p-3">
        <Pagination
          currentPage={page.page}
          totalPages={Math.ceil(page.total / page.limit)}
          onPageChange={handlePageChange}
        />
      </section>

      {isDeletePopupOpen.isOpen && (
        <PopUpModalComponent
          isOpen={isDeletePopupOpen.isOpen}
          title="Delete Budget"
          onClose={handleDeleteClose}
          loading={loading}
          onConfirm={() => handleDeleteConfirm(isDeletePopupOpen.id)}
          confirmText={loading ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        >
          <span>Are you sure you want to delete this budget?</span>
        </PopUpModalComponent>
      )}

      {openCreatePopup && (
        <CreateBudgetPopup
          isOpen={openCreatePopup}
          onClose={handleCreateClose}
          onSuccess={handleCreateSuccess}
          categories={categories}
        />
      )}

      {openEditPopup && editData && (
        <EditBudgetPopup
          isOpen={openEditPopup}
          data={editData}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
          categories={categories}
        />
      )}
    </div>
  );
};

export default AllBudgets;
