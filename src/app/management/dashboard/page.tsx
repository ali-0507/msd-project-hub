
"use client";

import {
  FolderKanban,
  Package,
  ClipboardCheck,
  Clock3,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Activity,
} from "lucide-react";

import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    detail: "Across all locations",
    icon: FolderKanban,
    color: "bg-blue-50 text-[#004890]",
    change: "+12%",
  },
  {
    title: "Materials Overview",
    value: "186",
    detail: "Items tracked",
    icon: Package,
    color: "bg-orange-50 text-[#e87010]",
    change: "8 low stock",
  },
  {
    title: "Pending Approvals",
    value: "12",
    detail: "Require your review",
    icon: ClipboardCheck,
    color: "bg-amber-50 text-amber-700",
    change: "4 urgent",
  },
  {
    title: "Pending Work",
    value: "18",
    detail: "Tasks in progress or waiting",
    icon: Clock3,
    color: "bg-purple-50 text-purple-700",
    change: "6 overdue",
  },
];

const projects = [
  {
    name: "Commercial Tower — Phase 2",
    location: "Raipur, Chhattisgarh",
    progress: 78,
    status: "In Progress",
    statusColor: "bg-blue-50 text-[#004890]",
    manager: "Project Team A",
  },
  {
    name: "Industrial Fire Safety Setup",
    location: "Bhilai, Chhattisgarh",
    progress: 55,
    status: "In Progress",
    statusColor: "bg-blue-50 text-[#004890]",
    manager: "Project Team B",
  },
  {
    name: "Warehouse Extinguisher Installation",
    location: "Durg, Chhattisgarh",
    progress: 92,
    status: "Near Completion",
    statusColor: "bg-green-50 text-green-700",
    manager: "Project Team C",
  },
  {
    name: "Office Fire Alarm Upgrade",
    location: "Raipur, Chhattisgarh",
    progress: 30,
    status: "Delayed",
    statusColor: "bg-red-50 text-red-700",
    manager: "Project Team A",
  },
];

const pendingItems = [
  {
    title: "Material request approval",
    project: "Commercial Tower — Phase 2",
    priority: "High",
    color: "bg-red-50 text-red-700",
    date: "Today",
  },
  {
    title: "Work progress review",
    project: "Industrial Fire Safety Setup",
    priority: "Medium",
    color: "bg-amber-50 text-amber-700",
    date: "Today",
  },
  {
    title: "Document verification",
    project: "Office Fire Alarm Upgrade",
    priority: "High",
    color: "bg-red-50 text-red-700",
    date: "Yesterday",
  },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-[#004890] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function ManagementDashboardPage() {
  return (
    <ManagementDashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#141414]">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor projects, materials, approvals, and work progress.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
            <Activity size={16} className="text-[#004890]" />
            Management Panel
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#141414]">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">{item.detail}</span>
                  <span className="text-xs font-semibold text-[#004890]">
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project progress */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Project Work Progress
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Current progress across selected projects
              </p>
            </div>

            <a
              href="/management/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#004890] hover:text-[#e87010]"
            >
              View all projects <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-5 py-3 font-semibold">Manager</th>
                  <th className="px-5 py-3 font-semibold">Progress</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#141414]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {project.location}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {project.manager}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-28">
                          <ProgressBar value={project.progress} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${project.statusColor}`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Approvals and activity */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-semibold text-[#141414]">
                  Items Requiring Attention
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Pending tasks and reviews
                </p>
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#e87010]">
                {pendingItems.length} items
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {pendingItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-3 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-gray-50 p-2 text-[#004890]">
                      <ClipboardCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#141414]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.project}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${item.color}`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4">
              <a
                href="/management/approvals"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#004890] hover:text-[#e87010]"
              >
                Go to approvals <ArrowRight size={16} />
              </a>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-semibold text-[#141414]">
                Management Snapshot
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Key operational indicators
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Project completion</span>
                  <span className="font-semibold text-[#141414]">72%</span>
                </div>
                <ProgressBar value={72} />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Material readiness</span>
                  <span className="font-semibold text-[#141414]">86%</span>
                </div>
                <ProgressBar value={86} />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Work completed on time</span>
                  <span className="font-semibold text-[#141414]">81%</span>
                </div>
                <ProgressBar value={81} />
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp
                    size={20}
                    className="mt-0.5 shrink-0 text-[#004890]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#004890]">
                      Operational overview
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Use this panel to review project progress, identify
                      delays, and follow up on pending approvals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <p className="text-xs text-gray-400">
          UI preview — displayed figures are sample data and are not connected
          to the live database.
        </p>
      </div>
    </ManagementDashboardShell>
  );
}
