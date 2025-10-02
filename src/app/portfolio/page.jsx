"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * app/portfolio/page.jsx
 */

export default function PortfolioPage() {
  const items = [
    { id: "p1", title: "Graphics Template", category: "Graphics", image: "/images/portfolio/nawed.png", desc: "Full brand identity, graphics banner.", result: "+45% brand recall", url: "https://www.behance.net/nawedali412" },
    { id: "p2", title: "Portfolio website", category: "Web", image: "/images/portfolio/gaurav.png", desc: "this is a portfolio templatee", result: "3x revenue in 3 months", url: "https://rajgaurav.netlify.app/" },
    { id: "p3", title: "Natural theme ", category: "web", image: "/images/portfolio/nura.png", desc: "it is a weebsite templatee if need then sendd message", result: "Avg CTR 6%", url: "https://nuraweb.netlify.app/" },
  ];

  const categories = ["All", "Web", "Social", "Video", "Branding"];
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);

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
              <div className="relative h-52 w-full cursor-pointer" onClick={() => setSelected(it)}>
                <Image src={it.image} alt={it.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{it.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">{it.category} • {it.result}</div>
                  </div>

                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  >
                    View
                  </a>
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

      {/* Modal / Full Image Viewer with Content */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] bg-black">
                <Image src={selected.image} alt={selected.title} fill style={{ objectFit: "contain" }} />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold">{selected.title}</h2>
                <div className="text-sm text-gray-500 mt-1">{selected.category} • {selected.result}</div>
                <p className="mt-3 text-gray-700">{selected.desc}</p>
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow"
                >
                  View Project
                </a>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full hover:bg-black"
              >
                Close
              </button>
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
