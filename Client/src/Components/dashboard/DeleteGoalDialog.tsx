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

import {
  Trash2,
  CalendarDays,
  Wallet,
  House,
  Plane,
  Car,
  GraduationCap,
  Laptop,
  HeartPulse,
  TrendingUp,
  PiggyBank,
  ShoppingBag,
  PartyPopper,
  Gamepad2,
  Package,
} from "lucide-react";

interface Goal {
  name: string;
  category: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

interface DeleteGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal;
  onConfirm: () => void;
}

const categoryIcons = {
  Home: House,
  Travel: Plane,
  Transportation: Car,
  Education: GraduationCap,
  Technology: Laptop,
  Health: HeartPulse,
  Investment: TrendingUp,
  Savings: PiggyBank,
  Shopping: ShoppingBag,
  Events: PartyPopper,
  Entertainment: Gamepad2,
  Other: Package,
};

const DeleteGoalDialog = ({
  open,
  onOpenChange,
  goal,
  onConfirm,
}: DeleteGoalDialogProps) => {
  const CategoryIcon =
    categoryIcons[goal.category as keyof typeof categoryIcons] ?? Package;

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
            pointer-events-none
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

        <AlertDialogHeader className="relative">
          {/* Delete Icon */}
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
            <Trash2 size={26} strokeWidth={1.8} />
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
              leading-5
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
            {/* Goal Header */}
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-green-400/20
                  bg-green-400/10
                  text-green-400
                "
              >
                <CategoryIcon size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {goal.name}
                </p>

                <p className="text-xs text-zinc-500">{goal.category} Goal</p>
              </div>
            </div>

            {/* Goal Details */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Target */}
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
                  <Wallet size={12} strokeWidth={1.8} />
                  Target
                </div>

                <p className="mt-1 text-sm font-medium text-white">
                  ${goal.targetAmount.toLocaleString()}
                </p>
              </div>

              {/* Deadline */}
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
                  <CalendarDays size={12} strokeWidth={1.8} />
                  Deadline
                </div>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {goal.deadline}
                </p>
              </div>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Footer */}
        <AlertDialogFooter
          className="
            relative
            mt-4
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
              transition-all
              duration-200
              hover:bg-white/[0.08]
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
              transition-all
              duration-200
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
