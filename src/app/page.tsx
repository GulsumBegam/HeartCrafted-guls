import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { GiftBuilderSection } from "@/components/sections/GiftBuilderSection";
import { AiGiftMatcherSection } from "@/components/sections/AiGiftMatcherSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeartCrafted — Crafting Emotions Into Forever",
};

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <CollectionsSection />
        <HowItWorksSection />
        <GiftBuilderSection />
        <AiGiftMatcherSection />
        <TestimonialsSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
