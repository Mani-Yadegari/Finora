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
  FolderPen,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface EditTransactionDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditTransactionDialog = ({
  transaction,
  open,
  onOpenChange,
}: EditTransactionDialogProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const [category, setCategory] = useState("Entertainment");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [typeOpen, setTypeOpen] = useState(false);

  const [date, setDate] = useState("");
  const [dateOpen, setDateOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedDay, setSelectedDay] = useState(1);

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

  useEffect(() => {
    if (!transaction) return;

    setName(transaction.name);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setType(transaction.type);
    setDate(transaction.date);

    // Sync date picker with transaction date
    const parsedDate = new Date(transaction.date);

    if (!isNaN(parsedDate.getTime())) {
      setSelectedYear(parsedDate.getFullYear());
      setSelectedMonth(months[parsedDate.getMonth()]);
      setSelectedDay(parsedDate.getDate());
    }
  }, [transaction]);

  const increaseAmount = () => {
    setAmount((prev) => prev + 100);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(1, prev - 100));
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

  const inputStyle = `
    h-11
    rounded-xl
    border
    border-white/10
    bg-white/[0.04]
    text-white
    transition-all
    duration-300
    hover:border-white/20
    focus-visible:border-green-400/50
    focus-visible:ring-4
    focus-visible:ring-green-400/10
    focus-visible:bg-white/[0.06]
  `;

  const selectedCategory = categories.find((item) => item.name === category);

  const CategoryIcon = selectedCategory?.icon;

  const handleSave = () => {
    console.log({
      id: transaction?.id,
      name,
      category,
      type,
      amount,
      date,
    });

    onOpenChange(false);
  };

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
            Edit Transaction
          </DialogTitle>

          <DialogDescription className="mt-1.5 text-sm text-zinc-400">
            Update your transaction details.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-5 space-y-4">
          {/* Transaction Name */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Transaction Name
            </label>

            <div className="relative">
              <FolderPen
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputStyle} pl-10`}
              />
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

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Type
            </label>

            <Popover open={typeOpen} onOpenChange={setTypeOpen}>
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
                  {type === "income" ? (
                    <ArrowUpRight size={16} className="mr-3 text-green-400" />
                  ) : (
                    <ArrowDownLeft size={16} className="mr-3 text-red-400" />
                  )}

                  {type === "income" ? "Income" : "Expense"}
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="
                  w-72
                  rounded-2xl
                  border-white/10
                  bg-zinc-950/95
                  p-3
                  text-white
                  backdrop-blur-xl
                "
              >
                <p className="mb-3 px-1 text-xs text-zinc-500">
                  Select transaction type
                </p>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setType("income");
                      setTypeOpen(false);
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      transition
                      ${
                        type === "income"
                          ? "bg-green-400/10 text-green-400"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <ArrowUpRight size={17} />
                    Income
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setType("expense");
                      setTypeOpen(false);
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      transition
                      ${
                        type === "expense"
                          ? "bg-red-400/10 text-red-400"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <ArrowDownLeft size={17} />
                    Expense
                  </button>
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
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  text-sm
                  text-white
                  outline-none
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
            onClick={handleSave}
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionDialog;
