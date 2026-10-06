"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  BellRing,
  CalendarDays,
  Check,
  CheckCheck,
  Clock3,
  Download,
  Eye,
  FileText,
  Info,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

type NotificationType =
  | "Alert"
  | "Reminder"
  | "Approval"
  | "System"
  | "Information";

type NotificationStatus = "Unread" | "Read";

type NotificationRecord = {
  id: number;
  notificationNo: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  priority: "Low" | "Medium" | "High" | "Critical";
  project: string;
  location: string;
  recipient: string;
  createdDate: string;
  dueDate: string;
};

const initialNotifications: NotificationRecord[] = [
  {
    id: 1,
    notificationNo: "NTF-001",
    title: "Material Approval Pending",
    message:
      "Material purchase approval for ABC Corporate Tower is waiting for administrative review.",
    type: "Approval",
    status: "Unread",
    priority: "High",
    project: "ABC Corporate Tower",
    location: "Raipur",
    recipient: "Admin User",
    createdDate: "2026-10-05",
    dueDate: "2026-10-06",
  },
  {
    id: 2,
    notificationNo: "NTF-002",
    title: "AMC Renewal Due",
    message:
      "AMC renewal for Sunrise Hospital is approaching its due date.",
    type: "Reminder",
    status: "Unread",
    priority: "Medium",
    project: "Sunrise Hospital",
    location: "Raipur",
    recipient: "Admin User",
    createdDate: "2026-10-04",
    dueDate: "2026-10-10",
  },
  {
    id: 3,
    notificationNo: "NTF-003",
    title: "Inspection Report Submitted",
    message:
      "A new fire extinguisher inspection report has been submitted for review.",
    type: "Information",
    status: "Read",
    priority: "Low",
    project: "City Mall Project",
    location: "Bhilai",
    recipient: "Admin User",
    createdDate: "2026-10-03",
    dueDate: "-",
  },
  {
    id: 4,
    notificationNo: "NTF-004",
    title: "Project Work Delayed",
    message:
      "Installation activity at Green Valley School has been marked as delayed.",
    type: "Alert",
    status: "Unread",
    priority: "Critical",
    project: "Green Valley School",
    location: "Durg",
    recipient: "Admin User",
    createdDate: "2026-10-03",
    dueDate: "2026-10-05",
  },
  {
    id: 5,
    notificationNo: "NTF-005",
    title: "Site Photos Awaiting Review",
    message:
      "New site photos have been uploaded and are waiting for verification.",
    type: "Approval",
    status: "Read",
    priority: "Medium",
    project: "Metro Commercial Complex",
    location: "Raipur",
    recipient: "Admin User",
    createdDate: "2026-10-02",
    dueDate: "2026-10-07",
  },
  {
    id: 6,
    notificationNo: "NTF-006",
    title: "System Maintenance Notice",
    message:
      "Scheduled system maintenance has been planned for the project dashboard.",
    type: "System",
    status: "Read",
    priority: "Low",
    project: "All Projects",
    location: "-",
    recipient: "All Admin Users",
    createdDate: "2026-10-01",
    dueDate: "-",
  },
];

const notificationTypes = [
  "All Types",
  "Alert",
  "Reminder",
  "Approval",
  "System",
  "Information",
];

const notificationStatuses = [
  "All Status",
  "Unread",
  "Read",
];

function CircularProgress({
  value,
  label,
  icon,
  ringColor = "#004890",
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  ringColor?: string;
}) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[88px] w-[88px] shrink-0">
        <svg
          className="h-[88px] w-[88px] -rotate-90"
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="7"
          />

          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-[#141414]">
            {value}%
          </span>
        </div>
      </div>

      <div>
        <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
          {icon}
        </div>

        <p className="text-sm font-semibold text-gray-800">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationRecord[]>(initialNotifications);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] =
    useState<NotificationRecord | null>(null);

  const [editingNotification, setEditingNotification] =
    useState<NotificationRecord | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "Information" as NotificationType,
    status: "Unread" as NotificationStatus,
    priority: "Medium" as
      | "Low"
      | "Medium"
      | "High"
      | "Critical",
    project: "",
    location: "",
    recipient: "",
    createdDate: "",
    dueDate: "",
  });

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        notification.notificationNo
          .toLowerCase()
          .includes(searchText) ||
        notification.title
          .toLowerCase()
          .includes(searchText) ||
        notification.message
          .toLowerCase()
          .includes(searchText) ||
        notification.project
          .toLowerCase()
          .includes(searchText) ||
        notification.recipient
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "All Types" ||
        notification.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        notification.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    notifications,
    search,
    typeFilter,
    statusFilter,
  ]);

  const totalNotifications = notifications.length;

  const unreadNotifications = notifications.filter(
    (notification) => notification.status === "Unread"
  ).length;

  const readNotifications = notifications.filter(
    (notification) => notification.status === "Read"
  ).length;

  const criticalNotifications = notifications.filter(
    (notification) =>
      notification.priority === "Critical"
  ).length;

  const unreadPercentage =
    totalNotifications > 0
      ? Math.round(
          (unreadNotifications / totalNotifications) * 100
        )
      : 0;

  const readPercentage =
    totalNotifications > 0
      ? Math.round(
          (readNotifications / totalNotifications) * 100
        )
      : 0;

  const criticalPercentage =
    totalNotifications > 0
      ? Math.round(
          (criticalNotifications / totalNotifications) * 100
        )
      : 0;

  const resetForm = () => {
    setForm({
      title: "",
      message: "",
      type: "Information",
      status: "Unread",
      priority: "Medium",
      project: "",
      location: "",
      recipient: "",
      createdDate: "",
      dueDate: "",
    });

    setEditingNotification(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (
    notification: NotificationRecord
  ) => {
    setForm({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      status: notification.status,
      priority: notification.priority,
      project: notification.project,
      location: notification.location,
      recipient: notification.recipient,
      createdDate: notification.createdDate,
      dueDate:
        notification.dueDate === "-"
          ? ""
          : notification.dueDate,
    });

    setEditingNotification(notification);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.message ||
      !form.recipient
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingNotification) {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id ===
          editingNotification.id
            ? {
                ...notification,
                ...form,
                dueDate: form.dueDate || "-",
              }
            : notification
        )
      );
    } else {
      const nextId =
        notifications.length > 0
          ? Math.max(
              ...notifications.map(
                (notification) => notification.id
              )
            ) + 1
          : 1;

      const newNotification: NotificationRecord = {
        id: nextId,
        notificationNo: `NTF-${String(
          nextId
        ).padStart(3, "0")}`,
        ...form,
        dueDate: form.dueDate || "-",
      };

      setNotifications((current) => [
        newNotification,
        ...current,
      ]);
    }

    setShowForm(false);
    resetForm();
  };

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "Read",
            }
          : notification
      )
    );

    setShowView((current) =>
      current?.id === id
        ? {
            ...current,
            status: "Read",
          }
        : current
    );
  };

  const markAsUnread = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "Unread",
            }
          : notification
      )
    );

    setShowView((current) =>
      current?.id === id
        ? {
            ...current,
            status: "Unread",
          }
        : current
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        status: "Read",
      }))
    );
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== deleteId
      )
    );

    setDeleteId(null);
  };

  const exportCSV = () => {
    const headers = [
      "Notification No",
      "Title",
      "Message",
      "Type",
      "Status",
      "Priority",
      "Project",
      "Location",
      "Recipient",
      "Created Date",
      "Due Date",
    ];

    const rows = filteredNotifications.map(
      (notification) => [
        notification.notificationNo,
        notification.title,
        notification.message,
        notification.type,
        notification.status,
        notification.priority,
        notification.project,
        notification.location,
        notification.recipient,
        notification.createdDate,
        notification.dueDate,
      ]
    );

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "notifications.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getTypeStyle = (
    type: NotificationType
  ) => {
    switch (type) {
      case "Alert":
        return "bg-red-100 text-red-700";
      case "Reminder":
        return "bg-orange-100 text-orange-700";
      case "Approval":
        return "bg-blue-100 text-blue-700";
      case "System":
        return "bg-purple-100 text-purple-700";
      case "Information":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (
    status: NotificationStatus
  ) => {
    return status === "Unread"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-600";
  };

  const getPriorityStyle = (
    priority: NotificationRecord["priority"]
  ) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (
    type: NotificationType
  ) => {
    switch (type) {
      case "Alert":
        return <AlertCircle size={18} />;
      case "Reminder":
        return <Clock3 size={18} />;
      case "Approval":
        return <CheckCheck size={18} />;
      case "System":
        return <Bell size={18} />;
      case "Information":
        return <Info size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#141414]">
              Alerts & Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor important alerts, reminders, approvals
              and system notifications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadNotifications === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck size={17} />
              Mark All Read
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Download size={17} />
              Export CSV
            </button>

            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b78]"
            >
              <Plus size={17} />
              New Notification
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <BellRing
            size={19}
            className="mt-0.5 shrink-0 text-[#004890]"
          />

          <div>
            <p className="text-sm font-semibold text-[#004890]">
              Notification center preview
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              Notifications currently use local sample data.
              Real-time alerts, email, WhatsApp and role-based
              notifications will be connected later.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={100}
              label={`Total (${totalNotifications})`}
              icon={<Bell size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={unreadPercentage}
              label={`Unread (${unreadNotifications})`}
              icon={<BellRing size={16} />}
              ringColor="#e87010"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={readPercentage}
              label={`Read (${readNotifications})`}
              icon={<CheckCheck size={16} />}
              ringColor="#16a34a"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={criticalPercentage}
              label={`Critical (${criticalNotifications})`}
              icon={<AlertCircle size={16} />}
              ringColor="#dc2626"
            />
          </div>
        </div>

        {/* Unread Alert */}
        {unreadNotifications > 0 && (
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#e87010]">
                <BellRing size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-orange-800">
                  You have {unreadNotifications} unread
                  notification
                  {unreadNotifications !== 1
                    ? "s"
                    : ""}
                </p>

                <p className="mt-1 text-xs text-orange-700">
                  Review important alerts and pending actions
                  from the notification register.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStatusFilter("Unread")}
              className="rounded-lg bg-[#e87010] px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
            >
              View Unread
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search notification, project, recipient..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#004890] focus:bg-white"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {notificationTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {notificationStatuses.map(
                (status) => (
                  <option key={status}>{status}</option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Notification Register */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Notification Register
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {filteredNotifications.length} notification
                {filteredNotifications.length !== 1
                  ? "s"
                  : ""}{" "}
                displayed
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Bell size={15} />
              Admin notification center
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-semibold">
                    Notification
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Project
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Type
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Priority
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Recipient
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Date
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredNotifications.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center"
                    >
                      <Bell
                        size={35}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-medium text-gray-600">
                        No notifications found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or
                        filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredNotifications.map(
                    (notification) => (
                      <tr
                        key={notification.id}
                        className={`border-b border-gray-100 transition hover:bg-gray-50 ${
                          notification.status ===
                          "Unread"
                            ? "bg-blue-50/30"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                notification.type ===
                                "Alert"
                                  ? "bg-red-50 text-red-600"
                                  : notification.type ===
                                    "Reminder"
                                  ? "bg-orange-50 text-[#e87010]"
                                  : "bg-blue-50 text-[#004890]"
                              }`}
                            >
                              {getTypeIcon(
                                notification.type
                              )}
                            </div>

                            <div className="max-w-[300px]">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`font-semibold ${
                                    notification.status ===
                                    "Unread"
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                </p>

                                {notification.status ===
                                  "Unread" && (
                                  <span className="h-2 w-2 rounded-full bg-[#e87010]" />
                                )}
                              </div>

                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">
                                {
                                  notification.message
                                }
                              </p>

                              <p className="mt-1 text-[11px] text-gray-400">
                                {
                                  notification.notificationNo
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-700">
                            {
                              notification.project
                            }
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                            <MapPin size={12} />
                            {
                              notification.location
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeStyle(
                              notification.type
                            )}`}
                          >
                            {notification.type}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                              notification.priority
                            )}`}
                          >
                            {
                              notification.priority
                            }
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#e87010]">
                              <UserRound
                                size={14}
                              />
                            </div>

                            <span className="text-sm text-gray-600">
                              {
                                notification.recipient
                              }
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <CalendarDays
                              size={14}
                            />
                            {
                              notification.createdDate
                            }
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                              notification.status
                            )}`}
                          >
                            {
                              notification.status
                            }
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1">
                            {notification.status ===
                            "Unread" ? (
                              <button
                                onClick={() =>
                                  markAsRead(
                                    notification.id
                                  )
                                }
                                title="Mark as read"
                                className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                              >
                                <Check
                                  size={17}
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  markAsUnread(
                                    notification.id
                                  )
                                }
                                title="Mark as unread"
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                              >
                                <Bell
                                  size={17}
                                />
                              </button>
                            )}

                            <button
                              onClick={() =>
                                setShowView(
                                  notification
                                )
                              }
                              title="View"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-[#004890]"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              onClick={() =>
                                openEditForm(
                                  notification
                                )
                              }
                              title="Edit"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-[#e87010]"
                            >
                              <Pencil
                                size={17}
                              />
                            </button>

                            <button
                              onClick={() =>
                                setDeleteId(
                                  notification.id
                                )
                              }
                              title="Delete"
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2
                                size={17}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notification Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-semibold text-[#141414]">
              Notification Summary
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Current notification distribution by category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {(
              [
                "Alert",
                "Reminder",
                "Approval",
                "System",
                "Information",
              ] as NotificationType[]
            ).map((type) => {
              const count =
                notifications.filter(
                  (notification) =>
                    notification.type === type
                ).length;

              return (
                <div
                  key={type}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#004890] shadow-sm">
                      {getTypeIcon(type)}
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {type}
                      </p>

                      <p className="mt-1 text-xl font-bold text-gray-800">
                        {count}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  {editingNotification
                    ? "Edit Notification"
                    : "New Notification"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Create or update an alert for the notification
                  center.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Notification Title *
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter notification title"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Notification Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as NotificationType,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    {notificationTypes
                      .filter(
                        (type) =>
                          type !== "All Types"
                      )
                      .map((type) => (
                        <option key={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority:
                          e.target.value as
                            | "Low"
                            | "Medium"
                            | "High"
                            | "Critical",
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status:
                          e.target.value as NotificationStatus,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option>Unread</option>
                    <option>Read</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Recipient *
                  </label>

                  <input
                    type="text"
                    value={form.recipient}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        recipient: e.target.value,
                      })
                    }
                    placeholder="Employee / Admin / Team"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Project
                  </label>

                  <input
                    type="text"
                    value={form.project}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        project: e.target.value,
                      })
                    }
                    placeholder="Project name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Location
                  </label>

                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                    placeholder="Project location"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Created Date
                  </label>

                  <input
                    type="date"
                    value={form.createdDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        createdDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Message *
                  </label>

                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Enter notification message..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                >
                  {editingNotification
                    ? "Update Notification"
                    : "Create Notification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  Notification Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {showView.notificationNo}
                </p>
              </div>

              <button
                onClick={() => setShowView(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#004890]">
                  {getTypeIcon(showView.type)}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {showView.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {showView.type} notification for{" "}
                    {showView.recipient}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeStyle(
                        showView.type
                      )}`}
                    >
                      {showView.type}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                        showView.priority
                      )}`}
                    >
                      {showView.priority}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                        showView.status
                      )}`}
                    >
                      {showView.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Message
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {showView.message}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-400">
                    Project
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.project || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.location || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Recipient
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.recipient}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Created Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.createdDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.dueDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
                {showView.status === "Unread" ? (
                  <button
                    onClick={() =>
                      markAsRead(showView.id)
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Check size={16} />
                    Mark as Read
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      markAsUnread(showView.id)
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <Bell size={16} />
                    Mark as Unread
                  </button>
                )}

                <button
                  onClick={() => setShowView(null)}
                  className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold text-gray-800">
              Delete Notification?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              This notification will be removed from the local
              notification register.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}