"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * app/portfolio/page.jsx
 * Requires: framer-motion (npm i framer-motion)
 * Add images to: public/images/portfolio1.jpg ... portfolio6.jpg
 */

export default function PortfolioPage() {
  const items = [
    { id: "p1", title: "Brand Refresh — Luma Co.", category: "Branding", image: "/images/portfolio1.jpg", desc: "Full brand identity, packaging & launch campaign.", result: "+45% brand recall" },
    { id: "p2", title: "E-commerce Growth — QuickCart", category: "Web", image: "/images/portfolio2.jpg", desc: "Next.js store + CRO + paid ads funnel.", result: "3x revenue in 3 months" },
    { id: "p3", title: "Social Series — EatRight", category: "Social", image: "/images/portfolio3.jpg", desc: "30 short-form videos + influencer seeding.", result: "Avg CTR 6%" },
    { id: "p4", title: "Cinematic Promo — Nova", category: "Video", image: "/images/portfolio4.jpg", desc: "Cinematic product film, color graded & mixed.", result: "Festival selection" },
    { id: "p5", title: "UI Revamp — FinFlow", category: "Web", image: "/images/portfolio5.jpg", desc: "Dashboard redesign with performance focus.", result: "+20% retention" },
    { id: "p6", title: "Motion Kit — Stellar", category: "Branding", image: "/images/portfolio6.jpg", desc: "Animated logos, transitions & social templates.", result: "Reusable kit for teams" },
  ];

  const categories = ["All", "Web", "Social", "Video", "Branding"];
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const [liked, setLiked] = useState({});

  const filtered = activeCat === "All" ? items : items.filter((it) => it.category === activeCat);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <Header />

      {/* Portfolio Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8 mt-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-10">Selected Work</h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Case studies aur campaigns — web, social, branding aur cinematic video. Har project me strategy, design aur measurable results diye gaye hain.
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCat === c ? "bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow" : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((it) => (
            <motion.article
              key={it.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl"
            >
              <div className="relative h-52 w-full">
                <Image src={it.image} alt={it.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{it.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">{it.category} • {it.result}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => setLiked((s) => ({ ...s, [it.id]: !s[it.id] }))}
                      className="text-lg leading-none select-none"
                      aria-label={liked[it.id] ? "Unlike" : "Like"}
                      title={liked[it.id] ? "Unsave" : "Save"}
                    >
                      <span className={`transition ${liked[it.id] ? "text-red-500" : "text-gray-400"}`}>{liked[it.id] ? "♥" : "♡"}</span>
                    </button>

                    <button onClick={() => setSelected(it)} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">View</button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">{it.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/contact" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow">
            Start a Project
          </a>
        </div>
      </section>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 w-full">
                <Image src={selected.image} alt={selected.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{selected.title}</h2>
                    <div className="text-sm text-gray-500 mt-1">{selected.category} • {selected.result}</div>
                  </div>

                  <div className="flex gap-2">
                    <a href={`/portfolio/${selected.id}`} className="px-4 py-2 rounded-full border">Case Study</a>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white">Close</button>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">{selected.desc} — detailed campaign summary, objectives, process and measurable results are available in the full case study.</p>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="text-sm text-gray-600"><strong>Role:</strong> Creative Direction, Production</div>
                  <div className="text-sm text-gray-600"><strong>Deliverables:</strong> Web, Motion, Social</div>
                  <div className="text-sm text-gray-600"><strong>Tools:</strong> Figma, After Effects, Premiere, React</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* small footer */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Want this result?</div>
            <div className="text-sm text-gray-600 mt-2">Start a project with us — we’ll share strategy & pricing.</div>
            <div className="mt-4"><a href="/contact" className="text-blue-600 underline">Get a proposal</a></div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Follow</div>
            <div className="mt-2 text-sm text-gray-600"><a href="#" className="underline">Instagram</a> · <a href="#" className="underline">LinkedIn</a></div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Studio</div>
            <div className="text-sm text-gray-600 mt-2">Address line 1, City, India</div>
            <div className="mt-3"><a className="text-blue-600" href="#">Get directions</a></div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
