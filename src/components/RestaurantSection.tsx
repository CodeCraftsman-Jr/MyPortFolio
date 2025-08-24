import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChefHat, MapPin, Clock, Star, Truck, Phone, ExternalLink } from "lucide-react";

export const RestaurantSection = () => {
  const deliveryPlatforms = [
    {
      name: "Swiggy",
      url: "https://www.swiggy.com/city/pondicherry/vasanths-kitchen-kalapet-auroville-rest967996",
      logo: "🛵",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      name: "Zomato",
      url: "https://www.zomato.com/puducherry/vasanths-kitchen-auroville",
      logo: "🍽️",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    }
  ];

  const restaurantFeatures = [
    {
      icon: ChefHat,
      title: "Authentic Indian Cuisine",
      description: "Traditional recipes with modern presentation and fresh ingredients"
    },
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Fast delivery through Swiggy and Zomato platforms across Pondicherry"
    },
    {
      icon: MapPin,
      title: "Takeaway Available",
      description: "Quick pickup service directly from our restaurant location"
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Consistent quality and taste with every order"
    }
  ];

  return (
    <section id="restaurant" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Vasanth Kitchen
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bringing authentic Indian flavors to your doorstep in Pondicherry
            </p>
          </div>

          {/* Restaurant Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    Restaurant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground text-sm">Pondicherry, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Service Hours</p>
                      <p className="text-muted-foreground text-sm">Available for delivery and takeaway</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-muted-foreground text-sm">+91 9442434269</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle>Cuisine & Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-primary/10 text-primary">Indian Cuisine</Badge>
                    <Badge className="bg-accent/10 text-accent">Traditional Recipes</Badge>
                    <Badge className="bg-primary/10 text-primary">Fresh Ingredients</Badge>
                    <Badge className="bg-accent/10 text-accent">Home-style Cooking</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Experience authentic Indian flavors prepared with traditional recipes and 
                    the finest ingredients. Our kitchen focuses on delivering home-style cooking 
                    that brings comfort and satisfaction to every meal.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Delivery Platforms */}
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Truck className="h-6 w-6 text-accent" />
                    </div>
                    Order Online
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deliveryPlatforms.map((platform) => (
                    <Card 
                      key={platform.name}
                      className={`${platform.bgColor} ${platform.borderColor} border hover:scale-105 transition-transform duration-200`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{platform.logo}</span>
                            <div>
                              <h4 className="font-semibold">{platform.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Order for delivery
                              </p>
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <a 
                              href={platform.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Order Now
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Or visit us directly for takeaway
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Walk-in orders welcome
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Restaurant Features */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
              Why Choose Vasanth Kitchen?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {restaurantFeatures.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 animate-fade-in-up text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="glass border-border/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Ready to Order?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Experience the authentic taste of Indian cuisine delivered fresh to your doorstep
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a 
                      href="https://www.swiggy.com/city/pondicherry/vasanths-kitchen-kalapet-auroville-rest967996" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span className="text-lg">🛵</span>
                      Order on Swiggy
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a 
                      href="https://www.zomato.com/puducherry/vasanths-kitchen-auroville" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <span className="text-lg">🍽️</span>
                      Order on Zomato
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
