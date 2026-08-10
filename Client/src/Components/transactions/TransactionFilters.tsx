import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  CalendarDays,
  Tag,
  ArrowDownUp,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type TransactionType = "all" | "income" | "expense";

type DateFilter =
  | "today"
  | "this-week"
  | "this-month"
  | "last-month"
  | "custom"
  | null;

type AmountFilter =
  | "under-50"
  | "50-100"
  | "100-500"
  | "500-1000"
  | "over-1000"
  | "custom"
  | null;

const categories = [
  "Home",
  "Travel",
  "Transportation",
  "Education",
  "Technology",
  "Health",
  "Investment",
  "Savings",
  "Shopping",
  "Events",
  "Entertainment",
  "Food",
  "Other",
];

const TransactionFilters = () => {
  const [search, setSearch] = useState("");

  const [activeType, setActiveType] = useState<TransactionType>("all");

  const [filterOpen, setFilterOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [dateFilter, setDateFilter] = useState<DateFilter>(null);

  const [amountFilter, setAmountFilter] = useState<AmountFilter>(null);

  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  /*
   * Alt + K → Focus Search
   */
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const searchInput = document.getElementById(
          "transaction-search",
        ) as HTMLInputElement | null;

        searchInput?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);

    setDateFilter(null);
    setAmountFilter(null);

    setCustomMin("");
    setCustomMax("");

    setCustomFrom("");
    setCustomTo("");

    setActiveType("all");
  };

  const activeFilterCount =
    selectedCategories.length +
    (dateFilter ? 1 : 0) +
    (amountFilter ? 1 : 0) +
    (activeType !== "all" ? 1 : 0);

  const toggleSection = (section: "category" | "date" | "amount") => {
    if (section === "category") {
      setCategoryOpen((prev) => !prev);
      setDateOpen(false);
      setAmountOpen(false);
    }

    if (section === "date") {
      setDateOpen((prev) => !prev);
      setCategoryOpen(false);
      setAmountOpen(false);
    }

    if (section === "amount") {
      setAmountOpen((prev) => !prev);
      setCategoryOpen(false);
      setDateOpen(false);
    }
  };

  const getDateLabel = () => {
    switch (dateFilter) {
      case "today":
        return "Today";

      case "this-week":
        return "This week";

      case "this-month":
        return "This month";

      case "last-month":
        return "Last month";

      case "custom":
        return "Custom range";

      default:
        return "Any date";
    }
  };

  const getAmountLabel = () => {
    switch (amountFilter) {
      case "under-50":
        return "Under $50";

      case "50-100":
        return "$50 – $100";

      case "100-500":
        return "$100 – $500";

      case "500-1000":
        return "$500 – $1,000";

      case "over-1000":
        return "$1,000+";

      case "custom":
        return customMin && customMax
          ? `$${customMin} – $${customMax}`
          : customMin
            ? `$${customMin}+`
            : customMax
              ? `Up to $${customMax}`
              : "Custom range";

      default:
        return "Any amount";
    }
  };

  return (
    <div
      className="
        relative
        z-20
        rounded-3xl
        border
        border-white/[0.09]
        bg-white/[0.035]
        p-2
        shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]
        backdrop-blur-2xl
      "
    >
      {/* Top Glow */}
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
          via-white/[0.12]
          to-transparent
        "
      />

      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        {/* Search */}
        <div
          className="
            group
            relative
            flex
            h-11
            min-w-0
            flex-1
            items-center
            rounded-2xl
            border
            border-white/[0.08]
            bg-black/[0.16]
            transition-all
            duration-300
            hover:border-white/[0.13]
            hover:bg-white/[0.025]
            focus-within:border-green-400/30
            focus-within:bg-white/[0.025]
            focus-within:shadow-[0_0_35px_rgba(34,197,94,0.07)]
          "
        >
          <Search
            size={17}
            strokeWidth={1.9}
            className="
              ml-3.5
              shrink-0
              text-zinc-400
              transition-colors
              duration-300
              group-focus-within:text-green-400
            "
          />

          <input
            id="transaction-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="
              h-full
              min-w-0
              flex-1
              bg-transparent
              px-3
              text-sm
              font-medium
              text-zinc-200
              outline-none
              placeholder:text-zinc-500
              placeholder:font-normal
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                mr-2
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-zinc-400
                transition-all
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              <X size={14} />
            </button>
          )}

          {!search && (
            <div className="mr-2.5 hidden items-center gap-1 sm:flex">
              <kbd
                className="
                  rounded-md
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  px-1.5
                  py-0.5
                  font-mono
                  text-[10px]
                  font-medium
                  text-zinc-500
                "
              >
                Alt
              </kbd>

              <kbd
                className="
                  rounded-md
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  px-1.5
                  py-0.5
                  font-mono
                  text-[10px]
                  font-medium
                  text-zinc-500
                "
              >
                K
              </kbd>
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Type Switcher */}
          <div
            className="
              flex
              h-11
              items-center
              rounded-2xl
              border
              border-white/[0.08]
              bg-black/[0.14]
              p-1
            "
          >
            <button
              type="button"
              onClick={() => setActiveType("all")}
              className={`
                h-9
                rounded-xl
                px-4
                text-xs
                font-medium
                transition-all
                ${
                  activeType === "all"
                    ? "bg-white/[0.11] text-white"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                }
              `}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setActiveType("income")}
              className={`
                h-9
                rounded-xl
                px-4
                text-xs
                font-medium
                transition-all
                ${
                  activeType === "income"
                    ? "bg-green-400/[0.12] text-green-400"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                }
              `}
            >
              Income
            </button>

            <button
              type="button"
              onClick={() => setActiveType("expense")}
              className={`
                h-9
                rounded-xl
                px-4
                text-xs
                font-medium
                transition-all
                ${
                  activeType === "expense"
                    ? "bg-red-400/[0.12] text-red-400"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                }
              `}
            >
              Expense
            </button>
          </div>

          <div className="hidden h-7 w-px bg-white/[0.08] lg:block" />

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setFilterOpen((prev) => !prev);

                if (filterOpen) {
                  setCategoryOpen(false);
                  setDateOpen(false);
                  setAmountOpen(false);
                }
              }}
              className={`
                group
                flex
                h-11
                items-center
                gap-2
                rounded-2xl
                border
                px-3.5
                text-xs
                font-medium
                transition-all
                ${
                  filterOpen
                    ? "border-green-400/25 bg-green-400/[0.07] text-zinc-100"
                    : "border-white/[0.08] bg-black/[0.14] text-zinc-400 hover:border-white/[0.14] hover:bg-white/[0.035] hover:text-white"
                }
              `}
            >
              <SlidersHorizontal
                size={16}
                strokeWidth={1.9}
                className={
                  filterOpen
                    ? "text-green-400"
                    : "text-zinc-400 group-hover:text-zinc-200"
                }
              />

              <span>Filter</span>

              {activeFilterCount > 0 && (
                <span
                  className="
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-green-400
                    px-1
                    text-[9px]
                    font-bold
                    text-black
                  "
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter Panel */}
            {filterOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+10px)]
                  w-[330px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.10]
                  bg-[#101010]/[0.98]
                  shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                  backdrop-blur-2xl
                "
              >
                {/* Header */}
                <div
                  className="
                    border-b
                    border-white/[0.07]
                    px-4
                    py-3.5
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Filters
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Refine your transaction list
                      </p>
                    </div>

                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="
                          text-xs
                          font-medium
                          text-zinc-500
                          transition
                          hover:text-white
                        "
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="border-b border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => toggleSection("category")}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      transition
                      hover:bg-white/[0.035]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.04]
                          text-zinc-300
                        "
                      >
                        <Tag size={15} />
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-medium text-zinc-200">
                          Category
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {selectedCategories.length > 0
                            ? `${selectedCategories.length} selected`
                            : "Any category"}
                        </p>
                      </div>
                    </div>

                    {categoryOpen ? (
                      <ChevronUp size={16} className="text-zinc-500" />
                    ) : (
                      <ChevronDown size={16} className="text-zinc-500" />
                    )}
                  </button>

                  {categoryOpen && (
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-1.5">
                        {categories.map((category) => {
                          const selected =
                            selectedCategories.includes(category);

                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className={`
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                px-2.5
                                py-2.5
                                text-left
                                text-xs
                                font-medium
                                transition
                                ${
                                  selected
                                    ? "border-green-400/20 bg-green-400/[0.08] text-green-400"
                                    : "border-white/[0.05] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                                }
                              `}
                            >
                              <span
                                className={`
                                  flex
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded
                                  border
                                  ${
                                    selected
                                      ? "border-green-400 bg-green-400 text-black"
                                      : "border-white/[0.15]"
                                  }
                                `}
                              >
                                {selected && <Check size={9} />}
                              </span>

                              {category}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="border-b border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => toggleSection("date")}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      transition
                      hover:bg-white/[0.035]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.04]
                          text-zinc-300
                        "
                      >
                        <CalendarDays size={15} />
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-medium text-zinc-200">
                          Date
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {getDateLabel()}
                        </p>
                      </div>
                    </div>

                    {dateOpen ? (
                      <ChevronUp size={16} className="text-zinc-500" />
                    ) : (
                      <ChevronDown size={16} className="text-zinc-500" />
                    )}
                  </button>

                  {dateOpen && (
                    <div className="space-y-1.5 px-4 pb-4">
                      {[
                        ["today", "Today"],
                        ["this-week", "This week"],
                        ["this-month", "This month"],
                        ["last-month", "Last month"],
                      ].map(([value, label]) => {
                        const selected = dateFilter === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setDateFilter(value as DateFilter)}
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-lg
                              px-3
                              py-2.5
                              text-left
                              text-xs
                              font-medium
                              transition
                              ${
                                selected
                                  ? "bg-green-400/[0.08] text-green-400"
                                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                              }
                            `}
                          >
                            {label}

                            {selected && <Check size={14} />}
                          </button>
                        );
                      })}

                      {/* Custom Date */}
                      <button
                        type="button"
                        onClick={() => setDateFilter("custom")}
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-xs
                          font-medium
                          transition
                          ${
                            dateFilter === "custom"
                              ? "bg-green-400/[0.08] text-green-400"
                              : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                          }
                        `}
                      >
                        Custom range
                        {dateFilter === "custom" && <Check size={14} />}
                      </button>

                      {dateFilter === "custom" && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                              From
                            </label>

                            <input
                              type="date"
                              value={customFrom}
                              onChange={(e) => setCustomFrom(e.target.value)}
                              className="
                                h-9
                                w-full
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-black/[0.2]
                                px-2
                                text-xs
                                text-zinc-300
                                outline-none
                                focus:border-green-400/30
                              "
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                              To
                            </label>

                            <input
                              type="date"
                              value={customTo}
                              onChange={(e) => setCustomTo(e.target.value)}
                              className="
                                h-9
                                w-full
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-black/[0.2]
                                px-2
                                text-xs
                                text-zinc-300
                                outline-none
                                focus:border-green-400/30
                              "
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleSection("amount")}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      transition
                      hover:bg-white/[0.035]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.04]
                          text-zinc-300
                        "
                      >
                        <ArrowDownUp size={15} />
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-medium text-zinc-200">
                          Amount
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {getAmountLabel()}
                        </p>
                      </div>
                    </div>

                    {amountOpen ? (
                      <ChevronUp size={16} className="text-zinc-500" />
                    ) : (
                      <ChevronDown size={16} className="text-zinc-500" />
                    )}
                  </button>

                  {amountOpen && (
                    <div className="px-4 pb-4">
                      {/* Preset Amounts */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          ["under-50", "Under $50"],
                          ["50-100", "$50 – $100"],
                          ["100-500", "$100 – $500"],
                          ["500-1000", "$500 – $1,000"],
                          ["over-1000", "$1,000+"],
                        ].map(([value, label]) => {
                          const selected = amountFilter === value;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                setAmountFilter(value as AmountFilter)
                              }
                              className={`
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                border
                                px-3
                                py-2.5
                                text-left
                                text-xs
                                font-medium
                                transition
                                ${
                                  selected
                                    ? "border-green-400/20 bg-green-400/[0.08] text-green-400"
                                    : "border-white/[0.05] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                                }
                              `}
                            >
                              <span>{label}</span>

                              {selected && <Check size={13} />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Range */}
                      <div className="mt-3">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-px flex-1 bg-white/[0.06]" />

                          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                            Custom range
                          </span>

                          <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {/* Minimum */}
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                              Minimum
                            </label>

                            <div
                              className="
                                flex
                                h-9
                                items-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-black/[0.2]
                                transition
                                focus-within:border-green-400/30
                              "
                            >
                              <span className="pl-2.5 text-xs text-zinc-600">
                                $
                              </span>

                              <input
                                type="number"
                                min="0"
                                value={customMin}
                                onChange={(e) => {
                                  setCustomMin(e.target.value);
                                  setAmountFilter("custom");
                                }}
                                placeholder="0"
                                className="
                                  h-full
                                  w-full
                                  bg-transparent
                                  px-1.5
                                  text-xs
                                  text-zinc-300
                                  outline-none
                                  placeholder:text-zinc-700
                                  [appearance:textfield]
                                  [&::-webkit-outer-spin-button]:appearance-none
                                  [&::-webkit-inner-spin-button]:appearance-none
                                "
                              />
                            </div>
                          </div>

                          {/* Maximum */}
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
                              Maximum
                            </label>

                            <div
                              className="
                                flex
                                h-9
                                items-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-black/[0.2]
                                transition
                                focus-within:border-green-400/30
                              "
                            >
                              <span className="pl-2.5 text-xs text-zinc-600">
                                $
                              </span>

                              <input
                                type="number"
                                min="0"
                                value={customMax}
                                onChange={(e) => {
                                  setCustomMax(e.target.value);
                                  setAmountFilter("custom");
                                }}
                                placeholder="∞"
                                className="
                                  h-full
                                  w-full
                                  bg-transparent
                                  px-1.5
                                  text-xs
                                  text-zinc-300
                                  outline-none
                                  placeholder:text-zinc-700
                                  [appearance:textfield]
                                  [&::-webkit-outer-spin-button]:appearance-none
                                  [&::-webkit-inner-spin-button]:appearance-none
                                "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.07]
                    bg-white/[0.015]
                    px-4
                    py-3
                  "
                >
                  <span className="text-xs font-medium text-zinc-600">
                    {activeFilterCount > 0
                      ? `${activeFilterCount} filter${
                          activeFilterCount > 1 ? "s" : ""
                        } active`
                      : "No filters applied"}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setFilterOpen(false);
                      setCategoryOpen(false);
                      setDateOpen(false);
                      setAmountOpen(false);
                    }}
                    className="
                      rounded-lg
                      bg-green-400
                      px-3.5
                      py-2
                      text-xs
                      font-semibold
                      text-black
                      transition
                      hover:bg-green-300
                    "
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
