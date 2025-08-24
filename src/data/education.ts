export interface EducationDetail {
  id: string;
  institution: string;
  degree: string;
  major: string;
  duration: string;
  location: string;
  cgpa: string;
  status: string;
  description: string;
  subjects: string[];
  curriculum: {
    semester: string;
    courses: string[];
  }[];
  achievements: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  skills: string[];
}

export const educationData: EducationDetail[] = [
  {
    id: "engineering",
    institution: "Sri Venkateshwaraa College of Engineering and Technology",
    degree: "Bachelor of Engineering",
    major: "Computer Science",
    duration: "2022 - 2026 (Expected)",
    location: "Ariyur, Pondicherry",
    cgpa: "7.5",
    status: "Current",
    description: "Pursuing comprehensive education in computer science with focus on software development, algorithms, and modern technologies.",
    subjects: [
      "Frontend/Backend Development",
      "Python Programming",
      "C/C++",
      "Java",
      "Python GUI Development",
      "AutoCAD",
      "Microsoft 365"
    ],
    curriculum: [
      {
        semester: "Semester 1-2",
        courses: [
          "Programming Fundamentals in C",
          "Mathematics for Computer Science",
          "Digital Logic Design",
          "Computer Organization",
          "Engineering Physics",
          "Technical Communication"
        ]
      },
      {
        semester: "Semester 3-4",
        courses: [
          "Data Structures and Algorithms",
          "Object-Oriented Programming (C++)",
          "Database Management Systems",
          "Computer Networks",
          "Operating Systems",
          "Software Engineering"
        ]
      },
      {
        semester: "Semester 5-6",
        courses: [
          "Web Development (Frontend/Backend)",
          "Python Programming",
          "Machine Learning Fundamentals",
          "Mobile Application Development",
          "Cloud Computing",
          "Project Management"
        ]
      },
      {
        semester: "Semester 7-8",
        courses: [
          "Advanced Web Technologies",
          "Artificial Intelligence",
          "Cybersecurity",
          "Final Year Project",
          "Industry Internship",
          "Professional Ethics"
        ]
      }
    ],
    achievements: [
      "Maintained CGPA of 7.5 throughout the program",
      "Completed multiple industry-relevant projects",
      "Active participation in coding competitions",
      "Leadership role in technical events",
      "Recognized for innovative project solutions"
    ],
    projects: [
      {
        title: "Personal Finance Management System",
        description: "Comprehensive Python-based application for financial tracking and analysis",
        technologies: ["Python", "Tkinter", "SQLite", "Matplotlib"]
      },
      {
        title: "E-commerce Web Application",
        description: "Full-stack web application with payment integration",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
      },
      {
        title: "Machine Learning Stock Predictor",
        description: "AI model for stock price prediction using historical data",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"]
      }
    ],
    skills: [
      "Full-Stack Web Development",
      "Python Programming",
      "Database Design",
      "Software Architecture",
      "Problem Solving",
      "Team Leadership",
      "Project Management",
      "Technical Documentation"
    ]
  },
  {
    id: "secondary",
    institution: "Kendriya Vidyalaya No 2 Pondicherry",
    degree: "Higher Secondary Education",
    major: "CBSE Board",
    duration: "2019 - 2022",
    location: "University Campus, Pondicherry",
    cgpa: "Class 12th: 66%, Class 10th: 77%",
    status: "Completed",
    description: "Completed secondary education with strong foundation in mathematics and science, developing analytical thinking and problem-solving skills.",
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science"
    ],
    curriculum: [
      {
        semester: "Class 10th",
        courses: [
          "Mathematics",
          "Science (Physics, Chemistry, Biology)",
          "Social Science",
          "English",
          "Hindi",
          "Computer Applications"
        ]
      },
      {
        semester: "Class 11th-12th",
        courses: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Computer Science",
          "English",
          "Physical Education"
        ]
      }
    ],
    achievements: [
      "Scored 77% in Class 10th CBSE Board Examination",
      "Achieved 66% in Class 12th CBSE Board Examination",
      "Strong performance in Mathematics and Science subjects",
      "Active participation in school technical events",
      "Developed early interest in computer programming"
    ],
    projects: [
      {
        title: "School Management System",
        description: "Basic database project for managing student records",
        technologies: ["MySQL", "HTML", "CSS", "JavaScript"]
      },
      {
        title: "Scientific Calculator",
        description: "Advanced calculator with scientific functions",
        technologies: ["C++", "Graphics Library"]
      }
    ],
    skills: [
      "Mathematical Problem Solving",
      "Scientific Analysis",
      "Basic Programming",
      "Logical Thinking",
      "Research Skills",
      "Time Management",
      "Academic Writing"
    ]
  }
];
