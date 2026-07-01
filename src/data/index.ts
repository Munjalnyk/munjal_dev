export const personalInfo = {
  name: 'Munjal Nayak',
  title: 'Hardware & Embedded Systems Engineer',
  roles: [
    'Embedded Systems Engineer',
    'Hardware Designer',
    'ETCS Application Engineer',
    'IoT Developer',
    'PCB Design Expert',
  ],
  bio: "Engineers Australia graduate member with a positive Migration Skills Assessment in Electrical Engineering (233311). Two years at Alstom designing SIL4 safety-critical railway signalling systems, plus hands-on IoT product development and embedded firmware. Currently pursuing a Master of Engineering Science at UNSW Sydney, specialising in Embedded Systems.",
  bioShort:
    'Building reliable, precise, and innovative electronic systems — from safety-critical railway signalling to smart IoT devices.',
  location: 'Sydney, NSW 2146',
  status: 'Open to Opportunities',
  email: 'munjal@outlook.in',
  phone: '+61 420 932 011',
  linkedin: 'https://linkedin.com/in/munjalnyk',
  github: 'https://github.com/yorocoboy1',
  website: 'https://www.munjal.dev',
  cvUrl: '/pdf/CV_Munjal_Nayak.pdf',
  heroimg: '/img/perfil.png',
  profileImg: '/img/hero.jpg',
  stats: [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects' },
    { value: '2', label: 'Publications' },
  ],
}

export const experiences = [
  {
    type: 'work' as const,
    role: 'ETCS Application Engineer',
    company: 'Alstom',
    duration: '2023 — 2025',
    location: 'Bengaluru, India',
    description: 'SIL4 Railway Signalling · Onboard Systems · Data Configuration',
    bullets: [
      'Configured and validated onboard ETCS data for 3 European Vital Computer platforms (EVC3, EVC2 Plus, EVC2) with 100% SIL4 compliance',
      'Reduced data configuration errors across 2 major railway projects serving 50,000+ daily passengers',
      'Led EVC3 data engineering for NCRTC MRTS Delhi and EVC2/EVC2P integration for Madrid ETCS Programme',
      'Authored technical documentation and knowledge transfer sessions, reducing engineer onboarding time',
    ],
    tags: ['SIL4', 'ETCS', 'Railway', 'EVC', 'Data Eng'],
  },
  {
    type: 'work' as const,
    role: 'Data Cable Technician',
    company: 'GM Cables',
    duration: 'Dec 2025 — Jan 2026',
    location: 'Sydney, Australia',
    description: 'Cat6A · Fiber Optics · Structured Cabling · Network Infrastructure',
    bullets: [
      'Installed and certified CAT5e/CAT6/CAT6A and fiber optic cabling for enterprise clients with 100% TIA/EIA compliance',
      'Deployed structured cabling infrastructure for schools, offices, and telecom facilities across Sydney metro',
      'Managed cable pathways maintaining optimal bend radii while adhering to safety standards in active construction zones',
    ],
    tags: ['Cat6A', 'Fiber Optics', 'Cabling', 'Network'],
  },
  {
    type: 'work' as const,
    role: 'IoT Developer Intern',
    company: 'Eleics Design',
    duration: '2023',
    location: 'Gandhinagar, India',
    description: 'ESP32 · Firmware · IoT Product Development',
    bullets: [
      'Developed production-ready embedded firmware for ESP32-based IoT products using ESP-IDF, contributing to 2 commercial product releases',
      "Led firmware development for 'WiDrive' product — PCB design input, protocol implementation, and system integration testing",
      'Implemented industrial communication protocols (SPI, UART, MQTT, HTTP, USB) with <100ms latency for real-time IIoT applications',
    ],
    tags: ['ESP32', 'ESP-IDF', 'PCB Design', 'MQTT', 'IoT'],
  },
  {
    type: 'education' as const,
    role: 'Master of Engineering Science (Electrical)',
    company: 'UNSW Sydney',
    duration: '2026 — Present',
    location: 'Sydney, Australia',
    description: 'Specialisation in Embedded Systems · Expected Graduation: 2028',
    bullets: [],
    tags: ['Embedded Systems', 'Hardware Design'],
  },
  {
    type: 'education' as const,
    role: 'B.Tech in Electrical Engineering',
    company: 'PDEU',
    duration: '2019 — 2023',
    location: 'India',
    description: 'CGPA 8.71/10 · Final Project 10/10 · 2 Research Papers · Washington Accord (NBA)',
    bullets: [],
    tags: ['Power Electronics', 'Signal Processing', 'ML'],
  },
]

export const skillCategories = [
  {
    category: 'Core Hardware',
    icon: 'Cpu',
    skills: [
      'PCB & Schematic Design',
      'Component Selection & Derating',
      'DFM / DFT',
      'SMD Soldering & Rework',
      'Oscilloscope & Mixed-Signal Debug',
      'Power Electronics',
      'Hardware Bring-up & Reverse Eng.',
    ],
  },
  {
    category: 'Embedded Systems',
    icon: 'Code2',
    skills: [
      'Embedded C (Bare-metal)',
      'ESP32 (ESP-IDF)',
      'STM32 Development',
      'Python Scripting',
      'UART / SPI / I2C',
      'MQTT / HTTP APIs',
      'RTOS Concepts',
    ],
  },
  {
    category: 'Systems & Networking',
    icon: 'Server',
    skills: [
      'Docker & Proxmox VE',
      'Ubuntu Server & Rocky Linux',
      'Windows Server & AD',
      'Azure IAM',
      'WireGuard & OPNsense',
      'PostgreSQL & MariaDB',
      'PKI & Certificate Mgmt',
    ],
  },
  {
    category: 'Safety & Quality',
    icon: 'Shield',
    skills: [
      'SIL4 Safety Standards',
      'Configuration Management',
      'Git / GitHub',
      'Test Planning & Docs',
      'EMC / ESD Awareness',
      'Requirements Traceability',
    ],
  },
  {
    category: 'Product & Project',
    icon: 'ClipboardList',
    skills: [
      'Requirements Elicitation',
      'Technical Specification',
      'Documentation & Review',
      'Cross-functional Coordination',
      'Project Planning & Estimation',
      'Stakeholder Communication',
    ],
  },
  {
    category: 'Communication',
    icon: 'Users',
    skills: [
      'Clear Written & Verbal Comm.',
      'Structured Problem Solving',
      'Ownership Mindset',
      'Independent & Team Work',
      'IELTS Band 7 (English)',
    ],
  },
]

// To make a certificate clickable, fill in `href`:
//   - external link:   href: 'https://www.credly.com/badges/xxxx'
//   - uploaded image:  put the file in assets/img/ and use  href: '/img/cert-ibm.jpg'
// Leave href as '' to keep it as plain (non-clickable) text.
export const certifications: { name: string; href: string }[] = [
  { name: 'IBM — Introduction to Cloud Computing', href: '' },
  { name: 'Microsoft — ML Models in Azure', href: '' },
  { name: 'Red Hat — Fundamentals of RHEL', href: '' },
  { name: 'MathWorks — Power Electronics Simulation', href: '' },
  { name: 'IBM — Git and GitHub', href: '' },
  { name: 'Keysight — Essential RF Power Measurements', href: '' },
  { name: 'IIT Bombay — Incubation & Entrepreneurship', href: '' },
  { name: 'UC Irvine — Raspberry Pi & Python', href: '' },
  { name: 'Coursera — Docker for Beginners', href: '' },
]

export const licenses = [
  'Unrestricted Car & Rider License',
  'First Aid & CPR',
  'Heavy Rigid (Learner)',
  'Forklift & Order Picker',
  'White Card',
  'Blue Card (WWCC)',
  'NDISWC',
]

export const projects = [
  {
    title: 'NCRTC MRTS Delhi — EVC3 Onboard',
    category: 'Professional · Railway',
    description:
      'Led onboard EVC3 data engineering for MRTS trains in the NCRTC project — configuration data preparation, validation, and cross-functional coordination serving 50,000+ daily passengers.',
    tags: ['Onboard ETCS', 'Data Engineering', 'SIL4', 'EVC3'],
    accent: '#00e5ff',
    image: '/img/MRTS.jpeg',
    featured: true,
    link: 'https://ncrtc.in/details/',
  },
  {
    title: 'IoT Smart Panel — Motor Control',
    category: 'IoT · Industrial',
    description:
      'ESP32-based IoT controller to manage a three-phase induction motor via VFD with cloud connectivity for data logging and predictive analysis.',
    tags: ['ESP32', 'VFD', 'Industrial IoT', 'MQTT', 'Cloud'],
    accent: '#7c3aed',
    image: '/img/1.jpg',
    featured: false,
    link: '',
  },
  {
    title: 'IoT Smart Irrigation System',
    category: 'Smart Home · Agriculture',
    description:
      'ESP32 + Home Assistant based smart irrigation for soil moisture and temperature monitoring with automated per-plant watering.',
    tags: ['ESP32', 'Home Assistant', 'Sensors', 'Automation'],
    accent: '#10b981',
    image: '/img/portfolio1.png',
    featured: false,
    link: '',
  },
  {
    title: '5-Level Multilevel Inverter',
    category: 'Power Electronics',
    description:
      '5-level H-bridge inverter using 5 MOSFETs with STM32 control. Focused on switching strategy optimisation, efficiency, and safe low-power operation.',
    tags: ['STM32', 'Power Electronics', 'MOSFETs', 'PWM'],
    accent: '#f59e0b',
    image: '/img/portfolio4.jpg',
    featured: false,
    link: '',
  },
]

export const testimonials = [
  {
    name: 'Amit Gohel',
    role: 'CEO',
    company: 'eleics design',
    image: '/img/amit_gohel.jpg',
    quote:
      'As CEO of eleics, I had the pleasure of working with Munjal during his time as an intern at Eleics Design Private Limited, and I must say that he has exceeded my expectations. Munjal is a brilliant out-of-the-box thinker and a quick problem solver. He is a true all-rounder, who was able to contribute effectively to multiple projects during his time with us. I was particularly impressed with his ability to take the initiative and work independently when necessary. he was able to complete his assigned tasks in a timely and efficient manner, and his contributions to the team were always of high quality. Overall, I would highly recommend Munjal for any future role. His skills, work ethic, and attitude make them a valuable asset to any team or organization.',
  },
  {
    name: 'Pavan Venkata',
    role: 'Assistant Professor',
    company: 'PDEU',
    image: '/img/pavan-venkata.jpeg',
    quote:
      'Hey.. This is Dr. Pavan Venkata and I am working as an Assistant Professor in the Electrical Engineering Department of Pandit Deendayal Energy University. Munjal Nayak is pursuing his B.Tech in our department of PDEU and I am his faculty advisor for the last four years. I have taught him Analog and Digital Electronics (Theory and Lab), Power system Protection Laboratory courses in his under graduation. I found him very obedient with lots of respect towards elders and faculties. He is very enthusiastic about learning new things and always asks very important questions during lectures and laboratory sessions. I have seen him so many times in the laboratory doing some sort of experiments during his free time. He is a good human being with a positive attitude. I wish him all the best in his all endeavours.',
  },
  {
    name: 'Meera Karamta',
    role: 'Assistant Professor',
    company: 'PDEU',
    image: '/img/meera.karamta_photo.jpg',
    quote:
      'When it comes to academics, Munjal is extremely dedicated. I see the urge in him to succeed in his work by challenging himself and through hard-work. He was always an active participant in classroom discussions and comes along with new ideas. He possesses remarkable skill to think out of the box. He was keen to apply the theoretical classroom learning into projects and prototypes. He performed well in all the courses taught by me which reflects his disciplined attitude towards learning. Munjal is a person of perseverance. He is one of the students who leaves a remarkable impression through his dedication. He possesses qualities that makes him thrive in challenging environment.',
  },
  {
    name: 'Dr. Manju bhashini',
    role: 'Assistant Professor',
    company: 'PDEU',
    image: '',
    quote:
      'Munjal is an exceptionally talented and dedicated engineer. He has a firm root in the essential subjects and stands above in understanding and responding to questions. He also strongly desires to know about recent technology and aspires to contribute to that field. I have observed him grow into an individual who excels in all academic pursuits. It is evident he has a passion for electrical engineering, and his attention to detail is unmatched. Additionally, he is a voracious learner seeking learning opportunities in every session. I noticed from his submission works he solves problems independently and consistently delivers high-quality work. He is always looking for ways to improve and innovate. It was a pleasant experience to teach, and he has my support.',
  },
]

export const publications = [
  {
    journal: 'ELSEVIER — Engineering Applications of Artificial Intelligence',
    title:
      'An explainable artificial intelligence based approach for the prediction of key performance indicators for a 1 megawatt solar plant under local steppe climate conditions.',
    year: '2023',
  },
  {
    journal: 'ICSECT 2022 — International Conference',
    title:
      'Using machine learning techniques to predict the effect of different parameters on inverter efficiency.',
    year: '2022',
  },
]
