
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ClipboardList,
  Wrench,
  ChartNoAxesCombined,
  Users,
  Flag,
  Images,
  FileText,
  CheckCircle,
  Bell,
  BarChart3,
  History,
  Settings,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  {
    heading: "WORKSPACE",
    items: [
      { label: "Dashboard Overview", icon: LayoutDashboard, path: "/dashboard" },
      { label: "All Projects", icon: FolderKanban, path: "/dashboard/projects" },
      { label: "Material Management", icon: Package, path: "/dashboard/materials" },
      { label: "Material Challans", icon: ClipboardList, path: "/dashboard/challans" },
      { label: "Installation Entry", icon: Wrench, path: "/dashboard/installation" },
      { label: "Work Progress", icon: ChartNoAxesCombined, path: "/dashboard/work-progress" },
      { label: "Team Management", icon: Users, path: "/dashboard/team" },
      { label: "Pending Work", icon: Flag, path: "/dashboard/pending-work" },
      { label: "Site Photos", icon: Images, path: "/dashboard/site-photos" },
      { label: "Documents", icon: FileText, path: "/dashboard/documents" },
    ],
  },
  {
    heading: "CONTROL & REPORTING",
    items: [
      { label: "Approvals", icon: CheckCircle, path: "/dashboard/approvals" },
      { label: "Alerts & Notifications", icon: Bell, path: "/dashboard/notifications" },
      { label: "Reports & MIS", icon: BarChart3, path: "/dashboard/reports" },
      { label: "Audit Log", icon: History, path: "/dashboard/audit-log" },
      { label: "Admin & Settings", icon: Settings, path: "/dashboard/settings" },
    ],
  },
];

type DashboardShellProps = {
  children: React.ReactNode;
};

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentItem = navigation
    .flatMap((group) => group.items)
    .find((item) => item.path === pathname);

  const activePage = currentItem?.label ?? "Dashboard Overview";

  function handleNavigation(path: string) {
    setMobileMenuOpen(false);
    router.push(path);
  }

  function signOut() {
    // Temporary redirect until Auth.js is connected.
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#f3f5f7] text-[#141414]">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[285px] flex-col bg-[#004890] text-white transition-transform duration-200 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Company branding */}
        <div className="flex h-[86px] shrink-0 items-center justify-between border-b border-white/15 px-4">
          <div className="relative h-[205px] w-[205px]">
            <Image
              src="/MSD_LOGO_ISO.png"
              alt="The Fire Wala - MSD Engineering"
              fill
              priority
              sizes="205px"
              className="object-contain object-left"
            />
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-white/90 transition hover:bg-white/10 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scrollbar-hidden min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-5">
          {navigation.map((group) => (
            <div key={group.heading}>
              <p className="mb-2 px-3 text-[12px] font-bold tracking-[0.16em] text-white/65">
                {group.heading}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/dashboard" &&
                      pathname.startsWith(`${item.path}/`));

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[14px] leading-5 transition ${
                        isActive
                          ? "bg-[#e87010] font-semibold text-white shadow-sm"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />

                      <span className="min-w-0 flex-1">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-white/15 p-3">
          <div className="mb-3 rounded-xl bg-[#141414]/25 p-3">
            <p className="text-[10px] tracking-wider text-white/65">
              SIGNED IN AS
            </p>

            <p className="mt-1 text-sm font-semibold">Admin User</p>

            <p className="mt-1 text-xs text-white/65">
              Demo interface
            </p>
          </div>

          <button
            onClick={signOut}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-[#004890] transition hover:bg-slate-100"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main workspace */}
      <div className="min-h-screen lg:pl-[285px]">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-[68px] items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg border border-slate-200 p-2 text-[#004890] transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={19} />
          </button>

          <div className="hidden text-xs text-slate-500 sm:block">
            MSD Engineering /
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm font-semibold text-[#141414]">
            <LayoutDashboard
              size={17}
              className="shrink-0 text-[#004890]"
            />
            <span className="truncate">{activePage}</span>
          </div>

          {/* Search */}
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 md:flex">
            <Search size={16} className="text-slate-400" />

            <input
              placeholder="Search projects, materials..."
              aria-label="Search projects and materials"
              className="w-40 bg-transparent text-xs text-[#141414] outline-none lg:w-48"
            />
          </div>

          {/* User avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004890]/10 text-xs font-bold text-[#004890]">
            AU
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-[#141414]">
              Admin User
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Administrator
            </p>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
