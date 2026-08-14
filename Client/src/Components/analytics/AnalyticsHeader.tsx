import { useState } from "react";
import {
  CalendarDays,
  Download,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const monthNames = [
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

const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const AnalyticsHeader = () => {
  const [open, setOpen] = useState(false);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  return (
    <div
      className="
      relative
      z-20
      flex
      flex-col
      gap-6
      lg:flex-row
      lg:items-center
      lg:justify-between
      rounded-3xl
      border
      border-white/[0.08]
      bg-white/[0.035]
      p-6
      backdrop-blur-3xl
      mb-6
      "
    >
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

      <div className="relative flex items-center gap-4">
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
          "
        >
          <ChartNoAxesColumn size={21} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-white">Analytics</h1>

            <span
              className="
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.035]
              px-2
              py-0.5
              text-[10px]
              text-zinc-500
              "
            >
              Insights
            </span>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Analyze your spending patterns and financial habits.
          </p>
        </div>
      </div>

      <div className="relative flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            px-4
            py-2.5
            text-sm
            text-zinc-300
            transition
            hover:bg-white/[0.08]
            "
          >
            <CalendarDays size={16} />
            {monthNames[month]} {year}
            <ChevronDown
              size={15}
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div
              className="
              absolute
              right-0
              top-full
              mt-3
              z-[999]
              w-[260px]
              rounded-3xl
              border
              border-white/[0.1]
              bg-[#090909]/95
              p-4
              shadow-[0_20px_60px_rgba(0,0,0,.6)]
              backdrop-blur-3xl
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => setYear(year - 1)}
                  className="
                  rounded-xl
                  p-2
                  text-zinc-400
                  transition
                  hover:bg-white/10
                  "
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-sm font-medium text-white">{year}</span>

                <button
                  disabled={year >= currentYear}
                  onClick={() => {
                    if (year < currentYear) {
                      setYear(year + 1);
                    }
                  }}
                  className={`
                  rounded-xl
                  p-2
                  transition

                  ${
                    year >= currentYear
                      ? "cursor-not-allowed text-zinc-700"
                      : "text-zinc-400 hover:bg-white/10"
                  }
                  `}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {monthNames.map((item, index) => {
                  const disabled = year === currentYear && index > currentMonth;

                  return (
                    <button
                      key={item}
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;

                        setMonth(index);
                        setOpen(false);
                      }}
                      className={`
                      rounded-xl
                      py-2
                      text-xs
                      transition

                      ${
                        disabled
                          ? "cursor-not-allowed text-zinc-700"
                          : month === index
                            ? "bg-green-400/10 text-green-400"
                            : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                      }
                      `}
                    >
                      {item.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-green-400/20
          bg-green-400/[0.08]
          px-4
          py-2.5
          text-sm
          text-green-400
          transition
          hover:bg-green-400/[0.15]
          "
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
