
"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  ChartNoAxesCombined,
  Clock3,
  Files,
  ClipboardCheck,
  Bell,
  FileBarChart,
  History,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface ManagementDashboardShellProps {
  children: ReactNode;
}

const workspaceItems = [
  {
    label: "Dashboard Overview",
    href: "/management/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "All Projects",
    href: "/management/projects",
    icon: FolderKanban,
  },
  {
    label: "Material Management",
    href: "/management/materials",
    icon: Package,
  },
  {
    label: "Work Progress",
    href: "/management/work-progress",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Pending Work",
    href: "/management/pending-work",
    icon: Clock3,
  },
  {
    label: "Documents",
    href: "/management/documents",
    icon: Files,
  },
];

const reportingItems = [
  {
    label: "Approvals",
    href: "/management/approvals",
    icon: ClipboardCheck,
  },
  {
    label: "Alerts & Notifications",
    href: "/management/notifications",
    icon: Bell,
  },
  {
    label: "Reports & MIS",
    href: "/management/reports",
    icon: FileBarChart,
  },
  {
    label: "Audit Log",
    href: "/management/audit-log",
    icon: History,
  },
];

export default function ManagementDashboardShell({
  children,
}: ManagementDashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const renderNavigation = (items: typeof workspaceItems) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileSidebarOpen(false)}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-[#e87010] text-white shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              size={18}
              className={`shrink-0 ${
                active
                  ? "text-white"
                  : "text-white/65 group-hover:text-white"
              }`}
            />

            <span className="min-w-0 flex-1">{item.label}</span>

            {active && (
              <ChevronRight
                size={15}
                className="shrink-0 text-white/90"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarContent = (
    <>
      {/* Logo only */}
     <div className="relative flex h-[90px] shrink-0 items-center justify-center border-b border-white/15 px-4">
        <div className="relative h-[100px] w-full">
                  <Image
                      src="/MSD_LOGO_ISO.png"
                      alt="MSD Engineering logo"
                      fill
                      sizes="460px"
                      className="object-contain scale-150"
                      priority
                  />
        </div>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar"
          className="absolute right-3 top-3 rounded-md p-1 text-white/80 hover:bg-white/10 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="management-sidebar-scrollbar flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
          Workspace
        </p>

        {renderNavigation(workspaceItems)}

        <div className="mb-3 mt-7 px-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
            Control & Reporting
          </p>
        </div>

        {renderNavigation(reportingItems)}

        {/* Role information */}
        <div className="mt-7 rounded-xl border border-white/15 bg-white/10 p-3">
          <p className="text-xs font-semibold text-white">
            Management Access
          </p>
          <p className="mt-1 text-[11px] leading-5 text-white/70">
            Monitor projects, review progress, and manage operational
            approvals.
          </p>
        </div>
      </div>

      {/* User section */}
      <div className="shrink-0 border-t border-white/15 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#004890]">
            M
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Management User
            </p>
            <p className="text-xs text-white/60">Management</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-red-500/20 hover:text-white"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-white/10 bg-[#004890] lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/10 bg-[#004890] transition-transform duration-200 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main area */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#141414]">
                MSD Engineering-The Fire Wala
              </p>
              <p className="hidden text-[11px] text-gray-500 sm:block">
                Project & Operations Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-[#141414]">
                Management Panel
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                MSD Engineering
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-[#e87010]">
              M
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white px-6 py-4 text-center text-[11px] text-gray-500">
          © {new Date().getFullYear()} MSD Engineering · The Fire Wala
        </footer>
      </div>

      {/* Hide the sidebar scrollbar without disabling scrolling */}
      <style jsx global>{`
        .management-sidebar-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .management-sidebar-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
