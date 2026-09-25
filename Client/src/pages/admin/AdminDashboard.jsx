import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/courses");
      setCourses(response.data.courses);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch courses"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await api.get("/lectures");
      setLectures(response.data.lectures);
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await api.get("/users/instructors");
      setInstructors(response.data.instructors);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchLectures();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-slate-950 text-white lg:flex lg:flex-col">

        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
              <span className="text-lg font-bold">I</span>
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

        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Management
          </p>

          <button
            onClick={() => navigate("/admin")}
            className="mb-2 flex w-full items-center gap-3 rounded-xl bg-indigo-500/15 px-4 py-3 text-sm font-medium text-indigo-300"
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/courses/add")}
            className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span>＋</span>
            Add Course
          </button>

          <button
            onClick={() => navigate("/admin/lectures/schedule")}
            className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span>◷</span>
            Schedule Lecture
          </button>

          <div className="mt-8">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overview
            </p>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">
                System Status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40"></span>

                <span className="text-sm font-medium text-emerald-300">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="lg:ml-64">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-indigo-600">
                Administration
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Dashboard
              </h1>

              <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                Manage courses, instructors and lecture schedules.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-right sm:block">
                <p className="text-xs text-slate-400">
                  Role
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  Administrator
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20">
                A
              </div>

            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">

          {/* ================= STATS ================= */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Courses */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Courses
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {courses.length}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Available in the system
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                  ◫
                </div>

              </div>
            </div>

            {/* Instructors */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Instructors
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {instructors.length}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Registered instructors
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                  ◎
                </div>

              </div>
            </div>

            {/* Lectures */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Scheduled Lectures
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {lectures.length}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Upcoming and scheduled
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-600">
                  ◷
                </div>

              </div>
            </div>

          </section>

          {/* ================= COURSES ================= */}
          <section className="mt-8">

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Course Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Courses
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage available courses and schedule their lectures.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">

                <button
                  onClick={() => navigate("/admin/courses/add")}
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  + Add Course
                </button>

                <button
                  onClick={() => navigate("/admin/lectures/schedule")}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  Schedule Lecture
                </button>

              </div>
            </div>

            {loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                <p className="mt-4 text-sm text-slate-500">
                  Loading courses...
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  ◫
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No courses yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first course to start scheduling lectures.
                </p>

                <button
                  onClick={() => navigate("/admin/courses/add")}
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Add First Course
                </button>
              </div>
            )}

            {!loading && !error && courses.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* IMAGE */}
                    <div className="relative h-48 overflow-hidden">

                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                      <div className="absolute bottom-3 left-4 right-4">

                        <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-700 backdrop-blur-sm">
                          {course.level}
                        </span>

                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <h3 className="text-lg font-bold text-slate-900">
                        {course.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {course.description}
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/lectures/schedule?courseId=${course._id}`
                          )
                        }
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
                      >
                        Schedule Lecture
                        <span>→</span>
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}
          </section>

          {/* ================= INSTRUCTORS ================= */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5 sm:p-6">

              <p className="text-sm font-semibold text-emerald-600">
                Team
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Instructors
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View all available instructors.
              </p>

            </div>

            {instructors.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No instructors available.
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-100">

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Instructor
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Email
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Role
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {instructors.map((instructor) => (
                      <tr
                        key={instructor._id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                              {instructor.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {instructor.name}
                              </p>

                              <p className="text-xs text-slate-400">
                                Instructor
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {instructor.email}
                        </td>

                        <td className="px-6 py-4">

                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                            {instructor.role}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            )}

          </section>

          {/* ================= LECTURES ================= */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

              <div>
                <p className="text-sm font-semibold text-amber-600">
                  Scheduling
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Scheduled Lectures
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor all scheduled course lectures.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                {lectures.length} Scheduled
              </div>

            </div>

            {lectures.length === 0 ? (
              <div className="p-10 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  ◷
                </div>

                <p className="mt-4 font-semibold text-slate-800">
                  No lectures scheduled yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Schedule a lecture from any course above.
                </p>

              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-slate-50">

                    <tr className="border-b border-slate-100">

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Course
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Batch
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Instructor
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {lectures.map((lecture) => (
                      <tr
                        key={lecture._id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-4">

                          <div>
                            <p className="font-semibold text-slate-800">
                              {lecture.course.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {lecture.course.level}
                            </p>
                          </div>

                        </td>

                        <td className="px-6 py-4">

                          <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                            {lecture.batchName}
                          </span>

                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {lecture.instructor.name}
                        </td>

                        <td className="px-6 py-4">

                          <span className="font-semibold text-slate-700">
                            {lecture.scheduleDate}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            )}

          </section>

          {/* FOOTER */}
          <div className="py-8 text-center text-xs text-slate-400">
            Ideamagix Lecture Scheduling Module • Admin Panel
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;