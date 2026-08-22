import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Plus,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import AddTransactionDialog from "../transactions/AddTransactionDialog";

import { useTheme, type Theme } from "../../context/ThemeContext";

const Topbar = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
        setIsAppearanceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Close dropdown with Escape */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isAppearanceOpen) {
          setIsAppearanceOpen(false);
          return;
        }

        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAppearanceOpen]);

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
    setIsAppearanceOpen(false);
  };

  const handleAppearanceToggle = () => {
    setIsAppearanceOpen((prev) => !prev);
  };

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);

    setTimeout(() => {
      setIsAppearanceOpen(false);
    }, 120);
  };

  const getThemeLabel = () => {
    return theme === "light" ? "Light" : "Dark";
  };

  return (
    <header className="flex h-20 items-center justify-between px-8">
      {/* Logo */}
      <Logo />

      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.08]
            backdrop-blur-xl
            transition-all
            duration-200
            hover:bg-white/[0.12]
            active:scale-[0.97]
          "
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.9} />

          <span
            className="
              absolute
              right-2.5
              top-2.5
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--primary)]
              shadow-[0_0_10px_var(--primary)]
            "
          />
        </button>

        {/* Add Transaction */}
        <button
          type="button"
          onClick={() => setIsAddTransactionOpen(true)}
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            bg-[var(--primary)]
            px-5
            font-medium
            text-black
            shadow-[0_0_25px_rgba(34,197,94,0.25)]
            transition-all
            duration-200
            hover:opacity-90
            active:scale-[0.98]
          "
        >
          <Plus size={18} />
          Add Transaction
        </button>

        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-white/5" />

        {/* Account */}
        <div ref={profileRef} className="relative">
          {/* Avatar */}
          <button
            type="button"
            onClick={handleProfileToggle}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              text-[var(--primary)]
              backdrop-blur-xl
              transition-all
              duration-200
              active:scale-[0.97]
              ${
                isProfileOpen
                  ? "border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_15%,transparent)] shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
                  : "border-[color-mix(in_srgb,var(--primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] shadow-[0_0_25px_color-mix(in_srgb,var(--primary)_12%,transparent)] hover:bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]"
              }
            `}
            aria-label="Account menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <User size={22} strokeWidth={1.8} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -6,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  right-0
                  top-[calc(100%+10px)]
                  z-50
                  w-[270px]
                  origin-top-right
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#0b100d]/95
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  backdrop-blur-2xl
                "
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isAppearanceOpen ? (
                    <motion.div
                      key="main-menu"
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -8,
                      }}
                      transition={{
                        duration: 0.16,
                      }}
                    >
                      {/* User Info */}
                      <div className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[color-mix(in_srgb,var(--primary)_20%,transparent)]
                              bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]
                              text-sm
                              font-semibold
                              text-[var(--primary)]
                            "
                          >
                            MY
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white/90">
                              Mani Yadegari
                            </p>

                            <p className="mt-0.5 truncate text-xs text-white/35">
                              mani@example.com
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <span
                            className="
                              inline-flex
                              items-center
                              rounded-full
                              border
                              border-[color-mix(in_srgb,var(--primary)_10%,transparent)]
                              bg-[color-mix(in_srgb,var(--primary)_6%,transparent)]
                              px-2.5
                              py-1
                              text-[10px]
                              font-medium
                              tracking-wide
                              text-[var(--primary)]
                            "
                          >
                            Personal Account
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mx-4 h-px bg-white/[0.06]" />

                      {/* Menu */}
                      <div className="p-2">
                        {/* Settings */}
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="
                            group
                            flex
                            h-10
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            text-sm
                            text-white/60
                            transition-all
                            duration-200
                            hover:bg-white/[0.05]
                            hover:text-white
                          "
                        >
                          <Settings
                            size={17}
                            strokeWidth={1.8}
                            className="
                              text-white/35
                              transition-colors
                              duration-200
                              group-hover:text-[var(--primary)]
                            "
                          />

                          <span className="flex-1">Settings</span>

                          <ChevronRight
                            size={15}
                            className="
                              text-white/15
                              transition-all
                              duration-200
                              group-hover:translate-x-0.5
                              group-hover:text-white/35
                            "
                          />
                        </Link>

                        {/* Appearance */}
                        <button
                          type="button"
                          onClick={handleAppearanceToggle}
                          className="
                            group
                            flex
                            h-10
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            text-sm
                            text-white/60
                            transition-all
                            duration-200
                            hover:bg-white/[0.05]
                            hover:text-white
                          "
                        >
                          <Moon
                            size={17}
                            strokeWidth={1.8}
                            className="
                              text-white/35
                              transition-colors
                              duration-200
                              group-hover:text-[var(--primary)]
                            "
                          />

                          <span className="flex-1 text-left">Appearance</span>

                          <span className="text-xs text-white/25">
                            {getThemeLabel()}
                          </span>

                          <ChevronRight size={15} className="text-white/15" />
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="mx-4 h-px bg-white/[0.06]" />

                      {/* Sign Out */}
                      <div className="p-2">
                        <button
                          type="button"
                          onClick={() => setIsProfileOpen(false)}
                          className="
                            group
                            flex
                            h-10
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            text-sm
                            text-red-400/65
                            transition-all
                            duration-200
                            hover:bg-red-400/[0.05]
                            hover:text-red-400
                          "
                        >
                          <LogOut
                            size={17}
                            strokeWidth={1.8}
                            className="
                              transition-transform
                              duration-200
                              group-hover:translate-x-0.5
                            "
                          />

                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="appearance-menu"
                      initial={{
                        opacity: 0,
                        x: 8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 8,
                      }}
                      transition={{
                        duration: 0.16,
                      }}
                    >
                      {/* Appearance Header */}
                      <div className="flex h-14 items-center gap-2 border-b border-white/[0.06] px-3">
                        <button
                          type="button"
                          onClick={() => setIsAppearanceOpen(false)}
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-white/35
                            transition-all
                            duration-200
                            hover:bg-white/[0.05]
                            hover:text-white
                          "
                          aria-label="Back"
                        >
                          <ChevronLeft size={17} />
                        </button>

                        <span className="text-sm font-medium text-white/80">
                          Appearance
                        </span>
                      </div>

                      {/* Theme Options */}
                      <div className="p-2">
                        {/* Light */}
                        <button
                          type="button"
                          onClick={() => handleThemeChange("light")}
                          className={`
                            group
                            flex
                            h-11
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            transition-all
                            duration-200
                            ${
                              theme === "light"
                                ? "bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] text-white"
                                : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                            }
                          `}
                        >
                          <Sun
                            size={17}
                            strokeWidth={1.8}
                            className={`
                              transition-colors
                              duration-200
                              ${
                                theme === "light"
                                  ? "text-[var(--primary)]"
                                  : "text-white/35 group-hover:text-[var(--primary)]"
                              }
                            `}
                          />

                          <span className="flex-1 text-left text-sm">
                            Light
                          </span>

                          {theme === "light" && (
                            <Check
                              size={16}
                              className="text-[var(--primary)]"
                            />
                          )}
                        </button>

                        {/* Dark */}
                        <button
                          type="button"
                          onClick={() => handleThemeChange("dark")}
                          className={`
                            group
                            flex
                            h-11
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            transition-all
                            duration-200
                            ${
                              theme === "dark"
                                ? "bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] text-white"
                                : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                            }
                          `}
                        >
                          <Moon
                            size={17}
                            strokeWidth={1.8}
                            className={`
                              transition-colors
                              duration-200
                              ${
                                theme === "dark"
                                  ? "text-[var(--primary)]"
                                  : "text-white/35 group-hover:text-[var(--primary)]"
                              }
                            `}
                          />

                          <span className="flex-1 text-left text-sm">Dark</span>

                          {theme === "dark" && (
                            <Check
                              size={16}
                              className="text-[var(--primary)]"
                            />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
      />
    </header>
  );
};

export default Topbar;
