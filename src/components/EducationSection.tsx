import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export const EducationSection = () => {
  const education = [
    {
      institution: "Sri Venkateshwaraa College of Engineering and Technology",
      degree: "Bachelor of Engineering",
      major: "Computer Science",
      duration: "2022 - 2026 (Expected)",
      location: "Ariyur, Pondicherry",
      cgpa: "7.5",
      status: "Current",
      description: "Pursuing comprehensive education in computer science with focus on software development, algorithms, and modern technologies.",
      subjects: [
        "Frontend/Backend Development", "Python Programming", "C/C++", 
        "Java", "Python GUI Development", "AutoCAD", "Microsoft 365"
      ]
    },
    {
      institution: "Kendriya Vidyalaya No 2 Pondicherry",
      degree: "Higher Secondary Education",
      major: "CBSE Board",
      duration: "2019 - 2022",
      location: "University Campus, Pondicherry",
      cgpa: "Class 12th: 66%, Class 10th: 77%",
      status: "Completed",
      description: "Completed secondary education with strong foundation in mathematics and science, developing analytical thinking and problem-solving skills.",
      subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
    }
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Academic journey and continuous learning in computer science and technology
            </p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card 
                key={edu.institution}
                className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 glow-primary">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{edu.institution}</CardTitle>
                        <p className="text-lg font-semibold text-accent">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.major}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end gap-2">
                      <Badge 
                        variant={edu.status === "Current" ? "default" : "secondary"}
                        className={edu.status === "Current" ? "bg-green-500/20 text-green-400" : ""}
                      >
                        {edu.status}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </span>
                      </div>
                      {edu.cgpa && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-accent" />
                          <span className="font-medium">{edu.cgpa}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{edu.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Subjects & Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-sm">
                          {subject}
                        </Badge>
                      ))}
                    </div>
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