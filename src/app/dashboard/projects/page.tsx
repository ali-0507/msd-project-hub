
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Search,
  Plus,
  FolderKanban,
  MapPin,
  CalendarDays,
  UserRound,
  X,
  Eye,
  Pencil,
  SlidersHorizontal,
} from "lucide-react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

type ProjectStatus = "Active" | "Pending" | "Completed" | "On Hold";

type Project = {
  id: number;
  name: string;
  client: string;
  location: string;
  manager: string;
  progress: number;
  status: ProjectStatus;
  startDate: string;
  completionDate: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Bharat Agro Fire Safety",
    client: "Bharat Agro",
    location: "Raipur",
    manager: "Irshad Sir",
    progress: 68,
    status: "Active",
    startDate: "2026-06-01",
    completionDate: "2026-11-30",
  },
  {
    id: 2,
    name: "Shree Cement Fire System",
    client: "Shree Cement",
    location: "Baloda Bazar",
    manager: "Ravi Sharma",
    progress: 82,
    status: "Active",
    startDate: "2026-04-15",
    completionDate: "2026-10-20",
  },
  {
    id: 3,
    name: "City Hospital Safety Upgrade",
    client: "City Hospital",
    location: "Raipur",
    manager: "Neha Verma",
    progress: 43,
    status: "Active",
    startDate: "2026-07-10",
    completionDate: "2026-12-15",
  },
  {
    id: 4,
    name: "North Plaza Sprinkler",
    client: "North Plaza",
    location: "Durg",
    manager: "Irshad Sir",
    progress: 27,
    status: "Active",
    startDate: "2026-08-01",
    completionDate: "2027-01-15",
  },
  {
    id: 5,
    name: "Warehouse Extinguisher Setup",
    client: "Central Warehouse",
    location: "Raipur",
    manager: "Ravi Sharma",
    progress: 0,
    status: "Pending",
    startDate: "2026-10-10",
    completionDate: "2026-12-30",
  },
  {
    id: 6,
    name: "Office Fire Safety Installation",
    client: "MSD Client Services",
    location: "Durg",
    manager: "Neha Verma",
    progress: 100,
    status: "Completed",
    startDate: "2026-01-10",
    completionDate: "2026-05-20",
  },
];

const emptyForm = {
  name: "",
  client: "",
  location: "",
  manager: "",
  startDate: "",
  completionDate: "",
};

function formatDate(date: string) {
  if (!date) return "Not set";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusClasses(status: ProjectStatus) {
  switch (status) {
    case "Active":
      return "bg-blue-50 text-[#004890]";
    case "Pending":
      return "bg-orange-50 text-[#b85408]";
    case "Completed":
      return "bg-emerald-50 text-emerald-700";
    case "On Hold":
      return "bg-slate-100 text-slate-700";
  }
}
function CircularProgress({ percentage, color, trackColor, }: { percentage: number; color: string; trackColor: string; }) { const radius = 24; const circumference = 2 * Math.PI * radius; const safePercentage = Math.min(100, Math.max(0, percentage)); const offset = circumference - (safePercentage / 100) * circumference; return (<div className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center" role="progressbar" aria-label={`${safePercentage}%`} aria-valuenow={safePercentage} aria-valuemin={0} aria-valuemax={100} > <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90" aria-hidden="true" > <circle cx="30" cy="30" r={radius} fill="none" stroke={trackColor} strokeWidth="7" /> <circle cx="30" cy="30" r={radius} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500" /> </svg> <span className="absolute text-lg font-extrabold text-[#141414]"> {safePercentage}% </span> </div>); }

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch = [
        project.name,
        project.client,
        project.location,
        project.manager,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (form.completionDate < form.startDate) {
      setFormError("Completion date cannot be earlier than the start date.");
      return;
    }

    const newProject: Project = {
      id: Math.max(0, ...projects.map((project) => project.id)) + 1,
      name: form.name.trim(),
      client: form.client.trim(),
      location: form.location.trim(),
      manager: form.manager.trim(),
      progress: 0,
      status: "Pending",
      startDate: form.startDate,
      completionDate: form.completionDate,
    };

    setProjects((current) => [newProject, ...current]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              PROJECT MANAGEMENT
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              All Projects
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View and manage project details, ownership, timelines and progress.
            </p>
          </div>

          <button
            onClick={() => {
              setFormError("");
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00376f]"
          >
            <Plus size={17} />
            New Project
          </button>
        </section>

{/* Summary cards with circular percentages */}
<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
  {(() => {
    const totalProjects = projects.length;

    const cards = [
      {
        label: "Total Projects",
        value: totalProjects,
        percentage: 100,
        color: "#004890",
        trackColor: "#dbeafe",
      },
      {
        label: "Active",
        value: projects.filter((p) => p.status === "Active").length,
        percentage:
          totalProjects > 0
            ? Math.round(
                (projects.filter((p) => p.status === "Active").length /
                  totalProjects) *
                  100
              )
            : 0,
        color: "#f1df3e",
        trackColor: "#dbeafe",
      },
      {
        label: "Pending",
        value: projects.filter((p) => p.status === "Pending").length,
        percentage:
          totalProjects > 0
            ? Math.round(
                (projects.filter((p) => p.status === "Pending").length /
                  totalProjects) *
                  100
              )
            : 0,
        color: "#e87010",
        trackColor: "#ffedd5",
      },
      {
        label: "Completed",
        value: projects.filter((p) => p.status === "Completed").length,
        percentage:
          totalProjects > 0
            ? Math.round(
                (projects.filter((p) => p.status === "Completed").length /
                  totalProjects) *
                  100
              )
            : 0,
        color: "#16805d",
        trackColor: "#d1fae5",
      },
    ];

    return cards.map((card) => (
      <article
        key={card.label}
        className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4"
      >
        <div className="flex min-h-[100px] items-center justify-between gap-1">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-500">
              {card.label}
            </p>

            <p
              className="mt-2 text-3xl font-extrabold tracking-tight"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
          </div>

          <CircularProgress
            percentage={card.percentage}
            color={card.color}
            trackColor={card.trackColor}
          />
        </div>
      </article>
    ));
  })()}
</section>



        {/* Search and filters */}
        <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-[#004890]">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search project, client, location or manager..."
              className="w-full bg-transparent text-sm text-[#141414] outline-none"
              aria-label="Search projects"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-slate-400 hover:text-[#141414]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-w-36 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              aria-label="Filter projects by status"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </section>

        {/* Project register */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-bold text-[#141414]">Project register</h2>
              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
            <FolderKanban size={21} className="text-[#004890]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Project / Client</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Project manager</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Completion date</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-t border-slate-100 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#141414]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {project.client}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} />
                        {project.location}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound size={14} />
                        {project.manager}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-100">
                          <div
                            className="h-1.5 rounded-full bg-[#004890]"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#141414]">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(project.completionDate)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#004890] hover:bg-blue-50"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No projects match your search or selected status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Demo interface · Changes are stored in browser memory only.
            </p>
          </div>
        </section>
      </div>

      {/* New project form */}
      {showForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-project-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2
                  id="new-project-title"
                  className="text-lg font-bold text-[#141414]"
                >
                  Create new project
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter the basic project information.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={createProject} className="space-y-4 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Project name *
                  </label>
                  <input
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="e.g. Factory Fire Safety Installation"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Client name *
                  </label>
                  <input
                    required
                    maxLength={120}
                    value={form.client}
                    onChange={(e) =>
                      setForm({ ...form, client: e.target.value })
                    }
                    placeholder="Company or client"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Location *
                  </label>
                  <input
                    required
                    maxLength={120}
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="City or site location"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Project manager *
                  </label>
                  <input
                    required
                    maxLength={120}
                    value={form.manager}
                    onChange={(e) =>
                      setForm({ ...form, manager: e.target.value })
                    }
                    placeholder="Assigned project manager"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Start date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Expected completion *
                  </label>
                  <input
                    type="date"
                    required
                    min={form.startDate || undefined}
                    value={form.completionDate}
                    onChange={(e) =>
                      setForm({ ...form, completionDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                >
                  Create project
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Project details */}
      {selectedProject && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#004890]">
                  Project details
                </p>
                <h2
                  id="project-details-title"
                  className="mt-1 text-lg font-bold text-[#141414]"
                >
                  {selectedProject.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <DetailRow label="Client" value={selectedProject.client} />
              <DetailRow label="Location" value={selectedProject.location} />
              <DetailRow label="Project manager" value={selectedProject.manager} />
              <DetailRow label="Start date" value={formatDate(selectedProject.startDate)} />
              <DetailRow label="Expected completion" value={formatDate(selectedProject.completionDate)} />
              <DetailRow label="Status" value={selectedProject.status} />

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-500">Project progress</span>
                  <span className="font-bold text-[#004890]">
                    {selectedProject.progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[#e87010]"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </DashboardShell>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:justify-between sm:gap-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-[#141414] sm:text-right">
        {value}
      </span>
    </div>
  );
}