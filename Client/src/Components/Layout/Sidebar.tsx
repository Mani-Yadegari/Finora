import {
  LayoutDashboard,
  CreditCard,
  ChartNoAxesColumn,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: CreditCard,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartNoAxesColumn,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`
        relative
        h-screen
        shrink-0
        border-r
        border-white/10
        bg-white/4
        backdrop-blur-2xl
        shadow-[10px_0_40px_rgba(0,0,0,0.25)]
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out
        ${isCollapsed ? "w-24 p-3" : "w-72 p-6"}
      `}
    >
      {/* Collapse */}
      <div
        className={`
    flex
    mb-5
    ${isCollapsed ? "justify-center" : "justify-end pr-1"}
  `}
      >
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="
      flex
      h-9
      w-9
      shrink-0
      items-center
      justify-center
      rounded-lg
      text-zinc-500
      transition-colors
      duration-200
      hover:text-green-400
    "
        >
          {isCollapsed ? (
            <PanelLeftOpen
              className="
          h-5
          w-5
        "
            />
          ) : (
            <PanelLeftClose
              className="
          h-5
          w-5
        "
            />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `
                  group
                  relative
                  flex
                  items-center
                  rounded-xl
                  transition-all
                  duration-200

                  ${
                    isCollapsed
                      ? "h-14 w-full justify-center"
                      : "gap-3 px-4 py-3"
                  }

                  ${
                    isActive
                      ? isCollapsed
                        ? `
                          border
                          border-green-400/20
                          bg-gradient-to-br
                          from-green-500/20
                          via-green-500/10
                          to-transparent
                          text-green-400
                          shadow-[0_0_25px_rgba(34,197,94,0.12)]
                        `
                        : `
                          border
                          border-white/10
                          bg-gradient-to-r
                          from-green-500/15
                          via-green-500/5
                          to-transparent
                          text-white
                          shadow-[inset_0_0_20px_rgba(34,197,94,0.04)]
                        `
                      : `
                        border
                        border-transparent
                        text-[var(--text-muted)]
                        hover:bg-white/5
                        hover:text-white
                      `
                  }

                  ${
                    isActive && !isCollapsed
                      ? `
                        before:absolute
                        before:left-0
                        before:top-1/2
                        before:h-6
                        before:w-1
                        before:-translate-y-1/2
                        before:rounded-r-full
                        before:bg-[var(--primary)]
                        before:shadow-[0_0_12px_rgba(34,197,94,0.8)]
                      `
                      : ""
                  }
                `
              }
            >
              <Icon
                className={`
                  shrink-0
                  transition-all
                  duration-300
                  ${isCollapsed ? "h-6 w-6" : "h-5 w-5"}
                  ${isCollapsed ? "" : "group-hover:scale-105"}
                `}
              />

              <span
                className={`
                  overflow-hidden
                  whitespace-nowrap
                  font-medium
                  transition-all
                  duration-200
                  ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                `}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div
        className="
          mt-auto
          border-t
          border-white/10
          pt-5
        "
      >
        <div
          className={`
            flex
            items-center
            rounded-xl
            p-2
            transition-all
            duration-200
            hover:bg-white/5
            ${isCollapsed ? "justify-center" : "gap-3"}
          `}
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-green-500/20
              font-semibold
              text-green-400
            "
          >
            M
          </div>

          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              transition-all
              duration-200
              ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            <p className="text-sm font-medium">Mani</p>

            <p className="text-xs text-zinc-400">Premium User</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
