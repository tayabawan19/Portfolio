import React from 'react';
import Navbar from './components/Navbar';
import BackgroundParticles from './components/BackgroundParticles';
import Hero3D from './components/Hero3D';
import SectionWrapper from './components/SectionWrapper';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import ChatbotWidget from './components/ChatbotWidget';
import { motion } from 'framer-motion';
import tayyabPhoto from './assets/tayyab.jpeg';
import {
  Mail,
  Phone,
  Award,
  BookOpen,
  Briefcase,
  ArrowRight,
  Code2,
  Database,
  Wrench,
  GraduationCap,
  MessageSquare,
  Globe,
  Star,
  Quote,
  Calendar,
  FileText,
  MapPin,
  Download,
  User
} from 'lucide-react';

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function App() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const projects = [
    {
      title: "PaceTrack — Full-Stack Running Tracker Mobile App",
      description: "A full-stack mobile running tracker app with live GPS tracking, route planning, and gamified motivation features, deployed end-to-end (backend hosted on Render, distributable Android APK via EAS Build).",
      tags: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "MongoDB Atlas", "JWT"],
      role: "Solo Full-Stack Developer",
      path: "~/projects/pacetrack",
      isFeatured: true,
      githubMobile: "https://github.com/tayabawan19/PaceTrack",
      githubBackend: "https://github.com/tayabawan19/PaceTrack-backend",
      achievements: [
        "Built a secure authentication system with email OTP verification, bcrypt password/OTP hashing, and JWT session management",
        "Implemented real-time GPS run tracking using Haversine distance calculation for live pace/distance updates",
        "Integrated third-party routing (OSRM API) for road-accurate route planning with live polyline rendering on interactive maps",
        "Designed a MongoDB aggregation pipeline for dashboard analytics (daily/weekly stats, streak calculation, achievement unlocking logic)",
        "Built a gamification system (streaks, achievement badges) and local push notification engine",
        "Implemented voice-guided run coaching using text-to-speech triggered at distance milestones",
        "Designed a full light/dark theme system with persisted user preferences",
        "Deployed a production REST API on Render connected to MongoDB Atlas, shipped Android build via EAS"
      ]
    },
    {
      title: "Food Delivery System",
      description: "Designed an efficient route-finding food delivery console app implementing Dijkstra's algorithm to compute shortest paths for quick order routing.",
      tags: ["C++", "Dijkstra's Algorithm", "OOP", "Data Structures"],
      link: "#",
      path: "~/projects/food-delivery"
    },
    {
      title: "Quiz Application",
      description: "Developed an interactive desktop quiz engine using Object-Oriented Programming (OOP) design patterns and Java Swing for GUI layouts.",
      tags: ["Java", "OOP", "Java Swing", "Desktop App"],
      link: "#",
      path: "~/projects/quiz-app"
    },
    {
      title: "Digital Diary App",
      description: "Created a local personal diary application using Java File I/O stream mechanisms for persistent, secure diary entry storage.",
      tags: ["Java", "File Handling", "Stream I/O", "Data Security"],
      link: "#",
      path: "~/projects/digital-diary"
    },
    {
      title: "Student Resource Ecosystem App",
      description: "Authored detailed Software Requirements Specification (SRS) documentation including comprehensive UML models, architectures, and user journeys.",
      tags: ["SRS Documentation", "UML Modeling", "Systems Analysis", "Software Engineering"],
      link: "#",
      path: "~/projects/student-ecosystem"
    },
    {
      title: "Online Social Media Management Tool",
      description: "Mapped and engineered the full Software Development Life Cycle (SDLC) process modeling from requirements elicitation to deployment plan.",
      tags: ["SDLC Documentation", "Agile Methodologies", "Risk Management", "System Design"],
      link: "#",
      path: "~/projects/social-media-tool"
    },
    {
      title: "JhootayShootay E-Commerce Store",
      description: "Launched an operational e-commerce store with custom storefront layout patterns using WooCommerce and hosted on Pantheon.io environment.",
      tags: ["WordPress", "WooCommerce", "Pantheon.io", "Web Design"],
      link: "#",
      path: "~/projects/jhootay-shootay"
    }
  ];

  const skillGroups = [
    {
      title: "Languages",
      icon: <Code2 size={22} className="text-[#E91E63]" />,
      skills: ["Java", "C++", "Python"]
    },
    {
      title: "Databases",
      icon: <Database size={22} className="text-[#E91E63]" />,
      skills: ["Oracle SQL", "MongoDB"]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={22} className="text-[#E91E63]" />,
      skills: ["VS Code", "Figma", "Canva", "WordPress"]
    },
    {
      title: "Core Concepts",
      icon: <GraduationCap size={22} className="text-[#E91E63]" />,
      skills: ["OOP", "Data Structures", "SDLC", "SRS/SDS Documentation"]
    }
  ];

  const testimonials = [
    {
      name: "Syed Izhan Shah",
      role: "Classmate / Group Project Teammate",
      quote: "Tayyab is an incredibly reliable teammate. In our software engineering labs, he took the lead on building the core algorithms and ensured our team hit every milestone on time. His dedication is unmatched.",
      avatarBg: "from-pink-500 to-rose-600"
    },
    {
      name: "Dr. Hamza Shah",
      role: "Course Instructor",
      quote: "Muhammad Tayyab stands out in academic execution. His project submissions for OOP and Data Structures demonstrated a level of code organization and algorithmic understanding that is rare for a 4th-semester student.",
      avatarBg: "from-purple-500 to-indigo-600"
    },
    {
      name: "Haris Gul",
      role: "Classmate / Project Teammate",
      quote: "Working with Tayyab on the Food Delivery System Dijkstra implementation was a great learning experience. He is excellent at problem-solving and writes highly structured, clean code.",
      avatarBg: "from-amber-500 to-orange-600"
    }
  ];

  const blogs = [
    {
      title: "Building a Dijkstra Router in C++",
      category: "Data Structures",
      date: "August 2026",
      desc: "An in-depth look at how we implemented route planning in a C++ console application, optimized using custom graph representations.",
      readTime: "5 min read"
    },
    {
      title: "System Architecture: Drafting an SRS Document",
      category: "Software Engineering",
      date: "September 2026",
      desc: "Best practices for writing Software Requirements Specification (SRS) documents with UML diagrams for modern engineering classes.",
      readTime: "7 min read"
    },
    {
      title: "OOP Design Principles in Java Swing",
      category: "Java GUI",
      date: "October 2026",
      desc: "A clean walkthrough of writing modular, decoupled Java desktop GUIs using OOP principles, MVC architecture, and event handling.",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0B0D] text-gray-300 font-sans selection:bg-[#E91E63]/30 selection:text-white">
      {/* 3D Particle Field background */}
      <BackgroundParticles />

      {/* Floating navigation header */}
      <Navbar />

      {/* Hero Section */}
      <SectionWrapper id="home" className="pt-32 md:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero details */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-[#E91E63]">
              <span className="h-px w-8 bg-[#E91E63]"></span>
              <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                Welcome to my world
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-space leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Muhammad Tayyab Tanveer</span>
            </h1>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 font-space">
              a <span className="text-[#E91E63]">Software Engineering Student</span>.
            </h3>

            <div className="border-l-2 border-[#E91E63] pl-4 py-1">
              <p className="text-base md:text-lg text-gray-300 font-medium font-sans">
                COMSATS University Islamabad
              </p>
              <p className="text-xs text-[#E91E63] uppercase tracking-wider font-semibold font-mono mt-1">
                4th Semester &bull; CGPA 3.1
              </p>
            </div>

            <p className="text-sm md:text-base text-gray-400 font-sans max-w-lg leading-relaxed">
              Passionate about building real systems from structural coursework. Focused on backend program architectures, algorithm analysis, and structured software development life cycle modeling.
            </p>

            {/* Social & Actions */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  onClick={(e) => handleScrollTo(e, '#projects')}
                  className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E91E63] hover:bg-[#C2185B] rounded-md transition-all font-mono shadow-md shadow-[#E91E63]/20 flex items-center space-x-2 cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-md transition-all font-mono cursor-pointer"
                >
                  Contact Me
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-4 border-l border-white/10 pl-6 h-8">
                <a
                  href="https://linkedin.com/in/tayyab-tanveer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E91E63] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/tayyab-tanveer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E91E63] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:tayabawan.in@gmail.com"
                  className="text-gray-400 hover:text-[#E91E63] transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Column: Portrait Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[350px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#121418]/90 to-[#1e222b]/80 border border-white/5 p-2 shadow-[0_0_50px_-12px_rgba(233,30,99,0.3)] group overflow-hidden">
              <div className="absolute inset-0 bg-[#E91E63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#E91E63] z-10"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#E91E63] z-10"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#E91E63] z-10"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#E91E63] z-10"></div>

              <div className="w-full h-full rounded-xl overflow-hidden bg-[#1e222b]">
                <img
                  src={tayyabPhoto}
                  alt="Muhammad Tayyab Tanveer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 animate-fade-in"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Mesh floating below / side elements */}
        <div className="w-full mt-20 border-t border-white/5 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E91E63] font-semibold">Interactive 3D Workspace</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-md">
              Grab, spin, and interact with the generative 3D model representing the structural layers of computer software.
            </p>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <Hero3D />
          </div>
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Secondary Photo on Left */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#121418]/90 to-[#1e222b]/80 border border-white/5 p-2 shadow-[0_0_50px_-12px_rgba(233,30,99,0.2)] group overflow-hidden">
              <div className="absolute inset-0 bg-[#E91E63]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 z-10"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 z-10"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 z-10"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 z-10"></div>

              <div className="w-full h-full rounded-xl overflow-hidden bg-[#1e222b]">
                <img
                  src={tayyabPhoto}
                  alt="Muhammad Tayyab Tanveer Portrait"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* About Bio Text on Right */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] font-semibold">
              Who I Am?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
              Building Real Software Systems Each Semester
            </h2>

            <p className="text-base text-gray-300 font-sans leading-relaxed">
              I am a Software Engineering student in my fourth semester at COMSATS University Islamabad, maintaining a CGPA of 3.1. I approach technology with an analytical mindset, seeking to understand the core logic, algorithms, and structural designs that drive computing. Rather than just learning syntax, I focus on constructing structured, performant, and fully documented applications.
            </p>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Each semester, I challenge myself to develop functional projects that apply theoretical concepts directly. From implementing custom graph routes with Dijkstra's algorithm to designing detailed Software Requirements Specification (SRS) manuals and launching e-commerce setups, I treat every coursework requirement as an opportunity to build portfolio-grade engineering systems.
            </p>

            <div className="pt-4 flex flex-wrap gap-6 items-center">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E91E63] hover:bg-[#C2185B] rounded-md transition-all font-mono shadow-md shadow-[#E91E63]/10 flex items-center space-x-2 cursor-pointer"
              >
                <Download size={14} />
                <span>Download CV</span>
              </a>
              <div className="flex space-x-8">
                <div>
                  <h4 className="text-2xl font-bold text-white font-space">3.1</h4>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">CGPA Achieved</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <h4 className="text-2xl font-bold text-white font-space">4th</h4>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Academic Semester</p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <h4 className="text-2xl font-bold text-white font-space">6+</h4>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Core Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] font-semibold">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
            Featured Projects
          </h2>
          <p className="text-sm text-gray-400 font-sans">
            A showcasing of semester-focused application development, requirements modeling, and web design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              isFeatured={project.isFeatured}
              role={project.role}
              path={project.path}
              githubMobile={project.githubMobile}
              githubBackend={project.githubBackend}
              achievements={project.achievements}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Skills Section */}
      <SectionWrapper id="skills">
        <div className="max-w-3xl text-left mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] mb-2 font-semibold">
            Technical Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
            Skills & Core Disciplines
          </h2>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="glass-card p-6 rounded-xl flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-[#E91E63]/10 rounded-lg">
                    {group.icon}
                  </div>
                  <h3 className="text-base font-bold text-white font-space">{group.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Proficiencies acquired and applied in project work, laboratories, and theory studies.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {group.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper id="testimonials">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] font-semibold">
            What They Say
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
            Academic & Teammate Reviews
          </h2>
          <p className="text-sm text-gray-400 font-sans">
            Feedback on collaborative systems building, academic leadership, and technical capability.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-xl flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 text-gray-800">
                <Quote size={40} className="opacity-15 text-[#E91E63]" />
              </div>
              <div className="space-y-6">
                {/* Quote Text */}
                <p className="text-sm italic text-gray-300 leading-relaxed font-sans relative z-10">
                  "{t.quote}"
                </p>

                {/* Avatar & Profile */}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarBg} flex items-center justify-center text-white font-bold font-space text-sm`}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-space">{t.name}</h4>
                    <p className="text-xs text-[#E91E63] font-mono mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper id="blog">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] font-semibold">
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
            Tech Blog & Articles
          </h2>
          <p className="text-sm text-gray-400 font-sans">
            Insights on data structure implementations, software architecture studies, and engineering techniques.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-[#121418]/40 text-left flex flex-col justify-between h-full select-none"
            >
              {/* Overlay for Coming Soon */}
              <div className="absolute inset-0 bg-[#0A0B0D]/80 backdrop-blur-[2px] z-10 flex flex-col justify-center items-center p-6 text-center">
                <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#E91E63] rounded font-mono shadow-md shadow-[#E91E63]/20">
                  Coming Soon
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>{blog.category}</span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-300 font-space line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed line-clamp-3">
                  {blog.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 md:px-8 py-4 bg-white/3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{blog.readTime}</span>
                </span>
                <span className="text-gray-600 hover:text-gray-400 flex items-center space-x-1 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" className="pb-24">
        <div className="max-w-3xl text-left mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#E91E63] mb-2 font-semibold">
            Have a Question?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-space">
            Contact Me Now
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="text-base text-gray-400 font-sans leading-relaxed">
                Have inquiries about my academic coursework, collaborations, or project architectures? Drop a message here and let's coordinate.
              </p>

              {/* Detail list */}
              <div className="space-y-4 pt-4">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#E91E63]/10 text-[#E91E63] rounded-lg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono font-semibold uppercase">Email Address</div>
                    <a
                      href="mailto:tayabawan.in@gmail.com"
                      className="text-sm font-semibold text-white hover:text-[#E91E63] transition-colors font-sans"
                    >
                      tayabawan.in@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#E91E63]/10 text-[#E91E63] rounded-lg">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono font-semibold uppercase">Contact Number</div>
                    <a
                      href="tel:+923269812642"
                      className="text-sm font-semibold text-white hover:text-[#E91E63] transition-colors font-sans"
                    >
                      +92 326 9812642
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#E91E63]/10 text-[#E91E63] rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono font-semibold uppercase">Current Location</div>
                    <span className="text-sm font-semibold text-white font-sans">
                      Islamabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-6 lg:pt-0">
              <a
                href="https://linkedin.com/in/tayyab-tanveer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-white/5 text-gray-400 hover:bg-[#E91E63]/15 hover:text-[#E91E63] border border-white/5 rounded-full transition-all cursor-pointer shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/tayyab-tanveer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-white/5 text-gray-400 hover:bg-[#E91E63]/15 hover:text-[#E91E63] border border-white/5 rounded-full transition-all cursor-pointer shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 glass">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Muhammad Tayyab Tanveer. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 font-mono">
            React &bull; Tailwind CSS v4 &bull; Three.js &bull; Framer Motion
          </p>
        </div>
      </footer>

      {/* Floating rule-based chatbot widget */}
      <ChatbotWidget />
    </div>
  );
}
