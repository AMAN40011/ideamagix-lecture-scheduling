import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const user = response.data.user;

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "instructor") {
        navigate("/instructor");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* BACKGROUND DECORATION */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"></div>

      {/* MAIN */}
      <div className="relative z-10 flex min-h-screen">

        {/* ================= LEFT BRANDING ================= */}
        <div className="hidden w-1/2 flex-col justify-between p-10 lg:flex xl:p-16">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-500/30">
              I
            </div>

            <div>
              <h1 className="font-bold tracking-wide text-white">
                Ideamagix
              </h1>

              <p className="text-xs text-slate-500">
                Lecture Management
              </p>
            </div>

          </div>

          {/* HERO */}
          <div className="max-w-xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold text-indigo-300">

              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

              Lecture Scheduling Platform

            </div>

            <h2 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">

              Manage your
              <span className="block text-indigo-400">
                lecture schedules
              </span>
              with ease.

            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              A centralized platform for managing courses, instructors,
              lecture batches and scheduling.
            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                  ◫
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  Course Management
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Create and organize courses.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                  ◷
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  Smart Scheduling
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Prevent instructor conflicts.
                </p>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <p className="text-xs text-slate-600">
            Ideamagix Lecture Scheduling Module
          </p>

        </div>

        {/* ================= RIGHT LOGIN ================= */}
        <div className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2 lg:bg-white/[0.02]">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-500/30">
                I
              </div>

              <h1 className="mt-3 text-xl font-bold text-white">
                Ideamagix
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Lecture Management
              </p>

            </div>

            {/* LOGIN CARD */}
            <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/30 sm:p-9">

              {/* HEADER */}
              <div className="mb-8">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                  →
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to access your lecture scheduling workspace.
                </p>

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    !
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Login failed
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      {error}
                    </p>
                  </div>

                </div>
              )}

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* PASSWORD */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">

                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                      Signing in...

                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>

              </form>

              {/* DEMO INFO */}
              <div className="mt-7 rounded-xl border border-slate-100 bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Demo Access
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Use the provided administrator or instructor credentials
                  to explore the respective dashboards.
                </p>

              </div>

            </div>

            {/* BOTTOM */}
            <p className="mt-6 text-center text-xs text-slate-600">
              © 2026 Ideamagix Lecture Scheduling Module
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;