
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  X,
  CalendarDays,
  MapPin,
  FolderKanban,
  Package,
  FileText,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MailOpen,
} from "lucide-react";

import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";

type NotificationType =
  | "Project"
  | "Material"
  | "Installation"
  | "Document"
  | "System";

type NotificationPriority = "High" | "Medium" | "Low";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  date: string;
  time: string;
  location: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-001",
    title: "Material approval required",
    message:
      "A material request for fire extinguishers is waiting for management approval.",
    type: "Material",
    priority: "High",
    date: "2026-10-14",
    time: "09:30 AM",
    location: "Raipur, Chhattisgarh",
    read: false,
  },
  {
    id: "NTF-002",
    title: "Project deadline approaching",
    message:
      "The fire safety installation project is approaching its scheduled completion date.",
    type: "Project",
    priority: "High",
    date: "2026-10-14",
    time: "09:00 AM",
    location: "Industrial Area, Raipur",
    read: false,
  },
  {
    id: "NTF-003",
    title: "Installation progress updated",
    message:
      "The site team has updated the installation progress for the warehouse project.",
    type: "Installation",
    priority: "Medium",
    date: "2026-10-13",
    time: "04:15 PM",
    location: "Bhilai, Chhattisgarh",
    read: false,
  },
  {
    id: "NTF-004",
    title: "Document submitted for review",
    message:
      "A site inspection report has been submitted and is ready for review.",
    type: "Document",
    priority: "Medium",
    date: "2026-10-13",
    time: "02:20 PM",
    location: "Durg, Chhattisgarh",
    read: true,
  },
  {
    id: "NTF-005",
    title: "Pending work requires attention",
    message:
      "There are pending activities at a project site that may affect the delivery schedule.",
    type: "Project",
    priority: "High",
    date: "2026-10-12",
    time: "11:45 AM",
    location: "Raipur, Chhattisgarh",
    read: false,
  },
  {
    id: "NTF-006",
    title: "Material stock running low",
    message:
      "The available stock of selected fire safety materials is below the preferred quantity.",
    type: "Material",
    priority: "Medium",
    date: "2026-10-12",
    time: "10:10 AM",
    location: "Central Store",
    read: true,
  },
  {
    id: "NTF-007",
    title: "Weekly report available",
    message:
      "The weekly work progress report is ready for management review.",
    type: "System",
    priority: "Low",
    date: "2026-10-11",
    time: "05:00 PM",
    location: "All Projects",
    read: true,
  },
  {
    id: "NTF-008",
    title: "Installation inspection scheduled",
    message:
      "A site inspection has been scheduled. Please review the activity and assigned team.",
    type: "Installation",
    priority: "Medium",
    date: "2026-10-11",
    time: "12:30 PM",
    location: "Bilaspur, Chhattisgarh",
    read: false,
  },
  {
    id: "NTF-009",
    title: "Project document updated",
    message:
      "A project-related document record has been updated by the project team.",
    type: "Document",
    priority: "Low",
    date: "2026-10-10",
    time: "03:40 PM",
    location: "Raipur, Chhattisgarh",
    read: true,
  },
  {
    id: "NTF-010",
    title: "Pending approval reminder",
    message:
      "One or more requests remain pending. Review them to avoid delays in project execution.",
    type: "System",
    priority: "High",
    date: "2026-10-10",
    time: "10:00 AM",
    location: "All Projects",
    read: false,
  },
  {
    id: "NTF-011",
    title: "Work progress recorded",
    message:
      "The site engineer has submitted a new work progress update for the current project.",
    type: "Project",
    priority: "Low",
    date: "2026-10-09",
    time: "01:25 PM",
    location: "Bhilai, Chhattisgarh",
    read: true,
  },
  {
    id: "NTF-012",
    title: "Inspection report pending",
    message:
      "An inspection report is still pending submission for a recently completed activity.",
    type: "Document",
    priority: "Medium",
    date: "2026-10-08",
    time: "11:00 AM",
    location: "Durg, Chhattisgarh",
    read: false,
  },
];

const typeOptions = [
  "All Types",
  "Project",
  "Material",
  "Installation",
  "Document",
  "System",
];

const statusOptions = ["All Status", "Unread", "Read"];

const priorityOptions = ["All Priorities", "High", "Medium", "Low"];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function getTypeIcon(type: NotificationType) {
  switch (type) {
    case "Project":
      return FolderKanban;
    case "Material":
      return Package;
    case "Installation":
      return Wrench;
    case "Document":
      return FileText;
    default:
      return Bell;
  }
}

function getPriorityClasses(priority: NotificationPriority) {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700 border-red-200";
    case "Medium":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
}

export default function ManagementNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");

  const itemsPerPage = 6;

  const unreadCount = notifications.filter((item) => !item.read).length;
  const highPriorityCount = notifications.filter(
    (item) => item.priority === "High" && !item.read
  ).length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = notifications.filter(
    (item) => item.date === today
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All Types" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Unread" && !item.read) ||
        (statusFilter === "Read" && item.read);

      const matchesPriority =
        priorityFilter === "All Priorities" ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    notifications,
    searchTerm,
    typeFilter,
    statusFilter,
    priorityFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedNotifications = filteredNotifications.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  function updateNotificationStatus(id: string, read: boolean) {
    setNotifications((previous) =>
      previous.map((item) => (item.id === id ? { ...item, read } : item))
    );

    setSelectedNotification((previous) =>
      previous?.id === id ? { ...previous, read } : previous
    );

    setNotice(read ? "Notification marked as read." : "Notification marked as unread.");
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
    setSelectedNotification((previous) =>
      previous ? { ...previous, read: true } : previous
    );
    setNotice("All notifications marked as read.");
  }

  function deleteNotification(id: string) {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
    setSelectedNotification((previous) =>
      previous?.id === id ? null : previous
    );
    setNotice("Notification deleted.");
  }

  function exportCSV() {
    const headers = [
      "Notification ID",
      "Title",
      "Message",
      "Type",
      "Priority",
      "Date",
      "Time",
      "Location",
      "Status",
    ];

    const rows = filteredNotifications.map((item) => [
      item.id,
      item.title,
      item.message,
      item.type,
      item.priority,
      item.date,
      item.time,
      item.location,
      item.read ? "Read" : "Unread",
    ]);

    const csvCell = (value: string) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "management-notifications.csv";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Notifications exported successfully.");
  }

  function resetFilters() {
    setSearchTerm("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    setPriorityFilter("All Priorities");
    setCurrentPage(1);
  }

  return (
    <ManagementDashboardShell>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {/* Page heading */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <BellRing size={16} />
                <span>Control & Reporting</span>
                <span>/</span>
                <span className="text-[#004890]">Alerts & Notifications</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
                Alerts & Notifications
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Review project updates, pending actions and important alerts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCheck size={17} />
                Mark all read
              </button>

              <button
                type="button"
                onClick={exportCSV}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00376f]"
              >
                <Download size={17} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Feedback message */}
          {notice && (
            <div
              role="status"
              className="flex items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-[#004890]"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-[#004890]">
                  <Bell size={22} />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  All records
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Total Notifications
              </p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {notifications.length}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-orange-50 p-3 text-[#e87010]">
                  <MailOpen size={22} />
                </div>
                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-[#e87010]">
                  Action needed
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Unread Notifications
              </p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {unreadCount}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                  <AlertTriangle size={22} />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  Unread only
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                High-Priority Alerts
              </p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {highPriorityCount}
              </h2>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <CalendarDays size={22} />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  Current day
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Notifications Today
              </p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {todayCount}
              </h2>
            </div>
          </div>

          {/* Notification list */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-lg font-bold text-[#141414]">
                    Notification Centre
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {filteredNotifications.length} notification
                    {filteredNotifications.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 sm:w-72">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search notifications..."
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFilters((value) => !value)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                      showFilters
                        ? "border-[#004890] bg-blue-50 text-[#004890]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Filter size={17} />
                    Filters
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Notification type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(event) => {
                        setTypeFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {typeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Read status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Priority
                    </label>
                    <select
                      value={priorityFilter}
                      onChange={(event) => {
                        setPriorityFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* List items */}
            <div className="divide-y divide-slate-100">
              {paginatedNotifications.length === 0 ? (
                <div className="px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Bell size={25} />
                  </div>
                  <h3 className="mt-4 font-semibold text-[#141414]">
                    No notifications found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filter settings.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 text-sm font-semibold text-[#004890] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                paginatedNotifications.map((item) => {
                  const TypeIcon = getTypeIcon(item.type);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 transition hover:bg-slate-50 sm:p-5 ${
                        !item.read ? "bg-blue-50/30" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            item.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : item.type === "Material"
                                ? "bg-orange-50 text-[#e87010]"
                                : "bg-blue-50 text-[#004890]"
                          }`}
                        >
                          <TypeIcon size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3
                                  className={`text-sm text-[#141414] sm:text-base ${
                                    item.read
                                      ? "font-semibold"
                                      : "font-bold"
                                  }`}
                                >
                                  {item.title}
                                </h3>

                                {!item.read && (
                                  <span className="h-2 w-2 rounded-full bg-[#e87010]" />
                                )}
                              </div>

                              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                                {item.message}
                              </p>
                            </div>

                            <span
                              className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClasses(
                                item.priority
                              )}`}
                            >
                              {item.priority} priority
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={14} />
                              {formatDate(item.date)} · {item.time}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={14} />
                              {item.location}
                            </span>

                            <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">
                              {item.type}
                            </span>

                            <span className="text-slate-400">
                              {item.id}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedNotification(item);
                                if (!item.read) {
                                  updateNotificationStatus(item.id, true);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#004890] hover:text-[#004890]"
                            >
                              <Info size={14} />
                              View details
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateNotificationStatus(item.id, !item.read)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                              {item.read ? (
                                <>
                                  <MailOpen size={14} />
                                  Mark unread
                                </>
                              ) : (
                                <>
                                  <Check size={14} />
                                  Mark as read
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteNotification(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-[#141414]">
                  {filteredNotifications.length === 0
                    ? 0
                    : (safePage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#141414]">
                  {Math.min(safePage * itemsPerPage, filteredNotifications.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#141414]">
                  {filteredNotifications.length}
                </span>{" "}
                notifications
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="rounded-lg bg-[#004890] px-3.5 py-2 text-sm font-semibold text-white">
                  {safePage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={safePage === totalPages || filteredNotifications.length === 0}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Detail modal */}
          {selectedNotification && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedNotification(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="notification-detail-title"
                className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#004890]">
                      Notification details
                    </p>
                    <h2
                      id="notification-detail-title"
                      className="mt-2 text-xl font-bold text-[#141414]"
                    >
                      {selectedNotification.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedNotification.id}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedNotification(null)}
                    aria-label="Close details"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                        selectedNotification.priority
                      )}`}
                    >
                      {selectedNotification.priority} priority
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#004890]">
                      {selectedNotification.type}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedNotification.read
                          ? "bg-slate-100 text-slate-600"
                          : "bg-orange-50 text-[#e87010]"
                      }`}
                    >
                      {selectedNotification.read ? "Read" : "Unread"}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Message
                    </p>
                    <p className="rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      {selectedNotification.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Date and time
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#141414]">
                        <CalendarDays size={16} className="text-[#004890]" />
                        {formatDate(selectedNotification.date)}
                      </p>
                      <p className="mt-1 pl-6 text-sm text-slate-600">
                        {selectedNotification.time}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Related location
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#141414]">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-[#004890]"
                        />
                        {selectedNotification.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        deleteNotification(selectedNotification.id)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete notification
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateNotificationStatus(
                          selectedNotification.id,
                          !selectedNotification.read
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                    >
                      <CheckCircle2 size={16} />
                      {selectedNotification.read
                        ? "Mark as unread"
                        : "Mark as read"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ManagementDashboardShell>
  );
}
