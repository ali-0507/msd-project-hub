"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/src/components/dashboard/dashboard-shell";

import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  ArrowDownToLine,
  Camera,
  MapPin,
  CalendarDays,
  UserRound,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Upload,
  FolderOpen,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type PhotoCategory =
  | "Installation"
  | "Work Progress"
  | "Inspection"
  | "Completed Work"
  | "Site Condition";

type PhotoStatus =
  | "Pending Review"
  | "Approved"
  | "Rejected";

type SitePhoto = {
  id: number;
  photoNo: string;
  project: string;
  site: string;
  category: PhotoCategory;
  title: string;
  uploadedBy: string;
  uploadDate: string;
  status: PhotoStatus;
  remarks: string;
  imageUrl: string;
};

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialPhotos: SitePhoto[] = [
  {
    id: 1,
    photoNo: "PHOTO-2026-001",
    project: "Bharat Agro",
    site: "Bharat Agro Plant, Raipur",
    category: "Installation",
    title: "Fire Extinguisher Installation",
    uploadedBy: "Rahul Sharma",
    uploadDate: "2026-10-02",
    status: "Approved",
    remarks: "Extinguishers installed in production area.",
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    photoNo: "PHOTO-2026-002",
    project: "Shree Cement Fire System",
    site: "Shree Cement, Baloda Bazar",
    category: "Work Progress",
    title: "Hydrant Pipeline Work",
    uploadedBy: "Amit Verma",
    uploadDate: "2026-10-03",
    status: "Pending Review",
    remarks: "Pipeline installation approximately 45% complete.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    photoNo: "PHOTO-2026-003",
    project: "City Hospital Safety Upgrade",
    site: "City Hospital, Raipur",
    category: "Inspection",
    title: "Fire Alarm Inspection",
    uploadedBy: "Suresh Yadav",
    uploadDate: "2026-10-04",
    status: "Approved",
    remarks: "Inspection completed for alarm system.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    photoNo: "PHOTO-2026-004",
    project: "North Plaza Sprinkler",
    site: "North Plaza Mall",
    category: "Site Condition",
    title: "Sprinkler Installation Area",
    uploadedBy: "Vikas Patel",
    uploadDate: "2026-10-04",
    status: "Pending Review",
    remarks: "Site access issue visible in the installation area.",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    photoNo: "PHOTO-2026-005",
    project: "Industrial Safety Upgrade",
    site: "Industrial Area, Raipur",
    category: "Completed Work",
    title: "Fire Pump Installation",
    uploadedBy: "Neha Gupta",
    uploadDate: "2026-09-28",
    status: "Approved",
    remarks: "Fire pump installation completed.",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    photoNo: "PHOTO-2026-006",
    project: "Bharat Agro",
    site: "Bharat Agro Warehouse",
    category: "Work Progress",
    title: "Hose Reel Installation",
    uploadedBy: "Manoj Tiwari",
    uploadDate: "2026-10-05",
    status: "Rejected",
    remarks: "Photo needs to be retaken with wider site coverage.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
  },
];

/* =========================================================
   OPTIONS
========================================================= */

const projects = [
  "Bharat Agro",
  "Shree Cement Fire System",
  "City Hospital Safety Upgrade",
  "North Plaza Sprinkler",
  "Industrial Safety Upgrade",
  "Other",
];

const categories: PhotoCategory[] = [
  "Installation",
  "Work Progress",
  "Inspection",
  "Completed Work",
  "Site Condition",
];

const statuses: PhotoStatus[] = [
  "Pending Review",
  "Approved",
  "Rejected",
];

const teamMembers = [
  "Rahul Sharma",
  "Amit Verma",
  "Priya Singh",
  "Vikas Patel",
  "Neha Gupta",
  "Suresh Yadav",
  "Manoj Tiwari",
];

const emptyForm = {
  photoNo: "",
  project: projects[0],
  site: "",
  category: "Installation" as PhotoCategory,
  title: "",
  uploadedBy: teamMembers[0],
  uploadDate: new Date().toLocaleDateString("en-CA"),
  status: "Pending Review" as PhotoStatus,
  remarks: "",
  imageUrl: "",
};

/* =========================================================
   CIRCULAR PROGRESS
========================================================= */

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

/* =========================================================
   STATUS STYLES
========================================================= */

function statusStyles(status: PhotoStatus) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-700";
  }

  return "bg-orange-50 text-orange-700";
}

/* =========================================================
   STATUS ICON
========================================================= */

function StatusIcon({
  status,
}: {
  status: PhotoStatus;
}) {
  if (status === "Approved") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "Rejected") {
    return <AlertTriangle size={14} />;
  }

  return <Clock3 size={14} />;
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SitePhotosPage() {
  const [photos, setPhotos] =
    useState<SitePhoto[]>(initialPhotos);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [viewPhoto, setViewPhoto] =
    useState<SitePhoto | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  /* =======================================================
     COUNTS
  ======================================================= */

  const approvedCount = photos.filter(
    (photo) => photo.status === "Approved"
  ).length;

  const pendingCount = photos.filter(
    (photo) => photo.status === "Pending Review"
  ).length;

  const rejectedCount = photos.filter(
    (photo) => photo.status === "Rejected"
  ).length;

  /* =======================================================
     FILTERED PHOTOS
  ======================================================= */

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) => {
      const matchesSearch = [
        photo.photoNo,
        photo.project,
        photo.site,
        photo.title,
        photo.category,
        photo.uploadedBy,
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesCategory =
        categoryFilter === "All" ||
        photo.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        photo.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    photos,
    search,
    categoryFilter,
    statusFilter,
  ]);

  /* =======================================================
     OPEN ADD
  ======================================================= */

  function openAddModal() {
    setEditingId(null);

    const nextNumber =
      Math.max(
        0,
        ...photos.map((photo) => photo.id)
      ) + 1;

    setForm({
      ...emptyForm,
      photoNo: `PHOTO-2026-${String(
        nextNumber
      ).padStart(3, "0")}`,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  function openEditModal(photo: SitePhoto) {
    setEditingId(photo.id);

    setForm({
      photoNo: photo.photoNo,
      project: photo.project,
      site: photo.site,
      category: photo.category,
      title: photo.title,
      uploadedBy: photo.uploadedBy,
      uploadDate: photo.uploadDate,
      status: photo.status,
      remarks: photo.remarks,
      imageUrl: photo.imageUrl,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     SAVE
  ======================================================= */

  function savePhoto(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const photoNo = form.photoNo.trim();
    const site = form.site.trim();
    const title = form.title.trim();
    const imageUrl = form.imageUrl.trim();

    if (
      !photoNo ||
      !site ||
      !title ||
      !form.uploadDate
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (
      imageUrl &&
      !/^https?:\/\/.+/i.test(imageUrl)
    ) {
      setError(
        "Please enter a valid image URL starting with http:// or https://."
      );
      return;
    }

    const duplicate = photos.some(
      (photo) =>
        photo.photoNo.toLowerCase() ===
          photoNo.toLowerCase() &&
        photo.id !== editingId
    );

    if (duplicate) {
      setError(
        "This photo number already exists."
      );
      return;
    }

    const updated: SitePhoto = {
      id: editingId ?? Date.now(),
      photoNo,
      project: form.project,
      site,
      category: form.category,
      title,
      uploadedBy: form.uploadedBy,
      uploadDate: form.uploadDate,
      status: form.status,
      remarks: form.remarks.trim(),
      imageUrl:
        imageUrl ||
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
    };

    if (editingId !== null) {
      setPhotos((previous) =>
        previous.map((photo) =>
          photo.id === editingId
            ? updated
            : photo
        )
      );

      setNotice(
        "Site photo updated in this preview."
      );
    } else {
      setPhotos((previous) => [
        updated,
        ...previous,
      ]);

      setNotice(
        "Site photo added to this preview."
      );
    }

    setModalOpen(false);
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function deletePhoto() {
    if (deleteId === null) return;

    setPhotos((previous) =>
      previous.filter(
        (photo) => photo.id !== deleteId
      )
    );

    setDeleteId(null);

    setNotice(
      "Site photo removed from this preview."
    );
  }

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  function exportCsv() {
    const headers = [
      "Photo No",
      "Project",
      "Site",
      "Category",
      "Title",
      "Uploaded By",
      "Upload Date",
      "Status",
      "Remarks",
    ];

    const rows = filteredPhotos.map(
      (photo) => [
        photo.photoNo,
        photo.project,
        photo.site,
        photo.category,
        photo.title,
        photo.uploadedBy,
        photo.uploadDate,
        photo.status,
        photo.remarks,
      ]
    );

    const csvCell = (
      value: string | number
    ) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) =>
        row.map(csvCell).join(",")
      )
      .join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download =
      "site-photos-register-demo.csv";

    link.click();

    URL.revokeObjectURL(url);

    setNotice("Site photo register exported.");
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#004890]">
              ADMIN WORKSPACE
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141414] sm:text-3xl">
              Site Photos
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage installation, inspection, progress,
              and completed-work photographs.
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
              Add Site Photo
            </button>
          </div>
        </section>

        {/* =================================================
            PREVIEW NOTICE
        ================================================= */}

        <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-slate-700">
          <AlertTriangle
            size={16}
            className="mt-0.5 shrink-0 text-[#e87010]"
          />

          <p>
            <strong>Preview mode:</strong>{" "}
            Photos and records are sample UI data.
            Actual image uploads will later be connected
            to the project storage system.
          </p>
        </div>

        {/* =================================================
            NOTICE
        ================================================= */}

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

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              label: "Total Photos",
              value: photos.length,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "All",
              percentage: 100,
              filterType: "status",
            },
            {
              label: "Approved",
              value: approvedCount,
              color: "#16805d",
              trackColor: "#d1fae5",
              filter: "Approved",
              percentage:
                photos.length > 0
                  ? Math.round(
                      (approvedCount /
                        photos.length) *
                        100
                    )
                  : 0,
              filterType: "status",
            },
            {
              label: "Pending Review",
              value: pendingCount,
              color: "#e87010",
              trackColor: "#ffedd5",
              filter: "Pending Review",
              percentage:
                photos.length > 0
                  ? Math.round(
                      (pendingCount /
                        photos.length) *
                        100
                    )
                  : 0,
              filterType: "status",
            },
            {
              label: "Rejected",
              value: rejectedCount,
              color: "#dc2626",
              trackColor: "#fee2e2",
              filter: "Rejected",
              percentage:
                photos.length > 0
                  ? Math.round(
                      (rejectedCount /
                        photos.length) *
                        100
                    )
                  : 0,
              filterType: "status",
            },
          ].map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() =>
                setStatusFilter(card.filter)
              }
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
                    style={{
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </p>

                  <p className="mt-1 text-xs leading-4 text-slate-500">
                    Click to filter photos
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

        {/* =================================================
            PHOTO GALLERY PREVIEW
        ================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#141414]">
                Recent Site Photos
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Quick visual preview of recently uploaded
                project photographs.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Camera size={15} />
              {filteredPhotos.length} photos shown
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredPhotos.slice(0, 4).map(
              (photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() =>
                    setViewPhoto(photo)
                  }
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">

                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles(
                          photo.status
                        )}`}
                      >
                        {photo.status}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
                      <p className="truncate text-sm font-semibold text-white">
                        {photo.title}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-white/80">
                        {photo.project}
                      </p>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} />

                      <span className="truncate">
                        {photo.site}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#004890]">
                        {photo.category}
                      </span>

                      <Eye
                        size={14}
                        className="text-slate-400"
                      />
                    </div>
                  </div>
                </button>
              )
            )}

          </div>
        </section>

        {/* =================================================
            REGISTER
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="font-bold text-[#141414]">
                Site Photo Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and manage all project photographs.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              {/* Search */}

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                <Search
                  size={16}
                  className="shrink-0 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search photos..."
                  aria-label="Search site photos"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-52"
                />
              </div>

              {/* Category */}

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by category"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by photo status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All statuses
                </option>

                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse text-left">

              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  <th className="px-5 py-4">
                    Photo
                  </th>

                  <th className="px-4 py-4">
                    Project / Site
                  </th>

                  <th className="px-4 py-4">
                    Category
                  </th>

                  <th className="px-4 py-4">
                    Uploaded By
                  </th>

                  <th className="px-4 py-4">
                    Upload Date
                  </th>

                  <th className="px-4 py-4">
                    Status
                  </th>

                  <th className="px-4 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredPhotos.map(
                  (photo) => (
                    <tr
                      key={photo.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* Photo */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            <img
                              src={photo.imageUrl}
                              alt={photo.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#141414]">
                              {photo.title}
                            </p>

                            <p className="mt-1 text-xs text-[#004890]">
                              {photo.photoNo}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Project */}

                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-[#141414]">
                          {photo.project}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} />

                          <span>
                            {photo.site}
                          </span>
                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#004890]">
                          <ImageIcon size={12} />

                          {photo.category}
                        </span>
                      </td>

                      {/* Uploaded By */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <UserRound
                            size={14}
                            className="text-slate-400"
                          />

                          {photo.uploadedBy}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays
                            size={14}
                            className="text-slate-400"
                          />

                          {formatDate(
                            photo.uploadDate
                          )}
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles(
                            photo.status
                          )}`}
                        >
                          <StatusIcon
                            status={
                              photo.status
                            }
                          />

                          {photo.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              setViewPhoto(
                                photo
                              )
                            }
                            title="View photo"
                            aria-label={`View ${photo.title}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                photo
                              )
                            }
                            title="Edit photo"
                            aria-label={`Edit ${photo.title}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(
                                photo.id
                              )
                            }
                            title="Delete photo"
                            aria-label={`Delete ${photo.title}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  )
                )}

                {/* Empty */}

                {filteredPhotos.length ===
                  0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center"
                      >
                        <Camera
                          size={30}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No site photos found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or
                          filter.
                        </p>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filteredPhotos.length} of{" "}
              {photos.length} photos
            </p>

            <p className="text-xs text-slate-400">
              Sample data · No backend integration
            </p>
          </div>

        </section>

        {/* =================================================
            ADD / EDIT MODAL
        ================================================= */}

        {modalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setModalOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-form-title"
              className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="photo-form-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null
                      ? "Edit Site Photo"
                      : "Add Site Photo"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Add project and photograph details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                  aria-label="Close form"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Form */}

              <form
                onSubmit={savePhoto}
                className="space-y-5 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Photo number */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Photo Number *
                    <input
                      required
                      maxLength={40}
                      value={form.photoNo}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          photoNo:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Upload date */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Upload Date *
                    <input
                      type="date"
                      required
                      value={
                        form.uploadDate
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          uploadDate:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Project */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Project *
                    <select
                      value={form.project}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          project:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {projects.map(
                        (project) => (
                          <option
                            key={project}
                            value={project}
                          >
                            {project}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Site */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Site / Location *
                    <input
                      required
                      maxLength={150}
                      value={form.site}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          site: event.target.value,
                        })
                      }
                      placeholder="Enter site location"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Title */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Photo Title *
                    <input
                      required
                      maxLength={150}
                      value={form.title}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          title:
                            event.target.value,
                        })
                      }
                      placeholder="e.g. Hydrant Pipeline Installation"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Category */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Category
                    <select
                      value={form.category}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          category:
                            event.target
                              .value as PhotoCategory,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Uploaded by */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Uploaded By
                    <select
                      value={
                        form.uploadedBy
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          uploadedBy:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {teamMembers.map(
                        (member) => (
                          <option
                            key={member}
                            value={member}
                          >
                            {member}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Status */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Review Status
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          status:
                            event.target
                              .value as PhotoStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {statuses.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Image URL */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Image URL
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          imageUrl:
                            event.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Remarks */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                    Remarks
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={form.remarks}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          remarks:
                            event.target.value,
                        })
                      }
                      placeholder="Add photo remarks or review notes"
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>
                </div>

                {/* Simple upload-style area */}

                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                  <Upload
                    size={24}
                    className="mx-auto text-[#004890]"
                  />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Image upload will be connected later
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    For this UI phase, use the Image URL
                    field above.
                  </p>
                </div>

                {/* Error */}

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {/* Footer */}

                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      setModalOpen(false)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-[#004890] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                  >
                    {editingId !== null
                      ? "Save Changes"
                      : "Add Site Photo"}
                  </button>

                </div>
              </form>
            </section>
          </div>
        )}

        {/* =================================================
            VIEW PHOTO MODAL
        ================================================= */}

        {viewPhoto && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setViewPhoto(null);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-view-title"
              className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >

              {/* Image */}

              <div className="relative h-64 bg-slate-900 sm:h-80">

                <img
                  src={viewPhoto.imageUrl}
                  alt={viewPhoto.title}
                  className="h-full w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() =>
                    setViewPhoto(null)
                  }
                  aria-label="Close photo"
                  className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Details */}

              <div className="p-5 sm:p-6">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                  <div>
                    <p className="text-xs font-bold tracking-wide text-[#004890]">
                      {viewPhoto.photoNo}
                    </p>

                    <h2
                      id="photo-view-title"
                      className="mt-1 text-xl font-bold text-[#141414]"
                    >
                      {viewPhoto.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {viewPhoto.project}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles(
                      viewPhoto.status
                    )}`}
                  >
                    <StatusIcon
                      status={viewPhoto.status}
                    />

                    {viewPhoto.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Site
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <MapPin
                        size={15}
                        className="text-[#004890]"
                      />

                      {viewPhoto.site}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Category
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <ImageIcon
                        size={15}
                        className="text-[#004890]"
                      />

                      {viewPhoto.category}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Uploaded By
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <UserRound
                        size={15}
                        className="text-[#004890]"
                      />

                      {viewPhoto.uploadedBy}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Upload Date
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CalendarDays
                        size={15}
                        className="text-[#004890]"
                      />

                      {formatDate(
                        viewPhoto.uploadDate
                      )}
                    </div>
                  </div>

                </div>

                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Remarks
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {viewPhoto.remarks ||
                      "No remarks added."}
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setViewPhoto(null)
                    }
                    className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                  >
                    Close
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* =================================================
            DELETE MODAL
        ================================================= */}

        {deleteId !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">

            <section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-photo-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2
                id="delete-photo-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this site photo?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the photo record from
                this UI preview only.
              </p>

              <div className="mt-6 flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(null)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deletePhoto}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Photo
                </button>

              </div>
            </section>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}