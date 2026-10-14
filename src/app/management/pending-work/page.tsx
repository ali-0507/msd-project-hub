
"use client";

import { useMemo, useState } from "react";
import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";
import {
  Search,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  CalendarDays,
  MapPin,
  Users,
  Eye,
  X,
  Flag,
  FolderKanban,
  Timer,
} from "lucide-react";

type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "Pending" | "In Progress" | "Blocked";

type PendingTask = {
  id: string;
  projectId: string;
  projectName: string;
  client: string;
  task: string;
  category: string;
  assignedTeam: string;
  location: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  remarks: string;
};

const initialTasks: PendingTask[] = [
  {
    id: "PW-001",
    projectId: "FW-001",
    projectName: "Corporate Tower",
    client: "ABC Infrastructure",
    task: "Complete fire extinguisher installation",
    category: "Installation",
    assignedTeam: "Installation Team A",
    location: "Raipur",
    dueDate: "2026-10-20",
    priority: "High",
    status: "In Progress",
    remarks: "Installation is underway. Remaining units need to be mounted and inspected.",
  },
  {
    id: "PW-002",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    client: "Tech Park Developers",
    task: "Arrange fire alarm cable delivery",
    category: "Material",
    assignedTeam: "Store Team",
    location: "Bhilai",
    dueDate: "2026-10-12",
    priority: "High",
    status: "Blocked",
    remarks: "Cable delivery is pending. Coordinate with the supplier and site team.",
  },
  {
    id: "PW-003",
    projectId: "FW-003",
    projectName: "Hospital Project",
    client: "Healthcare Group",
    task: "Complete sprinkler pipe fitting",
    category: "Installation",
    assignedTeam: "Installation Team B",
    location: "Raipur",
    dueDate: "2026-10-25",
    priority: "Medium",
    status: "In Progress",
    remarks: "Pipe fitting is progressing according to the site schedule.",
  },
  {
    id: "PW-004",
    projectId: "FW-004",
    projectName: "Shopping Mall",
    client: "City Mall Group",
    task: "Conduct hydrant pressure testing",
    category: "Testing",
    assignedTeam: "Hydrant Team",
    location: "Durg",
    dueDate: "2026-10-10",
    priority: "High",
    status: "Pending",
    remarks: "Pressure testing must be completed before final inspection.",
  },
  {
    id: "PW-005",
    projectId: "FW-005",
    projectName: "Manufacturing Unit",
    client: "Industrial Solutions",
    task: "Submit inspection report",
    category: "Documentation",
    assignedTeam: "Inspection Team",
    location: "Raipur",
    dueDate: "2026-10-16",
    priority: "Medium",
    status: "In Progress",
    remarks: "Report preparation is in progress.",
  },
  {
    id: "PW-006",
    projectId: "FW-006",
    projectName: "Office Complex",
    client: "Business Square",
    task: "Test fire alarm control panel",
    category: "Testing",
    assignedTeam: "Testing Team",
    location: "Bhilai",
    dueDate: "2026-10-22",
    priority: "Medium",
    status: "Pending",
    remarks: "Testing is scheduled after installation verification.",
  },
  {
    id: "PW-007",
    projectId: "FW-007",
    projectName: "Warehouse Project",
    client: "Logistics India",
    task: "Complete extinguisher refilling",
    category: "Servicing",
    assignedTeam: "Service Team",
    location: "Durg",
    dueDate: "2026-10-18",
    priority: "Low",
    status: "In Progress",
    remarks: "Most units have been refilled. The remaining units need servicing.",
  },
  {
    id: "PW-008",
    projectId: "FW-008",
    projectName: "Residential Complex",
    client: "Green Homes",
    task: "Obtain client handover sign-off",
    category: "Handover",
    assignedTeam: "Handover Team",
    location: "Raipur",
    dueDate: "2026-10-08",
    priority: "High",
    status: "Blocked",
    remarks: "Final documentation and client confirmation are pending.",
  },
  {
    id: "PW-009",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    client: "Tech Park Developers",
    task: "Verify installation material quantities",
    category: "Material",
    assignedTeam: "Store Team",
    location: "Bhilai",
    dueDate: "2026-10-19",
    priority: "Low",
    status: "Pending",
    remarks: "Reconcile the issued material quantities with the site records.",
  },
  {
    id: "PW-010",
    projectId: "FW-003",
    projectName: "Hospital Project",
    client: "Healthcare Group",
    task: "Submit installation photographs",
    category: "Documentation",
    assignedTeam: "Installation Team B",
    location: "Raipur",
    dueDate: "2026-10-17",
    priority: "Medium",
    status: "Pending",
    remarks: "Upload installation photographs for management review.",
  },
];

const priorityStyles: Record<TaskPriority, string> = {
  High: "border-red-200 bg-red-50 text-red-700",
  Medium: "border-orange-200 bg-orange-50 text-orange-700",
  Low: "border-blue-200 bg-blue-50 text-[#004890]",
};

const statusStyles: Record<TaskStatus, string> = {
  Pending: "border-gray-200 bg-gray-100 text-gray-700",
  "In Progress": "border-blue-200 bg-blue-50 text-[#004890]",
  Blocked: "border-red-200 bg-red-50 text-red-700",
};

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
  icon: typeof ClipboardList;
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

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysOverdue(dueDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${dueDate}T00:00:00`);
  return Math.max(
    0,
    Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
  );
}

function isOverdue(task: PendingTask) {
  return task.status !== "Blocked" || task.status === "Blocked"
    ? getDaysOverdue(task.dueDate) > 0
    : false;
}

export default function ManagementPendingWorkPage() {
  const [tasks] = useState<PendingTask[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState<PendingTask | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

 
const locations = useMemo(
  () => Array.from(new Set(tasks.map((task) => task.location))),
  [tasks]
);


  const summary = useMemo(() => {
    const overdue = tasks.filter(isOverdue).length;
    const highPriority = tasks.filter(
      (task) => task.priority === "High"
    ).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const soon = tasks.filter((task) => {
      const due = new Date(`${task.dueDate}T00:00:00`);
      const days = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      return days >= 0 && days <= 3;
    }).length;

    return {
      total: tasks.length,
      overdue,
      highPriority,
      dueSoon: soon,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const term = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !term ||
        task.id.toLowerCase().includes(term) ||
        task.projectId.toLowerCase().includes(term) ||
        task.projectName.toLowerCase().includes(term) ||
        task.client.toLowerCase().includes(term) ||
        task.task.toLowerCase().includes(term) ||
        task.assignedTeam.toLowerCase().includes(term);

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesLocation =
        locationFilter === "All" || task.location === locationFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesLocation
      );
    });
  }, [tasks, search, priorityFilter, statusFilter, locationFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function exportCSV() {
    const headers = [
      "Task ID",
      "Project ID",
      "Project",
      "Client",
      "Task",
      "Category",
      "Assigned Team",
      "Location",
      "Due Date",
      "Days Overdue",
      "Priority",
      "Status",
      "Remarks",
    ];

    const rows = filteredTasks.map((task) => [
      task.id,
      task.projectId,
      task.projectName,
      task.client,
      task.task,
      task.category,
      task.assignedTeam,
      task.location,
      task.dueDate,
      isOverdue(task) ? getDaysOverdue(task.dueDate) : 0,
      task.priority,
      task.status,
      task.remarks,
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
    link.download = "fire-wala-pending-work.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function filterByPriority(priority: string) {
    setPriorityFilter(priority);
    setStatusFilter("All");
    setLocationFilter("All");
    setSearch("");
    setPage(1);
  }

  function filterByStatus(status: string) {
    setStatusFilter(status);
    setPriorityFilter("All");
    setLocationFilter("All");
    setSearch("");
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
              <span className="text-[#004890]">Pending Work</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              Pending Work
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track unfinished activities, deadlines, priorities, and
              responsibility across projects.
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
            title="Total Pending Tasks"
            value={summary.total}
            subtitle="Tasks requiring follow-up"
            icon={ClipboardList}
            iconClass="bg-blue-50 text-[#004890]"
          />

          <SummaryCard
            title="Overdue Tasks"
            value={summary.overdue}
            subtitle="Past their due date"
            icon={AlertTriangle}
            iconClass="bg-red-50 text-red-600"
          />

          <SummaryCard
            title="High Priority"
            value={summary.highPriority}
            subtitle="Tasks requiring attention"
            icon={Flag}
            iconClass="bg-orange-50 text-[#e87010]"
          />

          <SummaryCard
            title="Due Within 3 Days"
            value={summary.dueSoon}
            subtitle="Upcoming deadlines"
            icon={Timer}
            iconClass="bg-indigo-50 text-indigo-600"
          />
        </div>

        {/* Attention panel */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <FolderKanban size={20} className="text-[#004890]" />
              <h2 className="font-semibold text-[#141414]">
                Pending Work Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Use the quick filters to focus on tasks needing action.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => filterByStatus("Pending")}
                className="rounded-lg border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
              >
                <p className="text-sm text-gray-500">Not Started</p>
                <p className="mt-2 text-2xl font-bold text-[#004890]">
                  {tasks.filter((task) => task.status === "Pending").length}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Pending activities
                </p>
              </button>

              <button
                onClick={() => filterByStatus("In Progress")}
                className="rounded-lg border border-gray-200 p-4 text-left transition hover:border-orange-300 hover:bg-orange-50"
              >
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="mt-2 text-2xl font-bold text-[#e87010]">
                  {tasks.filter((task) => task.status === "In Progress").length}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Currently being worked on
                </p>
              </button>

              <button
                onClick={() => filterByStatus("Blocked")}
                className="rounded-lg border border-gray-200 p-4 text-left transition hover:border-red-300 hover:bg-red-50"
              >
                <p className="text-sm text-gray-500">Blocked</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {tasks.filter((task) => task.status === "Blocked").length}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Need issue resolution
                </p>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle size={20} />
              <h2 className="font-semibold">Priority Attention</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-orange-900">
              Review high-priority tasks and overdue activities. Coordinate
              with the responsible team to resolve blockers and update
              deadlines where necessary.
            </p>

            <button
              onClick={() => filterByPriority("High")}
              className="mt-4 text-sm font-semibold text-orange-800 hover:underline"
            >
              View high-priority tasks →
            </button>

            <button
              onClick={() => {
                setPriorityFilter("All");
                setStatusFilter("All");
                setLocationFilter("All");
                setSearch("");
                setPage(1);
              }}
              className="mt-3 block text-sm font-semibold text-orange-800 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Pending tasks table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-[#141414]">
              Pending Work Register
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search, filter, and review tasks assigned to project teams.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
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
                  placeholder="Search task, project, team..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                />
              </div>

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
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
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
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Task / Project</th>
                  <th className="px-5 py-4 font-semibold">Assigned Team</th>
                  <th className="px-5 py-4 font-semibold">Priority</th>
                  <th className="px-5 py-4 font-semibold">Due Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Delay</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedTasks.map((task) => {
                  const overdue = isOverdue(task);
                  const daysOverdue = getDaysOverdue(task.dueDate);

                  return (
                    <tr
                      key={task.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#141414]">
                          {task.task}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {task.id} · {task.projectId}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {task.projectName}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-1.5 font-medium text-gray-700">
                          <Users size={14} className="text-gray-400" />
                          {task.assignedTeam}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={12} />
                          {task.location}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
                        >
                          <Flag size={12} />
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-1.5 whitespace-nowrap text-gray-700">
                          <CalendarDays size={14} className="text-gray-400" />
                          {formatDate(task.dueDate)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {overdue ? (
                          <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-red-600">
                            <Clock size={14} />
                            {daysOverdue} day{daysOverdue === 1 ? "" : "s"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {task.status === "Blocked"
                              ? "Needs attention"
                              : "Not overdue"}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {paginatedTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      <ClipboardList
                        size={30}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      No tasks match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredTasks.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredTasks.length)} of{" "}
              {filteredTasks.length} tasks
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

      {/* Task details modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedTask(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pending-task-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                  {selectedTask.id} · {selectedTask.projectId}
                </p>
                <h2
                  id="pending-task-title"
                  className="mt-1 text-lg font-bold text-[#141414]"
                >
                  {selectedTask.task}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedTask.projectName}
                </p>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                aria-label="Close task details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[selectedTask.priority]}`}
                >
                  {selectedTask.priority} Priority
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedTask.status]}`}
                >
                  {selectedTask.status}
                </span>

                {isOverdue(selectedTask) && (
                  <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                    {getDaysOverdue(selectedTask.dueDate)} days overdue
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Client</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTask.client}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTask.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Assigned Team</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTask.assignedTeam}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTask.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {formatDate(selectedTask.dueDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Project ID</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTask.projectId}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#141414]">
                  Latest Remarks
                </p>
                <p className="mt-2 rounded-lg border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                  {selectedTask.remarks}
                </p>
              </div>

              {isOverdue(selectedTask) ||
              selectedTask.status === "Blocked" ? (
                <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                  <p>
                    Management attention is recommended. Coordinate with the
                    assigned team to resolve blockers and agree on the next
                    action.
                  </p>
                </div>
              ) : null}

              <button
                onClick={() => setSelectedTask(null)}
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
