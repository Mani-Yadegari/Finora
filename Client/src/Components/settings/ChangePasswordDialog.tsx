import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Check, Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";

type PasswordStep = "current" | "new" | "confirm" | "completed";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ChangePasswordDialogProps) => {
  const [step, setStep] = useState<PasswordStep>("current");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Password validation                                                    */
  /* ---------------------------------------------------------------------- */

  const hasMinLength = newPassword.length >= 8;
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);

  const passwordIsValid =
    hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;

  /* ---------------------------------------------------------------------- */
  /* Reset only when dialog opens                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (open) {
      setStep("current");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* Close                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleClose = () => {
    /*
     * Important:
     * Don't reset the step here.
     *
     * Radix keeps the dialog mounted while the closing animation
     * is running. Resetting the step here causes the first screen
     * to flash for a moment.
     */
    onOpenChange(false);
  };

  /* ---------------------------------------------------------------------- */
  /* Current password                                                       */
  /* ---------------------------------------------------------------------- */

  const handleCurrentPassword = () => {
    if (!currentPassword.trim()) {
      setError("Please enter your current password.");
      return;
    }

    setError("");
    setStep("new");
  };

  /* ---------------------------------------------------------------------- */
  /* New password                                                           */
  /* ---------------------------------------------------------------------- */

  const handleNewPassword = () => {
    if (!passwordIsValid) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.",
      );
      return;
    }

    setError("");
    setStep("confirm");
  };

  /* ---------------------------------------------------------------------- */
  /* Confirm password                                                       */
  /* ---------------------------------------------------------------------- */

  const handleConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      setError("Please confirm your new password.");
      return;
    }

    if (confirmPassword !== newPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    onConfirm();

    setStep("completed");
  };

  /* ---------------------------------------------------------------------- */
  /* Back                                                                    */
  /* ---------------------------------------------------------------------- */

  const handleBack = () => {
    setError("");

    if (step === "new") {
      setStep("current");
      return;
    }

    if (step === "confirm") {
      setStep("new");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Password input style                                                    */
  /* ---------------------------------------------------------------------- */

  const passwordInputClass = `
    h-12
    w-full
    rounded-xl
    border
    border-white/[0.08]
    bg-white/[0.035]
    px-4
    pr-11
    text-sm
    text-white
    outline-none
    transition
    placeholder:text-zinc-700
    focus:border-green-400/30
    focus:bg-white/[0.05]
  `;

  /* ---------------------------------------------------------------------- */
  /* Requirement                                                             */
  /* ---------------------------------------------------------------------- */

  const Requirement = ({
    valid,
    children,
  }: {
    valid: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={`
          flex
          items-center
          gap-2
          text-[11px]
          transition-all
          duration-300
          ${valid ? "text-green-400" : "text-zinc-600"}
        `}
      >
        <span
          className={`
            flex
            h-4
            w-4
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-300
            ${
              valid
                ? "border-green-400/30 bg-green-400/10"
                : "border-white/[0.08] bg-white/[0.02]"
            }
          `}
        >
          {valid && (
            <Check
              size={10}
              strokeWidth={3}
              className="animate-[checkmark_.25s_ease-out]"
            />
          )}
        </span>

        {children}
      </div>
    );
  };

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
        {/* ================================================================ */}
        {/* Ambient glow                                                      */}
        {/* ================================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-48
            w-48
            rounded-full
            bg-green-400/15
            blur-3xl
          "
        />

        {/* ================================================================ */}
        {/* CURRENT PASSWORD                                                  */}
        {/* ================================================================ */}

        {step === "current" && (
          <div key="current" className="relative animate-[stepIn_.3s_ease-out]">
            <AlertDialogHeader>
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
                  border-green-400/20
                  bg-green-400/10
                  text-green-400
                  shadow-[0_0_30px_rgba(74,222,128,0.15)]
                "
              >
                <ShieldCheck size={24} />
              </div>

              <AlertDialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Verify your password
              </AlertDialogTitle>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Enter your current password to continue changing your password.
              </p>
            </AlertDialogHeader>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Current password
              </label>

              <div className="relative">
                <input
                  autoFocus
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => {
                    setCurrentPassword(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCurrentPassword();
                    }
                  }}
                  placeholder="Enter your current password"
                  className={passwordInputClass}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword((previous) => !previous)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-600
                    transition
                    hover:text-zinc-300
                  "
                >
                  {showCurrentPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-sm
                  font-medium
                  text-zinc-400
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCurrentPassword}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  bg-green-400
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_25px_rgba(74,222,128,0.2)]
                  transition
                  hover:bg-green-300
                  active:scale-[0.98]
                "
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* NEW PASSWORD                                                      */}
        {/* ================================================================ */}

        {step === "new" && (
          <div key="new" className="relative animate-[stepIn_.3s_ease-out]">
            <AlertDialogHeader>
              <button
                type="button"
                onClick={handleBack}
                className="
                  mb-4
                  flex
                  w-fit
                  items-center
                  gap-1
                  text-xs
                  text-zinc-500
                  transition
                  hover:text-white
                "
              >
                ← Back
              </button>

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
                  border-green-400/20
                  bg-green-400/10
                  text-green-400
                  shadow-[0_0_30px_rgba(74,222,128,0.15)]
                "
              >
                <KeyRound size={24} />
              </div>

              <AlertDialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Create a new password
              </AlertDialogTitle>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Choose a strong password to keep your Finora account secure.
              </p>
            </AlertDialogHeader>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                New password
              </label>

              <div className="relative">
                <input
                  autoFocus
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleNewPassword();
                    }
                  }}
                  placeholder="Create a strong password"
                  className={passwordInputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((previous) => !previous)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-600
                    transition
                    hover:text-zinc-300
                  "
                >
                  {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Requirement valid={hasMinLength}>
                  At least 8 characters
                </Requirement>

                <Requirement valid={hasLowercase}>Lowercase letter</Requirement>

                <Requirement valid={hasUppercase}>Uppercase letter</Requirement>

                <Requirement valid={hasNumber}>Number</Requirement>

                <Requirement valid={hasSymbol}>Special symbol</Requirement>
              </div>

              {error && (
                <p className="mt-3 text-xs leading-relaxed text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-sm
                  font-medium
                  text-zinc-400
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleNewPassword}
                disabled={!passwordIsValid}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  bg-green-400
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_25px_rgba(74,222,128,0.2)]
                  transition
                  hover:bg-green-300
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:bg-white/[0.06]
                  disabled:text-white/20
                  disabled:shadow-none
                "
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* CONFIRM PASSWORD                                                  */}
        {/* ================================================================ */}

        {step === "confirm" && (
          <div key="confirm" className="relative animate-[stepIn_.3s_ease-out]">
            <AlertDialogHeader>
              <button
                type="button"
                onClick={handleBack}
                className="
                  mb-4
                  flex
                  w-fit
                  items-center
                  gap-1
                  text-xs
                  text-zinc-500
                  transition
                  hover:text-white
                "
              >
                ← Back
              </button>

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
                  border-green-400/20
                  bg-green-400/10
                  text-green-400
                  shadow-[0_0_35px_rgba(74,222,128,0.15)]
                "
              >
                <ShieldCheck size={25} />
              </div>

              <AlertDialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Almost there
              </AlertDialogTitle>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Confirm your new password to finish updating your account.
              </p>
            </AlertDialogHeader>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Confirm new password
              </label>

              <div className="relative">
                <input
                  autoFocus
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleConfirmPassword();
                    }
                  }}
                  placeholder="Repeat your new password"
                  className={passwordInputClass}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-600
                    transition
                    hover:text-zinc-300
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  text-sm
                  font-medium
                  text-zinc-400
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirmPassword}
                className="
                  h-11
                  flex-1
                  rounded-xl
                  bg-green-400
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_25px_rgba(74,222,128,0.2)]
                  transition
                  hover:bg-green-300
                  active:scale-[0.98]
                "
              >
                Change password
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* COMPLETED                                                         */}
        {/* ================================================================ */}

        {step === "completed" && (
          <div
            key="completed"
            className="
              relative
              flex
              flex-col
              items-center
              py-8
              text-center
              animate-[successEnter_.55s_cubic-bezier(0.22,1,0.36,1)]
            "
          >
            {/* Large ambient glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-56
                w-56
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-green-400/[0.08]
                blur-3xl
                animate-[successGlow_1.5s_ease-out]
              "
            />

            {/* Success icon */}
            <div className="relative mb-7">
              {/* Outer pulse ring */}
              <div
                className="
                  absolute
                  inset-[-18px]
                  rounded-full
                  border
                  border-green-400/[0.06]
                  animate-[outerRing_1.2s_ease-out]
                "
              />

              {/* Middle ring */}
              <div
                className="
                  absolute
                  inset-[-9px]
                  rounded-full
                  border
                  border-green-400/[0.12]
                  animate-[middleRing_.8s_ease-out]
                "
              />

              {/* Glow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-green-400/25
                  blur-xl
                  animate-[iconGlow_1s_ease-out]
                "
              />

              {/* Circle */}
              <div
                className="
                  relative
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-green-400/30
                  bg-green-400/10
                  text-green-400
                  shadow-[0_0_50px_rgba(74,222,128,0.22)]
                  animate-[iconPop_.55s_cubic-bezier(0.22,1,0.36,1)]
                "
              >
                <Check
                  size={34}
                  strokeWidth={2.5}
                  className="
                    animate-[checkDraw_.55s_.2s_ease-out_both]
                  "
                />
              </div>
            </div>

            {/* Title */}
            <h2
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-white
                animate-[successText_.45s_.2s_ease-out_both]
              "
            >
              Password changed
            </h2>

            {/* Description */}
            <p
              className="
                mt-2
                max-w-xs
                text-sm
                leading-relaxed
                text-zinc-400
                animate-[successText_.45s_.3s_ease-out_both]
              "
            >
              Your password has been successfully updated.
            </p>

            {/* Status pill */}
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-full
                border
                border-green-400/10
                bg-green-400/[0.06]
                px-3.5
                py-1.5
                text-[11px]
                font-medium
                text-green-400
                animate-[successText_.45s_.4s_ease-out_both]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-400
                  shadow-[0_0_8px_rgba(74,222,128,0.8)]
                  animate-pulse
                "
              />
              Security updated
            </div>

            {/* Done */}
            <button
              type="button"
              onClick={handleClose}
              className="
                mt-7
                h-11
                w-full
                rounded-xl
                bg-green-400
                text-sm
                font-semibold
                text-black
                shadow-[0_0_30px_rgba(74,222,128,0.2)]
                transition-all
                duration-200
                hover:bg-green-300
                hover:shadow-[0_0_35px_rgba(74,222,128,0.3)]
                active:scale-[0.98]
                animate-[successText_.45s_.5s_ease-out_both]
              "
            >
              Done
            </button>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePasswordDialog;
