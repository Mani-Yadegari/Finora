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

import { Trash2, Target, CalendarDays, Wallet } from "lucide-react";

interface DeleteGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteGoalDialog = ({ open, onOpenChange }: DeleteGoalDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          max-w-[400px]
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-950/90
          p-6
          text-white
          backdrop-blur-2xl
          shadow-[0_25px_100px_rgba(0,0,0,0.7)]
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -top-24
            right-10
            h-48
            w-48
            rounded-full
            bg-red-400/20
            blur-3xl
          "
        />

        <AlertDialogHeader
          className="
            relative
          "
        >
          <div
            className="
              mb-5
              flex
              h-14
              w-14
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
            <Trash2 size={26} />
          </div>

          <AlertDialogTitle
            className="
              text-2xl
              font-semibold
              tracking-tight
            "
          >
            Delete Financial Goal
          </AlertDialogTitle>

          <AlertDialogDescription
            className="
              mt-2
              text-sm
              text-zinc-400
            "
          >
            Are you sure you want to delete this goal? This action cannot be
            undone.
          </AlertDialogDescription>

          {/* Goal Preview */}

          <div
            className="
    mx-auto
    mt-5
    w-full
    max-w-[330px]
    rounded-2xl
    border
    border-white/10
    bg-white/[0.04]
    p-4
  "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-400/10
                  text-green-400
                "
              >
                <Target size={18} />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Dream Vacation
                </p>

                <p
                  className="
                    text-xs
                    text-zinc-500
                  "
                >
                  Travel Goal
                </p>
              </div>
            </div>

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-3
              "
            >
              <div
                className="
                  rounded-xl
                  bg-black/20
                  p-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-zinc-500
                  "
                >
                  <Wallet size={12} />
                  Target
                </div>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white
                  "
                >
                  $30,000
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  bg-black/20
                  p-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-zinc-500
                  "
                >
                  <CalendarDays size={12} />
                  Deadline
                </div>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white
                  "
                >
                  Oct 2027
                </p>
              </div>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter
          className="
            relative
            mt-4
            border-0
            bg-transparent
            p-0
            flex
            gap-3
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
            onClick={() => onOpenChange(false)}
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
            Delete Goal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGoalDialog;
