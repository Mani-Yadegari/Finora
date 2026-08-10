import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Trash2 } from "lucide-react";

interface DeleteTransactionDialogProps {
  transactionName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteTransactionDialog = ({
  transactionName,
  open,
  onOpenChange,
  onConfirm,
}: DeleteTransactionDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-950
          p-6
          text-white
          shadow-[0_30px_120px_rgba(0,0,0,0.8)]
          outline-none
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-48
            w-48
            rounded-full
            bg-red-400/20
            blur-3xl
          "
        />

        <AlertDialogHeader className="relative">
          {/* Icon */}
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-red-400/20
              bg-red-400/10
              text-red-400
              shadow-[0_0_30px_rgba(248,113,113,0.2)]
            "
          >
            <Trash2 size={24} />
          </div>

          <AlertDialogTitle
            className="
              text-2xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            Delete Transaction?
          </AlertDialogTitle>

          <AlertDialogDescription
            className="
              mt-1.5
              text-sm
              leading-relaxed
              text-zinc-400
            "
          >
            Are you sure you want to delete{" "}
            <span className="font-medium text-zinc-200">{transactionName}</span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className="
            relative
            mt-6
            flex
            gap-3
            border-0
            bg-transparent
            p-0
          "
        >
          <AlertDialogCancel
            className="
              h-11
              flex-1
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-zinc-400
              hover:bg-white/10
              hover:text-white
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="
              h-11
              flex-1
              rounded-xl
              bg-red-400
              font-semibold
              text-black
              shadow-[0_0_25px_rgba(248,113,113,0.35)]
              hover:bg-red-300
            "
          >
            Delete Transaction
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;
