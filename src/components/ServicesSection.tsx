import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Smartphone, 
  Database, 
  Globe, 
  Cog, 
  Palette,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Full Stack Web Development",
      description: "Complete web applications with modern technologies and responsive design",
      features: [
        "React/Next.js Frontend Development",
        "Node.js Backend Development", 
        "Real-time Features with Firebase",
        "RESTful API Development",
        "Database Design & Integration"
      ],
      technologies: ["React", "Node.js", "Firebase", "Python", "JavaScript"],
      pricing: "Starting from ₹15,000"
    },
    {
      icon: Code,
      title: "Python Application Development",
      description: "Custom Python applications for automation, data analysis, and desktop solutions",
      features: [
        "GUI Applications with Tkinter",
        "Data Analysis & Visualization",
        "Automation Scripts",
        "API Integration",
        "OpenCV Computer Vision Apps"
      ],
      technologies: ["Python", "OpenCV", "Tkinter", "Pandas", "APIs"],
      pricing: "Starting from ₹10,000"
    },
    {
      icon: Cog,
      title: "Business Automation Solutions",
      description: "Streamline your business processes with custom automation tools",
      features: [
        "Attendance Management Systems",
        "Payroll Automation",
        "Inventory Management",
        "Sales Tracking Systems",
        "Financial Analytics"
      ],
      technologies: ["Python", "Firebase", "Excel Integration", "Database"],
      pricing: "Starting from ₹20,000"
    },
    {
      icon: Smartphone,
      title: "E-commerce & Online Platforms",
      description: "Complete online stores and booking platforms with payment integration",
      features: [
        "Online Ordering Systems",
        "Payment Gateway Integration",
        "Real-time Order Tracking",
        "Customer Management",
        "Admin Dashboards"
      ],
      technologies: ["Web Development", "RazorPay", "Firebase", "Authentication"],
      pricing: "Starting from ₹25,000"
    },
    {
      icon: Database,
      title: "Database Design & Management",
      description: "Efficient database solutions for your applications and business needs",
      features: [
        "Database Architecture Design",
        "Firebase Real-time Database",
        "Data Migration Services",
        "Performance Optimization",
        "Backup & Security Setup"
      ],
      technologies: ["Firebase", "SQL", "NoSQL", "Cloud Databases"],
      pricing: "Starting from ₹8,000"
    },
    {
      icon: Palette,
      title: "Website Design & Development",
      description: "Professional websites for businesses, doctors, and service providers",
      features: [
        "Custom Website Design",
        "Responsive Mobile-first Design",
        "SEO Optimization",
        "Content Management",
        "Maintenance & Support"
      ],
      technologies: ["HTML/CSS", "JavaScript", "Wix", "WordPress"],
      pricing: "Starting from ₹12,000"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Services I Offer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional development services to bring your ideas to life with modern technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up group h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 glow-primary group-hover:scale-110 transition-transform">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs text-accent">
                        {service.pricing}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-primary hover:bg-primary/90 glow-primary group/btn"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="glass p-6 rounded-2xl border border-accent/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">Custom Solutions Available</h3>
              <p className="text-muted-foreground mb-4">
                Have a unique project in mind? I offer custom development solutions tailored to your specific needs. 
                Let's discuss your requirements and create something amazing together.
              </p>
              <Button 
                onClick={scrollToContact}
                variant="outline" 
                className="border-accent hover:bg-accent/10"
              >
                Discuss Custom Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};