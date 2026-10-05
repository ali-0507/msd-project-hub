
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  UserRound,
  Mail,
  Building2,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your work email.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setError(
        "Use at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Frontend demonstration only.
    // Connect this form to a secure registration API before production.
    setMessage(
      "Form validated successfully. Account creation will work after backend integration."
    );
  }

  const inputClass =
    "mt-1.5 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#141414] outline-none transition placeholder:text-slate-400 focus:border-[#004890] focus:ring-2 focus:ring-[#004890]/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr]">
        {/* Branding panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#004890] p-6 text-white sm:p-8 lg:min-h-[680px] lg:p-10">
          <div className="pointer-events-none absolute -right-20 top-28 h-56 w-56 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[35px] border-white/5" />

          <div className="relative">
            <div className="relative h-[400px] w-[330px] max-w-full">
              <Image
                src="/MSD_LOGO_ISO.png"
                alt="The Fire Wala - MSD Engineering"
                fill
                priority
                sizes="230px"
                className="object-contain object-right"
              />
            </div>

            <p className="mt-1 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-white/80">
              <Flame size={14} />
              PROJECT OPERATIONS WORKSPACE
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Your work.
              <br />
              One workspace.
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
              Manage fire safety projects, materials, installation progress,
              site documentation and approvals from one place.
            </p>
          </div>

          <div className="relative mt-8 space-y-4">
            {[
              "Centralized project information",
              "Organized site and material updates",
              "Access based on your assigned role",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={17} className="shrink-0 text-[#e87010]" />
                <span className="text-sm text-white/90">{item}</span>
              </div>
            ))}

            <div className="mt-8 flex items-center gap-2 border-t border-white/15 pt-5 text-[10px] font-medium tracking-wider text-white/70">
              <ShieldCheck size={16} />
              SECURE ACCESS · MSD ENGINEERING
            </div>
          </div>
        </div>

        {/* Sign up form */}
        <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <p className="text-xs font-bold tracking-[0.16em] text-[#e87010]">
              CREATE YOUR ACCOUNT
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#141414] sm:text-1xl">
              Get started
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your details to request access to the project workspace.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-[#141414]"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Work email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-[#141414]"
                >
                  Work email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="text-xs font-semibold text-[#141414]"
                >
                  Department
                </label>

                <div className="relative">
                  <Building2
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    required
                    maxLength={150}
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Enter your department name"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#141414]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a strong password"
                    className={`${inputClass} pl-10 pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#004890]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-500">
                  At least 8 characters, including uppercase, lowercase and a number.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-[#141414]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Re-enter your password"
                    className={`${inputClass} pl-10 pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#004890]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700"
                >
                  {error}
                </p>
              )}

              {message && (
                <p
                  role="status"
                  className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-[#141414]"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#e87010] text-sm font-bold text-white transition hover:bg-[#cc5d08] focus:outline-none focus:ring-2 focus:ring-[#e87010]/40 focus:ring-offset-2"
              >
                Create account
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="mt-5 border-t border-slate-100 pt-5 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#004890] hover:text-[#e87010]"
                >
                  Log in
                </Link>
              </p>
            </div>

            <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
              Account access and project permissions must be approved by your
              organization&apos;s administrator.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}