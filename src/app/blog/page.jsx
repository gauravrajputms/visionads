"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPage() {
  const posts = [
    { slug: "ai-trends", title: "AI Marketing Trends", category: "Marketing", date: "Sep 25, 2025", author: "Vision Ads", image: "/images/blog1.jpg", excerpt: "AI tools marketing ko next level le ja rahe hain..." },
    { slug: "nextjs-wordpress", title: "Next.js vs WordPress", category: "Web Dev", date: "Sep 20, 2025", author: "Dev Team", image: "/images/blog2.jpg", excerpt: "Pros & cons dono platforms ke..." },
    { slug: "short-videos", title: "Short Videos Growth", category: "Social Media", date: "Sep 10, 2025", author: "Studio", image: "/images/blog3.jpg", excerpt: "Reels aur shorts brand engagement boost karte hain..." },
    { slug: "design-systems", title: "Design Systems for Scale", category: "Design", date: "Aug 30, 2025", author: "Design Team", image: "/images/blog4.jpg", excerpt: "Startups ko design system kyun banana chahiye..." },
  ];

  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const categories = ["All", ...new Set(posts.map(p => p.category))];

  const filtered = posts.filter(p => 
    (activeCat === "All" || p.category === activeCat) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      {/* Hero */}

      <Header />


      <section className="relative h-[500px] w-full">
        <Image src="/images/blog1.jpg" alt="Featured" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold">AI Marketing Trends</h1>
          <p className="mt-2">AI tools ka marketing par impact aur adoption guide.</p>
          <Link href="/blog/ai-trends" className="mt-4 inline-block bg-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Read More →</Link>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap gap-3">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${activeCat===c ? "bg-indigo-500 text-white shadow" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filtered.map(post => (
              <motion.article key={post.slug} layout
                initial={{ opacity:0, y:50 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-50 }}
                transition={{ type:"spring", stiffness:120 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2">{post.date} • {post.author}</div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-block text-indigo-600 font-medium hover:underline">Read More →</Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>


      <Footer />
    </main>
  );
}
