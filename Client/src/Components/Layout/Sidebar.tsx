import {
  LayoutDashboard,
  CreditCard,
  ChartNoAxesColumn,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

// import Logo from "./Logo";

const Sidebar = () => {
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
      className="
w-72
h-screen
border-r
border-white/10
bg-white/5
backdrop-blur-xl
p-6
flex
flex-col
"
    >
      {/* <Logo /> */}

      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition

                ${
                  isActive
                    ? "bg-[var(--primary)] text-black"
                    : "text-[var(--text-muted)] hover:bg-white/5 hover:text-white"
                }
                `
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div
        className="
  mt-auto
  pt-6
  border-t
  border-white/10
"
      >
        <div
          className="
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    hover:bg-white/5
    transition
  "
        >
          <div
            className="
      w-10
      h-10
      rounded-full
      bg-green-500/20
      flex
      items-center
      justify-center
      text-green-400
      font-semibold
    "
          >
            M
          </div>

          <div>
            <p className="text-sm font-medium">Mani</p>

            <p className="text-xs text-zinc-400">Premium User</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
