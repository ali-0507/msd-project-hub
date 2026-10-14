
"use client";

import { useMemo, useState } from "react";
import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";
import {
  Search,
  Download,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  X,
  FileText,
  Package,
  Wrench,
  FolderKanban,
  CalendarDays,
  UserRound,
  Check,
  Ban,
} from "lucide-react";

type ApprovalType =
  | "Material Request"
  | "Document"
  | "Installation"
  | "Project Update";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

type ApprovalItem = {
  id: string;
  title: string;
  type: ApprovalType;
  projectId: string;
  projectName: string;
  requestedBy: string;
  requestDate: string;
  priority: "High" | "Medium" | "Low";
  status: ApprovalStatus;
  description: string;
  remarks: string;
};

const initialApprovals: ApprovalItem[] = [
  {
    id: "APR-001",
    title: "Request for ABC Fire Extinguishers",
    type: "Material Request",
    projectId: "FW-001",
    projectName: "Corporate Tower",
    requestedBy: "Store Manager",
    requestDate: "2026-10-12",
    priority: "High",
    status: "Pending",
    description:
      "Request to issue additional ABC fire extinguishers for the ongoing installation work.",
    remarks: "Required to complete the scheduled installation activities.",
  },
  {
    id: "APR-002",
    title: "Fire Alarm Inspection Report",
    type: "Document",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    requestedBy: "Inspection Team",
    requestDate: "2026-10-11",
    priority: "Medium",
    status: "Pending",
    description:
      "Inspection report submitted for management review and record verification.",
    remarks: "Please verify the inspection observations before approval.",
  },
  {
    id: "APR-003",
    title: "Sprinkler Installation Completion",
    type: "Installation",
    projectId: "FW-003",
    projectName: "Hospital Project",
    requestedBy: "Site Engineer",
    requestDate: "2026-10-10",
    priority: "High",
    status: "Pending",
    description:
      "Request for review of completed sprinkler installation activities.",
    remarks: "Final inspection is required before closing the activity.",
  },
  {
    id: "APR-004",
    title: "Fire Hose Pipe Procurement",
    type: "Material Request",
    projectId: "FW-004",
    projectName: "Shopping Mall",
    requestedBy: "Store Manager",
    requestDate: "2026-10-09",
    priority: "High",
    status: "Approved",
    description:
      "Procurement request for fire hose pipes needed for the hydrant system.",
    remarks: "Quantity and project requirement reviewed.",
  },
  {
    id: "APR-005",
    title: "Project Schedule Revision",
    type: "Project Update",
    projectId: "FW-005",
    projectName: "Manufacturing Unit",
    requestedBy: "Project Manager",
    requestDate: "2026-10-08",
    priority: "Medium",
    status: "Pending",
    description:
      "Request to revise the activity schedule due to a change in site readiness.",
    remarks: "Review the revised dates and their impact on project delivery.",
  },
  {
    id: "APR-006",
    title: "Fire Extinguisher Service Record",
    type: "Document",
    projectId: "FW-006",
    projectName: "Office Complex",
    requestedBy: "Service Team",
    requestDate: "2026-10-07",
    priority: "Low",
    status: "Approved",
    description:
      "Service record submitted after extinguisher inspection and refilling.",
    remarks: "Record reviewed for completeness.",
  },
  {
    id: "APR-007",
    title: "Hydrant Pressure Test",
    type: "Installation",
    projectId: "FW-007",
    projectName: "Warehouse Project",
    requestedBy: "Site Engineer",
    requestDate: "2026-10-06",
    priority: "High",
    status: "Rejected",
    description:
      "Request to accept the hydrant pressure testing activity.",
    remarks: "Additional test evidence is required before resubmission.",
  },
  {
    id: "APR-008",
    title: "Additional Alarm Cable Request",
    type: "Material Request",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    requestedBy: "Site Engineer",
    requestDate: "2026-10-13",
    priority: "Medium",
    status: "Pending",
    description:
      "Request for additional alarm cable to complete the installation.",
    remarks: "Confirm the required quantity against the material register.",
  },
  {
    id: "APR-009",
    title: "Project Handover Report",
    type: "Document",
    projectId: "FW-008",
    projectName: "Residential Complex",
    requestedBy: "Handover Team",
    requestDate: "2026-10-05",
    priority: "Medium",
    status: "Pending",
    description:
      "Handover report submitted for management review.",
    remarks: "Check the outstanding items and supporting documents.",
  },
];

const statusStyles: Record<ApprovalStatus, string> = {
  Pending: "border-orange-200 bg-orange-50 text-orange-700",
  Approved: "border-green-200 bg-green-50 text-green-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
};

const priorityStyles = {
  High: "border-red-200 bg-red-50 text-red-700",
  Medium: "border-orange-200 bg-orange-50 text-orange-700",
  Low: "border-blue-200 bg-blue-50 text-[#004890]",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ApprovalTypeIcon({ type }: { type: ApprovalType }) {
  const className = "shrink-0";

  switch (type) {
    case "Material Request":
      return <Package size={20} className={className} />;
    case "Document":
      return <FileText size={20} className={className} />;
    case "Installation":
      return <Wrench size={20} className={className} />;
    default:
      return <FolderKanban size={20} className={className} />;
  }
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: typeof ClipboardCheck;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#141414]">{value}</h3>
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function ManagementApprovalsPage() {
  const [approvals, setApprovals] =
    useState<ApprovalItem[]>(initialApprovals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedApproval, setSelectedApproval] =
    useState<ApprovalItem | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const summary = useMemo(
    () => ({
      total: approvals.length,
      pending: approvals.filter((item) => item.status === "Pending").length,
      approved: approvals.filter((item) => item.status === "Approved").length,
      rejected: approvals.filter((item) => item.status === "Rejected").length,
    }),
    [approvals]
  );

  const filteredApprovals = useMemo(() => {
    const term = search.toLowerCase().trim();

    return approvals.filter((item) => {
      const matchesSearch =
        !term ||
        item.id.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        item.projectId.toLowerCase().includes(term) ||
        item.projectName.toLowerCase().includes(term) ||
        item.requestedBy.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesType = typeFilter === "All" || item.type === typeFilter;

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority
      );
    });
  }, [approvals, search, statusFilter, typeFilter, priorityFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApprovals.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedApprovals = filteredApprovals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function updateStatus(id: string, status: ApprovalStatus) {
    setApprovals((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedApproval((previous) =>
      previous && previous.id === id
        ? { ...previous, status }
        : previous
    );
  }

  function exportCSV() {
    const headers = [
      "Approval ID",
      "Request Title",
      "Type",
      "Project ID",
      "Project Name",
      "Requested By",
      "Request Date",
      "Priority",
      "Status",
      "Description",
      "Remarks",
    ];

    const rows = filteredApprovals.map((item) => [
      item.id,
      item.title,
      item.type,
      item.projectId,
      item.projectName,
      item.requestedBy,
      item.requestDate,
      item.priority,
      item.status,
      item.description,
      item.remarks,
    ]);

    const escapeCSV = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "fire-wala-approvals-register.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function applyStatusFilter(status: string) {
    setStatusFilter(status);
    setSearch("");
    setTypeFilter("All");
    setPriorityFilter("All");
    setPage(1);
  }

  return (
    <ManagementDashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Management</span>
              <span>/</span>
              <span className="text-[#004890]">Approvals</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              Approvals
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review material requests, project documents, installation
              activities, and operational updates.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
          >
            <Download size={17} />
            Export Register
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Requests"
            value={summary.total}
            subtitle="All approval records"
            icon={ClipboardCheck}
            iconClass="bg-blue-50 text-[#004890]"
          />

          <SummaryCard
            title="Pending Review"
            value={summary.pending}
            subtitle="Awaiting a decision"
            icon={Clock}
            iconClass="bg-orange-50 text-[#e87010]"
          />

          <SummaryCard
            title="Approved"
            value={summary.approved}
            subtitle="Approved requests"
            icon={CheckCircle2}
            iconClass="bg-green-50 text-green-700"
          />

          <SummaryCard
            title="Rejected"
            value={summary.rejected}
            subtitle="Require follow-up"
            icon={XCircle}
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={20} className="text-[#004890]" />
              <h2 className="font-semibold text-[#141414]">
                Approval Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Track decisions and focus on requests that still need review.
            </p>

            <div className="mt-5 space-y-5">
              {[
                {
                  label: "Pending",
                  count: summary.pending,
                  color: "bg-[#e87010]",
                  textColor: "text-[#e87010]",
                },
                {
                  label: "Approved",
                  count: summary.approved,
                  color: "bg-green-500",
                  textColor: "text-green-700",
                },
                {
                  label: "Rejected",
                  count: summary.rejected,
                  color: "bg-red-500",
                  textColor: "text-red-600",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.textColor}`}>
                      {item.count} / {summary.total}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${
                          summary.total
                            ? (item.count / summary.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle size={20} />
              <h2 className="font-semibold">Action Required</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-orange-900">
              {summary.pending} requests are awaiting a decision. Review
              supporting information and record the appropriate decision.
            </p>

            <button
              onClick={() => applyStatusFilter("Pending")}
              className="mt-4 text-sm font-semibold text-orange-800 hover:underline"
            >
              Review pending requests →
            </button>

            <button
              onClick={() => applyStatusFilter("All")}
              className="mt-3 block text-sm font-semibold text-orange-800 hover:underline"
            >
              View all requests
            </button>
          </div>
        </div>

        {/* Approval register */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-[#141414]">
              Approval Register
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search requests, apply filters, and review individual records.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search ID, project, requester..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Request Types</option>
                <option value="Material Request">Material Request</option>
                <option value="Document">Document</option>
                <option value="Installation">Installation</option>
                <option value="Project Update">Project Update</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Request</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Requested By</th>
                  <th className="px-5 py-4 font-semibold">Request Date</th>
                  <th className="px-5 py-4 font-semibold">Priority</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedApprovals.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-50 p-2.5 text-[#004890]">
                          <ApprovalTypeIcon type={item.type} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#141414]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.id} · {item.projectId}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {item.projectName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">{item.type}</td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 text-gray-700">
                        <UserRound size={14} className="text-gray-400" />
                        {item.requestedBy}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 whitespace-nowrap text-gray-600">
                        <CalendarDays size={14} className="text-gray-400" />
                        {formatDate(item.requestDate)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[item.priority]}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedApproval(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
                      >
                        <Eye size={15} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedApprovals.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      No approval requests match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredApprovals.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(
                currentPage * pageSize,
                filteredApprovals.length
              )}{" "}
              of {filteredApprovals.length} requests
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setPage((prev) => Math.max(1, prev - 1))
                }
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="px-2 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Approval details modal */}
      {selectedApproval && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedApproval(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-modal-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-[#004890]">
                  <ApprovalTypeIcon type={selectedApproval.type} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                    {selectedApproval.id}
                  </p>
                  <h2
                    id="approval-modal-title"
                    className="mt-1 text-lg font-bold text-[#141414]"
                  >
                    {selectedApproval.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedApproval.projectName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedApproval(null)}
                aria-label="Close approval details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedApproval.status]}`}
                >
                  {selectedApproval.status}
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[selectedApproval.priority]}`}
                >
                  {selectedApproval.priority} Priority
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Request Type</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedApproval.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Project ID</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedApproval.projectId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Requested By</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedApproval.requestedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Request Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {formatDate(selectedApproval.requestDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#141414]">
                  Description
                </p>
                <p className="mt-2 rounded-lg border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                  {selectedApproval.description}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#141414]">
                  Remarks
                </p>
                <p className="mt-2 rounded-lg border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                  {selectedApproval.remarks}
                </p>
              </div>

              {selectedApproval.status === "Pending" ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      updateStatus(selectedApproval.id, "Approved")
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <Check size={17} />
                    Approve Request
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selectedApproval.id, "Rejected")
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <Ban size={17} />
                    Reject Request
                  </button>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  This request has already been marked as{" "}
                  <strong>{selectedApproval.status}</strong> in this demo.
                </div>
              )}

              <button
                onClick={() => setSelectedApproval(null)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagementDashboardShell>
  );
}
