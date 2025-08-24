import { Github, Linkedin, Mail, Heart, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold gradient-text mb-2">Vasanth</div>
              <p className="text-muted-foreground mb-2">
                Building digital experiences with passion
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9442434269</span>
              </div>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/CodeCraftsman-Jr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-colors group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/vasanthan-e-cse-5556a2327"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-accent/20 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="mailto:dev.vasathan.tech@gmail.com"
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
              by Vasanth
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};