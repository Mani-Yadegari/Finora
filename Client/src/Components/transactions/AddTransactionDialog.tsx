import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { useTransactions } from "./TransactionsContext";

import {
  ReceiptText,
  CalendarDays,
  Wallet,
  Minus,
  Plus,
  Utensils,
  House,
  Plane,
  Car,
  GraduationCap,
  Laptop,
  HeartPulse,
  TrendingUp,
  PiggyBank,
  ShoppingBag,
  PartyPopper,
  Gamepad2,
  Package,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TransactionType = "income" | "expense";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categories = [
  { name: "Home", icon: House },
  { name: "Travel", icon: Plane },
  { name: "Transportation", icon: Car },
  { name: "Education", icon: GraduationCap },
  { name: "Technology", icon: Laptop },
  { name: "Health", icon: HeartPulse },
  { name: "Investment", icon: TrendingUp },
  { name: "Savings", icon: PiggyBank },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Events", icon: PartyPopper },
  { name: "Entertainment", icon: Gamepad2 },
  { name: "Food", icon: Utensils },
  { name: "Other", icon: Package },
];

const formatDate = (month: string, day: number, year: number) => {
  return `${month.slice(0, 3)} ${String(day).padStart(2, "0")}, ${year}`;
};

const AddTransactionDialog = ({
  open,
  onOpenChange,
}: AddTransactionDialogProps) => {
  const { addTransaction } = useTransactions();

  const today = new Date();

  const [name, setName] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const [date, setDate] = useState(
    formatDate(months[today.getMonth()], today.getDate(), today.getFullYear()),
  );

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const currentYear = today.getFullYear();

  const resetForm = () => {
    const now = new Date();

    setName("");
    setType("expense");
    setCategory("");
    setAmount(0);

    setSelectedYear(now.getFullYear());
    setSelectedMonth(months[now.getMonth()]);
    setSelectedDay(now.getDate());

    setDate(
      formatDate(months[now.getMonth()], now.getDate(), now.getFullYear()),
    );

    setCategoryOpen(false);
    setDateOpen(false);
  };

  const increaseAmount = () => {
    setAmount((prev) => prev + 100);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(0, prev - 100));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (value === "") {
      setAmount(0);
      return;
    }

    if (/^\d+$/.test(value)) {
      setAmount(Number(value));
    }
  };

  const handleToday = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = months[now.getMonth()];
    const day = now.getDate();

    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);

    setDate(formatDate(month, day, year));

    setDateOpen(false);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);

    const monthIndex = months.indexOf(selectedMonth);

    const maxDay = new Date(year, monthIndex + 1, 0).getDate();

    if (selectedDay > maxDay) {
      setSelectedDay(maxDay);
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);

    const monthIndex = months.indexOf(month);

    const maxDay = new Date(selectedYear, monthIndex + 1, 0).getDate();

    if (selectedDay > maxDay) {
      setSelectedDay(maxDay);
    }
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);

    setDate(formatDate(selectedMonth, day, selectedYear));

    setDateOpen(false);
  };

  const handleAdd = () => {
    if (!name.trim() || !category || amount <= 0) {
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      name: name.trim(),
      type,
      category,
      amount,
      date,
    });

    resetForm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const selectedCategory = categories.find((item) => item.name === category);

  const CategoryIcon = selectedCategory?.icon;

  const daysInSelectedMonth = new Date(
    selectedYear,
    months.indexOf(selectedMonth) + 1,
    0,
  ).getDate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-visible
          rounded-3xl
          border-white/10
          bg-white/[0.06]
          p-6
          text-white
          backdrop-blur-3xl
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            left-8
            h-40
            w-40
            rounded-full
            bg-emerald-400/10
            blur-3xl
          "
        />

        {/* Header */}
        <DialogHeader className="relative">
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-green-400/20
              bg-green-400/10
              text-green-400
              shadow-[0_0_30px_rgba(34,197,94,0.2)]
            "
          >
            <ReceiptText size={24} strokeWidth={1.8} />
          </div>

          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Add Transaction
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Add a new transaction to your finances.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-5 space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grocery shopping"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
                transition-all
                focus:border-green-400/50
                focus:ring-4
                focus:ring-green-400/10
              "
            />
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Type
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* Expense */}
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  text-sm
                  transition-all
                  ${
                    type === "expense"
                      ? "border-red-400/30 bg-red-400/10 text-red-400"
                      : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  }
                `}
              >
                <ArrowDownLeft size={16} />
                Expense
              </button>

              {/* Income */}
              <button
                type="button"
                onClick={() => setType("income")}
                className={`
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  text-sm
                  transition-all
                  ${
                    type === "income"
                      ? "border-green-400/30 bg-green-400/10 text-green-400"
                      : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  }
                `}
              >
                <ArrowUpRight size={16} />
                Income
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Category
            </label>

            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-3
                    text-sm
                    text-white
                    transition-all
                    hover:border-white/20
                    focus:outline-none
                  "
                >
                  {CategoryIcon && (
                    <CategoryIcon size={15} className="mr-3 text-green-400" />
                  )}

                  <span className={category ? "text-white" : "text-zinc-600"}>
                    {category || "Select category"}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-80
                  rounded-2xl
                  border-white/10
                  bg-zinc-950/95
                  p-4
                  text-white
                  backdrop-blur-xl
                "
              >
                <p className="mb-3 text-xs text-zinc-500">Select category</p>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setCategory(item.name);
                          setCategoryOpen(false);
                        }}
                        className={`
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          px-3
                          py-2
                          text-xs
                          transition
                          ${
                            category === item.name
                              ? "bg-green-400/20 text-green-400"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        <Icon size={15} />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Amount
            </label>

            <div
              className="
                flex
                h-11
                items-center
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                hover:border-white/20
                focus-within:border-green-400/50
                focus-within:ring-4
                focus-within:ring-green-400/10
              "
            >
              <Wallet size={15} className="ml-3 shrink-0 text-zinc-500" />

              <input
                inputMode="numeric"
                value={amount === 0 ? "" : amount.toLocaleString()}
                onChange={handleAmountChange}
                placeholder="0"
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                "
              />

              <div className="flex gap-1 pr-2">
                <button
                  type="button"
                  onClick={decreaseAmount}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-zinc-400
                    transition-all
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <Minus size={13} />
                </button>

                <button
                  type="button"
                  onClick={increaseAmount}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-green-400/20
                    bg-green-400/10
                    text-green-400
                    transition-all
                    hover:bg-green-400/20
                  "
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Date
            </label>

            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-3
                    text-sm
                    text-white
                    transition-all
                    hover:border-white/20
                  "
                >
                  <CalendarDays size={15} className="mr-3 text-zinc-500" />

                  {date || "Select date"}
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-80
                  rounded-2xl
                  border-white/10
                  bg-zinc-950/95
                  p-4
                  text-white
                  backdrop-blur-xl
                "
              >
                {/* Year */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs text-zinc-500">Select year</p>

                    <button
                      type="button"
                      onClick={handleToday}
                      className="
                        rounded-lg
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-green-400
                        transition
                        hover:bg-green-400/10
                        hover:text-green-300
                      "
                    >
                      Today
                    </button>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-3
                      py-2
                    "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedYear > currentYear) {
                          handleYearChange(selectedYear - 1);
                        }
                      }}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        text-zinc-400
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      ←
                    </button>

                    <span className="text-sm font-medium">{selectedYear}</span>

                    <button
                      type="button"
                      onClick={() => handleYearChange(selectedYear + 1)}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        text-zinc-400
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Month */}
                <p className="mb-2 text-xs text-zinc-500">Select month</p>

                <div className="grid grid-cols-3 gap-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthChange(month)}
                      className={`
                        rounded-lg
                        px-2
                        py-1.5
                        text-xs
                        transition
                        ${
                          selectedMonth === month
                            ? "bg-green-400/20 text-green-400"
                            : "text-zinc-400 hover:bg-green-400/10 hover:text-green-400"
                        }
                      `}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>

                {/* Day */}
                <div className="mt-4">
                  <p className="mb-2 text-xs text-zinc-500">Select day</p>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from(
                      {
                        length: daysInSelectedMonth,
                      },
                      (_, index) => index + 1,
                    ).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayChange(day)}
                        className={`
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-xs
                          transition
                          ${
                            selectedDay === day
                              ? "bg-green-400/20 text-green-400"
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="relative mt-6 flex gap-3">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="
              h-10
              flex-1
              rounded-xl
              border
              border-white/10
              text-zinc-400
              transition-all
              hover:bg-white/5
              hover:text-white
            "
          >
            Cancel
          </Button>

          <Button
            onClick={handleAdd}
            disabled={!name.trim() || !category || amount <= 0}
            className="
              h-10
              flex-1
              rounded-xl
              bg-green-400
              font-semibold
              text-black
              shadow-[0_0_25px_rgba(74,222,128,0.35)]
              transition-all
              hover:bg-green-300
              disabled:pointer-events-none
              disabled:opacity-40
            "
          >
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
