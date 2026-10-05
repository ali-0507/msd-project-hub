
"use client";

import { useState, type FormEvent } from "react";
import { Flame, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your work email and password.");
      return;
    }

    setError(
      "Login form is working. Authentication will be connected in the next step."
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004890] to-[#e87010] p-3 sm:p-5">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl lg:grid-cols-2">

        {/* Left branding panel */}
        <div className="flex flex-col justify-between bg-[#004890] p-6 text-white sm:p-8 lg:min-h-[570px] lg:p-10">

          {/* Company logo */}
          <div className="flex items-center">
            <div className="relative h-20 w-48 sm:h-70 sm:w-90 mb-0">
              <Image
                src="/MSD_LOGO_ISO.png"
                alt="The Fire Wala - MSD Engineering"
                fill
                priority
                sizes="(max-width: 640px) 192px, 224px"
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Branding content */}
          <div className="my-8 lg:my-4">
            <p className="mb-5 flex items-center gap-1 text-xs font-semibold tracking-wider text-white/90 mt-0">
              <Flame size={15} />
              PROJECT OPERATIONS WORKSPACE
            </p>

            <h1 className="text-1xl font-bold leading-tight sm:text-2xl">
              Project operations,
              <br />
              under control.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/80 sm:text-base">
              A single workspace for projects, site progress, material
              movement, approvals and reporting.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-xs leading-5 text-white/75">
            <ShieldCheck size={16} className="shrink-0" />
            PRIVATE PROJECT WORKSPACE · ROLE-BASED ACCESS
          </div>
        </div>

        {/* Right login panel */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold tracking-tight text-[#122c40] sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Sign in with your assigned work account.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">

              {/* Email */}
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
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-900"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </div>

              {/* Feedback */}
              {error && (
                <p
                  role="status"
                  className="rounded-lg bg-emerald-50 p-3 text-sm leading-5 text-emerald-800"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e87010] px-4 text-sm font-semibold text-white transition hover:bg-[#d4630f] focus:outline-none focus:ring-4 focus:ring-emerald-700/20"
              >
                Sign in to dashboard
                <ArrowRight size={17} />
              </button>
            </form>

            <p className="mt-5 text-xs leading-5 text-slate-500 sm:text-sm">
              Access to the project workspace depends on your assigned
              company role.
            </p>

               
        <div className="mt-5 border-t border-slate-100 pt-5 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#004890] hover:text-[#e87010]"
            >
              Create account
            </Link>
          </p>
        </div>

          </div>
          
        </div>

       
      </section>
    </main>
  );
}