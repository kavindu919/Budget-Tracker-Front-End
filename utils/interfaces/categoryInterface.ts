export interface categoryInterface {
  id?: string;
  name: string;
  type: "income" | "expense";
  color: string;
  createdAt?: string;
}

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
}

export interface QueryProps {
  search?: string;
  type?: "income" | "expense" | "";
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "desc";
}
