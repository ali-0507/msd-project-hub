"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  FileBarChart,
  FileText,
  Filter,
  FolderKanban,
  Package,
  PieChart,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

type ProjectStatus = "Active" | "Pending" | "Completed";

type ProjectReport = {
  id: number;
  project: string;
  client: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  materialItems: number;
  installedItems: number;
  pendingItems: number;
  teamMembers: number;
  workItems: number;
  completedWork: number;
};

const projectReports: ProjectReport[] = [
  {
    id: 1,
    project: "ABC Corporate Tower",
    client: "ABC Corporation",
    location: "Raipur",
    status: "Active",
    progress: 78,
    materialItems: 42,
    installedItems: 35,
    pendingItems: 7,
    teamMembers: 8,
    workItems: 24,
    completedWork: 19,
  },
  {
    id: 2,
    project: "City Mall Project",
    client: "City Mall Pvt. Ltd.",
    location: "Bhilai",
    status: "Active",
    progress: 64,
    materialItems: 36,
    installedItems: 25,
    pendingItems: 11,
    teamMembers: 6,
    workItems: 20,
    completedWork: 13,
  },
  {
    id: 3,
    project: "Sunrise Hospital",
    client: "Sunrise Healthcare",
    location: "Raipur",
    status: "Active",
    progress: 52,
    materialItems: 28,
    installedItems: 19,
    pendingItems: 9,
    teamMembers: 5,
    workItems: 18,
    completedWork: 9,
  },
  {
    id: 4,
    project: "Green Valley School",
    client: "Green Valley School",
    location: "Durg",
    status: "Pending",
    progress: 31,
    materialItems: 22,
    installedItems: 11,
    pendingItems: 11,
    teamMembers: 4,
    workItems: 15,
    completedWork: 5,
  },
  {
    id: 5,
    project: "Metro Commercial Complex",
    client: "Metro Developers",
    location: "Raipur",
    status: "Active",
    progress: 86,
    materialItems: 48,
    installedItems: 43,
    pendingItems: 5,
    teamMembers: 9,
    workItems: 27,
    completedWork: 23,
  },
  {
    id: 6,
    project: "Shree Residency",
    client: "Shree Builders",
    location: "Bhilai",
    status: "Completed",
    progress: 100,
    materialItems: 31,
    installedItems: 31,
    pendingItems: 0,
    teamMembers: 7,
    workItems: 22,
    completedWork: 22,
  },
];

const monthlyData = [
  {
    month: "Apr",
    projects: 3,
    work: 34,
    completed: 21,
  },
  {
    month: "May",
    projects: 4,
    work: 41,
    completed: 27,
  },
  {
    month: "Jun",
    projects: 5,
    work: 48,
    completed: 31,
  },
  {
    month: "Jul",
    projects: 6,
    work: 56,
    completed: 39,
  },
  {
    month: "Aug",
    projects: 6,
    work: 63,
    completed: 47,
  },
  {
    month: "Sep",
    projects: 7,
    work: 71,
    completed: 58,
  },
];

const reportTypes = [
  "Project MIS",
  "Material Report",
  "Work Progress Report",
  "Team Utilization Report",
  "Pending Work Report",
  "Management Summary",
];

const dateRanges = [
  "This Month",
  "Last Month",
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
];

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

        <p className="text-sm font-semibold text-gray-800">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] =
    useState("Project MIS");

  const [dateRange, setDateRange] =
    useState("This Month");

  const [projectFilter, setProjectFilter] =
    useState("All Projects");

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [showReportPreview, setShowReportPreview] =
    useState(false);

  const filteredProjects = useMemo(() => {
    return projectReports.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.project
          .toLowerCase()
          .includes(searchText) ||
        project.client
          .toLowerCase()
          .includes(searchText) ||
        project.location
          .toLowerCase()
          .includes(searchText);

      const matchesProject =
        projectFilter === "All Projects" ||
        project.project === projectFilter;

      return matchesSearch && matchesProject;
    });
  }, [search, projectFilter]);

  const totalProjects = projectReports.length;

  const activeProjects = projectReports.filter(
    (project) => project.status === "Active"
  ).length;

  const completedProjects = projectReports.filter(
    (project) => project.status === "Completed"
  ).length;

  const pendingProjects = projectReports.filter(
    (project) => project.status === "Pending"
  ).length;

  const averageProgress =
    totalProjects > 0
      ? Math.round(
          projectReports.reduce(
            (sum, project) => sum + project.progress,
            0
          ) / totalProjects
        )
      : 0;

  const totalMaterialItems = projectReports.reduce(
    (sum, project) => sum + project.materialItems,
    0
  );

  const totalInstalledItems = projectReports.reduce(
    (sum, project) => sum + project.installedItems,
    0
  );

  const totalPendingItems = projectReports.reduce(
    (sum, project) => sum + project.pendingItems,
    0
  );

  const totalTeamMembers = projectReports.reduce(
    (sum, project) => sum + project.teamMembers,
    0
  );

  const totalWorkItems = projectReports.reduce(
    (sum, project) => sum + project.workItems,
    0
  );

  const totalCompletedWork = projectReports.reduce(
    (sum, project) => sum + project.completedWork,
    0
  );

  const workCompletionPercentage =
    totalWorkItems > 0
      ? Math.round(
          (totalCompletedWork / totalWorkItems) * 100
        )
      : 0;

  const materialInstallationPercentage =
    totalMaterialItems > 0
      ? Math.round(
          (totalInstalledItems / totalMaterialItems) *
            100
        )
      : 0;

  const exportCSV = () => {
    const headers = [
      "Project",
      "Client",
      "Location",
      "Status",
      "Progress %",
      "Material Items",
      "Installed Items",
      "Pending Items",
      "Team Members",
      "Work Items",
      "Completed Work",
    ];

    const rows = filteredProjects.map((project) => [
      project.project,
      project.client,
      project.location,
      project.status,
      project.progress,
      project.materialItems,
      project.installedItems,
      project.pendingItems,
      project.teamMembers,
      project.workItems,
      project.completedWork,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
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
    link.download = "project-mis-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    setShowReportPreview(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#141414]">
              Reports & MIS
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor project performance, material utilization,
              work progress and management-level statistics.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
                showFilters
                  ? "border-[#004890] bg-blue-50 text-[#004890]"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter size={17} />
              Filters
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Download size={17} />
              Export CSV
            </button>

            <button
              onClick={generateReport}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b78]"
            >
              <FileBarChart size={17} />
              Generate Report
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <BarChart3
            size={19}
            className="mt-0.5 shrink-0 text-[#004890]"
          />

          <div>
            <p className="text-sm font-semibold text-[#004890]">
              Management Information System preview
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              Report values currently use sample local data.
              Live project, material, team and work data will be
              connected later.
            </p>
          </div>
        </div>

        {/* Report Controls */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Report Type
              </label>

              <div className="relative">
                <FileBarChart
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={selectedReport}
                  onChange={(e) =>
                    setSelectedReport(e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-[#004890]"
                >
                  {reportTypes.map((report) => (
                    <option key={report}>{report}</option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date Range
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={dateRange}
                  onChange={(e) =>
                    setDateRange(e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-[#004890]"
                >
                  {dateRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Project
              </label>

              <div className="relative">
                <FolderKanban
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={projectFilter}
                  onChange={(e) =>
                    setProjectFilter(e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-[#004890]"
                >
                  <option>All Projects</option>

                  {projectReports.map((project) => (
                    <option
                      key={project.id}
                      value={project.project}
                    >
                      {project.project}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search project, client, location..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#004890] focus:bg-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setSearch("");
                    setProjectFilter("All Projects");
                    setDateRange("This Month");
                    setSelectedReport("Project MIS");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <X size={16} />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={100}
              label={`Total Projects (${totalProjects})`}
              icon={<FolderKanban size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={averageProgress}
              label={`Avg. Progress (${averageProgress}%)`}
              icon={<TrendingUp size={16} />}
              ringColor="#e87010"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={workCompletionPercentage}
              label={`Work Completed (${totalCompletedWork})`}
              icon={<CheckCircle2 size={16} />}
              ringColor="#16a34a"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={materialInstallationPercentage}
              label={`Material Installed (${totalInstalledItems})`}
              icon={<Package size={16} />}
              ringColor="#7c3aed"
            />
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Active Projects
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {activeProjects}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                <FolderKanban size={19} />
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#004890]"
                style={{
                  width: `${
                    totalProjects > 0
                      ? (activeProjects /
                          totalProjects) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Pending Projects
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {pendingProjects}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#e87010]">
                <ClipboardList size={19} />
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#e87010]"
                style={{
                  width: `${
                    totalProjects > 0
                      ? (pendingProjects /
                          totalProjects) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Pending Material
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {totalPendingItems}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Package size={19} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Items requiring attention
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Team Members
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {totalTeamMembers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <Users size={19} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Assigned across projects
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Monthly Work Chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-[#141414]">
                  Work Progress Trend
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Monthly work items created vs completed.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#004890]" />
                  Total Work
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e87010]" />
                  Completed
                </div>
              </div>
            </div>

            <div className="mt-6 flex h-[240px] items-end gap-3 sm:gap-5">
              {monthlyData.map((item) => {
                const maxValue = Math.max(
                  ...monthlyData.map(
                    (month) => month.work
                  )
                );

                const workHeight =
                  (item.work / maxValue) * 100;

                const completedHeight =
                  (item.completed / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="mb-2 flex w-full flex-1 items-end justify-center gap-1.5">
                      <div className="group relative flex h-full w-1/3 items-end">
                        <div
                          className="w-full rounded-t-md bg-[#004890] transition hover:opacity-80"
                          style={{
                            height: `${workHeight}%`,
                          }}
                        />

                        <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[10px] text-white group-hover:block">
                          {item.work}
                        </div>
                      </div>

                      <div className="group relative flex h-full w-1/3 items-end">
                        <div
                          className="w-full rounded-t-md bg-[#e87010] transition hover:opacity-80"
                          style={{
                            height: `${completedHeight}%`,
                          }}
                        />

                        <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[10px] text-white group-hover:block">
                          {item.completed}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-gray-500">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Project Status
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current project distribution.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="relative h-40 w-40">
                <svg
                  className="h-40 w-40 -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#004890"
                    strokeWidth="12"
                    strokeDasharray={`${
                      (activeProjects /
                        totalProjects) *
                      238.76
                    } 238.76`}
                    strokeLinecap="butt"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#e87010"
                    strokeWidth="12"
                    strokeDasharray={`${
                      (pendingProjects /
                        totalProjects) *
                      238.76
                    } 238.76`}
                    strokeDashoffset={`-${
                      (activeProjects /
                        totalProjects) *
                      238.76
                    }`}
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="12"
                    strokeDasharray={`${
                      (completedProjects /
                        totalProjects) *
                      238.76
                    } 238.76`}
                    strokeDashoffset={`-${
                      ((activeProjects +
                        pendingProjects) /
                        totalProjects) *
                      238.76
                    }`}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    {totalProjects}
                  </span>

                  <span className="text-xs text-gray-400">
                    Projects
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#004890]" />

                  <span className="text-sm text-gray-600">
                    Active
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {activeProjects}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e87010]" />

                  <span className="text-sm text-gray-600">
                    Pending
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {pendingProjects}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

                  <span className="text-sm text-gray-600">
                    Completed
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {completedProjects}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project MIS Register */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Project MIS Register
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Project-wise management information summary.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FileText size={15} />
              {dateRange}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-semibold">
                    Project
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Progress
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Materials
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Work
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Team
                  </th>

                  <th className="px-5 py-3 font-semibold">
                    Pending
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {project.project}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {project.client} •{" "}
                          {project.location}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          project.status === "Active"
                            ? "bg-blue-100 text-[#004890]"
                            : project.status ===
                              "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="w-32">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Progress
                          </span>

                          <span className="text-xs font-semibold text-gray-700">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-[#004890]"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-700">
                        {project.installedItems}/
                        {project.materialItems}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {project.pendingItems} pending
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-700">
                        {project.completedWork}/
                        {project.workItems}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        work completed
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Users
                          size={15}
                          className="text-gray-400"
                        />

                        <span className="text-sm text-gray-600">
                          {project.teamMembers}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-semibold ${
                          project.pendingItems > 10
                            ? "text-red-600"
                            : project.pendingItems > 5
                            ? "text-[#e87010]"
                            : "text-green-600"
                        }`}
                      >
                        {project.pendingItems}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center"
                    >
                      <BarChart3
                        size={35}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-medium text-gray-600">
                        No project data found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing the project filter or
                        search term.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Types */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-semibold text-[#141414]">
              Available MIS Reports
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select a report type to prepare management-level
              information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {reportTypes.map((report) => {
              const isSelected =
                selectedReport === report;

              return (
                <button
                  key={report}
                  onClick={() =>
                    setSelectedReport(report)
                  }
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-[#004890] bg-blue-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-[#004890] text-white"
                        : "bg-white text-[#004890]"
                    }`}
                  >
                    {report === "Project MIS" ? (
                      <FolderKanban size={19} />
                    ) : report ===
                      "Material Report" ? (
                      <Package size={19} />
                    ) : report ===
                      "Work Progress Report" ? (
                      <TrendingUp size={19} />
                    ) : report ===
                      "Team Utilization Report" ? (
                      <Users size={19} />
                    ) : report ===
                      "Pending Work Report" ? (
                      <ClipboardList size={19} />
                    ) : (
                      <PieChart size={19} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isSelected
                          ? "text-[#004890]"
                          : "text-gray-700"
                      }`}
                    >
                      {report}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Generate detailed summary
                    </p>
                  </div>

                  {isSelected && (
                    <CheckCircle2
                      size={18}
                      className="text-[#004890]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  Report Preview
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {selectedReport} • {dateRange}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowReportPreview(false)
                }
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#004890]">
                    <FileBarChart size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#004890]">
                      {selectedReport}
                    </p>

                    <p className="mt-1 text-xs text-blue-700">
                      Reporting period: {dateRange}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Projects
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {totalProjects}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Avg. Progress
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {averageProgress}%
                  </p>
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Work Completed
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {totalCompletedWork}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Pending Material
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {totalPendingItems}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Report Information
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-400">
                      Report Type
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {selectedReport}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Date Range
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {dateRange}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Projects Included
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {filteredProjects.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Material Installation
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {materialInstallationPercentage}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  onClick={() =>
                    setShowReportPreview(false)
                  }
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                >
                  <Download size={16} />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}