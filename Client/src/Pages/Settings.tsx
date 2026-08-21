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
  Check,
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
import DeleteAccountDialog from "../components/settings/DeleteAccountDialog";
import ChangeEmailDialog from "../components/settings/ChangeEmailDialog";
import ChangePasswordDialog from "../components/settings/ChangePasswordDialog";

type NotificationKey = "budget" | "transactions" | "summary";

type ProfileState = {
  fullName: string;
  email: string;
};

type SettingsState = {
  theme: "dark" | "light";
  currency: "USD" | "EUR";
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  notifications: Record<NotificationKey, boolean>;
};

const initialProfile: ProfileState = {
  fullName: "Mani Yadegari",
  email: "mani@example.com",
};

const initialSettings: SettingsState = {
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
  /* ---------------------------------------------------------------------- */
  /* Profile state                                                          */
  /* ---------------------------------------------------------------------- */

  const [profile, setProfile] = useState<ProfileState>(initialProfile);

  const [savedProfile, setSavedProfile] =
    useState<ProfileState>(initialProfile);

  const [profileFeedback, setProfileFeedback] = useState<
    "idle" | "saved" | "error"
  >("idle");

  const [profileSaveAnimating, setProfileSaveAnimating] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Change email dialog                                                    */
  /* ---------------------------------------------------------------------- */

  const [changeEmailOpen, setChangeEmailOpen] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Change password dialog                                                 */
  /* ---------------------------------------------------------------------- */

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* General settings state                                                 */
  /* ---------------------------------------------------------------------- */

  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  const [savedSettings, setSavedSettings] =
    useState<SettingsState>(initialSettings);

  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  /* ---------------------------------------------------------------------- */
  /* Delete account dialog                                                  */
  /* ---------------------------------------------------------------------- */

  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Detect profile changes                                                 */
  /* ---------------------------------------------------------------------- */

  const profileHasChanges =
    JSON.stringify(profile) !== JSON.stringify(savedProfile);

  /* ---------------------------------------------------------------------- */
  /* Detect general settings changes                                        */
  /* ---------------------------------------------------------------------- */

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  /* ---------------------------------------------------------------------- */
  /* Update profile                                                         */
  /* ---------------------------------------------------------------------- */

  const updateProfile = <K extends keyof ProfileState>(
    key: K,
    value: ProfileState[K],
  ) => {
    setProfile((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (profileFeedback !== "idle") {
      setProfileFeedback("idle");
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Profile save                                                           */
  /* ---------------------------------------------------------------------- */

  const handleProfileSave = () => {
    if (!profileHasChanges || profileSaveAnimating) return;

    const trimmedName = profile.fullName.trim();
    const trimmedEmail = profile.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setProfileFeedback("error");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setProfileFeedback("error");
      return;
    }

    /* Email changed */
    if (trimmedEmail !== savedProfile.email) {
      console.log("====================================");
      console.log("FINORA EMAIL CHANGE REQUEST");
      console.log("Old email:", savedProfile.email);
      console.log("New email:", trimmedEmail);
      console.log("Opening email verification dialog...");
      console.log("====================================");

      setChangeEmailOpen(true);

      return;
    }

    /* Only name changed */
    setSavedProfile({
      fullName: trimmedName,
      email: savedProfile.email,
    });

    setProfile({
      fullName: trimmedName,
      email: savedProfile.email,
    });

    setProfileSaveAnimating(true);

    window.setTimeout(() => {
      setProfileSaveAnimating(false);
    }, 1800);
  };

  /* ---------------------------------------------------------------------- */
  /* Confirm email change                                                   */
  /* ---------------------------------------------------------------------- */

  const handleEmailChangeConfirm = () => {
    const trimmedName = profile.fullName.trim();
    const trimmedEmail = profile.email.trim();

    setSavedProfile({
      fullName: trimmedName,
      email: trimmedEmail,
    });

    setProfile({
      fullName: trimmedName,
      email: trimmedEmail,
    });

    setProfileFeedback("idle");

    console.log("====================================");
    console.log("FINORA EMAIL CHANGED SUCCESSFULLY");
    console.log("Old email:", savedProfile.email);
    console.log("New email:", trimmedEmail);
    console.log("====================================");
  };

  /* ---------------------------------------------------------------------- */
  /* Confirm password change                                                */
  /* ---------------------------------------------------------------------- */

  const handlePasswordChangeConfirm = () => {
    console.log("====================================");
    console.log("FINORA PASSWORD CHANGED SUCCESSFULLY");
    console.log("====================================");
  };

  /* ---------------------------------------------------------------------- */
  /* General settings feedback lifecycle                                    */
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
  /* Update general setting                                                 */
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
  /* Save general settings                                                  */
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
  /* Discard general settings                                               */
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

  /* ---------------------------------------------------------------------- */
  /* Delete account                                                         */
  /* ---------------------------------------------------------------------- */

  const handleDeleteAccount = () => {
    setDeleteAccountOpen(false);
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
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-6
            backdrop-blur-3xl
          "
        >
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
                      {profile.fullName.charAt(0).toUpperCase() || "M"}
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
                      {profile.fullName || "Your name"}
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
                  value={profile.fullName}
                  onChange={(value) => updateProfile("fullName", value)}
                />

                <InputField
                  label="Email address"
                  icon={<Mail size={16} />}
                  type="email"
                  value={profile.email}
                  onChange={(value) => updateProfile("email", value)}
                />
              </div>

              {/* Profile Save */}
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-t
                  border-white/[0.06]
                  pt-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-end
                "
              >
                <button
                  type="button"
                  disabled={!profileHasChanges || profileSaveAnimating}
                  onClick={handleProfileSave}
                  className={`
                    relative
                    flex
                    min-w-[135px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      profileSaveAnimating
                        ? `
                          bg-green-500
                          text-black
                          shadow-[0_0_30px_rgba(34,197,94,0.25)]
                        `
                        : profileHasChanges
                          ? `
                            bg-green-500
                            text-black
                            hover:bg-green-400
                            active:scale-[0.98]
                          `
                          : `
                            cursor-not-allowed
                            bg-white/[0.05]
                            text-white/20
                          `
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      items-center
                      gap-2
                      transition-all
                      duration-300
                      ${
                        profileSaveAnimating
                          ? "-translate-y-8 opacity-0"
                          : "translate-y-0 opacity-100"
                      }
                    `}
                  >
                    Save changes
                  </span>

                  <span
                    className={`
                      absolute
                      flex
                      items-center
                      gap-2
                      transition-all
                      duration-300
                      ${
                        profileSaveAnimating
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }
                    `}
                  >
                    <span
                      className="
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-black/10
                      "
                    >
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="animate-[checkmark_.35s_ease-out]"
                      />
                    </span>
                    Saved
                  </span>
                </button>
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
              onClick={() => setChangePasswordOpen(true)}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                gap-5
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                px-4
                py-4
                text-left
                transition-all
                duration-200
                hover:border-green-400/20
                hover:bg-white/[0.045]
                hover:shadow-[0_0_30px_rgba(74,222,128,0.04)]
                active:scale-[0.995]
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
                    border-green-400/15
                    bg-green-400/[0.09]
                    text-green-400
                    transition-all
                    duration-200
                    group-hover:border-green-400/25
                    group-hover:bg-green-400/[0.13]
                  "
                >
                  <Shield size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">Password</p>

                  <p className="mt-1 text-xs text-white/40">
                    Change your account password
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-white/45
                  transition-all
                  duration-200
                  group-hover:text-green-400
                "
              >
                <span className="hidden text-xs sm:block">Change password</span>

                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
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
                onClick={() => setDeleteAccountOpen(true)}
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
      {/* General Settings Save Bar                                        */}
      {/* ================================================================ */}

      <SettingsSaveBar
        hasChanges={hasChanges}
        feedback={feedback}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />

      {/* ================================================================ */}
      {/* Change Email Dialog                                               */}
      {/* ================================================================ */}

      <ChangeEmailDialog
        open={changeEmailOpen}
        onOpenChange={setChangeEmailOpen}
        oldEmail={savedProfile.email}
        newEmail={profile.email.trim()}
        onConfirm={handleEmailChangeConfirm}
      />

      {/* ================================================================ */}
      {/* Change Password Dialog                                            */}
      {/* ================================================================ */}

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
        onConfirm={handlePasswordChangeConfirm}
      />

      {/* ================================================================ */}
      {/* Delete Account Dialog                                             */}
      {/* ================================================================ */}

      <DeleteAccountDialog
        open={deleteAccountOpen}
        onOpenChange={setDeleteAccountOpen}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

export default Settings;
