import axiosInstance from "@/lib/axios";
import {
  categoryInterface,
  QueryProps,
} from "@/utils/interfaces/categoryInterface";

export const createCategory = async (data: categoryInterface) => {
  try {
    const res = await axiosInstance.post("/category/create", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const editCategory = async (data: categoryInterface) => {
  try {
    const res = await axiosInstance.post("/category/edit", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const res = await axiosInstance.post("/category/delete", { id });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getAllCategory = async (query: QueryProps) => {
  try {
    const res = await axiosInstance.get("/category/get-all-categories", {
      params: query,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};
