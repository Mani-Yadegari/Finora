import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface MoreActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  label?: string;
}

const MoreActionsMenu = ({
  onEdit,
  onDelete,
  label = "More options",
}: MoreActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
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
            outline-none
            transition-all
            duration-200
            hover:border-white/10
            hover:bg-white/[0.05]
            hover:text-white
          "
          aria-label={label}
        >
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          w-44
          rounded-xl
          border
          border-white/10
          bg-zinc-950/90
          p-1
          text-zinc-200
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          backdrop-blur-2xl
        "
      >
        <DropdownMenuItem
          className="
            cursor-pointer
            gap-2
            rounded-[5px]
            text-zinc-400
            outline-none
            focus:bg-white/[0.06]
            focus:text-white
          "
          onClick={onEdit}
        >
          <Pencil size={15} />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-white/[0.07]" />

        <DropdownMenuItem
          className="
            cursor-pointer
            gap-2
            rounded-[5px]
            text-red-400
            outline-none
            focus:bg-red-500/[0.08]
            focus:text-red-400
          "
          onClick={onDelete}
        >
          <Trash2 size={15} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreActionsMenu;
