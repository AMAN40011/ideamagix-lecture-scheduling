import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/courses", formData);

      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

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
            className="mb-2 flex w-full items-center gap-3 rounded-xl bg-indigo-500/15 px-4 py-3 text-sm font-medium text-indigo-300"
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

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">

            <p className="text-xs text-slate-400">
              Course Management
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              Create courses first, then add multiple lecture batches from the dashboard.
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400"></span>

              <span className="text-xs font-medium text-indigo-300">
                Admin access
              </span>

            </div>

          </div>

        </nav>

        {/* ADMIN */}
        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

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

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="lg:ml-64">

        {/* HEADER */}
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
                  Add Course
                </span>

              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create New Course
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Add a course to your lecture scheduling system.
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              {/* ================= LEFT INFO ================= */}
              <div className="lg:col-span-1">

                <div className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-xl">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-xl shadow-lg shadow-indigo-500/30">
                    +
                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    Course Setup
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Add the basic information for a course. Once created, you can schedule multiple lecture batches for it.
                  </p>

                  <div className="mt-7 space-y-5">

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        1
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Course Name
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Give the course a clear name.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        2
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Level
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Define the course difficulty level.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        3
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Description
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Briefly describe the course.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
                        4
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Course Image
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Add an image URL for the course.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* PREVIEW */}
                {formData.image && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 p-5">

                      <p className="text-sm font-semibold text-indigo-600">
                        Preview
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        Course Card
                      </h3>

                    </div>

                    <div className="p-4">

                      <div className="overflow-hidden rounded-xl border border-slate-200">

                        <img
                          src={formData.image}
                          alt="Course preview"
                          className="h-36 w-full object-cover"
                        />

                        <div className="p-4">

                          <h4 className="font-bold text-slate-900">
                            {formData.name || "Course Name"}
                          </h4>

                          <p className="mt-1 text-xs font-semibold text-indigo-600">
                            {formData.level || "Course Level"}
                          </p>

                          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {formData.description ||
                              "Course description will appear here."}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* ================= FORM ================= */}
              <div className="lg:col-span-2">

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 p-6">

                    <p className="text-sm font-semibold text-indigo-600">
                      Course Management
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Course Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Enter the details below to create a new course.
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
                            Course creation failed
                          </p>

                          <p className="mt-1 text-sm text-red-700">
                            {error}
                          </p>
                        </div>

                      </div>
                    )}

                    {/* COURSE NAME */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Example: MERN Stack Development"
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Enter a clear and recognizable course name.
                      </p>

                    </div>

                    {/* LEVEL */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course Level
                      </label>

                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >

                        <option value="">
                          Select course level
                        </option>

                        <option value="Beginner">
                          Beginner
                        </option>

                        <option value="Intermediate">
                          Intermediate
                        </option>

                        <option value="Advanced">
                          Advanced
                        </option>

                      </select>

                      <p className="mt-2 text-xs text-slate-400">
                        Choose the expected learning level.
                      </p>

                    </div>

                    {/* DESCRIPTION */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what students will learn in this course..."
                        rows="5"
                        required
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <div className="mt-2 flex justify-between">

                        <p className="text-xs text-slate-400">
                          Keep the description concise and informative.
                        </p>

                        <p className="text-xs text-slate-400">
                          {formData.description.length} characters
                        </p>

                      </div>

                    </div>

                    {/* IMAGE */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Course Image URL
                      </label>

                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/course-image.jpg"
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Use a publicly accessible image URL.
                      </p>

                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-slate-100"></div>

                    {/* ACTIONS */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                      <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {loading
                          ? "Creating Course..."
                          : "Create Course"}
                      </button>

                    </div>

                  </form>

                </div>

              </div>

            </div>

            <div className="py-8 text-center text-xs text-slate-400">
              Ideamagix Lecture Scheduling Module • Admin Panel
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AddCourse;