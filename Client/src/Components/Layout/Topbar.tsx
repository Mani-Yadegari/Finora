import { Search, Bell, Plus, User } from "lucide-react";
import Logo from "./Logo";

const Topbar = () => {
  return (
    <header
      className="
    w-full
    h-24
    px-8
    flex
    items-center
    justify-between
    bg-black/20
    backdrop-blur-2xl
    border-b
    border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.25)]
  "
    >
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-white/5 border border-white/10 focus-within:border-white/20 focus-within:bg-white/[0.07] transition-colors">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-48 placeholder:text-zinc-500"
          />
        </div>

        {/* Notification */}
        <button
          className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
        </button>

        {/* Add Transaction */}
        <button className="flex items-center gap-2 px-5 h-11 rounded-xl bg-[var(--primary)] text-black font-medium hover:opacity-90 active:scale-[0.98] transition">
          <Plus size={18} />
          Add Transaction
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" />

        {/* Avatar */}
        <button
          className="w-11 h-11 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center ring-1 ring-green-500/30 hover:bg-green-500/30 transition-colors"
          aria-label="Profile"
        >
          <User size={26} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
