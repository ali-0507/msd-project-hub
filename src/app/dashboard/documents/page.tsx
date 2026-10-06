"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  FileWarning,
  FolderOpen,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

type DocumentStatus = "Approved" | "Pending Review" | "Rejected" | "Expired";

type DocumentRecord = {
  id: number;
  documentNo: string;
  title: string;
  project: string;
  location: string;
  category: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
  expiryDate: string;
  status: DocumentStatus;
  size: string;
};

const initialDocuments: DocumentRecord[] = [
  {
    id: 1,
    documentNo: "DOC-001",
    title: "Fire System Layout Drawing",
    project: "ABC Corporate Tower",
    location: "Raipur",
    category: "Drawing",
    fileName: "ABC_Fire_Layout.pdf",
    uploadedBy: "Admin User",
    uploadDate: "2026-09-28",
    expiryDate: "-",
    status: "Approved",
    size: "2.4 MB",
  },
  {
    id: 2,
    documentNo: "DOC-002",
    title: "Fire Extinguisher Inspection Report",
    project: "City Mall Project",
    location: "Bhilai",
    category: "Inspection Report",
    fileName: "CityMall_Inspection.pdf",
    uploadedBy: "Rahul Sharma",
    uploadDate: "2026-09-29",
    expiryDate: "2027-09-29",
    status: "Pending Review",
    size: "1.8 MB",
  },
  {
    id: 3,
    documentNo: "DOC-003",
    title: "AMC Agreement",
    project: "Sunrise Hospital",
    location: "Raipur",
    category: "Work Order",
    fileName: "Sunrise_AMC_Agreement.pdf",
    uploadedBy: "Priya Singh",
    uploadDate: "2026-09-22",
    expiryDate: "2027-03-22",
    status: "Approved",
    size: "3.1 MB",
  },
  {
    id: 4,
    documentNo: "DOC-004",
    title: "Fire Safety Certificate",
    project: "Green Valley School",
    location: "Durg",
    category: "Certificate",
    fileName: "GreenValley_Fire_Certificate.pdf",
    uploadedBy: "Amit Verma",
    uploadDate: "2026-09-15",
    expiryDate: "2026-10-10",
    status: "Expired",
    size: "1.2 MB",
  },
  {
    id: 5,
    documentNo: "DOC-005",
    title: "Material Inspection Report",
    project: "Metro Commercial Complex",
    location: "Raipur",
    category: "Report",
    fileName: "Metro_Material_Report.pdf",
    uploadedBy: "Vikas Patel",
    uploadDate: "2026-09-30",
    expiryDate: "-",
    status: "Pending Review",
    size: "2.7 MB",
  },
  {
    id: 6,
    documentNo: "DOC-006",
    title: "Project Completion Certificate",
    project: "Shree Residency",
    location: "Bhilai",
    category: "Completion Certificate",
    fileName: "ShreeResidency_Completion.pdf",
    uploadedBy: "Admin User",
    uploadDate: "2026-09-12",
    expiryDate: "-",
    status: "Approved",
    size: "1.5 MB",
  },
];

const categories = [
  "All Categories",
  "Drawing",
  "Certificate",
  "Report",
  "Inspection Report",
  "Invoice",
  "Work Order",
  "Completion Certificate",
  "Other",
];

const statuses = [
  "All Status",
  "Approved",
  "Pending Review",
  "Rejected",
  "Expired",
];

function CircularProgress({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
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
            stroke="#004890"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-[#141414]">{value}%</span>
        </div>
      </div>

      <div>
        <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
          {icon}
        </div>

        <p className="text-sm font-semibold text-gray-800">{label}</p>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [documents, setDocuments] =
    useState<DocumentRecord[]>(initialDocuments);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState<DocumentRecord | null>(null);
  const [editingDocument, setEditingDocument] =
    useState<DocumentRecord | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    project: "",
    location: "",
    category: "Drawing",
    fileName: "",
    uploadedBy: "",
    uploadDate: "",
    expiryDate: "",
    status: "Pending Review" as DocumentStatus,
    size: "1.0 MB",
  });

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        document.documentNo.toLowerCase().includes(searchText) ||
        document.title.toLowerCase().includes(searchText) ||
        document.project.toLowerCase().includes(searchText) ||
        document.fileName.toLowerCase().includes(searchText) ||
        document.uploadedBy.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All Categories" ||
        document.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        document.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [documents, search, categoryFilter, statusFilter]);

  const totalDocuments = documents.length;

  const approvedDocuments = documents.filter(
    (document) => document.status === "Approved"
  ).length;

  const pendingDocuments = documents.filter(
    (document) => document.status === "Pending Review"
  ).length;

  const issueDocuments = documents.filter(
    (document) =>
      document.status === "Rejected" || document.status === "Expired"
  ).length;

  const approvedPercentage =
    totalDocuments > 0
      ? Math.round((approvedDocuments / totalDocuments) * 100)
      : 0;

  const pendingPercentage =
    totalDocuments > 0
      ? Math.round((pendingDocuments / totalDocuments) * 100)
      : 0;

  const issuePercentage =
    totalDocuments > 0
      ? Math.round((issueDocuments / totalDocuments) * 100)
      : 0;

  const resetForm = () => {
    setForm({
      title: "",
      project: "",
      location: "",
      category: "Drawing",
      fileName: "",
      uploadedBy: "",
      uploadDate: "",
      expiryDate: "",
      status: "Pending Review",
      size: "1.0 MB",
    });

    setEditingDocument(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (document: DocumentRecord) => {
    setForm({
      title: document.title,
      project: document.project,
      location: document.location,
      category: document.category,
      fileName: document.fileName,
      uploadedBy: document.uploadedBy,
      uploadDate: document.uploadDate,
      expiryDate: document.expiryDate === "-" ? "" : document.expiryDate,
      status: document.status,
      size: document.size,
    });

    setEditingDocument(document);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.project || !form.uploadedBy) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingDocument) {
      setDocuments((current) =>
        current.map((document) =>
          document.id === editingDocument.id
            ? {
                ...document,
                ...form,
                expiryDate: form.expiryDate || "-",
              }
            : document
        )
      );
    } else {
      const nextId =
        documents.length > 0
          ? Math.max(...documents.map((document) => document.id)) + 1
          : 1;

      const newDocument: DocumentRecord = {
        id: nextId,
        documentNo: `DOC-${String(nextId).padStart(3, "0")}`,
        ...form,
        expiryDate: form.expiryDate || "-",
      };

      setDocuments((current) => [newDocument, ...current]);
    }

    setShowForm(false);
    resetForm();
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    setDocuments((current) =>
      current.filter((document) => document.id !== deleteId)
    );

    setDeleteId(null);
  };

  const exportCSV = () => {
    const headers = [
      "Document No",
      "Title",
      "Project",
      "Location",
      "Category",
      "File Name",
      "Uploaded By",
      "Upload Date",
      "Expiry Date",
      "Status",
      "Size",
    ];

    const rows = filteredDocuments.map((document) => [
      document.documentNo,
      document.title,
      document.project,
      document.location,
      document.category,
      document.fileName,
      document.uploadedBy,
      document.uploadDate,
      document.expiryDate,
      document.status,
      document.size,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "documents.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getStatusStyle = (status: DocumentStatus) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Expired":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#141414]">
              Documents
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage project documents, certificates, reports and other
              important files.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Download size={17} />
              Export CSV
            </button>

            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003b78]"
            >
              <Plus size={17} />
              Add Document
            </button>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <FolderOpen
            size={19}
            className="mt-0.5 shrink-0 text-[#004890]"
          />

          <div>
            <p className="text-sm font-semibold text-[#004890]">
              Documents module preview
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              This interface currently uses sample local data. Actual file
              uploads and storage will be connected later.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={100}
              label={`Total Documents (${totalDocuments})`}
              icon={<FileText size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={approvedPercentage}
              label={`Approved (${approvedDocuments})`}
              icon={<FileCheck2 size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={pendingPercentage}
              label={`Pending Review (${pendingDocuments})`}
              icon={<FileWarning size={16} />}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <CircularProgress
              value={issuePercentage}
              label={`Issues (${issueDocuments})`}
              icon={<AlertTriangle size={16} />}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search document, project, file..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#004890] focus:bg-white"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#004890]"
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Document Register */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Document Register
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {filteredDocuments.length} document
                {filteredDocuments.length !== 1 ? "s" : ""} displayed
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FileText size={15} />
              Local preview data
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-semibold">Document</th>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Uploaded By</th>
                  <th className="px-5 py-3 font-semibold">Upload Date</th>
                  <th className="px-5 py-3 font-semibold">Expiry</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center"
                    >
                      <FileText
                        size={35}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-medium text-gray-600">
                        No documents found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((document) => (
                    <tr
                      key={document.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                            <FileText size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {document.title}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {document.documentNo} • {document.fileName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-700">
                          {document.project}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {document.location}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {document.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#e87010]">
                            <UserRound size={14} />
                          </div>

                          <span className="text-sm text-gray-600">
                            {document.uploadedBy}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <CalendarDays size={14} />
                          {document.uploadDate}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {document.expiryDate}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            document.status
                          )}`}
                        >
                          {document.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setShowView(document)}
                            title="View"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => openEditForm(document)}
                            title="Edit"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-[#e87010]"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => setDeleteId(document.id)}
                            title="Delete"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#141414]">
                Recent Documents
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Latest files added to the document register.
              </p>
            </div>

            <FolderOpen size={20} className="text-[#004890]" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {documents.slice(0, 3).map((document) => (
              <div
                key={document.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#004890] shadow-sm">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-700">
                    {document.fileName}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {document.size} • {document.uploadDate}
                  </p>
                </div>

                <button
                  onClick={() => setShowView(document)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-white hover:text-[#004890]"
                >
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  {editingDocument ? "Edit Document" : "Add Document"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Enter document information for the project register.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Document Title *
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Enter document title"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Project *
                  </label>

                  <input
                    type="text"
                    value={form.project}
                    onChange={(e) =>
                      setForm({ ...form, project: e.target.value })
                    }
                    placeholder="Project name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Location
                  </label>

                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Project location"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    {categories
                      .filter((category) => category !== "All Categories")
                      .map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as DocumentStatus,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  >
                    {statuses
                      .filter((status) => status !== "All Status")
                      .map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    File Name
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.fileName}
                      onChange={(e) =>
                        setForm({ ...form, fileName: e.target.value })
                      }
                      placeholder="Example: fire_layout.pdf"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    />

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Upload size={16} />
                      Upload
                    </button>
                  </div>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Actual file upload will be connected later.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Uploaded By *
                  </label>

                  <input
                    type="text"
                    value={form.uploadedBy}
                    onChange={(e) =>
                      setForm({ ...form, uploadedBy: e.target.value })
                    }
                    placeholder="Employee name"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    File Size
                  </label>

                  <input
                    type="text"
                    value={form.size}
                    onChange={(e) =>
                      setForm({ ...form, size: e.target.value })
                    }
                    placeholder="Example: 2.5 MB"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Upload Date
                  </label>

                  <input
                    type="date"
                    value={form.uploadDate}
                    onChange={(e) =>
                      setForm({ ...form, uploadDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({ ...form, expiryDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                >
                  {editingDocument ? "Update Document" : "Add Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#141414]">
                  Document Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {showView.documentNo}
                </p>
              </div>

              <button
                onClick={() => setShowView(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-[#004890]">
                  <FileText size={27} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">
                    {showView.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {showView.fileName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-400">Project</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.location || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Uploaded By</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.uploadedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Upload Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.uploadDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Expiry Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.expiryDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">File Size</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {showView.size}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                      showView.status
                    )}`}
                  >
                    {showView.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-4">
                <button
                  onClick={() => setShowView(null)}
                  className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b78]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold text-gray-800">
              Delete Document?
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              This document will be removed from the local document register.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}