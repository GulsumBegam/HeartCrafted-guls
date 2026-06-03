"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const floatingCards = [
    { emoji: "📸", label: "Memories", delay: 0, x: "-5%", y: "20%" },
    { emoji: "💌", label: "Letters", delay: 0.2, x: "80%", y: "15%" },
    { emoji: "📦", label: "Keepsakes", delay: 0.4, x: "-8%", y: "65%" },
    { emoji: "🎨", label: "Art", delay: 0.6, x: "82%", y: "60%" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#fff8f6" }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #d3c5ad, transparent)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ccb8d4, transparent)", filter: "blur(120px)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating memory cards */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            className="absolute"
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { delay: card.delay + 1, duration: 0.6 },
              scale: { delay: card.delay + 1, duration: 0.6 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay },
            }}
          >
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-[0_8px_32px_rgba(127,84,67,0.1)] flex items-center gap-2">
              <span className="text-2xl">{card.emoji}</span>
              <span className="text-[11px] font-bold text-[#7f5443] uppercase tracking-[0.1em]">{card.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 md:px-20 max-w-5xl mx-auto pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm"
        >
          <Star className="w-3.5 h-3.5 text-[#e0a995] fill-[#e0a995]" />
          <span className="text-[11px] font-bold text-[#7f5443] uppercase tracking-[0.15em]">
            Premium Emotional Gifting Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#1e1b19] leading-[1.05] tracking-tight mb-6"
          style={{
            fontFamily: "'Bodoni Moda', Georgia, serif",
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 600,
          }}
        >
          Crafting{" "}
          <em
            className="not-italic"
            style={{ color: "#7f5443" }}
          >
            Emotions
          </em>
          <br />
          Into Forever.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-[#51443f] leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
        >
          We transform memories, love stories, friendships, milestones, and life&apos;s most meaningful moments into handcrafted treasures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#builder"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,186,165,0.6)] hover:-translate-y-1"
            style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995, #d4956a)" }}
          >
            <Sparkles className="w-4 h-4" />
            Create My Story
            <motion.div
              className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>

          <Link
            href="#collections"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.1em] text-[#7f5443] border border-[#e0a995]/60 bg-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 hover:border-[#7f5443]/40 hover:-translate-y-1"
          >
            Explore Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12"
        >
          {[
            { value: "2,500+", label: "Stories Crafted" },
            { value: "98%", label: "Tears of Joy" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-bold text-[#7f5443]"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(22px, 3vw, 28px)" }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#83746f] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-[#d5c3bc] flex items-start justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#7f5443]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
