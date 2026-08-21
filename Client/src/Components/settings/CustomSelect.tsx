import { createPortal } from "react-dom";

import { useEffect, useRef, useState } from "react";

import { Check, ChevronDown } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    const dropdownWidth = Math.max(155, rect.width);

    const gap = 8;

    let left = rect.right - dropdownWidth;

    const viewportPadding = 12;

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (left + dropdownWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - dropdownWidth - viewportPadding;
    }

    const dropdownHeight = Math.min(options.length * 42 + 12, 180);

    let top = rect.bottom + gap;

    if (top + dropdownHeight > window.innerHeight - viewportPadding) {
      top = rect.top - dropdownHeight - gap;
    }

    setPosition({
      top,
      left,
      width: dropdownWidth,
    });
  };

  const handleOpen = () => {
    if (!open) {
      updatePosition();
    }

    setOpen((previous) => !previous);
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll, true);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);

      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target)) {
        return;
      }

      if (dropdownRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const dropdown =
    open && position && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[99999] overflow-hidden rounded-xl border border-white/[0.10] bg-[#151515] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.025)]"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              backgroundColor: "#151515",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              opacity: 1,
              isolation: "isolate",
            }}
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                    active
                      ? "bg-green-500/[0.10] text-green-400"
                      : "text-white/65 hover:bg-white/[0.055] hover:text-white"
                  }`}
                  style={{
                    backgroundColor: active
                      ? "rgba(34,197,94,0.10)"
                      : "transparent",
                  }}
                >
                  <span className="whitespace-nowrap">{option.label}</span>

                  {active && (
                    <Check
                      size={14}
                      className="shrink-0 text-green-400"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative z-10 shrink-0">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          className={`relative flex min-w-[155px] items-center justify-between gap-3 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200 ${
            open
              ? "border-green-500/25 bg-white/[0.055] text-white shadow-[0_0_0_3px_rgba(34,197,94,0.035)]"
              : "border-white/[0.07] bg-white/[0.025] text-white/70 hover:border-white/[0.13] hover:bg-white/[0.045] hover:text-white"
          }`}
        >
          <span className="whitespace-nowrap">{selectedOption.label}</span>

          <ChevronDown
            size={15}
            className={`shrink-0 text-white/30 transition-transform duration-200 ${
              open ? "rotate-180 text-green-400" : ""
            }`}
          />
        </button>
      </div>

      {dropdown}
    </>
  );
};

export default CustomSelect;
