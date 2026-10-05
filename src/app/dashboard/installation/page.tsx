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
  ClipboardCheck,
  Clock3,
  CircleCheck,
  LoaderCircle,
  AlertTriangle,
  MapPin,
  UserRound,
  CalendarDays,
  Wrench,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type InstallationStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "On Hold";

type InstallationEntry = {
  id: number;
  installationNo: string;
  project: string;
  site: string;
  system: string;
  team: string;
  scheduledDate: string;
  status: InstallationStatus;
  progress: number;
  remarks: string;
};

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialInstallations: InstallationEntry[] = [
  {
    id: 1,
    installationNo: "INST-2026-001",
    project: "Bharat Agro",
    site: "Bharat Agro Plant, Raipur",
    system: "Fire Extinguisher System",
    team: "Installation Team A",
    scheduledDate: "2026-10-06",
    status: "In Progress",
    progress: 65,
    remarks: "Extinguisher installation underway.",
  },
  {
    id: 2,
    installationNo: "INST-2026-002",
    project: "Shree Cement Fire System",
    site: "Shree Cement, Baloda Bazar",
    system: "Hydrant System",
    team: "Installation Team B",
    scheduledDate: "2026-10-07",
    status: "Scheduled",
    progress: 0,
    remarks: "Material received. Installation scheduled.",
  },
  {
    id: 3,
    installationNo: "INST-2026-003",
    project: "City Hospital Safety Upgrade",
    site: "City Hospital, Raipur",
    system: "Fire Alarm System",
    team: "Electrical Team",
    scheduledDate: "2026-10-02",
    status: "Completed",
    progress: 100,
    remarks: "Testing completed successfully.",
  },
  {
    id: 4,
    installationNo: "INST-2026-004",
    project: "North Plaza Sprinkler",
    site: "North Plaza Mall",
    system: "Sprinkler System",
    team: "Installation Team A",
    scheduledDate: "2026-10-04",
    status: "In Progress",
    progress: 40,
    remarks: "Piping work in progress.",
  },
  {
    id: 5,
    installationNo: "INST-2026-005",
    project: "Bharat Agro",
    site: "Bharat Agro Warehouse",
    system: "Fire Hydrant & Hose Reel",
    team: "Installation Team C",
    scheduledDate: "2026-10-08",
    status: "On Hold",
    progress: 25,
    remarks: "Work waiting for site clearance.",
  },
];

/* =========================================================
   DROPDOWN OPTIONS
========================================================= */

const projects = [
  "Bharat Agro",
  "Shree Cement Fire System",
  "City Hospital Safety Upgrade",
  "North Plaza Sprinkler",
  "Other",
];

const systems = [
  "Fire Extinguisher System",
  "Hydrant System",
  "Fire Alarm System",
  "Sprinkler System",
  "Fire Hydrant & Hose Reel",
  "Fire Pump System",
  "Other",
];

const teams = [
  "Installation Team A",
  "Installation Team B",
  "Installation Team C",
  "Electrical Team",
  "Service Team",
];

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm = {
  installationNo: "",
  project: projects[0],
  site: "",
  system: systems[0],
  team: teams[0],
  scheduledDate: new Date().toLocaleDateString("en-CA"),
  status: "Scheduled" as InstallationStatus,
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
   STATUS STYLES
========================================================= */

function statusStyles(status: InstallationStatus) {
  if (status === "Scheduled") {
    return "bg-blue-50 text-[#004890]";
  }

  if (status === "In Progress") {
    return "bg-orange-50 text-[#c45b08]";
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
  status: InstallationStatus;
}) {
  if (status === "Scheduled") {
    return <Clock3 size={15} />;
  }

  if (status === "In Progress") {
    return <LoaderCircle size={15} />;
  }

  if (status === "Completed") {
    return <CircleCheck size={15} />;
  }

  return <AlertTriangle size={15} />;
}

/* =========================================================
   PAGE
========================================================= */

export default function InstallationPage() {
  const [installations, setInstallations] = useState<
    InstallationEntry[]
  >(initialInstallations);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewInstallation, setViewInstallation] =
    useState<InstallationEntry | null>(null);

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [deleteId, setDeleteId] = useState<number | null>(
    null
  );

  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  /* =======================================================
     COUNTS
  ======================================================= */

  const scheduledCount = installations.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const inProgressCount = installations.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completedCount = installations.filter(
    (item) => item.status === "Completed"
  ).length;

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredInstallations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return installations.filter((item) => {
      const matchesSearch = [
        item.installationNo,
        item.project,
        item.site,
        item.system,
        item.team,
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [installations, search, statusFilter]);

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  function openAddModal() {
    setEditingId(null);

    setForm({
      ...emptyForm,
      installationNo: `INST-2026-${String(
        Math.max(
          0,
          ...installations.map((item) => item.id)
        ) + 1
      ).padStart(3, "0")}`,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  function openEditModal(
    installation: InstallationEntry
  ) {
    setEditingId(installation.id);

    setForm({
      installationNo: installation.installationNo,
      project: installation.project,
      site: installation.site,
      system: installation.system,
      team: installation.team,
      scheduledDate: installation.scheduledDate,
      status: installation.status,
      progress: String(installation.progress),
      remarks: installation.remarks,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     SAVE INSTALLATION
  ======================================================= */

  function saveInstallation(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const installationNo =
      form.installationNo.trim();

    const site = form.site.trim();

    const progress = Number(form.progress);

    if (
      !installationNo ||
      !site ||
      !form.scheduledDate
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

    const duplicate = installations.some(
      (item) =>
        item.installationNo.toLowerCase() ===
          installationNo.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      setError(
        "This installation number already exists."
      );
      return;
    }

    const updated: InstallationEntry = {
      id: editingId ?? Date.now(),
      installationNo,
      project: form.project,
      site,
      system: form.system,
      team: form.team,
      scheduledDate: form.scheduledDate,
      status: form.status,
      progress,
      remarks: form.remarks.trim(),
    };

    if (editingId !== null) {
      setInstallations((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? updated
            : item
        )
      );

      setNotice(
        "Installation entry updated in this preview."
      );
    } else {
      setInstallations((previous) => [
        updated,
        ...previous,
      ]);

      setNotice(
        "Installation entry added to this preview."
      );
    }

    setModalOpen(false);
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function deleteInstallation() {
    if (deleteId === null) return;

    setInstallations((previous) =>
      previous.filter(
        (item) => item.id !== deleteId
      )
    );

    setDeleteId(null);

    setNotice(
      "Installation entry removed from this preview."
    );
  }

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  function exportCsv() {
    const headers = [
      "Installation No",
      "Project",
      "Site",
      "System",
      "Team",
      "Scheduled Date",
      "Status",
      "Progress",
      "Remarks",
    ];

    const rows = filteredInstallations.map(
      (item) => [
        item.installationNo,
        item.project,
        item.site,
        item.system,
        item.team,
        item.scheduledDate,
        item.status,
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
      "installation-register-demo.csv";

    link.click();

    URL.revokeObjectURL(url);

    setNotice(
      "Installation register exported."
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
              Installation Entry
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Schedule, track, and manage installation
              activities across projects and sites.
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
              Add Installation
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
            Installation records are sample data.
            Changes are not saved to a database or
            connected to project data.
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
              label: "Total Entries",
              value: installations.length,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "All",
              percentage: 100,
            },
            {
              label: "Scheduled",
              value: scheduledCount,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "Scheduled",
              percentage:
                installations.length > 0
                  ? Math.round(
                      (scheduledCount /
                        installations.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "In Progress",
              value: inProgressCount,
              color: "#e87010",
              trackColor: "#ffedd5",
              filter: "In Progress",
              percentage:
                installations.length > 0
                  ? Math.round(
                      (inProgressCount /
                        installations.length) *
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
                installations.length > 0
                  ? Math.round(
                      (completedCount /
                        installations.length) *
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
                    Click to filter entries
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
            INSTALLATION REGISTER
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Register header */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="font-bold text-[#141414]">
                Installation Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search, inspect, and manage installation
                activities.
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
                  placeholder="Search installations..."
                  aria-label="Search installations"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-56"
                />
              </div>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter by installation status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All statuses
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="On Hold">
                  On Hold
                </option>
              </select>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse text-left">

              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  <th className="px-5 py-4">
                    Installation
                  </th>

                  <th className="px-4 py-4">
                    Project / Site
                  </th>

                  <th className="px-4 py-4">
                    System
                  </th>

                  <th className="px-4 py-4">
                    Team
                  </th>

                  <th className="px-4 py-4">
                    Scheduled
                  </th>

                  <th className="px-4 py-4">
                    Progress
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
                {filteredInstallations.map(
                  (installation) => (
                    <tr
                      key={installation.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* Installation */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#004890]">
                          {
                            installation.installationNo
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Installation entry
                        </p>
                      </td>

                      {/* Project / Site */}

                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-[#141414]">
                          {installation.project}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} />

                          <span>
                            {installation.site}
                          </span>
                        </div>
                      </td>

                      {/* System */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                            <Wrench size={15} />
                          </span>

                          <span className="text-sm text-slate-700">
                            {installation.system}
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

                          {installation.team}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays
                            size={15}
                            className="text-slate-400"
                          />

                          {formatDate(
                            installation.scheduledDate
                          )}
                        </div>
                      </td>

                      {/* Progress */}

                      <td className="px-4 py-4">
                        <div className="w-28">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-600">
                              {
                                installation.progress
                              }
                              %
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#004890] transition-all"
                              style={{
                                width: `${installation.progress}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles(
                            installation.status
                          )}`}
                        >
                          <StatusIcon
                            status={
                              installation.status
                            }
                          />

                          {installation.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              setViewInstallation(
                                installation
                              )
                            }
                            title="View installation"
                            aria-label={`View ${installation.installationNo}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                installation
                              )
                            }
                            title="Edit installation"
                            aria-label={`Edit ${installation.installationNo}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(
                                installation.id
                              )
                            }
                            title="Delete installation"
                            aria-label={`Delete ${installation.installationNo}`}
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

                {filteredInstallations.length ===
                  0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center"
                      >
                        <ClipboardCheck
                          size={30}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No installation entries
                          found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search term or
                          status.
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
              {filteredInstallations.length} of{" "}
              {installations.length} installation
              entries
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
              aria-labelledby="installation-form-title"
              className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            >

              {/* Modal header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="installation-form-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null
                      ? "Edit Installation Entry"
                      : "Add Installation Entry"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Complete the details for this
                    sample installation record.
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
                onSubmit={saveInstallation}
                className="space-y-5 p-5 sm:p-6"
              >

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Installation number */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Installation Number *
                    <input
                      required
                      maxLength={40}
                      value={
                        form.installationNo
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          installationNo:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Scheduled date */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Scheduled Date *
                    <input
                      type="date"
                      required
                      value={
                        form.scheduledDate
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          scheduledDate:
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
                      placeholder="Enter installation site"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* System */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Installation System *
                    <select
                      value={form.system}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          system:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {systems.map(
                        (system) => (
                          <option
                            key={system}
                            value={system}
                          >
                            {system}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Team */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Assigned Team *
                    <select
                      value={form.team}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          team: event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {teams.map(
                        (team) => (
                          <option
                            key={team}
                            value={team}
                          >
                            {team}
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
                              .value as InstallationStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      <option value="Scheduled">
                        Scheduled
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="On Hold">
                        On Hold
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
                      placeholder="Optional installation remarks"
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

                {/* Buttons */}

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
                      : "Add Installation"}
                  </button>

                </div>
              </form>
            </section>
          </div>
        )}

        {/* =================================================
            VIEW MODAL
        ================================================= */}

        {viewInstallation && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setViewInstallation(null);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="installation-view-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2
                    id="installation-view-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    Installation Details
                  </h2>

                  <p className="mt-1 text-xs text-[#004890]">
                    {
                      viewInstallation.installationNo
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setViewInstallation(null)
                  }
                  aria-label="Close details"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Details */}

              <div className="space-y-4 p-5">

                {[
                  [
                    "Project",
                    viewInstallation.project,
                  ],
                  [
                    "Site",
                    viewInstallation.site,
                  ],
                  [
                    "System",
                    viewInstallation.system,
                  ],
                  [
                    "Assigned Team",
                    viewInstallation.team,
                  ],
                  [
                    "Scheduled Date",
                    formatDate(
                      viewInstallation.scheduledDate
                    ),
                  ],
                  [
                    "Progress",
                    `${viewInstallation.progress}%`,
                  ],
                  [
                    "Status",
                    viewInstallation.status,
                  ],
                  [
                    "Remarks",
                    viewInstallation.remarks ||
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

              {/* Footer */}

              <div className="flex justify-end border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() =>
                    setViewInstallation(null)
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
              aria-labelledby="delete-installation-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2
                id="delete-installation-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this installation?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the installation entry
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
                  onClick={deleteInstallation}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Installation
                </button>

              </div>
            </section>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}