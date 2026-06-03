"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { subscribeNewsletter } from "@/actions";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    const result = await subscribeNewsletter({ email });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #7f5443 0%, #5c3a2a 100%)" }}
    >
      {/* Aurora glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[200px] h-[200px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #eddec5, transparent)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-5">
            <Mail className="w-6 h-6 text-[#f3baa5]" strokeWidth={1.5} />
          </div>
          <h2
            className="text-[#f8efec] mb-3"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
            }}
          >
            Stories Worth Remembering
          </h2>
          <p className="text-[#d5c3bc] mb-8" style={{ fontSize: "16px", lineHeight: 1.6 }}>
            Join 2,500+ thoughtful gifters. Receive gift inspiration, early access to new experiences, and stories that move us.
          </p>

          {success ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <CheckCircle className="w-6 h-6 text-[#f3baa5]" />
              <p className="text-[#f3baa5] font-medium">Welcome to the HeartCrafted family! ✨</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-[#f8efec] placeholder-[#d5c3bc]/60 text-sm focus:outline-none focus:border-[#f3baa5]/60 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-full bg-white text-[#7f5443] font-bold text-sm uppercase tracking-[0.1em] hover:bg-[#f3baa5] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
              </button>
            </form>
          )}
          {error && <p className="text-red-300 text-xs mt-3">{error}</p>}
          <p className="text-[#83746f] text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
