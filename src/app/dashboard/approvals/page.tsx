"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
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

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

type ApprovalRecord = {
  id: number;
  approvalNo: string;
  requestTitle: string;
  type: string;
  project: string;
  location: string;
  requestedBy: string;
  requestDate: string;
  dueDate: string;
  status: ApprovalStatus;
  priority: "Low" | "Medium" | "High";
  description: string;
};

const initialApprovals: ApprovalRecord[] = [
  {
    id: 1,
    approvalNo: "APR-001",
    requestTitle: "Material Purchase Approval",
    type: "Material",
    project: "ABC Corporate Tower",
    location: "Raipur",
    requestedBy: "Rahul Sharma",
    requestDate: "2026-10-01",
    dueDate: "2026-10-06",
    status: "Pending",
    priority: "High",
    description:
      "Approval required for fire extinguisher and hydrant system material purchase.",
  },
  {
    id: 2,
    approvalNo: "APR-002",
    requestTitle: "Installation Completion Approval",
    type: "Installation",
    project: "City Mall Project",
    location: "Bhilai",
    requestedBy: "Amit Verma",
    requestDate: "2026-09-29",
    dueDate: "2026-10-05",
    status: "Pending",
    priority: "Medium",
    description:
      "Final approval required after completion of fire extinguisher installation.",
  },
  {
    id: 3,
    approvalNo: "APR-003",
    requestTitle: "AMC Renewal Approval",
    type: "AMC",
    project: "Sunrise Hospital",
    location: "Raipur",
    requestedBy: "Priya Singh",
    requestDate: "2026-09-25",
    dueDate: "2026-10-10",
    status: "Approved",
    priority: "Medium",
    description:
      "AMC renewal request submitted for annual fire safety maintenance.",
  },
  {
    id: 4,
    approvalNo: "APR-004",
    requestTitle: "Project Drawing Approval",
    type: "Drawing",
    project: "Green Valley School",
    location: "Durg",
    requestedBy: "Vikas Patel",
    requestDate: "2026-09-28",
    dueDate: "2026-10-03",
    status: "Rejected",
    priority: "High",
    description:
      "Fire safety layout drawing submitted for project approval.",
  },
  {
    id: 5,
    approvalNo: "APR-005",
    requestTitle: "Site Photo Verification",
    type: "Site Photos",
    project: "Metro Commercial Complex",
    location: "Raipur",
    requestedBy: "Amit Verma",
    requestDate: "2026-10-02",
    dueDate: "2026-10-07",
    status: "Pending",
    priority: "Low",
    description:
      "Site photographs submitted for verification and project record.",
  },
  {
    id: 6,
    approvalNo: "APR-006",
    requestTitle: "Completion Certificate Approval",
    type: "Certificate",
    project: "Shree Residency",
    location: "Bhilai",
    requestedBy: "Admin User",
    requestDate: "2026-09-20",
    dueDate: "2026-09-27",
    status: "Approved",
    priority: "High",
    description:
      "Project completion certificate submitted for final approval.",
  },
];

const types = [
  "All Types",
  "Material",
  "Installation",
  "AMC",
  "Drawing",
  "Site Photos",
  "Certificate",
  "Invoice",
  "Other",
];

const statuses = ["All Status", "Pending", "Approved", "Rejected"];

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

        <p className="text-sm font-semibold text-gray-800">{label}</p>
      </div>
    </div>
  );
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] =
    useState<ApprovalRecord[]>(initialApprovals);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState<ApprovalRecord | null>(null);
  const [editingApproval, setEditingApproval] =
    useState<ApprovalRecord | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    requestTitle: "",
    type: "Material",
    project: "",
    location: "",
    requestedBy: "",
    requestDate: "",
    dueDate: "",
    status: "Pending" as ApprovalStatus,
    priority: "Medium" as "Low" | "Medium" | "High",
    description: "",
  });

  const filteredApprovals = useMemo(() => {
    return approvals.filter((approval) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        approval.approvalNo.toLowerCase().includes(searchText) ||
        approval.requestTitle.toLowerCase().includes(searchText) ||
        approval.project.toLowerCase().includes(searchText) ||
        approval.requestedBy.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All Types" || approval.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        approval.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [approvals, search, typeFilter, statusFilter]);

  const totalApprovals = approvals.length;

  const pendingApprovals = approvals.filter(
    (approval) => approval.status === "Pending"
  ).length;

  const approvedApprovals = approvals.filter(
    (approval) => approval.status === "Approved"
  ).length;

  const rejectedApprovals = approvals.filter(
    (approval) => approval.status === "Rejected"
  ).length;

  const pendingPercentage =
    totalApprovals > 0
      ? Math.round((pendingApprovals / totalApprovals) * 100)
      : 0;

  const approvedPercentage =
    totalApprovals > 0
      ? Math.round((approvedApprovals / totalApprovals) * 100)
      : 0;

  const rejectedPercentage =
    totalApprovals > 0
      ? Math.round((rejectedApprovals / totalApprovals) * 100)
      : 0;

  const highPriorityPending = approvals.filter(
    (approval) =>
      approval.status === "Pending" && approval.priority === "High"
  ).length;

  const resetForm = () => {
    setForm({
      requestTitle: "",
      type: "Material",
      project: "",
      location: "",
      requestedBy: "",
      requestDate: "",
      dueDate: "",
      status: "Pending",
      priority: "Medium",
      description: "",
    });

    setEditingApproval(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (approval: ApprovalRecord) => {
    setForm({
      requestTitle: approval.requestTitle,
      type: approval.type,
      project: approval.project,
      location: approval.location,
      requestedBy: approval.requestedBy,
      requestDate: approval.requestDate,
      dueDate: approval.dueDate,
      status: approval.status,
      priority: approval.priority,
      description: approval.description,
    });

    setEditingApproval(approval);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.requestTitle ||
      !form.project ||
      !form.requestedBy
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingApproval) {
      setApprovals((current) =>
        current.map((approval) =>
          approval.id === editingApproval.id
            ? {
                ...approval,
                ...form,
              }
            : approval
        )
      );
    } else {
      const nextId =
        approvals.length > 0
          ? Math.max(...approvals.map((approval) => approval.id)) + 1
          : 1;

      const newApproval: ApprovalRecord = {
        id: nextId,
        approvalNo: `APR-${String(nextId).padStart(3, "0")}`,
        ...form,
      };

      setApprovals((current) => [newApproval, ...current]);
    }

    setShowForm(false);
    resetForm();
  };

  const updateApprovalStatus = (
    id: number,
    status: ApprovalStatus
  ) => {
    setApprovals((current) =>
      current.map((approval) =>
        approval.id === id
          ? {
              ...approval,
              status,
            }
          : approval
      )
    );

    setShowView((current) =>
      current?.id === id
        ? {
            ...current,
            status,
          }
        : current
    );
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    setApprovals((current) =>
      current.filter((approval) => approval.id !== deleteId)
    );

    setDeleteId(null);
  };

  const exportCSV = () => {
    const headers = [
      "Approval No",
      "Request Title",
      "Type",
      "Project",
      "Location",
      "Requested By",
      "Request Date",
      "Due Date",
      "Status",
      "Priority",
      "Description",
    ];

    const rows = filteredApprovals.map((approval) => [
      approval.approvalNo,
      approval.requestTitle,
      approval.type,
      approval.project,
      approval.location,
      approval.requestedBy,
      approval.requestDate,
      approval.dueDate,
      approval.status,
      approval.priority,
      approval.description,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
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
    link.download = "approvals.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getStatusStyle = (status: ApprovalStatus) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityStyle = (
    priority: ApprovalRecord["priority"]
  ) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#141414]">
              Approvals
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review, approve and track project requests requiring
              administrative approval.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
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
              New Approval
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <FileCheck2
            size={19}
            className="mt-0.5 shrink-0 text-[#004890]"
          />

          <div>
            <p className="text-sm font-semibold text-[#004890]">
              Approval workflow preview
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              Approval actions currently update local sample data only.
              Real role-based approval workflow will be connected later.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={100}
              label={`Total Requests (${totalApprovals})`}
              icon={<FileText size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={pendingPercentage}
              label={`Pending (${pendingApprovals})`}
              icon={<Clock3 size={16} />}
              ringColor="#e87010"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={approvedPercentage}
              label={`Approved (${approvedApprovals})`}
              icon={<CheckCircle2 size={16} />}
              ringColor="#16a34a"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={rejectedPercentage}
              label={`Rejected (${rejectedApprovals})`}
              icon={<XCircle size={16} />}
              ringColor="#dc2626"
            />
          </div>
        </div>

        {/* Pending Action Banner */}
        {highPriorityPending > 0 && (
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#e87010]">
                <AlertCircle size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-orange-800">
                  High-priority approvals need attention
                </p>

                <p className="mt-1 text-xs text-orange-700">
                  {highPriorityPending} high-priority request
                  {highPriorityPending !== 1 ? "s are" : " is"} currently
                  waiting for approval.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setStatusFilter("Pending");
              }}
              className="rounded-lg bg-[#e87010] px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700"
            >
              View Pending
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search approval, project, requester..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#004890] focus:bg-white"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Approval Register */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Approval Register
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {filteredApprovals.length} approval
                {filteredApprovals.length !== 1 ? "s" : ""} displayed
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FileCheck2 size={15} />
              Admin review queue
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-semibold">
                    Request
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Project
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Requested By
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Due Date
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Priority
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
                {filteredApprovals.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center"
                    >
                      <FileCheck2
                        size={35}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-medium text-gray-600">
                        No approval requests found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredApprovals.map((approval) => (
                    <tr
                      key={approval.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                            <FileCheck2 size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {approval.requestTitle}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {approval.approvalNo} • {approval.type}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-700">
                          {approval.project}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {approval.location}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#e87010]">
                            <UserRound size={14} />
                          </div>

                          <span className="text-sm text-gray-600">
                            {approval.requestedBy}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <CalendarDays size={14} />

                          {approval.dueDate}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                            approval.priority
                          )}`}
                        >
                          {approval.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            approval.status
                          )}`}
                        >
                          {approval.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          {approval.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateApprovalStatus(
                                    approval.id,
                                    "Approved"
                                  )
                                }
                                title="Approve"
                                className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                              >
                                <Check size={17} />
                              </button>

                              <button
                                onClick={() =>
                                  updateApprovalStatus(
                                    approval.id,
                                    "Rejected"
                                  )
                                }
                                title="Reject"
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                              >
                                <X size={17} />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => setShowView(approval)}
                            title="View"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => openEditForm(approval)}
                            title="Edit"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-[#e87010]"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => setDeleteId(approval.id)}
                            title="Delete"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Approval Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-semibold text-[#141414]">
              Approval Overview
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Current distribution of approval requests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
              <div className="flex items-center gap-3">
                <Clock3 className="text-[#e87010]" size={21} />

                <div>
                  <p className="text-xs text-yellow-700">
                    Waiting for Review
                  </p>

                  <p className="mt-1 text-xl font-bold text-yellow-800">
                    {pendingApprovals}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className="text-green-600"
                  size={21}
                />

                <div>
                  <p className="text-xs text-green-700">
                    Successfully Approved
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-800">
                    {approvedApprovals}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-600" size={21} />

                <div>
                  <p className="text-xs text-red-700">
                    Rejected Requests
                  </p>

                  <p className="mt-1 text-xl font-bold text-red-800">
                    {rejectedApprovals}
                  </p>
                </div>
              </div>
            </div>
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
                  {editingApproval
                    ? "Edit Approval Request"
                    : "New Approval Request"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Enter the request details for the approval register.
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
                    Request Title *
                  </label>

                  <input
                    type="text"
                    value={form.requestTitle}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        requestTitle: e.target.value,
                      })
                    }
                    placeholder="Enter approval request title"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Request Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    {types
                      .filter((type) => type !== "All Types")
                      .map((type) => (
                        <option key={type}>{type}</option>
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
                        priority: e.target.value as
                          | "Low"
                          | "Medium"
                          | "High",
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Project *
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
                    required
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
                    Requested By *
                  </label>

                  <input
                    type="text"
                    value={form.requestedBy}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        requestedBy: e.target.value,
                      })
                    }
                    placeholder="Employee name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
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
                        status: e.target.value as ApprovalStatus,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Request Date
                  </label>

                  <input
                    type="date"
                    value={form.requestDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        requestDate: e.target.value,
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
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Describe what needs to be approved..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
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
                  {editingApproval
                    ? "Update Request"
                    : "Create Request"}
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
                  Approval Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {showView.approvalNo}
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
                  <FileCheck2 size={24} />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {showView.requestTitle}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {showView.type} request for{" "}
                    {showView.project}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                        showView.status
                      )}`}
                    >
                      {showView.status}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                        showView.priority
                      )}`}
                    >
                      {showView.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-400">
                    Project
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.project}
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
                    Requested By
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.requestedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Request Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.requestDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.dueDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Request Type
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.type}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {showView.description || "No description provided."}
                </p>
              </div>

              {showView.status === "Pending" && (
                <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() =>
                      updateApprovalStatus(
                        showView.id,
                        "Rejected"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <X size={16} />
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      updateApprovalStatus(
                        showView.id,
                        "Approved"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                </div>
              )}

              {showView.status !== "Pending" && (
                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setShowView(null)}
                    className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                  >
                    Close
                  </button>
                </div>
              )}
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
              Delete Approval Request?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              This request will be removed from the local approval
              register.
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