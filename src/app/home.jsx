import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-screen bg-gradient-to-b from-white to-gray-100">
      <motion.img 
        src="/logo.png" 
        alt="Vision Ads Logo"
        className="w-40 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-4xl font-bold text-gray-900">
        We Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600">Visionary Ads</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Boost your brand with creative ads, smart marketing & powerful digital presence.
      </p>
      <motion.a
        href="/contact"
        className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow-lg hover:scale-105"
        whileHover={{ scale: 1.05 }}
      >
        Get Started
      </motion.a>
    </section>
  );
}
