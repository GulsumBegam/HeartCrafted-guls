"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, CheckCircle, Truck, Star, Clock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const STATUS_STEPS = [
  { key: "PENDING", label: "Order Received", icon: Clock, desc: "We have your order and will confirm shortly." },
  { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle, desc: "Your order is confirmed and assigned to an artisan." },
  { key: "CRAFTING", label: "Being Crafted", icon: Star, desc: "Our artisans are handcrafting your gift with love." },
  { key: "SHIPPED", label: "Shipped", icon: Truck, desc: "Your gift is on its way to you." },
  { key: "DELIVERED", label: "Delivered", icon: Package, desc: "Your heartcrafted gift has been delivered." },
];

interface OrderData {
  id: string;
  giftType: string;
  recipientName: string;
  occasion: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?id=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Not found");
      setOrder(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Order not found. Please check your order ID.");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order
    ? STATUS_STEPS.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 md:px-20" style={{ background: "#fff8f6" }}>
        {/* Aurora */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }} />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7f5443] text-sm font-bold uppercase tracking-[0.1em] mb-10 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-3">Order Tracking</span>
            <h1
              className="text-[#1e1b19] mb-3"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 500 }}
            >
              Track Your Gift
            </h1>
            <p className="text-[#51443f] mb-10" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Enter your order ID to see the status of your handcrafted gift.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-10">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Paste your Order ID here..."
                className="flex-1 px-5 py-3.5 rounded-2xl border border-[#e0a995]/50 bg-white/60 text-[#1e1b19] text-sm placeholder-[#83746f] focus:outline-none focus:border-[#7f5443] focus:ring-1 focus:ring-[#7f5443]/20 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:shadow-[0_8px_24px_rgba(243,186,165,0.4)] disabled:opacity-60 flex items-center gap-2"
                style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {loading ? "" : "Track"}
              </button>
            </form>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </motion.div>
            )}

            {order && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Order summary */}
                <div className="rounded-3xl p-6 border border-[#e9e1de]/60"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
                  <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#83746f]">Order ID</p>
                      <p className="text-[#1e1b19] font-mono text-sm mt-0.5">{order.id.slice(-12).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#83746f]">Placed On</p>
                      <p className="text-[#1e1b19] text-sm mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e9e1de]/60">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#83746f]">Gift</p>
                      <p className="text-[#1e1b19] text-sm font-medium mt-0.5 capitalize">{order.giftType.replace(/-/g, " ")}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#83746f]">For</p>
                      <p className="text-[#1e1b19] text-sm font-medium mt-0.5">{order.recipientName}</p>
                    </div>
                  </div>
                </div>

                {/* Progress tracker */}
                <div className="rounded-3xl p-6 border border-[#e9e1de]/60"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
                  <h3
                    className="text-[#1e1b19] mb-6"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px", fontWeight: 500 }}
                  >
                    Crafting Progress
                  </h3>
                  <div className="space-y-0">
                    {STATUS_STEPS.map((step, i) => {
                      const Icon = step.icon;
                      const isComplete = i < currentStepIndex;
                      const isCurrent = i === currentStepIndex;
                      const isPending = i > currentStepIndex;
                      return (
                        <div key={step.key} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                              isComplete ? "bg-[#7f5443]" :
                              isCurrent ? "bg-[#e0a995] border-2 border-[#7f5443]" :
                              "bg-[#f5ece9] border border-[#e9e1de]"
                            }`}>
                              <Icon className={`w-4 h-4 ${isComplete || isCurrent ? "text-white" : "text-[#d5c3bc]"}`} />
                            </div>
                            {i < STATUS_STEPS.length - 1 && (
                              <div className={`w-0.5 h-10 my-1 rounded ${i < currentStepIndex ? "bg-[#7f5443]" : "bg-[#e9e1de]"}`} />
                            )}
                          </div>
                          <div className={`pb-6 ${i === STATUS_STEPS.length - 1 ? "pb-0" : ""}`}>
                            <p className={`font-bold text-sm ${isPending ? "text-[#d5c3bc]" : "text-[#1e1b19]"}`}>{step.label}</p>
                            {isCurrent && (
                              <p className="text-[#51443f] text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
