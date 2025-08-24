import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { GraduationCap, Award, Calendar, MapPin, BookOpen, Trophy, Code, ArrowRight } from "lucide-react";
import { educationData, type EducationDetail } from "@/data/education";

export const EducationSection = () => {
  const [selectedEducation, setSelectedEducation] = useState<EducationDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEducationClick = (education: EducationDetail) => {
    setSelectedEducation(education);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEducation(null);
  };

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
            {educationData.map((edu, index) => (
              <Card
                key={edu.id}
                className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up cursor-pointer group"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleEducationClick(edu)}
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

                  <div className="mb-4">
                    <h4 className="font-semibold mb-3 text-primary">Key Subjects & Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.slice(0, 6).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-sm">
                          {subject}
                        </Badge>
                      ))}
                      {edu.subjects.length > 6 && (
                        <Badge variant="outline" className="text-sm">
                          +{edu.subjects.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary/10 group-hover:border-primary/30"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Education Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedEducation ? `${selectedEducation.degree} - ${selectedEducation.major}` : ""}
        size="xl"
      >
        {selectedEducation && (
          <div className="space-y-6">
            {/* Institution Info */}
            <div className="border-b border-border/20 pb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">{selectedEducation.institution}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>{selectedEducation.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{selectedEducation.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span>CGPA: {selectedEducation.cgpa}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedEducation.status === "Current" ? "default" : "secondary"}>
                    {selectedEducation.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Curriculum
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedEducation.curriculum.map((sem, index) => (
                  <Card key={index} className="glass border-border/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{sem.semester}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm">
                        {sem.courses.map((course, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Academic Achievements
              </h4>
              <div className="grid gap-2">
                {selectedEducation.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
                    <Award className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Academic Projects
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedEducation.projects.map((project, index) => (
                  <Card key={index} className="glass border-border/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
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

            {/* Skills Gained */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Skills Gained</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEducation.skills.map((skill) => (
                  <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};