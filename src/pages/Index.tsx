import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { EducationSection } from "@/components/EducationSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PersonalSection } from "@/components/PersonalSection";
import { ContentCreatorSection } from "@/components/ContentCreatorSection";
import { RestaurantSection } from "@/components/RestaurantSection";
import { VarSysSection } from "@/components/VarSysSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <VarSysSection />
        <ContentCreatorSection />
        <RestaurantSection />
        <AchievementsSection />
        <ServicesSection />
        <PersonalSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
