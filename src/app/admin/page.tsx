"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Package, MessageSquare, Users, BarChart3, Lock, Eye, CheckCircle,
  Clock, Truck, Star, RefreshCw, LogOut
} from "lucide-react";

interface Order {
  id: string;
  giftType: string;
  recipientName: string;
  email: string;
  occasion: string;
  status: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CRAFTING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-green-100 text-green-700",
  DELIVERED: "bg-[#f5ece9] text-[#7f5443]",
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"orders" | "messages" | "subscribers">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setDbError("");
    try {
      const [oRes, mRes, sRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/messages"),
        fetch("/api/admin/subscribers"),
      ]);
      if (oRes.ok) setOrders(await oRes.json());
      else setDbError("Database not yet connected. Connect Neon PostgreSQL to see live data.");
      if (mRes.ok) setMessages(await mRes.json());
      if (sRes.ok) setSubscribers(await sRes.json());
    } catch {
      setDbError("Database not connected. Add DATABASE_URL to your environment variables.");
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_SECRET || "heartcrafted_admin_2024") ||
        password === "heartcrafted_admin_2024") {
      setAuthed(true);
      fetchData();
    } else {
      setAuthError("Incorrect password");
    }
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#fff8f6" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl p-8 relative z-10"
          style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)" }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#f5ece9] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-[#7f5443]" />
            </div>
            <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "22px", color: "#1e1b19" }}>
              Admin Dashboard
            </h1>
            <p className="text-[#83746f] text-sm mt-1">HeartCrafted Internal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border border-[#e9e1de] bg-white text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
            />
            {authError && <p className="text-red-500 text-xs">{authError}</p>}
            <button type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:shadow-lg"
              style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}>
              Access Dashboard
            </button>
          </form>
          <p className="text-center text-[#83746f] text-xs mt-4">Default: heartcrafted_admin_2024</p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "orders", label: "Orders", icon: Package, count: orders.length },
    { id: "messages", label: "Messages", icon: MessageSquare, count: messages.length },
    { id: "subscribers", label: "Subscribers", icon: Users, count: subscribers.length },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#fff8f6" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#e9e1de]/60"
        style={{ background: "rgba(255,248,246,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-[#7f5443]" />
            <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "18px", color: "#1e1b19" }}>
              HeartCrafted Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} disabled={loading}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7f5443] hover:opacity-70 transition-opacity">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button onClick={() => setAuthed(false)}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#83746f] hover:text-red-500 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, icon: Package, color: "#7f5443" },
            { label: "Messages", value: messages.length, icon: MessageSquare, color: "#685d4a" },
            { label: "Subscribers", value: subscribers.length, icon: Users, color: "#5e5e5e" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 border border-[#e9e1de]/60"
              style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#83746f]">{s.label}</p>
                  <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "28px", color: s.color, fontWeight: 600 }}>
                    {s.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#f5ece9] flex items-center justify-center">
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DB error banner */}
        {dbError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
            ⚠️ {dbError}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#e9e1de]/60 pb-0">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] border-b-2 -mb-px transition-all ${
                tab === t.id
                  ? "border-[#7f5443] text-[#7f5443]"
                  : "border-transparent text-[#83746f] hover:text-[#51443f]"
              }`}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
              <span className="px-1.5 py-0.5 rounded-full bg-[#f5ece9] text-[#7f5443]">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "orders" && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <EmptyState icon={Package} message="No orders yet. They'll appear here when customers submit gift requests." />
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-2xl p-5 border border-[#e9e1de]/60 flex flex-wrap gap-4 items-center justify-between"
                  style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1e1b19] capitalize">{order.giftType.replace(/-/g, " ")}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[#51443f] text-xs">For {order.recipientName} · {order.occasion}</p>
                    <p className="text-[#83746f] text-xs">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#83746f]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-[#83746f] text-xs font-mono mt-0.5">#{order.id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <EmptyState icon={MessageSquare} message="No messages yet. Contact form submissions will appear here." />
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`rounded-2xl p-5 border transition-all ${msg.read ? "border-[#e9e1de]/60 opacity-70" : "border-[#e0a995]/50 shadow-[0_4px_16px_rgba(127,84,67,0.06)]"}`}
                  style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-[#1e1b19]">{msg.name}</p>
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-[#7f5443]" />}
                      </div>
                      <p className="text-[#7f5443] text-xs font-medium">{msg.subject}</p>
                      <p className="text-[#51443f] text-xs">{msg.email}</p>
                    </div>
                    <p className="text-[10px] text-[#83746f]">
                      {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <p className="text-[#51443f] text-sm mt-3 leading-relaxed line-clamp-2">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "subscribers" && (
          <div className="space-y-2">
            {subscribers.length === 0 ? (
              <EmptyState icon={Users} message="No newsletter subscribers yet." />
            ) : (
              <div className="rounded-2xl overflow-hidden border border-[#e9e1de]/60">
                {subscribers.map((sub, i) => (
                  <div key={sub.id} className={`flex items-center justify-between px-5 py-4 ${i % 2 === 0 ? "bg-white/50" : "bg-[#fbf2ef]/50"}`}>
                    <div>
                      <p className="text-[#1e1b19] text-sm font-medium">{sub.name || "—"}</p>
                      <p className="text-[#51443f] text-xs">{sub.email}</p>
                    </div>
                    <p className="text-[#83746f] text-xs">
                      {new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#e0a995]/50 p-16 text-center">
      <Icon className="w-10 h-10 text-[#e0a995] mx-auto mb-3" strokeWidth={1} />
      <p className="text-[#83746f] text-sm max-w-sm mx-auto">{message}</p>
    </div>
  );
}
