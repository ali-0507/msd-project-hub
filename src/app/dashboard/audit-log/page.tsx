"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";
import {
  Activity,
  AlertCircle,
  ArrowDownToLine,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  History,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  X,
  XCircle,
} from "lucide-react";

type AuditAction =
  | "Created"
  | "Updated"
  | "Approved"
  | "Rejected"
  | "Deleted"
  | "Uploaded"
  | "Login"
  | "Exported";

type AuditStatus = "Success" | "Warning" | "Failed";

interface AuditLog {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  user: string;
  role: string;
  action: AuditAction;
  module: string;
  project: string;
  description: string;
  status: AuditStatus;
  reference: string;
}

const initialAuditLogs: AuditLog[] = [
  {
    id: "AUD-1001",
    timestamp: "2026-10-05 17:42",
    date: "2026-10-05",
    time: "05:42 PM",
    user: "Admin User",
    role: "Administrator",
    action: "Updated",
    module: "Project Management",
    project: "Raipur Mall Fire Safety",
    description: "Updated project progress from 68% to 74%.",
    status: "Success",
    reference: "PRJ-001",
  },
  {
    id: "AUD-1002",
    timestamp: "2026-10-05 16:58",
    date: "2026-10-05",
    time: "04:58 PM",
    user: "Rahul Sharma",
    role: "Project Manager",
    action: "Approved",
    module: "Material Management",
    project: "Raipur Mall Fire Safety",
    description: "Approved material request for fire extinguishers.",
    status: "Success",
    reference: "MAT-024",
  },
  {
    id: "AUD-1003",
    timestamp: "2026-10-05 15:35",
    date: "2026-10-05",
    time: "03:35 PM",
    user: "Priya Singh",
    role: "Site Engineer",
    action: "Uploaded",
    module: "Site Photos",
    project: "Industrial Plant Phase 2",
    description: "Uploaded 12 new site inspection photographs.",
    status: "Success",
    reference: "PHOTO-089",
  },
  {
    id: "AUD-1004",
    timestamp: "2026-10-05 14:20",
    date: "2026-10-05",
    time: "02:20 PM",
    user: "Admin User",
    role: "Administrator",
    action: "Approved",
    module: "Approvals",
    project: "Hotel Fire Protection",
    description: "Approved installation completion request.",
    status: "Success",
    reference: "APR-018",
  },
  {
    id: "AUD-1005",
    timestamp: "2026-10-05 12:45",
    date: "2026-10-05",
    time: "12:45 PM",
    user: "Amit Verma",
    role: "Store Manager",
    action: "Created",
    module: "Material Challans",
    project: "Warehouse Fire Safety",
    description: "Created material challan for site dispatch.",
    status: "Success",
    reference: "CHL-042",
  },
  {
    id: "AUD-1006",
    timestamp: "2026-10-05 11:32",
    date: "2026-10-05",
    time: "11:32 AM",
    user: "Admin User",
    role: "Administrator",
    action: "Exported",
    module: "Reports & MIS",
    project: "All Projects",
    description: "Exported monthly project MIS report.",
    status: "Success",
    reference: "RPT-006",
  },
  {
    id: "AUD-1007",
    timestamp: "2026-10-05 10:18",
    date: "2026-10-05",
    time: "10:18 AM",
    user: "Vikash Kumar",
    role: "Site Engineer",
    action: "Updated",
    module: "Work Progress",
    project: "Industrial Plant Phase 2",
    description: "Updated installation work status to In Progress.",
    status: "Success",
    reference: "WRK-031",
  },
  {
    id: "AUD-1008",
    timestamp: "2026-10-05 09:44",
    date: "2026-10-05",
    time: "09:44 AM",
    user: "Neha Patel",
    role: "HR",
    action: "Login",
    module: "Authentication",
    project: "System",
    description: "User successfully logged into the management portal.",
    status: "Success",
    reference: "USR-012",
  },
  {
    id: "AUD-1009",
    timestamp: "2026-10-04 18:10",
    date: "2026-10-04",
    time: "06:10 PM",
    user: "Admin User",
    role: "Administrator",
    action: "Deleted",
    module: "Documents",
    project: "Corporate Office Fire Safety",
    description: "Deleted an outdated project document.",
    status: "Warning",
    reference: "DOC-056",
  },
  {
    id: "AUD-1010",
    timestamp: "2026-10-04 16:52",
    date: "2026-10-04",
    time: "04:52 PM",
    user: "Rahul Sharma",
    role: "Project Manager",
    action: "Rejected",
    module: "Approvals",
    project: "Warehouse Fire Safety",
    description: "Rejected material approval due to incorrect quantity.",
    status: "Warning",
    reference: "APR-017",
  },
  {
    id: "AUD-1011",
    timestamp: "2026-10-04 14:38",
    date: "2026-10-04",
    time: "02:38 PM",
    user: "Amit Verma",
    role: "Store Manager",
    action: "Updated",
    module: "Material Management",
    project: "Warehouse Fire Safety",
    description: "Updated material stock quantity.",
    status: "Success",
    reference: "MAT-019",
  },
  {
    id: "AUD-1012",
    timestamp: "2026-10-04 11:15",
    date: "2026-10-04",
    time: "11:15 AM",
    user: "System",
    role: "System",
    action: "Rejected",
    module: "Authentication",
    project: "System",
    description: "Failed login attempt detected.",
    status: "Failed",
    reference: "AUTH-032",
  },
  {
    id: "AUD-1013",
    timestamp: "2026-10-03 17:20",
    date: "2026-10-03",
    time: "05:20 PM",
    user: "Priya Singh",
    role: "Site Engineer",
    action: "Created",
    module: "Installation Entry",
    project: "Hotel Fire Protection",
    description: "Created a new installation entry.",
    status: "Success",
    reference: "INS-045",
  },
  {
    id: "AUD-1014",
    timestamp: "2026-10-03 13:05",
    date: "2026-10-03",
    time: "01:05 PM",
    user: "Admin User",
    role: "Administrator",
    action: "Updated",
    module: "Team Management",
    project: "All Projects",
    description: "Updated team member assignment.",
    status: "Success",
    reference: "TEAM-014",
  },
];

function CircularProgress({
  value,
  label,
  icon: Icon,
  iconClass = "text-[#004890]",
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  iconClass?: string;
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
            stroke="#e5e7eb"
            strokeWidth="7"
            fill="none"
          />

          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#004890"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18px] font-bold text-[#141414]">
            {value}%
          </span>
        </div>
      </div>

      <div>
        <div className="mb-1">
          <Icon className={`h-4 w-4 ${iconClass}`} />
        </div>

        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function AuditLogPage() {
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);

  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const today = "2026-10-05";

  const totalActivities = auditLogs.length;

  const todayActivities = auditLogs.filter(
    (log) => log.date === today
  ).length;

  const updateActivities = auditLogs.filter(
    (log) =>
      log.action === "Updated" ||
      log.action === "Created" ||
      log.action === "Uploaded"
  ).length;

  const criticalActivities = auditLogs.filter(
    (log) =>
      log.status === "Failed" ||
      log.action === "Deleted" ||
      log.action === "Rejected"
  ).length;

  const todayPercentage =
    totalActivities > 0
      ? Math.round((todayActivities / totalActivities) * 100)
      : 0;

  const updatePercentage =
    totalActivities > 0
      ? Math.round((updateActivities / totalActivities) * 100)
      : 0;

  const criticalPercentage =
    totalActivities > 0
      ? Math.round((criticalActivities / totalActivities) * 100)
      : 0;

  const modules = useMemo(() => {
    return ["All", ...Array.from(new Set(auditLogs.map((log) => log.module)))];
  }, [auditLogs]);

  const actions = useMemo(() => {
    return ["All", ...Array.from(new Set(auditLogs.map((log) => log.action)))];
  }, [auditLogs]);

  const statuses = ["All", "Success", "Warning", "Failed"];

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesModule =
        moduleFilter === "All" || log.module === moduleFilter;

      const matchesAction =
        actionFilter === "All" || log.action === actionFilter;

      const matchesStatus =
        statusFilter === "All" || log.status === statusFilter;

      const matchesDate = !dateFilter || log.date === dateFilter;

      return (
        matchesSearch &&
        matchesModule &&
        matchesAction &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    auditLogs,
    searchTerm,
    moduleFilter,
    actionFilter,
    statusFilter,
    dateFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setModuleFilter("All");
    setActionFilter("All");
    setStatusFilter("All");
    setDateFilter("");
  };

  const exportCSV = () => {
    const headers = [
      "Log ID",
      "Timestamp",
      "User",
      "Role",
      "Action",
      "Module",
      "Project",
      "Description",
      "Status",
      "Reference",
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      log.timestamp,
      log.user,
      log.role,
      log.action,
      log.module,
      log.project,
      log.description,
      log.status,
      log.reference,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "audit-log.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getActionIcon = (action: AuditAction) => {
    switch (action) {
      case "Created":
        return <FileText className="h-4 w-4" />;
      case "Updated":
        return <RefreshCw className="h-4 w-4" />;
      case "Approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      case "Deleted":
        return <Trash2 className="h-4 w-4" />;
      case "Uploaded":
        return <Upload className="h-4 w-4" />;
      case "Login":
        return <ShieldCheck className="h-4 w-4" />;
      case "Exported":
        return <ArrowDownToLine className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActionStyle = (action: AuditAction) => {
    switch (action) {
      case "Created":
        return "bg-blue-50 text-[#004890]";
      case "Updated":
        return "bg-indigo-50 text-indigo-700";
      case "Approved":
        return "bg-green-50 text-green-700";
      case "Rejected":
        return "bg-orange-50 text-orange-700";
      case "Deleted":
        return "bg-red-50 text-red-700";
      case "Uploaded":
        return "bg-purple-50 text-purple-700";
      case "Login":
        return "bg-cyan-50 text-cyan-700";
      case "Exported":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (status: AuditStatus) => {
    switch (status) {
      case "Success":
        return "bg-green-50 text-green-700 border-green-200";
      case "Warning":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004890] text-white">
                <History className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#141414]">
                  Audit Log
                </h1>

                <p className="text-sm text-gray-500">
                  Track and review important activities across the management
                  system.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b78]"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Preview Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#e87010]" />

          <div>
            <p className="text-sm font-semibold text-[#141414]">
              UI Preview Mode
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Audit activities shown here are sample records stored locally
              for interface development. Later, this section can be connected
              to the backend audit service for live activity tracking.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <CircularProgress
              value={100}
              label="Total Activities"
              icon={Activity}
            />

            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-2xl font-bold text-[#141414]">
                {totalActivities}
              </p>

              <p className="text-xs text-gray-500">
                Recorded activities
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <CircularProgress
              value={todayPercentage}
              label="Today's Activities"
              icon={Calendar}
            />

            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-2xl font-bold text-[#141414]">
                {todayActivities}
              </p>

              <p className="text-xs text-gray-500">
                Activities today
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <CircularProgress
              value={updatePercentage}
              label="Updates & Changes"
              icon={RefreshCw}
            />

            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-2xl font-bold text-[#141414]">
                {updateActivities}
              </p>

              <p className="text-xs text-gray-500">
                Create, update & upload
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <CircularProgress
              value={criticalPercentage}
              label="Critical Activities"
              icon={AlertCircle}
              iconClass="text-[#e87010]"
            />

            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-2xl font-bold text-[#141414]">
                {criticalActivities}
              </p>

              <p className="text-xs text-gray-500">
                Failed, rejected or deleted
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#004890]" />

              <h2 className="font-semibold text-[#141414]">
                Activity Filters
              </h2>
            </div>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#004890]"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            {/* Search */}
            <div className="relative xl:col-span-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activity..."
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10"
              />
            </div>

            {/* Module */}
            <div className="relative">
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm outline-none focus:border-[#004890]"
              >
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module === "All" ? "All Modules" : module}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Action */}
            <div className="relative">
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm outline-none focus:border-[#004890]"
              >
                {actions.map((action) => (
                  <option key={action} value={action}>
                    {action === "All" ? "All Actions" : action}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm outline-none focus:border-[#004890]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Date */}
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#004890]"
              />
            </div>
          </div>
        </div>

        {/* Activity Register */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Audit Activity Register
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Showing {filteredLogs.length} of {auditLogs.length} activities
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
              <Clock3 className="h-4 w-4" />
              Latest activities first
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Activity
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Module
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Project
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      <History className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                      <p className="font-medium text-gray-600">
                        No audit activities found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your filters or search term.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${getActionStyle(
                              log.action
                            )}`}
                          >
                            {getActionIcon(log.action)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#141414]">
                              {log.action}
                            </p>

                            <p className="text-xs text-gray-400">
                              {log.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {log.user}
                            </p>

                            <p className="text-xs text-gray-400">
                              {log.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#004890]">
                          {log.module}
                        </span>
                      </td>

                      <td className="max-w-[190px] px-5 py-4">
                        <p className="truncate text-sm font-medium text-gray-700">
                          {log.project}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {log.reference}
                        </p>
                      </td>

                      <td className="max-w-[300px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {log.description}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {log.date} • {log.time}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            log.status
                          )}`}
                        >
                          {log.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-[#004890] hover:bg-blue-50 hover:text-[#004890]"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#004890]" />

            <div>
              <h2 className="font-semibold text-[#141414]">
                Recent Activity Timeline
              </h2>

              <p className="text-xs text-gray-500">
                Latest system activities
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {auditLogs.slice(0, 5).map((log, index) => (
              <div key={log.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${getActionStyle(
                      log.action
                    )}`}
                  >
                    {getActionIcon(log.action)}
                  </div>

                  {index !== 4 && (
                    <div className="mt-2 h-full min-h-[28px] w-px bg-gray-200" />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-[#141414]">
                      {log.user}{" "}
                      <span className="font-normal text-gray-500">
                        {log.action.toLowerCase()}
                      </span>{" "}
                      {log.module.toLowerCase()}
                    </p>

                    <span className="text-xs text-gray-400">
                      {log.date} • {log.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {log.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
                      {log.reference}
                    </span>

                    <span
                      className={`rounded-md px-2 py-1 text-[11px] font-medium ${getActionStyle(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${getActionStyle(
                    selectedLog.action
                  )}`}
                >
                  {getActionIcon(selectedLog.action)}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#141414]">
                    Activity Details
                  </h2>

                  <p className="text-xs text-gray-500">
                    {selectedLog.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-gray-500">Activity</p>

                  <p className="mt-1 text-lg font-bold text-[#141414]">
                    {selectedLog.action}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                    selectedLog.status
                  )}`}
                >
                  {selectedLog.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Timestamp
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-gray-400" />

                    <p className="text-sm font-medium text-gray-700">
                      {selectedLog.timestamp}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Reference
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#004890]">
                    {selectedLog.reference}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Performed By
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />

                    <p className="text-sm font-medium text-gray-700">
                      {selectedLog.user}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">Role</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedLog.role}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Module
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedLog.module}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Project
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {selectedLog.project}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Activity Description
                </p>

                <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm leading-6 text-gray-600">
                    {selectedLog.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b78]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}