// app/about/page.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              About{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
                Vision Ads
              </span>
            </h1>
            <p className="mt-6 text-gray-700 text-lg">
              Vision Ads is a full-stack digital studio — building high-converting
              websites, scroll-stopping social content, brand systems, and cinematic
              video edits for ambitious businesses. We combine design, data and storytelling
              to create measurable growth.
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>
                <strong>Our Mission:</strong> Deliver creative work that moves people and
                drives growth.
              </p>
              <p>
                <strong>Our Vision:</strong> Be the growth partner for global brands who want
                premium digital presence.
              </p>
              <p>
                <strong>What we do:</strong> Strategy → Creative → Production → Growth.
              </p>
            </div>

            <a
              href="/contact"
              className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow-lg"
            >
              Work with us
            </a>
          </div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/about-hero.jpg"
              alt="Vision Ads Team"
              width={720}
              height={540}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-6 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Gaurav Rajput",
                role: "Founder & Creative Director",
                img: "/images/team1.jpg",
              },
              {
                name: "Khushbu",
                role: "Head of Motion & Video",
                img: "/images/team2.jpg",
              },
              {
                name: "Ayush",
                role: "Lead Developer",
                img: "/images/team3.jpg",
              },
            ].map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={140}
                    height={140}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Process */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Process</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-2xl font-bold">01</div>
              <h4 className="mt-3 font-semibold">Strategy</h4>
              <p className="mt-2 text-sm text-gray-600">Research, brief, KPI & funnel planning.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-2xl font-bold">02</div>
              <h4 className="mt-3 font-semibold">Production</h4>
              <p className="mt-2 text-sm text-gray-600">Design, development & cinematic video editing.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="text-2xl font-bold">03</div>
              <h4 className="mt-3 font-semibold">Growth</h4>
              <p className="mt-2 text-sm text-gray-600">Ads, optimization & scaling with data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-center rounded-t-3xl">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold">Want a free strategy call?</h3>
          <p className="mt-3">Get a customised plan for your brand — content + tech + ads.</p>
          <div className="mt-6">
            <a href="/contact" className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold">
              Schedule Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
