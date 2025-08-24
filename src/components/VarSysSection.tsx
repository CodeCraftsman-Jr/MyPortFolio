import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Code, Smartphone, Globe, Monitor, Users, Target, Lightbulb } from "lucide-react";

export const VarSysSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Modern, responsive web applications using React, Node.js, and cloud technologies"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for Android and iOS platforms"
    },
    {
      icon: Monitor,
      title: "Desktop Software",
      description: "Custom desktop applications for Windows, macOS, and Linux systems"
    },
    {
      icon: Code,
      title: "Custom Software",
      description: "Tailored software solutions to meet specific business requirements"
    }
  ];

  const technologies = [
    "Python", "React", "Node.js", "Firebase", "MongoDB", "PostgreSQL",
    "React Native", "Flutter", "Electron", "AWS", "Google Cloud", "Docker"
  ];

  const companyValues = [
    {
      icon: Target,
      title: "Quality First",
      description: "Delivering high-quality software solutions that exceed client expectations"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging cutting-edge technologies to solve complex business challenges"
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Building long-term partnerships through exceptional service and support"
    }
  ];

  return (
    <section id="varsys" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                VarSys
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Software development company specializing in computer, Android, iOS, and web applications
            </p>
            <div className="flex justify-center mt-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Founded by Vasanthan E
              </Badge>
            </div>
          </div>

          {/* Company Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  VarSys is dedicated to transforming ideas into powerful digital solutions. 
                  We specialize in creating custom software applications that drive business 
                  growth and enhance user experiences across all platforms - from web and 
                  mobile to desktop applications.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become a leading software development company that bridges the gap 
                  between innovative technology and practical business solutions, empowering 
                  businesses of all sizes to thrive in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
              Our Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={service.title}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
              Technologies We Use
            </h3>
            <Card className="glass border-border/20">
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-3 justify-center">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Values */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
              Our Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {companyValues.map((value, index) => (
                <Card 
                  key={value.title}
                  className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <value.icon className="h-5 w-5 text-accent" />
                      </div>
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <Card className="glass border-border/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss your project and turn your ideas into reality with custom software solutions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    Get In Touch
                  </Button>
                  <Button size="lg" variant="outline">
                    View Portfolio
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>📧 dev.vasathan.tech@gmail.com</p>
                  <p>📞 +91 9442434269</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
