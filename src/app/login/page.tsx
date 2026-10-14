
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Flame, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type UserRole = "admin" | "management" | "hr" | "store_manager" | "site_engineer";

const dashboardRoutes: Record<UserRole, string> = {
  admin: "/dashboard",
  management: "/management/dashboard",
  hr: "/hr/dashboard",
  store_manager: "/store/dashboard",
  site_engineer: "/site/dashboard",
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your work email and password.");
      return;
    }

    setLoading(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiBaseUrl) {
        throw new Error(
          "Backend API URL is not configured. Please contact the development team."
        );
      }

      const response = await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Expected example: { user: { role: "admin" } }
      const role = data.user?.role as UserRole | undefined;

      if (!role || !dashboardRoutes[role]) {
        throw new Error(
          "Your account role is not configured. Please contact the administrator."
        );
      }

      // Authentication/session handling should follow the backend
      // contract. Do not store passwords or invent tokens here.
      router.replace(dashboardRoutes[role]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004890] to-[#e87010] p-3 sm:p-5">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Branding */}
        <div className="flex flex-col justify-between bg-[#004890] p-6 text-white sm:p-8 lg:min-h-[570px] lg:p-10">
          <div className="relative h-20 w-48 sm:h-24 sm:w-56">
            <Image
              src="/MSD_LOGO_ISO.png"
              alt="The Fire Wala - MSD Engineering"
              fill
              priority
              sizes="(max-width: 640px) 192px, 224px"
              className="object-contain object-left"
            />
          </div>

          <div className="my-8 lg:my-4">
            <p className="mb-5 flex items-center gap-1 text-xs font-semibold tracking-wider text-white/90">
              <Flame size={15} />
              PROJECT OPERATIONS WORKSPACE
            </p>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              Project operations,
              <br />
              under control.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/80 sm:text-base">
              A single workspace for projects, site progress, material
              movement, approvals and reporting.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs leading-5 text-white/75">
            <ShieldCheck size={16} className="shrink-0" />
            PRIVATE PROJECT WORKSPACE · ROLE-BASED ACCESS
          </div>
        </div>

        {/* Login */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#122c40] sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Sign in with your assigned work account.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-900"
                >
                  Work email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-900"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-lg border border-slate-300 px-4 pr-12 text-sm outline-none transition focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#004890]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e87010] px-4 text-sm font-semibold text-white transition hover:bg-[#d4630f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in to dashboard"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            
            <p className="mt-5 text-xs leading-5 text-slate-500 sm:text-sm">
              Access to the project workspace depends on your assigned
              company role.
            </p>

            <div className="mt-6 border-t border-slate-200 pt-5 text-center">
              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="font-semibold text-[#004890] transition hover:text-[#e87010] hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
