import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundParticles from './components/BackgroundParticles';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import icons
import {
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  Code2,
  Database,
  Wrench,
  GraduationCap,
  Globe,
  Star,
  Download,
  MapPin,
  Rocket,
  BookOpen,
  Award,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Lazy load 3D Components for performance
const Hero3D = React.lazy(() => import('./components/Hero3D'));
const SkillsGlobe = React.lazy(() => import('./components/SkillsGlobe'));
const ProjectCard = React.lazy(() => import('./components/ProjectCard'));
const ServicesCarousel = React.lazy(() => import('./components/ServicesCarousel'));
const BuildLog = React.lazy(() => import('./components/BuildLog'));

// Custom SVG Social Icons
const LinkedInIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Custom Section Header Component with staggered character reveal
function SectionHeader({ eyebrow, whiteText, cyanText }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 150 }
    }
  };

  return (
    <div className="flex flex-col items-center text-center mb-16 space-y-3">
      <span className="text-[11px] font-bold font-mono tracking-[0.25em] text-[#06B6D4] uppercase">
        ◆ {eyebrow} ◆
      </span>
      <motion.h2 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-white tracking-wide font-display uppercase"
      >
        {whiteText.split("").map((char, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {char === " " ? "\u00A5" : char}
          </motion.span>
        ))}
        {" "}
        <span className="text-[#06B6D4]">
          {cyanText.split("").map((char, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {char === " " ? "\u00A5" : char}
            </motion.span>
          ))}
        </span>
      </motion.h2>
      <div className="w-16 h-[3px] bg-[#06B6D4] mt-2 rounded"></div>
    </div>
  );
}

// Reusable Section Wrapper
function RevealSection({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 relative ${className}`}
    >
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/10 to-transparent pointer-events-none" />
      {children}
    </motion.section>
  );
}


// Animated stats counter
function StatCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isNumeric = !isNaN(parseFloat(value));

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (isNumeric) {
            const target = parseFloat(value);
            const duration = 2000; // 2 seconds
            const start = performance.now();
            
            const animate = (time) => {
              const progress = Math.min((time - start) / duration, 1);
              const easedProgress = progress * (2 - progress); // Ease out quadratic
              
              let current = easedProgress * target;
              if (value.toString().includes('.')) {
                setCount(current.toFixed(1));
              } else {
                setCount(Math.floor(current));
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(value);
              }
            };
            requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [value, isNumeric]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Import asset files securely
import zenpayLogin from './assets/zenpay/login.jpg';
import zenpayOTP from './assets/zenpay/otp.jpg';
import zenpayHome from './assets/zenpay/home.jpg';
import zenpayCard from './assets/zenpay/card.jpg';
import zenpayProfile from './assets/zenpay/profile.jpg';
import ContactForm from './components/ContactForm';
import ChatbotWidget from './components/ChatbotWidget';

function LandingPage() {
  const [activeCert, setActiveCert] = useState(null); // 'excelerate' | 'arch' | null
  const [imgErrors, setImgErrors] = useState({ excelerate: false, arch: false });

  // Calculate Build Log general stats for preview
  const totalDays = 40; // Static copy representing journal timeline length
  const completedDays = 11;
  const overallProgress = Math.round((completedDays / totalDays) * 100);
  const totalProjects = 2;

  // Projects dataset mapping
  const projectsList = [
    {
      title: "ZenPay — Premium Fintech Mobile App",
      description: "ZenPay is a production-grade, full-stack fintech mobile application built with React Native & Expo, designed to simulate a modern digital wallet and payment platform inspired by apps like Revolut, JazzCash, and Cashly.",
      tags: ["React Native", "Expo", "Expo Router", "Zustand", "Node.js", "Express", "Firebase Auth", "Cloud Firestore", "Stripe API", "Victory Native", "Render", "EAS Build"],
      githubLink: "https://github.com/tayabawan19/ZenPay",
      liveLink: "https://github.com/tayabawan19/ZenPay/releases",
      icon: Briefcase,
      gradientText: "MOBILE FINTECH",
      bgGradient: "from-[#06B6D4]/15 via-[#020817] to-[#020817]",
      achievements: [
        "Real-time P2P transfers with atomic transactions",
        "Live balance sync (event-driven, no polling)",
        "Firebase Auth + custom OTP email verification",
        "Stripe payment integration (test mode)",
        "Virtual card with 3D flip + freeze/unfreeze",
        "Spending analytics with category breakdown charts",
        "Biometric login + push notifications"
      ],
      screenshots: [
        { src: zenpayHome, caption: "Home Dashboard" },
        { src: zenpayCard, caption: "Virtual Card screen" },
        { src: zenpayProfile, caption: "Profile screen" },
        { src: zenpayLogin, caption: "Login/Welcome screen" },
        { src: zenpayOTP, caption: "Email OTP verification" }
      ]
    },
    {
      title: "PaceTrack — Full-Stack Running Tracker",
      description: "A production-ready mobile run tracker with live GPS route rendering, OTP verification, local storage, dashboard analytics, and text-to-speech coaching.",
      tags: ["React Native", "Expo", "Node.js", "MongoDB Atlas", "JWT"],
      githubLink: "https://github.com/tayabawan19/PaceTrack",
      icon: MapPin,
      gradientText: "MOBILE APP",
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
      title: "CropSense — Pakistan Agricultural Intelligence Platform",
      description: "A full-stack agricultural management system that digitizes farmer, crop, production, expense, and market data for Pakistan using MongoDB, Node.js, and a custom-built frontend.",
      tags: ["MongoDB", "Node.js", "Express", "HTML5", "CSS3", "JavaScript", "Aggregation Pipelines", "Index Optimization"],
      icon: Code2,
      gradientText: "AGRI PLATFORM",
      bgGradient: "from-[#3B82F6]/10 via-[#020817] to-[#020817]",
      achievements: [
        "Designed a 10-collection MongoDB document schema by migrating a full Oracle SQL relational model — demonstrating NoSQL denormalization and embedded document strategy",
        "Created 45 indexes across all 10 collections: system, unique, compound, single-field, and multikey (embedded array) indexes — eliminating full collection scans for fast queries",
        "Built a custom Index Manager UI tab showing all 45 indexes organized by collection with color-coded type badges and one-click mongosh query copy",
        "Used MongoDB aggregation pipelines ($group, $sum) on the dashboard to compute total yield per crop, total expenses per category, and farmer/crop counts in real time",
        "Implemented embedded document design — land parcels inside farms, expenses inside farm_records, prices inside markets — reducing the need for joins",
        "Built full CRUD operations across 10 entities: Farmers, Farms, Crops, Records, Production, Expenses, Markets, Weather, Districts, Admin — with live search and toast notifications"
      ]
    },
    {
      title: "Food Delivery System",
      description: "Console routing application modeling shortest path logistics for food deliveries using custom graph architectures and Dijkstra's algorithm.",
      tags: ["C++", "Dijkstra's Algorithm", "Data Structures"],
      githubLink: "https://github.com/tayabawan19",
      icon: Code2,
      gradientText: "ROUTE ROUTER",
      achievements: [
        "Implemented custom graph data structures using adjacency lists in C++",
        "Designed Dijkstra's shortest path routing algorithm to compute optimal delivery paths",
        "Developed a console-based interactive UI for node coordinates and logistics management",
        "Optimized pathfinding lookup operations with an efficient min-heap priority queue"
      ]
    },
    {
      title: "Quiz Application",
      description: "Interactive desktop quiz manager featuring administrative question authoring panels and modular design architectures in Java Swing.",
      tags: ["Java", "OOP", "Java Swing"],
      githubLink: "https://github.com/tayabawan19",
      icon: Award,
      gradientText: "DESKTOP APP",
      achievements: [
        "Engineered a modular Java Swing graphical user interface with responsive layouts",
        "Built administrative panels for real-time question authoring, editing, and deletion",
        "Integrated file-based questions loader supporting custom CSV and JSON formats",
        "Designed OOP state managers to keep track of user scores, timers, and active quizzes"
      ]
    },
    {
      title: "Digital Diary App",
      description: "Local logging utility employing stream I/O file operations to securely save, encrypt, and recall private user journal entries.",
      tags: ["Java", "File Handling", "Data Security"],
      githubLink: "https://github.com/tayabawan19",
      icon: BookOpen,
      gradientText: "LOGGING SYSTEM",
      achievements: [
        "Leveraged Java Stream I/O File handling APIs to persist local user text entries",
        "Implemented basic symmetric XOR encryption/decryption keys to protect diary text",
        "Built keywords index mapping to support instantaneous lookup of older entries",
        "Designed an elegant CLI terminal flow with user credentials authentication"
      ]
    },
    {
      title: "University Student Resource Ecosystem",
      description: "Engineered detailed requirements manuals (SRS) containing UML diagrams, database schemas, and Agile task models.",
      tags: ["SRS Documentation", "Systems Analysis", "Agile"],
      githubLink: "https://github.com/tayabawan19",
      icon: GraduationCap,
      gradientText: "ENGINEERING DOC",
      achievements: [
        "Authored an IEEE-compliant Software Requirements Specification (SRS) manual",
        "Designed comprehensive UML structural models, Class Diagrams, and Use Case flows",
        "Modeled normalized relational database schemas with exact cardinality rules",
        "Created Agile sprint backlogs, user story mappings, and Jira project boards"
      ]
    },
    {
      title: "Social Media Management Tool",
      description: "Mapped structural software engineering phases drafting SDLC models, risk mitigations, system designs, and testing logs.",
      tags: ["SDLC", "Software Engineering", "Risk Analysis"],
      githubLink: "https://github.com/tayabawan19",
      icon: Globe,
      gradientText: "MANAGEMENT SPEC",
      achievements: [
        "Drafted a complete Software Development Life Cycle (SDLC) model for a media suite",
        "Formulated a comprehensive project risk analysis matrix with quantitative mitigations",
        "Designed architectural blueprints covering load balancers and caching strategies",
        "Compiled rigorous manual testing logs, test plans, and black-box verification cycles"
      ]
    },
    {
      title: "JhootayShootay E-Commerce Store",
      description: "Operational WordPress storefront prototype hosted on Pantheon.io sandbox featuring WooCommerce payment flows and SEO tags.",
      tags: ["WordPress", "WooCommerce", "Pantheon.io", "SEO"],
      githubLink: "https://github.com/tayabawan19",
      liveLink: "https://dev-jootay-shootay.pantheonsite.io/",
      icon: Wrench,
      gradientText: "E-COMMERCE STORE",
      achievements: [
        "Developed and customized a modern shoe e-commerce store using WordPress CMS",
        "Configured WooCommerce settings, including catalog categorization and payment flows",
        "Deployed the active site sandbox environment to Pantheon.io hosting servers",
        "Optimized product pages with descriptive metadata tags for SEO crawl indexing"
      ]
    }
  ];

  // Skill sets grouped
  const skillCategories = [
    { title: "Languages", skills: ["Java", "C++", "Python", "TypeScript"] },
    { title: "Mobile/Frontend", skills: ["React Native", "Expo", "React"] },
    { title: "Backend", skills: ["Node.js", "Express", "REST API", "JWT"] },
    { title: "Cloud & Auth", skills: ["Firebase Auth", "Cloud Firestore", "Stripe API", "EAS Build", "Render"] },
    { title: "Databases", skills: ["MongoDB", "Oracle SQL", "Aggregation Pipelines", "Index Optimization"] },
    { title: "Machine Learning", skills: ["Python (ML)", "Data Analysis", "Model Development", "Scikit-learn"] },
    { title: "Tools & Platforms", skills: ["VS Code", "Figma", "Canva", "WordPress", "Git", "GitHub"] },
    { title: "Concepts", skills: ["OOP", "Data Structures", "SDLC", "SRS/SDS Documentation"] }
  ];

  const handleScrollTo = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: 'smooth'
        });
      }
    }
  };

  // GSAP ScrollTrigger timeline vertical line animation
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current || !dotRef.current || !timelineRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 60%",
        end: "bottom 70%",
        scrub: true,
      }
    });

    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top center" }, 
      { scaleY: 1, ease: "none" }
    );

    tl.fromTo(dotRef.current, 
      { top: "0%" }, 
      { top: "100%", ease: "none" },
      0
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden bg-transparent">
        {/* Glow grid helper */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06B6D4]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">

          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center space-x-2 text-[#06B6D4]"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em]">
                ◆ BS SOFTWARE ENGINEERING — COMSATS ISLAMABAD ◆
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display leading-tight"
            >
              Muhammad Tayyab Tanveer
            </motion.h1>

            {/* Developer Title */}
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-3xl md:text-5xl font-bold font-display leading-none text-white/90"
            >
              Full-Stack <span className="text-[#06B6D4]" style={{ textShadow: "0 0 30px rgba(6,182,212,0.25)" }}>Developer</span>
            </motion.h2>

            {/* Paragraph Description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm md:text-base text-white/55 leading-relaxed font-sans max-w-xl text-left"
            >
              Building real systems, one semester at a time at <span className="text-[#06B6D4] font-semibold">COMSATS University Islamabad</span>. Currently in my <span className="text-[#06B6D4] font-semibold">4th semester</span> with a <span className="text-[#06B6D4] font-semibold">CGPA of 3.1</span>, I specialize in crafting robust backend architectures, cross-platform mobile apps, and detailed engineering design manuals.
            </motion.p>

            {/* Social Icons (circular outline buttons) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center space-x-4 pt-2"
            >
              <a
                href="https://www.linkedin.com/in/tayabawan19"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/60 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href="https://github.com/tayabawan19"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/60 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href="mailto:tayabawan.in@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/60 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={() => handleScrollTo('#projects')}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all duration-300 font-mono shadow-md shadow-[#06B6D4]/20 hover:shadow-[#06B6D4]/40 cursor-pointer flex items-center space-x-1.5"
              >
                <span>View Projects →</span>
              </button>
              <a
                href="/resume.pdf"
                download="Tayyab_Tanveer_Resume.pdf"
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/15 hover:border-white hover:bg-white/5 rounded-md transition-all duration-300 font-mono cursor-pointer flex items-center space-x-1.5"
              >
                <span>Download CV ↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Column: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center items-center relative h-[380px] md:h-[480px] w-full"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#06B6D4] border-r-2" />
              </div>
            }>
              <Hero3D />
            </Suspense>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <RevealSection id="about">
        <SectionHeader eyebrow="MY JOURNEY" whiteText="About" cyanText="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* About Left: Text Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#06B6D4] text-left">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide mb-4 uppercase">
                Building real systems, one semester at a time
              </h3>
              <p className="text-sm md:text-base text-white/55 font-sans leading-relaxed mb-4">
                I am a 4th semester Software Engineering student at COMSATS University Islamabad (Main Campus) holding a CGPA of 3.1. I view software engineering not just as code syntax, but as building fully structural, performant, and well-designed solutions. My coursework challenges me to build functional projects every semester, applying computer science theory to direct deliverables.
              </p>
              <p className="text-sm text-white/35 font-sans leading-relaxed">
                During my AI-Powered Data Analysis remote internship at Excelerate, I applied parsing pipelines and statistical modeling concepts to real datasets. From Dijkstra route finders in C++ to custom React Native trackers and WordPress setups, my portfolio captures a continuous focus on system architectures and documentation standards.
              </p>
            </div>
          </div>

          {/* About Right: Stats counters */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* PROJECTS BUILT */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="9" />
              </h4>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">PROJECTS BUILT</span>
            </div>

            {/* INTERNSHIPS */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="2" />
              </h4>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">INTERNSHIPS</span>
            </div>

            {/* CGPA */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="3.1" />
              </h4>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">CGPA</span>
            </div>

            {/* SEMESTER */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="4" suffix="th" />
              </h4>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">SEMESTER</span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Skills Section */}
      <RevealSection id="skills">
        <SectionHeader eyebrow="TECHNICAL EXPERTISE" whiteText="Technical" cyanText="Skills" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* Skills Left: 3D Globe - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-6 flex justify-center items-center">
            <Suspense fallback={
              <div className="w-full h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#06B6D4] border-r-2" />
              </div>
            }>
              <SkillsGlobe />
            </Suspense>
          </div>

          {/* Skills Right: Grouped Category Badges */}
          <div className="col-span-12 lg:col-span-6 space-y-6 text-left">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="space-y-6"
            >
              {skillCategories.map((cat, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="space-y-2"
                >
                  <h4 className="text-xs font-bold font-mono tracking-widest text-white/55 uppercase flex items-center space-x-1.5">
                    <span className="text-[#06B6D4] font-extrabold">—</span>
                    <span>{cat.title}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3.5 py-2 text-xs font-mono font-bold bg-[#020817]/40 border border-white/5 hover:border-[#06B6D4]/40 text-white/80 hover:text-[#06B6D4] rounded-md transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* Services Section */}
      <RevealSection id="services">
        <SectionHeader eyebrow="SERVICES" whiteText="My" cyanText="Services" />
        <Suspense fallback={<div className="h-40 flex items-center justify-center text-white/30">Loading services...</div>}>
          <ServicesCarousel />
        </Suspense>
      </RevealSection>

      {/* Experience Section */}
      <RevealSection id="experience">
        <SectionHeader eyebrow="WORK EXPERIENCE" whiteText="Work" cyanText="Experience" />

        <div ref={timelineRef} className="relative w-full max-w-4xl mx-auto mt-16 pb-6">
          {/* Scroll-triggered Center Drawing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 transform -translate-x-1/2" />
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.5)] transform -translate-x-1/2" 
          />
          {/* Drifting glowing dot marker */}
          <div 
            ref={dotRef}
            className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.85)] border border-white transform -translate-x-1/2 z-20"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16">

            {/* Arch Technologies Node */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Node Circle */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#020817] border-2 border-[#06B6D4] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                <Briefcase className="text-[#06B6D4] w-4 h-4" />
              </div>

              {/* Left Card Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full md:w-[46%] pl-12 md:pl-0 md:pr-8"
              >
                <div className="glass-card p-6 md:p-8 rounded-2xl text-left border-t-2 border-t-[#06B6D4] hover:border-t-[#3B82F6] transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase">
                    April 2026 – May 2026  |  8 Weeks
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    Machine Learning Intern
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-[#06B6D4] mt-0.5">
                    Arch Technologies
                  </h4>
                  <p className="text-xs text-white/35 font-mono tracking-widest uppercase mt-1">
                    Remote Internship & Training Program
                  </p>

                  <ul className="mt-4 space-y-2 text-xs md:text-sm text-white/55 font-sans list-disc list-inside">
                    <li>Completed an 8-week remote Machine Learning Internship and Training Program at Arch Technologies — Pakistan's Digital AI Training Platform.</li>
                    <li>Gained hands-on experience with machine learning concepts, model development, and practical AI applications under senior mentorship.</li>
                    <li>Worked under guidance of Sr. Python Developer on Python-based ML workflows.</li>
                    <li>Awarded Certificate of Completion (Cert ID: 993817) upon successful program completion.</li>
                  </ul>

                  <button
                    onClick={() => setActiveCert('arch')}
                    className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 hover:border-[#06B6D4] hover:bg-[#06B6D4]/20 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
                  >
                    <span>VIEW CERTIFICATE</span>
                  </button>
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="hidden md:block w-[46%]" />
            </div>

            {/* Excelerate Node */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Node Circle */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#020817] border-2 border-[#06B6D4] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                <Briefcase className="text-[#06B6D4] w-4 h-4" />
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-[46%] order-first" />

              {/* Right Card Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full md:w-[46%] pl-12 md:pl-8"
              >
                <div className="glass-card p-6 md:p-8 rounded-2xl text-left border-t-2 border-t-[#06B6D4] hover:border-t-[#3B82F6] transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase">
                    2026 / 4-WEEK REMOTE INTERNSHIP
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    AI-Powered Data Analysis Intern
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-white/55 mt-0.5">
                    Excelerate (Global Remote)
                  </h4>
                  <p className="text-xs md:text-sm text-white/55 font-sans leading-relaxed mt-4">
                    Assisted in data parsing, cleaning, and model setups using Python scripts. Built analysis scripts to draw trends from raw database outputs, compiling automated reports and visuals.
                    <span className="mt-2 block text-white/35 font-medium">Supported by Rochester Institute of Technology's Tiger STRIPES Program. Completed April 9, 2026.</span>
                  </p>

                  <button
                    onClick={() => setActiveCert('excelerate')}
                    className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 hover:border-[#06B6D4] hover:bg-[#06B6D4]/20 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
                  >
                    <span>VIEW CERTIFICATE</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Academic Projects Node */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Node Circle */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#020817] border-2 border-[#06B6D4] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                <Rocket className="text-[#06B6D4] w-4 h-4" />
              </div>

              {/* Left Card Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full md:w-[46%] pl-12 md:pl-0 md:pr-8"
              >
                <div className="glass-card p-6 md:p-8 rounded-2xl text-left border-t-2 border-t-[#06B6D4] hover:border-t-[#3B82F6] transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase">
                    2024 – PRESENT
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    Academic Projects
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-[#06B6D4] mt-0.5">
                    COMSATS University Islamabad
                  </h4>
                  <p className="text-xs md:text-sm text-white/55 font-sans leading-relaxed mt-4">
                    Successfully designed and developed 7 core academic projects across Data Structures & Algorithms, Object-Oriented Programming, Software Requirement Engineering, and Mobile App Development. Handled full project cycle implementation from system modeling documents to live production rest APIs.
                  </p>
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="hidden md:block w-[46%]" />
            </div>

          </div>
        </div>
      </RevealSection>

      {/* Projects Section */}
      <RevealSection id="projects" className="max-w-7xl">
        <SectionHeader eyebrow="PORTFOLIO" whiteText="Featured" cyanText="Projects" />

        {/* 3-column / 2-column / 1-column grid layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
        >
          {projectsList.map((project, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Suspense fallback={
                <div className="h-96 rounded-[10px] border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20">
                  Loading project details...
                </div>
              }>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                  icon={project.icon}
                  gradientText={project.gradientText}
                  bgGradient={project.bgGradient}
                  achievements={project.achievements}
                  screenshots={project.screenshots}
                  number={idx + 1}
                />
              </Suspense>
            </motion.div>
          ))}
        </motion.div>
      </RevealSection>

      {/* Build Log Preview Section */}
      <RevealSection id="build-log-preview">
        <SectionHeader eyebrow="JOURNAL" whiteText="Build" cyanText="Log" />
        
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden text-left bg-gradient-to-br from-white/[0.02] to-transparent">
          {/* Radial cyan glow highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            {/* Stats & Info */}
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide uppercase">
                AI Engineering Roadmap
              </h3>
              <p className="text-xs md:text-sm text-white/55 font-sans leading-relaxed max-w-xl">
                Track my daily progress as I transition into AI Engineering. From classical machine learning to deep neural networks, computer vision, and building agentic LLM workflows.
              </p>
              
              {/* Condensed Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="bg-[#020817] p-4 rounded-xl border border-white/5">
                  <span className="block text-[9px] font-mono text-white/35 uppercase">Progress</span>
                  <span className="text-lg md:text-xl font-bold font-display text-white">{overallProgress}%</span>
                </div>
                <div className="bg-[#020817] p-4 rounded-xl border border-white/5">
                  <span className="block text-[9px] font-mono text-white/35 uppercase">Days Done</span>
                  <span className="text-lg md:text-xl font-bold font-display text-white">{completedDays} / {totalDays}</span>
                </div>
                <div className="bg-[#020817] p-4 rounded-xl border border-white/5">
                  <span className="block text-[9px] font-mono text-white/35 uppercase">Projects</span>
                  <span className="text-lg md:text-xl font-bold font-display text-white">{totalProjects}</span>
                </div>
              </div>
            </div>

            {/* Progress Circle & CTA */}
            <div className="flex flex-col items-center justify-center min-w-[200px] w-full md:w-auto space-y-6">
              {/* Radial Progress indicator */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-white/5 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-[#06B6D4] fill-none transition-all duration-1000"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - overallProgress / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-bold font-display text-white">{overallProgress}%</span>
                  <span className="text-[8px] font-mono text-white/35 uppercase">Completed</span>
                </div>
              </div>

              {/* View Full Build Log Button */}
              <Link
                to="/build-log"
                className="w-full text-center py-3 px-6 text-xs font-bold font-mono uppercase tracking-widest text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all duration-300 shadow-md shadow-[#06B6D4]/20 hover:shadow-[#06B6D4]/40 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>VIEW FULL BUILD LOG</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Client Reviews Section */}
      <RevealSection id="reviews">
        <SectionHeader eyebrow="TESTIMONIALS" whiteText="Client" cyanText="Reviews" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">
          {/* Review 1 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl text-left flex flex-col justify-between relative overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:border-[#06B6D4]/30">
            {/* Quote Mark */}
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#06B6D4]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex space-x-1 text-[#06B6D4]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#06B6D4]" />)}
              </div>

              <p className="text-sm italic text-white/80 font-sans leading-relaxed">
                "Tayyab's work on our group project's SRS documentation was incredibly thorough and well-structured. Very reliable teammate."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Haris Gul</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl text-left flex flex-col justify-between relative overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:border-[#06B6D4]/30">
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#06B6D4]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              <div className="flex space-x-1 text-[#06B6D4]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#06B6D4]" />)}
              </div>

              <p className="text-sm italic text-white/80 font-sans leading-relaxed">
                "He built the backend for our university project with clean, well-documented code. Impressive for a student at this level."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Ali Majeed</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl text-left flex flex-col justify-between relative overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:border-[#06B6D4]/30">
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#06B6D4]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              <div className="flex space-x-1 text-[#06B6D4]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#06B6D4]" />)}
              </div>

              <p className="text-sm italic text-white/80 font-sans leading-relaxed">
                "Tayyab consistently delivered quality work in our software engineering coursework. Strong problem-solver and great communicator."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Awais Shahid</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Contact Section */}
      <RevealSection id="contact">
        <SectionHeader eyebrow="CONTACT" whiteText="Get In" cyanText="Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          {/* Contact Left: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Right: Detail Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            {/* CV Card */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold font-display text-white tracking-wide uppercase">
                Download My Resume
              </h3>
              <p className="text-xs md:text-sm text-white/55 font-sans leading-relaxed">
                Need a copy of my curriculum vitae for evaluation or internship applications? Download it directly here.
              </p>
              <a
                href="/resume.pdf"
                download="Tayyab_Tanveer_Resume.pdf"
                className="inline-flex px-6 py-3 bg-[#020817] border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer items-center space-x-2"
              >
                <Download size={14} className="text-[#06B6D4]" />
                <span>DOWNLOAD CV ↓</span>
              </a>
            </div>

            {/* Social Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-white/55 uppercase">
                FIND ME ONLINE
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/tayabawan19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-[#020817]/40 border border-white/5 rounded-xl hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2.5 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg group-hover:scale-110 transition-transform">
                    <LinkedInIcon size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-white/35 uppercase">LinkedIn</span>
                    <span className="text-xs text-white font-sans font-medium">tayabawan19</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/tayabawan19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-[#020817]/40 border border-white/5 rounded-xl hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2.5 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg group-hover:scale-110 transition-transform">
                    <GitHubIcon size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-white/35 uppercase">GitHub</span>
                    <span className="text-xs text-white font-sans font-medium">tayabawan19</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:tayabawan.in@gmail.com"
                  className="flex items-center space-x-3 p-4 bg-[#020817]/40 border border-white/5 rounded-xl hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2.5 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-white/35 uppercase">Email</span>
                    <span className="text-xs text-white font-sans font-medium truncate max-w-[150px]">tayabawan.in@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+923269812642"
                  className="flex items-center space-x-3 p-4 bg-[#020817]/40 border border-white/5 rounded-xl hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2.5 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-white/35 uppercase">Phone</span>
                    <span className="text-xs text-white font-sans font-medium">+92 326 9812642</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <footer className="py-12 border-t border-[#06B6D4]/20 relative z-10 bg-[#020817]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-left md:max-w-xs space-y-1">
            <button
              onClick={() => window.lenis && window.lenis.scrollTo(0)}
              className="text-lg font-bold font-display tracking-tight text-white cursor-pointer"
            >
              TA<span className="text-[#06B6D4]">YYAB</span>
            </button>
            <p className="text-[11px] font-mono text-white/35 uppercase">
              Building real systems, one commit at a time.
            </p>
          </div>
          
          <p className="text-xs text-white/35 font-mono">
            &copy; {new Date().getFullYear()} Muhammad Tayyab Tanveer. All rights reserved.
          </p>
          <p className="text-[11px] text-white/45 font-mono flex items-center space-x-1.5">
            <span>REACT</span>
            <span className="text-[#06B6D4]">&bull;</span>
            <span>TAILWIND CSS</span>
            <span className="text-[#06B6D4]">&bull;</span>
            <span>THREE.JS</span>
            <span className="text-[#06B6D4]">&bull;</span>
            <span>FRAMER MOTION</span>
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-[#020817] border border-white/10 rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-2xl shadow-black animate-fade-in text-left">

            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>

            {/* Title & Download link */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-6 pr-8 space-y-2 sm:space-y-0">
              <h3 className="text-xl font-bold font-display text-[#06B6D4] tracking-wider uppercase">
                Certificate of Completion
              </h3>
              <a 
                href={activeCert === 'arch' ? '/certificate_arch.pdf' : '/certificate_excelerate.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#06B6D4]/10 border border-[#06B6D4]/20 hover:border-[#06B6D4] hover:bg-[#06B6D4]/20 text-white text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
              >
                <span>DOWNLOAD OFFICIAL PDF</span>
              </a>
            </div>

            {/* Render selected certificate */}
            {activeCert === 'arch' ? (
              /* Arch Technologies Certificate */
              !imgErrors.arch ? (
                <div className="w-full flex justify-center items-center bg-white/5 p-4 rounded-xl">
                  <img 
                    src="/certificate_arch.jpg" 
                    alt="Arch Technologies Certificate of Completion" 
                    className="w-full max-w-3xl h-auto object-contain rounded-lg border border-white/10 shadow-lg"
                    onError={() => setImgErrors(prev => ({ ...prev, arch: true }))}
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] min-h-[300px] md:min-h-[450px] bg-white text-black p-6 md:p-12 border-[12px] border-[#0ea5e9] rounded shadow-2xl relative flex flex-col justify-between font-sans select-none overflow-hidden text-left">
                  <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-br from-[#0ea5e9]/20 via-transparent to-transparent pointer-events-none transform -skew-x-12 -translate-x-10"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-tl from-[#0ea5e9]/20 via-transparent to-transparent pointer-events-none transform -skew-x-12 translate-x-10"></div>

                  <div className="flex justify-between items-start border-b pb-4 border-gray-200">
                    <div className="text-left">
                      <span className="text-sm font-bold tracking-widest text-[#0ea5e9] uppercase">ARCH TECHNOLOGIES</span>
                      <span className="block text-[8px] text-gray-400 font-mono tracking-wider">PAKISTAN'S DIGITAL AI PLATFORM</span>
                    </div>
                    <div className="w-20 h-20 rounded-full border-4 border-double border-[#0ea5e9] bg-[#0ea5e9]/5 flex flex-col items-center justify-center text-center p-2 transform rotate-12 shadow-sm">
                      <span className="text-[6px] font-extrabold text-[#0ea5e9] uppercase leading-none">ARCH TECH</span>
                      <span className="text-[4px] text-gray-500 font-mono leading-none mt-1">APPROVED</span>
                    </div>
                  </div>

                  <div className="my-auto text-center space-y-4 py-2">
                    <h4 className="text-3xl md:text-5xl font-extrabold tracking-wider text-slate-800 uppercase font-display leading-none">
                      Certificate
                    </h4>
                    <p className="text-sm md:text-base font-bold tracking-widest text-[#0ea5e9] uppercase leading-none">
                      of Completion
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-mono">
                      The following award is given to
                    </p>
                    
                    <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold text-blue-900 border-b-2 border-blue-900/10 inline-block px-12 py-1 tracking-wide">
                      Muhammad Tayyab Tanveer
                    </h2>
                    
                    <p className="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mt-2 font-medium">
                      This certificate is awarded to Muhammad Tayyab Tanveer for completion of <br/>
                      <span className="font-extrabold text-slate-900">Machine Learning Internship and Training Program</span> <br/>
                      by <span className="font-extrabold text-[#0ea5e9]">Arch Technologies</span> from 1st April to 30th May 2026 (8 Weeks).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t pt-4 border-gray-200 text-slate-650 space-y-4 sm:space-y-0 text-center sm:text-left">
                    <div className="space-y-1 text-left">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">M.A Rehman</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">M.A REHMAN</div>
                      <div className="text-[8px] text-slate-400 leading-none">CEO & Founder</div>
                    </div>

                    <div className="space-y-1 text-center sm:text-right">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Faraz Malik</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">MR. FARAZ MALIK</div>
                      <div className="text-[8px] text-slate-400 leading-none">Sr. Python Developer</div>
                    </div>
                  </div>

                  <div className="text-[8px] text-right text-slate-400 font-mono mt-2">
                    cert id: 993817
                  </div>
                </div>
              )
            ) : (
              /* Excelerate Certificate */
              !imgErrors.excelerate ? (
                <div className="w-full flex justify-center items-center bg-white/5 p-4 rounded-xl">
                  <img 
                    src="/certificate_excelerate.jpg" 
                    alt="AI Powered Data Analysis Certificate" 
                    className="w-full max-w-3xl h-auto object-contain rounded-lg border border-white/10 shadow-lg"
                    onError={() => setImgErrors(prev => ({ ...prev, excelerate: true }))}
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] min-h-[300px] md:min-h-[450px] bg-white text-black p-6 md:p-12 border-[12px] border-double border-orange-500 rounded shadow-2xl relative flex flex-col justify-between font-sans select-none overflow-hidden text-left">
                  <div className="absolute top-0 left-0.5 w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500"></div>
                  <div className="absolute bottom-0 left-0.5 w-8 h-8 border-b-4 border-l-4 border-orange-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500"></div>

                  <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                    <div className="flex items-center space-x-2 text-left">
                      <span className="text-lg md:text-xl font-extrabold tracking-tight text-orange-600 font-display">RIT</span>
                      <span className="text-[10px] md:text-xs text-gray-500 leading-tight uppercase font-medium border-l pl-2 border-gray-300">Rochester Institute<br/>of Technology</span>
                    </div>
                    <div className="text-lg md:text-xl font-bold tracking-tight text-rose-650 font-mono">
                      Excelerate
                    </div>
                  </div>

                  <div className="my-auto text-center space-y-4 py-4">
                    <h4 className="text-2xl md:text-4xl font-extrabold tracking-wider text-slate-800 uppercase font-display">
                      Certificate
                    </h4>
                    <p className="text-xs md:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                      of Achievement
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-500 italic">
                      This certificate is awarded to
                    </p>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 border-b-2 border-blue-900/10 inline-block px-8 py-1 tracking-wide font-display">
                      Tayyab Awan
                    </h2>
                    
                    <p className="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mt-2 font-medium">
                      in recognition of the successful completion of the <br/>
                      <span className="font-extrabold text-slate-900">AI Powered Data Analysis Remote Internship</span> <br/>
                      supported by <span className="font-extrabold text-slate-900">Rochester Institute of Technology's Tiger STRIPES Program</span>, and powered by <span className="font-extrabold text-slate-900">Excelerate</span>.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t pt-4 border-gray-200 text-slate-600 space-y-4 sm:space-y-0 text-center sm:text-left">
                    <div className="space-y-1 text-left">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Kathleen B. Davis</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">KATHLEEN DAVIS</div>
                      <div className="text-[8px] text-slate-400 leading-none">Vice President, Enrollment Management<br/>RIT</div>
                    </div>

                    <div className="w-14 h-14 border border-slate-200 flex items-center justify-center p-1 bg-white shadow-sm rounded-sm">
                      <svg className="w-full h-full text-slate-800" viewBox="0 0 29 29" fill="currentColor">
                        <path d="M0 0h7v7H0zm1 1v5h5V1zm1 1h3v3H2z" />
                        <path d="M22 0h7v7h-7zm1 1v5h5V1zm1 1h3v3H24z" />
                        <path d="M0 22h7v7H0zm1 1v5h5v-5zm1 1h3v3H2z" />
                        <path d="M20 20h5v5h-5zm1 1v3h3v-3zm1 1h1v1h-1z" />
                        <path d="M9 0h1v2H9zm3 0h2v1H2zm4 0h1v1H1zm2 0h2v1H2z" />
                        <path d="M9 2h3v1H9zm4 1h1v2H1zm2-1h1v1H1zm2 0h2v2H2z" />
                        <path d="M0 9h1v3H0zm2 0h2v1H2zm4 0h1v2H6zm3 0h3v1H9zm4 0h2v2H2zm4 0h1v1H1zm3 0h2v1H2z" />
                        <path d="M1 10h1v1H1zm3 1h2v1H4zm5 0h1v2H9zm4 0h3v1H3zm5 0h1v1H1zm2 0h2v2H2z" />
                        <path d="M0 13h2v1H0zm3 0h1v2H3zm5 0h3v1H8zm4 0h1v1H1zm2 0h2v2H2zm5 0h1v1H1zm2 0h3v1H3z" />
                        <path d="M1 15h1v1H1zm4 0h1v1H5zm3 0h1v1H8zm2 0h2v2H2zm5 0h1v1H1zm3 0h2v1H2z" />
                        <path d="M0 18h3v1H0zm4 0h1v1H4zm5 0h2v1H9zm3 0h3v2H3zm4-1h1v2H1zm3 1h2v1H2zm3 0h1v1H1z" />
                        <path d="M1 20h1v1H1zm5 0h2v1H6zm10 0h2v1H2zm4 0h1v1H1z" />
                        <path d="M9 22h2v1H9zm4 0h1v2H1zm3 0h2v1H2z" />
                        <path d="M9 25h1v3H9zm3 0h2v1H2zm4 0h1v1H1zm3 0h2v1H2z" />
                        <path d="M10 26h1v1H1zm4 1h1v1H1zm2-1h1v1H1z" />
                      </svg>
                    </div>

                    <div className="space-y-1 text-center sm:text-right">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Sundar Kumarasamy</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">SUNDAR KUMARASAMY</div>
                      <div className="text-[8px] text-slate-400 leading-none">Chief Executive Officer<br/>Excelerate</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-slate-500 font-mono mt-4">
                    Date of Completion: <span className="font-bold text-slate-800">April 9, 2026</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  // Lenis smooth scroll initialization
  useEffect(() => {
    // Check if prefers-reduced-motion is active
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    // Connect ScrollTrigger to Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-[#020817] text-[#F8FAFC] font-sans selection:bg-[#06B6D4]/30 selection:text-white">
        
        {/* Layered Animated Background (fixed behind everything) */}
        <BackgroundParticles />



        {/* Sticky Header Nav */}
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/build-log" element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center text-white font-mono">
                Loading build log journal...
              </div>
            }>
              <BuildLog />
            </Suspense>
          } />
        </Routes>

        {/* Floating Chatbot Assistant */}
        <ChatbotWidget />
      </div>
    </Router>
  );
}
