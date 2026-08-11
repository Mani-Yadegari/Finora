import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Sparkle } from "lucide-react";

import MoreActionsMenu from "../ui/MoreActionsMenu.tsx";
import Card from "../ui/Card";
import AnimatedNumber from "../ui/AnimatedNumber";

import EditGoalDialog from "./EditGoalDialog";
import DeleteGoalDialog from "./DeleteGoalDialog";

const SavingChart = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const savingPercent = 72;

  const targetAmount = 30000;
  const savedAmount = 21600;
  const remainingAmount = 8400;

  const circumference = 327;
  const progress = (savingPercent / 100) * circumference;

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

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div>
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

            <h3 className="mt-1 text-lg font-semibold">Dream Vacation</h3>
          </div>

          <div className="flex items-center gap-2">
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

              <Plane size={22} strokeWidth={2} className="relative z-10" />
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
                value={savedAmount}
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
              of ${targetAmount.toLocaleString()}
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
              startValue={targetAmount}
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
            Estimated completion • Oct 2026
          </p>
        </div>
      </Card>

      {/* Edit Goal Dialog */}
      <EditGoalDialog open={editOpen} onOpenChange={setEditOpen} />

      {/* Delete Goal Dialog */}
      <DeleteGoalDialog open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
};

export default SavingChart;
