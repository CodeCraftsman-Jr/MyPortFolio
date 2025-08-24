export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  images: string[];
  tags: string[];
  technologies: {
    name: string;
    description: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'api';
  }[];
  challenges: {
    title: string;
    description: string;
    solution: string;
  }[];
  features: string[];
  timeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'automation';
}

export const projects: Project[] = [
  {
    id: 'finance-management-app',
    title: 'Personal Finance & Production Management App',
    shortDescription: 'Python-based dashboard with income/expense tracking, visual analytics, goal-based budgeting, attendance tracking and financial insights.',
    fullDescription: 'A comprehensive Python-based financial management application that combines personal finance tracking with production management capabilities. The application features real-time data visualization, automated reporting, and integration with multiple APIs for enhanced functionality. Built with a focus on user experience and data accuracy, it serves both individual users and small businesses.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Python', 'Google Tasks API', 'Zerodha API', 'Data Analytics'],
    technologies: [
      { name: 'Python', description: 'Core application logic and data processing', category: 'backend' },
      { name: 'Tkinter', description: 'GUI framework for desktop interface', category: 'frontend' },
      { name: 'Google Tasks API', description: 'Task management and productivity tracking', category: 'api' },
      { name: 'Zerodha API', description: 'Real-time stock market data integration', category: 'api' },
      { name: 'Pandas', description: 'Data analysis and manipulation', category: 'tools' },
      { name: 'Matplotlib', description: 'Data visualization and charting', category: 'tools' }
    ],
    challenges: [
      {
        title: 'Real-time Data Synchronization',
        description: 'Managing real-time stock data updates while maintaining application performance',
        solution: 'Implemented asynchronous data fetching with caching mechanisms and optimized update intervals'
      },
      {
        title: 'Complex Financial Calculations',
        description: 'Accurate calculation of profits, losses, and financial projections',
        solution: 'Developed robust calculation engine with error handling and validation'
      }
    ],
    features: [
      'Income and expense tracking with categorization',
      'Visual analytics with interactive charts',
      'Goal-based budgeting system',
      'Attendance tracking for productivity',
      'Real-time stock market integration',
      'Automated financial reports',
      'Data export capabilities'
    ],
    timeline: [
      { phase: 'Planning & Design', duration: '2 weeks', description: 'Requirements gathering and UI/UX design' },
      { phase: 'Core Development', duration: '6 weeks', description: 'Implementation of core features and database design' },
      { phase: 'API Integration', duration: '3 weeks', description: 'Integration with Google Tasks and Zerodha APIs' },
      { phase: 'Testing & Optimization', duration: '2 weeks', description: 'Performance optimization and bug fixes' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'desktop'
  },
  {
    id: 'sales-inventory-system',
    title: 'Sales & Inventory Management System',
    shortDescription: 'Python-based system with daily/monthly tracking, low-stock alerts, and profit/loss analysis per item.',
    fullDescription: 'A comprehensive inventory and sales management system designed for small to medium businesses. Features advanced analytics, predictive modeling for stock management, and real-time reporting capabilities. The system integrates with Firebase for cloud storage and real-time synchronization across multiple devices.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Python', 'Firebase', 'Data Forecasting', 'Real-time Database'],
    technologies: [
      { name: 'Python', description: 'Backend logic and data processing', category: 'backend' },
      { name: 'Firebase', description: 'Real-time database and cloud storage', category: 'database' },
      { name: 'Scikit-learn', description: 'Machine learning for demand forecasting', category: 'tools' },
      { name: 'Tkinter', description: 'Desktop application interface', category: 'frontend' }
    ],
    challenges: [
      {
        title: 'Demand Forecasting Accuracy',
        description: 'Predicting inventory needs based on historical sales data',
        solution: 'Implemented machine learning algorithms with seasonal adjustment factors'
      }
    ],
    features: [
      'Daily and monthly sales tracking',
      'Low-stock alerts and notifications',
      'Profit/loss analysis per item',
      'Growth prediction algorithms',
      'Real-time inventory updates',
      'Multi-location support'
    ],
    timeline: [
      { phase: 'System Design', duration: '1 week', description: 'Database schema and architecture planning' },
      { phase: 'Core Features', duration: '4 weeks', description: 'Inventory management and sales tracking' },
      { phase: 'Analytics Engine', duration: '3 weeks', description: 'Forecasting and reporting features' },
      { phase: 'Testing', duration: '1 week', description: 'System testing and optimization' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'desktop'
  },
  {
    id: 'facial-recognition-attendance',
    title: 'Facial Recognition Attendance System',
    shortDescription: 'Python application using OpenCV for facial recognition-based attendance tracking with automated payroll generation.',
    fullDescription: 'An advanced attendance management system that uses facial recognition technology to automatically track employee attendance. The system includes automated payroll calculation, working hours tracking, and comprehensive reporting features. Built with OpenCV for computer vision and includes anti-spoofing measures for security.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Python', 'OpenCV', 'Facial Recognition', 'Payroll Automation'],
    technologies: [
      { name: 'Python', description: 'Core application development', category: 'backend' },
      { name: 'OpenCV', description: 'Computer vision and facial recognition', category: 'tools' },
      { name: 'dlib', description: 'Face detection and recognition algorithms', category: 'tools' },
      { name: 'SQLite', description: 'Local database for attendance records', category: 'database' }
    ],
    challenges: [
      {
        title: 'Facial Recognition Accuracy',
        description: 'Ensuring high accuracy in different lighting conditions and angles',
        solution: 'Implemented multiple face detection models and preprocessing techniques'
      },
      {
        title: 'Anti-Spoofing Security',
        description: 'Preventing attendance fraud using photos or videos',
        solution: 'Added liveness detection and multiple verification steps'
      }
    ],
    features: [
      'Real-time facial recognition',
      'Automated attendance logging',
      'Payroll calculation with overtime',
      'Working hours tracking',
      'Employee management system',
      'Comprehensive reporting',
      'Anti-spoofing security measures'
    ],
    timeline: [
      { phase: 'Research & Planning', duration: '1 week', description: 'Facial recognition technology research' },
      { phase: 'Core Development', duration: '5 weeks', description: 'Face detection and recognition implementation' },
      { phase: 'Payroll Integration', duration: '2 weeks', description: 'Automated payroll calculation system' },
      { phase: 'Security & Testing', duration: '2 weeks', description: 'Anti-spoofing measures and system testing' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'ai'
  },
  {
    id: 'restaurant-website',
    title: 'Restaurant Website Template',
    shortDescription: 'Complete restaurant website with blogging page for customers and owners, showcase gallery for menu, online ordering system.',
    fullDescription: 'A comprehensive restaurant website solution featuring online ordering, real-time order tracking, customer blogging platform, and administrative tools. Built with modern web technologies and Firebase for real-time functionality. Includes payment integration and customer management features.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Web Development', 'Firebase', 'Real-time Tracking', 'Authentication'],
    technologies: [
      { name: 'React', description: 'Frontend user interface', category: 'frontend' },
      { name: 'Firebase', description: 'Backend services and real-time database', category: 'database' },
      { name: 'Node.js', description: 'Server-side logic', category: 'backend' },
      { name: 'Stripe', description: 'Payment processing', category: 'api' }
    ],
    challenges: [
      {
        title: 'Real-time Order Tracking',
        description: 'Implementing live order status updates for customers',
        solution: 'Used Firebase real-time database with WebSocket connections'
      }
    ],
    features: [
      'Online menu showcase',
      'Order management system',
      'Real-time order tracking',
      'Customer blogging platform',
      'Table reservation system',
      'Payment integration',
      'Admin dashboard'
    ],
    timeline: [
      { phase: 'Design & Planning', duration: '1 week', description: 'UI/UX design and feature planning' },
      { phase: 'Frontend Development', duration: '4 weeks', description: 'React components and user interface' },
      { phase: 'Backend Integration', duration: '3 weeks', description: 'Firebase setup and API development' },
      { phase: 'Testing & Deployment', duration: '1 week', description: 'System testing and deployment' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'web'
  },
  {
    id: 'attention-span-platform',
    title: 'Attention Span Assessment Platform',
    shortDescription: 'Website with 4 tasks to measure attention span based on reaction time, featuring authentication using Firebase, payment integration with RazorPay.',
    fullDescription: 'A comprehensive psychology assessment platform designed to measure and analyze attention span through interactive tasks. The platform includes user authentication, payment processing, subscription management, and detailed analytics for both individual users and organizations.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Web Development', 'Firebase', 'RazorPay', 'Psychology Assessment'],
    technologies: [
      { name: 'React', description: 'Frontend framework for interactive UI', category: 'frontend' },
      { name: 'Firebase', description: 'Authentication and real-time database', category: 'database' },
      { name: 'RazorPay', description: 'Payment gateway integration', category: 'api' },
      { name: 'Chart.js', description: 'Data visualization for analytics', category: 'tools' }
    ],
    challenges: [
      {
        title: 'Accurate Reaction Time Measurement',
        description: 'Ensuring precise timing measurements across different devices and browsers',
        solution: 'Implemented high-resolution timing APIs with device calibration'
      },
      {
        title: 'Subscription Management',
        description: 'Creating flexible subscription plans for different organization sizes',
        solution: 'Built modular subscription system with customizable features'
      }
    ],
    features: [
      '4 different attention assessment tasks',
      'Real-time reaction time measurement',
      'User authentication and profiles',
      'Payment integration with RazorPay',
      'Subscription management system',
      'Detailed analytics and reports',
      'Organization dashboard',
      'Progress tracking'
    ],
    timeline: [
      { phase: 'Research & Design', duration: '2 weeks', description: 'Psychology research and UI/UX design' },
      { phase: 'Core Development', duration: '5 weeks', description: 'Assessment tasks and timing system' },
      { phase: 'Payment Integration', duration: '2 weeks', description: 'RazorPay integration and subscription system' },
      { phase: 'Testing & Launch', duration: '1 week', description: 'User testing and deployment' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'web'
  },
  {
    id: 'doctors-ecommerce-website',
    title: "Doctor's Website with E-commerce",
    shortDescription: 'Comprehensive website for a doctor with online booking and consultation features, integrated with an e-commerce platform for selling ayurvedic medicines.',
    fullDescription: 'A complete healthcare website solution combining medical consultation services with e-commerce functionality. Built on the Wix platform, it features appointment scheduling, patient management, online consultations, and an integrated store for ayurvedic medicines with inventory management.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
    ],
    tags: ['Wix Development', 'E-commerce', 'Online Booking', 'Healthcare'],
    technologies: [
      { name: 'Wix', description: 'Website builder and hosting platform', category: 'frontend' },
      { name: 'Wix Stores', description: 'E-commerce functionality', category: 'tools' },
      { name: 'Wix Bookings', description: 'Appointment scheduling system', category: 'tools' },
      { name: 'Custom CSS', description: 'Custom styling and responsive design', category: 'frontend' }
    ],
    challenges: [
      {
        title: 'Integration Complexity',
        description: 'Seamlessly integrating booking system with e-commerce functionality',
        solution: 'Used Wix APIs and custom workflows to connect different modules'
      },
      {
        title: 'Medical Compliance',
        description: 'Ensuring the website meets healthcare industry standards',
        solution: 'Implemented privacy policies and secure data handling practices'
      }
    ],
    features: [
      'Online appointment booking',
      'Patient consultation scheduling',
      'E-commerce store for medicines',
      'Inventory management',
      'Patient management system',
      'Secure payment processing',
      'Mobile-responsive design',
      'SEO optimization'
    ],
    timeline: [
      { phase: 'Planning & Design', duration: '1 week', description: 'Requirements gathering and design mockups' },
      { phase: 'Website Development', duration: '3 weeks', description: 'Wix platform customization and setup' },
      { phase: 'E-commerce Setup', duration: '2 weeks', description: 'Store configuration and product catalog' },
      { phase: 'Testing & Launch', duration: '1 week', description: 'Quality assurance and go-live' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'completed',
    category: 'web'
  }
];
