import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold gradient-text mb-2">Portfolio</div>
              <p className="text-muted-foreground">
                Building digital experiences with passion
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-colors group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full glass hover:bg-accent/20 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full glass hover:bg-accent/20 transition-colors group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/20 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Made with{" "}
              <Heart className="h-4 w-4 text-red-500 animate-pulse-glow" />
              by Your Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};