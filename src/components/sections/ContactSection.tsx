"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/actions";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    const result = await submitContactForm(data);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fbf2ef 0%, #fff8f6 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #f3baa5, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f5443] mb-5">
              Get In Touch
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
              Let&apos;s Craft<br />
              <em className="not-italic text-[#7f5443]">Something Special</em>
            </h2>
            <p className="text-[#51443f] mb-10" style={{ fontSize: "17px", lineHeight: 1.7 }}>
              Have a vision for a gift? A story to share? A question about our process? We would love to hear from you.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "forever@heartcrafted.com" },
                { icon: Phone, label: "WhatsApp", value: "+91 98765 43210" },
                { icon: MapPin, label: "Studio", value: "Virudhunagar, Tamil Nadu, India" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#f5ece9] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#7f5443]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#83746f]">{label}</p>
                    <p className="text-[#1e1b19] font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl bg-white/60 backdrop-blur border border-[#e9e1de]/60 p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#f5ece9] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-[#7f5443]" />
                </div>
                <h3
                  className="text-[#1e1b19] mb-3"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "24px" }}
                >
                  Message Received
                </h3>
                <p className="text-[#51443f] text-sm leading-relaxed">
                  Thank you for reaching out. We&apos;ll respond within 24 hours with care and warmth.
                </p>
              </motion.div>
            ) : (
              <div
                className="rounded-3xl p-8 md:p-10"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 20px 60px rgba(127,84,67,0.08)",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                        Your Name *
                      </label>
                      <input
                        {...register("name")}
                        className="w-full border-0 border-b-2 border-[#e0a995]/40 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                        placeholder="Priya Sharma"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full border-0 border-b-2 border-[#e0a995]/40 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                        placeholder="priya@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                      Subject *
                    </label>
                    <input
                      {...register("subject")}
                      className="w-full border-0 border-b-2 border-[#e0a995]/40 bg-transparent pb-2 text-[#1e1b19] text-sm focus:outline-none focus:border-[#7f5443] transition-colors"
                      placeholder="I'd like to create a memory box..."
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#7f5443] mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full rounded-xl bg-[#fbf2ef] border border-[#e0a995]/30 p-4 text-[#1e1b19] text-sm leading-relaxed focus:outline-none focus:border-[#7f5443] transition-all resize-none"
                      placeholder="Tell us about your gift idea, the person it is for, or any questions you have..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-bold text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(243,186,165,0.4)] hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(45deg, #f3baa5, #e0a995)" }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      "Send Your Message"
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
