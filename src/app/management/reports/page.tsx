
"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileBarChart,
  FolderKanban,
  Package,
  TrendingUp,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";

type Period = "7 days" | "30 days" | "90 days";

type Report = {
  id: string;
  name: string;
  category: string;
  period: string;
  updated: string;
  status: string;
  description: string;
};

const projectData = [
  { name: "Jan", completed: 12, ongoing: 8 },
  { name: "Feb", completed: 15, ongoing: 10 },
  { name: "Mar", completed: 18, ongoing: 9 },
  { name: "Apr", completed: 14, ongoing: 12 },
  { name: "May", completed: 22, ongoing: 8 },
  { name: "Jun", completed: 19, ongoing: 11 },
];

const materialData = [
  { name: "Fire Extinguishers", quantity: 240 },
  { name: "Pipes & Fittings", quantity: 180 },
  { name: "Sprinklers", quantity: 145 },
  { name: "Alarm Devices", quantity: 120 },
  { name: "Safety Equipment", quantity: 95 },
];

const workStatusData = [
  { name: "Completed", value: 48, color: "#16a34a" },
  { name: "In Progress", value: 32, color: "#004890" },
  { name: "Pending", value: 15, color: "#e87010" },
  { name: "Delayed", value: 5, color: "#dc2626" },
];

const monthlyProgress = [
  { month: "Jan", progress: 45 },
  { month: "Feb", progress: 52 },
  { month: "Mar", progress: 48 },
  { month: "Apr", progress: 64 },
  { month: "May", progress: 72 },
  { month: "Jun", progress: 78 },
  { month: "Jul", progress: 75 },
  { month: "Aug", progress: 86 },
];

const initialReports: Report[] = [
  {
    id: "RPT-001",
    name: "Monthly Project Performance",
    category: "Projects",
    period: "September 2026",
    updated: "2026-10-01",
    status: "Available",
    description:
      "Overview of completed projects, ongoing activities and delivery performance.",
  },
  {
    id: "RPT-002",
    name: "Material Inventory Summary",
    category: "Materials",
    period: "October 2026",
    updated: "2026-10-12",
    status: "Available",
    description:
      "Summary of stock quantities, material categories and inventory status.",
  },
  {
    id: "RPT-003",
    name: "Work Progress Report",
    category: "Work Progress",
    period: "October 2026",
    updated: "2026-10-13",
    status: "Available",
    description:
      "Progress of site activities, completed tasks and pending work.",
  },
  {
    id: "RPT-004",
    name: "Pending Work Analysis",
    category: "Pending Work",
    period: "October 2026",
    updated: "2026-10-14",
    status: "Available",
    description:
      "Pending activities, priority levels and items requiring attention.",
  },
  {
    id: "RPT-005",
    name: "Installation Summary",
    category: "Installation",
    period: "September 2026",
    updated: "2026-09-30",
    status: "Available",
    description:
      "Installation activity summary and site-level completion status.",
  },
  {
    id: "RPT-006",
    name: "Team Performance Summary",
    category: "Team",
    period: "September 2026",
    updated: "2026-09-29",
    status: "Available",
    description:
      "Sample summary of team assignments and recorded work activities.",
  },
];

const reportCategories = [
  "All Categories",
  "Projects",
  "Materials",
  "Work Progress",
  "Pending Work",
  "Installation",
  "Team",
];

const periods: Period[] = ["7 days", "30 days", "90 days"];

const summaryCards = [
  {
    title: "Total Projects",
    value: "48",
    detail: "Across all project records",
    icon: FolderKanban,
    color: "text-[#004890]",
    background: "bg-blue-50",
  },
  {
    title: "Completed Projects",
    value: "23",
    detail: "48% of total projects",
    icon: CheckCircle2,
    color: "text-green-700",
    background: "bg-green-50",
  },
  {
    title: "Materials Tracked",
    value: "780",
    detail: "Units across sample inventory",
    icon: Package,
    color: "text-[#e87010]",
    background: "bg-orange-50",
  },
  {
    title: "Pending Activities",
    value: "15",
    detail: "Require follow-up",
    icon: AlertTriangle,
    color: "text-red-600",
    background: "bg-red-50",
  },
];

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ManagementReportsPage() {
  const [period, setPeriod] = useState<Period>("30 days");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [reportStart, setReportStart] = useState("2026-10-01");
  const [reportEnd, setReportEnd] = useState("2026-10-14");
  const [showCustomDates, setShowCustomDates] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialReports.filter((report) => {
      const matchesCategory =
        category === "All Categories" || report.category === category;

      const matchesSearch =
        report.name.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function exportReportCSV() {
    const headers = [
      "Report ID",
      "Report Name",
      "Category",
      "Period",
      "Last Updated",
      "Status",
      "Description",
    ];

    const rows = filteredReports.map((report) => [
      report.id,
      report.name,
      report.category,
      report.period,
      report.updated,
      report.status,
      report.description,
    ]);

    downloadCSV("fire-wala-management-reports.csv", [headers, ...rows]);
    setNotice("Report list exported successfully.");
  }

  function exportChartData() {
    const headers = ["Month", "Completed Projects", "Ongoing Projects"];

    const rows = projectData.map((item) => [
      item.name,
      String(item.completed),
      String(item.ongoing),
    ]);

    downloadCSV("fire-wala-project-performance.csv", [headers, ...rows]);
    setNotice("Project performance data exported successfully.");
  }

  function applyCustomDates() {
    if (!reportStart || !reportEnd) {
      setNotice("Please select both start and end dates.");
      return;
    }

    if (reportStart > reportEnd) {
      setNotice("Start date cannot be after end date.");
      return;
    }

    setShowCustomDates(false);
    setNotice(
      `Selected reporting period: ${reportStart} to ${reportEnd}. Live date filtering requires backend integration.`
    );
  }

  return (
    <ManagementDashboardShell>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <FileBarChart size={16} />
                <span>Control & Reporting</span>
                <span>/</span>
                <span className="text-[#004890]">Reports & MIS</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
                Reports & MIS
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Monitor project performance, material usage and operational
                progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowCustomDates((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <CalendarDays size={17} />
                Custom dates
              </button>

              <button
                type="button"
                onClick={exportReportCSV}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00376f]"
              >
                <Download size={17} />
                Export reports
              </button>
            </div>
          </div>

          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-[#004890]"
            >
              <span>{notice}</span>
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setNotice("")}
                className="shrink-0"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* Custom date selection */}
          {showCustomDates && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#141414]">
                Custom reporting period
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose a date range for your reporting requirements.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="reportStart"
                    className="mb-1.5 block text-sm font-medium text-slate-600"
                  >
                    Start date
                  </label>
                  <input
                    id="reportStart"
                    type="date"
                    value={reportStart}
                    onChange={(event) => setReportStart(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reportEnd"
                    className="mb-1.5 block text-sm font-medium text-slate-600"
                  >
                    End date
                  </label>
                  <input
                    id="reportEnd"
                    type="date"
                    value={reportEnd}
                    onChange={(event) => setReportEnd(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={applyCustomDates}
                    className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                  >
                    Apply dates
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomDates(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reporting period selector */}
          <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#141414]">
                Performance overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a reporting window for the dashboard view.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    period === item
                      ? "bg-[#004890] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Last {item}
                </button>
              ))}
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`rounded-lg p-3 ${card.background} ${card.color}`}
                    >
                      <Icon size={22} />
                    </div>
                    <TrendingUp size={18} className="text-slate-300" />
                  </div>

                  <p className="mt-4 text-sm text-slate-500">{card.title}</p>
                  <p className="mt-1 text-3xl font-bold text-[#141414]">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{card.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Project performance and work status */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="font-bold text-[#141414]">
                    Project Performance
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Monthly comparison of completed and ongoing projects.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={exportChartData}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Download size={15} />
                  Export chart data
                </button>
              </div>

              <div className="mt-6 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectData}
                    margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="completed"
                      name="Completed"
                      fill="#004890"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="ongoing"
                      name="Ongoing"
                      fill="#e87010"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#141414]">Work Status</h2>
              <p className="mt-1 text-sm text-slate-500">
                Distribution of recorded work activities.
              </p>

              <div className="relative mt-3 h-[245px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={88}
                      paddingAngle={3}
                    >
                      {workStatusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#141414]">
                    100%
                  </span>
                  <span className="text-xs text-slate-500">Activities</span>
                </div>
              </div>

              <div className="space-y-3">
                {workStatusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-600">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#141414]">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Material inventory and work progress */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#141414]">
                Material Inventory Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample stock distribution across material categories.
              </p>

              <div className="mt-5 h-[310px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={materialData}
                    layout="vertical"
                    margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={115}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="quantity"
                      name="Quantity"
                      fill="#004890"
                      radius={[0, 5, 5, 0]}
                      barSize={22}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-slate-400">
                Quantities are illustrative and do not represent live stock.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#141414]">
                Work Progress Trend
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample monthly progress percentage.
              </p>

              <div className="mt-5 h-[310px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyProgress}
                    margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value: number) => `${value}%`}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      name="Progress"
                      stroke="#e87010"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#e87010" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Available reports */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  Available Reports
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Browse and export the report register.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search reports..."
                  aria-label="Search reports"
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                />

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  aria-label="Filter by report category"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                >
                  {reportCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Report</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">
                      Reporting period
                    </th>
                    <th className="px-5 py-4 font-semibold">Last updated</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-slate-500"
                      >
                        No reports match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#141414]">
                            {report.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {report.id}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-[#004890]">
                            {report.category}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {report.period}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(report.updated)}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-700">
                            <CheckCircle2 size={13} />
                            {report.status}
                          </span>
                        </td>

                        <td className="max-w-sm px-5 py-4 leading-5 text-slate-500">
                          {report.description}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-[#141414]">
                  {filteredReports.length}
                </span>{" "}
                of {initialReports.length} reports
              </p>

              <button
                type="button"
                onClick={exportReportCSV}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download size={16} />
                Download report register
              </button>
            </div>
          </div>

          {/* Reporting note */}
          <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div className="rounded-lg bg-white p-2 text-[#e87010]">
              <Clock size={19} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#141414]">
                Reporting data note
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This page uses sample data. The reporting period buttons and
                custom date inputs do not currently recalculate the charts.
                Live KPIs, date filtering and generated reports require backend
                API integration.
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Selected period: Last {period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ManagementDashboardShell>
  );
}
