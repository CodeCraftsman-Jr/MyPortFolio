export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  organizationId: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  image: string;
  description: string;
}

export interface SkillDetail {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'frameworks' | 'cloud';
  proficiency: number; // 1-100
  yearsOfExperience: number;
  description: string;
  certificates: Certificate[];
  endorsements: number;
  projects: string[];
  relatedSkills: string[];
}

export const skillsData: SkillDetail[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    proficiency: 90,
    yearsOfExperience: 3,
    description: 'Advanced Python programming with expertise in GUI development, data analysis, and automation.',
    certificates: [
      {
        id: 'python-cert-1',
        name: 'Python Programming Certification',
        issuingOrganization: 'Python Institute',
        organizationId: 'python-institute',
        issueDate: '2023-06-15',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Comprehensive certification covering Python fundamentals, OOP, and advanced concepts.'
      },
      {
        id: 'python-cert-2',
        name: 'Python Data Analysis Certificate',
        issuingOrganization: 'DataCamp',
        organizationId: 'datacamp',
        issueDate: '2023-08-20',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Specialized certification in data analysis using Pandas, NumPy, and Matplotlib.'
      }
    ],
    endorsements: 15,
    projects: ['Finance Management App', 'Inventory System', 'Facial Recognition System'],
    relatedSkills: ['Django', 'Flask', 'Data Analysis', 'Machine Learning']
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 85,
    yearsOfExperience: 2,
    description: 'Modern React development with hooks, context, and state management libraries.',
    certificates: [
      {
        id: 'react-cert-1',
        name: 'React Developer Certification',
        issuingOrganization: 'Meta',
        organizationId: 'meta',
        issueDate: '2023-09-10',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Official Meta certification covering React fundamentals, hooks, and best practices.'
      }
    ],
    endorsements: 12,
    projects: ['Portfolio Website', 'Restaurant Website', 'E-commerce Platform'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Next.js', 'Redux']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    proficiency: 88,
    yearsOfExperience: 3,
    description: 'Full-stack JavaScript development with ES6+, async programming, and modern frameworks.',
    certificates: [
      {
        id: 'js-cert-1',
        name: 'JavaScript Algorithms and Data Structures',
        issuingOrganization: 'freeCodeCamp',
        organizationId: 'freecodecamp',
        issueDate: '2023-05-15',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Comprehensive certification covering JavaScript fundamentals and algorithmic thinking.'
      }
    ],
    endorsements: 18,
    projects: ['Web Applications', 'Interactive Dashboards', 'API Integrations'],
    relatedSkills: ['React', 'Node.js', 'TypeScript', 'Vue.js']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 80,
    yearsOfExperience: 2,
    description: 'Server-side JavaScript development with Express.js, API design, and database integration.',
    certificates: [
      {
        id: 'node-cert-1',
        name: 'Node.js Application Development',
        issuingOrganization: 'IBM',
        organizationId: 'ibm',
        issueDate: '2023-07-22',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Professional certification in Node.js development and backend architecture.'
      }
    ],
    endorsements: 10,
    projects: ['REST APIs', 'Real-time Applications', 'Microservices'],
    relatedSkills: ['Express.js', 'MongoDB', 'PostgreSQL', 'Socket.io']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'cloud',
    proficiency: 75,
    yearsOfExperience: 2,
    description: 'Firebase services including Authentication, Firestore, Real-time Database, and Hosting.',
    certificates: [
      {
        id: 'firebase-cert-1',
        name: 'Firebase Certified Developer',
        issuingOrganization: 'Google',
        organizationId: 'google',
        issueDate: '2023-08-05',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Official Google certification for Firebase development and cloud services.'
      }
    ],
    endorsements: 8,
    projects: ['Restaurant Website', 'Inventory System', 'Authentication Systems'],
    relatedSkills: ['Google Cloud', 'NoSQL', 'Real-time Systems', 'Authentication']
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'tools',
    proficiency: 70,
    yearsOfExperience: 1,
    description: 'Computer vision and image processing with OpenCV for facial recognition and analysis.',
    certificates: [
      {
        id: 'opencv-cert-1',
        name: 'Computer Vision with OpenCV',
        issuingOrganization: 'OpenCV University',
        organizationId: 'opencv-university',
        issueDate: '2023-10-12',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Specialized certification in computer vision and image processing techniques.'
      }
    ],
    endorsements: 6,
    projects: ['Facial Recognition System', 'Image Processing Tools'],
    relatedSkills: ['Python', 'Machine Learning', 'Image Processing', 'AI']
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    proficiency: 85,
    yearsOfExperience: 3,
    description: 'Version control, collaboration, and DevOps workflows with Git and GitHub.',
    certificates: [
      {
        id: 'git-cert-1',
        name: 'Git Version Control',
        issuingOrganization: 'GitHub',
        organizationId: 'github',
        issueDate: '2023-04-18',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Professional certification in Git workflows and collaborative development.'
      }
    ],
    endorsements: 14,
    projects: ['All Development Projects', 'Open Source Contributions'],
    relatedSkills: ['DevOps', 'CI/CD', 'Collaboration', 'Code Review']
  },
  {
    id: 'database',
    name: 'Database Management',
    category: 'database',
    proficiency: 78,
    yearsOfExperience: 2,
    description: 'SQL and NoSQL database design, optimization, and management.',
    certificates: [
      {
        id: 'db-cert-1',
        name: 'Database Design and Management',
        issuingOrganization: 'Oracle',
        organizationId: 'oracle',
        issueDate: '2023-06-30',
        credentialUrl: '#',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400&h=300',
        description: 'Comprehensive certification in database design, SQL, and performance optimization.'
      }
    ],
    endorsements: 9,
    projects: ['Inventory System', 'Finance App', 'User Management Systems'],
    relatedSkills: ['SQL', 'MongoDB', 'PostgreSQL', 'Data Modeling']
  }
];
