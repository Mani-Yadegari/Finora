import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Check, ChevronLeft, Mail, ShieldCheck } from "lucide-react";

type EmailChangeStep = "old-email" | "new-email" | "success";

interface ChangeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  oldEmail: string;
  newEmail: string;

  onConfirm: () => void;
}

const ChangeEmailDialog = ({
  open,
  onOpenChange,
  oldEmail,
  newEmail,
  onConfirm,
}: ChangeEmailDialogProps) => {
  const [step, setStep] = useState<EmailChangeStep>("old-email");

  const [code, setCode] = useState("");

  const [oldEmailCode, setOldEmailCode] = useState("");
  const [newEmailCode, setNewEmailCode] = useState("");

  const [error, setError] = useState("");

  const [successVisible, setSuccessVisible] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Generate verification code                                             */
  /* ---------------------------------------------------------------------- */

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  /* ---------------------------------------------------------------------- */
  /* Send code to old email                                                 */
  /* ---------------------------------------------------------------------- */

  const sendOldEmailCode = () => {
    const generatedCode = generateCode();

    setOldEmailCode(generatedCode);

    console.log("====================================");
    console.log("FINORA EMAIL VERIFICATION");
    console.log("Verification code sent to OLD email:");
    console.log("Email:", oldEmail);
    console.log("Code:", generatedCode);
    console.log("====================================");
  };

  /* ---------------------------------------------------------------------- */
  /* Send code to new email                                                 */
  /* ---------------------------------------------------------------------- */

  const sendNewEmailCode = () => {
    const generatedCode = generateCode();

    setNewEmailCode(generatedCode);

    console.log("====================================");
    console.log("FINORA EMAIL VERIFICATION");
    console.log("Verification code sent to NEW email:");
    console.log("Email:", newEmail);
    console.log("Code:", generatedCode);
    console.log("====================================");
  };

  /* ---------------------------------------------------------------------- */
  /* Reset dialog                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) {
      setStep("old-email");
      setCode("");
      setError("");
      setOldEmailCode("");
      setNewEmailCode("");
      setSuccessVisible(false);

      return;
    }

    sendOldEmailCode();
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* Verify old email                                                       */
  /* ---------------------------------------------------------------------- */

  const handleOldEmailVerification = () => {
    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    if (code.trim() !== oldEmailCode) {
      setError("The verification code is incorrect.");
      return;
    }

    setError("");
    setCode("");

    setStep("new-email");

    sendNewEmailCode();
  };

  /* ---------------------------------------------------------------------- */
  /* Verify new email                                                       */
  /* ---------------------------------------------------------------------- */

  const handleNewEmailVerification = () => {
    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    if (code.trim() !== newEmailCode) {
      setError("The verification code is incorrect.");
      return;
    }

    setError("");
    setCode("");

    setStep("success");

    setSuccessVisible(true);

    onConfirm();
  };

  /* ---------------------------------------------------------------------- */
  /* Back                                                                    */
  /* ---------------------------------------------------------------------- */

  const handleBack = () => {
    setStep("old-email");
    setCode("");
    setError("");

    sendOldEmailCode();
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
        {/* Green glow */}
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
        {/* OLD EMAIL                                                        */}
        {/* ================================================================ */}

        {step === "old-email" && (
          <div className="relative">
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

              <AlertDialogTitle
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                Verify your current email
              </AlertDialogTitle>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                We've sent a verification code to your current email address.
              </p>

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.035]
                  px-4
                  py-3
                "
              >
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-green-400" />

                  <div className="min-w-0">
                    <p className="text-[11px] text-zinc-500">Current email</p>

                    <p className="mt-0.5 truncate text-sm font-medium text-white">
                      {oldEmail}
                    </p>
                  </div>
                </div>
              </div>
            </AlertDialogHeader>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Verification code
              </label>

              <input
                autoFocus
                value={code}
                onChange={(event) => {
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleOldEmailVerification();
                  }
                }}
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-4
                  text-center
                  text-lg
                  font-semibold
                  tracking-[0.35em]
                  text-white
                  outline-none
                  transition
                  placeholder:text-zinc-700
                  focus:border-green-400/30
                  focus:bg-white/[0.05]
                "
              />

              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

              <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
                For testing, the verification code is available in the browser
                console.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
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
                onClick={handleOldEmailVerification}
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
                Verify
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* NEW EMAIL                                                        */}
        {/* ================================================================ */}

        {step === "new-email" && (
          <div className="relative">
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
                <ChevronLeft size={14} />
                Back
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
                <Mail size={24} />
              </div>

              <AlertDialogTitle
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                Verify your new email
              </AlertDialogTitle>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Your current email was verified. We've sent a new code to your
                new email address.
              </p>

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-green-400/10
                  bg-green-400/[0.04]
                  px-4
                  py-3
                "
              >
                <div className="flex items-center gap-3">
                  <Mail size={17} className="shrink-0 text-green-400" />

                  <div className="min-w-0">
                    <p className="text-[11px] text-zinc-500">New email</p>

                    <p className="mt-0.5 truncate text-sm font-medium text-white">
                      {newEmail}
                    </p>
                  </div>
                </div>
              </div>
            </AlertDialogHeader>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Verification code
              </label>

              <input
                autoFocus
                value={code}
                onChange={(event) => {
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleNewEmailVerification();
                  }
                }}
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-4
                  text-center
                  text-lg
                  font-semibold
                  tracking-[0.35em]
                  text-white
                  outline-none
                  transition
                  placeholder:text-zinc-700
                  focus:border-green-400/30
                  focus:bg-white/[0.05]
                "
              />

              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

              <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
                For testing, the verification code is available in the browser
                console.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
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
                onClick={handleNewEmailVerification}
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
                Verify & Save
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SUCCESS                                                          */}
        {/* ================================================================ */}

        {step === "success" && (
          <div
            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              py-6
              text-center
              transition-all
              duration-500
              ${
                successVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }
            `}
          >
            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-green-400/20
                bg-green-400/10
                text-green-400
                shadow-[0_0_40px_rgba(74,222,128,0.2)]
              "
            >
              <Check size={30} strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Email changed successfully
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
              Your Finora account is now connected to your new email address.
            </p>

            <div
              className="
                mt-5
                w-full
                rounded-2xl
                border
                border-green-400/10
                bg-green-400/[0.04]
                px-4
                py-3
                text-sm
                font-medium
                text-green-300
              "
            >
              {newEmail}
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="
                mt-6
                h-11
                w-full
                rounded-xl
                bg-green-400
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-green-300
                active:scale-[0.98]
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

export default ChangeEmailDialog;
