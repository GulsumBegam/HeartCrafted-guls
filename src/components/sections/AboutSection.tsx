"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#fff8f6" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #f5ece9 0%, #fbf2ef 30%, #eddec5 70%, #f5ece9 100%)",
                }}
              />
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto w-32 h-32 rounded-2xl bg-white/60 backdrop-blur flex items-center justify-center shadow-[0_8px_32px_rgba(127,84,67,0.15)]"
                    style={{ border: "1px solid rgba(255,255,255,0.6)" }}
                  >
                    <Heart className="w-16 h-16 text-[#7f5443] fill-[#e0a995]" strokeWidth={1.5} />
                  </motion.div>
                  <div
                    className="text-[#7f5443] font-medium text-center px-4"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px" }}
                  >
                    &ldquo;Every gift tells a story. We make sure it&apos;s unforgettable.&rdquo;
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="rounded-2xl p-5 grid grid-cols-3 gap-4"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                  }}
                >
                  {[
                    { value: "2,500+", label: "Stories Crafted" },
                    { value: "48h", label: "Avg. Response" },
                    { value: "100%", label: "Handmade" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-[#7f5443] font-bold"
                        style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "20px" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-[#83746f] text-[10px] font-bold uppercase tracking-[0.1em] mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-5">
              Our Story
            </span>
            <h2
              className="text-[#1e1b19] mb-6"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 46px)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Born From a Gift<br />
              <em className="not-italic text-[#7f5443]">That Changed Everything</em>
            </h2>

            <div className="space-y-4 text-[#51443f]" style={{ fontSize: "16px", lineHeight: 1.8 }}>
              <p>
                HeartCrafted began with a simple realization: the most meaningful gifts aren&apos;t bought &mdash; they&apos;re crafted. When our founder gave her mother a handmade scrapbook of their family&apos;s 25 years together, something extraordinary happened. Time stopped. Memories flooded back. Tears fell.
              </p>
              <p>
                That moment became a mission. We exist to help people transform their most precious relationships and memories into physical, tangible keepsakes that outlast lifetimes.
              </p>
              <p>
                Every HeartCrafted experience is made by human hands, infused with your stories, and delivered with the kind of care that makes gift-giving feel like an act of love.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#e9e1de]/60">
              <p
                className="text-[#7f5443] italic"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px" }}
              >
                &ldquo;We don&apos;t sell gifts. We craft emotions into forever.&rdquo;
              </p>
              <p className="text-[#83746f] text-sm mt-2 font-bold uppercase tracking-[0.1em]">
                — The HeartCrafted Team
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
