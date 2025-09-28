"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Ultra-advanced Contact Page (multi-step, file attach, budget, map, scheduling)
 * Save as: app/contact/page.jsx
 *
 * Requires: framer-motion (npm i framer-motion)
 */

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "General",
    budget: 50000,
    deadline: "",
    urgency: "normal",
    message: "",
    honeypot: "", // hidden field for bots
  });
  const [file, setFile] = useState(null); // { name, size, type, base64 }
  const fileInputRef = useRef(null);

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
    setStatus(null);
  }

  function toBase64(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  }

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) { // 10MB limit
      setStatus({ type: "error", message: "Attachment must be <= 10 MB" });
      return;
    }
    const base64 = await toBase64(f);
    setFile({ name: f.name, size: f.size, type: f.type, base64 });
    setStatus(null);
  }

  function removeFile() {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validateStep1() {
    if (!form.name.trim()) { setStatus({ type: "error", message: "Name required" }); return false; }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setStatus({ type: "error", message: "Valid email required" }); return false; }
    return true;
  }
  function validateStep2() {
    if (!form.message.trim() && !file) { setStatus({ type: "error", message: "Please add a message or attach a brief" }); return false; }
    return true;
  }

  async function submitAll(e) {
    e?.preventDefault();
    // Final validation
    if (form.honeypot) { setStatus({ type: "error", message: "Spam detected" }); return; }
    setLoading(true);
    setStatus(null);
    try {
      const payload = { ...form, file }; // file may be null
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: data.message || "Thanks — we got your request!" });
        setStep(1);
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "General",
          budget: 50000,
          deadline: "",
          urgency: "normal",
          message: "",
          honeypot: "",
        });
        removeFile();
      } else {
        setStatus({ type: "error", message: data.error || "Server error" });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Animated hero */}
      <Header />



      <section className="relative overflow-hidden ">
        <div className="absolute -left-40 -top-20 w-[520px] h-[520px] bg-gradient-to-tr from-teal-300 to-blue-500 rounded-full opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute right-[-120px] top-20 w-[420px] h-[420px] bg-gradient-to-tr from-pink-400 to-purple-600 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-10">
                Talk to Vision Ads — <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">Build</span> your next growth engine
              </h1>
              <p className="mt-4 text-gray-700 max-w-2xl">
                Multi-disciplinary team: web, social, graphics, cinematic video. Share your brief or attach files — we’ll get back with an action plan.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#form" onClick={() => setStep(1)} className="inline-block px-5 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow">Start Project</a>
                <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="inline-block px-5 py-3 rounded-full border border-gray-200">Book a free call</a>
              </div>
            </div>

            <div className="w-full md:w-[420px] rounded-2xl shadow-lg bg-white p-4">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="Vision Ads" width={64} height={64} />
                <div>
                  <div className="font-semibold">VISION ADS</div>
                  <div className="text-xs text-gray-500">Ultra-Advanced Digital Studio</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <div><strong>Email:</strong> hello@visionads.com</div>
                <div className="mt-1"><strong>Phone:</strong> +91 99999 99999</div>
                <div className="mt-3">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps?q=Delhi&output=embed"
                    className="w-full h-28 rounded-md border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form container */}
      <section id="form" className="max-w-4xl mx-auto px-6 pb-24 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-teal-400" />
              <div className="text-sm font-semibold">Project Inquiry</div>
            </div>
            <div className="text-sm text-gray-500">Step {step} / 3</div>
          </div>

          <form onSubmit={(e) => { if (step < 3) e.preventDefault(); if (step === 1) { if (validateStep1()) setStep(2); } }}>

            {/* STEP 1 — Contact info */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name *" className="p-3 border rounded" required />
                  <input name="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email *" type="email" className="p-3 border rounded" required />
                  <input name="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone (optional)" className="p-3 border rounded" />
                  <select name="service" value={form.service} onChange={(e) => update("service", e.target.value)} className="p-3 border rounded">
                    <option>General</option>
                    <option>Web & App Development</option>
                    <option>Social Media & Ads</option>
                    <option>Branding & Graphics</option>
                    <option>Video & Motion</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-between items-center gap-4">
                  <button type="button" onClick={() => { if (validateStep1()) setStep(2); }} className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow">
                    Continue
                  </button>
                  <div className="text-sm text-gray-500">Prefer a quick call? <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Book now</a></div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Project details */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div>
                  <label className="text-sm font-medium">Estimated Budget: ₹{form.budget.toLocaleString()}</label>
                  <input type="range" min={5000} max={500000} step={1000} value={form.budget} onChange={(e) => update("budget", Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className="p-3 border rounded" />
                  <div className="p-3 border rounded">
                    <div className="text-sm mb-2">Urgency</div>
                    <div className="flex gap-2">
                      <label className={`px-3 py-2 rounded ${form.urgency === "normal" ? "bg-gray-100" : ""}`}>
                        <input type="radio" name="urgency" value="normal" className="mr-2" checked={form.urgency === "normal"} onChange={() => update("urgency", "normal")} /> Normal
                      </label>
                      <label className={`px-3 py-2 rounded ${form.urgency === "fast" ? "bg-gray-100" : ""}`}>
                        <input type="radio" name="urgency" value="fast" className="mr-2" checked={form.urgency === "fast"} onChange={() => update("urgency", "fast")} /> Fast (extra cost)
                      </label>
                      <label className={`px-3 py-2 rounded ${form.urgency === "research" ? "bg-gray-100" : ""}`}>
                        <input type="radio" name="urgency" value="research" className="mr-2" checked={form.urgency === "research"} onChange={() => update("urgency", "research")} /> Consultation
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button type="button" onClick={() => setStep(1)} className="px-5 py-2 rounded-md border">Back</button>
                  <button type="button" onClick={() => { if (validateStep2()) setStep(3); }} className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow">Next</button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Attachments & message */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid gap-4">
                  <label className="text-sm">Message / Brief *</label>
                  <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Write your brief, goals, target audience, references..." className="p-3 border rounded h-36" required />

                  <label className="text-sm">Attach brief / screenshots (optional, max 10MB)</label>
                  <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf,.mov,.mp4,.zip" onChange={handleFile} className="p-2" />
                  {file && (
                    <div className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded">
                      <div>
                        <div className="font-semibold">{file.name}</div>
                        <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <button type="button" onClick={removeFile} className="text-sm text-red-600">Remove</button>
                    </div>
                  )}

                  {/* Honeypot: hidden field to trap bots */}
                  <input type="text" name="company" value={form.honeypot} onChange={(e) => update("honeypot", e.target.value)} autoComplete="off" className="hidden" />

                  <label className="flex items-start gap-3 mt-3">
                    <input type="checkbox" checked={true} readOnly className="mt-1" />
                    <span className="text-sm text-gray-600">I agree to be contacted by Vision Ads about my project. You can view our <a href="#" className="text-blue-600 underline">privacy policy</a>.</span>
                  </label>

                  <div className="mt-4 flex items-center gap-4">
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2 rounded-md border">Back</button>

                    <button onClick={submitAll} disabled={loading} className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow">
                      {loading ? "Sending..." : "Send Request"}
                    </button>

                    <div className="ml-auto text-sm text-gray-500">
                      <div>Avg response: <strong>~24 hours</strong></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* status */}
          {status && (
            <div className={`mt-6 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</div>
          )}
        </div>
      </section>

      {/* Footer quick contacts */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Studio</div>
            <div className="mt-2 text-sm text-gray-600">Address line 1, City, India</div>
            <div className="mt-3"><a className="text-blue-600" href="#">Get directions</a></div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Follow</div>
            <div className="mt-2 text-sm text-gray-600"><a href="#" className="underline">Instagram</a> · <a href="#" className="underline">LinkedIn</a> · <a href="#" className="underline">YouTube</a></div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="font-semibold">Legal & Support</div>
            <div className="mt-2 text-sm text-gray-600"><a href="#" className="underline">Privacy</a> · <a href="#" className="underline">Terms</a></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-blob {
          animation: blob 9s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-20px) scale(1.05); }
          66% { transform: translateY(10px) scale(0.95); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>


      <Footer />
    </main>
  );
}
