export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export const initialTransactions: Transaction[] = [
  {
    id: "1",
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Aug 01, 2026",
    amount: 15,
    type: "expense",
  },
  {
    id: "2",
    name: "Freelance Payment",
    category: "Freelance",
    date: "Aug 02, 2026",
    amount: 1200,
    type: "income",
  },
  {
    id: "3",
    name: "Grocery Shopping",
    category: "Food",
    date: "Aug 03, 2026",
    amount: 85,
    type: "expense",
  },
];
