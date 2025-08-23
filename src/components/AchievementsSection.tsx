import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Code, Briefcase, Users } from "lucide-react";

export const AchievementsSection = () => {
  const achievements = [
    {
      category: "Academic Excellence",
      icon: Trophy,
      items: [
        {
          title: "CGPA 7.5 Maintenance",
          description: "Consistently maintaining strong academic performance throughout engineering studies",
          year: "2022-Present"
        },
        {
          title: "CBSE Board Performance",
          description: "Achieved 77% in Class 10th demonstrating strong foundational knowledge",
          year: "2020"
        }
      ]
    },
    {
      category: "Professional Work",
      icon: Briefcase,
      items: [
        {
          title: "Full Stack Developer Role",
          description: "Successfully working as Full Stack Developer at INNOV WORKS since June 2023",
          year: "2023-Present"
        },
        {
          title: "Upcoming Internship",
          description: "Secured Web Developer Intern position at ONEYES INFO TECH for March 2025",
          year: "2025"
        }
      ]
    },
    {
      category: "Project Development",
      icon: Code,
      items: [
        {
          title: "Complex System Development",
          description: "Built advanced systems including facial recognition attendance and finance management",
          year: "2024-2025"
        },
        {
          title: "API Integration Expertise",
          description: "Successfully integrated Google Tasks API, Zerodha API, and RazorPay payment systems",
          year: "2024"
        }
      ]
    },
    {
      category: "Freelance Success",
      icon: Users,
      items: [
        {
          title: "Client Satisfaction",
          description: "Delivered successful projects for healthcare and business clients",
          year: "2023-2025"
        },
        {
          title: "Diverse Technology Stack",
          description: "Demonstrated versatility across Python, Web Development, and platform-specific solutions",
          year: "2023-Present"
        }
      ]
    },
    {
      category: "Technical Skills",
      icon: Target,
      items: [
        {
          title: "Full Stack Proficiency",
          description: "Mastered both frontend and backend development with modern technologies",
          year: "2023-Present"
        },
        {
          title: "Python Ecosystem Expert",
          description: "Advanced skills in Python, OpenCV, GUI development, and data analysis",
          year: "2023-Present"
        }
      ]
    },
    {
      category: "Innovation & Problem Solving",
      icon: Star,
      items: [
        {
          title: "Automated Solutions",
          description: "Created automated payroll and attendance systems improving business efficiency",
          year: "2025"
        },
        {
          title: "Real-time Applications",
          description: "Developed real-time tracking systems and interactive web applications",
          year: "2024-2025"
        }
      ]
    }
  ];

  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Achievements & Milestones
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key accomplishments and recognition in academics, professional work, and project development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((category, index) => (
              <Card 
                key={category.category}
                className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-accent/10 glow-accent">
                      <category.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={item.title}
                        className="border-l-2 border-primary/20 pl-4 pb-4 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {item.year}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};