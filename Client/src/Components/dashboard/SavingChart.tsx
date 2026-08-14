import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkle,
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
  Target,
  Plus,
} from "lucide-react";

import MoreActionsMenu from "../ui/MoreActionsMenu.tsx";
import Card from "../ui/Card";
import AnimatedNumber from "../ui/AnimatedNumber";

import EditGoalDialog from "./EditGoalDialog";
import DeleteGoalDialog from "./DeleteGoalDialog";

interface Goal {
  name: string;
  category: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

const SavingChart = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [goal, setGoal] = useState<Goal | null>({
    name: "Dream Vacation",
    category: "Travel",
    targetAmount: 30000,
    savedAmount: 21600,
    deadline: "October 2026",
  });

  const savingPercent = goal
    ? Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100))
    : 0;

  const remainingAmount = goal
    ? Math.max(0, goal.targetAmount - goal.savedAmount)
    : 0;

  const circumference = 327;
  const progress = (savingPercent / 100) * circumference;

  const getCategoryIcon = () => {
    if (!goal || !goal.category) {
      return Package;
    }

    switch (goal.category) {
      case "Home":
        return House;

      case "Travel":
        return Plane;

      case "Transportation":
        return Car;

      case "Education":
        return GraduationCap;

      case "Technology":
        return Laptop;

      case "Health":
        return HeartPulse;

      case "Investment":
        return TrendingUp;

      case "Savings":
        return PiggyBank;

      case "Shopping":
        return ShoppingBag;

      case "Events":
        return PartyPopper;

      case "Entertainment":
        return Gamepad2;

      case "Other":
        return Package;

      default:
        return Package;
    }
  };

  const GoalIcon = getCategoryIcon();

  const handleSaveGoal = (updatedGoal: Goal) => {
    setGoal(updatedGoal);
    setEditOpen(false);
  };

  const handleDeleteGoal = () => {
    setGoal(null);
    setDeleteOpen(false);
  };

  return (
    <>
      <Card
        className="
          relative
          h-95
          overflow-hidden
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
        "
      >
        {/* Top Glow */}
        <div
          className="
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-green-400/10
            blur-3xl
          "
        />

        {/* Bottom Glow */}
        <div
          className="
            absolute
            -bottom-20
            -left-20
            h-40
            w-40
            rounded-full
            bg-emerald-400/10
            blur-3xl
          "
        />

        {goal ? (
          <>
            {/* Header */}
            <div className="relative flex items-center justify-between">
              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-zinc-500
                  "
                >
                  Financial Goal
                </p>

                <h3 className="mt-1 truncate text-lg font-semibold">
                  {goal.name}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {/* Goal Icon */}
                <div
                  className="
                    relative
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-green-400/20
                    bg-green-500/10
                    text-green-400
                    backdrop-blur-xl
                    shadow-[0_0_25px_rgba(34,197,94,0.15)]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      bg-green-400/10
                      blur-xl
                    "
                  />

                  <GoalIcon
                    size={22}
                    strokeWidth={2}
                    className="relative z-10"
                  />
                </div>

                {/* Goal Options */}
                <MoreActionsMenu
                  onEdit={() => setEditOpen(true)}
                  onDelete={() => setDeleteOpen(true)}
                  label="Goal options"
                />
              </div>
            </div>

            {/* Circular Progress */}
            <div
              className="
                relative
                mt-5
                flex
                h-[190px]
                items-center
                justify-center
              "
            >
              {/* Ring Glow */}
              <div
                className="
                  absolute
                  h-52
                  w-52
                  rounded-full
                  bg-green-400/10
                  blur-3xl
                "
              />

              <svg
                className="
                  absolute
                  h-52
                  w-52
                  -rotate-90
                "
                viewBox="0 0 120 120"
              >
                {/* Background Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="8"
                />

                {/* Glow Ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  opacity="0.35"
                  filter="blur(3px)"
                  initial={{
                    strokeDashoffset: circumference,
                  }}
                  animate={{
                    strokeDashoffset: circumference - progress,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                />

                {/* Main Ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{
                    strokeDashoffset: circumference,
                  }}
                  animate={{
                    strokeDashoffset: circumference - progress,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute flex flex-col items-center">
                <h2
                  className="
                    text-[34px]
                    font-bold
                    leading-none
                  "
                >
                  <AnimatedNumber
                    value={savingPercent}
                    suffix="%"
                    decimals={0}
                    delay={0.2}
                  />
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-zinc-300
                  "
                >
                  <AnimatedNumber
                    value={goal.savedAmount}
                    prefix="$"
                    decimals={0}
                    delay={0.4}
                  />
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    uppercase
                    tracking-wider
                    text-zinc-500
                  "
                >
                  of ${goal.targetAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="relative mt-2 text-center">
              <h3
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-base
                  font-semibold
                "
              >
                You're on track
                <Sparkle size={15} className="text-green-300" />
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-zinc-400
                "
              >
                <AnimatedNumber
                  value={remainingAmount}
                  startValue={goal.targetAmount}
                  prefix="$"
                  decimals={0}
                  delay={0.1}
                />{" "}
                remaining
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-zinc-500
                "
              >
                Estimated completion • {goal.deadline}
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="
              relative
              flex
              h-full
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >
            {/* Icon */}
            <div
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-green-400/20
                bg-green-400/10
                text-green-400
                shadow-[0_0_30px_rgba(34,197,94,0.12)]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-green-400/10
                  blur-xl
                "
              />

              <Target size={25} strokeWidth={1.8} className="relative z-10" />
            </div>

            {/* Text */}
            <h3 className="mt-5 text-base font-semibold text-white">
              No financial goal yet
            </h3>

            <p className="mt-2 max-w-[260px] text-sm leading-5 text-zinc-500">
              Create a savings goal and start tracking your progress.
            </p>

            {/* Create Button */}
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="
                mt-5
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-green-400
                px-4
                text-sm
                font-semibold
                text-black
                shadow-[0_0_25px_rgba(74,222,128,0.25)]
                transition-all
                duration-200
                hover:bg-green-300
                hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]
              "
            >
              <Plus size={16} />
              Create Goal
            </button>
          </div>
        )}
      </Card>

      {/* Edit / Create Goal Dialog */}
      <EditGoalDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        goal={goal}
        onSave={handleSaveGoal}
      />

      {/* Delete Goal Dialog */}
      {goal && (
        <DeleteGoalDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          goal={goal}
          onConfirm={handleDeleteGoal}
        />
      )}
    </>
  );
};

export default SavingChart;
