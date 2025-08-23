import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  Music, 
  Gamepad2, 
  Camera, 
  Book, 
  Code2,
  MapPin,
  Heart,
  Lightbulb,
  Users
} from "lucide-react";

export const PersonalSection = () => {
  const interests = [
    {
      icon: Code2,
      title: "Open Source",
      description: "Contributing to open source projects and exploring new technologies",
      color: "text-primary"
    },
    {
      icon: Book,
      title: "Continuous Learning",
      description: "Always exploring new programming languages and frameworks",
      color: "text-accent"
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Love tackling complex challenges and finding innovative solutions",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Mentoring",
      description: "Helping aspiring developers and sharing knowledge with the community",
      color: "text-accent"
    },
    {
      icon: Coffee,
      title: "Coffee Enthusiast",
      description: "Fueling coding sessions with the perfect cup of coffee",
      color: "text-primary"
    },
    {
      icon: Music,
      title: "Music Lover",
      description: "Listening to various genres while coding and relaxing",
      color: "text-accent"
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      description: "Enjoying strategic and puzzle games during downtime",
      color: "text-primary"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and exploring creative perspectives",
      color: "text-accent"
    }
  ];

  const funFacts = [
    {
      icon: MapPin,
      title: "Based in Pondicherry",
      description: "Living in the beautiful coastal town with French colonial heritage"
    },
    {
      icon: Code2,
      title: "Lines of Code",
      description: "Written over 50,000+ lines of code across various projects"
    },
    {
      icon: Coffee,
      title: "Coffee Cups",
      description: "Consumed approximately 1,000+ cups while coding"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Debugged countless issues and love the satisfaction of 'Eureka!' moments"
    },
    {
      icon: Heart,
      title: "Passion Project",
      description: "Currently working on an AI-powered productivity assistant"
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Enjoy collaborative projects and believe in the power of teamwork"
    }
  ];

  const currentlyLearning = [
    "Machine Learning", "React Native", "DevOps", "Cloud Computing", 
    "Blockchain", "TypeScript Advanced Patterns"
  ];

  return (
    <section id="personal" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Beyond the Code
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know me personally - my interests, fun facts, and what drives my passion for technology
            </p>
          </div>

          {/* Interests & Hobbies */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Interests & Hobbies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <Card 
                  key={interest.title}
                  className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up group text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="p-3 rounded-lg bg-accent/10 glow-accent mb-4 group-hover:scale-110 transition-transform">
                        <interest.icon className={`h-6 w-6 ${interest.color}`} />
                      </div>
                      <h4 className="font-semibold mb-2">{interest.title}</h4>
                      <p className="text-muted-foreground text-sm text-center">
                        {interest.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Fun Facts About Me</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {funFacts.map((fact, index) => (
                <Card 
                  key={fact.title}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 glow-primary">
                        <fact.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{fact.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {fact.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          <div className="text-center">
            <Card className="glass border-border/20 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Currently Learning & Exploring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Always staying updated with the latest technologies and expanding my skill set. 
                  Here's what I'm currently diving into:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {currentlyLearning.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-muted-foreground italic">
                    "The best way to predict the future is to create it. Every new technology I learn 
                    is a step towards building solutions that can make a real difference."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};