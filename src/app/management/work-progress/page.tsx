
"use client";

import { useMemo, useState } from "react";
import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";
import {
  Search,
  Download,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderKanban,
  MapPin,
  CalendarDays,
  Users,
  Eye,
  X,
  Activity,
  ClipboardList,
} from "lucide-react";

type ProgressStatus =
  | "On Track"
  | "Delayed"
  | "Completed"
  | "At Risk";

type WorkItem = {
  id: string;
  projectId: string;
  projectName: string;
  client: string;
  location: string;
  activity: string;
  team: string;
  startDate: string;
  dueDate: string;
  progress: number;
  status: ProgressStatus;
  completedTasks: number;
  totalTasks: number;
  remarks: string;
};

const initialWorkItems: WorkItem[] = [
  {
    id: "WP-001",
    projectId: "FW-001",
    projectName: "Corporate Tower",
    client: "ABC Infrastructure",
    location: "Raipur",
    activity: "Fire Extinguisher Installation",
    team: "Installation Team A",
    startDate: "2026-10-01",
    dueDate: "2026-10-20",
    progress: 75,
    status: "On Track",
    completedTasks: 15,
    totalTasks: 20,
    remarks: "Installation is progressing as planned.",
  },
  {
    id: "WP-002",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    client: "Tech Park Developers",
    location: "Bhilai",
    activity: "Fire Alarm System",
    team: "Electrical Team",
    startDate: "2026-09-20",
    dueDate: "2026-10-12",
    progress: 55,
    status: "Delayed",
    completedTasks: 11,
    totalTasks: 20,
    remarks: "Pending cable delivery is affecting progress.",
  },
  {
    id: "WP-003",
    projectId: "FW-003",
    projectName: "Hospital Project",
    client: "Healthcare Group",
    location: "Raipur",
    activity: "Sprinkler System Installation",
    team: "Installation Team B",
    startDate: "2026-10-03",
    dueDate: "2026-10-25",
    progress: 40,
    status: "On Track",
    completedTasks: 8,
    totalTasks: 20,
    remarks: "Pipe installation and fitting are in progress.",
  },
  {
    id: "WP-004",
    projectId: "FW-004",
    projectName: "Shopping Mall",
    client: "City Mall Group",
    location: "Durg",
    activity: "Fire Hydrant System",
    team: "Hydrant Team",
    startDate: "2026-09-15",
    dueDate: "2026-10-10",
    progress: 65,
    status: "At Risk",
    completedTasks: 13,
    totalTasks: 20,
    remarks: "Pressure testing and final inspection remain.",
  },
  {
    id: "WP-005",
    projectId: "FW-005",
    projectName: "Manufacturing Unit",
    client: "Industrial Solutions",
    location: "Raipur",
    activity: "Fire Safety Inspection",
    team: "Inspection Team",
    startDate: "2026-09-10",
    dueDate: "2026-10-05",
    progress: 100,
    status: "Completed",
    completedTasks: 20,
    totalTasks: 20,
    remarks: "Inspection completed. Final report prepared.",
  },
  {
    id: "WP-006",
    projectId: "FW-006",
    projectName: "Office Complex",
    client: "Business Square",
    location: "Bhilai",
    activity: "Alarm Testing and Commissioning",
    team: "Testing Team",
    startDate: "2026-10-05",
    dueDate: "2026-10-22",
    progress: 30,
    status: "On Track",
    completedTasks: 6,
    totalTasks: 20,
    remarks: "Device testing is underway.",
  },
  {
    id: "WP-007",
    projectId: "FW-007",
    projectName: "Warehouse Project",
    client: "Logistics India",
    location: "Durg",
    activity: "Fire Extinguisher Refilling",
    team: "Service Team",
    startDate: "2026-10-01",
    dueDate: "2026-10-18",
    progress: 85,
    status: "On Track",
    completedTasks: 17,
    totalTasks: 20,
    remarks: "Most extinguishers have been serviced.",
  },
  {
    id: "WP-008",
    projectId: "FW-008",
    projectName: "Residential Complex",
    client: "Green Homes",
    location: "Raipur",
    activity: "Fire Safety Handover",
    team: "Handover Team",
    startDate: "2026-09-18",
    dueDate: "2026-10-08",
    progress: 45,
    status: "Delayed",
    completedTasks: 9,
    totalTasks: 20,
    remarks: "Final documentation and client sign-off are pending.",
  },
];

const statusStyles: Record<ProgressStatus, string> = {
  "On Track": "bg-green-50 text-green-700 border-green-200",
  Delayed: "bg-red-50 text-red-700 border-red-200",
  Completed: "bg-blue-50 text-[#004890] border-blue-200",
  "At Risk": "bg-orange-50 text-[#b85a00] border-orange-200",
};

function ProgressBar({ value }: { value: number }) {
  const color =
    value === 100
      ? "bg-green-500"
      : value < 50
        ? "bg-orange-500"
        : "bg-[#004890]";

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-[#141414]">
          {value}%
        </span>
        <span className="text-xs text-gray-500">Complete</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-label="Work completion"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number | string;
  subtitle: string;
  icon: typeof Activity;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#141414]">
            {value}
          </h3>
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function ManagementWorkProgressPage() {
  const [workItems] = useState<WorkItem[]>(initialWorkItems);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const locations = useMemo(
    () => Array.from(new Set(workItems.map((item) => item.location))),
    [workItems]
  );

  const summary = useMemo(() => {
    const total = workItems.length;
    const completed = workItems.filter(
      (item) => item.status === "Completed"
    ).length;
    const delayed = workItems.filter(
      (item) => item.status === "Delayed"
    ).length;
    const atRisk = workItems.filter(
      (item) => item.status === "At Risk"
    ).length;

    const averageProgress =
      total === 0
        ? 0
        : Math.round(
            workItems.reduce((sum, item) => sum + item.progress, 0) / total
          );

    return {
      total,
      completed,
      delayed,
      atRisk,
      averageProgress,
    };
  }, [workItems]);

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase().trim();

    return workItems.filter((item) => {
      const matchesSearch =
        !term ||
        item.id.toLowerCase().includes(term) ||
        item.projectId.toLowerCase().includes(term) ||
        item.projectName.toLowerCase().includes(term) ||
        item.client.toLowerCase().includes(term) ||
        item.activity.toLowerCase().includes(term) ||
        item.team.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesLocation =
        locationFilter === "All" || item.location === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [workItems, search, statusFilter, locationFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function exportCSV() {
    const headers = [
      "Work ID",
      "Project ID",
      "Project Name",
      "Client",
      "Location",
      "Activity",
      "Team",
      "Start Date",
      "Due Date",
      "Progress",
      "Completed Tasks",
      "Total Tasks",
      "Status",
      "Remarks",
    ];

    const rows = filteredItems.map((item) => [
      item.id,
      item.projectId,
      item.projectName,
      item.client,
      item.location,
      item.activity,
      item.team,
      item.startDate,
      item.dueDate,
      `${item.progress}%`,
      item.completedTasks,
      item.totalTasks,
      item.status,
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
    link.download = "fire-wala-work-progress.csv";
    link.click();

    URL.revokeObjectURL(url);
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
              <span className="text-[#004890]">Work Progress</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              Work Progress
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor execution, installation activities, project completion,
              and delivery risks.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
          >
            <Download size={17} />
            Export Report
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Activities"
            value={summary.total}
            subtitle="Activities across projects"
            icon={ClipboardList}
            iconClass="bg-blue-50 text-[#004890]"
          />

          <SummaryCard
            title="Average Progress"
            value={`${summary.averageProgress}%`}
            subtitle="Average completion of listed activities"
            icon={TrendingUp}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <SummaryCard
            title="Completed"
            value={summary.completed}
            subtitle="Activities marked completed"
            icon={CheckCircle2}
            iconClass="bg-green-50 text-green-700"
          />

          <SummaryCard
            title="Delayed / At Risk"
            value={summary.delayed + summary.atRisk}
            subtitle={`${summary.delayed} delayed · ${summary.atRisk} at risk`}
            icon={AlertTriangle}
            iconClass="bg-orange-50 text-[#e87010]"
          />
        </div>

        {/* Overall progress and attention panel */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-[#004890]" />
              <h2 className="font-semibold text-[#141414]">
                Overall Execution Progress
              </h2>
            </div>

            <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#004890 ${summary.averageProgress * 3.6}deg, #e5e7eb 0deg)`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold text-[#004890]">
                    {summary.averageProgress}%
                  </span>
                  <span className="text-xs text-gray-500">Average</span>
                </div>
              </div>

              <div className="w-full flex-1 space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">Completed activities</span>
                    <span className="font-semibold text-green-700">
                      {summary.completed} / {summary.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${summary.total ? (summary.completed / summary.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">Delayed activities</span>
                    <span className="font-semibold text-red-600">
                      {summary.delayed} / {summary.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{
                        width: `${summary.total ? (summary.delayed / summary.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">At-risk activities</span>
                    <span className="font-semibold text-orange-700">
                      {summary.atRisk} / {summary.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[#e87010]"
                      style={{
                        width: `${summary.total ? (summary.atRisk / summary.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle size={20} />
              <h2 className="font-semibold">Management Attention</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-orange-900">
              {summary.delayed + summary.atRisk} activities are delayed or at
              risk. Review their remarks, upcoming deadlines, and team
              responsibilities.
            </p>

            <button
              onClick={() => {
                setStatusFilter("Delayed");
                setLocationFilter("All");
                setSearch("");
                setPage(1);
              }}
              className="mt-4 text-sm font-semibold text-orange-800 hover:underline"
            >
              View delayed activities →
            </button>

            <button
              onClick={() => {
                setStatusFilter("At Risk");
                setLocationFilter("All");
                setSearch("");
                setPage(1);
              }}
              className="mt-3 block text-sm font-semibold text-orange-800 hover:underline"
            >
              View at-risk activities →
            </button>
          </div>
        </div>

        {/* Project-wise progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <FolderKanban size={20} className="text-[#004890]" />
            <h2 className="text-lg font-semibold text-[#141414]">
              Project-wise Progress
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Review completion levels and statuses for individual activities.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {workItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#141414]">
                      {item.projectName}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.projectId} · {item.activity}
                    </p>
                  </div>

                  <span
                    className={`whitespace-nowrap rounded-full border px-2 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-5">
                  <ProgressBar value={item.progress} />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {item.team}
                  </span>

                  <button
                    onClick={() => setSelectedWork(item)}
                    className="font-semibold text-[#004890] hover:underline"
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work progress table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-[#141414]">
              Activity Progress Register
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search and filter execution activities across all projects.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative md:col-span-1">
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
                  placeholder="Search project, team, activity..."
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
                <option value="On Track">On Track</option>
                <option value="Delayed">Delayed</option>
                <option value="At Risk">At Risk</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => {
                  setLocationFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Project / Activity</th>
                  <th className="px-5 py-4 font-semibold">Responsible Team</th>
                  <th className="px-5 py-4 font-semibold">Progress</th>
                  <th className="px-5 py-4 font-semibold">Tasks</th>
                  <th className="px-5 py-4 font-semibold">Due Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#141414]">
                        {item.projectName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.id} · {item.activity}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.client}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700">{item.team}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} />
                        {item.location}
                      </p>
                    </td>

                    <td className="w-48 px-5 py-4">
                      <ProgressBar value={item.progress} />
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.completedTasks}/{item.totalTasks}
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 whitespace-nowrap text-gray-700">
                        <CalendarDays size={14} className="text-gray-400" />
                        {new Date(item.dueDate + "T00:00:00").toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedWork(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      No activities match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredItems.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredItems.length)} of{" "}
              {filteredItems.length} activities
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

      {/* Activity details modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                  {selectedWork.id} · {selectedWork.projectId}
                </p>
                <h2
                  id="work-modal-title"
                  className="mt-1 text-lg font-bold text-[#141414]"
                >
                  {selectedWork.activity}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedWork.projectName}
                </p>
              </div>

              <button
                onClick={() => setSelectedWork(null)}
                aria-label="Close activity details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <ProgressBar value={selectedWork.progress} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Client</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedWork.client}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Responsible Team</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedWork.team}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedWork.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span
                    className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedWork.status]}`}
                  >
                    {selectedWork.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedWork.startDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Target Completion</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedWork.dueDate}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Task Completion
                </p>
                <p className="mt-2 text-lg font-bold text-[#141414]">
                  {selectedWork.completedTasks} of {selectedWork.totalTasks} tasks
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedWork.totalTasks - selectedWork.completedTasks} tasks
                  remaining
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#141414]">
                  Latest Remarks
                </p>
                <p className="mt-2 rounded-lg border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                  {selectedWork.remarks}
                </p>
              </div>

              {selectedWork.status === "Delayed" ||
              selectedWork.status === "At Risk" ? (
                <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                  <p>
                    Management should review the activity, identify blockers,
                    and coordinate with the responsible team.
                  </p>
                </div>
              ) : null}

              <button
                onClick={() => setSelectedWork(null)}
                className="w-full rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
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
