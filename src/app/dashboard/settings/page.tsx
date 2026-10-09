"use client";

import { useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";
import {
  AlertCircle,
  Bell,
  Building2,
  Check,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Lock,
  Mail,
  Palette,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

type SettingsSection =
  | "company"
  | "profile"
  | "notifications"
  | "system"
  | "security"
  | "dashboard"
  | "data";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("company");

  const [savedMessage, setSavedMessage] = useState("");

  const [companyName, setCompanyName] = useState("MSD Engineering");
  const [companyEmail, setCompanyEmail] = useState("info@msdengineering.com");
  const [companyPhone, setCompanyPhone] = useState("+91 98765 43210");
  const [companyAddress, setCompanyAddress] = useState(
    "Raipur, Chhattisgarh, India"
  );
  const [gstNumber, setGstNumber] = useState("22ABCDE1234F1Z5");

  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@msdengineering.com");
  const [adminPhone, setAdminPhone] = useState("+91 98765 43210");
  const [adminRole, setAdminRole] = useState("Administrator");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [approvalNotifications, setApprovalNotifications] = useState(true);
  const [projectNotifications, setProjectNotifications] = useState(true);
  const [deadlineNotifications, setDeadlineNotifications] = useState(true);
  const [criticalNotifications, setCriticalNotifications] = useState(true);

  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const [compactMode, setCompactMode] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");

  const [showPassword, setShowPassword] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);

  const handleSave = () => {
    setSavedMessage("Settings saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const handleReset = () => {
    setShowResetModal(false);

    setCompanyName("MSD Engineering");
    setCompanyEmail("info@msdengineering.com");
    setCompanyPhone("+91 98765 43210");
    setCompanyAddress("Raipur, Chhattisgarh, India");
    setGstNumber("22ABCDE1234F1Z5");

    setAdminName("Admin User");
    setAdminEmail("admin@msdengineering.com");
    setAdminPhone("+91 98765 43210");
    setAdminRole("Administrator");

    setEmailNotifications(true);
    setApprovalNotifications(true);
    setProjectNotifications(true);
    setDeadlineNotifications(true);
    setCriticalNotifications(true);

    setLanguage("English");
    setTimezone("Asia/Kolkata");
    setDateFormat("DD/MM/YYYY");
    setItemsPerPage("10");

    setTwoFactor(false);
    setSessionTimeout("30");

    setCompactMode(false);
    setShowWelcomeMessage(true);
    setAutoRefresh(true);
    setRefreshInterval("30");

    setSavedMessage("Settings restored to default values.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const menuItems: {
    id: SettingsSection;
    label: string;
    description: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "company",
      label: "Company Profile",
      description: "Company information and contact details",
      icon: Building2,
    },
    {
      id: "profile",
      label: "Admin Profile",
      description: "Your administrator profile",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage alerts and notifications",
      icon: Bell,
    },
    {
      id: "system",
      label: "System Preferences",
      description: "Language, timezone and display settings",
      icon: Globe,
    },
    {
      id: "security",
      label: "Security",
      description: "Password and account security",
      icon: ShieldCheck,
    },
    {
      id: "dashboard",
      label: "Dashboard Preferences",
      description: "Control dashboard behaviour",
      icon: Palette,
    },
    {
      id: "data",
      label: "Data & Export",
      description: "Data download and system records",
      icon: Download,
    },
  ];

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10";

  const selectClass =
    "mt-2 h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10";

  const renderToggle = (
    enabled: boolean,
    setEnabled: (value: boolean) => void
  ) => {
    return (
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 rounded-full transition ${
          enabled ? "bg-[#004890]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004890] text-white">
              <Settings className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#141414]">
                Admin & Settings
              </h1>

              <p className="text-sm text-gray-500">
                Manage company, account, system and dashboard preferences.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b78]"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#e87010]" />

          <div>
            <p className="text-sm font-semibold text-[#141414]">
              UI Preview Mode
            </p>

            <p className="mt-1 text-sm text-gray-600">
              These settings are currently stored only in the interface.
              Backend, authentication and database configuration will be
              connected later.
            </p>
          </div>
        </div>

        {/* Saved Message */}
        {savedMessage && (
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
              <Check className="h-4 w-4 text-green-700" />
            </div>

            <p className="text-sm font-medium text-green-700">
              {savedMessage}
            </p>
          </div>
        )}

        {/* Main Settings Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Settings Navigation */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-3 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Settings
              </p>
            </div>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                      active
                        ? "bg-blue-50 text-[#004890]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-[#004890] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {item.label}
                      </p>

                      <p
                        className={`mt-0.5 line-clamp-1 text-[11px] ${
                          active ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${
                        active ? "text-[#004890]" : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Content */}
          <div className="min-w-0">
            {/* Company Profile */}
            {activeSection === "company" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={Building2}
                  title="Company Profile"
                  description="Manage your organization's basic information."
                />

                <SettingsCard>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Company Name
                      </label>

                      <input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Company Email
                      </label>

                      <input
                        type="email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>

                      <input
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        GST Number
                      </label>

                      <input
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Company Address
                      </label>

                      <textarea
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10"
                      />
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <FileText className="h-5 w-5 text-[#004890]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#141414]">
                        Company Documents
                      </h3>

                      <p className="text-xs text-gray-500">
                        Company certificates, registrations and related files
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <DocumentStatus
                      title="GST Certificate"
                      status="Available"
                    />

                    <DocumentStatus
                      title="Company Registration"
                      status="Available"
                    />

                    <DocumentStatus
                      title="ISO Certificate"
                      status="Available"
                    />
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* Admin Profile */}
            {activeSection === "profile" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={User}
                  title="Admin Profile"
                  description="Manage administrator account information."
                />

                <SettingsCard>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#004890] text-xl font-bold text-white">
                      AU
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#141414]">
                        {adminName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {adminRole}
                      </p>

                      <button className="mt-1 text-xs font-semibold text-[#004890] hover:underline">
                        Change Profile Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>

                      <input
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Role
                      </label>

                      <input
                        value={adminRole}
                        onChange={(e) => setAdminRole(e.target.value)}
                        className={`${inputClass} bg-gray-50`}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>

                      <input
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Users className="h-5 w-5 text-[#004890]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#141414]">
                        Administrator Access
                      </h3>

                      <p className="text-xs text-gray-500">
                        Current account has administrator-level access.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <AccessItem label="Projects" />
                      <AccessItem label="Materials" />
                      <AccessItem label="Reports" />
                      <AccessItem label="Settings" />
                    </div>
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={Bell}
                  title="Notifications"
                  description="Choose which system events should generate notifications."
                />

                <SettingsCard>
                  <div className="divide-y divide-gray-100">
                    <ToggleRow
                      title="Email Notifications"
                      description="Receive important system notifications through email."
                      enabled={emailNotifications}
                      toggle={() =>
                        setEmailNotifications(!emailNotifications)
                      }
                      icon={Mail}
                    />

                    <ToggleRow
                      title="Approval Notifications"
                      description="Notify administrators when approval requests change."
                      enabled={approvalNotifications}
                      toggle={() =>
                        setApprovalNotifications(!approvalNotifications)
                      }
                      icon={Check}
                    />

                    <ToggleRow
                      title="Project Notifications"
                      description="Receive updates related to project activity."
                      enabled={projectNotifications}
                      toggle={() =>
                        setProjectNotifications(!projectNotifications)
                      }
                      icon={Building2}
                    />

                    <ToggleRow
                      title="Deadline Alerts"
                      description="Receive reminders for upcoming and overdue work."
                      enabled={deadlineNotifications}
                      toggle={() =>
                        setDeadlineNotifications(!deadlineNotifications)
                      }
                      icon={AlertCircle}
                    />

                    <ToggleRow
                      title="Critical System Alerts"
                      description="Receive high-priority security and system alerts."
                      enabled={criticalNotifications}
                      toggle={() =>
                        setCriticalNotifications(!criticalNotifications)
                      }
                      icon={ShieldCheck}
                    />
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* System Preferences */}
            {activeSection === "system" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={Globe}
                  title="System Preferences"
                  description="Configure regional and display preferences."
                />

                <SettingsCard>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <SelectField
                      label="Language"
                      value={language}
                      onChange={setLanguage}
                      options={["English", "Hindi"]}
                    />

                    <SelectField
                      label="Timezone"
                      value={timezone}
                      onChange={setTimezone}
                      options={[
                        "Asia/Kolkata",
                        "Asia/Dubai",
                        "Asia/Singapore",
                        "UTC",
                      ]}
                    />

                    <SelectField
                      label="Date Format"
                      value={dateFormat}
                      onChange={setDateFormat}
                      options={[
                        "DD/MM/YYYY",
                        "MM/DD/YYYY",
                        "YYYY-MM-DD",
                      ]}
                    />

                    <SelectField
                      label="Records Per Page"
                      value={itemsPerPage}
                      onChange={setItemsPerPage}
                      options={["10", "20", "50", "100"]}
                    />
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[#004890]" />

                    <div>
                      <h3 className="text-sm font-semibold text-[#141414]">
                        Regional Configuration
                      </h3>

                      <p className="text-xs text-gray-500">
                        Current regional settings for the dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <InfoBox title="Timezone" value="IST (UTC+5:30)" />
                    <InfoBox title="Currency" value="Indian Rupee (₹)" />
                    <InfoBox title="Country" value="India" />
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={ShieldCheck}
                  title="Security"
                  description="Manage account security and authentication preferences."
                />

                <SettingsCard>
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-[#141414]">
                      Change Password
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Update your administrator account password.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Current Password
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className={`${inputClass} pr-11`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>

                      <input
                        type="password"
                        placeholder="Enter new password"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <ToggleRow
                    title="Two-Factor Authentication"
                    description="Add an additional security layer to administrator accounts."
                    enabled={twoFactor}
                    toggle={() => setTwoFactor(!twoFactor)}
                    icon={Lock}
                  />

                  <div className="mt-5 border-t border-gray-100 pt-5">
                    <SelectField
                      label="Session Timeout"
                      value={sessionTimeout}
                      onChange={setSessionTimeout}
                      options={["15", "30", "60", "120"]}
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      Session timeout is currently set to{" "}
                      <span className="font-medium">
                        {sessionTimeout} minutes
                      </span>
                      .
                    </p>
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-[#e87010]" />

                      <div>
                        <p className="text-sm font-semibold text-[#141414]">
                          Security Recommendation
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Enable two-factor authentication when the production
                          authentication system is connected.
                        </p>
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* Dashboard Preferences */}
            {activeSection === "dashboard" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={Palette}
                  title="Dashboard Preferences"
                  description="Customize how the management dashboard behaves."
                />

                <SettingsCard>
                  <div className="divide-y divide-gray-100">
                    <ToggleRow
                      title="Compact Mode"
                      description="Reduce spacing and display more records on screen."
                      enabled={compactMode}
                      toggle={() => setCompactMode(!compactMode)}
                      icon={Palette}
                    />

                    <ToggleRow
                      title="Welcome Message"
                      description="Show the dashboard welcome message when opening the system."
                      enabled={showWelcomeMessage}
                      toggle={() =>
                        setShowWelcomeMessage(!showWelcomeMessage)
                      }
                      icon={User}
                    />

                    <ToggleRow
                      title="Automatic Refresh"
                      description="Automatically refresh dashboard information."
                      enabled={autoRefresh}
                      toggle={() => setAutoRefresh(!autoRefresh)}
                      icon={RotateCcw}
                    />
                  </div>

                  {autoRefresh && (
                    <div className="mt-5 border-t border-gray-100 pt-5">
                      <SelectField
                        label="Refresh Interval"
                        value={refreshInterval}
                        onChange={setRefreshInterval}
                        options={["15", "30", "60", "120"]}
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        Dashboard data will refresh every{" "}
                        <span className="font-medium">
                          {refreshInterval} seconds
                        </span>
                        .
                      </p>
                    </div>
                  )}
                </SettingsCard>

                <SettingsCard>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div>
                      <p className="text-sm font-semibold text-[#141414]">
                        Current Theme
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Fire Wala / MSD Engineering dashboard theme
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-[#004890]" />
                      <div className="h-8 w-8 rounded-lg bg-[#e87010]" />
                      <div className="h-8 w-8 rounded-lg bg-[#141414]" />
                    </div>
                  </div>
                </SettingsCard>
              </div>
            )}

            {/* Data & Export */}
            {activeSection === "data" && (
              <div className="space-y-5">
                <SettingsHeader
                  icon={Download}
                  title="Data & Export"
                  description="Manage system data exports and downloadable records."
                />

                <SettingsCard>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DataAction
                      icon={FileText}
                      title="Project Data"
                      description="Export project information and progress records."
                      button="Export Projects"
                    />

                    <DataAction
                      icon={Building2}
                      title="Material Data"
                      description="Export material inventory and transaction records."
                      button="Export Materials"
                    />

                    <DataAction
                      icon={Users}
                      title="Team Data"
                      description="Export team member and assignment information."
                      button="Export Team"
                    />

                    <DataAction
                      icon={ShieldCheck}
                      title="Audit Data"
                      description="Export system activity and audit records."
                      button="Export Audit Log"
                    />
                  </div>
                </SettingsCard>

                <SettingsCard>
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />

                      <div>
                        <h3 className="text-sm font-semibold text-red-800">
                          Sensitive System Actions
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-red-700">
                          Production data deletion, account removal and system
                          reset actions should be restricted to authorized
                          administrators and protected by backend confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <RotateCcw className="h-5 w-5 text-[#e87010]" />
                </div>

                <div>
                  <h2 className="font-bold text-[#141414]">
                    Reset Settings?
                  </h2>

                  <p className="text-xs text-gray-500">
                    Restore default interface values
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowResetModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm leading-6 text-gray-600">
                This will restore the settings shown in this UI to their
                default values. Since this is currently preview mode, no
                backend data will be changed.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleReset}
                className="rounded-lg bg-[#e87010] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d8640c]"
              >
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

/* -------------------- Reusable Components -------------------- */

function SettingsHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <Icon className="h-5 w-5 text-[#004890]" />
        </div>

        <div>
          <h2 className="font-semibold text-[#141414]">{title}</h2>

          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  toggle,
  icon: Icon,
}: {
  title: string;
  description: string;
  enabled: boolean;
  toggle: () => void;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
          <Icon className="h-4 w-4 text-gray-500" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#141414]">{title}</p>

          <p className="mt-0.5 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#004890]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
              {label === "Session Timeout" ? " minutes" : ""}
              {label === "Refresh Interval" ? " seconds" : ""}
            </option>
          ))}
        </select>

        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 mt-1 h-4 w-4 rotate-90 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

function DocumentStatus({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-[#004890]" />

        <span className="text-xs font-medium text-gray-700">{title}</span>
      </div>

      <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
        {status}
      </span>
    </div>
  );
}

function AccessItem({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
      <Check className="mx-auto h-4 w-4 text-green-600" />

      <p className="mt-1 text-xs font-medium text-gray-600">{label}</p>
    </div>
  );
}

function InfoBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-400">{title}</p>

      <p className="mt-1 text-sm font-semibold text-[#141414]">{value}</p>
    </div>
  );
}

function DataAction({
  icon: Icon,
  title,
  description,
  button,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Icon className="h-5 w-5 text-[#004890]" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#141414]">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-[#004890] hover:text-[#004890]"
          >
            <Download className="h-3.5 w-3.5" />
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}