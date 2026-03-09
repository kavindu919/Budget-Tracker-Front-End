"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import PopUpModalComponent from "../../../components/PopUpModalComponent";
import { useDebounce } from "../../../hooks/useDebouncehook";
import {
  categoryInterface,
  PaginationProps,
  QueryProps,
} from "@/utils/interfaces/categoryInterface";
import { deleteCategory, getAllCategory } from "@/services/category.Services";
import PopupButton from "@/components/PopupButton";
import CreateCategoryModal from "@/components/CategoryCreatePopup";
import { getColorDisplay, getTypeBadge } from "@/utils/helpers/badge";
import EditCategoryModal from "@/components/EditCategoryModal";
import CategoryFilters from "@/components/CategoryFilter";

const AllCategory = () => {
  const pathname = usePathname();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<{
    id: string;
    isOpen: boolean;
  }>({
    id: "",
    isOpen: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<QueryProps>({
    search: "",
    type: "",
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [page, setPage] = useState<PaginationProps>({
    total: 0,
    page: 1,
    limit: 20,
  });
  const [data, setData] = useState<categoryInterface[]>([]);
  const [editData, setEditData] = useState<categoryInterface | null>(null);
  const [openEditPopup, setOpenEditPopup] = useState<boolean>(false);
  const [openCreatePopup, setOpenCreatePopup] = useState<boolean>(false);

  const debounced = useDebounce(400, query.search);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllCategory({ ...query, search: debounced });
      if (res.success) {
        setData(res.data);
        setPage(res.meta);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [
    query.page,
    query.limit,
    query.sortBy,
    query.sortOrder,
    query.type,
    debounced,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = useCallback((category: categoryInterface) => {
    setEditData(category);
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
    setIsDeletePopupOpen({ id: "", isOpen: false });
  }, []);

  const handleDeleteConfirm = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await deleteCategory(id);
        if (res.success) {
          toast.success(res.message);
          handleDeleteClose();
          fetchData();
        } else {
          toast.error(res.message);
        }
      } catch (error: any) {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchData, handleDeleteClose],
  );

  const handlePageChange = useCallback((newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleCreateClose = useCallback(() => {
    setOpenCreatePopup(false);
  }, []);

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
          text="Create Category"
          type="button"
          isLoading={loading}
          disabled={loading}
          onClick={() => setOpenCreatePopup(true)}
        />
      </header>

      <section className="flex flex-row gap-3">
        <CategoryFilters query={query} setQuery={setQuery} />
      </section>
      <section>
        <table className="tableoutline">
          <thead className="tablehead">
            <tr>
              <th className="tableheadcell">Name</th>
              <th className="tableheadcell">Type</th>
              <th className="tableheadcell">Color</th>
              <th className="tableheadcell">Created</th>
              <th className="tableheadcell">Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td colSpan={5} className="px-4 py-3">
                    <div className="h-5 w-full animate-pulse rounded-md bg-slate-100" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-slate-400">
                      No categories found
                    </p>
                    <p className="text-xs text-slate-300">
                      Create a category to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="tablerow">
                  <td className="tabledata font-medium text-slate-700">
                    {item.name ?? "-"}
                  </td>
                  <td className="tabledata">{getTypeBadge(item.type)}</td>
                  <td className="tabledata">{getColorDisplay(item.color)}</td>
                  <td className="tabledata text-slate-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-US", {
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
          title="Delete Category"
          onClose={handleDeleteClose}
          loading={loading}
          onConfirm={() => handleDeleteConfirm(isDeletePopupOpen.id)}
          confirmText={loading ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        >
          <span>Are you sure you want to delete this category?</span>
        </PopUpModalComponent>
      )}

      {openCreatePopup && (
        <CreateCategoryModal
          isOpen={openCreatePopup}
          onClose={handleCreateClose}
          onSuccess={handleCreateSuccess}
        />
      )}
      {openEditPopup && editData && (
        <EditCategoryModal
          isOpen={openEditPopup}
          data={editData}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default AllCategory;
