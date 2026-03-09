"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import PopUpModalComponent from "../../../components/PopUpModalComponent";
import { useDebounce } from "../../../hooks/useDebouncehook";
import {
  transactionInterface,
  TransactionQueryProps,
  TransactionPaginationProps,
} from "@/utils/interfaces/transactionInterface";
import {
  deleteTransaction,
  getAllTransactions,
} from "@/services/transaction.Services";
import PopupButton from "@/components/PopupButton";

import { getTypeBadge } from "@/utils/helpers/badge";
import CreateTransactionPopup from "@/components/CreateTransactionPopup";
import EditTransactionPopup from "@/components/EditTransactionPopup";
import TransactionFilters from "@/components/TransactionFilters";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import { getAllCategory } from "@/services/category.Services";

const AllTransactions = () => {
  const pathname = usePathname();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<TransactionQueryProps>({
    search: "",
    type: "",
    categoryId: "",
    page: 1,
    limit: 20,
    sortBy: "date",
    sortOrder: "desc",
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState<TransactionPaginationProps>({
    total: 0,
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState<transactionInterface[]>([]);
  const [editData, setEditData] = useState<transactionInterface | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState<boolean>(false);
  const [openCreatePopup, setOpenCreatePopup] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryInterface[]>([]);

  const debounced = useDebounce(400, query.search);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllTransactions({ ...query, search: debounced });
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
  }, [
    query.page,
    query.limit,
    query.sortBy,
    query.sortOrder,
    query.type,
    query.categoryId,
    query.startDate,
    query.endDate,
    debounced,
  ]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEditClick = useCallback((transaction: transactionInterface) => {
    setEditData(transaction);
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
    setIsDeletePopupOpen({
      id: "",
      isOpen: false,
    });
  }, []);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await deleteTransaction(id);
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

  return (
    <div className="h-full w-full space-y-4 pb-24">
      <header className="flex flex-row items-center justify-between">
        <h5 className="text-xs text-slate-500 uppercase">
          {pathname.substring(1).split("/").join(" / ")}
        </h5>
        <PopupButton
          text="Create Transaction"
          type="button"
          isLoading={loading}
          disabled={loading}
          onClick={() => setOpenCreatePopup(true)}
        />
      </header>

      <section>
        <section className="mb-4">
          <TransactionFilters
            query={query}
            setQuery={setQuery}
            categories={categories}
          />
        </section>
        <table className="tableoutline">
          <thead className="tablehead">
            <tr>
              <th className="tableheadcell">Title</th>
              <th className="tableheadcell">Amount</th>
              <th className="tableheadcell">Category</th>
              <th className="tableheadcell">Type</th>
              <th className="tableheadcell">Date</th>
              <th className="tableheadcell">Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={6} className="px-4 py-3">
                    <div className="h-5 w-full animate-pulse rounded-md bg-slate-100" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-slate-400">
                      No transactions found
                    </p>
                    <p className="text-xs text-slate-300">
                      Create a transaction to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="tablerow">
                  <td className="tabledata font-medium text-slate-700">
                    {item.title ?? "-"}
                  </td>
                  <td className="tabledata">
                    <span
                      className={`font-semibold ${item.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {Number(item.amount)}
                    </span>
                  </td>
                  <td className="tabledata">
                    {item.category ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.category.color }}
                        />
                        <span className="text-xs font-medium text-slate-500">
                          {item.category.name}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="tabledata">{getTypeBadge(item.type)}</td>
                  <td className="tabledata text-slate-400">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </td>
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
          title="Delete Transaction"
          onClose={handleDeleteClose}
          loading={loading}
          onConfirm={() => handleDeleteConfirm(isDeletePopupOpen.id)}
          confirmText={loading ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        >
          <span>Are you sure you want to delete this transaction?</span>
        </PopUpModalComponent>
      )}

      {openCreatePopup && (
        <CreateTransactionPopup
          isOpen={openCreatePopup}
          onClose={handleCreateClose}
          onSuccess={handleCreateSuccess}
          categories={categories}
        />
      )}

      {openEditPopup && editData && (
        <EditTransactionPopup
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

export default AllTransactions;
