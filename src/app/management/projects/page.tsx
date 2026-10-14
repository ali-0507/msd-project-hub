
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Search,
  Plus,
  Download,
  MapPin,
  CalendarDays,
  Users,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  X,
  ClipboardCheck,
  Clock3,
} from "lucide-react";

import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";

type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "Delayed"
  | "On Hold";

interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  team: string;
  startDate: string;
  deadline: string;
  progress: number;
  status: ProjectStatus;
}

const initialProjects: Project[] = [
  {
    id: "FW-001",
    name: "Commercial Tower — Phase 2",
    client: "ABC Infrastructure",
    location: "Raipur, Chhattisgarh",
    team: "Project Team A",
    startDate: "2026-08-01",
    deadline: "2026-11-30",
    progress: 78,
    status: "In Progress",
  },
  {
    id: "FW-002",
    name: "Industrial Fire Safety Setup",
    client: "XYZ Industries",
    location: "Bhilai, Chhattisgarh",
    team: "Project Team B",
    startDate: "2026-07-15",
    deadline: "2026-12-15",
    progress: 55,
    status: "In Progress",
  },
  {
    id: "FW-003",
    name: "Warehouse Extinguisher Installation",
    client: "National Warehousing",
    location: "Durg, Chhattisgarh",
    team: "Project Team C",
    startDate: "2026-06-01",
    deadline: "2026-10-20",
    progress: 92,
    status: "In Progress",
  },
  {
    id: "FW-004",
    name: "Office Fire Alarm Upgrade",
    client: "Prime Business Group",
    location: "Raipur, Chhattisgarh",
    team: "Project Team A",
    startDate: "2026-07-01",
    deadline: "2026-10-10",
    progress: 30,
    status: "Delayed",
  },
  {
    id: "FW-005",
    name: "Hospital Fire Protection System",
    client: "City Healthcare",
    location: "Bilaspur, Chhattisgarh",
    team: "Project Team D",
    startDate: "2026-03-01",
    deadline: "2026-08-31",
    progress: 100,
    status: "Completed",
  },
  {
    id: "FW-006",
    name: "Manufacturing Unit Safety Audit",
    client: "Shree Manufacturing",
    location: "Raipur, Chhattisgarh",
    team: "Project Team B",
    startDate: "2026-09-01",
    deadline: "2026-12-20",
    progress: 15,
    status: "On Hold",
  },
  {
    id: "FW-007",
    name: "Shopping Complex Fire Systems",
    client: "Metro Retail Group",
    location: "Korba, Chhattisgarh",
    team: "Project Team C",
    startDate: "2026-05-10",
    deadline: "2026-11-15",
    progress: 64,
    status: "In Progress",
  },
  {
    id: "FW-008",
    name: "School Fire Extinguisher Renewal",
    client: "Education Trust",
    location: "Raipur, Chhattisgarh",
    team: "Project Team D",
    startDate: "2026-04-01",
    deadline: "2026-09-15",
    progress: 100,
    status: "Completed",
  },
];

const statusStyles: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-50 text-[#004890] border-blue-100",
  Completed: "bg-green-50 text-green-700 border-green-100",
  Delayed: "bg-red-50 text-red-700 border-red-100",
  "On Hold": "bg-amber-50 text-amber-700 border-amber-100",
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: typeof FolderKanban;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-[#141414]">{value}</p>
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${accent}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function ManagementProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 6;

  const locations = useMemo(
    () => [...new Set(projects.map((project) => project.location))],
    [projects],
  );

  const counts = useMemo(
    () => ({
      total: projects.length,
      active: projects.filter((p) => p.status === "In Progress").length,
      completed: projects.filter((p) => p.status === "Completed").length,
      delayed: projects.filter((p) => p.status === "Delayed").length,
    }),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch = [
        project.id,
        project.name,
        project.client,
        project.location,
        project.team,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesLocation =
        locationFilter === "All" || project.location === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [projects, search, statusFilter, locationFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function updateSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function exportCSV() {
    const headers = [
      "Project ID",
      "Project Name",
      "Client",
      "Location",
      "Assigned Team",
      "Start Date",
      "Deadline",
      "Progress",
      "Status",
    ];

    const rows = filteredProjects.map((project) => [
      project.id,
      project.name,
      project.client,
      project.location,
      project.team,
      project.startDate,
      project.deadline,
      `${project.progress}%`,
      project.status,
    ]);

    const escapeCSV = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "management-projects.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setLocationFilter("All");
    setCurrentPage(1);
  }

  return (
    <ManagementDashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
              <Link
                href="/management/dashboard"
                className="hover:text-[#004890]"
              >
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-[#004890]">All Projects</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#141414]">
              All Projects
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor project status, timelines, teams, and completion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Creating projects will be enabled when the backend API is connected.",
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00366d]"
            >
              <Plus size={17} />
              New Project
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Projects"
            value={counts.total}
            subtitle="All registered projects"
            icon={FolderKanban}
            accent="bg-blue-50 text-[#004890]"
          />

          <SummaryCard
            title="Active Projects"
            value={counts.active}
            subtitle="Currently in progress"
            icon={ArrowUpRight}
            accent="bg-orange-50 text-[#e87010]"
          />

          <SummaryCard
            title="Completed Projects"
            value={counts.completed}
            subtitle="Successfully completed"
            icon={ClipboardCheck}
            accent="bg-green-50 text-green-700"
          />

          <SummaryCard
            title="Delayed Projects"
            value={counts.delayed}
            subtitle="Require closer monitoring"
            icon={Clock3}
            accent="bg-red-50 text-red-600"
          />
        </div>

        {/* Projects table */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Table heading */}
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Project Directory
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Showing {filteredProjects.length} matching project
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              className={`inline-flex items-center justify-center gap-2 self-start rounded-lg border px-3 py-2 text-sm font-medium transition ${
                showFilters
                  ? "border-[#004890] bg-blue-50 text-[#004890]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Search and filters */}
          <div className="space-y-3 border-b border-gray-100 p-4">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search by project, client, ID, location, or team..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#004890] focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Project Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option value="All">All statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Delayed">Delayed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Location
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(event) => {
                      setLocationFilter(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    <option value="All">All locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <X size={15} />
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-5 py-3 font-semibold">Client & Location</th>
                  <th className="px-5 py-3 font-semibold">Assigned Team</th>
                  <th className="px-5 py-3 font-semibold">Timeline</th>
                  <th className="px-5 py-3 font-semibold">Progress</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#141414]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {project.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-700">
                        {project.client}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin size={13} />
                        {project.location}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={15} className="text-gray-400" />
                        <span className="whitespace-nowrap text-xs">
                          {project.team}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <CalendarDays
                          size={15}
                          className="mt-0.5 shrink-0 text-gray-400"
                        />
                        <div className="whitespace-nowrap">
                          <p className="text-xs text-gray-700">
                            {formatDate(project.startDate)}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            to {formatDate(project.deadline)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${
                              project.status === "Delayed"
                                ? "bg-red-500"
                                : project.status === "Completed"
                                  ? "bg-green-500"
                                  : "bg-[#004890]"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View ${project.name}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:border-[#004890] hover:bg-blue-50"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedProjects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <FolderKanban
                        size={34}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-semibold text-gray-700">
                        No projects found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-3 text-sm font-semibold text-[#004890] hover:underline"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-500">
              {filteredProjects.length === 0
                ? "No results"
                : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(
                    safePage * pageSize,
                    filteredProjects.length,
                  )} of ${filteredProjects.length} projects`}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage(safePage - 1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="px-2 text-xs font-medium text-gray-600">
                Page {safePage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage(safePage + 1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <p className="text-xs text-gray-400">
          UI preview · Sample project data only. Live data will be supplied by
          the backend API.
        </p>
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                  Project Details · {selectedProject.id}
                </p>
                <h2
                  id="project-dialog-title"
                  className="mt-2 text-lg font-bold text-[#141414]"
                >
                  {selectedProject.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[selectedProject.status]}`}
                >
                  {selectedProject.status}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedProject.progress}% complete
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  ["Client", selectedProject.client],
                  ["Assigned Team", selectedProject.team],
                  ["Location", selectedProject.location],
                  ["Start Date", formatDate(selectedProject.startDate)],
                  ["Deadline", formatDate(selectedProject.deadline)],
                  ["Project ID", selectedProject.id],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-600">
                    Project completion
                  </span>
                  <span className="font-bold text-[#004890]">
                    {selectedProject.progress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#004890]"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00366d]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagementDashboardShell>
  );
}
