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
  Users,
  UserCheck,
  UserRoundCheck,
  CalendarOff,
  MapPin,
  BriefcaseBusiness,
  Phone,
  Mail,
  AlertTriangle,
  CircleCheck,
  Clock3,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type MemberStatus =
  | "Available"
  | "Assigned"
  | "On Leave"
  | "Inactive";

type TeamRole =
  | "Installation Technician"
  | "Service Technician"
  | "Electrical Technician"
  | "Supervisor"
  | "Engineer"
  | "Project Coordinator";

type TeamMember = {
  id: number;
  employeeId: string;
  name: string;
  role: TeamRole;
  department: string;
  phone: string;
  email: string;
  location: string;
  currentProject: string;
  status: MemberStatus;
  joinedDate: string;
};

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialMembers: TeamMember[] = [
  {
    id: 1,
    employeeId: "EMP-001",
    name: "Rahul Sharma",
    role: "Installation Technician",
    department: "Installation",
    phone: "9876543210",
    email: "rahul.sharma@example.com",
    location: "Raipur",
    currentProject: "Bharat Agro",
    status: "Assigned",
    joinedDate: "2025-06-12",
  },
  {
    id: 2,
    employeeId: "EMP-002",
    name: "Amit Verma",
    role: "Supervisor",
    department: "Installation",
    phone: "9876543211",
    email: "amit.verma@example.com",
    location: "Raipur",
    currentProject: "Shree Cement Fire System",
    status: "Assigned",
    joinedDate: "2024-11-18",
  },
  {
    id: 3,
    employeeId: "EMP-003",
    name: "Priya Singh",
    role: "Electrical Technician",
    department: "Electrical",
    phone: "9876543212",
    email: "priya.singh@example.com",
    location: "Raipur",
    currentProject: "—",
    status: "Available",
    joinedDate: "2025-02-10",
  },
  {
    id: 4,
    employeeId: "EMP-004",
    name: "Vikas Patel",
    role: "Service Technician",
    department: "Service",
    phone: "9876543213",
    email: "vikas.patel@example.com",
    location: "Bhilai",
    currentProject: "North Plaza Sprinkler",
    status: "Assigned",
    joinedDate: "2024-08-05",
  },
  {
    id: 5,
    employeeId: "EMP-005",
    name: "Neha Gupta",
    role: "Project Coordinator",
    department: "Projects",
    phone: "9876543214",
    email: "neha.gupta@example.com",
    location: "Raipur",
    currentProject: "—",
    status: "Available",
    joinedDate: "2025-09-01",
  },
  {
    id: 6,
    employeeId: "EMP-006",
    name: "Suresh Yadav",
    role: "Engineer",
    department: "Engineering",
    phone: "9876543215",
    email: "suresh.yadav@example.com",
    location: "Bilaspur",
    currentProject: "City Hospital Safety Upgrade",
    status: "On Leave",
    joinedDate: "2024-05-20",
  },
  {
    id: 7,
    employeeId: "EMP-007",
    name: "Manoj Tiwari",
    role: "Installation Technician",
    department: "Installation",
    phone: "9876543216",
    email: "manoj.tiwari@example.com",
    location: "Raipur",
    currentProject: "Bharat Agro",
    status: "Assigned",
    joinedDate: "2025-01-15",
  },
];

/* =========================================================
   OPTIONS
========================================================= */

const departments = [
  "Installation",
  "Service",
  "Electrical",
  "Engineering",
  "Projects",
];

const roles: TeamRole[] = [
  "Installation Technician",
  "Service Technician",
  "Electrical Technician",
  "Supervisor",
  "Engineer",
  "Project Coordinator",
];

const projects = [
  "Bharat Agro",
  "Shree Cement Fire System",
  "City Hospital Safety Upgrade",
  "North Plaza Sprinkler",
  "Industrial Safety Upgrade",
  "—",
];

const emptyForm = {
  employeeId: "",
  name: "",
  role: "Installation Technician" as TeamRole,
  department: departments[0],
  phone: "",
  email: "",
  location: "",
  currentProject: "—",
  status: "Available" as MemberStatus,
  joinedDate: new Date().toLocaleDateString("en-CA"),
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

function statusStyles(status: MemberStatus) {
  if (status === "Available") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Assigned") {
    return "bg-blue-50 text-[#004890]";
  }

  if (status === "On Leave") {
    return "bg-orange-50 text-orange-700";
  }

  return "bg-slate-100 text-slate-600";
}

/* =========================================================
   STATUS ICON
========================================================= */

function StatusIcon({
  status,
}: {
  status: MemberStatus;
}) {
  if (status === "Available") {
    return <UserCheck size={14} />;
  }

  if (status === "Assigned") {
    return <BriefcaseBusiness size={14} />;
  }

  if (status === "On Leave") {
    return <CalendarOff size={14} />;
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

export default function TeamPage() {
  const [members, setMembers] =
    useState<TeamMember[]>(initialMembers);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [viewMember, setViewMember] =
    useState<TeamMember | null>(null);

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

  const availableCount = members.filter(
    (member) => member.status === "Available"
  ).length;

  const assignedCount = members.filter(
    (member) => member.status === "Assigned"
  ).length;

  const leaveCount = members.filter(
    (member) => member.status === "On Leave"
  ).length;

  /* =======================================================
     FILTERED MEMBERS
  ======================================================= */

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch = [
        member.employeeId,
        member.name,
        member.role,
        member.department,
        member.location,
        member.currentProject,
      ].some((value) =>
        value.toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        member.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        member.department === departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [
    members,
    search,
    statusFilter,
    departmentFilter,
  ]);

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  function openAddModal() {
    setEditingId(null);

    const nextNumber =
      Math.max(
        0,
        ...members.map((member) => member.id)
      ) + 1;

    setForm({
      ...emptyForm,
      employeeId: `EMP-${String(
        nextNumber
      ).padStart(3, "0")}`,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  function openEditModal(member: TeamMember) {
    setEditingId(member.id);

    setForm({
      employeeId: member.employeeId,
      name: member.name,
      role: member.role,
      department: member.department,
      phone: member.phone,
      email: member.email,
      location: member.location,
      currentProject: member.currentProject,
      status: member.status,
      joinedDate: member.joinedDate,
    });

    setError("");
    setModalOpen(true);
  }

  /* =======================================================
     SAVE MEMBER
  ======================================================= */

  function saveMember(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const employeeId =
      form.employeeId.trim();

    const name = form.name.trim();

    const phone = form.phone.trim();

    const email = form.email.trim();

    const location = form.location.trim();

    if (
      !employeeId ||
      !name ||
      !phone ||
      !email ||
      !location ||
      !form.joinedDate
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    const duplicate = members.some(
      (member) =>
        member.employeeId.toLowerCase() ===
          employeeId.toLowerCase() &&
        member.id !== editingId
    );

    if (duplicate) {
      setError(
        "This employee ID already exists."
      );
      return;
    }

    const updatedMember: TeamMember = {
      id: editingId ?? Date.now(),
      employeeId,
      name,
      role: form.role,
      department: form.department,
      phone,
      email,
      location,
      currentProject:
        form.currentProject,
      status: form.status,
      joinedDate: form.joinedDate,
    };

    if (editingId !== null) {
      setMembers((previous) =>
        previous.map((member) =>
          member.id === editingId
            ? updatedMember
            : member
        )
      );

      setNotice(
        "Team member updated in this preview."
      );
    } else {
      setMembers((previous) => [
        updatedMember,
        ...previous,
      ]);

      setNotice(
        "Team member added to this preview."
      );
    }

    setModalOpen(false);
  }

  /* =======================================================
     DELETE MEMBER
  ======================================================= */

  function deleteMember() {
    if (deleteId === null) return;

    setMembers((previous) =>
      previous.filter(
        (member) => member.id !== deleteId
      )
    );

    setDeleteId(null);

    setNotice(
      "Team member removed from this preview."
    );
  }

  /* =======================================================
     EXPORT CSV
  ======================================================= */

  function exportCsv() {
    const headers = [
      "Employee ID",
      "Name",
      "Role",
      "Department",
      "Phone",
      "Email",
      "Location",
      "Current Project",
      "Status",
      "Joined Date",
    ];

    const rows = filteredMembers.map(
      (member) => [
        member.employeeId,
        member.name,
        member.role,
        member.department,
        member.phone,
        member.email,
        member.location,
        member.currentProject,
        member.status,
        member.joinedDate,
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
      "team-management-demo.csv";

    link.click();

    URL.revokeObjectURL(url);

    setNotice("Team register exported.");
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
              Team Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage team members, availability,
              roles, and current project assignments.
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
              Add Team Member
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
            Team records are sample data. Changes
            are not saved to a database or connected
            to project assignments.
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

          {/* Total */}

          {[
            {
              label: "Total Members",
              value: members.length,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "All",
              percentage: 100,
            },
            {
              label: "Available",
              value: availableCount,
              color: "#16805d",
              trackColor: "#d1fae5",
              filter: "Available",
              percentage:
                members.length > 0
                  ? Math.round(
                      (availableCount /
                        members.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "Assigned",
              value: assignedCount,
              color: "#004890",
              trackColor: "#dbeafe",
              filter: "Assigned",
              percentage:
                members.length > 0
                  ? Math.round(
                      (assignedCount /
                        members.length) *
                        100
                    )
                  : 0,
            },
            {
              label: "On Leave",
              value: leaveCount,
              color: "#e87010",
              trackColor: "#ffedd5",
              filter: "On Leave",
              percentage:
                members.length > 0
                  ? Math.round(
                      (leaveCount /
                        members.length) *
                        100
                    )
                  : 0,
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
                    Click to filter members
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
            TEAM REGISTER
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="font-bold text-[#141414]">
                Team Register
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and manage team members and
                their current assignments.
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
                  placeholder="Search members..."
                  aria-label="Search team members"
                  className="w-full min-w-0 bg-transparent text-sm outline-none sm:w-52"
                />
              </div>

              {/* Department */}

              <select
                value={departmentFilter}
                onChange={(event) =>
                  setDepartmentFilter(
                    event.target.value
                  )
                }
                aria-label="Filter by department"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All departments
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  )
                )}
              </select>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter by member status"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#004890]"
              >
                <option value="All">
                  All statuses
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Assigned">
                  Assigned
                </option>

                <option value="On Leave">
                  On Leave
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse text-left">

              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">

                  <th className="px-5 py-4">
                    Team Member
                  </th>

                  <th className="px-4 py-4">
                    Role / Department
                  </th>

                  <th className="px-4 py-4">
                    Contact
                  </th>

                  <th className="px-4 py-4">
                    Location
                  </th>

                  <th className="px-4 py-4">
                    Current Project
                  </th>

                  <th className="px-4 py-4">
                    Status
                  </th>

                  <th className="px-4 py-4">
                    Joined
                  </th>

                  <th className="px-4 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredMembers.map(
                  (member) => (
                    <tr
                      key={member.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* Member */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-[#004890]">
                            {member.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#141414]">
                              {member.name}
                            </p>

                            <p className="mt-1 text-xs text-[#004890]">
                              {member.employeeId}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}

                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {member.role}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {member.department}
                        </p>
                      </td>

                      {/* Contact */}

                      <td className="px-4 py-4">
                        <div className="space-y-1 text-xs text-slate-500">

                          <div className="flex items-center gap-1.5">
                            <Phone size={12} />

                            {member.phone}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Mail size={12} />

                            {member.email}
                          </div>
                        </div>
                      </td>

                      {/* Location */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin
                            size={14}
                            className="text-slate-400"
                          />

                          {member.location}
                        </div>
                      </td>

                      {/* Project */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#004890]">
                            <BriefcaseBusiness
                              size={14}
                            />
                          </span>

                          <span className="max-w-[180px] text-sm text-slate-700">
                            {member.currentProject}
                          </span>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles(
                            member.status
                          )}`}
                        >
                          <StatusIcon
                            status={
                              member.status
                            }
                          />

                          {member.status}
                        </span>
                      </td>

                      {/* Joined */}

                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-600">
                          {formatDate(
                            member.joinedDate
                          )}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              setViewMember(member)
                            }
                            title="View member"
                            aria-label={`View ${member.name}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(member)
                            }
                            title="Edit member"
                            aria-label={`Edit ${member.name}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-[#004890]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(
                                member.id
                              )
                            }
                            title="Delete member"
                            aria-label={`Delete ${member.name}`}
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

                {filteredMembers.length ===
                  0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center"
                      >
                        <Users
                          size={30}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No team members found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or filter.
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
              Showing{" "}
              {filteredMembers.length} of{" "}
              {members.length} team members
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
              aria-labelledby="member-form-title"
              className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="member-form-title"
                    className="text-lg font-bold text-[#141414]"
                  >
                    {editingId !== null
                      ? "Edit Team Member"
                      : "Add Team Member"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Enter the team member's
                    information and assignment.
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
                onSubmit={saveMember}
                className="space-y-5 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Employee ID */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Employee ID *
                    <input
                      required
                      maxLength={30}
                      value={form.employeeId}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          employeeId:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Name */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Full Name *
                    <input
                      required
                      maxLength={80}
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Role */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Role *
                    <select
                      value={form.role}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          role: event.target
                            .value as TeamRole,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {roles.map((role) => (
                        <option
                          key={role}
                          value={role}
                        >
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Department */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Department *
                    <select
                      value={
                        form.department
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          department:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      {departments.map(
                        (department) => (
                          <option
                            key={department}
                            value={department}
                          >
                            {department}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Phone */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Phone *
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          phone: event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10),
                        })
                      }
                      placeholder="10 digit mobile number"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Email */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Email *
                    <input
                      required
                      type="email"
                      maxLength={120}
                      value={form.email}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          email:
                            event.target.value,
                        })
                      }
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Location */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Location *
                    <input
                      required
                      maxLength={100}
                      value={form.location}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          location:
                            event.target.value,
                        })
                      }
                      placeholder="City / location"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>

                  {/* Project */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Current Project
                    <select
                      value={
                        form.currentProject
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          currentProject:
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

                  {/* Status */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Status
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          status:
                            event.target
                              .value as MemberStatus,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    >
                      <option value="Available">
                        Available
                      </option>

                      <option value="Assigned">
                        Assigned
                      </option>

                      <option value="On Leave">
                        On Leave
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </label>

                  {/* Joined Date */}

                  <label className="space-y-1.5 text-sm font-medium text-slate-700">
                    Joined Date *
                    <input
                      type="date"
                      required
                      value={
                        form.joinedDate
                      }
                      onChange={(event) =>
                        setForm({
                          ...form,
                          joinedDate:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#004890]"
                    />
                  </label>
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

                {/* Buttons */}

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
                      : "Add Team Member"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* =================================================
            VIEW MODAL
        ================================================= */}

        {viewMember && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setViewMember(null);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="member-view-title"
              className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            >

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-bold text-[#004890]">
                    {viewMember.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2
                      id="member-view-title"
                      className="text-lg font-bold text-[#141414]"
                    >
                      {viewMember.name}
                    </h2>

                    <p className="mt-1 text-xs text-[#004890]">
                      {viewMember.employeeId}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setViewMember(null)
                  }
                  aria-label="Close details"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Details */}

              <div className="space-y-4 p-5">

                {[
                  [
                    "Role",
                    viewMember.role,
                  ],
                  [
                    "Department",
                    viewMember.department,
                  ],
                  [
                    "Phone",
                    viewMember.phone,
                  ],
                  [
                    "Email",
                    viewMember.email,
                  ],
                  [
                    "Location",
                    viewMember.location,
                  ],
                  [
                    "Current Project",
                    viewMember.currentProject,
                  ],
                  [
                    "Status",
                    viewMember.status,
                  ],
                  [
                    "Joined Date",
                    formatDate(
                      viewMember.joinedDate
                    ),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm last:border-0"
                  >
                    <span className="text-slate-500">
                      {label}
                    </span>

                    <span className="max-w-[65%] break-words text-right font-medium text-[#141414]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}

              <div className="flex justify-end border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() =>
                    setViewMember(null)
                  }
                  className="rounded-lg bg-[#004890] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00376f]"
                >
                  Close
                </button>
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
              aria-labelledby="delete-member-title"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2
                id="delete-member-title"
                className="mt-4 text-lg font-bold text-[#141414]"
              >
                Delete this team member?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This removes the member from this UI
                preview only.
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
                  onClick={deleteMember}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete Member
                </button>

              </div>
            </section>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}