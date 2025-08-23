import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2 } from "lucide-react";

export const ExperienceSection = () => {
  const experiences = [
    {
      company: "ONEYES INFO TECH",
      position: "Web Developer Intern",
      location: "Anna Nagar, Chennai",
      period: "March 2025 – June 2025",
      status: "Offer Letter",
      description: [
        "Developed a website template for a restaurant website with blogging page for both customers and owners",
        "Created showcase gallery for the menu and Online Ordering System with Real-Time Order Tracking",
        "Implemented Pre-Booking Features and secure authentication System using Firebase",
        "Designed and developed Realtime Database Using Firebase"
      ],
      technologies: ["Web Development", "Firebase", "Real-time Database", "Authentication"]
    },
    {
      company: "INNOV WORKS",
      position: "Full Stack Developer",
      location: "Ariyur, Pondy",
      period: "Jun 2023 – Present",
      status: "Current",
      description: [
        "Developed website with 4 tasks to find attention span based on reaction time",
        "Implemented authentication features using Firebase for secure user management",
        "Integrated Payment Options using RazorPay for seamless transactions",
        "Developed Customizable Subscription module according to organizational needs"
      ],
      technologies: ["Full Stack", "Firebase", "RazorPay", "Subscription Management"]
    }
  ];

  const freelanceProjects = [
    {
      title: "Facial Recognition Attendance with Auto Payroll",
      client: "White Town, Pondicherry",
      period: "Jan 2025 – Present",
      description: [
        "Developed Python application using OpenCV for facial recognition-based attendance tracking",
        "Automated payroll generation by calculating working hours, bonuses, and deductions",
        "Integrated complete salary processing system with attendance data"
      ],
      technologies: ["Python", "OpenCV", "Facial Recognition", "Payroll Automation"]
    },
    {
      title: "Doctor's Website Development",
      client: "Madugadipet, Tamil Nadu",
      period: "June 2023 – Sep 2023",
      description: [
        "Developed website for doctor with online booking and consultation features",
        "Created E-commerce page for selling ayurvedic medicines",
        "Implemented appointment scheduling and patient management system"
      ],
      technologies: ["Wix Development", "E-commerce", "Healthcare", "Online Booking"]
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Work Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional experience and freelance projects that showcase my skills and expertise
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-primary">Professional Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card 
                  key={exp.company}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          {exp.company}
                        </CardTitle>
                        <p className="text-lg font-semibold text-accent mt-1">{exp.position}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge 
                          variant={exp.status === "Current" ? "default" : "secondary"}
                          className={exp.status === "Current" ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {exp.status}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Freelance Projects */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-primary">Freelance Work</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {freelanceProjects.map((project, index) => (
                <Card 
                  key={project.title}
                  className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.client}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {project.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};