"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#builder", label: "Custom Gifts" },
  { href: "#stories", label: "Stories" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(127,84,67,0.12)] border border-white/40"
            : "bg-white/40 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_rgba(127,84,67,0.08)]"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart
                className="w-6 h-6 text-[#7f5443] fill-[#e0a995] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 rounded-full bg-[#e0a995]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span
              className="text-[#7f5443] font-bold tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "17px" }}
            >
              HeartCrafted
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#51443f] hover:text-[#7f5443] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.12em]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              aria-label="Wishlist"
              className="text-[#7f5443] hover:scale-110 transition-transform p-1"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="#builder"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(243,186,165,0.5)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Create My Story
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 text-[#7f5443]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_20px_60px_rgba(127,84,67,0.15)] p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block text-[#51443f] hover:text-[#7f5443] text-[13px] font-bold uppercase tracking-[0.15em] py-2 border-b border-[#e9e1de]/60 last:border-0 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="#builder"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-[12px] font-bold uppercase tracking-[0.1em]"
                style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
              >
                <Sparkles className="w-4 h-4" />
                Create My Story
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
