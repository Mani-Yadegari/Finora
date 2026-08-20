import { useEffect, useState } from "react";

import {
  Settings2,
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
} from "lucide-react";

import SettingsCard from "../components/settings/SettingsCard";
import SectionIcon from "../components/settings/SectionIcon";
import InputField from "../components/settings/InputField";
import PreferenceRow from "../components/settings/PreferenceRow";
import CustomSelect from "../components/settings/CustomSelect";
import ThemeOption from "../components/settings/ThemeOption";
import NotificationRow from "../components/settings/NotificationRow";
import SettingsSaveBar, {
  type FeedbackState,
} from "../components/settings/SettingsSaveBar";

type NotificationKey = "budget" | "transactions" | "summary";

type SettingsState = {
  fullName: string;
  email: string;
  theme: "dark" | "light";
  currency: "USD" | "EUR";
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  notifications: Record<NotificationKey, boolean>;
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

  /* ---------------------------------------------------------------------- */
  /* Detect changes                                                         */
  /* ---------------------------------------------------------------------- */

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  /* ---------------------------------------------------------------------- */
  /* Saved animation lifecycle                                              */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (feedback !== "saved") return;

    const timer = window.setTimeout(() => {
      setFeedback("saving-out");
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback]);

  useEffect(() => {
    if (feedback !== "saving-out") return;

    const timer = window.setTimeout(() => {
      setFeedback("idle");
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback]);

  /* ---------------------------------------------------------------------- */
  /* Update setting                                                         */
  /* ---------------------------------------------------------------------- */

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K],
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (feedback === "saved" || feedback === "saving-out") {
      setFeedback("idle");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Update notification                                                    */
  /* ---------------------------------------------------------------------- */

  const updateNotification = (key: NotificationKey, value: boolean) => {
    setSettings((previous) => ({
      ...previous,

      notifications: {
        ...previous.notifications,
        [key]: value,
      },
    }));

    if (feedback === "saved" || feedback === "saving-out") {
      setFeedback("idle");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Save                                                                    */
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
  /* Discard                                                                 */
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
        {/* Header                                                           */}
        {/* ================================================================ */}

        <div
          className="
            relative
            z-20
            mb-6
            flex
            flex-col
            gap-6
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-6
            backdrop-blur-3xl
          "
        >
          {/* Green glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-60
              w-60
              rounded-full
              bg-green-400/10
              blur-3xl
            "
          />

          <div className="relative flex items-center gap-4">
            {/* Icon */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-green-400/15
                bg-green-400/[0.07]
                text-green-400
              "
            >
              <Settings2 size={21} />
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-white">Settings</h1>

                <span
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.035]
                    px-2
                    py-0.5
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Preferences
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-500">
                Manage your account and customize your Finora experience.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Settings Sections                                                */}
        {/* ================================================================ */}

        <div className="space-y-5">
          {/* ============================================================ */}
          {/* Profile                                                       */}
          {/* ============================================================ */}

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
              {/* Identity */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-green-500/15
                        bg-green-500/[0.08]
                        text-lg
                        font-semibold
                        text-green-400
                      "
                    >
                      {settings.fullName.charAt(0).toUpperCase() || "M"}
                    </div>

                    <span
                      className="
                        absolute
                        -bottom-1
                        -right-1
                        h-4
                        w-4
                        rounded-full
                        border-2
                        border-[#101010]
                        bg-green-500
                      "
                    />
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
                  className="
                    w-fit
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    text-white/55
                    transition-all
                    duration-200
                    hover:border-white/[0.14]
                    hover:bg-white/[0.06]
                    hover:text-white
                    active:scale-[0.98]
                  "
                >
                  Change avatar
                </button>
              </div>

              {/* Inputs */}
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

          {/* ============================================================ */}
          {/* Preferences                                                   */}
          {/* ============================================================ */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Wallet size={17} />
              </SectionIcon>
            }
            title="Preferences"
            description="Choose how Finora displays your financial information."
          >
            <div
              className="
                overflow-visible
                rounded-2xl
                border
                border-white/[0.065]
                bg-black/[0.12]
              "
            >
              {/* Currency */}
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

              {/* Date */}
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

          {/* ============================================================ */}
          {/* Appearance                                                    */}
          {/* ============================================================ */}

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

          {/* ============================================================ */}
          {/* Notifications                                                 */}
          {/* ============================================================ */}

          <SettingsCard
            icon={
              <SectionIcon>
                <Bell size={17} />
              </SectionIcon>
            }
            title="Notifications"
            description="Choose what Finora can notify you about."
          >
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.065]
                bg-black/[0.12]
              "
            >
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

          {/* ============================================================ */}
          {/* Security                                                      */}
          {/* ============================================================ */}

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
              className="
                group
                flex
                w-full
                items-center
                justify-between
                gap-5
                rounded-2xl
                border
                border-white/[0.065]
                bg-black/[0.12]
                px-4
                py-4
                text-left
                transition-all
                duration-200
                hover:border-white/[0.11]
                hover:bg-white/[0.025]
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-green-500/10
                    bg-green-500/[0.07]
                    text-green-400
                  "
                >
                  <Shield size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">Password</p>

                  <p className="mt-1 text-xs text-white/30">
                    Change your account password
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-white/25
                  transition
                  group-hover:text-white/50
                "
              >
                <span className="hidden text-xs sm:block">Change password</span>

                <ChevronRight size={16} />
              </div>
            </button>
          </SettingsCard>

          {/* ============================================================ */}
          {/* Danger Zone                                                   */}
          {/* ============================================================ */}

          <SettingsCard
            danger
            icon={
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-500/10
                  bg-red-500/[0.07]
                  text-red-400
                "
              >
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
                className="
                  flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/15
                  bg-red-500/[0.07]
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-red-400
                  transition-all
                  duration-200
                  hover:border-red-500/25
                  hover:bg-red-500/[0.12]
                  hover:text-red-300
                  active:scale-[0.98]
                "
              >
                <Trash2 size={14} />
                Delete account
              </button>
            </div>
          </SettingsCard>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Save Bar                                                         */}
      {/* ================================================================ */}

      <SettingsSaveBar
        hasChanges={hasChanges}
        feedback={feedback}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </>
  );
};

export default Settings;
