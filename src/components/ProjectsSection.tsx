import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Personal Finance & Production Management App",
      description: "Python-based dashboard with income/expense tracking, visual analytics, goal-based budgeting, attendance tracking and financial insights. Integrated Google Tasks API and Zerodha API for task management and real-time stock tracking with forecasting.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "Google Tasks API", "Zerodha API", "Data Analytics"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Sales & Inventory Management System",
      description: "Python-based system with daily/monthly tracking, low-stock alerts, and profit/loss analysis per item. Implemented growth prediction and business performance insights using historical sales data and Firebase integration.",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "Firebase", "Data Forecasting", "Real-time Database"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Facial Recognition Attendance System",
      description: "Python application using OpenCV for facial recognition-based attendance tracking with automated payroll generation. Calculates working hours, bonuses, and deductions with complete salary processing system.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "OpenCV", "Facial Recognition", "Payroll Automation"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Restaurant Website Template",
      description: "Complete restaurant website with blogging page for customers and owners, showcase gallery for menu, online ordering system with real-time order tracking, and pre-booking features. Secure authentication using Firebase.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      tags: ["Web Development", "Firebase", "Real-time Tracking", "Authentication"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Attention Span Assessment Platform",
      description: "Website with 4 tasks to measure attention span based on reaction time, featuring authentication using Firebase, payment integration with RazorPay, and customizable subscription module for organizations.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
      tags: ["Web Development", "Firebase", "RazorPay", "Psychology Assessment"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Doctor's Website with E-commerce",
      description: "Comprehensive website for a doctor with online booking and consultation features, integrated with an e-commerce platform for selling ayurvedic medicines. Built using Wix platform.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800",
      tags: ["Wix Development", "E-commerce", "Online Booking", "Healthcare"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest work and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
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