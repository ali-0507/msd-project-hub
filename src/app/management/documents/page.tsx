
"use client";

import { useMemo, useState } from "react";
import ManagementDashboardShell from "@/src/components/dashboard/management-dashboard-shell";
import {
  Search,
  Download,
  Files,
  FileText,
  FileCheck,
  Clock,
  XCircle,
  Eye,
  X,
  FolderKanban,
  CalendarDays,
  UserRound,
  Filter,
  FileSpreadsheet,
  FileImage,
  File,
} from "lucide-react";

type DocumentStatus = "Approved" | "Pending Review" | "Rejected";
type DocumentCategory =
  | "Installation Report"
  | "Certificate"
  | "Inspection Report"
  | "Material Record"
  | "Site Photos"
  | "Other";

type ProjectDocument = {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  category: DocumentCategory;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  status: DocumentStatus;
  description: string;
};

const initialDocuments: ProjectDocument[] = [
  {
    id: "DOC-001",
    name: "Fire Extinguisher Installation Report",
    projectId: "FW-001",
    projectName: "Corporate Tower",
    category: "Installation Report",
    fileType: "PDF",
    fileSize: "2.4 MB",
    uploadedBy: "Installation Team A",
    uploadDate: "2026-10-08",
    status: "Approved",
    description:
      "Installation record containing equipment details, installation checks, and completion information.",
  },
  {
    id: "DOC-002",
    name: "Fire Safety Compliance Certificate",
    projectId: "FW-001",
    projectName: "Corporate Tower",
    category: "Certificate",
    fileType: "PDF",
    fileSize: "1.8 MB",
    uploadedBy: "Project Manager",
    uploadDate: "2026-10-09",
    status: "Pending Review",
    description:
      "Certificate submitted for management review. Verify the contents and applicable approvals.",
  },
  {
    id: "DOC-003",
    name: "Fire Alarm Inspection Report",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    category: "Inspection Report",
    fileType: "PDF",
    fileSize: "3.1 MB",
    uploadedBy: "Inspection Team",
    uploadDate: "2026-10-07",
    status: "Approved",
    description:
      "Inspection findings and observations for the fire alarm system.",
  },
  {
    id: "DOC-004",
    name: "Material Issue Register",
    projectId: "FW-002",
    projectName: "IT Park Phase 2",
    category: "Material Record",
    fileType: "XLSX",
    fileSize: "860 KB",
    uploadedBy: "Store Team",
    uploadDate: "2026-10-10",
    status: "Pending Review",
    description:
      "Record of materials issued to the site for project execution.",
  },
  {
    id: "DOC-005",
    name: "Sprinkler Installation Photos",
    projectId: "FW-003",
    projectName: "Hospital Project",
    category: "Site Photos",
    fileType: "ZIP",
    fileSize: "12.5 MB",
    uploadedBy: "Installation Team B",
    uploadDate: "2026-10-06",
    status: "Approved",
    description:
      "Collection of site photographs documenting sprinkler installation work.",
  },
  {
    id: "DOC-006",
    name: "Hydrant Pressure Test Report",
    projectId: "FW-004",
    projectName: "Shopping Mall",
    category: "Inspection Report",
    fileType: "PDF",
    fileSize: "2.7 MB",
    uploadedBy: "Testing Team",
    uploadDate: "2026-10-05",
    status: "Rejected",
    description:
      "Pressure testing report returned for correction and resubmission.",
  },
  {
    id: "DOC-007",
    name: "Equipment Delivery Challan",
    projectId: "FW-005",
    projectName: "Manufacturing Unit",
    category: "Material Record",
    fileType: "PDF",
    fileSize: "940 KB",
    uploadedBy: "Store Team",
    uploadDate: "2026-10-04",
    status: "Approved",
    description:
      "Delivery and receipt record for fire safety equipment supplied to the project.",
  },
  {
    id: "DOC-008",
    name: "Alarm System Commissioning Report",
    projectId: "FW-006",
    projectName: "Office Complex",
    category: "Installation Report",
    fileType: "PDF",
    fileSize: "2.2 MB",
    uploadedBy: "Testing Team",
    uploadDate: "2026-10-11",
    status: "Pending Review",
    description:
      "Commissioning records and test observations for the fire alarm system.",
  },
  {
    id: "DOC-009",
    name: "Fire Extinguisher Service Record",
    projectId: "FW-007",
    projectName: "Warehouse Project",
    category: "Other",
    fileType: "PDF",
    fileSize: "1.2 MB",
    uploadedBy: "Service Team",
    uploadDate: "2026-10-03",
    status: "Approved",
    description:
      "Service record containing details of extinguisher inspection and refilling.",
  },
  {
    id: "DOC-010",
    name: "Handover Documentation",
    projectId: "FW-008",
    projectName: "Residential Complex",
    category: "Other",
    fileType: "DOCX",
    fileSize: "1.5 MB",
    uploadedBy: "Handover Team",
    uploadDate: "2026-10-02",
    status: "Rejected",
    description:
      "Project handover documentation returned for additional information.",
  },
];

const statusStyles: Record<DocumentStatus, string> = {
  Approved: "border-green-200 bg-green-50 text-green-700",
  "Pending Review": "border-orange-200 bg-orange-50 text-orange-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getFileIcon(fileType: string) {
  switch (fileType.toUpperCase()) {
    case "PDF":
      return FileText;
    case "XLSX":
    case "XLS":
      return FileSpreadsheet;
    case "JPG":
    case "JPEG":
    case "PNG":
      return FileImage;
    case "DOC":
    case "DOCX":
      return FileText;
    default:
      return File;
  }
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: typeof Files;
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

export default function ManagementDocumentsPage() {
  const [documents] = useState<ProjectDocument[]>(initialDocuments);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDocument, setSelectedDocument] =
    useState<ProjectDocument | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const categories = useMemo(
    () => Array.from(new Set(documents.map((doc) => doc.category))),
    [documents]
  );

  const summary = useMemo(
    () => ({
      total: documents.length,
      approved: documents.filter((doc) => doc.status === "Approved").length,
      pending: documents.filter(
        (doc) => doc.status === "Pending Review"
      ).length,
      rejected: documents.filter((doc) => doc.status === "Rejected").length,
    }),
    [documents]
  );

  const filteredDocuments = useMemo(() => {
    const term = search.toLowerCase().trim();

    return documents.filter((doc) => {
      const matchesSearch =
        !term ||
        doc.id.toLowerCase().includes(term) ||
        doc.name.toLowerCase().includes(term) ||
        doc.projectId.toLowerCase().includes(term) ||
        doc.projectName.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term) ||
        doc.uploadedBy.toLowerCase().includes(term);

      const matchesCategory =
        categoryFilter === "All" || doc.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || doc.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [documents, search, categoryFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocuments.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function exportCSV() {
    const headers = [
      "Document ID",
      "Document Name",
      "Project ID",
      "Project Name",
      "Category",
      "File Type",
      "File Size",
      "Uploaded By",
      "Upload Date",
      "Status",
      "Description",
    ];

    const rows = filteredDocuments.map((doc) => [
      doc.id,
      doc.name,
      doc.projectId,
      doc.projectName,
      doc.category,
      doc.fileType,
      doc.fileSize,
      doc.uploadedBy,
      doc.uploadDate,
      doc.status,
      doc.description,
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
    link.download = "fire-wala-documents-register.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function filterByStatus(status: string) {
    setStatusFilter(status);
    setCategoryFilter("All");
    setSearch("");
    setPage(1);
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
              <span className="text-[#004890]">Documents</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold text-[#141414] sm:text-3xl">
              Documents
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review project documents, installation reports, certificates,
              and inspection records.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
          >
            <Download size={17} />
            Export Register
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Documents"
            value={summary.total}
            subtitle="Documents in this register"
            icon={Files}
            iconClass="bg-blue-50 text-[#004890]"
          />

          <SummaryCard
            title="Approved"
            value={summary.approved}
            subtitle="Marked as approved"
            icon={FileCheck}
            iconClass="bg-green-50 text-green-700"
          />

          <SummaryCard
            title="Pending Review"
            value={summary.pending}
            subtitle="Awaiting management review"
            icon={Clock}
            iconClass="bg-orange-50 text-[#e87010]"
          />

          <SummaryCard
            title="Rejected"
            value={summary.rejected}
            subtitle="Require correction or resubmission"
            icon={XCircle}
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* Document review overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center gap-2">
              <FolderKanban size={20} className="text-[#004890]" />
              <h2 className="font-semibold text-[#141414]">
                Document Review Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Track the review status of documents submitted by project teams.
            </p>

            <div className="mt-5 space-y-5">
              {[
                {
                  label: "Approved documents",
                  count: summary.approved,
                  color: "bg-green-500",
                  textColor: "text-green-700",
                },
                {
                  label: "Pending review",
                  count: summary.pending,
                  color: "bg-[#e87010]",
                  textColor: "text-[#e87010]",
                },
                {
                  label: "Rejected documents",
                  count: summary.rejected,
                  color: "bg-red-500",
                  textColor: "text-red-600",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-600">
                      {item.label}
                    </span>
                    <span className={`text-sm font-semibold ${item.textColor}`}>
                      {item.count} / {summary.total}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${
                          summary.total
                            ? (item.count / summary.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 text-orange-800">
              <Clock size={20} />
              <h2 className="font-semibold">Review Required</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-orange-900">
              {summary.pending} documents are awaiting review and{" "}
              {summary.rejected} have been rejected. Review submitted records
              and coordinate any required corrections.
            </p>

            <button
              onClick={() => filterByStatus("Pending Review")}
              className="mt-4 text-sm font-semibold text-orange-800 hover:underline"
            >
              Review pending documents →
            </button>

            <button
              onClick={() => filterByStatus("Rejected")}
              className="mt-3 block text-sm font-semibold text-orange-800 hover:underline"
            >
              View rejected documents →
            </button>
          </div>
        </div>

        {/* Document register */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <div className="flex items-center gap-2">
              <Files size={20} className="text-[#004890]" />
              <h2 className="text-lg font-semibold text-[#141414]">
                Document Register
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Search and filter project documents by category and review status.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative">
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
                  placeholder="Search name, project, ID..."
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
                <option value="All">All Review Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Document</th>
                  <th className="px-5 py-4 font-semibold">Project</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Uploaded By</th>
                  <th className="px-5 py-4 font-semibold">Upload Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedDocuments.map((doc) => {
                  const FileIcon = getFileIcon(doc.fileType);

                  return (
                    <tr key={doc.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-50 p-2.5 text-[#004890]">
                            <FileIcon size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#141414]">
                              {doc.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {doc.id} · {doc.fileType} · {doc.fileSize}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-700">
                          {doc.projectName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {doc.projectId}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {doc.category}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {doc.uploadedBy}
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-1.5 whitespace-nowrap text-gray-600">
                          <CalendarDays
                            size={14}
                            className="text-gray-400"
                          />
                          {formatDate(doc.uploadDate)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[doc.status]}`}
                        >
                          {doc.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedDocument(doc)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#004890] transition hover:bg-blue-50"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {paginatedDocuments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      <Files
                        size={30}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      No documents match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredDocuments.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(
                currentPage * pageSize,
                filteredDocuments.length
              )}{" "}
              of {filteredDocuments.length} documents
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setPage((prev) => Math.max(1, prev - 1))
                }
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

      {/* Document details modal */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-modal-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-[#004890]">
                  {(() => {
                    const FileIcon = getFileIcon(selectedDocument.fileType);
                    return <FileIcon size={24} />;
                  })()}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#004890]">
                    {selectedDocument.id}
                  </p>
                  <h2
                    id="document-modal-title"
                    className="mt-1 text-lg font-bold text-[#141414]"
                  >
                    {selectedDocument.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedDocument.projectName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocument(null)}
                aria-label="Close document details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedDocument.status]}`}
                >
                  {selectedDocument.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Project ID</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedDocument.projectId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedDocument.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">File Type</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedDocument.fileType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">File Size</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedDocument.fileSize}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Uploaded By</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800">
                    <UserRound size={14} />
                    {selectedDocument.uploadedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Upload Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {formatDate(selectedDocument.uploadDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#141414]">
                  Description
                </p>
                <p className="mt-2 rounded-lg border border-gray-200 p-3 text-sm leading-6 text-gray-600">
                  {selectedDocument.description}
                </p>
              </div>

              {selectedDocument.status !== "Approved" && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    selectedDocument.status === "Rejected"
                      ? "border-red-200 bg-red-50 text-red-800"
                      : "border-orange-200 bg-orange-50 text-orange-800"
                  }`}
                >
                  {selectedDocument.status === "Rejected"
                    ? "This document requires correction or resubmission."
                    : "This document is awaiting review by the responsible reviewer."}
                </div>
              )}

              <button
                onClick={() => setSelectedDocument(null)}
                className="w-full rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00386f]"
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
