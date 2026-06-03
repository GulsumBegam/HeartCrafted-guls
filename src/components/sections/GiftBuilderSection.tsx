"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Mic, CheckCircle, ArrowRight, Loader2, Heart } from "lucide-react";
import { submitCustomOrder } from "@/actions";

const schema = z.object({
  giftType: z.string().min(1, "Please select a gift type"),
  recipientName: z.string().min(1, "Recipient name is required"),
  occasion: z.string().min(1, "Please select an occasion"),
  story: z.string().min(20, "Please share at least a brief story (20 characters min)"),
  theme: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const giftTypes = [
  { value: "forever-memory-box", label: "Forever Memory Box", emoji: "📦" },
  { value: "love-story-scrapbook", label: "Love Story Scrapbook", emoji: "💕" },
  { value: "friendship-kit", label: "Friendship Legacy Kit", emoji: "🤝" },
  { value: "voice-memory-frame", label: "Voice Memory Frame", emoji: "🎙️" },
  { value: "anniversary-collection", label: "Anniversary Collection", emoji: "💍" },
  { value: "cartoon-portrait", label: "Cartoon Portrait", emoji: "🎨" },
];

const occasions = [
  "Anniversary", "Birthday", "Graduation", "Wedding", "Valentine&apos;s Day",
  "Farewell", "Retirement", "New Year", "Mother&apos;s Day", "Father&apos;s Day", "Just Because",
];

const themes = [
  { value: "classic", label: "Classic Elegance", color: "#e0a995" },
  { value: "romantic", label: "Romantic Blush", color: "#f3baa5" },
  { value: "modern", label: "Modern Minimal", color: "#d3c5ad" },
  { value: "vintage", label: "Vintage Nostalgia", color: "#685d4a" },
];

export function GiftBuilderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedGiftType = watch("giftType");
  const selectedTheme = watch("theme");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    const result = await submitCustomOrder(data);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <section
      id="builder"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#fff8f6" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="sticky top-32"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-4">
              Bespoke Gift Builder
            </span>
            <h2
              className="text-[#1e1b19] mb-6"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Tell Us Your<br />
              <em className="not-italic text-[#7f5443]">Story</em>
            </h2>
            <p className="text-[#51443f] mb-8 leading-relaxed" style={{ fontSize: "17px" }}>
              Every handcrafted gift begins with your story. Share the moments, memories, and emotions — our artisans will weave them into something unforgettable.
            </p>

            {/* Preview card */}
            <div
              className="rounded-3xl overflow-hidden border border-[#e9e1de]/60"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #fbf2ef, #f5ece9)" }}>
                  {selectedGiftType ? (
                    <div className="text-center">
                      <div className="text-6xl mb-3">
                        {giftTypes.find(g => g.value === selectedGiftType)?.emoji || "🎁"}
                      </div>
                      <p
                        className="text-[#7f5443] font-medium"
                        style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "16px" }}
                      >
                        {giftTypes.find(g => g.value === selectedGiftType)?.label}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center opacity-60">
                      <Heart className="w-16 h-16 text-[#e0a995] mx-auto mb-3" strokeWidth={1} />
                      <p className="text-[#83746f] text-sm">Your masterpiece preview</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-[#e9e1de]/40">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#7f5443]">Status</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#83746f]">
                    {step === 1 ? "Selecting Gift" : step === 2 ? "Your Story" : "Your Details"}
                  </span>
                </div>
                {/* Step dots */}
                <div className="flex gap-2 mt-3">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 rounded-full transition-all duration-300 ${s <= step ? "bg-[#7f5443]" : "bg-[#e9e1de]"} ${s === step ? "flex-1" : "w-6"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-[#f5ece9] flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-[#7f5443]" />
                  </motion.div>
                  <h3
                    className="text-[#1e1b19] mb-3"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "28px", fontWeight: 500 }}
                  >
                    Your Story is With Us
                  </h3>
                  <p className="text-[#51443f] text-base leading-relaxed max-w-sm mx-auto">
                    Our artisans have received your request and will begin crafting your masterpiece. Check your inbox for confirmation.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Step 1: Gift Type & Occasion */}
                  <div>
                    <h3
                      className="text-[#1e1b19] mb-5"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "22px", fontWeight: 500 }}
                    >
                      1. Choose Your Experience
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {giftTypes.map((gift) => (
                        <button
                          key={gift.value}
                          type="button"
                          onClick={() => { setValue("giftType", gift.value); setStep(Math.max(step, 2)); }}
                          className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                            selectedGiftType === gift.value
                              ? "border-[#7f5443] bg-[#f5ece9] shadow-[0_4px_20px_rgba(127,84,67,0.15)]"
                              : "border-[#e9e1de] bg-white/40 hover:border-[#e0a995]"
                          }`}
                        >
                          <span className="block text-2xl mb-2">{gift.emoji}</span>
                          <span className="text-[#1e1b19] text-xs font-bold leading-tight" style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}>
                            {gift.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {errors.giftType && <p className="text-red-500 text-xs mt-2">{errors.giftType.message}</p>}
                  </div>

                  {/* Recipient + Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                        Recipient&apos;s Name
                      </label>
                      <input
                        {...register("recipientName")}
                        className="w-full border-0 border-b-2 border-[#e0a995]/50 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                        placeholder="E.g. Priya, Mom, Best Friend"
                      />
                      {errors.recipientName && <p className="text-red-500 text-xs mt-1">{errors.recipientName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                        Occasion
                      </label>
                      <select
                        {...register("occasion")}
                        className="w-full border-0 border-b-2 border-[#e0a995]/50 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                      >
                        <option value="">Select occasion...</option>
                        {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.occasion && <p className="text-red-500 text-xs mt-1">{errors.occasion.message}</p>}
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <h3
                      className="text-[#1e1b19] mb-4"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "22px", fontWeight: 500 }}
                    >
                      2. Share Your Story
                    </h3>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                      Your Memory or Message
                    </label>
                    <textarea
                      {...register("story")}
                      rows={5}
                      className="w-full rounded-2xl bg-[#fbf2ef] border border-[#e0a995]/30 p-4 text-[#1e1b19] text-sm leading-relaxed focus:outline-none focus:border-[#7f5443] focus:ring-1 focus:ring-[#7f5443]/20 transition-all resize-none"
                      placeholder="Tell us about the relationship, the memories, what makes this person special, any inside jokes or meaningful moments you'd like woven into the gift..."
                    />
                    {errors.story && <p className="text-red-500 text-xs mt-1">{errors.story.message}</p>}
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-3">
                      Select a Theme
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {themes.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setValue("theme", t.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                            selectedTheme === t.value
                              ? "border-[#7f5443] bg-[#f5ece9] text-[#7f5443]"
                              : "border-[#d5c3bc] text-[#51443f] hover:border-[#7f5443]"
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload options */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed border-[#e0a995]/50 text-[#51443f] hover:border-[#7f5443] hover:bg-[#fbf2ef] transition-all duration-300"
                    >
                      <Upload className="w-6 h-6 text-[#7f5443]" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Upload Photos</span>
                      <span className="text-[10px] text-[#83746f]">JPG, PNG, HEIC</span>
                    </button>
                    <button
                      type="button"
                      className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed border-[#e0a995]/50 text-[#51443f] hover:border-[#7f5443] hover:bg-[#fbf2ef] transition-all duration-300"
                    >
                      <Mic className="w-6 h-6 text-[#7f5443]" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Voice Note</span>
                      <span className="text-[10px] text-[#83746f]">MP3, M4A, WAV</span>
                    </button>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3
                      className="text-[#1e1b19] mb-4"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "22px", fontWeight: 500 }}
                    >
                      3. Your Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full border-0 border-b-2 border-[#e0a995]/50 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                          Phone (Optional)
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          className="w-full border-0 border-b-2 border-[#e0a995]/50 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(243,186,165,0.5)] hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995, #d4956a)" }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Crafting Your Order...</>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 fill-white" />
                        Submit My Gift Story
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
