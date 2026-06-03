"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonials } from "@/data/collections";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stories"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff8f6 0%, #fbf2ef 50%, #fff8f6 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }}
        />
        <div
          className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #d3c5ad, transparent)", filter: "blur(60px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-4">
            Heart Stories
          </span>
          <h2
            className="text-[#1e1b19] mb-4"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
            }}
          >
            Stories That Made Us Cry (Happily)
          </h2>
          <p className="text-[#51443f] max-w-xl mx-auto" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            Every gift has a story. Here are the ones that moved us the most.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} featured={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  featured,
}: {
  testimonial: (typeof testimonials)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(127,84,67,0.1)] ${
        featured
          ? "bg-gradient-to-br from-[#7f5443] to-[#5c3a2a] text-white"
          : "bg-white/60 backdrop-blur-sm border border-[#e9e1de]/60"
      }`}
    >
      {/* Quote icon */}
      <Quote
        className={`w-10 h-10 mb-5 opacity-30 ${featured ? "text-[#f3baa5]" : "text-[#7f5443]"}`}
        strokeWidth={1}
      />

      {/* Story */}
      <p
        className={`leading-relaxed mb-8 ${featured ? "text-[#f8efec]" : "text-[#51443f]"}`}
        style={{ fontSize: "16px", lineHeight: 1.7 }}
      >
        &ldquo;{testimonial.story}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
          {testimonial.photoUrl ? (
            <Image
              src={testimonial.photoUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full bg-[#e0a995]/30 flex items-center justify-center text-lg">
              {testimonial.name[0]}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p
            className={`font-semibold ${featured ? "text-[#f3baa5]" : "text-[#1e1b19]"}`}
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "16px" }}
          >
            {testimonial.name}
          </p>
          <p className={`text-xs ${featured ? "text-[#d5c3bc]" : "text-[#83746f]"}`}>
            {testimonial.location}
          </p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 fill-current ${featured ? "text-[#f3baa5]" : "text-[#e0a995]"}`} />
          ))}
        </div>
      </div>

      {/* Gift type tag */}
      {testimonial.giftType && (
        <div className={`mt-5 pt-5 border-t ${featured ? "border-white/10" : "border-[#e9e1de]/60"}`}>
          <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${featured ? "text-[#f3baa5]/70" : "text-[#7f5443]"}`}>
            Gift: {testimonial.giftType}
          </span>
        </div>
      )}
    </div>
  );
}
