import { createPortal } from "react-dom";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  User,
  Mail,
  Wallet,
  CalendarDays,
  Moon,
  Sun,
  Bell,
  Shield,
  Trash2,
  ChevronRight,
  ChevronDown,
  Check,
  Settings2,
} from "lucide-react";

type NotificationKey = "budget" | "transactions" | "summary";

type FeedbackState = "idle" | "saved" | "saving-out";

type SettingsState = {
  fullName: string;
  email: string;
  theme: "dark" | "light";
  currency: "USD" | "EUR";
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  notifications: Record<NotificationKey, boolean>;
};

type SelectOption = {
  value: string;
  label: string;
};

const initialSettings: SettingsState = {
  fullName: "Mani Yadegari",
  email: "mani@example.com",
  theme: "dark",
  currency: "USD",
  dateFormat: "DD/MM/YYYY",
  notifications: {
    budget: true,
    transactions: true,
    summary: false,
  },
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  const [savedSettings, setSavedSettings] =
    useState<SettingsState>(initialSettings);

  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const showUnsavedBar =
    hasChanges && feedback !== "saved" && feedback !== "saving-out";

  /* ---------------------------------------------------------------------- */
  /* Success animation lifecycle                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (feedback !== "saved") return;

    const timer = window.setTimeout(() => {
      setFeedback("saving-out");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (feedback !== "saving-out") return;

    const timer = window.setTimeout(() => {
      setFeedback("idle");
    }, 500);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  /* ---------------------------------------------------------------------- */
  /* Update setting                                                          */
  /* ---------------------------------------------------------------------- */

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (feedback === "saved" || feedback === "saving-out") {
      setFeedback("idle");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Notification                                                            */
  /* ---------------------------------------------------------------------- */

  const updateNotification = (key: NotificationKey, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));

    if (feedback === "saved" || feedback === "saving-out") {
      setFeedback("idle");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Save                                                                     */
  /* ---------------------------------------------------------------------- */

  const handleSave = () => {
    if (!hasChanges) return;

    setSavedSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
      },
    });

    setFeedback("saved");
  };

  /* ---------------------------------------------------------------------- */
  /* Discard                                                                  */
  /* ---------------------------------------------------------------------- */

  const handleDiscard = () => {
    setSettings({
      ...savedSettings,
      notifications: {
        ...savedSettings.notifications,
      },
    });

    setFeedback("idle");
  };

  return (
    <>
      <div className="w-full pb-10">
        {/* ================================================================ */}
        {/* Header                                                            */}
        {/* ================================================================ */}

        <div className="relative mb-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] px-7 py-6 backdrop-blur-2xl">
          <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-green-500/[0.09] blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-64 w-64 rounded-full bg-emerald-500/[0.045] blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-green-500/10 bg-green-500/[0.08] text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.05)]">
              <Settings2 size={19} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Settings
              </h1>

              <p className="mt-1 text-sm text-white/40">
                Manage your account and customize your Finora experience.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Sections                                                          */}
        {/* ================================================================ */}

        <div className="space-y-5">
          {/* ============================================================= */}
          {/* Profile                                                         */}
          {/* ============================================================= */}

          <SettingsCard
            icon={
              <SectionIcon>
                <User size={17} />
              </SectionIcon>
            }
            title="Profile"
            description="Manage your personal information."
          >
            <div className="space-y-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/15 bg-green-500/[0.08] text-lg font-semibold text-green-400">
                      {settings.fullName.charAt(0).toUpperCase() || "M"}
                    </div>

                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#101010] bg-green-500" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {settings.fullName || "Your name"}
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Personal account
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-fit rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-white/55 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
                >
                  Change avatar
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full name"
                  icon={<User size={16} />}
                  value={settings.fullName}
                  onChange={(value) => updateSetting("fullName", value)}
                />

                <InputField
                  label="Email address"
                  icon={<Mail size={16} />}
                  type="email"
                  value={settings.email}
                  onChange={(value) => updateSetting("email", value)}
                />
              </div>
            </div>
          </SettingsCard>

          {/* ============================================================= */}
          {/* Preferences                                                     */}
          {/* ============================================================= */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Wallet size={17} />
              </SectionIcon>
            }
            title="Preferences"
            description="Choose how Finora displays your financial information."
          >
            <div className="overflow-visible rounded-2xl border border-white/[0.065] bg-black/[0.12]">
              <PreferenceRow
                icon={<Wallet size={16} />}
                title="Currency"
                description="Default currency for your transactions"
              >
                <CustomSelect
                  value={settings.currency}
                  onChange={(value) =>
                    updateSetting("currency", value as "USD" | "EUR")
                  }
                  options={[
                    {
                      value: "USD",
                      label: "USD",
                    },
                    {
                      value: "EUR",
                      label: "EUR",
                    },
                  ]}
                />
              </PreferenceRow>

              <PreferenceRow
                icon={<CalendarDays size={16} />}
                title="Date format"
                description="Choose how dates appear across Finora"
              >
                <CustomSelect
                  value={settings.dateFormat}
                  onChange={(value) =>
                    updateSetting(
                      "dateFormat",
                      value as SettingsState["dateFormat"],
                    )
                  }
                  options={[
                    {
                      value: "DD/MM/YYYY",
                      label: "DD/MM/YYYY",
                    },
                    {
                      value: "MM/DD/YYYY",
                      label: "MM/DD/YYYY",
                    },
                    {
                      value: "YYYY-MM-DD",
                      label: "YYYY-MM-DD",
                    },
                  ]}
                />
              </PreferenceRow>
            </div>
          </SettingsCard>

          {/* ============================================================= */}
          {/* Appearance                                                      */}
          {/* ============================================================= */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Sun size={17} />
              </SectionIcon>
            }
            title="Appearance"
            description="Customize the look and feel of your dashboard."
          >
            <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              <ThemeOption
                active={settings.theme === "dark"}
                icon={<Moon size={17} />}
                title="Dark"
                description="Recommended"
                onClick={() => updateSetting("theme", "dark")}
              />

              <ThemeOption
                active={settings.theme === "light"}
                icon={<Sun size={17} />}
                title="Light"
                description="Clean and bright"
                onClick={() => updateSetting("theme", "light")}
              />
            </div>
          </SettingsCard>

          {/* ============================================================= */}
          {/* Notifications                                                   */}
          {/* ============================================================= */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Bell size={17} />
              </SectionIcon>
            }
            title="Notifications"
            description="Choose what Finora can notify you about."
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.065] bg-black/[0.12]">
              <NotificationRow
                icon={<Bell size={16} />}
                title="Budget alerts"
                description="Get notified when you're close to a budget limit."
                enabled={settings.notifications.budget}
                onToggle={() =>
                  updateNotification("budget", !settings.notifications.budget)
                }
              />

              <NotificationRow
                icon={<Wallet size={16} />}
                title="Transaction reminders"
                description="Receive reminders about your recent transactions."
                enabled={settings.notifications.transactions}
                onToggle={() =>
                  updateNotification(
                    "transactions",
                    !settings.notifications.transactions,
                  )
                }
              />

              <NotificationRow
                icon={<CalendarDays size={16} />}
                title="Monthly summary"
                description="Receive a summary of your monthly finances."
                enabled={settings.notifications.summary}
                onToggle={() =>
                  updateNotification("summary", !settings.notifications.summary)
                }
              />
            </div>
          </SettingsCard>

          {/* ============================================================= */}
          {/* Security                                                        */}
          {/* ============================================================= */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Shield size={17} />
              </SectionIcon>
            }
            title="Security"
            description="Keep your Finora account secure."
          >
            <button
              type="button"
              className="group flex w-full items-center justify-between gap-5 rounded-2xl border border-white/[0.065] bg-black/[0.12] px-4 py-4 text-left transition-all duration-200 hover:border-white/[0.11] hover:bg-white/[0.025]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.07] text-green-400">
                  <Shield size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">Password</p>

                  <p className="mt-1 text-xs text-white/30">
                    Change your account password
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/25 transition group-hover:text-white/50">
                <span className="hidden text-xs sm:block">Change password</span>

                <ChevronRight size={16} />
              </div>
            </button>
          </SettingsCard>

          {/* ============================================================= */}
          {/* Danger Zone                                                     */}
          {/* ============================================================= */}

          <SettingsCard
            danger
            icon={
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/[0.07] text-red-400">
                <Trash2 size={17} />
              </div>
            }
            title="Danger zone"
            description="Permanent and irreversible account actions."
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-white">Delete account</p>

                <p className="mt-1 text-xs text-white/30">
                  Permanently delete your account and all associated data.
                </p>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-4 py-2.5 text-xs font-medium text-red-400 transition-all duration-200 hover:border-red-500/25 hover:bg-red-500/[0.12] hover:text-red-300 active:scale-[0.98]"
              >
                <Trash2 size={14} />
                Delete account
              </button>
            </div>
          </SettingsCard>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Save / Success Bar                                                  */}
      {/* ================================================================== */}

      <div
        className={`fixed bottom-5 left-1/2 z-[500] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 ${
          showUnsavedBar || feedback === "saved" || feedback === "saving-out"
            ? "visible"
            : "pointer-events-none invisible"
        }`}
      >
        {/* ================================================================ */}
        {/* Unsaved                                                           */}
        {/* ================================================================ */}

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
                  onClick={handleDiscard}
                  className="cursor-pointer select-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-xs font-medium text-white/50 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white active:scale-[0.97]"
                >
                  Discard
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex cursor-pointer select-none items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-medium text-black shadow-[0_6px_20px_rgba(34,197,94,0.14)] transition-all duration-200 hover:bg-green-400 hover:shadow-[0_8px_25px_rgba(34,197,94,0.2)] active:scale-[0.97]"
                >
                  <Check size={15} strokeWidth={2.5} />
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* Saved                                                              */}
        {/* ================================================================ */}

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

        {/* ================================================================ */}
        {/* Saved Exit                                                        */}
        {/* ================================================================ */}

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

      {/* ================================================================== */}
      {/* Animations                                                         */}
      {/* ================================================================== */}

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

/* ========================================================================== */
/* Settings Card                                                              */
/* ========================================================================== */

type SettingsCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  danger?: boolean;
};

const SettingsCard = ({
  icon,
  title,
  description,
  children,
  danger = false,
}: SettingsCardProps) => {
  return (
    <section
      className={`relative overflow-visible rounded-2xl border ${
        danger
          ? "border-red-500/[0.13] bg-red-500/[0.018]"
          : "border-white/[0.08] bg-white/[0.025]"
      }`}
    >
      {!danger && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-green-500/[0.025] blur-3xl" />
      )}

      {danger && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-red-500/[0.025] blur-3xl" />
      )}

      <div className="relative flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        {icon}

        <div>
          <h2
            className={`text-sm font-medium ${
              danger ? "text-red-400" : "text-white/85"
            }`}
          >
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-white/30">{description}</p>
        </div>
      </div>

      <div className="relative p-5">{children}</div>
    </section>
  );
};

/* ========================================================================== */
/* Section Icon                                                               */
/* ========================================================================== */

const SectionIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.07] text-green-400">
      {children}
    </div>
  );
};

/* ========================================================================== */
/* Input                                                                      */
/* ========================================================================== */

type InputFieldProps = {
  label: string;
  icon: ReactNode;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

const InputField = ({
  label,
  icon,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className="mb-2 block select-text text-xs font-medium text-white/45">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/10 pl-10 pr-4 text-sm text-white outline-none transition-all duration-200 hover:border-white/[0.11] focus:border-green-500/30 focus:bg-white/[0.025] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.035)]"
        />
      </div>
    </div>
  );
};

/* ========================================================================== */
/* Preference Row                                                             */
/* ========================================================================== */

type PreferenceRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

const PreferenceRow = ({
  icon,
  title,
  description,
  children,
}: PreferenceRowProps) => {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/[0.06] px-4 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.06] text-green-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="select-text text-sm font-medium text-white">{title}</p>

          <p className="mt-1 select-text text-xs text-white/30">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

/* ========================================================================== */
/* Portal Custom Select                                                       */
/* ========================================================================== */

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  /* ---------------------------------------------------------------------- */
  /* Position dropdown                                                       */
  /* ---------------------------------------------------------------------- */

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    const dropdownWidth = Math.max(155, rect.width);

    const gap = 8;

    let left = rect.right - dropdownWidth;

    const viewportPadding = 12;

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (left + dropdownWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - dropdownWidth - viewportPadding;
    }

    const dropdownHeight = Math.min(options.length * 42 + 12, 180);

    let top = rect.bottom + gap;

    /*
     * If there isn't enough space below,
     * open above the trigger.
     */
    if (top + dropdownHeight > window.innerHeight - viewportPadding) {
      top = rect.top - dropdownHeight - gap;
    }

    setPosition({
      top,
      left,
      width: dropdownWidth,
    });
  };

  /* ---------------------------------------------------------------------- */
  /* Open                                                                    */
  /* ---------------------------------------------------------------------- */

  const handleOpen = () => {
    if (!open) {
      updatePosition();
    }

    setOpen((previous) => !previous);
  };

  /* ---------------------------------------------------------------------- */
  /* Update position while scrolling/resizing                               */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll, true);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);

      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* Outside click                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target)) {
        return;
      }

      if (dropdownRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* Dropdown portal                                                         */
  /* ---------------------------------------------------------------------- */

  const dropdown =
    open && position && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[99999] overflow-hidden rounded-xl border border-white/[0.10] bg-[#151515] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.025)]"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              backgroundColor: "#151515",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              opacity: 1,
              isolation: "isolate",
            }}
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                    active
                      ? "bg-green-500/[0.10] text-green-400"
                      : "text-white/65 hover:bg-white/[0.055] hover:text-white"
                  }`}
                  style={{
                    backgroundColor: active
                      ? "rgba(34,197,94,0.10)"
                      : "transparent",
                  }}
                >
                  <span className="whitespace-nowrap">{option.label}</span>

                  {active && (
                    <Check
                      size={14}
                      className="shrink-0 text-green-400"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative z-[10] shrink-0">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          className={`relative flex min-w-[155px] items-center justify-between gap-3 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200 ${
            open
              ? "border-green-500/25 bg-white/[0.055] text-white shadow-[0_0_0_3px_rgba(34,197,94,0.035)]"
              : "border-white/[0.07] bg-white/[0.025] text-white/70 hover:border-white/[0.13] hover:bg-white/[0.045] hover:text-white"
          }`}
        >
          <span className="whitespace-nowrap">{selectedOption.label}</span>

          <ChevronDown
            size={15}
            className={`shrink-0 text-white/30 transition-transform duration-200 ${
              open ? "rotate-180 text-green-400" : ""
            }`}
          />
        </button>
      </div>

      {dropdown}
    </>
  );
};

/* ========================================================================== */
/* Theme Option                                                               */
/* ========================================================================== */

type ThemeOptionProps = {
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const ThemeOption = ({
  active,
  icon,
  title,
  description,
  onClick,
}: ThemeOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
        active
          ? "border-green-500/25 bg-green-500/[0.06] shadow-[0_0_25px_rgba(34,197,94,0.035)]"
          : "border-white/[0.07] bg-white/[0.018] hover:border-white/[0.12] hover:bg-white/[0.035]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          active
            ? "bg-green-500/10 text-green-400"
            : "bg-white/[0.04] text-white/30"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-white">{title}</p>

        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>

      {active && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-black shadow-[0_0_12px_rgba(34,197,94,0.25)]">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

/* ========================================================================== */
/* Notification Row                                                           */
/* ========================================================================== */

type NotificationRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

const NotificationRow = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: NotificationRowProps) => {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/[0.06] px-4 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/10 bg-green-500/[0.06] text-green-400">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="select-text text-sm font-medium text-white">{title}</p>

          <p className="mt-1 select-text text-xs text-white/30">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-all duration-200 ${
          enabled
            ? "border-green-400/20 bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.12)]"
            : "border-white/[0.08] bg-white/[0.08]"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${
            enabled ? "left-[22px]" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Settings;
