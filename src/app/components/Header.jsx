"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        // scroll down → hide
        setShow(false);
      } else {
        // scroll up → show
        setShow(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-4">
         <Image
                src="/logo1.png"
                alt="Vision Ads"
                width={98}
                height={98}
                className="h-auto max-h-16"
                unoptimized={true}
                />

            </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/services" className="hover:underline">
            Services
          </a>
          <a href="/portfolio" className="hover:underline">
            Portfolio
          </a>
          <a href="/blog" className="hover:underline">
            Blog
          </a>
          <a
            href="/contact"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white hover:opacity-90 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu (simple placeholder) */}
        <div className="md:hidden">
          <button className="text-gray-700 font-bold">Menu</button>
        </div>
      </nav>
    </header>
  );
}
