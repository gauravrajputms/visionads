"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

/* ------------------ Hero ------------------ */
function Hero() {
  return (
    <section className="relative flex items-center justify-center text-center min-h-screen px-6 pt-24 overflow-hidden">
      {/* Background illustrative image (place in public/images/hero-bg.jpg) */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <Image src="/images/hero-bg.jpg" alt="hero-bg" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/80"></div>
      </div>

      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Ultra‑Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">Web</span>,
          <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Social</span>,
          <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Graphics</span> &
          <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Video</span>
        </h1>

        <p className="mt-6 text-lg text-gray-700">
          Vision Ads builds data-driven campaigns, pixel-perfect brand designs, cinematic video editing, and immersive motion graphics that scale businesses. End-to-end from strategy → production → growth.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow-lg">Get a Quote</a>
          <a href="#portfolio" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200">See Portfolio</a>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 max-w-md mx-auto">
          <Stat label="Years" value="5+" />
          <Stat label="Projects" value="120+" />
          <Stat label="Clients" value="80+" />
          <Stat label="Awards" value="12" />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs mt-1 text-gray-600">{label}</div>
    </div>
  );
}

/* ------------------ Services ------------------ */
function Services() {
  const services = [
    {
      title: "Web & App Development",
      desc: "Next.js, React, Headless CMS, PWAs — fast & SEO friendly." ,
      tags: ["Responsive","Performance","SEO"],
    },
    {
      title: "Social Media Strategy",
      desc: "Organic + Paid funnels, content calendars, community growth.",
      tags: ["Content","Ads","Growth"],
    },
    {
      title: "Branding & Graphics",
      desc: "Logo systems, brand guides, packaging & UI/UX design.",
      tags: ["Logo","UI","Print"],
    },
    {
      title: "Video Editing & Motion",
      desc: "Cinematic edits, motion design, VFX, color grading & sound mix.",
      tags: ["VFX","Cinematic","Explainer"],
    },
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Ultra‑Advanced Services</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-12 w-12 rounded-md bg-gradient-to-r from-teal-300 to-blue-400 flex items-center justify-center text-xl">{`S${i+1}`}</div>
              <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 bg-gray-100 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ Portfolio ------------------ */
function Portfolio() {
  const items = ["portfolio1.jpg","portfolio2.jpg","portfolio3.jpg","portfolio4.jpg"];
  return (
    <section id="portfolio" className="py-20 px-6 bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Selected Work</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl overflow-hidden shadow">
              <div className="relative h-48 w-full">
                <Image src={`/images/${img}`} alt={`portfolio-${i}`} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Project {i + 1}</h4>
                <p className="text-sm text-gray-600 mt-2">Short case summary — campaign results & highlights.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ Testimonials ------------------ */
function Testimonials() {
  const data = [
    { name: "Rohit Sharma", text: "Vision Ads scaled our ROAS by 3x — best team!" },
    { name: "Anita Verma", text: "Branding + website launch was smooth and beautiful." },
    { name: "Khushboo", text: "Video edit quality is cinema-level. Highly recommended." },
  ];
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((d, i) => (
            <motion.blockquote key={i} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-700">“{d.text}”</p>
              <cite className="mt-4 block font-semibold">— {d.name}</cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------ CTA ------------------ */
function CTA() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-center rounded-t-3xl">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold">Ready to start something awesome?</h3>
        <p className="mt-3">Book a free call — strategy, estimation & creative brief in one session.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/contact" className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold">Schedule Call</a>
          <a href="mailto:hello@visionads.com" className="px-6 py-3 rounded-full border border-white">Email Us</a>
        </div>
      </div>
    </section>
  );
}

