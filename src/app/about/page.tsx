import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bond",
  description: "Computer Science Engineering Student, aspiring cybersecurity professional, and software builder.",
};

export default function AboutPage() {
  return (
    <div className="pt-6 sm:pt-10">
      <AboutSection />
      <ContactSection />
    </div>
  );
}
