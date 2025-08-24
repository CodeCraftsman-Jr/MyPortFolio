import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { Code, Database, Globe, Wrench, Award, ExternalLink, Calendar, Users, Star, ArrowRight, Cloud, Layers } from "lucide-react";
import { skillsData, type SkillDetail, type Certificate } from "@/data/skills";

export const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleSkillClick = (skill: SkillDetail) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsCertModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  const closeCertModal = () => {
    setIsCertModalOpen(false);
    setSelectedCertificate(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      frontend: Globe,
      backend: Database,
      languages: Code,
      tools: Wrench,
      frameworks: Layers,
      cloud: Cloud,
      database: Database
    };
    return icons[category as keyof typeof icons] || Code;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'text-blue-400',
      backend: 'text-green-400',
      languages: 'text-purple-400',
      tools: 'text-orange-400',
      frameworks: 'text-pink-400',
      cloud: 'text-cyan-400',
      database: 'text-yellow-400'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillDetail[]>);


  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional skills with certifications and detailed proficiency levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => {
              const IconComponent = getCategoryIcon(skill.category);
              return (
                <Card
                  key={skill.id}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSkillClick(skill)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-secondary/20 ${getCategoryColor(skill.category)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {skill.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Proficiency Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Proficiency</span>
                        <span className="text-primary font-semibold">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>

                    {/* Experience */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{skill.yearsOfExperience} years</span>
                    </div>

                    {/* Certificates Count */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Certificates
                      </span>
                      <span className="font-medium">{skill.certificates.length}</span>
                    </div>

                    {/* Endorsements */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Endorsements
                      </span>
                      <span className="font-medium">{skill.endorsements}</span>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" className="text-xs group-hover:bg-primary/10">
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedSkill ? `${selectedSkill.name} - Skill Details` : ""}
        size="xl"
      >
        {selectedSkill && (
          <div className="space-y-6">
            {/* Skill Overview */}
            <div className="border-b border-border/20 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-secondary/20 ${getCategoryColor(selectedSkill.category)}`}>
                  {(() => {
                    const IconComponent = getCategoryIcon(selectedSkill.category);
                    return <IconComponent className="h-6 w-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">{selectedSkill.name}</h3>
                  <Badge className="mt-1">{selectedSkill.category}</Badge>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{selectedSkill.description}</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-primary">{selectedSkill.proficiency}%</div>
                  <div className="text-sm text-muted-foreground">Proficiency</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-accent">{selectedSkill.yearsOfExperience}</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-primary">{selectedSkill.endorsements}</div>
                  <div className="text-sm text-muted-foreground">Endorsements</div>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certificates ({selectedSkill.certificates.length})
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedSkill.certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="glass border-border/20 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => handleCertificateClick(cert)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="w-16 h-12 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm mb-1">{cert.name}</h5>
                          <p className="text-xs text-muted-foreground mb-2">{cert.issuingOrganization}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{cert.issueDate}</span>
                            {cert.credentialUrl && cert.credentialUrl !== '#' && (
                              <ExternalLink className="h-3 w-3 text-accent" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Related Projects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.projects.map((project) => (
                  <Badge key={project} variant="outline" className="text-sm">
                    {project}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Related Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.relatedSkills.map((skill) => (
                  <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Certificate Detail Modal */}
      <Modal
        isOpen={isCertModalOpen}
        onClose={closeCertModal}
        title={selectedCertificate ? selectedCertificate.name : ""}
        size="lg"
      >
        {selectedCertificate && (
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                className="w-full max-w-md mx-auto rounded-lg border shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Issuing Organization</h4>
                <p className="text-muted-foreground">{selectedCertificate.issuingOrganization}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Issue Date</h4>
                <p className="text-muted-foreground">{selectedCertificate.issueDate}</p>
              </div>

              {selectedCertificate.expiryDate && (
                <div>
                  <h4 className="font-semibold text-primary mb-2">Expiry Date</h4>
                  <p className="text-muted-foreground">{selectedCertificate.expiryDate}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-primary mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedCertificate.description}</p>
              </div>

              {selectedCertificate.credentialUrl && selectedCertificate.credentialUrl !== '#' && (
                <div className="flex justify-center pt-4">
                  <Button asChild>
                    <a href={selectedCertificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Credential
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};