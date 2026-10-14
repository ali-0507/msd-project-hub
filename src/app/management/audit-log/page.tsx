
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  ClipboardList,
  ShieldCheck,
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  CalendarDays,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Package,
  FolderKanban,
  Settings,
  UserRound,
  RefreshCw,
} from "lucide-react";

import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";

type AuditStatus = "Success" | "Failed";
type AuditAction =
  | "Login"
  | "Create"
  | "Update"
  | "Delete"
  | "Approval"
  | "Export"
  | "Logout";

type AuditRecord = {
  id: string;
  user: string;
  email: string;
  role: string;
  action: AuditAction;
  module: string;
  description: string;
  date: string;
  time: string;
  status: AuditStatus;
  ipAddress: string;
};

const initialAuditRecords: AuditRecord[] = [
  {
    id: "AUD-001",
    user: "Rahul Sharma",
    email: "rahul.sharma@company.com",
    role: "Admin",
    action: "Login",
    module: "Authentication",
    description: "User signed in to the project workspace.",
    date: "2026-10-14",
    time: "09:15 AM",
    status: "Success",
    ipAddress: "192.168.1.101",
  },
  {
    id: "AUD-002",
    user: "Amit Verma",
    email: "amit.verma@company.com",
    role: "Management",
    action: "Approval",
    module: "Approvals",
    description: "Material request approval action was recorded.",
    date: "2026-10-14",
    time: "09:30 AM",
    status: "Success",
    ipAddress: "192.168.1.102",
  },
  {
    id: "AUD-003",
    user: "Priya Singh",
    email: "priya.singh@company.com",
    role: "Management",
    action: "Update",
    module: "Work Progress",
    description: "Work progress information was updated for a project.",
    date: "2026-10-14",
    time: "10:05 AM",
    status: "Success",
    ipAddress: "192.168.1.103",
  },
  {
    id: "AUD-004",
    user: "Store Manager",
    email: "store@company.com",
    role: "Store Manager",
    action: "Create",
    module: "Material Management",
    description: "A new material inventory record was created.",
    date: "2026-10-13",
    time: "11:20 AM",
    status: "Success",
    ipAddress: "192.168.1.104",
  },
  {
    id: "AUD-005",
    user: "Ankit Patel",
    email: "ankit.patel@company.com",
    role: "Site Engineer",
    action: "Update",
    module: "Installation",
    description: "Installation progress was updated for a site activity.",
    date: "2026-10-13",
    time: "12:40 PM",
    status: "Success",
    ipAddress: "192.168.1.105",
  },
  {
    id: "AUD-006",
    user: "Unknown User",
    email: "unknown@example.com",
    role: "Unverified",
    action: "Login",
    module: "Authentication",
    description: "A login attempt could not be completed.",
    date: "2026-10-13",
    time: "02:15 PM",
    status: "Failed",
    ipAddress: "192.168.1.150",
  },
  {
    id: "AUD-007",
    user: "Rahul Sharma",
    email: "rahul.sharma@company.com",
    role: "Admin",
    action: "Create",
    module: "Projects",
    description: "A new project record was created.",
    date: "2026-10-12",
    time: "10:10 AM",
    status: "Success",
    ipAddress: "192.168.1.101",
  },
  {
    id: "AUD-008",
    user: "Amit Verma",
    email: "amit.verma@company.com",
    role: "Management",
    action: "Export",
    module: "Reports & MIS",
    description: "The report register was exported to CSV.",
    date: "2026-10-12",
    time: "03:45 PM",
    status: "Success",
    ipAddress: "192.168.1.102",
  },
  {
    id: "AUD-009",
    user: "Priya Singh",
    email: "priya.singh@company.com",
    role: "Management",
    action: "Update",
    module: "Documents",
    description: "A project document record was updated.",
    date: "2026-10-11",
    time: "11:35 AM",
    status: "Success",
    ipAddress: "192.168.1.103",
  },
  {
    id: "AUD-010",
    user: "Store Manager",
    email: "store@company.com",
    role: "Store Manager",
    action: "Delete",
    module: "Material Management",
    description: "A material record deletion action was recorded.",
    date: "2026-10-11",
    time: "01:50 PM",
    status: "Failed",
    ipAddress: "192.168.1.104",
  },
  {
    id: "AUD-011",
    user: "Ankit Patel",
    email: "ankit.patel@company.com",
    role: "Site Engineer",
    action: "Update",
    module: "Site Photos",
    description: "Site photo records were updated.",
    date: "2026-10-10",
    time: "09:55 AM",
    status: "Success",
    ipAddress: "192.168.1.105",
  },
  {
    id: "AUD-012",
    user: "Rahul Sharma",
    email: "rahul.sharma@company.com",
    role: "Admin",
    action: "Update",
    module: "Settings",
    description: "A workspace configuration setting was updated.",
    date: "2026-10-10",
    time: "04:20 PM",
    status: "Success",
    ipAddress: "192.168.1.101",
  },
  {
    id: "AUD-013",
    user: "Amit Verma",
    email: "amit.verma@company.com",
    role: "Management",
    action: "Logout",
    module: "Authentication",
    description: "User signed out of the project workspace.",
    date: "2026-10-09",
    time: "05:10 PM",
    status: "Success",
    ipAddress: "192.168.1.102",
  },
  {
    id: "AUD-014",
    user: "Priya Singh",
    email: "priya.singh@company.com",
    role: "Management",
    action: "Approval",
    module: "Approvals",
    description: "A project document approval action was recorded.",
    date: "2026-10-09",
    time: "11:25 AM",
    status: "Failed",
    ipAddress: "192.168.1.103",
  },
  {
    id: "AUD-015",
    user: "Rahul Sharma",
    email: "rahul.sharma@company.com",
    role: "Admin",
    action: "Export",
    module: "Reports & MIS",
    description: "A project performance report was exported.",
    date: "2026-10-08",
    time: "02:30 PM",
    status: "Success",
    ipAddress: "192.168.1.101",
  },
];

const actionOptions = [
  "All Actions",
  "Login",
  "Create",
  "Update",
  "Delete",
  "Approval",
  "Export",
  "Logout",
];

const statusOptions = ["All Statuses", "Success", "Failed"];

const roleOptions = [
  "All Roles",
  "Admin",
  "Management",
  "HR",
  "Store Manager",
  "Site Engineer",
  "Unverified",
];

const moduleOptions = [
  "All Modules",
  "Authentication",
  "Approvals",
  "Work Progress",
  "Material Management",
  "Installation",
  "Projects",
  "Reports & MIS",
  "Documents",
  "Site Photos",
  "Settings",
];

function getActionClasses(action: AuditAction) {
  switch (action) {
    case "Login":
      return "bg-blue-50 text-[#004890]";
    case "Create":
      return "bg-green-50 text-green-700";
    case "Update":
      return "bg-orange-50 text-[#e87010]";
    case "Delete":
      return "bg-red-50 text-red-700";
    case "Approval":
      return "bg-purple-50 text-purple-700";
    case "Export":
      return "bg-indigo-50 text-indigo-700";
    case "Logout":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getModuleIcon(module: string) {
  if (module === "Projects") return FolderKanban;
  if (module === "Material Management") return Package;
  if (module === "Documents") return FileText;
  if (module === "Settings") return Settings;
  if (module === "Authentication") return UserRound;
  return ClipboardList;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ManagementAuditLogPage() {
  const [records] = useState<AuditRecord[]>(initialAuditRecords);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] =
    useState<AuditRecord | null>(null);

  const itemsPerPage = 7;

  const successfulCount = records.filter(
    (record) => record.status === "Success"
  ).length;

  const failedCount = records.filter(
    (record) => record.status === "Failed"
  ).length;

  const activeUsersCount = new Set(
    records
      .filter((record) => record.status === "Success")
      .map((record) => record.email)
  ).size;

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.id.toLowerCase().includes(query) ||
        record.user.toLowerCase().includes(query) ||
        record.email.toLowerCase().includes(query) ||
        record.description.toLowerCase().includes(query) ||
        record.module.toLowerCase().includes(query) ||
        record.ipAddress.toLowerCase().includes(query);

      const matchesAction =
        actionFilter === "All Actions" || record.action === actionFilter;

      const matchesStatus =
        statusFilter === "All Statuses" || record.status === statusFilter;

      const matchesRole =
        roleFilter === "All Roles" || record.role === roleFilter;

      const matchesModule =
        moduleFilter === "All Modules" || record.module === moduleFilter;

      const matchesStartDate = !startDate || record.date >= startDate;
      const matchesEndDate = !endDate || record.date <= endDate;

      return (
        matchesSearch &&
        matchesAction &&
        matchesStatus &&
        matchesRole &&
        matchesModule &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [
    records,
    search,
    actionFilter,
    statusFilter,
    roleFilter,
    moduleFilter,
    startDate,
    endDate,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedRecords = filteredRecords.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  function resetFilters() {
    setSearch("");
    setActionFilter("All Actions");
    setStatusFilter("All Statuses");
    setRoleFilter("All Roles");
    setModuleFilter("All Modules");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  }

  function exportCSV() {
    const headers = [
      "Audit ID",
      "User",
      "Email",
      "Role",
      "Action",
      "Module",
      "Description",
      "Date",
      "Time",
      "Status",
      "IP Address",
    ];

    const rows = filteredRecords.map((record) => [
      record.id,
      record.user,
      record.email,
      record.role,
      record.action,
      record.module,
      record.description,
      record.date,
      record.time,
      record.status,
      record.ipAddress,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "fire-wala-management-audit-log.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <ManagementDashboardShell>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {/* Page header */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} />
                <span>Control & Reporting</span>
                <span>/</span>
                <span className="text-[#004890]">Audit Log</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
                Audit Log
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Review recorded workspace activity, user actions and system
                events for monitoring and accountability.
              </p>
            </div>

            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00376f]"
            >
              <Download size={17} />
              Export audit log
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-[#004890]">
                  <Activity size={22} />
                </div>
                <span className="text-xs text-slate-400">All records</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">Total Events</p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {records.length}
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                Recorded activity entries
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-3 text-green-700">
                  <CheckCircle2 size={22} />
                </div>
                <span className="text-xs text-slate-400">Successful</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">Successful Events</p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {successfulCount}
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                Actions recorded as successful
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                  <XCircle size={22} />
                </div>
                <span className="text-xs text-slate-400">Needs review</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">Failed Events</p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {failedCount}
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                Failed actions in sample records
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-orange-50 p-3 text-[#e87010]">
                  <Users size={22} />
                </div>
                <span className="text-xs text-slate-400">Sample records</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Users with Successful Events
              </p>
              <h2 className="mt-1 text-3xl font-bold text-[#141414]">
                {activeUsersCount}
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                Distinct email addresses
              </p>
            </div>
          </div>

          {/* Audit records */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-lg font-bold text-[#141414]">
                    Activity History
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {filteredRecords.length} record
                    {filteredRecords.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative sm:w-72">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search users, actions, IDs..."
                      aria-label="Search audit records"
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
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-5">
                  <div>
                    <label
                      htmlFor="actionFilter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Action
                    </label>
                    <select
                      id="actionFilter"
                      value={actionFilter}
                      onChange={(event) => {
                        setActionFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {actionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="statusFilter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Status
                    </label>
                    <select
                      id="statusFilter"
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
                    <label
                      htmlFor="roleFilter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      User role
                    </label>
                    <select
                      id="roleFilter"
                      value={roleFilter}
                      onChange={(event) => {
                        setRoleFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="moduleFilter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Module
                    </label>
                    <select
                      id="moduleFilter"
                      value={moduleFilter}
                      onChange={(event) => {
                        setModuleFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    >
                      {moduleOptions.map((option) => (
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

                  <div>
                    <label
                      htmlFor="startDate"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      From date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      max={endDate || undefined}
                      onChange={(event) => {
                        setStartDate(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      To date
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(event) => {
                        setEndDate(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Event</th>
                    <th className="px-5 py-4 font-semibold">User</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                    <th className="px-5 py-4 font-semibold">Module</th>
                    <th className="px-5 py-4 font-semibold">Date & Time</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {paginatedRecords.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-14 text-center text-slate-500"
                      >
                        <ClipboardList
                          size={28}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        <p className="font-semibold text-[#141414]">
                          No audit records found
                        </p>
                        <p className="mt-1 text-sm">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((record) => {
                      const ModuleIcon = getModuleIcon(record.module);

                      return (
                        <tr
                          key={record.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#141414]">
                              {record.id}
                            </p>
                            <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-500">
                              {record.description}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#141414]">
                              {record.user}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {record.role}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1.5 text-xs font-semibold ${getActionClasses(
                                record.action
                              )}`}
                            >
                              {record.action}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-slate-600">
                              <ModuleIcon
                                size={16}
                                className="shrink-0 text-[#004890]"
                              />
                              <span>{record.module}</span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-slate-700">
                              {formatDate(record.date)}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={12} />
                              {record.time}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                                record.status === "Success"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              {record.status === "Success" ? (
                                <CheckCircle2 size={13} />
                              ) : (
                                <XCircle size={13} />
                              )}
                              {record.status}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedRecord(record)}
                              aria-label={`View details for ${record.id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:border-[#004890] hover:bg-blue-50"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-[#141414]">
                  {filteredRecords.length === 0
                    ? 0
                    : (safePage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#141414]">
                  {Math.min(
                    safePage * itemsPerPage,
                    filteredRecords.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#141414]">
                  {filteredRecords.length}
                </span>{" "}
                records
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
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
                  disabled={
                    safePage === totalPages || filteredRecords.length === 0
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Audit detail modal */}
          {selectedRecord && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedRecord(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="audit-detail-title"
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#004890]">
                      Audit event details
                    </p>
                    <h2
                      id="audit-detail-title"
                      className="mt-2 text-xl font-bold text-[#141414]"
                    >
                      {selectedRecord.id}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedRecord.action} · {selectedRecord.module}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRecord(null)}
                    aria-label="Close audit details"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getActionClasses(
                        selectedRecord.action
                      )}`}
                    >
                      {selectedRecord.action}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        selectedRecord.status === "Success"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {selectedRecord.status === "Success" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}
                      {selectedRecord.status}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Activity description
                    </p>
                    <p className="rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      {selectedRecord.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        User
                      </p>
                      <p className="mt-2 font-semibold text-[#141414]">
                        {selectedRecord.user}
                      </p>
                      <p className="mt-1 break-all text-sm text-slate-500">
                        {selectedRecord.email}
                      </p>
                      <p className="mt-2 inline-block rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-[#004890]">
                        {selectedRecord.role}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Event date and time
                      </p>
                      <p className="mt-2 flex items-center gap-2 font-semibold text-[#141414]">
                        <CalendarDays size={16} className="text-[#004890]" />
                        {formatDate(selectedRecord.date)}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={15} />
                        {selectedRecord.time}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Module
                      </p>
                      <p className="mt-2 font-semibold text-[#141414]">
                        {selectedRecord.module}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Action: {selectedRecord.action}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        IP address
                      </p>
                      <p className="mt-2 font-semibold text-[#141414]">
                        {selectedRecord.ipAddress}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Illustrative sample address
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-slate-200 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRecord(null)}
                      className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                    >
                      Close details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Information note */}
          <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div className="rounded-lg bg-white p-2 text-[#e87010]">
              <ShieldCheck size={19} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141414]">
                Audit data and security
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This page currently displays sample records for UI development.
                A production audit log should be generated by the backend,
                record actual user actions and timestamps, and prevent
                unauthorized users from altering or deleting audit entries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ManagementDashboardShell>
  );
}
