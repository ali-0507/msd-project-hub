
"use client";

import { useMemo, useState } from "react";
import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";
import {
  Package,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Boxes,
  Eye,
  X,
  MapPin,
  ArrowDownToLine,
  Layers,
} from "lucide-react";

type MaterialStatus = "Available" | "Low Stock" | "Out of Stock";

type Material = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minimumStock: number;
  unit: string;
  location: string;
  project: string;
  status: MaterialStatus;
};

const initialMaterials: Material[] = [
  {
    id: "MAT-001",
    name: "ABC Fire Extinguisher 4 kg",
    category: "Fire Extinguishers",
    quantity: 120,
    minimumStock: 30,
    unit: "Units",
    location: "Central Warehouse",
    project: "Corporate Tower",
    status: "Available",
  },
  {
    id: "MAT-002",
    name: "ABC Fire Extinguisher 6 kg",
    category: "Fire Extinguishers",
    quantity: 18,
    minimumStock: 25,
    unit: "Units",
    location: "Central Warehouse",
    project: "IT Park Phase 2",
    status: "Low Stock",
  },
  {
    id: "MAT-003",
    name: "CO2 Fire Extinguisher 4.5 kg",
    category: "Fire Extinguishers",
    quantity: 45,
    minimumStock: 15,
    unit: "Units",
    location: "Warehouse A",
    project: "Hospital Project",
    status: "Available",
  },
  {
    id: "MAT-004",
    name: "Fire Hose Pipe",
    category: "Fire Fighting Equipment",
    quantity: 8,
    minimumStock: 20,
    unit: "Pieces",
    location: "Warehouse B",
    project: "Mall Project",
    status: "Low Stock",
  },
  {
    id: "MAT-005",
    name: "Hose Reel Drum",
    category: "Fire Fighting Equipment",
    quantity: 0,
    minimumStock: 5,
    unit: "Units",
    location: "Warehouse B",
    project: "Corporate Tower",
    status: "Out of Stock",
  },
  {
    id: "MAT-006",
    name: "Fire Alarm Control Panel",
    category: "Fire Alarm Systems",
    quantity: 12,
    minimumStock: 5,
    unit: "Units",
    location: "Central Warehouse",
    project: "IT Park Phase 2",
    status: "Available",
  },
  {
    id: "MAT-007",
    name: "Smoke Detector",
    category: "Fire Alarm Systems",
    quantity: 15,
    minimumStock: 20,
    unit: "Units",
    location: "Warehouse A",
    project: "Hospital Project",
    status: "Low Stock",
  },
  {
    id: "MAT-008",
    name: "Sprinkler Head",
    category: "Sprinkler Systems",
    quantity: 240,
    minimumStock: 50,
    unit: "Pieces",
    location: "Central Warehouse",
    project: "Mall Project",
    status: "Available",
  },
  {
    id: "MAT-009",
    name: "Fire Hydrant Valve",
    category: "Fire Fighting Equipment",
    quantity: 0,
    minimumStock: 10,
    unit: "Pieces",
    location: "Warehouse B",
    project: "Corporate Tower",
    status: "Out of Stock",
  },
  {
    id: "MAT-010",
    name: "Fire Alarm Cable",
    category: "Electrical Materials",
    quantity: 350,
    minimumStock: 100,
    unit: "Meters",
    location: "Warehouse A",
    project: "IT Park Phase 2",
    status: "Available",
  },
];

const statusStyles: Record<MaterialStatus, string> = {
  Available: "bg-green-50 text-green-700 border-green-200",
  "Low Stock": "bg-orange-50 text-orange-700 border-orange-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: typeof Package;
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

export default function ManagementMaterialsPage() {
  const [materials] = useState<Material[]>(initialMaterials);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedMaterial, setSelectedMaterial] =
    useState<Material | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const categories = useMemo(
    () => Array.from(new Set(materials.map((item) => item.category))),
    [materials]
  );

  const summary = useMemo(
    () => ({
      total: materials.length,
      available: materials.filter((item) => item.status === "Available").length,
      low: materials.filter((item) => item.status === "Low Stock").length,
      out: materials.filter((item) => item.status === "Out of Stock").length,
    }),
    [materials]
  );

  const filteredMaterials = useMemo(() => {
    const term = search.toLowerCase().trim();

    return materials.filter((item) => {
      const matchesSearch =
        !term ||
        item.id.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.project.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [materials, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMaterials.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function exportCSV() {
    const headers = [
      "Material ID",
      "Material Name",
      "Category",
      "Quantity",
      "Unit",
      "Minimum Stock",
      "Location",
      "Project",
      "Status",
    ];

    const rows = filteredMaterials.map((item) => [
      item.id,
      item.name,
      item.category,
      item.quantity,
      item.unit,
      item.minimumStock,
      item.location,
      item.project,
      item.status,
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
    link.download = "fire-wala-material-inventory.csv";
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
              <span className="text-[#004890]">Material Management</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              Material Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor inventory, stock availability, and material shortages
              across projects.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
          >
            <Download size={17} />
            Export Inventory
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Materials"
            value={summary.total}
            subtitle="Different material types"
            icon={Boxes}
            iconClass="bg-blue-50 text-[#004890]"
          />
          <SummaryCard
            title="Available Stock"
            value={summary.available}
            subtitle="Materials with sufficient stock"
            icon={CheckCircle2}
            iconClass="bg-green-50 text-green-700"
          />
          <SummaryCard
            title="Low Stock"
            value={summary.low}
            subtitle="Require replenishment soon"
            icon={AlertTriangle}
            iconClass="bg-orange-50 text-[#e87010]"
          />
          <SummaryCard
            title="Out of Stock"
            value={summary.out}
            subtitle="Currently unavailable"
            icon={XCircle}
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* Inventory overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Layers size={19} className="text-[#004890]" />
              <h2 className="font-semibold text-[#141414]">
                Inventory Overview
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Total Stock Quantity</p>
                <p className="mt-2 text-xl font-bold text-[#141414]">
                  {materials.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Across listed materials
                </p>
              </div>
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="text-xs text-orange-700">Reorder Attention</p>
                <p className="mt-2 text-xl font-bold text-orange-800">
                  {summary.low + summary.out}
                </p>
                <p className="mt-1 text-xs text-orange-700">
                  Low or unavailable stock items
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs text-[#004890]">Storage Locations</p>
                <p className="mt-2 text-xl font-bold text-[#004890]">
                  {new Set(materials.map((item) => item.location)).size}
                </p>
                <p className="mt-1 text-xs text-[#004890]">
                  Locations in this inventory
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle size={19} />
              <h2 className="font-semibold">Stock Attention</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-orange-900">
              {summary.low + summary.out} material types need attention.
              Review low-stock and unavailable items before scheduling project
              installations.
            </p>
            <button
              onClick={() => {
                setStatusFilter("Low Stock");
                setCategoryFilter("All");
                setSearch("");
                setPage(1);
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-800 hover:underline"
            >
              Review low stock
              <ArrowDownToLine size={15} />
            </button>
            <button
              onClick={() => {
                setStatusFilter("Out of Stock");
                setCategoryFilter("All");
                setSearch("");
                setPage(1);
              }}
              className="ml-4 mt-4 text-sm font-semibold text-orange-800 hover:underline"
            >
              Out of stock
            </button>
          </div>
        </div>

        {/* Inventory table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-[#141414]">
              Material Inventory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search, filter, and review material stock across locations.
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
                  placeholder="Search name, ID, project..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#004890] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">All Stock Statuses</option>
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Material</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Stock</th>
                  <th className="px-5 py-4 font-semibold">Minimum Stock</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedMaterials.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-gray-50/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-[#004890]">
                          <Package size={19} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#141414]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.category}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#141414]">
                        {item.quantity.toLocaleString()} {item.unit}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.minimumStock} {item.unit}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin size={14} />
                        {item.location}
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.project}
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
                        onClick={() => setSelectedMaterial(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedMaterials.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      <Package size={30} className="mx-auto mb-3 text-gray-300" />
                      No materials match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredMaterials.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredMaterials.length)} of{" "}
              {filteredMaterials.length} materials
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
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

      {/* Material details modal */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMaterial(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="material-modal-title"
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-[#004890]">
                  <Package size={24} />
                </div>
                <div>
                  <h2
                    id="material-modal-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    Material Details
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedMaterial.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                aria-label="Close material details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs text-gray-500">Material Name</p>
                <p className="mt-1 font-semibold text-[#141414]">
                  {selectedMaterial.name}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedMaterial.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Stock</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedMaterial.quantity} {selectedMaterial.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Minimum Stock</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedMaterial.minimumStock} {selectedMaterial.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Storage Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedMaterial.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assigned Project</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedMaterial.project}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stock Status</p>
                  <span
                    className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedMaterial.status]}`}
                  >
                    {selectedMaterial.status}
                  </span>
                </div>
              </div>

              {selectedMaterial.status !== "Available" && (
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                    <p>
                      This material needs stock attention. Coordinate with the
                      store team to plan replenishment.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedMaterial(null)}
                className="w-full rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00386f]"
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
