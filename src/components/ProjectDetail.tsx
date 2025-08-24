import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle, Clock, Target } from "lucide-react";
import { projects } from "@/data/projects";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-blue-500/20 text-blue-400',
      mobile: 'bg-green-500/20 text-green-400',
      desktop: 'bg-purple-500/20 text-purple-400',
      ai: 'bg-orange-500/20 text-orange-400',
      automation: 'bg-red-500/20 text-red-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-500/20 text-green-400',
      'in-progress': 'bg-yellow-500/20 text-yellow-400',
      planned: 'bg-blue-500/20 text-blue-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            <div className="flex gap-2">
              {project.liveUrl && project.liveUrl !== '#' && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className={getCategoryColor(project.category)}>
                {project.category.toUpperCase()}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Project Images */}
          <Card className="glass border-border/20 mb-12">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-64 md:h-96 object-cover rounded-t-lg"
                />
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Technologies */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Technologies Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-border/20">
                        <h4 className="font-semibold text-primary mb-2">{tech.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{tech.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Challenges & Solutions */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>Challenges & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="border-l-4 border-primary/30 pl-6">
                        <h4 className="font-semibold text-primary mb-2">{challenge.title}</h4>
                        <p className="text-muted-foreground mb-3">{challenge.description}</p>
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <p className="text-sm"><strong>Solution:</strong> {challenge.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Timeline */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Development Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.timeline.map((phase, index) => (
                      <div key={index} className="relative">
                        {index < project.timeline.length - 1 && (
                          <div className="absolute left-2 top-8 w-0.5 h-12 bg-border/30" />
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 rounded-full bg-primary mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-sm">{phase.phase}</h4>
                            <p className="text-xs text-accent mb-1">{phase.duration}</p>
                            <p className="text-xs text-muted-foreground">{phase.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
