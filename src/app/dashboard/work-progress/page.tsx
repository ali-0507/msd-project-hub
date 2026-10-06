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
  ClipboardList,
  Clock3,
  CircleCheck,
  LoaderCircle,
  AlertTriangle,
  MapPin,
  UserRound,
  CalendarDays,
  Flag,
  Target,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type WorkStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Delayed";

type Priority = "Low" | "Medium" | "High";

type WorkItem = {
  id: number;
  workNo: string;
  project: string;
  site: string;
  activity: string;
  assignedTeam: string;
  targetDate: string;
  status: WorkStatus;
  priority: Priority;
  progress: number;
  remarks: string;
};

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialWorkItems: WorkItem[] = [
  {
    id: 1,
    workNo: "WP-2026-001",
    project: "Bharat Agro",
    site: "Bharat Agro Plant, Raipur",
    activity: "Fire Extinguisher Installation",
    assignedTeam: "Installation Team A",
    targetDate: "2026-10-08",
    status: "In Progress",
    priority: "High",
    progress: 65,
    remarks: "Installation work is progressing as scheduled.",
  },
  {
    id: 2,
    workNo: "WP-2026-002",
    project: "Shree Cement Fire System",
    site: "Shree Cement, Baloda Bazar",
    activity: "Hydrant Pipeline Installation",
    assignedTeam: "Installation Team B",
    targetDate: "2026-10-12",
    status: "In Progress",
    priority: "High",
    progress: 45,
    remarks: "Main pipeline installation underway.",
  },
  {
    id: 3,
    workNo: "WP-2026-003",
    project: "City Hospital Safety Upgrade",
    site: "City Hospital, Raipur",
    activity: "Fire Alarm Testing",
    assignedTeam: "Electrical Team",
    targetDate: "2026-10-02",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    remarks: "Testing and commissioning completed.",
  },
  {
    id: 4,
    workNo: "WP-2026-004",
    project: "North Plaza Sprinkler",
    site: "North Plaza Mall",
    activity: "Sprinkler Piping",
    assignedTeam: "Installation Team A",
    targetDate: "2026-10-05",
    status: "Delayed",
    priority: "High",
    progress: 40,
    remarks: "Work delayed due to site access issue.",
  },
  {
    id: 5,
    workNo: "WP-2026-005",
    project: "Bharat Agro",
    site: "Bharat Agro Warehouse",
    activity: "Hose Reel Installation",
    assignedTeam: "Installation Team C",
    targetDate: "2026-10-15",
    status: "Not Started",
    priority: "Medium",
    progress: 0,
    remarks: "Waiting for installation clearance.",
  },
  {
    id: 6,
    workNo: "WP-2026-006",
    project: "Industrial Safety Upgrade",
    site: "Industrial Area, Raipur",
    activity: "Fire Pump Installation",
    assignedTeam: "Service Team",
    targetDate: "2026-10-18",
    status: "Not Started",
    priority: "Low",
    progress: 0,
    remarks: "Pump material procurement in progress.",
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

const activities = [
  "Fire Extinguisher Installation",
  "Hydrant Pipeline Installation",
  "Fire Alarm Testing",
  "Sprinkler Piping",
  "Hose Reel Installation",
  "Fire Pump Installation",
  "System Inspection",
  "Testing & Commissioning",
  "Other",
];

const teams = [
  "Installation Team A",
  "Installation Team B",
  "Installation Team C",
  "Electrical Team",
  "Service Team",
];

const emptyForm = {
  workNo: "",
  project: projects[0],
  site: "",
  activity: activities[0],
  assignedTeam: teams[0],
  targetDate: new Date().toLocaleDateString("en-CA"),
  status: "Not Started" as WorkStatus,
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
   STATUS STYLES
========================================================= */

function statusStyles(status: WorkStatus) {
  if (status === "Not Started") {
    return "bg-slate-100 text-slate-600";
  }

  if (status === "In Progress") {
    return "bg-blue-50 text-[#004890]";
  }

  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-red-50 text-red-700";
}

/* =========================================================
   STATUS ICON
========================================================= */

function StatusIcon({
  status,
}: {
  status: WorkStatus;
}) {
  if (status === "Not Started") {
    return <Clock3 size={14} />;
  }

  if (status === "In Progress") {
    return <LoaderCircle size={14} />;
  }

  if (status === "Completed") {
    return <CircleCheck size={14} />;
  }

  return <AlertTriangle size={14} />;
}

/* =========================================================
   PRIORITY STYLES
========================================================= */

function priorityStyles(priority: Priority) {
  if (priority === "High") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "Medium") {
    return "bg-orange-50 text-orange-700";
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
   PAGE
========================================================= */

export default function WorkProgressPage() {
  const [workItems, setWorkItems] =
    useState<WorkItem[]>(initialWorkItems);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [viewWork, setViewWork] =
    useState<WorkItem | null>(null);

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

  const notStartedCount = workItems.filter(
    (item) => item.status === "Not Started"
  ).length;

  const inProgressCount = workItems.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completedCount = workItems.filter(
    (item) => item.status === "Completed"
  ).length;

  const delayedCount = workItems.filter(
    (item) => item.status === "Delayed"
  ).length;

  /* =======================================================
     OVERALL PROGRESS
  ======================================================= */

  const overallProgress =
    workItems.length > 0
      ? Math.round(
          workItems.reduce(
            (sum, item) => sum + item.progress,
            0
          ) / workItems.length
        )
      : 0;

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredWorkItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return workItems.filter((item) => {
      const matchesSearch = [
        item.workNo,
        item.project,
        item.site,
        item.activity,
        item.assignedTeam,
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    workItems,
    search,
    statusFilter,
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
        ...workItems.map((item) => item.id)
      ) + 1;

    setForm({
      ...emptyForm,
      workNo: `WP-2026-${String(
        nextNumber
      ).padStart(3, "0")}`,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  function openEditModal(item: WorkItem) {
    setEditingId(item.id);

    setForm({
      workNo: item.workNo,
      project: item.project,
      site: item.site,
      activity: item.activity,
      assignedTeam: item.assignedTeam,
      targetDate: item.targetDate,
      status: item.status,
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

  function saveWork(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const workNo = form.workNo.trim();
    const site = form.site.trim();
    const progress = Number(form.progress);

    if (
      !workNo ||
      !site ||
      !form.targetDate
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

    const duplicate = workItems.some(
      (item) =>
        item.workNo.toLowerCase() ===
          workNo.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      setError(
        "This work progress number already exists."
      );
      return;
    }

    const updated: WorkItem = {
      id: editingId ?? Date.now(),
      workNo,
      project: form.project,
      site,
      activity: form.activity,
      assignedTeam: form.assignedTeam,
      targetDate: form.targetDate,
      status: form.status,
      priority: form.priority,
      progress,
      remarks: form.remarks.trim(),
    };

    if (editingId !== null) {
      setWorkItems((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? updated
            : item
        )
      );

      setNotice(
        "Work progress updated in this preview."
      );
    } else {
      setWorkItems((previous) => [
        updated,
        ...previous,
      ]);

      setNotice(
        "Work progress added to this preview."
      );
    }

    setModalOpen(false);
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function deleteWork() {
    if (deleteId === null) return;

    setWorkItems((previous) =>
      previous.filter(
        (item) => item.id !== deleteId
      )
    );

    setDeleteId(null);

    setNotice(
      "Work progress entry removed from this preview."
    );
  }

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  function exportCsv() {
    const headers = [
      "Work No",
      "Project",
      "Site",
      "Activity",
      "Assigned Team",
      "Target Date",
      "Status",
      "Priority",
      "Progress",
      "Remarks",
    ];

    const rows = filteredWorkItems.map(
      (item) => [
        item.workNo,
        item.project,
        item.site,
        item.activity,
        item.assignedTeam,
        item.targetDate,
        item.status,
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
      "work-progress-register-demo.csv";

    link.click();

    URL.revokeObjectURL(url);

    setNotice(
      "Work progress register exported."
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
              Work Progress
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor project activities, progress,
              priorities, and delayed work in one place.
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
              Add Work Progress
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
            Work progress records are sample data.
            Changes are not saved to a database or
            connected to project records.
          </p>
        </div>

        {/* =================================================
            SUCCESS NOTICE
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
              label: "Total Work Items",
              value: workItems.length,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "All",
              percentage: 100,
            },
            {
              label: "In Progress",
              value: inProgressCount,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "In Progress",
              percentage:
                workItems.length > 0
                  ? Math.round(
                      (inProgressCount /
                        workItems.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "Completed",
              value: completedCount,
              color: "#16805d",
              trackColor: "#d1fae5",
              filter: "Completed",
              percentage:
                workItems.length > 0
                  ? Math.round(
                      (completedCount /
                        workItems.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "Delayed",
              value: delayedCount,
              color: "#dc2626",
              trackColor: "#fee2e2",
              filter: "Delayed",
              percentage:
                workItems.length > 0
                  ? Math.round(
                      (delayedCount /
                        workItems.length) *
                        100
                    )
                  : 0,
            },
          ].map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() =>
                setStatusFilter(card.filter)
              }
              className={`rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md sm:p-4 ${
                statusFilter === card.filter
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
            OVERALL PROGRESS
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <div className="flex items-center gap-2">
                <Target
                  size={18}
                  className="text-[#004890]"
                />

                <h2 className="font-bold text-[#141414]">
                  Overall Work Progress
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Average completion across all active
                work items.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-3xl font-extrabold text-[#004890]">
                {overallProgress}%
              </p>

              <p className="text-xs text-slate-500">
                Overall completion
              </p>
            </div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#004890] transition-all duration-500"
              style={{
                width: `${overallProgress}%`,
              }}
            />
          </div>
        </section>

        {/* =================================================
            WORK REGISTER
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="font-bold text-[#141414]">
                Work Progress Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Track activity completion and identify
                work requiring attention.
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
                  placeholder="Search work..."
                  aria-label="Search work progress"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-52"
                />
              </div>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter by status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All statuses
                </option>

                <option value="Not Started">
                  Not Started
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Delayed">
                  Delayed
                </option>
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

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse text-left">

              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  <th className="px-5 py-4">
                    Work Item
                  </th>

                  <th className="px-4 py-4">
                    Project / Site
                  </th>

                  <th className="px-4 py-4">
                    Activity
                  </th>

                  <th className="px-4 py-4">
                    Team
                  </th>

                  <th className="px-4 py-4">
                    Target Date
                  </th>

                  <th className="px-4 py-4">
                    Progress
                  </th>

                  <th className="px-4 py-4">
                    Priority
                  </th>

                  <th className="px-4 py-4">
                    Status
                  </th>

                  <th className="px-4 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredWorkItems.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* Work number */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#004890]">
                          {item.workNo}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Work progress
                        </p>
                      </td>

                      {/* Project */}

                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-[#141414]">
                          {item.project}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} />

                          <span>
                            {item.site}
                          </span>
                        </div>
                      </td>

                      {/* Activity */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                            <ClipboardList
                              size={15}
                            />
                          </span>

                          <span className="text-sm text-slate-700">
                            {item.activity}
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

                      {/* Target date */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays
                            size={15}
                            className="text-slate-400"
                          />

                          {formatDate(
                            item.targetDate
                          )}
                        </div>
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
                              className={`h-full rounded-full transition-all ${
                                item.status ===
                                "Delayed"
                                  ? "bg-red-500"
                                  : item.status ===
                                    "Completed"
                                  ? "bg-emerald-600"
                                  : "bg-[#004890]"
                              }`}
                              style={{
                                width: `${item.progress}%`,
                              }}
                            />
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

                      {/* Status */}

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles(
                            item.status
                          )}`}
                        >
                          <StatusIcon
                            status={item.status}
                          />

                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              setViewWork(item)
                            }
                            title="View work"
                            aria-label={`View ${item.workNo}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(item)
                            }
                            title="Edit work"
                            aria-label={`Edit ${item.workNo}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(item.id)
                            }
                            title="Delete work"
                            aria-label={`Delete ${item.workNo}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  )
                )}

                {/* Empty state */}

                {filteredWorkItems.length ===
                  0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-12 text-center"
                      >
                        <ClipboardList
                          size={30}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No work items found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or filter.
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
              Showing{" "}
              {filteredWorkItems.length} of{" "}
              {workItems.length} work items
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
              aria-labelledby="work-form-title"
              className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="work-form-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null
                      ? "Edit Work Progress"
                      : "Add Work Progress"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Enter the current status and
                    progress of the work activity.
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
                onSubmit={saveWork}
                className="space-y-5 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Work number */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Work Number *
                    <input
                      required
                      maxLength={40}
                      value={form.workNo}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          workNo:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Target date */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Target Date *
                    <input
                      type="date"
                      required
                      value={form.targetDate}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          targetDate:
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

                  {/* Activity */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Work Activity *
                    <select
                      value={form.activity}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          activity:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {activities.map(
                        (activity) => (
                          <option
                            key={activity}
                            value={activity}
                          >
                            {activity}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Team */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Assigned Team *
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

                  {/* Progress */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Progress (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={form.progress}
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
                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>
                    </select>
                  </label>

                  {/* Status */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Status
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          status:
                            event.target
                              .value as WorkStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      <option value="Not Started">
                        Not Started
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Delayed">
                        Delayed
                      </option>
                    </select>
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
                      placeholder="Optional work progress remarks"
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
                      : "Add Work Progress"}
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
              aria-labelledby="work-view-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2
                    id="work-view-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    Work Progress Details
                  </h2>

                  <p className="mt-1 text-xs text-[#004890]">
                    {viewWork.workNo}
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
                    "Activity",
                    viewWork.activity,
                  ],
                  [
                    "Assigned Team",
                    viewWork.assignedTeam,
                  ],
                  [
                    "Target Date",
                    formatDate(
                      viewWork.targetDate
                    ),
                  ],
                  [
                    "Progress",
                    `${viewWork.progress}%`,
                  ],
                  [
                    "Priority",
                    viewWork.priority,
                  ],
                  [
                    "Status",
                    viewWork.status,
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

                    <span className="max-w-[65%] text-right font-medium text-[#141414]">
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
              aria-labelledby="delete-work-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2
                id="delete-work-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this work item?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the work progress entry
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
                  onClick={deleteWork}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Work
                </button>

              </div>
            </section>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}