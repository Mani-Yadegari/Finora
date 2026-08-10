import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  WalletCards,
  CalendarDays,
  Wallet,
  Minus,
  Plus,
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
} from "lucide-react";

import { useState } from "react";

interface EditGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditGoalDialog = ({ open, onOpenChange }: EditGoalDialogProps) => {
  const [amount, setAmount] = useState(30000);

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedMonth, setSelectedMonth] = useState("October");

  const [deadline, setDeadline] = useState(`October ${currentYear}`);

  const [category, setCategory] = useState("Travel");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [deadlineOpen, setDeadlineOpen] = useState(false);

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
    {
      name: "Home",
      icon: House,
    },
    {
      name: "Travel",
      icon: Plane,
    },
    {
      name: "Transportation",
      icon: Car,
    },
    {
      name: "Education",
      icon: GraduationCap,
    },
    {
      name: "Technology",
      icon: Laptop,
    },
    {
      name: "Health",
      icon: HeartPulse,
    },
    {
      name: "Investment",
      icon: TrendingUp,
    },
    {
      name: "Savings",
      icon: PiggyBank,
    },
    {
      name: "Shopping",
      icon: ShoppingBag,
    },
    {
      name: "Events",
      icon: PartyPopper,
    },
    {
      name: "Entertainment",
      icon: Gamepad2,
    },
    {
      name: "Other",
      icon: Package,
    },
  ];

  const increaseAmount = () => {
    setAmount((prev) => prev + 1000);
  };

  const decreaseAmount = () => {
    setAmount((prev) => Math.max(1000, prev - 1000));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (!isNaN(Number(value))) {
      setAmount(Number(value));
    }
  };

  const inputStyle = `
    h-12
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-950/80
          p-6
          text-white
          backdrop-blur-2xl
          shadow-[0_25px_100px_rgba(0,0,0,0.7)]
        "
      >
        <div
          className="
            absolute
            -top-24
            right-10
            h-48
            w-48
            rounded-full
            bg-green-400/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-24
            left-10
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
              mb-5
              flex
              h-14
              w-14
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
            <WalletCards size={26} />
          </div>

          <DialogTitle
            className="
              text-2xl
              font-semibold
              tracking-tight
            "
          >
            Edit Financial Goal
          </DialogTitle>

          <DialogDescription
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >
            Update your saving target and deadline.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-7 space-y-5">
          {/* Goal Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Goal Name
            </label>

            <div className="relative">
              <FolderPen
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <Input
                defaultValue="Dream Vacation"
                className={`
                  ${inputStyle}
                  pl-10
                `}
              />
            </div>
          </div>{" "}
          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Category
            </label>

            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <button
                  className="
                    flex
                    h-12
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
                    duration-300
                    hover:border-white/20
                    focus:ring-4
                    focus:ring-green-400/10
                  "
                >
                  {CategoryIcon && (
                    <CategoryIcon
                      size={16}
                      className="
                        mr-3
                        text-green-400
                      "
                    />
                  )}

                  {category}
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="
                  w-80
                  rounded-2xl
                  border
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
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Target Amount
            </label>

            <div
              className="
                flex
                h-12
                items-center
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-300
                hover:border-white/20
                focus-within:border-green-400/50
                focus-within:ring-4
                focus-within:ring-green-400/10
              "
            >
              <Wallet
                size={16}
                className="
                  ml-3
                  shrink-0
                  text-zinc-500
                "
              />

              <input
                value={amount.toLocaleString()}
                onChange={handleAmountChange}
                className="
                  h-95
                  flex-1
                  bg-transparent
                  px-3
                  text-sm
                  text-white
                  outline-none
                "
                required
              />

              <div className="flex gap-1 pr-2">
                <button
                  type="button"
                  onClick={decreaseAmount}
                  className="
                    flex
                    h-8
                    w-8
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
                  <Minus size={14} />
                </button>

                <button
                  type="button"
                  onClick={increaseAmount}
                  className="
                    flex
                    h-8
                    w-8
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
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
          {/* Deadline */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500">
              Deadline
            </label>

            <Popover open={deadlineOpen} onOpenChange={setDeadlineOpen}>
              <PopoverTrigger asChild>
                <button
                  className="
                    flex
                    h-12
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
                    duration-300
                    hover:border-white/20
                  "
                >
                  <CalendarDays
                    size={16}
                    className="
                      mr-3
                      text-zinc-500
                    "
                  />

                  {deadline}
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="
                  w-80
                  rounded-2xl
                  border
                  border-white/10
                  bg-zinc-950/95
                  p-4
                  text-white
                  backdrop-blur-xl
                "
              >
                <div className="mb-5">
                  <p className="mb-3 text-xs text-zinc-500">Select year</p>

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
                      onClick={() => {
                        const year = selectedYear - 1;

                        if (year >= currentYear) {
                          setSelectedYear(year);
                          setDeadline(`${selectedMonth} ${year}`);
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
                      onClick={() => {
                        const year = selectedYear + 1;

                        setSelectedYear(year);

                        setDeadline(`${selectedMonth} ${year}`);
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
                      →
                    </button>
                  </div>
                </div>

                <p className="mb-3 text-xs text-zinc-500">Select month</p>

                <div className="grid grid-cols-3 gap-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);

                        setDeadline(`${month} ${selectedYear}`);

                        setDeadlineOpen(false);
                      }}
                      className={`
                        rounded-lg
                        px-2
                        py-2
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
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter
          className="
            relative
            mt-8
            flex
            gap-3
          "
        >
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="
              h-11
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
            onClick={() => onOpenChange(false)}
            className="
              h-11
              flex-1
              rounded-xl
              bg-green-400
              font-semibold
              text-black
              shadow-[0_0_25px_rgba(74,222,128,0.35)]
              hover:bg-green-300
            "
          >
            Save Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoalDialog;
