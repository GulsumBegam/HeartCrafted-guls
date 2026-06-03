"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { giftCollections } from "@/data/collections";
import Image from "next/image";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CollectionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="collections"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#fff8f6" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(100px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#f5ece9] border border-[#e0a995]/30">
            <Star className="w-3 h-3 text-[#7f5443] fill-[#7f5443]" />
            <span className="text-[10px] font-bold text-[#7f5443] uppercase tracking-[0.15em]">
              Our Experiences
            </span>
          </div>

          <h2
            className="text-[#1e1b19] mb-4"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Heartcrafted Experiences
          </h2>
          <p className="text-[#51443f] max-w-xl mx-auto" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            Each experience is a handcrafted masterpiece — designed to transform your stories into keepsakes that last a lifetime.
          </p>
        </motion.div>

        {/* Collection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftCollections.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <CollectionCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#e0a995]/60 text-[#7f5443] text-[12px] font-bold uppercase tracking-[0.12em] bg-white/40 hover:bg-[#f5ece9] transition-all duration-300">
            View All Experiences
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CollectionCard({ item }: { item: (typeof giftCollections)[number] }) {
  return (
    <div className="group relative h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(127,84,67,0.15)]">
      {/* Card image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b19]/40 via-transparent to-transparent" />

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-[#7f5443] uppercase tracking-[0.1em]">★ Featured</span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm">
          <span className="text-[11px] font-bold text-[#1e1b19]">{priceFormatter.format(item.price)}</span>
        </div>
      </div>

      {/* Card footer - frosted glass */}
      <div className="bg-white/80 backdrop-blur-sm border border-white/40 p-5">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="text-base">{item.icon}</span>
          <span className="text-[10px] font-bold text-[#83746f] uppercase tracking-[0.12em]">{item.category}</span>
        </div>
        <h3
          className="text-[#1e1b19] mb-2"
          style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px", fontWeight: 500 }}
        >
          {item.name}
        </h3>
        <p className="text-[#51443f] text-sm leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        {/* Occasions */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.occasion.slice(0, 2).map((occ) => (
            <span
              key={occ}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-[#7f5443] border border-[#e0a995]/50"
            >
              {occ}
            </span>
          ))}
        </div>

        <button className="w-full py-2.5 rounded-xl text-white text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(243,186,165,0.4)] hover:-translate-y-0.5"
          style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}>
          Craft This Gift
        </button>
      </div>
    </div>
  );
}
