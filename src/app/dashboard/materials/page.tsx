
"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CircleCheck,
  XCircle,
  Pencil,
  Trash2,
  X,
  Boxes,
  ArrowDownToLine,
} from "lucide-react";

type Material = {
  id: number;
  name: string;
  code: string;
  category: string;
  unit: string;
  quantity: number;
  reorderLevel: number;
  location: string;
};

const initialMaterials: Material[] = [
  {
    id: 1,
    name: "ABC Fire Extinguisher 4 kg",
    code: "FE-ABC-004",
    category: "Fire Extinguishers",
    unit: "Nos.",
    quantity: 48,
    reorderLevel: 15,
    location: "Main Store",
  },
  {
    id: 2,
    name: "ABC Fire Extinguisher 6 kg",
    code: "FE-ABC-006",
    category: "Fire Extinguishers",
    unit: "Nos.",
    quantity: 12,
    reorderLevel: 15,
    location: "Main Store",
  },
  {
    id: 3,
    name: "Fire Hose Pipe 15 m",
    code: "FH-015",
    category: "Hose & Accessories",
    unit: "Nos.",
    quantity: 26,
    reorderLevel: 10,
    location: "Store A",
  },
  {
    id: 4,
    name: "Landing Valve 63 mm",
    code: "LV-063",
    category: "Valves & Fittings",
    unit: "Nos.",
    quantity: 0,
    reorderLevel: 8,
    location: "Store A",
  },
  {
    id: 5,
    name: "Sprinkler Head 68°C",
    code: "SP-068",
    category: "Sprinkler System",
    unit: "Nos.",
    quantity: 150,
    reorderLevel: 50,
    location: "Main Store",
  },
  {
    id: 6,
    name: "MS Fire Fighting Pipe",
    code: "MS-PIPE-025",
    category: "Pipes & Fittings",
    unit: "Meters",
    quantity: 35,
    reorderLevel: 40,
    location: "Store B",
  },
  {
    id: 7,
    name: "Fire Alarm Manual Call Point",
    code: "FA-MCP-01",
    category: "Fire Alarm System",
    unit: "Nos.",
    quantity: 32,
    reorderLevel: 10,
    location: "Main Store",
  },
];

const emptyForm = {
  name: "",
  code: "",
  category: "Fire Extinguishers",
  unit: "Nos.",
  quantity: "0",
  reorderLevel: "10",
  location: "Main Store",
};

const categories = [
  "Fire Extinguishers",
  "Hose & Accessories",
  "Valves & Fittings",
  "Sprinkler System",
  "Pipes & Fittings",
  "Fire Alarm System",
  "Other",
];

function getStockStatus(material: Material) {
  if (material.quantity === 0) return "Out of Stock";
  if (material.quantity <= material.reorderLevel) return "Low Stock";
  return "In Stock";
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
  const safePercentage = Math.min(100, Math.max(0, percentage));
  const offset =
    circumference - (safePercentage / 100) * circumference;

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

export default function MaterialsPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const inStockCount = materials.filter(
    (item) => getStockStatus(item) === "In Stock"
  ).length;

  const lowStockCount = materials.filter(
    (item) => getStockStatus(item) === "Low Stock"
  ).length;

  const outOfStockCount = materials.filter(
    (item) => getStockStatus(item) === "Out of Stock"
  ).length;

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        getStockStatus(item) === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [materials, search, statusFilter, categoryFilter]);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEditModal(material: Material) {
    setEditingId(material.id);
    setForm({
      name: material.name,
      code: material.code,
      category: material.category,
      unit: material.unit,
      quantity: String(material.quantity),
      reorderLevel: String(material.reorderLevel),
      location: material.location,
    });
    setError("");
    setModalOpen(true);
  }

  function saveMaterial(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const code = form.code.trim();

    if (!name || !code) {
      setError("Material name and material code are required.");
      return;
    }

    const quantity = Number(form.quantity);
    const reorderLevel = Number(form.reorderLevel);

    if (
      form.quantity.trim() === "" ||
      form.reorderLevel.trim() === "" ||
      !Number.isInteger(quantity) ||
      !Number.isInteger(reorderLevel) ||
      quantity < 0 ||
      reorderLevel < 0
    ) {
      setError("Stock quantity and reorder level must be non-negative whole numbers.");
      return;
    }

    const duplicateCode = materials.some(
      (item) =>
        item.code.toLowerCase() === code.toLowerCase() &&
        item.id !== editingId
    );

    if (duplicateCode) {
      setError("This material code already exists.");
      return;
    }

    const material: Material = {
      id: editingId ?? Date.now(),
      name,
      code,
      category: form.category,
      unit: form.unit,
      quantity,
      reorderLevel,
      location: form.location.trim() || "Main Store",
    };

    if (editingId !== null) {
      setMaterials((previous) =>
        previous.map((item) =>
          item.id === editingId ? material : item
        )
      );
      setNotice("Material updated in this preview.");
    } else {
      setMaterials((previous) => [material, ...previous]);
      setNotice("Material added to this preview.");
    }

    setModalOpen(false);
  }

  function deleteMaterial() {
    if (deleteId === null) return;

    setMaterials((previous) =>
      previous.filter((item) => item.id !== deleteId)
    );

    setDeleteId(null);
    setNotice("Material removed from this preview.");
  }

  function exportMaterials() {
    const headers = [
      "Material Name",
      "Material Code",
      "Category",
      "Unit",
      "Quantity",
      "Reorder Level",
      "Location",
      "Status",
    ];

    const rows = filteredMaterials.map((item) => [
      item.name,
      item.code,
      item.category,
      item.unit,
      item.quantity,
      item.reorderLevel,
      item.location,
      getStockStatus(item),
    ]);

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "material-inventory-demo.csv";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Inventory CSV exported.");
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              ADMIN WORKSPACE
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
              Material Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track inventory, stock availability, and material requirements.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportMaterials}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#004890] hover:bg-slate-50"
            >
              <ArrowDownToLine size={16} />
              Export CSV
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
            >
              <Plus size={17} />
              Add Material
            </button>
          </div>
        </section>

        {/* Demo notice */}
        <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-slate-700">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-[#e87010]"
          />
          <p>
            <strong>Preview mode:</strong> Inventory changes exist only in
            this page's local state. They are not saved to a database.
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

      
{/* Compact summary cards with circular percentages */}
<section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
  {[
    {
      label: "Total Materials",
      value: materials.length,
      color: "#004890",
      trackColor: "#dbeafe",
      filter: "All",
      percentage: 100,
    },
    {
      label: "In Stock",
      value: inStockCount,
      color: "#16805d",
      trackColor: "#d1fae5",
      filter: "In Stock",
      percentage:
        materials.length > 0
          ? Math.round((inStockCount / materials.length) * 100)
          : 0,
    },
    {
      label: "Low Stock",
      value: lowStockCount,
      color: "#e87010",
      trackColor: "#ffedd5",
      filter: "Low Stock",
      percentage:
        materials.length > 0
          ? Math.round((lowStockCount / materials.length) * 100)
          : 0,
    },
    {
      label: "Out of Stock",
      value: outOfStockCount,
      color: "#dc2626",
      trackColor: "#fee2e2",
      filter: "Out of Stock",
      percentage:
        materials.length > 0
          ? Math.round((outOfStockCount / materials.length) * 100)
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
            Click to filter inventory
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

        {/* Inventory table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-bold text-[#141414]">
                  Inventory Register
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Search and manage your sample material records.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                  <Search size={16} className="shrink-0 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search materials..."
                    aria-label="Search materials"
                    className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-48"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  aria-label="Filter by category"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                >
                  <option value="All">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by stock status"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                >
                  <option value="All">All statuses</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Material</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Available Stock</th>
                  <th className="px-4 py-4">Reorder Level</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMaterials.map((material) => {
                  const status = getStockStatus(material);

                  const badgeClass =
                    status === "In Stock"
                      ? "bg-emerald-50 text-emerald-700"
                      : status === "Low Stock"
                        ? "bg-orange-50 text-[#c45b08]"
                        : "bg-red-50 text-red-700";

                  return (
                    <tr
                      key={material.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#004890]">
                            <Package size={19} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#141414]">
                              {material.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {material.code}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {material.category}
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-[#141414]">
                          {material.quantity}
                        </span>
                        <span className="ml-1 text-xs text-slate-500">
                          {material.unit}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {material.reorderLevel} {material.unit}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {material.location}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(material)}
                            aria-label={`Edit ${material.name}`}
                            title="Edit material"
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(material.id)}
                            aria-label={`Delete ${material.name}`}
                            title="Delete material"
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredMaterials.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center"
                    >
                      <Package
                        size={30}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 text-sm font-semibold text-slate-600">
                        No materials found
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filteredMaterials.length} of {materials.length} materials
            </p>
            <p className="text-xs text-slate-400">
              Demo inventory · Not connected to a database
            </p>
          </div>
        </section>

        {/* Add / Edit modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setModalOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="material-modal-title"
              className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="material-modal-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null ? "Edit Material" : "Add New Material"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Enter inventory details for this preview.
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

              <form onSubmit={saveMaterial} className="space-y-5 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Material Name *
                    <input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="e.g. ABC Fire Extinguisher 4 kg"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Material Code *
                    <input
                      required
                      maxLength={40}
                      value={form.code}
                      onChange={(event) =>
                        setForm({ ...form, code: event.target.value })
                      }
                      placeholder="e.g. FE-ABC-004"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Category
                    <select
                      value={form.category}
                      onChange={(event) =>
                        setForm({ ...form, category: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Unit
                    <select
                      value={form.unit}
                      onChange={(event) =>
                        setForm({ ...form, unit: event.target.value })
                      }
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
                    Available Quantity *
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={form.quantity}
                      onChange={(event) =>
                        setForm({ ...form, quantity: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Reorder Level *
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={form.reorderLevel}
                      onChange={(event) =>
                        setForm({ ...form, reorderLevel: event.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Storage Location
                    <input
                      maxLength={100}
                      value={form.location}
                      onChange={(event) =>
                        setForm({ ...form, location: event.target.value })
                      }
                      placeholder="e.g. Main Store"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
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
                    {editingId !== null ? "Save Changes" : "Add Material"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* Delete confirmation */}
        {deleteId !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
            <section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>
              <h2
                id="delete-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this material?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the item from the current UI preview only. It
                will not delete anything from a database.
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
                  onClick={deleteMaterial}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Material
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}