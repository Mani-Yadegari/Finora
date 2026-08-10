import { useState } from "react";

import Card from "../ui/Card";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

import {
  Clapperboard,
  ShoppingCart,
  Briefcase,
  Utensils,
  CircleDollarSign,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TransactionType = "income" | "expense";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
}

const transactions: Transaction[] = [
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

const TransactionTable = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedDeleteTransaction, setSelectedDeleteTransaction] =
    useState<Transaction | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
          {transactions.map((item) => {
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

                  transition-all
                  duration-200

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-lg

                        text-zinc-700

                        outline-none

                        transition-all
                        duration-200

                        hover:bg-white/[0.06]
                        hover:text-zinc-300

                        focus-visible:ring-1
                        focus-visible:ring-white/20

                        group-hover:text-zinc-500
                      "
                      aria-label={`Actions for ${item.name}`}
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="
                      w-40

                      rounded-xl

                      border
                      border-white/[0.08]

                      bg-[#101211]/95

                      p-1

                      text-zinc-300

                      shadow-[0_20px_60px_rgba(0,0,0,0.5)]

                      backdrop-blur-2xl
                    "
                  >
                    {/* Edit */}
                    <DropdownMenuItem
                      className="
                        gap-2
                        rounded-lg

                        text-zinc-400

                        outline-none

                        focus:bg-white/[0.06]
                        focus:text-white
                      "
                      onClick={() => {
                        setSelectedTransaction(item);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Pencil size={14} />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 bg-white/[0.07]" />

                    {/* Delete */}
                    <DropdownMenuItem
                      className="
                        gap-2
                        rounded-lg

                        text-red-400

                        outline-none

                        focus:bg-red-500/[0.08]
                        focus:text-red-400
                      "
                      onClick={() => {
                        setSelectedDeleteTransaction(item);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
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
