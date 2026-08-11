import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

import { useState } from "react";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TransactionType = "income" | "expense";

const AddTransactionDialog = ({
  open,
  onOpenChange,
}: AddTransactionDialogProps) => {
  const [category, setCategory] = useState("Food");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [type, setType] = useState<TransactionType>("expense");

  const [amount, setAmount] = useState(0);

  const [date, setDate] = useState("");
  const [dateOpen, setDateOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", {
      month: "long",
    }),
  );
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

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

  const increaseAmount = () => {
    setAmount((prev) => prev + 100);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(0, prev - 100));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (!isNaN(Number(value))) {
      setAmount(Number(value));
    }
  };

  const handleToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = months[today.getMonth()];
    const day = today.getDate();

    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);

    setDate(`${month.slice(0, 3)} ${String(day).padStart(2, "0")}, ${year}`);

    setDateOpen(false);
  };

  const handleAdd = () => {
    console.log({
      type,
      amount,
      category,
      date,
    });

    onOpenChange(false);
  };

  const selectedCategory = categories.find((item) => item.name === category);

  const CategoryIcon = selectedCategory?.icon;

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
            <ReceiptText size={24} />
          </div>

          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Add Transaction
          </DialogTitle>

          <DialogDescription className="mt-1.5 text-sm text-zinc-400">
            Add a new transaction to your finances.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-5 space-y-4">
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
                  "
                >
                  {CategoryIcon && (
                    <CategoryIcon size={15} className="mr-3 text-green-400" />
                  )}

                  {category}
                </button>
              </PopoverTrigger>

              <PopoverContent
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
                value={amount.toLocaleString()}
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
                    transition
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
                    transition
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
                          setSelectedYear((prev) => prev - 1);
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
                      onClick={() => setSelectedYear((prev) => prev + 1)}
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
                      onClick={() => {
                        setSelectedMonth(month);

                        const maxDay = new Date(
                          selectedYear,
                          months.indexOf(month) + 1,
                          0,
                        ).getDate();

                        if (selectedDay > maxDay) {
                          setSelectedDay(maxDay);
                        }
                      }}
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
                        length: new Date(
                          selectedYear,
                          months.indexOf(selectedMonth) + 1,
                          0,
                        ).getDate(),
                      },
                      (_, index) => index + 1,
                    ).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          setSelectedDay(day);

                          setDate(
                            `${selectedMonth.slice(0, 3)} ${String(
                              day,
                            ).padStart(2, "0")}, ${selectedYear}`,
                          );

                          setDateOpen(false);
                        }}
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
            onClick={() => onOpenChange(false)}
            className="
              h-10
              flex-1
              rounded-xl
              border
              border-white/10
              text-zinc-400
              hover:bg-white/5
              hover:text-white
            "
          >
            Cancel
          </Button>

          <Button
            onClick={handleAdd}
            className="
              h-10
              flex-1
              rounded-xl
              bg-green-400
              font-semibold
              text-black
              shadow-[0_0_25px_rgba(74,222,128,0.35)]
              hover:bg-green-300
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
