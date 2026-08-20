import { Check } from "lucide-react";

export type FeedbackState = "idle" | "saved" | "saving-out";

type SettingsSaveBarProps = {
  hasChanges: boolean;
  feedback: FeedbackState;
  onSave: () => void;
  onDiscard: () => void;
};

const SettingsSaveBar = ({
  hasChanges,
  feedback,
  onSave,
  onDiscard,
}: SettingsSaveBarProps) => {
  const showUnsavedBar =
    hasChanges && feedback !== "saved" && feedback !== "saving-out";

  const visible =
    showUnsavedBar || feedback === "saved" || feedback === "saving-out";

  return (
    <>
      <div
        className={`fixed bottom-5 left-1/2 z-[500] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 ${
          visible ? "visible" : "pointer-events-none invisible"
        }`}
      >
        {showUnsavedBar && (
          <div
            className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101010] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            style={{
              animation: "saveBarIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-green-500/[0.07] blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.45)]" />

                  <p className="select-text text-sm font-medium text-white">
                    Unsaved changes
                  </p>
                </div>

                <p className="mt-1 hidden select-text text-xs text-white/30 sm:block">
                  Save your changes to update your Finora preferences.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onDiscard}
                  className="cursor-pointer select-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-xs font-medium text-white/50 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white active:scale-[0.97]"
                >
                  Discard
                </button>

                <button
                  type="button"
                  onClick={onSave}
                  className="flex cursor-pointer select-none items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-medium text-black shadow-[0_6px_20px_rgba(34,197,94,0.14)] transition-all duration-200 hover:bg-green-400 hover:shadow-[0_8px_25px_rgba(34,197,94,0.2)] active:scale-[0.97]"
                >
                  <Check size={15} strokeWidth={2.5} />
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}

        {feedback === "saved" && (
          <div
            className="relative overflow-hidden rounded-2xl border border-green-500/[0.18] bg-[#101512] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_35px_rgba(34,197,94,0.07)]"
            style={{
              animation: "savedEnter 0.45s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div className="pointer-events-none absolute -left-20 -top-24 h-48 w-48 rounded-full bg-green-500/[0.09] blur-3xl" />

            <div className="relative flex items-center justify-center gap-3">
              <div
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                style={{
                  animation:
                    "successIcon 0.5s cubic-bezier(0.22,1,0.36,1) both",
                }}
              >
                <Check size={18} strokeWidth={2.8} />

                <span
                  className="pointer-events-none absolute inset-0 rounded-full border border-green-300/40"
                  style={{
                    animation: "successRing 0.7s ease-out 0.1s both",
                  }}
                />
              </div>

              <div
                style={{
                  animation: "savedTextIn 0.4s ease-out 0.08s both",
                }}
              >
                <p className="select-text text-sm font-medium text-white">
                  Changes saved
                </p>

                <p className="mt-0.5 select-text text-xs text-green-400/55">
                  Your Finora preferences have been updated.
                </p>
              </div>
            </div>
          </div>
        )}

        {feedback === "saving-out" && (
          <div
            className="relative overflow-hidden rounded-2xl border border-green-500/[0.18] bg-[#101512] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_35px_rgba(34,197,94,0.07)]"
            style={{
              animation: "savedExit 0.5s cubic-bezier(0.4,0,0.2,1) both",
            }}
          >
            <div className="relative flex items-center justify-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-black">
                <Check size={18} strokeWidth={2.8} />
              </div>

              <div>
                <p className="select-text text-sm font-medium text-white">
                  Changes saved
                </p>

                <p className="mt-0.5 select-text text-xs text-green-400/55">
                  Your Finora preferences have been updated.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes saveBarIn {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes savedEnter {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }

          55% {
            opacity: 1;
            transform: translateY(-2px) scale(1.01);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes savedExit {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
            filter: blur(3px);
          }
        }

        @keyframes successIcon {
          0% {
            opacity: 0;
            transform: scale(0.45) rotate(-15deg);
          }

          60% {
            opacity: 1;
            transform: scale(1.12) rotate(3deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes successRing {
          0% {
            opacity: 0.8;
            transform: scale(0.8);
          }

          100% {
            opacity: 0;
            transform: scale(1.7);
          }
        }

        @keyframes savedTextIn {
          0% {
            opacity: 0;
            transform: translateX(-8px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default SettingsSaveBar;
