import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Palette, 
  Rocket, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Laptop 
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const AboutSection = () => {
  const personalInfo = {
    name: "VASANTHAN E",
    location: "Pondicherry, 605014",
    phone: "+91 9442434269",
    email: "dev.vasanthan.tech@gmail.com",
    links: {
      linkedin: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vasanthan-e-cse-5556a2327/"
      },
      github: {
        name: "Github",
        url: "https://github.com/CodeCraftsman-Jr"
      },
      leetcode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/VasanthanVarsys/"
      }
    }
  };

  const education = [
    {
      school: "SRI VENKATESHWARAA COLLEGE OF ENGINEERING AND TECHNOLOGY",
      location: "Ariyur, Pondicherry",
      degree: "Bachelor of Engineering",
      major: "Computer Science",
      date: "Expected May 2026",
      gpa: "7.5",
      courses: "Frontend/Backend Development, Python, C, C++, Java, Python GUI Development, AutoCad, Microsoft 365"
    },
    {
      school: "KENDRIYA VIDYALAYA NO 2 PONDICHERRY",
      location: "University Campus, Pondy",
      details: [
        "Passed with 66% (Class 12th) - CBSE (Jul 2021 - Jul 2022)",
        "Passed with 77% (Class 12th) - CBSE (Jul 2019 - Jul 2020)"
      ]
    }
  ];

  const workExperience = [
    {
      company: "ONEYES INFO TECH",
      location: "Anna Nagar, Chennai",
      position: "Web Developer Intern",
      duration: "March 2025 – June 2025",
      achievements: [
        "Developed a restaurant website template with blogging, menu gallery, and real-time order tracking",
        "Implemented secure authentication and real-time database using Firebase"
      ]
    },
    {
      company: "INNOV WORKS",
      location: "Ariyur, Pondy",
      position: "Full Stack Developer",
      duration: "Jun 2023 – Present",
      achievements: [
        "Developed attention span testing website with Firebase authentication and RazorPay integration",
        "Created customizable subscription module for organization needs"
      ]
    }
  ];

  const projects = [
    {
      name: "Personal Finance and Production Management Application",
      date: "Feb 2024",
      details: [
        "Python-based finance and productivity dashboard with comprehensive tracking features",
        "Integrated Google Tasks API and Zerodha API for task and investment management"
      ]
    },
    {
      name: "Sales and Inventory Management Application",
      date: "Aug 2024",
      details: [
        "Python-based system with tracking, alerts, and analysis features",
        "Implemented forecasting and Firebase integration for real-time operations"
      ]
    }
  ];

  const freelanceWork = [
    {
      project: "Facial Recognition Attendance with Auto Payroll",
      location: "White Town, Pondicherry",
      role: "Full Python Developer",
      duration: "Jan 2025 – Present",
      details: [
        "Developed OpenCV-based facial recognition attendance system",
        "Automated payroll processing with comprehensive salary calculations"
      ]
    },
    {
      project: "Wix Developer",
      location: "Madugadipet, Tamilnadu",
      duration: "June 2023 – Sep 2023",
      details: [
        "Created doctor's website with online booking and consultation features",
        "Integrated e-commerce functionality for ayurvedic medicine sales"
      ]
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code with best practices"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Creating stunning user interfaces with attention to detail"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and user experience"
    }
  ];

  const technologies = [
    "Python", "React", "Firebase", "C", "C++", 
    "Java", "AutoCAD", "Microsoft 365", "Frontend Development", "Backend Development"
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {personalInfo.name}
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              {Object.entries(personalInfo.links).map(([platform, linkInfo]) => (
                <a 
                  key={platform} 
                  href={linkInfo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  {linkInfo.name}
                </a>
              ))}
            </div>
            <p className="text-xl text-muted-foreground">
              {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
            </p>
          </div>

          {/* Resume Sections */}
          <div className="grid gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-lg">{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.location}</p>
                      {edu.degree && (
                        <>
                          <p>{edu.degree} in {edu.major} - {edu.date}</p>
                          <p>GPA: {edu.gpa}</p>
                          <p className="text-sm mt-1">Coursework: {edu.courses}</p>
                        </>
                      )}
                      {edu.details && (
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                          {edu.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Work Experience</h3>
                </div>
                <div className="space-y-6">
                  {workExperience.map((work, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-lg">{work.company}</h4>
                      <p className="text-muted-foreground">{work.location}</p>
                      <p>{work.position} | {work.duration}</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        {work.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Projects</h3>
                </div>
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      <p className="text-muted-foreground">{project.date}</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        {project.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Laptop className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Freelance Work</h3>
                </div>
                <div className="space-y-6">
                  {freelanceWork.map((work, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-lg">{work.project}</h4>
                      <p className="text-muted-foreground">{work.location}</p>
                      {work.role && <p>{work.role} | {work.duration}</p>}
                      {!work.role && <p>{work.duration}</p>}
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        {work.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills and Technologies Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Profile</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Computer Science Engineering Student at Sri Venkateshwaraa College of Engineering and Technology.
                  Full Stack Developer with expertise in Python, React, and Firebase.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="glass border-border/20 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Work Experience</h3>
                  </div>
                  <div className="space-y-6">
                    {workExperience.map((work, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-lg">{work.company}</h4>
                        <p className="text-muted-foreground">{work.location}</p>
                        <p>{work.position} | {work.duration}</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                          {work.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Projects</h3>
                  </div>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-lg">{project.name}</h4>
                        <p className="text-muted-foreground">{project.date}</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                          {project.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Laptop className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Freelance Work</h3>
                  </div>
                  <div className="space-y-6">
                    {freelanceWork.map((work, index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-lg">{work.project}</h4>
                        <p className="text-muted-foreground">{work.location}</p>
                        {work.role && <p>{work.role} | {work.duration}</p>}
                        {!work.role && <p>{work.duration}</p>}
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                          {work.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills and Features Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-left">
              {/* Profile photo and about section */}
              <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img
                    src={profilePhoto}
                    alt="About me"
                    className="w-full h-full rounded-2xl object-cover border-2 border-accent/20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">
                    Computer Science Student & Full Stack Developer
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm a Computer Science Engineering student with a passion for building
                    modern web applications. I specialize in Python, React, and Firebase,
                    creating efficient and user-friendly solutions.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Currently pursuing my Bachelor's in Computer Science Engineering with a strong
                focus on full-stack development and modern technologies. Always eager to learn
                and take on new challenges.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-right">
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <Card 
                    key={feature.title} 
                    className="glass border-border/20 hover:border-primary/30 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 glow-primary">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};