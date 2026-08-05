import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const GoalMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-transparent
            text-zinc-500
            transition-all
            duration-200
            hover:border-white/10
            hover:bg-white/[0.05]
            hover:text-white
          "
          aria-label="Goal options"
        >
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-44
          border-white/10
          bg-zinc-950/90
          backdrop-blur-xl
          text-zinc-200
        "
      >
        <DropdownMenuItem
          className="
            gap-2
            cursor-pointer
            focus:bg-white/10
          "
        >
          <Pencil size={15} />
          Edit Goal
        </DropdownMenuItem>

        <DropdownMenuItem
          className="
            gap-2
            cursor-pointer
            text-red-400
            focus:bg-red-500/10
            focus:text-red-400
          "
        >
          <Trash2 size={15} />
          Delete Goal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GoalMenu;
