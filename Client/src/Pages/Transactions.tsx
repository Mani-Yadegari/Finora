import { ReceiptText } from "lucide-react";

import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";

const Transactions = () => {
  const monthlyTransactionCount = 12;

  return (
    <div className="relative space-y-6">
      {/* Header */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.07]
          bg-white/[0.025]
          px-6
          py-5
          backdrop-blur-xl
          shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
        "
      >
        {/* Ambient Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-56
            w-56
            rounded-full
            bg-emerald-500/[0.035]
            blur-3xl
          "
        />

        {/* Top Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -top-20
            left-1/4
            h-32
            w-64
            rounded-full
            bg-green-400/[0.025]
            blur-3xl
          "
        />

        <div className="relative flex items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Icon */}
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

            {/* Title */}
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

          {/* Monthly Stat */}
          <div
            className="
              hidden
              items-center
              gap-4
              sm:flex
            "
          >
            {/* Icon */}

            {/* Stat */}
            <div className="text-right ">
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-green-400
                    shadow-[0_0_7px_rgba(74,222,128,0.65)]
                  "
                />

                <span
                  className="
                    text-[10.5px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-zinc-500
                  "
                >
                  This month
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1.5">
                <span
                  className="
                    text-2xl
                    font-semibold
                    leading-none
                    tracking-tight
                    text-white
                  "
                >
                  {monthlyTransactionCount}
                </span>

                <span
                  className="
                    text-[15px]
                    font-medium
                    capitalize
                    text-zinc-500
                  "
                >
                  transactions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable />
    </div>
  );
};

export default Transactions;
