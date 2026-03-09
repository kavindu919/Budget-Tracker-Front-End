export interface budgetInterface {
  id?: string;
  amount: number;
  period: "daily" | "weekly" | "monthly" | "yearly";
  alertLimit?: number;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: string;
    name: string;
    color: string;
    type: string;
  };
  spent?: number;
  remaining?: number;
  percentage?: number;
  isExceeded?: boolean;
  isNearLimit?: boolean;
}

export interface BudgetQueryProps {
  period?: string;
  categoryId?: string;
  page: number;
  limit: number;
}

export interface BudgetPaginationProps {
  total: number;
  page: number;
  limit: number;
}
