import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Calendar, MapPin, Building2, Users, Trophy, Target, TrendingUp, ArrowRight, CheckCircle, Star } from "lucide-react";
import { experienceData, type ExperienceDetail } from "@/data/experience";

export const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExperienceClick = (experience: ExperienceDetail) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };


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

          {/* Professional Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-primary">Professional Experience</h3>
            <div className="space-y-8">
              {experienceData.filter(exp => exp.type === 'professional').map((exp, index) => (
                <Card
                  key={exp.id}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleExperienceClick(exp)}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2 group-hover:text-primary transition-colors">
                          <Building2 className="h-5 w-5 text-primary" />
                          {exp.company}
                        </CardTitle>
                        <p className="text-lg font-semibold text-accent mt-1">{exp.title}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge
                          variant={exp.status === "current" ? "default" : "secondary"}
                          className={exp.status === "current" ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {exp.status === "current" ? "Current" : "Completed"}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.duration}
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
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-primary">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {exp.responsibilities.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-accent mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                        {exp.responsibilities.length > 3 && (
                          <li className="text-sm text-accent">
                            +{exp.responsibilities.length - 3} more responsibilities
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {exp.technologies.slice(0, 6).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {exp.technologies.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{exp.technologies.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="group-hover:bg-primary/10">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Freelance Work */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-primary">Freelance Work</h3>
            <div className="space-y-6">
              {experienceData.filter(exp => exp.type === 'freelance').map((exp, index) => (
                <Card
                  key={exp.id}
                  className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up cursor-pointer group"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  onClick={() => handleExperienceClick(exp)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{exp.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                      <Badge
                        variant={exp.status === "current" ? "default" : "secondary"}
                        className={exp.status === "current" ? "bg-green-500/20 text-green-400" : ""}
                      >
                        {exp.status === "current" ? "Current" : "Completed"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm text-primary mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <Star className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                          {exp.achievements.length > 2 && (
                            <li className="text-xs text-accent">
                              +{exp.achievements.length - 2} more achievements
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-primary mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {exp.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{exp.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="group-hover:bg-accent/10">
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
      </div>

      {/* Experience Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedExperience ? `${selectedExperience.title} - ${selectedExperience.company}` : ""}
        size="xl"
      >
        {selectedExperience && (
          <div className="space-y-6">
            {/* Experience Overview */}
            <div className="border-b border-border/20 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">{selectedExperience.company}</h3>
                  <p className="text-lg text-accent">{selectedExperience.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {selectedExperience.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {selectedExperience.location}
                    </span>
                    {selectedExperience.teamSize && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Team of {selectedExperience.teamSize}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{selectedExperience.description}</p>
            </div>

            {/* Responsibilities */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Key Responsibilities
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedExperience.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Key Achievements
              </h4>
              <div className="grid gap-3">
                {selectedExperience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <Star className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Outcomes */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Project Outcomes & Impact
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedExperience.projectOutcomes.map((outcome, index) => (
                  <Card key={index} className="glass border-border/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{outcome.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{outcome.description}</p>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-primary">{outcome.impact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Technologies & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills Developed */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Skills Developed</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.skillsDeveloped.map((skill) => (
                  <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Collaboration Details */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team Collaboration
              </h4>
              <div className="grid gap-2">
                {selectedExperience.collaborationDetails.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
                    <Users className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            {selectedExperience.awards && selectedExperience.awards.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Awards & Recognition
                </h4>
                <div className="grid gap-2">
                  {selectedExperience.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Feedback */}
            {selectedExperience.clientFeedback && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Client Feedback</h4>
                <div className="p-4 rounded-lg bg-secondary/10 border-l-4 border-accent">
                  <p className="text-muted-foreground italic">"{selectedExperience.clientFeedback}"</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};