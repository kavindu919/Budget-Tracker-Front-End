export interface transactionInterface {
  id?: string;
  title: string;
  amount: number;
  categoryId: string;
  type: "income" | "expense";
  date: string;
  note?: string;
  createdAt?: string;
  category?: {
    id: string;
    name: string;
    color: string;
  };
}

export interface TransactionQueryProps {
  search?: string;
  type?: string;
  categoryId?: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface TransactionPaginationProps {
  total: number;
  page: number;
  limit: number;
}
