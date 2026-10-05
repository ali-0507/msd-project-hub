
"use client";

import DashboardShell from "@/src/components/dashboard/dashboard-shell";
import {
  FolderKanban,
  Clock3,
  CircleCheck,
  Flag,
  ArrowUpRight,
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  Package,
  MapPin,
  UserRound,
  Plus,
  Download,
} from "lucide-react";


const summaryCards = [
  {
    title: "Active Projects",
    value: "4",
    note: "In progress · 2 nearing deadline",
    percentage: 67,
    icon: FolderKanban,
    accent: "#004890",
    iconBg: "bg-blue-50",
    trackColor: "#dbeafe",
  },
  {
    title: "Pending Projects",
    value: "2",
    note: "Follow-up and restart required",
    percentage: 33,
    icon: Clock3,
    accent: "#e87010",
    iconBg: "bg-orange-50",
    trackColor: "#ffedd5",
  },
  {
    title: "Completed Projects",
    value: "14",
    note: "Completed this quarter",
    percentage: 78,
    icon: CircleCheck,
    accent: "#16805d",
    iconBg: "bg-emerald-50",
    trackColor: "#d1fae5",
  },
  {
    title: "Open Action Items",
    value: "8",
    note: "3 high priority need attention",
    percentage: 27,
    icon: Flag,
    accent: "#141414",
    iconBg: "bg-slate-100",
    trackColor: "#e2e8f0",
  },
];



const projects = [
  {
    name: "Bharat Agro",
    client: "Bharat Agro",
    location: "Raipur",
    incharge: "Irshad Sir",
    progress: 68,
    status: "Active",
    completion: "30 Nov 2026",
    color: "#004890",
  },
  {
    name: "Shree Cement Fire System",
    client: "Shree Cement",
    location: "Baloda Bazar",
    incharge: "Ravi Sharma",
    progress: 82,
    status: "Active",
    completion: "20 Oct 2026",
    color: "#004890",
  },
  {
    name: "City Hospital Safety Upgrade",
    client: "City Hospital",
    location: "Raipur",
    incharge: "Neha Verma",
    progress: 43,
    status: "Active",
    completion: "15 Dec 2026",
    color: "#e87010",
  },
  {
    name: "North Plaza Sprinkler",
    client: "North Plaza",
    location: "Durg",
    incharge: "Irshad Sir",
    progress: 27,
    status: "Active",
    completion: "15 Jan 2027",
    color: "#e87010",
  },
];

const alerts = [
  {
    title: "Sprinkler material below planned stock",
    detail: "Bharat Agro · Purchase · Today",
    icon: Package,
    color: "#e87010",
    bg: "bg-orange-50",
  },
  {
    title: "Deadline approaching: Pump Panel",
    detail: "Bharat Agro · Due 05 Oct 2026",
    icon: CalendarClock,
    color: "#004890",
    bg: "bg-blue-50",
  },
  {
    title: "Client approval pending",
    detail: "City Hospital · Sales follow-up",
    icon: ClipboardCheck,
    color: "#141414",
    bg: "bg-slate-100",
  },
];

type CircularProgressProps = {
  percentage: number;
  color: string;
  trackColor?: string;
};

function CircularProgress({
  percentage,
  color,
  trackColor = "#e5e7eb",
}: CircularProgressProps) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const safePercentage = Math.min(100, Math.max(0, percentage));
  const offset =
    circumference - (safePercentage / 100) * circumference;

  return (
    <div
      className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center"
      role="progressbar"
      aria-label={`${safePercentage}% progress`}
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
          strokeWidth="6"
        />

        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>

      <span className="absolute text-base font-extrabold text-[#141414]">
        {safePercentage}%
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              MANAGEMENT WORKSPACE
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
              Project Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track projects, materials, installation and site activity in one
              place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#004890] transition hover:bg-slate-50"
            >
              <Download size={16} />
              Export overview
            </button>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "The New Project form will be added in the All Projects module."
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00376f]"
            >
              <Plus size={17} />
              New project
            </button>
          </div>
        </section>

        {/* Summary cards */}
        {/* <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-500">
                    {card.title}
                  </p>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                  >
                    <Icon size={20} style={{ color: card.accent }} />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-extrabold tracking-tight text-[#141414]">
                  {card.value}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {card.note}
                </p>
              </article>
            );
          })}
        </section> */}

      
{/* Compact summary cards with circular progress */}
<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
  {summaryCards.map((card) => {
    const Icon = card.icon;

    return (
      <article
        key={card.title}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
      >
        <div className="flex min-h-[104px] items-center justify-between gap-3">
          {/* Card information */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <Icon size={17} style={{ color: card.accent }} />
              </div>

              <p className="text-sm font-medium leading-5 text-slate-500">
                {card.title}
              </p>
            </div>

            <p className="mt-3 text-3xl font-extrabold leading-none tracking-tight text-[#141414]">
              {card.value}
            </p>

            <p className="mt-2 text-xs leading-4 text-slate-500">
              {card.note}
            </p>
          </div>

          {/* Circular percentage */}
          <CircularProgress
            percentage={card.percentage}
            color={card.accent}
            trackColor={card.trackColor}
          />
        </div>
      </article>
    );
  })}
</section>



        {/* Portfolio and alerts */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_1fr]">
          {/* Project portfolio */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-bold text-[#141414]">
                  Project portfolio
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Progress snapshot by project
                </p>
              </div>

              <a
                href="#project-register"
                className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
              >
                View projects <ArrowUpRight className="ml-1 inline" size={14} />
              </a>
            </div>

            <div className="space-y-5 p-5">
              {projects.map((project) => (
                <div key={project.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-700">
                      {project.name} · {project.location}
                    </span>

                    <span className="text-sm font-bold text-[#141414]">
                      {project.progress}%
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label={`${project.name} completion`}
                    aria-valuenow={project.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Alerts */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-bold text-[#141414]">
                  Alerts requiring attention
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Items flagged across sample projects
                </p>
              </div>

              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#e87010]">
                {alerts.length} alerts
              </span>
            </div>

            <div className="divide-y divide-slate-100 px-5">
              {alerts.map((alert) => {
                const Icon = alert.icon;

                return (
                  <div
                    key={alert.title}
                    className="flex items-start gap-3 py-4"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${alert.bg}`}
                    >
                      <Icon size={19} style={{ color: alert.color }} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-[#141414]">
                        {alert.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {alert.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        {/* Project register */}
        <section
          id="project-register"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#141414]">
                Active project register
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Latest project status and ownership
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#004890]">
              <FolderKanban size={15} />
              {projects.length} sample projects
            </span>
          </div>

          {/* Horizontal scrolling is limited to the table on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Project / Client</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">In-charge</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Expected completion</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="border-t border-slate-100 transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#141414]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {project.client}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                        <MapPin size={14} className="text-slate-400" />
                        {project.location}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                        <UserRound size={14} className="text-slate-400" />
                        {project.incharge}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor: project.color,
                            }}
                          />
                        </div>

                        <span className="text-xs font-bold text-[#141414]">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#004890]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#004890]" />
                        {project.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {project.completion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Demo interface · Sample data for layout review · Not connected
              to a live database
            </p>
          </div>
        </section>

        {/* Demo data notice */}
        <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-4 text-xs leading-5 text-[#141414]">
          <AlertTriangle
            size={17}
            className="mt-0.5 shrink-0 text-[#e87010]"
          />
          <p>
            <span className="font-bold">Sample data only:</span> Project names,
            counts, progress percentages, deadlines and alerts are examples.
            They must be replaced with verified company data when the backend
            is connected.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}