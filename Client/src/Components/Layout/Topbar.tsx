import { useState } from "react";
import { Bell, Plus, User } from "lucide-react";

import Logo from "./Logo";
import AddTransactionDialog from "../transactions/AddTransactionDialog";

const Topbar = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-20 px-8">
      {/* Logo */}
      <Logo />

      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          className="
            relative
            w-11
            h-11
            rounded-xl
            bg-white/[0.08]
            backdrop-blur-xl
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-white/[0.12]
            transition
          "
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span
            className="
              absolute
              top-2.5
              right-2.5
              w-1.5
              h-1.5
              rounded-full
              bg-[var(--primary)]
              shadow-[0_0_10px_var(--primary)]
            "
          />
        </button>

        {/* Add Transaction */}
        <button
          onClick={() => setIsAddTransactionOpen(true)}
          className="
            flex
            items-center
            gap-2
            px-5
            h-11
            rounded-xl
            bg-[var(--primary)]
            text-black
            font-medium
            hover:opacity-90
            active:scale-[0.98]
            transition
            shadow-[0_0_25px_rgba(34,197,94,0.25)]
          "
        >
          <Plus size={18} />
          Add Transaction
        </button>

        {/* Divider */}
        <div
          className="
            w-px
            h-8
            bg-white/5
            mx-1
          "
        />

        {/* Avatar */}
        <button
          className="
            w-11
            h-11
            rounded-full
            bg-green-500/20
            backdrop-blur-xl
            text-green-400
            flex
            items-center
            justify-center
            border
            border-green-400/20
            shadow-[0_0_25px_rgba(34,197,94,0.15)]
            hover:bg-green-500/30
            transition
          "
          aria-label="Profile"
        >
          <User size={22} />
        </button>
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
