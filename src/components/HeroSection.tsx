import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Large Profile Photo */}
            <div className="animate-fade-in-left flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Main Profile Photo */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
                  <img
                    src={profilePhoto}
                    alt="Professional Profile"
                    className="w-full h-full rounded-3xl object-cover border-4 border-primary/30 glow-primary shadow-2xl"
                  />
                  
                  {/* Animated Gradient Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-glow" />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-float opacity-80" />
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/4 -right-8 w-6 h-6 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
                  
                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-accent/20 transform scale-110 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Status Badge */}
                <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full border border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-accent/20">
                  <span className="text-sm text-accent font-medium">👋 Hello, I'm</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Creative{" "}
                  <span className="gradient-text">Developer</span>
                  <br />
                  & Designer
                </h1>
              </div>
              
              <div className="animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none">
                  I craft beautiful digital experiences with modern technologies and stunning design. 
                  Passionate about creating solutions that make a difference.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">50+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-right flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12" style={{ animationDelay: '0.6s' }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 glow-primary group px-8"
                >
                  View My Work
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="border-accent hover:bg-accent/10 hover:border-accent px-8"
                >
                  Let's Talk
                </Button>
              </div>

              <div className="animate-fade-in-right flex justify-center lg:justify-start gap-4" style={{ animationDelay: '0.8s' }}>
                <a
                  href="#"
                  className="p-4 rounded-2xl glass hover:bg-primary/20 transition-all duration-300 group hover:scale-110"
                >
                  <Github className="h-6 w-6 group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-2xl glass hover:bg-accent/20 transition-all duration-300 group hover:scale-110"
                >
                  <Linkedin className="h-6 w-6 group-hover:text-accent transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-2xl glass hover:bg-accent/20 transition-all duration-300 group hover:scale-110"
                >
                  <Mail className="h-6 w-6 group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};