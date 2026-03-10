import axiosInstance from "@/lib/axios";
import {
  transactionInterface,
  TransactionQueryProps,
} from "@/utils/interfaces/transactionInterface";

export const createTransaction = async (data: transactionInterface) => {
  try {
    const res = await axiosInstance.post("/transaction/create", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getAllTransactions = async (query: TransactionQueryProps) => {
  try {
    const res = await axiosInstance.get("/transaction/get-all-transactions", {
      params: query,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getTransactionSummary = async () => {
  try {
    const res = await axiosInstance.get("/transaction/summary", {});
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const editTransaction = async (data: transactionInterface) => {
  try {
    const res = await axiosInstance.post("/transaction/update", data);
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/transaction/delete`, { id });
    return res.data;
  } catch (error: any) {
    const errorMessage = error?.message || error?.response?.data?.message;
    throw new Error(errorMessage);
  }
};
