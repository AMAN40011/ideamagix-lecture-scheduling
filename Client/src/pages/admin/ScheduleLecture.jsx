import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ScheduleLecture = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [searchParams] = useSearchParams();
  const courseIdFromUrl = searchParams.get("courseId");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    batchName: "",
    instructor: "",
    scheduleDate: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [coursesResponse, instructorsResponse] = await Promise.all([
        api.get("/courses"),
        api.get("/users/instructors"),
      ]);

      setCourses(coursesResponse.data.courses);
      setInstructors(instructorsResponse.data.instructors);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load scheduling data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.post("/lectures", formData);

      setSuccess("Lecture scheduled successfully!");

      setFormData({
        course: "",
        batchName: "",
        instructor: "",
        scheduleDate: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to schedule lecture"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (courseIdFromUrl && courses.length > 0) {
      const courseExists = courses.some(
        (course) => course._id === courseIdFromUrl
      );

      if (courseExists) {
        setFormData((previousData) => ({
          ...previousData,
          course: courseIdFromUrl,
        }));
      }
    }
  }, [courseIdFromUrl, courses]);

  const selectedCourse = courses.find(
    (course) => course._id === formData.course
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading scheduling workspace...
          </p>
        </div>
      </div>
    );
  }

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
            Management
          </p>

          <button
            onClick={() => navigate("/admin")}
            className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
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
            className="mb-2 flex w-full items-center gap-3 rounded-xl bg-indigo-500/15 px-4 py-3 text-sm font-medium text-indigo-300"
          >
            <span>◷</span>
            Schedule Lecture
          </button>

          {/* INFO CARD */}
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">

            <p className="text-xs text-slate-400">
              Scheduling rule
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              An instructor can only have one lecture scheduled on the same date.
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40"></span>

              <span className="text-xs font-medium text-emerald-300">
                Conflict protection enabled
              </span>

            </div>

          </div>

        </nav>

        {/* BOTTOM */}
        <div className="border-t border-white/10 p-4">

          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>

          </div>

          {/* LogoutButton already has its own styling */}
          <div className="w-full">
            {/* We keep the existing logout functionality through navigation */}
            <button
              onClick={() => navigate("/admin")}
              className="hidden"
            >
              Dashboard
            </button>
          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="lg:ml-64">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2 text-sm">

                <button
                  onClick={() => navigate("/admin")}
                  className="text-slate-400 transition hover:text-indigo-600"
                >
                  Dashboard
                </button>

                <span className="text-slate-300">
                  /
                </span>

                <span className="font-medium text-indigo-600">
                  Schedule Lecture
                </span>

              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Schedule Lecture
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Assign a course batch to an instructor and select a lecture date.
              </p>

            </div>

            <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20 sm:flex">
              A
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-5xl">

            {/* ================= COURSE SUMMARY ================= */}
            {selectedCourse && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">

                <div className="flex flex-col sm:flex-row">

                  <div className="h-36 w-full sm:h-auto sm:w-56">

                    <img
                      src={selectedCourse.image}
                      alt={selectedCourse.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="flex flex-1 items-center justify-between gap-4 p-5">

                    <div>

                      <div className="mb-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        Selected Course
                      </div>

                      <h2 className="text-xl font-bold text-slate-900">
                        {selectedCourse.name}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {selectedCourse.level}
                      </p>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {selectedCourse.description}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((previousData) => ({
                          ...previousData,
                          course: "",
                        }))
                      }
                      className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                    >
                      Change
                    </button>

                  </div>

                </div>

              </div>
            )}

            {/* ================= FORM ================= */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              {/* LEFT INFO */}
              <div className="lg:col-span-1">

                <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
                    ◷
                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    Lecture Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Configure the course batch, instructor and date for this lecture.
                  </p>

                  <div className="mt-6 space-y-4">

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        1
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Select Course
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Choose the course for this lecture.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        2
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Create Batch
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Give the lecture batch a meaningful name.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        3
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Assign Instructor
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Select an available instructor.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        4
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Select Date
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Choose the lecture date.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT FORM */}
              <div className="lg:col-span-2">

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 p-6">

                    <p className="text-sm font-semibold text-indigo-600">
                      Scheduling
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Lecture Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Fill in the details below to create a lecture schedule.
                    </p>

                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                  >

                    {/* ERROR */}
                    {error && (
                      <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                          !
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-red-800">
                            Scheduling failed
                          </p>

                          <p className="mt-1 text-sm text-red-700">
                            {error}
                          </p>
                        </div>

                      </div>
                    )}

                    {/* SUCCESS */}
                    {success && (
                      <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          ✓
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            Lecture scheduled
                          </p>

                          <p className="mt-1 text-sm text-emerald-700">
                            {success}
                          </p>
                        </div>

                      </div>
                    )}

                    {/* COURSE */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course
                      </label>

                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >

                        <option value="">
                          Select course
                        </option>

                        {courses.map((course) => (
                          <option
                            key={course._id}
                            value={course._id}
                          >
                            {course.name} - {course.level}
                          </option>
                        ))}

                      </select>

                      <p className="mt-2 text-xs text-slate-400">
                        Select the course for which this lecture will be scheduled.
                      </p>

                    </div>

                    {/* BATCH */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Batch Name
                      </label>

                      <input
                        type="text"
                        name="batchName"
                        value={formData.batchName}
                        onChange={handleChange}
                        placeholder="Example: Morning Batch"
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Use a clear name such as Morning Batch or Weekend Batch.
                      </p>

                    </div>

                    {/* INSTRUCTOR */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Instructor
                      </label>

                      <select
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >

                        <option value="">
                          Select instructor
                        </option>

                        {instructors.map((instructor) => (
                          <option
                            key={instructor._id}
                            value={instructor._id}
                          >
                            {instructor.name} - {instructor.email}
                          </option>
                        ))}

                      </select>

                      <p className="mt-2 text-xs text-slate-400">
                        The selected instructor will receive this lecture.
                      </p>

                    </div>

                    {/* DATE */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Lecture Date
                      </label>

                      <input
                        type="date"
                        name="scheduleDate"
                        value={formData.scheduleDate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        An instructor cannot have another lecture scheduled on the same date.
                      </p>

                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-slate-100"></div>

                    {/* ACTIONS */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                      <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {submitting
                          ? "Scheduling..."
                          : "Schedule Lecture"}
                      </button>

                    </div>

                  </form>

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="py-8 text-center text-xs text-slate-400">
              Ideamagix Lecture Scheduling Module • Admin Panel
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default ScheduleLecture;