"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { howItWorksSteps } from "@/data/collections";
import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff8f6 0%, #fbf2ef 100%)" }}
    >
      {/* Decorative line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0a995]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0a995]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-4">
            The Process
          </span>
          <h2
            className="text-[#1e1b19] mb-4"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
            }}
          >
            How We Craft Your Story
          </h2>
          <p className="text-[#51443f] max-w-lg mx-auto" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            A thoughtful journey from your memories to a handcrafted masterpiece delivered with love.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e0a995]/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-3xl relative z-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(243,186,165,0.3), rgba(224,169,149,0.2))",
                      border: "1px solid rgba(224,169,149,0.4)",
                      boxShadow: "0 8px 32px rgba(127,84,67,0.1)",
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center z-20"
                    style={{ background: "#7f5443" }}
                  >
                    <span className="text-white text-[10px] font-bold">{step.step}</span>
                  </div>
                </div>

                {/* Arrow connector */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <ArrowRight className="w-4 h-4 text-[#e0a995] rotate-90 lg:rotate-0" />
                  </div>
                )}

                <h3
                  className="text-[#1e1b19] mb-2"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px", fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p className="text-[#51443f] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-20"
        >
          <a
            href="#builder"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,186,165,0.5)] hover:-translate-y-1"
            style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
          >
            Begin Your Story
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
