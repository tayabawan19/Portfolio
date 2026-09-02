import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundParticles from './components/BackgroundParticles';
import AvatarVideo from './components/AvatarVideo';
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
  ChevronRight,
  Play,
  ExternalLink
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
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        {" "}
        <span className="text-[#06B6D4]">
          {cyanText.split("").map((char, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {char === " " ? "\u00A0" : char}
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
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 relative ${className}`}
    >
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/10 to-transparent pointer-events-none" />
      {children}
    </motion.section>
  );
}

// Animated stats counter that never flashes 0 and respects reduced-motion
function StatCounter({ value, suffix = "" }) {
  const isNumeric = !isNaN(parseFloat(value));
  // Default to the actual value so it renders immediately and never stays stuck on 0
  const [count, setCount] = useState(() => value);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !isNumeric) {
      setCount(value);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const target = parseFloat(value);
        const duration = 1400;
        const start = performance.now();
        
        const animate = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const easedProgress = progress * (2 - progress); // Quadratic ease-out
          
          const current = easedProgress * target;
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
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, isNumeric]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Import asset files securely
import zenpayLogin from './assets/zenpay/login.jpg';
import zenpayOTP from './assets/zenpay/otp.jpg';
import zenpayHome from './assets/zenpay/home.jpg';
import zenpayCard from './assets/zenpay/card.jpg';
import zenpayProfile from './assets/zenpay/profile.jpg';
import prooffolioDemo from './assets/prooffolio/demo.mp4';
import profilePhoto from './assets/tayyab.jpeg';
import ContactForm from './components/ContactForm';
import ChatbotWidget from './components/ChatbotWidget';
import CaseStudyModal from './components/CaseStudyModal';

function LandingPage() {
  const [activeCert, setActiveCert] = useState(null); // 'excelerate' | 'arch' | null
  const [imgErrors, setImgErrors] = useState({ excelerate: false, arch: false });
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [projectTab, setProjectTab] = useState('featured'); // 'featured' | 'all'

  // Calculate Build Log general stats for preview
  const totalDays = 40; // Static copy representing journal timeline length
  const completedDays = 14;
  const overallProgress = Math.round((completedDays / totalDays) * 100);
  const totalProjects = 3;

  // Featured Engineering Projects dataset
  const featuredProjects = [
    {
      id: "prooffolio",
      title: "ProofFolio — AI-Powered Student Project Marketplace",
      description: "A two-sided marketplace where students showcase real, working software and companies discover them to hire, license, or acquire — with Google Gemini AI auto-evaluating submissions to generate a maturity score, technical breakdown, and startup-style pitch.",
      tags: ["Next.js", "Supabase", "PostgreSQL", "Gemini AI", "Framer Motion", "GSAP", "Brevo API", "Row Level Security"],
      liveLink: "https://prooffolio-five.vercel.app/",
      githubLink: "https://github.com/tayabawan19",
      icon: Briefcase,
      gradientText: "Sole Developer & Product Owner",
      accentColor: "#06B6D4",
      isFlagship: true,
      video: prooffolioDemo,
      category: "Flagship AI Platform",
      problem: "Student developers build high-quality software, but their work gets buried in GitHub without objective technical validation, and companies struggle to discover verified talent or license academic prototypes.",
      solution: "A two-sided marketplace where students showcase working software and companies discover, evaluate, or license them, with Google Gemini AI automatically evaluating submissions to generate technical breakdowns, maturity scores, and startup pitches.",
      architecture: [
        { layer: "Frontend / Client", tech: "Next.js 14 App Router", detail: "Server components, responsive UI with Framer Motion & GSAP animations" },
        { layer: "Database & Security", tech: "Supabase PostgreSQL", detail: "Row Level Security (RLS) policies isolating user data at database level" },
        { layer: "AI Evaluation Engine", tech: "Google Gemini 2.5 Flash", detail: "Structured JSON prompts evaluating code complexity, maturity scores & pitches" },
        { layer: "Comms & Auth", tech: "Brevo API & WebSockets", detail: "Direct HTTPS OTP email verification + real-time presence and chat" }
      ],
      challenges: [
        { challenge: "Unreliable SMTP delivery chains in production", solution: "Re-architected the OTP verification system to direct HTTPS API calls to Brevo, bypassing SMTP entirely." },
        { challenge: "Client-side polling causing server strain and latency in chat", solution: "Migrated messaging to Supabase Realtime WebSocket channels with ephemeral typing indicators and presence." }
      ],
      achievements: [
        "Built a two-sided marketplace: student submission & management, company-side discovery with category, stack, and maturity score filters",
        "Integrated Google Gemini API (gemini-2.5-flash) generating structured technical breakdown, complexity ratings, and startup pitches",
        "Engineered custom OTP email verification (6-digit, 5-min expiry) via direct Brevo API",
        "Implemented real-time messaging with Supabase Realtime WebSockets, typing indicators, and presence",
        "Enforced Row Level Security (RLS) across all PostgreSQL tables via auth.uid() Postgres policies",
        "Built live GitHub integration fetching repository stars and last-updated activity",
        "Designed referral system unlocking featured placement on successful project referrals",
        "Built AI-powered agreement generation drafting licensing and hiring agreements on deal closure"
      ]
    },
    {
      id: "zenpay",
      title: "ZenPay — Fintech Mobile App",
      description: "ZenPay is a production-style, full-stack fintech mobile application built with React Native & Expo, designed to simulate a modern digital wallet with atomic balance transfers, interactive virtual cards, and category-based spending analytics.",
      tags: ["React Native", "Expo", "Expo Router", "Zustand", "Node.js", "Express", "Firebase Auth", "Cloud Firestore", "Stripe API"],
      githubLink: "https://github.com/tayabawan19/ZenPay",
      liveLink: "https://github.com/tayabawan19/ZenPay/releases",
      icon: Briefcase,
      gradientText: "Mobile Fintech Application",
      accentColor: "#06B6D4",
      category: "Mobile Fintech",
      problem: "Digital payment platforms require rock-solid balance integrity, immediate transaction feedback without polling, and intuitive mobile budgeting tools that work smoothly on both Android and iOS.",
      solution: "A production-style mobile wallet simulating instant peer-to-peer payments, biometric security, virtual cards with 3D flip effects, and category-based spending analytics.",
      architecture: [
        { layer: "Mobile App", tech: "React Native & Expo", detail: "Expo Router, Zustand global state, and custom gesture-driven interactions" },
        { layer: "Backend API", tech: "Node.js & Express", detail: "Modular REST endpoints handling transaction validation and user profiles" },
        { layer: "Database", tech: "Cloud Firestore", detail: "Atomic batch transactions guaranteeing consistent balances during P2P transfers" },
        { layer: "Auth & Payments", tech: "Firebase Auth & Stripe", detail: "Biometric login, email OTP verification, and Stripe payment integration" }
      ],
      challenges: [
        { challenge: "Race conditions in concurrent balance updates during P2P transfers", solution: "Implemented Firestore atomic transactions ensuring debits and credits succeed together or roll back cleanly." },
        { challenge: "Excessive battery usage caused by interval-based polling for balance changes", solution: "Replaced polling with real-time event-driven Firestore snapshot listeners." }
      ],
      achievements: [
        "Engineered real-time P2P transfers with Firestore atomic transactions",
        "Live balance sync driven by real-time event listeners (zero polling)",
        "Firebase Auth paired with custom email OTP verification",
        "Stripe payment integration (test mode) for wallet funding",
        "Interactive virtual card with 3D flip animations and freeze/unfreeze security toggles",
        "Spending analytics dashboard with category breakdown charts powered by Victory Native",
        "Biometric authentication (FaceID/Fingerprint) and push notification engine"
      ],
      screenshots: [
        { src: zenpayHome, caption: "Home Dashboard" },
        { src: zenpayCard, caption: "Virtual Card Screen" },
        { src: zenpayProfile, caption: "Profile Screen" },
        { src: zenpayLogin, caption: "Login / Welcome Screen" },
        { src: zenpayOTP, caption: "Email OTP Verification" }
      ]
    },
    {
      id: "pacetrack",
      title: "PaceTrack — Full-Stack Running Tracker",
      description: "A mobile running tracker built with React Native and Expo featuring real-time GPS tracking, Haversine distance calculation, OSRM road-accurate route rendering, and voice-guided TTS coaching.",
      tags: ["React Native", "Expo", "Node.js", "Express", "MongoDB Atlas", "JWT", "OSRM API"],
      githubLink: "https://github.com/tayabawan19/PaceTrack",
      icon: MapPin,
      gradientText: "GPS Mobile Tracker",
      accentColor: "#06B6D4",
      category: "Mobile Fitness",
      problem: "Casual runners need accurate distance tracking and pace guidance without expensive subscription fees or inaccurate straight-line GPS measurements.",
      solution: "A mobile run tracker that smooths GPS coordinates using Haversine formulas, plots road-accurate paths using OSRM, and coaches runners through text-to-speech milestone triggers.",
      architecture: [
        { layer: "Mobile Client", tech: "React Native & Expo", detail: "Expo Location background GPS polling and interactive map polyline rendering" },
        { layer: "Routing Engine", tech: "OSRM Public API", detail: "Snaps raw GPS points to real road geometry for accurate mileage" },
        { layer: "Backend API", tech: "Node.js & Express", detail: "REST service on Render with JWT authentication and bcrypt password hashing" },
        { layer: "Database", tech: "MongoDB Atlas", detail: "Aggregation pipelines computing streak records and weekly distance totals" }
      ],
      challenges: [
        { challenge: "Inaccurate pace measurements caused by noisy mobile GPS drift", solution: "Implemented a Haversine threshold filter that discards micro-jitter movements while stopped." }
      ],
      achievements: [
        "Secure authentication system with email OTP verification and JWT session management",
        "Real-time GPS run tracking with Haversine distance calculation for live pace and split times",
        "Integrated OSRM routing API for road-accurate route planning and interactive map polylines",
        "MongoDB aggregation pipelines computing daily/weekly stats, streaks, and achievement badges",
        "Voice-guided audio coaching using text-to-speech triggered at distance milestones",
        "Persistent light/dark theme system and Android EAS build distribution"
      ]
    },
    {
      id: "cropsense",
      title: "CropSense — Pakistan Agricultural Platform",
      description: "A full-stack agricultural management platform that digitizes farmer, crop, production, expense, and market data for Pakistan using MongoDB aggregation pipelines and 45 custom compound indexes.",
      tags: ["MongoDB", "Node.js", "Express", "JavaScript", "Aggregation Pipelines", "Index Optimization"],
      githubLink: "https://github.com/tayabawan19",
      icon: Code2,
      gradientText: "Agricultural Platform",
      accentColor: "#3B82F6",
      category: "Agricultural Intelligence",
      problem: "Pakistan's agricultural sector suffers from fragmented paper records, missing yield trends, and unoptimized market pricing channels across districts.",
      solution: "A centralized platform capturing 10 key entities with denormalized NoSQL schema design, eliminating joins and allowing instant aggregation of crop yields and regional pricing.",
      architecture: [
        { layer: "Frontend UI", tech: "Vanilla JS & HTML5/CSS3", detail: "Responsive dashboard with live search, custom index manager, and toast feedback" },
        { layer: "API Layer", tech: "Node.js & Express", detail: "REST endpoints handling CRUD operations and aggregation queries across 10 entities" },
        { layer: "Database", tech: "MongoDB Atlas", detail: "10 collections with 45 compound, single-field, and multikey indexes for sub-10ms queries" },
        { layer: "Data Modeling", tech: "Denormalized Schema", detail: "Embedded land parcels in farms and expenses in records to avoid multi-collection lookups" }
      ],
      challenges: [
        { challenge: "Slow dashboard aggregations across large historic production datasets", solution: "Created compound and multikey indexes specifically matching the $match and $group pipeline stages." }
      ],
      achievements: [
        "Designed a 10-collection MongoDB schema migrating a relational model into an optimized NoSQL strategy",
        "Created 45 custom indexes (system, unique, compound, multikey) eliminating full collection scans",
        "Built a custom Index Manager UI showing all indexes with color-coded badges and one-click mongosh queries",
        "Implemented MongoDB aggregation pipelines ($group, $sum) computing crop yields and district market prices",
        "Built full CRUD operations across 10 entities with live search and responsive management tables"
      ]
    }
  ];

  // Secondary & Academic Projects dataset
  const academicProjects = [
    {
      title: "Food Delivery System",
      subtitle: "Shortest Route Solver",
      description: "Console routing application modeling shortest path logistics for food deliveries using custom graph architectures and Dijkstra's algorithm in C++.",
      tags: ["C++", "Dijkstra's Algorithm", "Graph Data Structures", "Min-Heap"],
      githubLink: "https://github.com/tayabawan19",
      icon: Code2,
      achievements: [
        "Implemented custom graph data structures using adjacency lists in C++",
        "Designed Dijkstra's shortest path routing algorithm to compute optimal delivery paths",
        "Optimized pathfinding lookup operations with an efficient min-heap priority queue"
      ]
    },
    {
      title: "Quiz Application",
      subtitle: "Desktop Examination Manager",
      description: "Interactive desktop quiz manager featuring administrative question authoring panels and modular OOP design architectures in Java Swing.",
      tags: ["Java", "OOP", "Java Swing", "CSV/JSON Loader"],
      githubLink: "https://github.com/tayabawan19",
      icon: Award,
      achievements: [
        "Engineered a modular Java Swing graphical user interface with responsive layouts",
        "Built administrative panels for real-time question authoring, editing, and deletion",
        "Designed OOP state managers to keep track of user scores, timers, and active quizzes"
      ]
    },
    {
      title: "Digital Diary App",
      subtitle: "File Security Utility",
      description: "Local logging utility employing Java Stream I/O file operations to securely save, encrypt, and recall private user journal entries.",
      tags: ["Java", "Stream I/O", "Data Security", "CLI"],
      githubLink: "https://github.com/tayabawan19",
      icon: BookOpen,
      achievements: [
        "Leveraged Java Stream I/O File handling APIs to persist local user text entries",
        "Implemented symmetric encryption keys to protect diary text on disk",
        "Built keywords index mapping to support instantaneous lookup of older entries"
      ]
    },
    {
      title: "University Student Resource Ecosystem",
      subtitle: "Systems Engineering Document (SRS)",
      description: "Authored comprehensive Software Requirements Specification (SRS) manuals containing IEEE-compliant UML diagrams, normalized relational schemas, and Agile task models.",
      tags: ["SRS Documentation", "UML Modeling", "Database Design", "Agile"],
      githubLink: "https://github.com/tayabawan19",
      icon: GraduationCap,
      achievements: [
        "Authored an IEEE-compliant Software Requirements Specification (SRS) manual",
        "Designed comprehensive UML structural models, Class Diagrams, and Use Case flows",
        "Modeled normalized relational database schemas with exact cardinality rules"
      ]
    },
    {
      title: "Online Social Media Management Tool",
      subtitle: "Project Lifecycle Specification (SDLC)",
      description: "Mapped structural software engineering phases drafting SDLC models, risk mitigations, system architectural blueprints, and testing logs.",
      tags: ["SDLC", "Software Engineering", "Risk Analysis", "QA Testing"],
      githubLink: "https://github.com/tayabawan19",
      icon: Globe,
      achievements: [
        "Drafted a complete Software Development Life Cycle (SDLC) model for a media suite",
        "Formulated a comprehensive project risk analysis matrix with quantitative mitigations",
        "Compiled manual testing logs, test plans, and black-box verification cycles"
      ]
    },
    {
      title: "JhootayShootay E-Commerce Store",
      subtitle: "WordPress WooCommerce Prototype",
      description: "Operational WordPress storefront prototype hosted on Pantheon.io sandbox featuring WooCommerce payment flows, product catalog categorization, and SEO tags.",
      tags: ["WordPress", "WooCommerce", "Pantheon.io", "SEO"],
      githubLink: "https://github.com/tayabawan19",
      liveLink: "https://dev-jootay-shootay.pantheonsite.io/",
      icon: Wrench,
      achievements: [
        "Developed and customized a modern e-commerce store using WordPress CMS",
        "Configured WooCommerce catalog categorization and payment flows",
        "Optimized product pages with descriptive metadata tags for SEO crawl indexing"
      ]
    }
  ];

  // Combined for backwards-compatibility
  const projectsList = [...featuredProjects, ...academicProjects];

  // Reorganized Skill sets grouped according to specifications
  const skillCategories = [
    { title: "Languages", skills: ["Java", "C++", "Python", "JavaScript", "TypeScript"] },
    { title: "Frontend", skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { title: "Mobile", skills: ["React Native", "Expo", "Expo Router"] },
    { title: "Backend", skills: ["Node.js", "Express", "REST APIs", "JWT", "Brevo API"] },
    { title: "Databases", skills: ["PostgreSQL", "MongoDB", "Firebase Firestore", "Oracle SQL", "Row Level Security"] },
    { title: "AI / ML", skills: ["Python (ML)", "Scikit-Learn", "Google Gemini API", "Groq / Llama APIs", "Prompt Engineering"] },
    { title: "Tools & Platforms", skills: ["Git", "GitHub", "VS Code", "Figma", "Render", "Vercel"] },
    { title: "Core Engineering", skills: ["OOP", "Data Structures & Algorithms", "System Design", "SRS Documentation"] }
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
      <section id="home" className="min-h-[92vh] flex items-center pt-28 pb-16 relative overflow-hidden bg-transparent">
        {/* Subtle radial cyan glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06B6D4]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">

          {/* Hero Left Content: Narrative & Positioning */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center space-x-2 text-[#06B6D4]"
            >
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/25">
                ◆ Software Engineering Student @ COMSATS ◆
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]"
            >
              Muhammad Tayyab Tanveer
            </motion.h1>

            {/* Developer Direction */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-xl sm:text-2xl font-bold font-display text-[#06B6D4] tracking-wide"
            >
              Full-Stack & Mobile Developer <span className="text-white/30">|</span> AI/ML Enthusiast
            </motion.p>

            {/* Paragraph Description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm sm:text-base text-white/65 leading-relaxed font-sans max-w-xl text-left"
            >
              Software Engineering student at COMSATS University Islamabad building practical, production-style software across full-stack web platforms, mobile apps, and applied AI systems. Currently in my 5th semester with a 3.1 CGPA.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center space-x-3 pt-1"
            >
              <a
                href="https://github.com/tayabawan19"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="GitHub Profile (tayabawan19)"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/tayabawan19"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href="mailto:tayabawan.in@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Email (tayabawan.in@gmail.com)"
              >
                <Mail size={18} />
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo('#projects')}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all duration-300 font-mono shadow-md shadow-[#06B6D4]/20 hover:shadow-[#06B6D4]/40 cursor-pointer flex items-center space-x-2"
              >
                <span>View My Work</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => handleScrollTo('#contact')}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/15 hover:border-white hover:bg-white/5 rounded-md transition-all duration-300 font-mono cursor-pointer"
              >
                <span>Let's Connect</span>
              </button>
              <a
                href="/resume.pdf"
                download="Tayyab_Tanveer_Resume.pdf"
                className="px-4 py-3.5 text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Download size={14} className="text-[#06B6D4]" />
                <span>Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Column: Professional Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
              {/* Subtle ambient glow behind image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#06B6D4]/20 to-[#3B82F6]/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
              
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#020817] shadow-2xl p-2.5">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-white/[0.02]">
                  <img
                    src={profilePhoto}
                    alt="Muhammad Tayyab Tanveer - Software Engineer"
                    width={380}
                    height={475}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge: Active Status */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#020817]/85 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-white/90 uppercase tracking-wider">
                      Available for Opportunities
                    </span>
                  </div>

                  {/* Bottom Credentials Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#020817]/90 backdrop-blur-md border border-white/10 text-left">
                    <p className="text-xs font-bold text-white font-display">
                      Muhammad Tayyab Tanveer
                    </p>
                    <p className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider">
                      COMSATS SE • 5th Semester (3.1 CGPA)
                    </p>
                  </div>
                </div>

                {/* Video intro button toggle */}
                <div className="pt-2 px-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/40">
                    Islamabad, Pakistan
                  </span>
                  <button
                    onClick={() => handleScrollTo('#intro-video')}
                    className="text-[11px] font-mono text-[#06B6D4] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                  >
                    <Play size={12} className="fill-[#06B6D4]" />
                    <span>Watch Video Intro ↓</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <RevealSection id="about">
        <SectionHeader eyebrow="MY JOURNEY" whiteText="About" cyanText="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* About Left: Text Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-8 md:p-10 rounded-2xl border-l-4 border-l-[#06B6D4] text-left space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide uppercase">
                Building serious systems through practical engineering
              </h3>
              <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
                I am a Software Engineering student in my 5th semester at <span className="text-white font-medium">COMSATS University Islamabad</span> (CGPA 3.1). My approach to software is grounded in strong computer science fundamentals and learning by building real, practical applications that solve actual problems.
              </p>
              <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
                Over the past two years, I have built full-stack web platforms with <span className="text-[#06B6D4] font-medium">Next.js</span> and <span className="text-[#06B6D4] font-medium">Supabase</span>, mobile applications with <span className="text-[#06B6D4] font-medium">React Native</span> and <span className="text-[#06B6D4] font-medium">Expo</span>, and structured backend systems with <span className="text-[#06B6D4] font-medium">Node.js</span> and <span className="text-[#06B6D4] font-medium">MongoDB</span>. Through hands-on internships and independent work, I am actively expanding into machine learning and LLM integrations.
              </p>
              <p className="text-xs md:text-sm text-white/45 font-sans leading-relaxed pt-1">
                My ambition is to grow into an engineer who architects resilient distributed backends, clean mobile experiences, and intelligent AI-driven applications from first principles.
              </p>
            </div>
          </div>

          {/* About Right: Stats counters */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* PROJECTS BUILT */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1 transition-transform">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="10" suffix="+" />
              </h4>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">PROJECTS BUILT</span>
            </div>

            {/* INTERNSHIPS */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1 transition-transform">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="2" />
              </h4>
              <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">INTERNSHIPS</span>
            </div>

            {/* CGPA */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1 transition-transform">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="3.1" />
              </h4>
              <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">CGPA</span>
            </div>

            {/* SEMESTER */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center h-36 hover:-translate-y-1 transition-transform">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                <StatCounter value="5" suffix="th" />
              </h4>
              <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] mt-2 uppercase">SEMESTER</span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Dedicated Video Introduction Section */}
      <RevealSection id="intro-video" className="max-w-6xl">
        <SectionHeader eyebrow="MULTIMEDIA" whiteText="Video" cyanText="Introduction" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mt-6">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase">
                MEET THE ENGINEER
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
                Hi, I'm Muhammad Tayyab Tanveer
              </h3>
            </div>

            <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
              Watch this interactive introduction to learn about my engineering philosophy, technical journey across full-stack web and mobile development, and my ongoing projects at COMSATS University Islamabad.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#020817] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] mt-2 shrink-0 shadow-[0_0_8px_#06B6D4]" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase">Software Engineering @ COMSATS</h4>
                  <p className="text-xs text-white/50 mt-0.5">5th semester student focused on software architecture, clean APIs, and distributed data systems.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#020817] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_#22d3ee]" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase">Full-Stack & Mobile Development</h4>
                  <p className="text-xs text-white/50 mt-0.5">Production-style apps with Next.js, Supabase, React Native, Expo, and Node.js.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#020817] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_#60a5fa]" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase">Applied AI & Machine Learning</h4>
                  <p className="text-xs text-white/50 mt-0.5">Hands-on experience with Google Gemini API, Groq/Llama models, and Python ML pipelines.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => handleScrollTo('#projects')}
                className="px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all shadow-md shadow-[#06B6D4]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Video Player */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full max-w-[480px]">
              <AvatarVideo />
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
              viewport={{ once: true, amount: 0.01 }}
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
                viewport={{ once: true, amount: 0.01 }}
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
                viewport={{ once: true, amount: 0.01 }}
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

            {/* Education Node */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Node Circle */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#020817] border-2 border-[#06B6D4] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                <GraduationCap className="text-[#06B6D4] w-4 h-4" />
              </div>

              {/* Left Card Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.01 }}
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full md:w-[46%] pl-12 md:pl-0 md:pr-8"
              >
                <div className="glass-card p-6 md:p-8 rounded-2xl text-left border-t-2 border-t-[#06B6D4] hover:border-t-[#3B82F6] transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#06B6D4] uppercase">
                    2024 – 2028  |  BACHELOR OF SCIENCE
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    BS Software Engineering
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-white/90 mt-0.5">
                    COMSATS University Islamabad
                  </h4>
                  <p className="text-xs text-[#06B6D4] font-mono tracking-wider uppercase mt-1">
                    5th Semester • CGPA: 3.1
                  </p>
                  <p className="text-xs md:text-sm text-white/60 font-sans leading-relaxed mt-4">
                    Rigorous computer science & engineering foundations covering Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and IEEE-standard Software Requirements Engineering.
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

        {/* Tab Selector for Project Categories */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <button
            onClick={() => setProjectTab('featured')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
              projectTab === 'featured'
                ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20'
                : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            Featured Engineering (4)
          </button>
          <button
            onClick={() => setProjectTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
              projectTab === 'all'
                ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20'
                : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            All Projects (10)
          </button>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <Suspense fallback={<div className="h-96 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse" />}>
                <ProjectCard
                  project={{ ...project, number: idx + 1 }}
                  onOpenCaseStudy={setSelectedCaseStudy}
                />
              </Suspense>
            </motion.div>
          ))}
        </div>

        {/* Academic & Secondary Projects Section */}
        {projectTab === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 pt-12 border-t border-white/10 text-left space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#06B6D4] font-bold">
                ACADEMIC & SYSTEMS FOUNDATIONS
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Coursework & Algorithmic Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicProjects.map((project, idx) => {
                const IconComp = project.icon || Code2;
                return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#020817] border border-white/10 hover:border-[#06B6D4]/30 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
                        <IconComp size={18} />
                      </div>
                      <span className="text-[10px] font-mono text-white/40">#{idx + 5}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                        {project.subtitle}
                      </span>
                      <h4 className="text-base font-bold font-display text-white mt-0.5">
                        {project.title}
                      </h4>
                    </div>

                    <p className="text-xs text-white/60 font-sans leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] rounded text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={project.githubLink || "https://github.com/tayabawan19"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <GitHubIcon size={14} />
                      <span>Source</span>
                    </a>

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#06B6D4] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </motion.div>
        )}
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

      {/* GitHub Showcase Section */}
      <RevealSection id="github">
        <SectionHeader eyebrow="OPEN SOURCE" whiteText="GitHub" cyanText="Activity" />
        
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="p-6 md:p-8 rounded-2xl glass-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <GitHubIcon size={20} className="text-white" />
                <h3 className="text-lg md:text-xl font-bold font-display text-white">
                  github.com/tayabawan19
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl">
                Explore my open-source code repositories, full-stack architectures, mobile apps, and machine learning scripts on GitHub.
              </p>
            </div>

            <a
              href="https://github.com/tayabawan19"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all shadow-md shadow-[#06B6D4]/20 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Explore All Repositories</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Pinned Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Repo 1: ProofFolio */}
            <div className="p-5 rounded-xl bg-[#020817] border border-white/10 hover:border-[#06B6D4]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-[#06B6D4]" />
                  <a href="https://github.com/tayabawan19" target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold text-white hover:text-[#06B6D4] transition-colors">
                    ProofFolio
                  </a>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
                  Public
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans line-clamp-2">
                AI-powered student project marketplace with Gemini AI auto-evaluation, Supabase RLS, and Brevo OTP.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/40 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>Next.js / TypeScript</span>
              </div>
            </div>

            {/* Repo 2: ZenPay */}
            <div className="p-5 rounded-xl bg-[#020817] border border-white/10 hover:border-[#06B6D4]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-[#06B6D4]" />
                  <a href="https://github.com/tayabawan19/ZenPay" target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold text-white hover:text-[#06B6D4] transition-colors">
                    ZenPay
                  </a>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
                  Public
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans line-clamp-2">
                Production-style mobile fintech digital wallet with atomic P2P transfers, virtual cards, and Firebase.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/40 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span>React Native / Expo</span>
              </div>
            </div>

            {/* Repo 3: PaceTrack */}
            <div className="p-5 rounded-xl bg-[#020817] border border-white/10 hover:border-[#06B6D4]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-[#06B6D4]" />
                  <a href="https://github.com/tayabawan19/PaceTrack" target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold text-white hover:text-[#06B6D4] transition-colors">
                    PaceTrack
                  </a>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
                  Public
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans line-clamp-2">
                Full-stack mobile running tracker with live GPS Haversine calculation, OSRM routing, and TTS audio coaching.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/40 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>React Native / Node.js</span>
              </div>
            </div>

            {/* Repo 4: AI Engineering Journey */}
            <div className="p-5 rounded-xl bg-[#020817] border border-white/10 hover:border-[#06B6D4]/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-[#06B6D4]" />
                  <a href="https://github.com/tayabawan19/AI-Engineering-Journey" target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold text-white hover:text-[#06B6D4] transition-colors">
                    AI-Engineering-Journey
                  </a>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">
                  Public
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans line-clamp-2">
                Daily roadmap and code implementations transitioning into AI Engineering: Python, NumPy, Pandas, Scikit-learn, and LLM APIs.
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/40 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span>Python / Applied AI</span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Teammate Endorsements Section */}
      <RevealSection id="reviews">
        <SectionHeader eyebrow="COLLABORATION" whiteText="Teammate" cyanText="Feedback" />

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
        <SectionHeader eyebrow="GET IN TOUCH" whiteText="Let's" cyanText="Talk" />

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

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Video Intro Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#020817] border border-white/10 rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
                Interactive Introduction
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <AvatarVideo />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Analytics PageView tracker component for SPA route changes
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-46CMVVN5ML', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
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
      <AnalyticsTracker />
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
