export interface ExperienceDetail {
  id: string;
  title: string;
  company: string;
  type: 'professional' | 'freelance';
  duration: string;
  location: string;
  status: 'current' | 'completed';
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  projectOutcomes: {
    title: string;
    description: string;
    impact: string;
  }[];
  skillsDeveloped: string[];
  teamSize?: number;
  collaborationDetails: string[];
  awards?: string[];
  clientFeedback?: string;
}

export const experienceData: ExperienceDetail[] = [
  {
    id: 'freelance-web-dev',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    type: 'freelance',
    duration: '2023 - Present',
    location: 'Remote',
    status: 'current',
    description: 'Providing comprehensive web development services to clients ranging from small businesses to healthcare professionals, specializing in modern web technologies and user-centric design.',
    responsibilities: [
      'Design and develop responsive websites using React, HTML5, CSS3, and JavaScript',
      'Implement backend solutions with Node.js, Firebase, and database integration',
      'Collaborate with clients to understand requirements and deliver tailored solutions',
      'Optimize websites for performance, SEO, and mobile responsiveness',
      'Provide ongoing maintenance and technical support',
      'Manage project timelines and client communications',
      'Integrate third-party APIs and payment gateways',
      'Ensure cross-browser compatibility and accessibility standards'
    ],
    achievements: [
      'Successfully delivered 6+ complete web projects with 100% client satisfaction',
      'Achieved average 40% improvement in client website loading speeds',
      'Implemented secure payment systems processing $50K+ in transactions',
      'Built responsive designs that increased mobile traffic by 60% on average',
      'Established long-term maintenance contracts with 80% of clients',
      'Received 5-star ratings on all freelance platforms',
      'Reduced client operational costs by 30% through automation solutions'
    ],
    technologies: [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Firebase', 'HTML5', 'CSS3',
      'Python', 'Wix', 'MongoDB', 'PostgreSQL', 'Git', 'Stripe', 'RazorPay',
      'Google APIs', 'REST APIs', 'Responsive Design', 'SEO Optimization'
    ],
    projectOutcomes: [
      {
        title: 'Restaurant Website with E-commerce',
        description: 'Complete restaurant solution with online ordering and real-time tracking',
        impact: 'Increased online orders by 150% and reduced phone order processing time by 70%'
      },
      {
        title: 'Doctor\'s Healthcare Platform',
        description: 'Integrated booking system with e-commerce for ayurvedic medicines',
        impact: 'Streamlined appointment booking process and generated additional revenue stream'
      },
      {
        title: 'Attention Span Assessment Platform',
        description: 'Psychology assessment tool with subscription management',
        impact: 'Enabled remote psychological assessments for 500+ users across organizations'
      }
    ],
    skillsDeveloped: [
      'Client Communication & Management',
      'Project Planning & Execution',
      'Full-Stack Development',
      'UI/UX Design Principles',
      'Payment Gateway Integration',
      'Performance Optimization',
      'SEO & Digital Marketing',
      'Business Analysis',
      'Time Management',
      'Problem-Solving'
    ],
    collaborationDetails: [
      'Direct client consultation and requirement gathering',
      'Collaborative design process with stakeholder feedback',
      'Agile development approach with regular client updates',
      'Cross-functional coordination with designers and content creators',
      'Technical documentation and knowledge transfer',
      'Post-launch support and maintenance coordination'
    ],
    clientFeedback: 'Exceptional work quality and professional communication. Delivered beyond expectations with innovative solutions that significantly improved our business operations.'
  },
  {
    id: 'python-developer-intern',
    title: 'Python Developer Intern',
    company: 'Tech Solutions Pvt Ltd',
    type: 'professional',
    duration: '2023 (3 months)',
    location: 'Pondicherry, India',
    status: 'completed',
    description: 'Intensive internship focused on Python development, data analysis, and automation solutions. Worked on real-world projects involving GUI development, data processing, and system automation.',
    responsibilities: [
      'Develop Python applications using Tkinter for GUI interfaces',
      'Implement data analysis solutions using Pandas and NumPy',
      'Create automated scripts for data processing and reporting',
      'Collaborate with senior developers on code reviews and best practices',
      'Document code and create technical specifications',
      'Participate in daily standups and sprint planning meetings',
      'Test and debug applications to ensure quality standards',
      'Assist in database design and optimization tasks'
    ],
    achievements: [
      'Developed 3 complete Python applications during internship period',
      'Improved data processing efficiency by 50% through automation scripts',
      'Received "Outstanding Intern" recognition for exceptional performance',
      'Successfully completed all assigned projects ahead of schedule',
      'Contributed to team productivity improvements through innovative solutions',
      'Mentored 2 junior interns in Python programming fundamentals'
    ],
    technologies: [
      'Python', 'Tkinter', 'Pandas', 'NumPy', 'Matplotlib', 'SQLite',
      'Git', 'PyQt', 'Jupyter Notebook', 'Data Visualization',
      'API Integration', 'File Processing', 'Database Management'
    ],
    projectOutcomes: [
      {
        title: 'Inventory Management System',
        description: 'Desktop application for tracking inventory with automated alerts',
        impact: 'Reduced inventory management time by 60% and eliminated stock-out incidents'
      },
      {
        title: 'Data Analysis Dashboard',
        description: 'Interactive dashboard for business metrics visualization',
        impact: 'Enabled real-time decision making and improved reporting accuracy by 90%'
      },
      {
        title: 'Automated Report Generator',
        description: 'Script to generate weekly reports from multiple data sources',
        impact: 'Saved 10+ hours per week of manual report preparation time'
      }
    ],
    skillsDeveloped: [
      'Advanced Python Programming',
      'GUI Development with Tkinter',
      'Data Analysis & Visualization',
      'Database Integration',
      'Code Documentation',
      'Version Control with Git',
      'Agile Development Methodology',
      'Team Collaboration',
      'Problem-Solving',
      'Technical Communication'
    ],
    teamSize: 8,
    collaborationDetails: [
      'Worked in cross-functional team of 8 developers and analysts',
      'Participated in code reviews and pair programming sessions',
      'Collaborated with QA team for testing and bug resolution',
      'Regular knowledge sharing sessions with team members',
      'Mentorship from senior developers on best practices',
      'Active participation in team retrospectives and improvements'
    ],
    awards: [
      'Outstanding Intern Award - Tech Solutions Pvt Ltd',
      'Best Project Implementation - Inventory Management System'
    ]
  }
];
