import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchLectures = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/lectures/my");

      setLectures(response.data.lectures);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch lectures"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-950 text-white lg:flex lg:flex-col">

        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <span className="text-lg font-bold">
                I
              </span>
            </div>

            <div>
              <h1 className="font-bold tracking-wide">
                Ideamagix
              </h1>

              <p className="text-xs text-slate-400">
                Lecture Management
              </p>
            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <button
            onClick={() => navigate("/instructor")}
            className="mb-2 flex w-full items-center gap-3 rounded-xl bg-indigo-500/15 px-4 py-3 text-sm font-medium text-indigo-300"
          >
            <span>▦</span>
            My Dashboard
          </button>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">

            <p className="text-xs text-slate-400">
              Instructor Workspace
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              View all lectures assigned to you and keep track of your teaching schedule.
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40"></span>

              <span className="text-xs font-medium text-emerald-300">
                Schedule active
              </span>

            </div>

          </div>

        </nav>

        {/* USER */}
        <div className="border-t border-white/10 p-4">

          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              I
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Instructor
              </p>

              <p className="text-xs text-slate-400">
                Teaching Staff
              </p>
            </div>

          </div>

          <LogoutButton />

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="lg:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-indigo-600">
                Instructor Workspace
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                My Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your assigned lecture schedule.
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20">
              I
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-6xl">

            {/* ================= STATS ================= */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Assigned Lectures
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {lectures.length}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Total lectures assigned to you
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                    ◷
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Courses
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {
                        new Set(
                          lectures.map(
                            (lecture) => lecture.course?._id
                          )
                        ).size
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Courses in your schedule
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                    ◫
                  </div>

                </div>

              </div>

            </section>

            {/* ================= LECTURES ================= */}
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                <div>

                  <p className="text-sm font-semibold text-indigo-600">
                    Teaching Schedule
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    My Lectures
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    All lectures assigned to your instructor account.
                  </p>

                </div>

                <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  {lectures.length}{" "}
                  {lectures.length === 1
                    ? "Lecture"
                    : "Lectures"}
                </div>

              </div>

              <div className="p-5 sm:p-6">

                {/* LOADING */}
                {loading && (
                  <div className="py-12 text-center">

                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                    <p className="mt-4 text-sm text-slate-500">
                      Loading your lectures...
                    </p>

                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      !
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Unable to load lectures
                      </p>

                      <p className="mt-1 text-sm text-red-700">
                        {error}
                      </p>
                    </div>

                  </div>
                )}

                {/* EMPTY */}
                {!loading && !error && lectures.length === 0 && (
                  <div className="py-12 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                      ◷
                    </div>

                    <h3 className="mt-5 font-semibold text-slate-900">
                      No lectures assigned
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                      You don't have any lectures assigned to your instructor account yet.
                    </p>

                  </div>
                )}

                {/* LECTURE LIST */}
                {!loading && !error && lectures.length > 0 && (
                  <div className="space-y-4">

                    {lectures.map((lecture, index) => (
                      <div
                        key={lecture._id}
                        className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
                      >

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                          {/* COURSE */}
                          <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div>

                              <h3 className="text-lg font-bold text-slate-900">
                                {lecture.course.name}
                              </h3>

                              <div className="mt-2 flex flex-wrap items-center gap-2">

                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                  {lecture.course.level}
                                </span>

                                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                                  {lecture.batchName}
                                </span>

                              </div>

                            </div>

                          </div>

                          {/* DATE */}
                          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 sm:min-w-40 sm:text-right">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Lecture Date
                            </p>

                            <p className="mt-1 font-bold text-indigo-600">
                              {lecture.scheduleDate}
                            </p>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>
                )}

              </div>

            </section>

            {/* FOOTER */}
            <div className="py-8 text-center text-xs text-slate-400">
              Ideamagix Lecture Scheduling Module • Instructor Panel
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default InstructorDashboard;