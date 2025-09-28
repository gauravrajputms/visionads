"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  Share2,
  X,
  Users,
  Calendar,
} from "lucide-react";

export default function CareerPageAdvanced({ initialJobs }) {
  const sampleJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-Time",
      date: "2025-09-25",
      description: "React, Next.js aur Tailwind se responsive apps build karna.",
      seniority: "Mid",
      salary: "₹6-10 LPA",
      tags: ["React", "Next.js", "Tailwind"],
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Ghaziabad",
      type: "Full-Time",
      date: "2025-09-20",
      description: "Figma & Adobe XD me modern designs create karna.",
      seniority: "Senior",
      salary: "₹4-8 LPA",
      tags: ["Figma", "Prototyping"],
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Part-Time",
      date: "2025-09-18",
      description: "Social media campaigns aur SEO strategies manage karna.",
      seniority: "Junior",
      salary: "₹2-4 LPA",
      tags: ["SEO", "Social Media"],
    },
    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      location: "Noida",
      type: "Full-Time",
      date: "2025-09-15",
      description: "Node.js & MongoDB based scalable APIs develop karna.",
      seniority: "Mid",
      salary: "₹7-12 LPA",
      tags: ["Node.js", "MongoDB"],
    },
  ];

  const jobs = useMemo(() => initialJobs ?? sampleJobs, [initialJobs]);

  // UI state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedLocs, setSelectedLocs] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [pageSize, setPageSize] = useState(6);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedJobs_v1") || "[]");
    } catch (e) {
      return [];
    }
  });

  const [activeJob, setActiveJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [applying, setApplying] = useState(false);
  const [appForm, setAppForm] = useState({ name: "", email: "", resume: null });
  const [loading, setLoading] = useState(false);

  // derive filters
  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs]
  );
  const locations = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs]
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.type)))],
    [jobs]
  );

  // Debounce search
  const debounceRef = useRef(null);
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Filtered and sorted jobs
  const filtered = useMemo(() => {
    setLoading(true);
    let list = [...jobs];

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          (j.tags || []).join(" ").toLowerCase().includes(q)
      );
    }

    if (selectedDepts.length && !selectedDepts.includes("All")) {
      list = list.filter((j) => selectedDepts.includes(j.department));
    }
    if (selectedLocs.length && !selectedLocs.includes("All")) {
      list = list.filter((j) => selectedLocs.includes(j.location));
    }
    if (selectedTypes.length && !selectedTypes.includes("All")) {
      list = list.filter((j) => selectedTypes.includes(j.type));
    }

    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "salary") {
      const parseSalary = (s) => {
        if (!s) return 0;
        const match = s.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      list.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }

    // small fake delay for skeleton
    setTimeout(() => setLoading(false), 150);
    return list;
  }, [jobs, debouncedQuery, selectedDepts, selectedLocs, selectedTypes, sortBy]);

  const visibleJobs = filtered.slice(0, pageSize);
  const hasMore = filtered.length > visibleJobs.length;

  // Save/un-save
  function toggleSave(jobId) {
    setSaved((prev) => {
      const exists = prev.includes(jobId);
      const next = exists ? prev.filter((id) => id !== jobId) : [jobId, ...prev];
      try {
        localStorage.setItem("savedJobs_v1", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }

  // open details
  function openJob(job) {
    setActiveJob(job);
    setShowModal(true);
  }

  // Apply
  function submitApplication(e) {
    e.preventDefault();
    if (!appForm.name || !appForm.email) return alert("Please fill name & email");
    setApplying(true);

    // fake submission
    setTimeout(() => {
      setApplying(false);
      setShowModal(false);
      setAppForm({ name: "", email: "", resume: null });
      alert(`Application sent for ${activeJob.title}. We will contact you at ${appForm.email}`);
    }, 900);
  }

  // helpers for multi-select toggles
  function toggleArray(setter, value) {
    setter((prev) => {
      if (prev.includes(value)) return prev.filter((p) => p !== value);
      return [...prev.filter((p) => p !== "All"), value];
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900 p-6">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10 shadow-lg mb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Join our team — grow with us</h1>
            <p className="opacity-90">
              Discover roles across Engineering, Design, Marketing and more. Filter, save, and apply — sab ek jagah par.
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="search" className="sr-only">
              Search jobs
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 opacity-80" size={18} />
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs, skills, tags..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-900 bg-white border border-white/30 placeholder:text-slate-500"
              />
            </div>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <Users size={14} /> {jobs.length} Open roles
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <Calendar size={14} /> Updated recently
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto mb-6 grid gap-4 md:grid-cols-3 items-start">
        <div className="col-span-2 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex gap-3 flex-wrap items-center">
            {/* Departments */}
            <div className="flex gap-2 flex-wrap">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleArray(setSelectedDepts, d)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    selectedDepts.includes(d) ? "bg-indigo-600 text-white shadow" : "bg-white border-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Location quick filters */}
            <div className="ml-auto flex gap-2">
              {locations.slice(0, 4).map((l) => (
                <button
                  key={l}
                  onClick={() => toggleArray(setSelectedLocs, l)}
                  className={`px-3 py-1 rounded-full text-sm border flex items-center gap-2 ${
                    selectedLocs.includes(l) ? "bg-purple-600 text-white" : "bg-white"
                  }`}
                >
                  <MapPin size={14} /> {l}
                </button>
              ))}

              <div className="ml-2 flex items-center gap-2">
                <label className="text-xs">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 rounded-md border bg-white text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="salary">Salary (high → low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags row */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {Array.from(new Set(jobs.flatMap((j) => j.tags || []))).map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery((q) => (q ? `${q} ${tag}` : tag))}
                className="text-xs px-3 py-1 rounded-md border bg-slate-50 hover:bg-slate-100"
              >
                {tag}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedDepts([]);
                setSelectedLocs([]);
                setSelectedTypes([]);
                setQuery("");
              }}
              className="text-xs px-3 py-1 rounded-md border bg-red-50 text-red-600"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right-side quick actions */}
        <aside className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Link copied!");
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50"
            >
              <Share2 size={16} /> Share careers page
            </button>

            <button
              onClick={() => {
                const csv = jobs
                  .map((j) => `${j.id},"${j.title}",${j.department},${j.location},${j.type},${j.date}`)
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const href = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = href;
                a.download = "jobs.csv";
                a.click();
                URL.revokeObjectURL(href);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-50"
            >
              Export CSV
            </button>

            <div className="mt-2">
              <label className="text-xs">Results per page</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-md border"
              >
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={9}>9</option>
              </select>
            </div>
          </div>
        </aside>
      </section>

      {/* Job grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading &&
              Array.from({ length: Math.min(3, pageSize) }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-white rounded-2xl shadow-md animate-pulse"
                >
                  <div className="h-6 bg-slate-200 w-2/3 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 w-1/2 rounded mb-3"></div>
                  <div className="h-12 bg-slate-200 w-full rounded"></div>
                </motion.div>
              ))}

            {!loading &&
              visibleJobs.map((job) => (
                <motion.article
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <div className="text-xs text-slate-500 mt-1 flex gap-3">
                          <span className="inline-flex items-center gap-1">
                            <Briefcase size={12} /> {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1">{job.seniority}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSave(job.id)}
                          aria-pressed={saved.includes(job.id)}
                          title={saved.includes(job.id) ? "Saved" : "Save job"}
                          className={`p-2 rounded-lg border ${saved.includes(job.id) ? "bg-yellow-100" : "bg-white"}`}
                        >
                          <Bookmark size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-slate-700 line-clamp-3">{job.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags?.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-md bg-slate-100">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      {job.type} • {new Date(job.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openJob(job)}
                        className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                      >
                        View
                      </button>

                      <a
                        href="#apply"
                        onClick={(e) => {
                          e.preventDefault();
                          openJob(job);
                        }}
                        className="px-3 py-2 rounded-lg border text-sm hover:bg-slate-50"
                      >
                        Quick apply
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>

        {/* Pagination / Load more */}
        <div className="mt-8 flex justify-center">
          {hasMore ? (
            <button
              onClick={() => setPageSize((s) => s + 6)}
              className="px-6 py-2 rounded-lg bg-white border shadow hover:bg-slate-50"
            >
              Load more
            </button>
          ) : (
            <div className="text-sm text-slate-500">{filtered.length} results</div>
          )}
        </div>
      </section>

      {/* Modal: job details + apply form */}
      <AnimatePresence>
        {showModal && activeJob && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 z-50"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 rounded-md hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{activeJob.title}</h2>
                  <div className="text-sm text-slate-500 mt-1 flex gap-3">
                    <span>{activeJob.department}</span>
                    <span>{activeJob.location}</span>
                    <span>{activeJob.seniority}</span>
                  </div>

                  <p className="mt-4 text-slate-700">{activeJob.description}</p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {activeJob.tags?.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <aside className="w-full md:w-96 bg-slate-50 p-4 rounded-xl">
                  <div className="text-sm text-slate-600">{activeJob.salary ?? "Competitive"}</div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Apply for this role</h4>
                    <form onSubmit={submitApplication} className="flex flex-col gap-3">
                      <input
                        required
                        placeholder="Your name"
                        value={appForm.name}
                        onChange={(e) => setAppForm((s) => ({ ...s, name: e.target.value }))}
                        className="px-3 py-2 rounded-md border bg-white"
                      />
                      <input
                        required
                        placeholder="Email"
                        type="email"
                        value={appForm.email}
                        onChange={(e) => setAppForm((s) => ({ ...s, email: e.target.value }))}
                        className="px-3 py-2 rounded-md border bg-white"
                      />
                      <input
                        type="file"
                        onChange={(e) => setAppForm((s) => ({ ...s, resume: e.target.files?.[0] }))}
                        className="text-sm"
                      />

                      <button
                        type="submit"
                        disabled={applying}
                        className="mt-1 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium disabled:opacity-60"
                      >
                        {applying ? "Submitting..." : "Send application"}
                      </button>
                    </form>

                    <div className="mt-4 text-xs text-slate-500">
                      Or save for later and apply when you're ready.
                      <button onClick={() => toggleSave(activeJob.id)} className="ml-2 underline">
                        {saved.includes(activeJob.id) ? "Saved" : "Save"}
                      </button>
                    </div>

                    <div className="mt-4 text-xs text-slate-500">By applying you agree to our hiring policies.</div>
                  </div>
                </aside>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
