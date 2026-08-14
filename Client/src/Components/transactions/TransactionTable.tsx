import { useMemo, useState } from "react";

import Card from "../ui/Card";
import MoreActionsMenu from "../ui/MoreActionsMenu.tsx";

import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

import { useTransactions } from "./TransactionsContext";
import type { Transaction } from "./transactionsData";

import {
  Clapperboard,
  ShoppingCart,
  Briefcase,
  Utensils,
  CircleDollarSign,
} from "lucide-react";

import type { TransactionFilterValues } from "./TransactionFilters";

interface TransactionTableProps {
  search: string;
  filters: TransactionFilterValues;
}

const getTransactionIcon = (category: string) => {
  switch (category) {
    case "Entertainment":
      return Clapperboard;

    case "Freelance":
      return Briefcase;

    case "Food":
      return Utensils;

    case "Shopping":
      return ShoppingCart;

    default:
      return CircleDollarSign;
  }
};

const isAmountInFilter = (amount: number, filters: TransactionFilterValues) => {
  switch (filters.amount) {
    case "under-50":
      return amount < 50;

    case "50-100":
      return amount >= 50 && amount <= 100;

    case "100-500":
      return amount > 100 && amount <= 500;

    case "500-1000":
      return amount > 500 && amount <= 1000;

    case "over-1000":
      return amount > 1000;

    case "custom": {
      const min = filters.customMin !== "" ? Number(filters.customMin) : null;

      const max = filters.customMax !== "" ? Number(filters.customMax) : null;

      if (min !== null && amount < min) {
        return false;
      }

      if (max !== null && amount > max) {
        return false;
      }

      return true;
    }

    default:
      return true;
  }
};

const TransactionTable = ({ search, filters }: TransactionTableProps) => {
  const { transactions, deleteTransaction, updateTransaction } =
    useTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedDeleteTransaction, setSelectedDeleteTransaction] =
    useState<Transaction | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((item) => {
      if (query) {
        const match =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query);

        if (!match) {
          return false;
        }
      }

      if (filters.type !== "all" && item.type !== filters.type) {
        return false;
      }

      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(item.category)
      ) {
        return false;
      }

      if (!isAmountInFilter(item.amount, filters)) {
        return false;
      }

      return true;
    });
  }, [transactions, search, filters]);

  const handleDelete = () => {
    if (!selectedDeleteTransaction) {
      return;
    }

    deleteTransaction(selectedDeleteTransaction.id);

    setSelectedDeleteTransaction(null);
    setDeleteDialogOpen(false);
  };

  const handleEditSave = (updated: Transaction) => {
    updateTransaction(updated);

    setEditDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <Card
        className="
        overflow-hidden
        !border-white/[0.06]
        !bg-white/[0.015]
        !backdrop-blur-3xl
        [&::before]:!from-white/[0.02]
        [&::before]:!via-transparent
        [&::before]:!to-transparent
        hover:!bg-white/[0.015]
        hover:!border-white/[0.06]
        hover:!shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.015)]
      "
      >
        {/* Header */}
        <div
          className="
          grid
          grid-cols-[2fr_1.15fr_1.15fr_.75fr_40px]
          items-center
          gap-6
          border-b
          border-white/[0.04]
          px-6
          py-4
        "
        >
          {["Transaction", "Category", "Date", "Amount", ""].map((title) => (
            <span
              key={title}
              className="
              text-[11px]
              font-medium
              uppercase
              tracking-wider
              text-zinc-600
            "
            >
              {title}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/[0.025]">
          {filteredTransactions.map((item) => {
            const Icon = getTransactionIcon(item.category);

            return (
              <div
                key={item.id}
                className="
    group
    grid
    grid-cols-[2fr_1.15fr_1.15fr_.75fr_40px]
    items-center
    gap-6
    px-6
    py-4
    border-b
    border-white/[0.025]
    last:border-b-0
    transition-colors
    duration-200
    hover:bg-white/[0.008]
  "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    text-zinc-400
                  "
                  >
                    <Icon size={16} />
                  </div>

                  <span className="truncate text-sm text-zinc-200">
                    {item.name}
                  </span>
                </div>

                <span
                  className="
                  w-fit
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-2
                  py-1
                  text-xs
                  text-zinc-400
                "
                >
                  {item.category}
                </span>

                <span className="text-sm text-zinc-500">{item.date}</span>

                <span
                  className={`
                  text-right
                  text-sm
                  font-semibold
                  ${item.type === "income" ? "text-green-400" : "text-red-400"}
                `}
                >
                  {item.type === "income" ? "+" : "-"}$
                  {item.amount.toLocaleString()}
                </span>

                <MoreActionsMenu
                  label={`Actions for ${item.name}`}
                  onEdit={() => {
                    setSelectedTransaction(item);
                    setEditDialogOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedDeleteTransaction(item);
                    setDeleteDialogOpen(true);
                  }}
                />
              </div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              py-16
              text-center
            "
            >
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                text-zinc-500
              "
              >
                <CircleDollarSign size={24} />
              </div>

              <h3 className="mt-4 text-sm font-medium text-zinc-300">
                No transactions found
              </h3>

              <p className="mt-1 text-xs text-zinc-600">
                Try changing your filters or add a new transaction.
              </p>
            </div>
          )}
        </div>
      </Card>

      <EditTransactionDialog
        transaction={selectedTransaction}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleEditSave}
      />

      <DeleteTransactionDialog
        transactionName={selectedDeleteTransaction?.name ?? ""}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default TransactionTable;
