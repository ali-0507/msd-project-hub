"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  ArrowDownToLine,
  AlertTriangle,
  Clock3,
  CircleCheck,
  Ban,
  CalendarDays,
  MapPin,
  UserRound,
  Flag,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type PendingType =
  | "Overdue"
  | "Due Soon"
  | "Blocked"
  | "Awaiting Material"
  | "Awaiting Approval";

type Priority = "Low" | "Medium" | "High" | "Critical";

type PendingWork = {
  id: number;
  pendingNo: string;
  project: string;
  site: string;
  workItem: string;
  pendingType: PendingType;
  assignedTeam: string;
  dueDate: string;
  priority: Priority;
  progress: number;
  remarks: string;
};

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialPendingWork: PendingWork[] = [
  {
    id: 1,
    pendingNo: "PEND-2026-001",
    project: "North Plaza Sprinkler",
    site: "North Plaza Mall",
    workItem: "Sprinkler Piping",
    pendingType: "Overdue",
    assignedTeam: "Installation Team A",
    dueDate: "2026-10-03",
    priority: "Critical",
    progress: 40,
    remarks: "Site access issue delayed piping work.",
  },
  {
    id: 2,
    pendingNo: "PEND-2026-002",
    project: "Bharat Agro",
    site: "Bharat Agro Warehouse",
    workItem: "Hose Reel Installation",
    pendingType: "Due Soon",
    assignedTeam: "Installation Team C",
    dueDate: "2026-10-08",
    priority: "High",
    progress: 55,
    remarks: "Installation needs to be completed this week.",
  },
  {
    id: 3,
    pendingNo: "PEND-2026-003",
    project: "Shree Cement Fire System",
    site: "Shree Cement, Baloda Bazar",
    workItem: "Hydrant Pipeline",
    pendingType: "Awaiting Material",
    assignedTeam: "Installation Team B",
    dueDate: "2026-10-12",
    priority: "High",
    progress: 30,
    remarks: "Waiting for additional pipe fittings.",
  },
  {
    id: 4,
    pendingNo: "PEND-2026-004",
    project: "Industrial Safety Upgrade",
    site: "Industrial Area, Raipur",
    workItem: "Fire Pump Installation",
    pendingType: "Awaiting Approval",
    assignedTeam: "Service Team",
    dueDate: "2026-10-14",
    priority: "Medium",
    progress: 20,
    remarks: "Client approval required before installation.",
  },
  {
    id: 5,
    pendingNo: "PEND-2026-005",
    project: "City Hospital Safety Upgrade",
    site: "City Hospital, Raipur",
    workItem: "Final Documentation",
    pendingType: "Due Soon",
    assignedTeam: "Project Coordinator",
    dueDate: "2026-10-09",
    priority: "Medium",
    progress: 75,
    remarks: "Final documents awaiting submission.",
  },
  {
    id: 6,
    pendingNo: "PEND-2026-006",
    project: "Bharat Agro",
    site: "Bharat Agro Plant, Raipur",
    workItem: "Testing & Commissioning",
    pendingType: "Blocked",
    assignedTeam: "Electrical Team",
    dueDate: "2026-10-16",
    priority: "Critical",
    progress: 60,
    remarks: "Testing blocked until electrical connection is available.",
  },
];

/* =========================================================
   OPTIONS
========================================================= */

const projects = [
  "Bharat Agro",
  "Shree Cement Fire System",
  "City Hospital Safety Upgrade",
  "North Plaza Sprinkler",
  "Industrial Safety Upgrade",
  "Other",
];

const pendingTypes: PendingType[] = [
  "Overdue",
  "Due Soon",
  "Blocked",
  "Awaiting Material",
  "Awaiting Approval",
];

const teams = [
  "Installation Team A",
  "Installation Team B",
  "Installation Team C",
  "Electrical Team",
  "Service Team",
  "Project Coordinator",
];

const priorities: Priority[] = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

const emptyForm = {
  pendingNo: "",
  project: projects[0],
  site: "",
  workItem: "",
  pendingType: "Due Soon" as PendingType,
  assignedTeam: teams[0],
  dueDate: new Date().toLocaleDateString("en-CA"),
  priority: "Medium" as Priority,
  progress: "0",
  remarks: "",
};

/* =========================================================
   CIRCULAR PROGRESS
========================================================= */

function CircularProgress({
  percentage,
  color,
  trackColor,
}: {
  percentage: number;
  color: string;
  trackColor: string;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const safePercentage = Math.min(
    100,
    Math.max(0, percentage)
  );

  const offset =
    circumference -
    (safePercentage / 100) * circumference;

  return (
    <div
      className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center"
      role="progressbar"
      aria-label={`${safePercentage}%`}
      aria-valuenow={safePercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        viewBox="0 0 60 60"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth="7"
        />

        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>

      <span className="absolute text-lg font-extrabold text-[#141414]">
        {safePercentage}%
      </span>
    </div>
  );
}

/* =========================================================
   PENDING TYPE STYLES
========================================================= */

function pendingTypeStyles(type: PendingType) {
  if (type === "Overdue") {
    return "bg-red-50 text-red-700";
  }

  if (type === "Due Soon") {
    return "bg-orange-50 text-orange-700";
  }

  if (type === "Blocked") {
    return "bg-purple-50 text-purple-700";
  }

  if (type === "Awaiting Material") {
    return "bg-blue-50 text-[#004890]";
  }

  return "bg-slate-100 text-slate-700";
}

/* =========================================================
   PRIORITY STYLES
========================================================= */

function priorityStyles(priority: Priority) {
  if (priority === "Critical") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-700";
  }

  if (priority === "Medium") {
    return "bg-blue-50 text-[#004890]";
  }

  return "bg-slate-100 text-slate-600";
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* =========================================================
   DAYS FROM TODAY
========================================================= */

function getDayDifference(date: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(`${date}T00:00:00`);

  target.setHours(0, 0, 0, 0);

  return Math.round(
    (target.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PendingWorkPage() {
  const [pendingWork, setPendingWork] =
    useState<PendingWork[]>(initialPendingWork);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [viewWork, setViewWork] =
    useState<PendingWork | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  /* =======================================================
     COUNTS
  ======================================================= */

  const overdueCount = pendingWork.filter(
    (item) => item.pendingType === "Overdue"
  ).length;

  const dueSoonCount = pendingWork.filter(
    (item) => item.pendingType === "Due Soon"
  ).length;

  const blockedCount = pendingWork.filter(
    (item) => item.pendingType === "Blocked"
  ).length;

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredWork = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pendingWork.filter((item) => {
      const matchesSearch = [
        item.pendingNo,
        item.project,
        item.site,
        item.workItem,
        item.assignedTeam,
        item.pendingType,
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesType =
        typeFilter === "All" ||
        item.pendingType === typeFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesPriority
      );
    });
  }, [
    pendingWork,
    search,
    typeFilter,
    priorityFilter,
  ]);

  /* =======================================================
     OPEN ADD
  ======================================================= */

  function openAddModal() {
    setEditingId(null);

    const nextNumber =
      Math.max(
        0,
        ...pendingWork.map((item) => item.id)
      ) + 1;

    setForm({
      ...emptyForm,
      pendingNo: `PEND-2026-${String(
        nextNumber
      ).padStart(3, "0")}`,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  function openEditModal(item: PendingWork) {
    setEditingId(item.id);

    setForm({
      pendingNo: item.pendingNo,
      project: item.project,
      site: item.site,
      workItem: item.workItem,
      pendingType: item.pendingType,
      assignedTeam: item.assignedTeam,
      dueDate: item.dueDate,
      priority: item.priority,
      progress: String(item.progress),
      remarks: item.remarks,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     SAVE
  ======================================================= */

  function savePendingWork(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const pendingNo =
      form.pendingNo.trim();

    const site = form.site.trim();

    const workItem =
      form.workItem.trim();

    const progress = Number(form.progress);

    if (
      !pendingNo ||
      !site ||
      !workItem ||
      !form.dueDate
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (
      form.progress.trim() === "" ||
      !Number.isInteger(progress) ||
      progress < 0 ||
      progress > 100
    ) {
      setError(
        "Progress must be a whole number between 0 and 100."
      );
      return;
    }

    const duplicate = pendingWork.some(
      (item) =>
        item.pendingNo.toLowerCase() ===
          pendingNo.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      setError(
        "This pending work number already exists."
      );
      return;
    }

    const updated: PendingWork = {
      id: editingId ?? Date.now(),
      pendingNo,
      project: form.project,
      site,
      workItem,
      pendingType: form.pendingType,
      assignedTeam: form.assignedTeam,
      dueDate: form.dueDate,
      priority: form.priority,
      progress,
      remarks: form.remarks.trim(),
    };

    if (editingId !== null) {
      setPendingWork((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? updated
            : item
        )
      );

      setNotice(
        "Pending work updated in this preview."
      );
    } else {
      setPendingWork((previous) => [
        updated,
        ...previous,
      ]);

      setNotice(
        "Pending work added to this preview."
      );
    }

    setModalOpen(false);
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function deletePendingWork() {
    if (deleteId === null) return;

    setPendingWork((previous) =>
      previous.filter(
        (item) => item.id !== deleteId
      )
    );

    setDeleteId(null);

    setNotice(
      "Pending work removed from this preview."
    );
  }

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  function exportCsv() {
    const headers = [
      "Pending No",
      "Project",
      "Site",
      "Work Item",
      "Pending Type",
      "Assigned Team",
      "Due Date",
      "Priority",
      "Progress",
      "Remarks",
    ];

    const rows = filteredWork.map(
      (item) => [
        item.pendingNo,
        item.project,
        item.site,
        item.workItem,
        item.pendingType,
        item.assignedTeam,
        item.dueDate,
        item.priority,
        `${item.progress}%`,
        item.remarks,
      ]
    );

    const csvCell = (
      value: string | number
    ) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) =>
        row.map(csvCell).join(",")
      )
      .join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download =
      "pending-work-register-demo.csv";

    link.click();

    URL.revokeObjectURL(url);

    setNotice(
      "Pending work register exported."
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              ADMIN WORKSPACE
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
              Pending Work
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Identify overdue, blocked, and upcoming
              work that requires attention.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#004890] hover:bg-slate-50"
            >
              <ArrowDownToLine size={16} />
              Export CSV
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
            >
              <Plus size={17} />
              Add Pending Work
            </button>
          </div>
        </section>

        {/* =================================================
            PREVIEW NOTICE
        ================================================= */}

        <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-slate-700">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-[#e87010]"
          />

          <p>
            <strong>Preview mode:</strong>{" "}
            Pending work records are sample data.
            Changes are not saved to a database or
            connected to project activity.
          </p>
        </div>

        {/* =================================================
            NOTICE
        ================================================= */}

        {notice && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              label: "Total Pending",
              value: pendingWork.length,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "All",
              percentage: 100,
            },
            {
              label: "Overdue",
              value: overdueCount,
              color: "#dc2626",
              trackColor: "#fee2e2",
              filter: "Overdue",
              percentage:
                pendingWork.length > 0
                  ? Math.round(
                      (overdueCount /
                        pendingWork.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "Due Soon",
              value: dueSoonCount,
              color: "#e87010",
              trackColor: "#ffedd5",
              filter: "Due Soon",
              percentage:
                pendingWork.length > 0
                  ? Math.round(
                      (dueSoonCount /
                        pendingWork.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "Blocked",
              value: blockedCount,
              color: "#7c3aed",
              trackColor: "#ede9fe",
              filter: "Blocked",
              percentage:
                pendingWork.length > 0
                  ? Math.round(
                      (blockedCount /
                        pendingWork.length) *
                        100
                    )
                  : 0,
            },
          ].map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() =>
                setTypeFilter(card.filter)
              }
              className={`rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md sm:p-4 ${
                typeFilter === card.filter
                  ? "border-[#004890]/40 ring-1 ring-[#004890]/10"
                  : "border-slate-200"
              }`}
            >
              <div className="flex min-h-[100px] items-center justify-between gap-2">

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-5 text-slate-500">
                    {card.label}
                  </p>

                  <p
                    className="mt-2 text-3xl font-extrabold tracking-tight"
                    style={{
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </p>

                  <p className="mt-1 text-xs leading-4 text-slate-500">
                    Click to filter work
                  </p>
                </div>

                <CircularProgress
                  percentage={card.percentage}
                  color={card.color}
                  trackColor={card.trackColor}
                />
              </div>
            </button>
          ))}
        </section>

        {/* =================================================
            ACTION SUMMARY
        ================================================= */}

        <section className="grid grid-cols-1 gap-3 md:grid-cols-3">

          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  Immediate Attention
                </p>

                <p className="mt-1 text-2xl font-bold text-red-700">
                  {overdueCount +
                    blockedCount}
                </p>

                <p className="mt-1 text-xs text-red-600">
                  Overdue or blocked items
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-red-600">
                <AlertTriangle size={19} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                  Due Soon
                </p>

                <p className="mt-1 text-2xl font-bold text-orange-700">
                  {dueSoonCount}
                </p>

                <p className="mt-1 text-xs text-orange-600">
                  Items requiring follow-up
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-orange-600">
                <Clock3 size={19} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                  Total Open Items
                </p>

                <p className="mt-1 text-2xl font-bold text-[#004890]">
                  {pendingWork.length}
                </p>

                <p className="mt-1 text-xs text-[#004890]">
                  Pending work requiring tracking
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#004890]">
                <ClipboardList size={19} />
              </div>
            </div>
          </div>

        </section>

        {/* =================================================
            REGISTER
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="font-bold text-[#141414]">
                Pending Work Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Track work that is overdue, blocked,
                or waiting for an action.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              {/* Search */}

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                <Search
                  size={16}
                  className="shrink-0 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search pending work..."
                  aria-label="Search pending work"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-56"
                />
              </div>

              {/* Type */}

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                aria-label="Filter by pending type"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All types
                </option>

                {pendingTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              {/* Priority */}

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by priority"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All priorities
                </option>

                {priorities.map((priority) => (
                  <option
                    key={priority}
                    value={priority}
                  >
                    {priority}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse text-left">

              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  <th className="px-5 py-4">
                    Pending Item
                  </th>

                  <th className="px-4 py-4">
                    Project / Site
                  </th>

                  <th className="px-4 py-4">
                    Work Item
                  </th>

                  <th className="px-4 py-4">
                    Assigned Team
                  </th>

                  <th className="px-4 py-4">
                    Due Date
                  </th>

                  <th className="px-4 py-4">
                    Priority
                  </th>

                  <th className="px-4 py-4">
                    Progress
                  </th>

                  <th className="px-4 py-4">
                    Type
                  </th>

                  <th className="px-4 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredWork.map(
                  (item) => {
                    const dayDifference =
                      getDayDifference(
                        item.dueDate
                      );

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100 transition hover:bg-slate-50/70"
                      >

                        {/* Pending number */}

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-[#004890]">
                            {item.pendingNo}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Pending work
                          </p>
                        </td>

                        {/* Project */}

                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-[#141414]">
                            {item.project}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} />

                            {item.site}
                          </div>
                        </td>

                        {/* Work */}

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                              <ClipboardList
                                size={15}
                              />
                            </span>

                            <span className="max-w-[190px] text-sm text-slate-700">
                              {item.workItem}
                            </span>
                          </div>
                        </td>

                        {/* Team */}

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <UserRound
                              size={15}
                              className="text-slate-400"
                            />

                            {item.assignedTeam}
                          </div>
                        </td>

                        {/* Due Date */}

                        <td className="px-4 py-4">
                          <div className="flex items-start gap-2">
                            <CalendarDays
                              size={15}
                              className="mt-0.5 text-slate-400"
                            />

                            <div>
                              <p className="text-sm text-slate-700">
                                {formatDate(
                                  item.dueDate
                                )}
                              </p>

                              <p
                                className={`mt-1 text-[11px] font-semibold ${
                                  dayDifference <
                                  0
                                    ? "text-red-600"
                                    : dayDifference <=
                                      3
                                    ? "text-orange-600"
                                    : "text-slate-400"
                                }`}
                              >
                                {dayDifference <
                                0
                                  ? `${Math.abs(
                                      dayDifference
                                    )} day(s) overdue`
                                  : dayDifference ===
                                    0
                                  ? "Due today"
                                  : `${dayDifference} day(s) remaining`}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Priority */}

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles(
                              item.priority
                            )}`}
                          >
                            <Flag size={12} />

                            {item.priority}
                          </span>
                        </td>

                        {/* Progress */}

                        <td className="px-4 py-4">
                          <div className="w-28">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-600">
                                {item.progress}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-[#004890] transition-all"
                                style={{
                                  width: `${item.progress}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Type */}

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${pendingTypeStyles(
                              item.pendingType
                            )}`}
                          >
                            {item.pendingType}
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-1">

                            <button
                              type="button"
                              onClick={() =>
                                setViewWork(
                                  item
                                )
                              }
                              title="View pending work"
                              aria-label={`View ${item.pendingNo}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  item
                                )
                              }
                              title="Edit pending work"
                              aria-label={`Edit ${item.pendingNo}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteId(
                                  item.id
                                )
                              }
                              title="Delete pending work"
                              aria-label={`Delete ${item.pendingNo}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>

                            <ChevronRight
                              size={16}
                              className="mt-2 text-slate-300"
                            />
                          </div>
                        </td>

                      </tr>
                    );
                  }
                )}

                {/* Empty */}

                {filteredWork.length ===
                  0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-12 text-center"
                      >
                        <CircleCheck
                          size={30}
                          className="mx-auto text-emerald-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No pending work found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or
                          filter.
                        </p>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filteredWork.length} of{" "}
              {pendingWork.length} pending items
            </p>

            <p className="text-xs text-slate-400">
              Sample data · No backend integration
            </p>
          </div>

        </section>

        {/* =================================================
            ADD / EDIT MODAL
        ================================================= */}

        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setModalOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="pending-form-title"
              className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="pending-form-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null
                      ? "Edit Pending Work"
                      : "Add Pending Work"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Record work that requires follow-up
                    or action.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                  aria-label="Close form"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Form */}

              <form
                onSubmit={savePendingWork}
                className="space-y-5 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Pending number */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Pending Number *
                    <input
                      required
                      maxLength={40}
                      value={
                        form.pendingNo
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          pendingNo:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Due Date */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Due Date *
                    <input
                      type="date"
                      required
                      value={form.dueDate}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          dueDate:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Project */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Project *
                    <select
                      value={form.project}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          project:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {projects.map(
                        (project) => (
                          <option
                            key={project}
                            value={project}
                          >
                            {project}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Site */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Site / Location *
                    <input
                      required
                      maxLength={150}
                      value={form.site}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          site: event.target.value,
                        })
                      }
                      placeholder="Enter site location"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Work Item */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Work Item *
                    <input
                      required
                      maxLength={150}
                      value={
                        form.workItem
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          workItem:
                            event.target.value,
                        })
                      }
                      placeholder="Enter pending work item"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Pending type */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Pending Type
                    <select
                      value={
                        form.pendingType
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          pendingType:
                            event.target
                              .value as PendingType,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {pendingTypes.map(
                        (type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Team */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Assigned Team
                    <select
                      value={
                        form.assignedTeam
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          assignedTeam:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {teams.map((team) => (
                        <option
                          key={team}
                          value={team}
                        >
                          {team}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Priority */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Priority
                    <select
                      value={form.priority}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          priority:
                            event.target
                              .value as Priority,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {priorities.map(
                        (priority) => (
                          <option
                            key={priority}
                            value={priority}
                          >
                            {priority}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Progress */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Progress (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={
                        form.progress
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          progress:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Remarks */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Remarks
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={form.remarks}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          remarks:
                            event.target.value,
                        })
                      }
                      placeholder="Reason for pending work or required action"
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                </div>

                {/* Error */}

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {/* Footer */}

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      setModalOpen(false)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                  >
                    {editingId !== null
                      ? "Save Changes"
                      : "Add Pending Work"}
                  </button>

                </div>
              </form>
            </section>
          </div>
        )}

        {/* =================================================
            VIEW MODAL
        ================================================= */}

        {viewWork && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setViewWork(null);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="pending-view-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2
                    id="pending-view-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    Pending Work Details
                  </h2>

                  <p className="mt-1 text-xs text-[#004890]">
                    {viewWork.pendingNo}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setViewWork(null)
                  }
                  aria-label="Close details"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-4 p-5">

                {[
                  [
                    "Project",
                    viewWork.project,
                  ],
                  ["Site", viewWork.site],
                  [
                    "Work Item",
                    viewWork.workItem,
                  ],
                  [
                    "Pending Type",
                    viewWork.pendingType,
                  ],
                  [
                    "Assigned Team",
                    viewWork.assignedTeam,
                  ],
                  [
                    "Due Date",
                    formatDate(
                      viewWork.dueDate
                    ),
                  ],
                  [
                    "Priority",
                    viewWork.priority,
                  ],
                  [
                    "Progress",
                    `${viewWork.progress}%`,
                  ],
                  [
                    "Remarks",
                    viewWork.remarks ||
                      "—",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm last:border-0"
                  >
                    <span className="text-slate-500">
                      {label}
                    </span>

                    <span className="max-w-[65%] break-words text-right font-medium text-[#141414]">
                      {value}
                    </span>
                  </div>
                ))}

              </div>

              <div className="flex justify-end border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() =>
                    setViewWork(null)
                  }
                  className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                >
                  Close
                </button>
              </div>

            </section>
          </div>
        )}

        {/* =================================================
            DELETE MODAL
        ================================================= */}

        {deleteId !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">

            <section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-pending-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2
                id="delete-pending-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this pending work?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the pending work entry
                from this UI preview only.
              </p>

              <div className="mt-6 flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(null)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    deletePendingWork
                  }
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Pending Work
                </button>

              </div>
            </section>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}