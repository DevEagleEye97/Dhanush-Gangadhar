import { Hero } from "@/components/Hero";
import { Currently } from "@/components/Currently";
import { ProjectsSection } from "@/components/ProjectsSection";
import { LearningTimeline } from "@/components/LearningTimeline";
import { VenturesSection } from "@/components/VenturesSection";
import { NotesSection } from "@/components/NotesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Currently />
      <ProjectsSection limit={6} showViewAllLink={true} />
      <LearningTimeline limit={6} showViewAllLink={true} />
      <VenturesSection />
      <NotesSection limit={4} showViewAllLink={true} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
