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
  startDate?: string;
  endDate?: string;
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

export interface DashboardSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  monthlyData: {
    month: string;
    income: number;
    expense: number;
  }[];
  categoryExpenses: {
    name: string;
    color: string;
    value: number;
  }[];
  budgetVsActual: {
    name: string;
    color: string;
    budget: number;
    spent: number;
  }[];
  recentTransactions: {
    id: string;
    title: string;
    amount: number;
    type: string;
    date: string;
    category: {
      name: string;
      color: string;
    };
  }[];
}
