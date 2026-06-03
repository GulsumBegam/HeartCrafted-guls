"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#fff8f6" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Aurora blobs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(60px)" }}
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #d3c5ad, transparent)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.3, 1], x: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <div className="flex flex-col items-center gap-6 relative z-10">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(243,186,165,0.4), transparent)", filter: "blur(20px)" }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Heart
                className="w-16 h-16 relative z-10"
                style={{ color: "#7f5443", fill: "#e0a995" }}
                strokeWidth={1.5}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <h1
                className="text-[#7f5443] font-semibold tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(28px, 5vw, 40px)" }}
              >
                HeartCrafted
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[#51443f] text-sm mt-1 tracking-[0.2em] uppercase font-medium"
              >
                Crafting Emotions Into Forever
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-32 h-0.5 bg-[#e9e1de] rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #f3baa5, #e0a995)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
