
"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";
import {
  ClipboardList,
  Plus,
  Search,
  ArrowDownToLine,
  Printer,
  Eye,
  Pencil,
  Trash2,
  X,
  Clock3,
  CircleCheck,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

type ChallanStatus = "Issued" | "Returned" | "Pending";

type Challan = {
  id: number;
  challanNo: string;
  project: string;
  material: string;
  quantity: number;
  unit: string;
  recipient: string;
  issueDate: string;
  status: ChallanStatus;
  remarks: string;
};

const initialChallans: Challan[] = [
  {
    id: 1,
    challanNo: "CH-2026-001",
    project: "Bharat Agro",
    material: "ABC Fire Extinguisher 4 kg",
    quantity: 12,
    unit: "Nos.",
    recipient: "Irshad Sir",
    issueDate: "2026-09-25",
    status: "Issued",
    remarks: "Material issued for installation.",
  },
  {
    id: 2,
    challanNo: "CH-2026-002",
    project: "Shree Cement Fire System",
    material: "Fire Hose Pipe 15 m",
    quantity: 8,
    unit: "Nos.",
    recipient: "Ravi Sharma",
    issueDate: "2026-09-26",
    status: "Pending",
    remarks: "Awaiting recipient confirmation.",
  },
  {
    id: 3,
    challanNo: "CH-2026-003",
    project: "City Hospital Safety Upgrade",
    material: "Sprinkler Head 68°C",
    quantity: 40,
    unit: "Nos.",
    recipient: "Neha Verma",
    issueDate: "2026-09-27",
    status: "Issued",
    remarks: "Issued to the site team.",
  },
  {
    id: 4,
    challanNo: "CH-2026-004",
    project: "Bharat Agro",
    material: "MS Fire Fighting Pipe",
    quantity: 15,
    unit: "Meters",
    recipient: "Irshad Sir",
    issueDate: "2026-09-28",
    status: "Returned",
    remarks: "Unused material returned to store.",
  },
  {
    id: 5,
    challanNo: "CH-2026-005",
    project: "North Plaza Sprinkler",
    material: "Landing Valve 63 mm",
    quantity: 4,
    unit: "Nos.",
    recipient: "Amit Verma",
    issueDate: "2026-09-29",
    status: "Pending",
    remarks: "Return acknowledgement pending.",
  },
];

const projects = [
  "Bharat Agro",
  "Shree Cement Fire System",
  "City Hospital Safety Upgrade",
  "North Plaza Sprinkler",
  "Other",
];

const emptyForm = {
  challanNo: "",
  project: projects[0],
  material: "",
  quantity: "1",
  unit: "Nos.",
  recipient: "",
  issueDate: new Date().toLocaleDateString("en-CA"),
  status: "Pending" as ChallanStatus,
  remarks: "",
};

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusStyles(status: ChallanStatus) {
  if (status === "Issued") {
    return "bg-blue-50 text-[#004890]";
  }

  if (status === "Returned") {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-orange-50 text-[#c45b08]";
}
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
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth="7"
        />

        {/* Progress circle */}
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
export default function ChallansPage() {
  const [challans, setChallans] = useState(initialChallans);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewChallan, setViewChallan] = useState<Challan | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const issuedCount = challans.filter(
    (challan) => challan.status === "Issued"
  ).length;

  const returnedCount = challans.filter(
    (challan) => challan.status === "Returned"
  ).length;

  const pendingCount = challans.filter(
    (challan) => challan.status === "Pending"
  ).length;

  const filteredChallans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return challans.filter((challan) => {
      const matchesSearch = [
        challan.challanNo,
        challan.project,
        challan.material,
        challan.recipient,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || challan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [challans, search, statusFilter]);

  function openAddModal() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      challanNo: `CH-2026-${String(
        Math.max(0, ...challans.map((item) => item.id)) + 1
      ).padStart(3, "0")}`,
    });
    setError("");
    setModalOpen(true);
  }

  function openEditModal(challan: Challan) {
    setEditingId(challan.id);
    setForm({
      challanNo: challan.challanNo,
      project: challan.project,
      material: challan.material,
      quantity: String(challan.quantity),
      unit: challan.unit,
      recipient: challan.recipient,
      issueDate: challan.issueDate,
      status: challan.status,
      remarks: challan.remarks,
    });
    setError("");
    setModalOpen(true);
  }

  function saveChallan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const challanNo = form.challanNo.trim();
    const material = form.material.trim();
    const recipient = form.recipient.trim();
    const quantity = Number(form.quantity);

    if (!challanNo || !material || !recipient || !form.issueDate) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      form.quantity.trim() === "" ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      setError("Quantity must be a positive whole number.");
      return;
    }

    const duplicate = challans.some(
      (item) =>
        item.challanNo.toLowerCase() === challanNo.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      setError("This challan number already exists.");
      return;
    }

    const updated: Challan = {
      id: editingId ?? Date.now(),
      challanNo,
      project: form.project,
      material,
      quantity,
      unit: form.unit,
      recipient,
      issueDate: form.issueDate,
      status: form.status,
      remarks: form.remarks.trim(),
    };

    if (editingId !== null) {
      setChallans((previous) =>
        previous.map((item) => (item.id === editingId ? updated : item))
      );
      setNotice("Challan updated in this preview.");
    } else {
      setChallans((previous) => [updated, ...previous]);
      setNotice("Challan added to this preview.");
    }

    setModalOpen(false);
  }

  function deleteChallan() {
    if (deleteId === null) return;

    setChallans((previous) =>
      previous.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
    setNotice("Challan removed from this preview.");
  }

  function exportCsv() {
    const headers = [
      "Challan No",
      "Project",
      "Material",
      "Quantity",
      "Unit",
      "Recipient",
      "Issue Date",
      "Status",
      "Remarks",
    ];

    const rows = filteredChallans.map((item) => [
      item.challanNo,
      item.project,
      item.material,
      item.quantity,
      item.unit,
      item.recipient,
      item.issueDate,
      item.status,
      item.remarks,
    ]);

    const csvCell = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "material-challans-demo.csv";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Challan register exported.");
  }

  function printChallan(challan: Challan) {
    const printWindow = window.open("", "_blank", "width=850,height=700");

    if (!printWindow) {
      setNotice("Allow pop-ups in your browser to print the challan.");
      return;
    }

    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(challan.challanNo)}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 36px; color: #141414; }
            h1 { color: #004890; margin-bottom: 4px; }
            .sub { color: #666; margin-bottom: 28px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #f3f5f7; width: 35%; }
            .signatures { display: flex; justify-content: space-between; margin-top: 75px; }
            .signatures div { border-top: 1px solid #888; padding-top: 8px; width: 38%; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>MSD Engineering</h1>
          <div class="sub">The Fire Wala · Material Challan</div>
          <h2>Challan: ${escapeHtml(challan.challanNo)}</h2>
          <table>
            <tr><th>Project</th><td>${escapeHtml(challan.project)}</td></tr>
            <tr><th>Material</th><td>${escapeHtml(challan.material)}</td></tr>
            <tr><th>Quantity</th><td>${challan.quantity} ${escapeHtml(challan.unit)}</td></tr>
            <tr><th>Recipient</th><td>${escapeHtml(challan.recipient)}</td></tr>
            <tr><th>Issue Date</th><td>${escapeHtml(formatDate(challan.issueDate))}</td></tr>
            <tr><th>Status</th><td>${escapeHtml(challan.status)}</td></tr>
            <tr><th>Remarks</th><td>${escapeHtml(challan.remarks || "—")}</td></tr>
          </table>
          <div class="signatures">
            <div>Authorized By</div>
            <div>Received By</div>
          </div>
          <script>window.onload = () => window.print();<\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              ADMIN WORKSPACE
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
              Material Challans
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track material movement, issue records, and return acknowledgements.
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
              Create Challan
            </button>
          </div>
        </section>

        <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-slate-700">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#e87010]" />
          <p>
            <strong>Preview mode:</strong> All challan records are sample data.
            Changes are not saved to a database or connected to inventory.
          </p>
        </div>

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

        {/* Summary cards */}
{/* Compact summary cards */}
<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
  {[
    {
      label: "Total Challans",
      value: challans.length,
      color: "#004890",
      trackColor: "#dbeafe",
      filter: "All",
      percentage: 100,
    },
    {
      label: "Issued",
      value: issuedCount,
      color: "#004890",
      trackColor: "#dbeafe",
      filter: "Issued",
      percentage:
        challans.length > 0
          ? Math.round((issuedCount / challans.length) * 100)
          : 0,
    },
    {
      label: "Returned",
      value: returnedCount,
      color: "#16805d",
      trackColor: "#d1fae5",
      filter: "Returned",
      percentage:
        challans.length > 0
          ? Math.round((returnedCount / challans.length) * 100)
          : 0,
    },
    {
      label: "Pending",
      value: pendingCount,
      color: "#e87010",
      trackColor: "#ffedd5",
      filter: "Pending",
      percentage:
        challans.length > 0
          ? Math.round((pendingCount / challans.length) * 100)
          : 0,
    },
  ].map((card) => (
    <button
      key={card.label}
      type="button"
      onClick={() => setStatusFilter(card.filter)}
      className={`rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md sm:p-4 ${
        statusFilter === card.filter
          ? "border-[#004890]/40 ring-1 ring-[#004890]/10"
          : "border-slate-200"
      }`}
    >
      <div className="flex min-h-[100px] items-center justify-between gap-2">
        {/* Card information */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-5 text-slate-500">
            {card.label}
          </p>

          <p
            className="mt-2 text-3xl font-extrabold tracking-tight"
            style={{ color: card.color }}
          >
            {card.value}
          </p>

          <p className="mt-1 text-xs leading-4 text-slate-500">
            Click to filter challans
          </p>
        </div>

        {/* Circular percentage */}
        <CircularProgress
          percentage={card.percentage}
          color={card.color}
          trackColor={card.trackColor}
        />
      </div>
    </button>
  ))}
</section>

        {/* Challan register */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-bold text-[#141414]">Challan Register</h2>
              <p className="mt-1 text-xs text-slate-500">
                Search, inspect, and manage material challan records.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search challans..."
                  aria-label="Search challans"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-48"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by challan status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All statuses</option>
                <option value="Issued">Issued</option>
                <option value="Returned">Returned</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Challan Details</th>
                  <th className="px-4 py-4">Project</th>
                  <th className="px-4 py-4">Material / Qty.</th>
                  <th className="px-4 py-4">Recipient</th>
                  <th className="px-4 py-4">Issue Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallans.map((challan) => (
                  <tr
                    key={challan.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#004890]">
                        {challan.challanNo}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Material issue/return
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {challan.project}
                    </td>
                    <td className="px-4 py-4">
                      <p className="max-w-[230px] text-sm font-medium text-[#141414]">
                        {challan.material}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {challan.quantity} {challan.unit}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {challan.recipient}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {formatDate(challan.issueDate)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles(challan.status)}`}>
                        {challan.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setViewChallan(challan)}
                          title="View challan"
                          aria-label={`View ${challan.challanNo}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(challan)}
                          title="Edit challan"
                          aria-label={`Edit ${challan.challanNo}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => printChallan(challan)}
                          title="Print challan"
                          aria-label={`Print ${challan.challanNo}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#141414]"
                        >
                          <Printer size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(challan.id)}
                          title="Delete challan"
                          aria-label={`Delete ${challan.challanNo}`}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredChallans.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <ClipboardList size={30} className="mx-auto text-slate-300" />
                      <p className="mt-3 text-sm font-semibold text-slate-600">
                        No challans found
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Try a different search term or status.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filteredChallans.length} of {challans.length} challans
            </p>
            <p className="text-xs text-slate-400">
              Sample data · No inventory integration
            </p>
          </div>
        </section>

        {/* Add/Edit form */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setModalOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="challan-form-title"
              className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2 id="challan-form-title" className="text-lg font-bold text-[#141414]">
                    {editingId !== null ? "Edit Challan" : "Create Material Challan"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Complete the details for this sample record.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close form"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <form onSubmit={saveChallan} className="space-y-5 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Challan Number *
                    <input
                      required
                      maxLength={40}
                      value={form.challanNo}
                      onChange={(event) => setForm({ ...form, challanNo: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Issue Date *
                    <input
                      type="date"
                      required
                      value={form.issueDate}
                      onChange={(event) => setForm({ ...form, issueDate: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Project *
                    <select
                      value={form.project}
                      onChange={(event) => setForm({ ...form, project: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {projects.map((project) => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Material Name *
                    <input
                      required
                      maxLength={120}
                      value={form.material}
                      onChange={(event) => setForm({ ...form, material: event.target.value })}
                      placeholder="Enter material name"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Quantity *
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={form.quantity}
                      onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Unit
                    <select
                      value={form.unit}
                      onChange={(event) => setForm({ ...form, unit: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      <option>Nos.</option>
                      <option>Meters</option>
                      <option>Sets</option>
                      <option>Boxes</option>
                      <option>Kg</option>
                      <option>Liters</option>
                    </select>
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Recipient / In-charge *
                    <input
                      required
                      maxLength={100}
                      value={form.recipient}
                      onChange={(event) => setForm({ ...form, recipient: event.target.value })}
                      placeholder="Enter recipient name"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Status
                    <select
                      value={form.status}
                      onChange={(event) => setForm({ ...form, status: event.target.value as ChallanStatus })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Issued">Issued</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Remarks
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={form.remarks}
                      onChange={(event) => setForm({ ...form, remarks: event.target.value })}
                      placeholder="Optional remarks"
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>
                </div>

                {error && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                  >
                    {editingId !== null ? "Save Changes" : "Create Challan"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* View details */}
        {viewChallan && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setViewChallan(null);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="challan-view-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 id="challan-view-title" className="text-lg font-bold text-[#141414]">
                    Challan Details
                  </h2>
                  <p className="mt-1 text-xs text-[#004890]">{viewChallan.challanNo}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewChallan(null)}
                  aria-label="Close details"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                {[
                  ["Project", viewChallan.project],
                  ["Material", viewChallan.material],
                  ["Quantity", `${viewChallan.quantity} ${viewChallan.unit}`],
                  ["Recipient", viewChallan.recipient],
                  ["Issue Date", formatDate(viewChallan.issueDate)],
                  ["Status", viewChallan.status],
                  ["Remarks", viewChallan.remarks || "—"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm last:border-0">
                    <span className="text-slate-500">{label}</span>
                    <span className="max-w-[65%] text-right font-medium text-[#141414]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() => printChallan(viewChallan)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#004890] hover:bg-blue-50"
                >
                  <Printer size={16} />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setViewChallan(null)}
                  className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                >
                  Close
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Delete confirmation */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
            <section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-challan-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>
              <h2 id="delete-challan-title" className="mt-4 text-lg font-bold text-[#141414]">
                Delete this challan?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the record from this UI preview only.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteChallan}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Challan
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}