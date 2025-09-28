"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * app/services/page.jsx
 * - Save to app/services/page.jsx (or src/app/services/page.jsx)
 * - Install framer-motion: npm i framer-motion
 * - Optional images in public/images/
 */

const SERVICES = [
  {
    id: "web",
    title: "Web & App Development",
    short: "Fast, SEO-friendly Next.js sites, PWAs & headless stores.",
    features: ["Next.js & React", "Performance & SEO", "Headless CMS", "E-commerce"],
    image: "/images/service-web.jpg",
  },
  {
    id: "social",
    title: "Social Media & Growth",
    short: "Content strategy, short video funnels & paid growth.",
    features: ["Content Calendars", "Reels & Shorts", "Paid Funnels", "Community Growth"],
    image: "/images/service-social.jpg",
  },
  {
    id: "brand",
    title: "Branding & Graphics",
    short: "Logo systems, visual identity, UI kits and packaging.",
    features: ["Brand Guides", "Logo Systems", "UI / UX", "Print & Packaging"],
    image: "/images/service-brand.jpg",
  },
  {
    id: "video",
    title: "Cinematic Video & Motion",
    short: "Cinematic edits, motion design, color grading & VFX.",
    features: ["Trailer-style edits", "Motion Graphics", "Color Grading", "Sound Mix"],
    image: "/images/service-video.jpg",
  },
];

const PRICING = [
  { id: "starter", title: "Starter", priceMonthly: 15000, priceAnnual: 150000, bullets: ["Landing page", "Basic SEO", "2 revisions"] },
  { id: "growth", title: "Growth", priceMonthly: 40000, priceAnnual: 400000, bullets: ["Multi-page site", "Blog + SEO", "6 creatives / mo"] },
  { id: "premium", title: "Premium", priceMonthly: 90000, priceAnnual: 900000, bullets: ["Full-stack product", "Campaigns + Ads", "Dedicated team"] },
];

const FAQS = [
  { q: "Process kya hota hai?", a: "Strategy → Design → Development/Production → Launch → Growth (optimize & scale)." },
  { q: "Kitna time lagta hai?", a: "Simple projects 2–3 weeks, mid-size 4–8 weeks, complex 2+ months." },
  { q: "Kya revisions milte hain?", a: "Har package me revisions include hain; detailed scope ke hisaab se adjust hota hai." },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);
  const [billing, setBilling] = useState("monthly"); // or 'annual'
  const [openFaq, setOpenFaq] = useState(null);

  function formatCurrency(n) {
    return "₹" + n.toLocaleString("en-IN");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <Header />
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center mt-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Our Services — <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">Strategy · Build · Scale</span>
            </h1>
            <p className="mt-4 text-gray-700 max-w-xl">
              We deliver full-stack digital solutions: high-converting websites, scroll-stopping social content, memorable brands and cinematic video.
              Choose a service, check pricing, or request a custom proposal.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="#services" className="inline-block px-5 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow">View Services</a>
              <a href="/contact" className="inline-block px-5 py-3 rounded-full border border-gray-200">Get a Quote</a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="relative h-64 w-full">
                {/* Replace with animation/Lottie if you want */}
                <Image src="/images/service-web.jpg" alt="services" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500">Popular in 2025</div>
                <h3 className="mt-2 font-semibold">Full-stack product launch</h3>
                <p className="mt-2 text-sm text-gray-600">Design system, marketing funnel, landing & ad creatives — end-to-end delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What we do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <motion.article
                key={s.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 shadow-lg flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-teal-200 to-blue-300 flex items-center justify-center text-2xl">★</div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{s.short}</p>
                  </div>
                </div>

                <ul className="mt-4 text-sm text-gray-600 space-y-2 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => setActiveService(s)} className="px-4 py-2 rounded-full border border-gray-200 text-sm">Learn more</button>
                  <a href="/contact" className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white text-sm">Start Project</a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-12 px-6 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Pricing</h2>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">Monthly</div>
              <div className="relative inline-flex items-center px-1 py-1 bg-white rounded-full shadow">
                <label className={`px-3 py-1 rounded-full cursor-pointer ${billing === "monthly" ? "bg-gradient-to-r from-teal-400 to-blue-600 text-white" : "text-gray-600"}`} onClick={() => setBilling("monthly")}>Monthly</label>
                <label className={`px-3 py-1 rounded-full cursor-pointer ${billing === "annual" ? "bg-gradient-to-r from-teal-400 to-blue-600 text-white" : "text-gray-600"}`} onClick={() => setBilling("annual")}>Annual</label>
              </div>
              <div className="text-sm text-gray-600">Save on annual</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p) => {
              const price = billing === "monthly" ? p.priceMonthly : p.priceAnnual;
              const sub = billing === "monthly" ? "per month" : "per year";
              return (
                <motion.div key={p.id} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">{p.title}</div>
                      <div className="text-2xl font-bold mt-2">{formatCurrency(price)}</div>
                      <div className="text-xs text-gray-500">{sub}</div>
                    </div>
                    <div className="text-xs text-gray-400">✓</div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {p.bullets.map((b) => <li key={b}>• {b}</li>)}
                  </ul>

                  <div className="mt-6 flex gap-3">
                    <a href="/contact" className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">Get Proposal</a>
                    <button className="px-4 py-2 rounded-full border">Talk</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4">
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div>
                    <div className="font-medium">{f.q}</div>
                    <div className="text-sm text-gray-500 mt-1">Click to view answer</div>
                  </div>
                  <div className="text-xl">{openFaq === i ? "−" : "+"}</div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden text-gray-700">
                      <div className="text-sm">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Ready to start?</h3>
          <p className="mt-3">Book a free strategy call or request a custom proposal — we’ll respond within 24 hours.</p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="/contact" className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold">Get a Proposal</a>
            <a href="https://calendly.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white">Book Call</a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );

  function formatCurrency(n) {
    return "₹" + n.toLocaleString("en-IN");
  }
}
