"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const navItems = [
     { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", dropdown: [
      { label: "Web Development", href: "/services/web" },
      { label: "Graphics Development", href: "/services/graphics" },
      { label: "Video Production", href: "/services/video" },
    ]},
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <a
                href={item.href}
                className="hover:underline flex items-center gap-1"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} />}
              </a>
              {item.dropdown && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 p-3">
                  <div className="flex flex-col gap-2">
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="hover:text-blue-600 whitespace-nowrap"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a
            href="/contact"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white hover:opacity-90 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 font-bold"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-6 text-lg font-medium">
              {navItems.map((item) => (
                <div key={item.href} className="w-full text-center">
                  <button
                    className="w-full flex items-center justify-center gap-1 hover:text-blue-600"
                    onClick={() =>
                      item.dropdown ? setDropdownOpen(dropdownOpen === item.label ? false : item.label) : setMobileOpen(false)
                    }
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={16} />}
                  </button>
                  {item.dropdown && dropdownOpen === item.label && (
                    <div className="flex flex-col gap-2 mt-2">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          className="hover:text-blue-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="/contact"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white hover:opacity-90 transition"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}