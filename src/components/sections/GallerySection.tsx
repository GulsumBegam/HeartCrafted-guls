"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { galleryItems } from "@/data/collections";
import { X } from "lucide-react";
import Image from "next/image";

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#1e1b19" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(100px)" }}
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
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3baa5] mb-4">
            Memory Gallery
          </span>
          <h2
            className="text-[#f8efec] mb-4"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
            }}
          >
            Crafted With Love
          </h2>
          <p className="text-[#d5c3bc] max-w-xl mx-auto" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            A glimpse into the keepsakes we&apos;ve created — each one a unique story made tangible.
          </p>
        </motion.div>

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightbox(item)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={i % 3 === 0 ? 400 : 300}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ height: i % 3 === 0 ? "280px" : "200px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b19]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <p
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[#f3baa5] text-[10px] font-bold uppercase tracking-[0.1em] mt-0.5">
                    {item.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1e1b19]/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={lightbox.imageUrl}
                  alt={lightbox.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
              <div className="p-6 bg-[#342f2e]">
                <h3
                  className="text-[#f8efec] mb-1"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "20px" }}
                >
                  {lightbox.title}
                </h3>
                <p className="text-[#f3baa5] text-[11px] font-bold uppercase tracking-[0.12em]">{lightbox.category}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
