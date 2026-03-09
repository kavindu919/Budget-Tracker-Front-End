import axiosInstance from "@/lib/axios";
import {
  budgetInterface,
  BudgetQueryProps,
} from "@/utils/interfaces/budgetInterface";

export const createBudget = async (data: budgetInterface) => {
  try {
    const res = await axiosInstance.post("/budget/create", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getAllBudgets = async (query: BudgetQueryProps) => {
  try {
    const res = await axiosInstance.get("/budget/get-budgets", {
      params: query,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const editBudget = async (data: budgetInterface) => {
  try {
    const res = await axiosInstance.post("/budget/edit", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const deleteBudget = async (id: string) => {
  try {
    const res = await axiosInstance.post("/budget/delete", { id });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};
