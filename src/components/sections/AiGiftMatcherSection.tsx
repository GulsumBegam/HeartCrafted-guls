"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { giftCollections } from "@/data/collections";

const questions = [
  {
    id: "who",
    question: "Who is this gift for?",
    options: ["Partner / Spouse", "Parent / Grandparent", "Best Friend", "Sibling", "Colleague", "Child"],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: ["Anniversary", "Birthday", "Graduation", "Farewell", "Wedding", "Just Because"],
  },
  {
    id: "memory",
    question: "What matters most to them?",
    options: ["Shared photos & memories", "Handwritten messages", "Voice & audio", "Art & illustration", "Experiences & milestones"],
  },
  {
    id: "style",
    question: "What is their style?",
    options: ["Classic & timeless", "Romantic & sentimental", "Modern & minimal", "Vintage & nostalgic"],
  },
];

export function AiGiftMatcherSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<(typeof giftCollections)[number] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: answer };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      // Generate recommendation
      setLoading(true);
      setTimeout(() => {
        // Simple matching logic
        const style = newAnswers.style || "";
        const memory = newAnswers.memory || "";
        const who = newAnswers.who || "";
        void style; // used for future matching logic

        let picked = giftCollections[0];
        if (memory.includes("Voice")) {
          picked = giftCollections.find(g => g.name.includes("Voice")) || picked;
        } else if (memory.includes("Art")) {
          picked = giftCollections.find(g => g.name.includes("Cartoon")) || picked;
        } else if (who.includes("Partner") || who.includes("Spouse")) {
          picked = giftCollections.find(g => g.name.includes("Love Story") || g.name.includes("Anniversary")) || picked;
        } else if (who.includes("Best Friend")) {
          picked = giftCollections.find(g => g.name.includes("Friendship")) || picked;
        } else {
          picked = giftCollections[Math.floor(Math.random() * giftCollections.length)];
        }

        setResult(picked);
        setLoading(false);
      }, 1500);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setLoading(false);
  };

  return (
    <section
      id="ai-matcher"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff8f6, #fbf2ef)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-1/4 top-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ccb8d4, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-20 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-[#e0a995]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#7f5443]" />
            <span className="text-[10px] font-bold text-[#7f5443] uppercase tracking-[0.15em]">AI Gift Matcher</span>
          </div>
          <h2
            className="text-[#1e1b19] mb-4"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 500,
            }}
          >
            Find the Perfect Gift
          </h2>
          <p className="text-[#51443f]" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            Answer four simple questions and we will match you with the perfect handcrafted experience.
          </p>
        </motion.div>

        {/* Matcher card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(127,84,67,0.12)]"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-12 h-12 text-[#e0a995]" />
                    </motion.div>
                    <p className="text-[#7f5443] font-medium" style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}>
                      Finding your perfect match...
                    </p>
                  </div>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-4">
                    Perfect Match
                  </p>
                  <div className="text-5xl mb-4">{result.icon}</div>
                  <h3
                    className="text-[#1e1b19] mb-3"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "26px", fontWeight: 500 }}
                  >
                    {result.name}
                  </h3>
                  <p className="text-[#51443f] text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                    {result.description}
                  </p>
                  <p className="text-[#7f5443] font-bold text-lg mb-8" style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}>
                    Starting at ₹{result.price.toLocaleString("en-IN")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#builder"
                      className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm uppercase tracking-[0.1em] transition-all hover:shadow-[0_8px_24px_rgba(243,186,165,0.5)]"
                      style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
                    >
                      Craft This Gift
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={reset}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#e0a995]/60 text-[#7f5443] font-bold text-sm uppercase tracking-[0.1em] hover:bg-[#f5ece9] transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div key={`question-${currentQ}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {/* Progress */}
                  <div className="flex gap-2 mb-8">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentQ ? "bg-[#7f5443]" : "bg-[#e9e1de]"}`}
                      />
                    ))}
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#83746f] mb-3">
                    Question {currentQ + 1} of {questions.length}
                  </p>
                  <h3
                    className="text-[#1e1b19] mb-8"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "24px", fontWeight: 500 }}
                  >
                    {questions[currentQ].question}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {questions[currentQ].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 rounded-2xl border border-[#e9e1de] text-[#51443f] text-sm font-medium text-center hover:border-[#7f5443] hover:bg-[#f5ece9] hover:text-[#7f5443] transition-all duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
