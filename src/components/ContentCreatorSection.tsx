import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, Play, Users, ExternalLink, Gamepad2, BookOpen, Camera } from "lucide-react";

export const ContentCreatorSection = () => {
  const youtubeChannels = [
    {
      id: "vlog",
      name: "PONDY INFO HUB",
      url: "https://www.youtube.com/@PONDYINFOHUB",
      description: "Vlog channel featuring lifestyle content, local insights, and personal experiences from Pondicherry",
      category: "Lifestyle & Vlogs",
      icon: Camera,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      id: "education",
      name: "QUANTUM MOROW",
      url: "https://www.youtube.com/@QUANTUMMOROW/featured",
      description: "Educational content focusing on technology, programming tutorials, and study materials",
      category: "Education & Technology",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: "gaming",
      name: "SWAG GAMERZ",
      url: "https://www.youtube.com/@SWAGGAMERZ",
      description: "Gaming content, reviews, gameplay videos, and gaming community engagement",
      category: "Gaming & Entertainment",
      icon: Gamepad2,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const socialMediaLinks = [
    {
      name: "Gaming Blog",
      url: "https://www.swaggamerz444.store/",
      description: "Gaming blog with reviews, news, and gaming community content",
      status: "active",
      icon: Gamepad2
    },
    {
      name: "Gaming Discord Server",
      url: "#",
      description: "Community Discord server for gamers and content creators",
      status: "coming-soon",
      icon: Users
    },
    {
      name: "VarSys Discord Server",
      url: "#",
      description: "Professional Discord server for VarSys software development community",
      status: "coming-soon",
      icon: Users
    },
    {
      name: "Patreon Page",
      url: "#",
      description: "Support content creation and get exclusive access to premium content",
      status: "coming-soon",
      icon: Users
    }
  ];

  return (
    <section id="content-creator" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Content Creation & Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building communities and sharing knowledge through diverse content across multiple platforms
            </p>
          </div>

          {/* YouTube Channels */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-primary flex items-center gap-2">
              <Youtube className="h-6 w-6 text-red-500" />
              YouTube Channels
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {youtubeChannels.map((channel, index) => (
                <Card 
                  key={channel.id}
                  className={`glass border-border/20 hover:${channel.borderColor} transition-all duration-300 animate-fade-in-up group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg ${channel.bgColor} ${channel.borderColor} border`}>
                        <channel.icon className={`h-6 w-6 ${channel.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {channel.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {channel.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {channel.description}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <a 
                          href={channel.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Visit Channel
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        asChild
                      >
                        <a 
                          href={channel.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Media & Community Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-primary flex items-center gap-2">
              <Users className="h-6 w-6 text-accent" />
              Community & Social Media
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {socialMediaLinks.map((link, index) => (
                <Card 
                  key={link.name}
                  className="glass border-border/20 hover:border-accent/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <link.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{link.name}</h4>
                          <Badge 
                            variant={link.status === 'active' ? 'default' : 'secondary'}
                            className={link.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                          >
                            {link.status === 'active' ? 'Active' : 'Coming Soon'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {link.description}
                        </p>
                        {link.status === 'active' ? (
                          <Button size="sm" asChild>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Visit
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
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
