import { useState } from "react";
import { ReceiptText } from "lucide-react";

import TransactionFilters, {
  type TransactionFilterValues,
} from "../components/transactions/TransactionFilters";

import TransactionTable from "../components/transactions/TransactionTable";

import { useTransactions } from "../components/transactions/TransactionsContext";

const initialFilters: TransactionFilterValues = {
  type: "all",
  categories: [],
  date: null,
  amount: null,
  customMin: "",
  customMax: "",
  customFrom: "",
  customTo: "",
};

const Transactions = () => {
  const { transactions } = useTransactions();

  const [search, setSearch] = useState("");

  const [appliedFilters, setAppliedFilters] =
    useState<TransactionFilterValues>(initialFilters);

  const handleApplyFilters = (filters: TransactionFilterValues) => {
    setAppliedFilters(filters);
  };

  return (
    <div
      className="
      relative
      space-y-6
      overflow-hidden
      rounded-3xl
      border
      border-white/[0.08]
      bg-white/[0.035]
      p-6
      backdrop-blur-3xl
    "
    >
      {/* Background Glow */}
      <div
        className="
        pointer-events-none
        absolute
        -right-20
        -top-20
        h-60
        w-60
        rounded-full
        bg-green-400/10
        blur-3xl
      "
      />

      {/* Header */}
      <div className="relative">
        <div
          className="
          pointer-events-none
          absolute
          left-1/4
          top-0
          h-px
          w-1/2
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
        />

        <div className="relative flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-green-400/15
              bg-green-400/[0.07]
              text-green-400
              shadow-[0_0_30px_rgba(34,197,94,0.08)]
            "
            >
              <ReceiptText size={21} strokeWidth={1.8} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white
                "
                >
                  Transactions
                </h1>

                <span
                  className="
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.035]
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
                >
                  Activity
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-500">
                Review, manage and track your financial activity.
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="hidden text-right sm:block">
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span
                className="
                text-[10.5px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-zinc-500
              "
              >
                Total
              </span>
            </div>

            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-2xl font-semibold text-white">
                {transactions.length}
              </span>

              <span className="text-[15px] font-medium text-zinc-500">
                Transactions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        onApply={handleApplyFilters}
        appliedFilters={appliedFilters}
      />

      {/* Table */}
      <TransactionTable search={search} filters={appliedFilters} />
    </div>
  );
};

export default Transactions;
