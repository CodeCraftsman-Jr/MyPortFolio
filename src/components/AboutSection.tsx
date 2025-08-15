import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Rocket } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const AboutSection = () => {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code with best practices"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Creating stunning user interfaces with attention to detail"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and user experience"
    }
  ];

  const technologies = [
    "React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", 
    "Python", "PostgreSQL", "AWS", "Docker", "Figma"
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fade-in-left">
              {/* Additional profile photo for about section */}
              <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img
                    src={profilePhoto}
                    alt="About me"
                    className="w-full h-full rounded-2xl object-cover border-2 border-accent/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">
                    Building the future, one pixel at a time
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm a full-stack developer with a passion for creating beautiful, 
                    functional digital experiences. With over 5 years of experience, 
                    I specialize in modern web technologies and have a keen eye for design.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source projects, or mentoring aspiring developers.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-right">
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <Card 
                    key={feature.title} 
                    className="glass border-border/20 hover:border-primary/30 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 glow-primary">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};