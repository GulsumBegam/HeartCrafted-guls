import Link from "next/link";
import { Heart } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1e1b19] text-[#f8efec] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#f3baa5] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#d3c5ad] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#e0a995] fill-[#e0a995]" strokeWidth={1.5} />
              <span className="text-[#f3baa5] font-bold text-lg" style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}>
                HeartCrafted
              </span>
            </div>
            <p className="text-[#d5c3bc] text-sm leading-relaxed max-w-sm mb-6">
              Crafting Emotions Into Forever. We transform memories, love stories, and life&apos;s most meaningful moments into handcrafted treasures.
            </p>
            <div className="flex gap-4">
              {[InstagramIcon, TwitterIcon, FacebookIcon].map((Icon, i) => (
                <button key={i} aria-label="Social link"
                  className="w-10 h-10 rounded-full border border-[#51443f] flex items-center justify-center text-[#d5c3bc] hover:text-[#f3baa5] hover:border-[#f3baa5] transition-all duration-300 hover:scale-110">
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f3baa5] mb-5">Experiences</h4>
            <ul className="space-y-3">
              {["Forever Memory Box", "Love Story Scrapbook", "Friendship Legacy Kit", "Voice Memory Frame", "Custom Portraits"].map((item) => (
                <li key={item}>
                  <Link href="#collections" className="text-sm text-[#d5c3bc] hover:text-[#f3baa5] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f3baa5] mb-5">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Our Process", "Gallery", "Stories", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#d5c3bc] hover:text-[#f3baa5] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#342f2e] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#83746f] text-xs">
            &copy; {new Date().getFullYear()} HeartCrafted. All rights reserved. Crafting Emotions Into Forever.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((item) => (
              <Link key={item} href="#" className="text-[#83746f] hover:text-[#f3baa5] text-xs transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
