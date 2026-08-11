import { useMemo, useState } from "react";

import Card from "../ui/Card";
import MoreActionsMenu from "../ui/MoreActionsMenu.tsx";

import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

import { transactions, type Transaction } from "./transactionsData";

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

const normalizeDate = (dateString: string) => {
  return new Date(dateString);
};

const isDateInFilter = (
  transactionDate: string,
  filters: TransactionFilterValues,
) => {
  if (!filters.date) {
    return true;
  }

  const date = normalizeDate(transactionDate);

  if (Number.isNaN(date.getTime())) {
    return true;
  }

  const now = new Date();

  if (filters.date === "today") {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

  if (filters.date === "this-week") {
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();

    const diff = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    return date >= startOfWeek && date < endOfWeek;
  }

  if (filters.date === "this-month") {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  }

  if (filters.date === "last-month") {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return (
      date.getFullYear() === lastMonth.getFullYear() &&
      date.getMonth() === lastMonth.getMonth()
    );
  }

  if (filters.date === "custom") {
    if (filters.customFrom) {
      const from = new Date(`${filters.customFrom}T00:00:00`);

      if (date < from) {
        return false;
      }
    }

    if (filters.customTo) {
      const to = new Date(`${filters.customTo}T23:59:59`);

      if (date > to) {
        return false;
      }
    }

    return true;
  }

  return true;
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
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedDeleteTransaction, setSelectedDeleteTransaction] =
    useState<Transaction | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return transactions.filter((item) => {
      /*
       * Search
       */
      if (normalizedSearch) {
        const matchesSearch =
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.category.toLowerCase().includes(normalizedSearch) ||
          item.date.toLowerCase().includes(normalizedSearch);

        if (!matchesSearch) {
          return false;
        }
      }

      /*
       * Type
       */
      if (filters.type !== "all" && item.type !== filters.type) {
        return false;
      }

      /*
       * Category
       */
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(item.category)
      ) {
        return false;
      }

      /*
       * Date
       */
      if (!isDateInFilter(item.date, filters)) {
        return false;
      }

      /*
       * Amount
       */
      if (!isAmountInFilter(item.amount, filters)) {
        return false;
      }

      return true;
    });
  }, [search, filters]);

  return (
    <>
      <Card
        className="
          overflow-hidden
          border-white/[0.08]
          bg-white/[0.025]
          backdrop-blur-2xl
          shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
        "
      >
        {/* Table Header */}
        <div
          className="
            grid
            grid-cols-[2fr_1.15fr_1.15fr_0.75fr_40px]
            items-center
            gap-6
            border-b
            border-white/[0.06]
            px-6
            py-4
          "
        >
          <span
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-zinc-600
            "
          >
            Transaction
          </span>

          <span
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-zinc-600
            "
          >
            Category
          </span>

          <span
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-zinc-600
            "
          >
            Date
          </span>

          <span
            className="
              text-right
              text-[11px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-zinc-600
            "
          >
            Amount
          </span>

          <span />
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/[0.045]">
          {filteredTransactions.map((item) => {
            const Icon = getTransactionIcon(item.category);

            return (
              <div
                key={item.id}
                className="
                  group
                  grid
                  grid-cols-[2fr_1.15fr_1.15fr_0.75fr_40px]
                  items-center
                  gap-6
                  px-6
                  py-4
                  hover:bg-white/[0.018]
                "
              >
                {/* Transaction */}
                <div className="flex min-w-0 items-center gap-3">
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
                      border-white/[0.07]
                      bg-white/[0.025]
                      text-zinc-500
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
                      transition-all
                      duration-200
                      group-hover:border-white/[0.10]
                      group-hover:bg-white/[0.04]
                      group-hover:text-zinc-300
                    "
                  >
                    <Icon size={16} strokeWidth={1.7} />
                  </div>

                  <span
                    className="
                      min-w-0
                      truncate
                      text-sm
                      font-medium
                      text-zinc-200
                      transition-colors
                      group-hover:text-white
                    "
                  >
                    {item.name}
                  </span>
                </div>

                {/* Category */}
                <div>
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-lg
                      border
                      border-white/[0.06]
                      bg-white/[0.025]
                      px-2.5
                      py-1
                      text-[11px]
                      font-medium
                      text-zinc-500
                      transition-all
                      duration-200
                      group-hover:border-white/[0.08]
                      group-hover:text-zinc-400
                    "
                  >
                    {item.category}
                  </span>
                </div>

                {/* Date */}
                <span
                  className="
                    text-sm
                    text-zinc-500
                    transition-colors
                    group-hover:text-zinc-400
                  "
                >
                  {item.date}
                </span>

                {/* Amount */}
                <span
                  className={`
                    text-right
                    text-sm
                    font-semibold
                    tracking-tight
                    ${
                      item.type === "income" ? "text-green-400" : "text-red-400"
                    }
                  `}
                >
                  {item.type === "income" ? "+" : "-"}$
                  {item.amount.toLocaleString()}
                </span>

                {/* Actions */}
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

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  text-zinc-600
                "
              >
                <CircleDollarSign size={18} />
              </div>

              <p className="mt-3 text-sm font-medium text-zinc-300">
                No transactions found
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Transaction Dialog */}
      <EditTransactionDialog
        transaction={selectedTransaction}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      {/* Delete Transaction Dialog */}
      <DeleteTransactionDialog
        transactionName={selectedDeleteTransaction?.name ?? ""}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          console.log("Delete:", selectedDeleteTransaction?.id);

          setDeleteDialogOpen(false);
          setSelectedDeleteTransaction(null);
        }}
      />
    </>
  );
};

export default TransactionTable;
