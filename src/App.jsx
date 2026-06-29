import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BackgroundParticles from './components/BackgroundParticles';
import SkillsGlobe from './components/SkillsGlobe';
import ServicesCarousel from './components/ServicesCarousel';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import ChatbotWidget from './components/ChatbotWidget';
import { motion } from 'framer-motion';
import tayyabPhoto from './assets/tayyab.jpeg';

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
  X
} from 'lucide-react';

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

// Reusable Section Header Component (eyebrow, split white/red title, red line divider)
function SectionHeader({ eyebrow, whiteText, redText }) {
  return (
    <div className="flex flex-col items-center text-center mb-16 space-y-3">
      <span className="text-[10px] md:text-xs font-bold font-mono tracking-[0.25em] text-[#FF1A1A] uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide font-display uppercase">
        {whiteText} <span className="text-[#FF1A1A]">{redText}</span>
      </h2>
      <div className="w-16 h-[3px] bg-[#FF1A1A] mt-2 rounded"></div>
    </div>
  );
}

// Reusable Framer Motion Wrapper for Reveal Animations
function RevealSection({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  const [activeCert, setActiveCert] = useState(null); // 'excelerate' | 'arch' | null
  const [imgErrors, setImgErrors] = useState({ excelerate: false, arch: false });

  // Projects dataset mapping to custom representations
  const projectsList = [
    {
      title: "PaceTrack — Full-Stack Running Tracker",
      description: "A production-ready mobile run tracker with live GPS route rendering, OTP verification, local storage, dashboard analytics, and text-to-speech coaching.",
      tags: ["React Native", "Expo", "Node.js", "MongoDB Atlas", "JWT"],
      githubLink: "https://github.com/tayabawan19/PaceTrack",
      icon: MapPin,
      gradientText: "MOBILE APP"
    },
    {
      title: "Food Delivery System",
      description: "Console routing application modeling shortest path logistics for food deliveries using custom graph architectures and Dijkstra's algorithm.",
      tags: ["C++", "Dijkstra's Algorithm", "Data Structures"],
      githubLink: "https://github.com/tayabawan19",
      icon: Code2,
      gradientText: "ROUTE ROUTER"
    },
    {
      title: "Quiz Application",
      description: "Interactive desktop quiz manager featuring administrative question authoring panels and modular design architectures in Java Swing.",
      tags: ["Java", "OOP", "Java Swing"],
      githubLink: "https://github.com/tayabawan19",
      icon: Award,
      gradientText: "DESKTOP APP"
    },
    {
      title: "Digital Diary App",
      description: "Local logging utility employing stream I/O file operations to securely save, encrypt, and recall private user journal entries.",
      tags: ["Java", "File Handling", "Data Security"],
      githubLink: "https://github.com/tayabawan19",
      icon: BookOpen,
      gradientText: "LOGGING SYSTEM"
    },
    {
      title: "University Student Resource Ecosystem",
      description: "Engineered detailed requirements manuals (SRS) containing UML diagrams, database schemas, and Agile task models.",
      tags: ["SRS Documentation", "Systems Analysis", "Agile"],
      githubLink: "https://github.com/tayabawan19",
      icon: GraduationCap,
      gradientText: "ENGINEERING DOC"
    },
    {
      title: "Social Media Management Tool",
      description: "Mapped structural software engineering phases drafting SDLC models, risk mitigations, system designs, and testing logs.",
      tags: ["SDLC", "Software Engineering", "Risk Analysis"],
      githubLink: "https://github.com/tayabawan19",
      icon: Globe,
      gradientText: "MANAGEMENT SPEC"
    },
    {
      title: "JhootayShootay E-Commerce Store",
      description: "Operational WordPress storefront prototype hosted on Pantheon.io sandbox featuring WooCommerce payment flows and SEO tags.",
      tags: ["WordPress", "WooCommerce", "Pantheon.io", "SEO"],
      githubLink: "https://github.com/tayabawan19",
      liveLink: "https://dev-jootay-shootay.pantheonsite.io/",
      icon: Wrench,
      gradientText: "E-COMMERCE STORE"
    }
  ];

  // Skill sets categorised
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Java", "C++", "Python", "TypeScript"]
    },
    {
      title: "Mobile/Frontend",
      skills: ["React Native", "Expo", "React"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "REST API", "JWT"]
    },
    {
      title: "Databases",
      skills: ["Oracle SQL", "MongoDB Atlas"]
    },
    {
      title: "Tools & Platforms",
      skills: ["VS Code", "Figma", "Canva", "WordPress", "Render", "EAS Build", "Git", "GitHub"]
    },
    {
      title: "Concepts",
      skills: ["OOP", "Data Structures", "SDLC", "SRS/SDS Documentation"]
    },
    {
      title: "Machine Learning",
      skills: ["Python (ML)", "Data Analysis", "Model Development", "Scikit-learn"]
    }
  ];

  // Alternating scroll handler
  const handleScrollTo = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A] text-gray-200 font-sans selection:bg-[#FF1A1A]/30 selection:text-white">
      {/* Subtle Drift Particles in Background */}
      <BackgroundParticles />

      {/* Sticky Header Nav */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-[#1F0303]/40 via-[#0A0A0A] to-[#0A0A0A]">
        {/* Glow grid helper */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF1A1A]/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">

          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
          >
            {/* Eyebrow Label */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center space-x-2 text-[#FF1A1A]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF1A1A] animate-pulse"></span>
              <span className="text-xs font-bold font-mono uppercase tracking-[0.25em]">
                SOFTWARE ENGINEERING STUDENT
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
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="text-6xl md:text-8xl font-black text-[#FF1A1A] tracking-wider font-display select-none uppercase -mt-2 leading-none"
              style={{ textShadow: "0 0 30px rgba(255, 26, 26, 0.25)" }}
            >
              DEVELOPER
            </motion.div>

            {/* Paragraph Description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm md:text-base text-gray-300 leading-relaxed font-sans max-w-xl"
            >
              Building real systems, one semester at a time at <span className="text-[#FF1A1A] font-semibold">COMSATS University Islamabad</span>. Currently in my <span className="text-[#FF1A1A] font-semibold">4th semester</span> with a <span className="text-[#FF1A1A] font-semibold">CGPA of 3.1</span>, I specialize in crafting robust backend architectures, cross-platform mobile apps, and detailed engineering design manuals.
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
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/10 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href="https://github.com/tayabawan19"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/10 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href="mailto:tayabawan.in@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/10 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
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
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FF1A1A] hover:bg-[#E53935] rounded-md transition-all duration-300 font-mono shadow-md shadow-[#FF1A1A]/20 cursor-pointer flex items-center space-x-1.5"
              >
                <span>View Projects →</span>
              </button>
              <a
                href="/resume.pdf"
                download="Tayyab_Tanveer_Resume.pdf"
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-md transition-all duration-300 font-mono cursor-pointer flex items-center space-x-1.5"
              >
                <span>Download Resume ↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Column: Animated Atom Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative h-[350px] md:h-[450px]"
          >
            {/* Spinning/Pulsing atom energy sphere */}
            <div className="relative w-full max-w-[360px] md:max-w-[420px] aspect-square flex items-center justify-center">

              {/* Outer halo */}
              <div className="absolute w-[280px] md:w-[320px] h-[280px] md:h-[320px] rounded-full border border-[#FF1A1A]/10 animate-[pulse_6s_ease-in-out_infinite]"></div>

              {/* Glowing core */}
              <div className="absolute w-28 h-28 bg-[#FF1A1A]/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute w-12 h-12 bg-[#FF1A1A]/60 rounded-full blur-lg"></div>
              <div className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_20px_#FF1A1A] z-10"></div>

              {/* SVG Orbiting Rings */}
              <svg className="w-full h-full absolute inset-0 select-none pointer-events-none" viewBox="0 0 100 100">
                {/* Orbit 1 */}
                <ellipse
                  cx="50" cy="50" rx="42" ry="14"
                  fill="none" stroke="#FF1A1A" strokeWidth="0.5"
                  strokeDasharray="4 2"
                  className="origin-center animate-[spin_10s_linear_infinite]"
                  style={{ transform: 'rotate(45deg)' }}
                />

                {/* Orbit 2 */}
                <ellipse
                  cx="50" cy="50" rx="42" ry="14"
                  fill="none" stroke="#FF1A1A" strokeWidth="0.5"
                  className="origin-center animate-[spin_14s_linear_infinite]"
                  style={{ transform: 'rotate(-45deg)' }}
                />

                {/* Orbit 3 */}
                <ellipse
                  cx="50" cy="50" rx="42" ry="14"
                  fill="none" stroke="#E53935" strokeWidth="0.6"
                  className="origin-center animate-[spin_18s_linear_infinite]"
                  style={{ transform: 'rotate(90deg)' }}
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <RevealSection id="about">
        <SectionHeader eyebrow="● MY JOURNEY ●" whiteText="About" redText="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* About Left: Text Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#121212] to-[#0A0A0A] text-left">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide mb-4">
                Building real systems, one semester at a time
              </h3>
              <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed mb-4">
                I am a 4th semester Software Engineering student at COMSATS University Islamabad (Main Campus) holding a CGPA of 3.1. I view software engineering not just as code syntax, but as building fully structural, performant, and well-designed solutions. My coursework challenges me to build functional projects every semester, applying computer science theory to direct deliverables.
              </p>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                During my AI-Powered Data Analysis remote internship at Excelerate, I applied parsing pipelines and statistical modeling concepts to real datasets. From Dijkstra route finders in C++ to custom React Native trackers and WordPress setups, my portfolio captures a continuous focus on system architectures and documentation standards.
              </p>
            </div>
          </div>

          {/* About Right: 2x2 Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Stat 1 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center border-white/5 h-36">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">3.1</h4>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-[#FF1A1A] mt-2 uppercase">CGPA</span>
            </div>

            {/* Stat 2 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center border-white/5 h-36">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">7</h4>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-[#FF1A1A] mt-2 uppercase">PROJECTS BUILT</span>
            </div>

            {/* Stat 3 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center border-white/5 h-36">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">2</h4>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-[#FF1A1A] mt-2 uppercase">INTERNSHIPS</span>
            </div>

            {/* Stat 4 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center border-white/5 h-36">
              <h4 className="text-3xl md:text-4xl font-extrabold text-white font-display">2</h4>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-widest text-[#FF1A1A] mt-2 uppercase">LANGUAGES SPOKEN</span>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Skills Section */}
      <RevealSection id="skills">
        <SectionHeader eyebrow="● EXPERTISE ●" whiteText="Technical" redText="Skills" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* Skills Left: Three.js Rotating Globe */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center items-center">
            <SkillsGlobe />
          </div>

          {/* Skills Right: Grouped Category Badges */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-mono font-bold bg-[#121212] border border-white/5 text-gray-300 rounded hover:border-[#FF1A1A]/30 transition-all duration-300 flex items-center space-x-1.5"
                    >
                      <span className="text-[#FF1A1A] font-extrabold">-</span>
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Services Section */}
      <RevealSection id="services">
        <SectionHeader eyebrow="● SERVICES ●" whiteText="My" redText="Services" />
        <ServicesCarousel />
      </RevealSection>

      {/* Experience Section */}
      <RevealSection id="experience">
        <SectionHeader eyebrow="● MY JOURNEY ●" whiteText="Work" redText="Experience" />

        <div className="relative w-full max-w-4xl mx-auto mt-12">
          {/* Center glowing red vertical timeline divider line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF1A1A] via-[#E53935] to-[#FF1A1A] shadow-[0_0_10px_rgba(255,26,26,0.3)] transform -translate-x-1/2"></div>

          {/* Timeline Nodes */}
          <div className="space-y-12">

            {/* Arch Technologies Node (Left Card - Top) */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Glowing Icon Node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-[#FF1A1A] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_10px_rgba(255,26,26,0.4)] z-10">
                <Briefcase className="text-[#FF1A1A] w-4 h-4" />
              </div>

              {/* Left Side Card Content */}
              <div className="w-full md:w-1/2 pl-12 md:pr-8 md:pl-0">
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left hover:border-red-500/20 transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A1A] uppercase">
                    April 2026 – May 2026  |  8 Weeks
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    Machine Learning Intern
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-[#FF1A1A] mt-0.5">
                    Arch Technologies
                  </h4>
                  <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-1">
                    Remote Internship & Training Program
                  </p>

                  <ul className="mt-4 space-y-2 text-xs md:text-sm text-gray-400 font-sans list-disc list-inside">
                    <li>Completed an 8-week remote Machine Learning Internship and Training Program at Arch Technologies — Pakistan's Digital AI Training Platform.</li>
                    <li>Gained hands-on experience with machine learning concepts, model development, and practical AI applications under senior mentorship.</li>
                    <li>Worked under guidance of Sr. Python Developer on Python-based ML workflows.</li>
                    <li>Awarded Certificate of Completion (Cert ID: 993817) upon successful program completion.</li>
                  </ul>

                  <button
                    onClick={() => setActiveCert('arch')}
                    className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/20 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
                  >
                    <span>VIEW CERTIFICATE</span>
                  </button>
                </div>
              </div>

              {/* Spacer for right side on desktop */}
              <div className="hidden md:block w-1/2 pl-8"></div>
            </div>

            {/* Excelerate Node (Right Card - Middle) */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Glowing Icon Node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-[#FF1A1A] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_10px_rgba(255,26,26,0.4)] z-10">
                <Briefcase className="text-[#FF1A1A] w-4 h-4" />
              </div>

              {/* Spacer for left side on desktop */}
              <div className="hidden md:block w-1/2 pr-8"></div>

              {/* Right Side Card Content */}
              <div className="w-full md:w-1/2 pl-12 md:pl-8">
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left hover:border-red-500/20 transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A1A] uppercase">
                    2026 / 4-WEEK REMOTE INTERNSHIP
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    AI-Powered Data Analysis Intern
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-gray-400 mt-0.5">
                    Excelerate (Global Remote)
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed mt-4">
                    Assisted in data parsing, cleaning, and model setups using Python scripts. Built analysis scripts to draw trends from raw database outputs, compiling automated reports and visuals.
                    <span className="mt-2 block text-gray-500 font-medium">Supported by Rochester Institute of Technology's Tiger STRIPES Program. Completed April 9, 2026.</span>
                  </p>

                  <button
                    onClick={() => setActiveCert('excelerate')}
                    className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/20 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
                  >
                    <span>VIEW CERTIFICATE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Node (Left Card - Bottom) */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between w-full">
              {/* Glowing Icon Node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-[#FF1A1A] flex items-center justify-center transform -translate-x-1/2 shadow-[0_0_10px_rgba(255,26,26,0.4)] z-10">
                <Rocket className="text-[#FF1A1A] w-4 h-4" />
              </div>

              {/* Left Side Card Content */}
              <div className="w-full md:w-1/2 pl-12 md:pr-8 md:pl-0">
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left hover:border-red-500/20 transition-all duration-300">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A1A] uppercase">
                    2024 – PRESENT
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    Academic Projects
                  </h3>
                  <h4 className="text-sm font-semibold font-sans text-gray-400 mt-0.5">
                    COMSATS University Islamabad
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed mt-4">
                    Successfully designed and developed 7 core academic projects across Data Structures & Algorithms, Object-Oriented Programming, Software Requirement Engineering, and Mobile App Development. Handled full project cycle implementation from system modeling documents to live production rest APIs.
                  </p>
                </div>
              </div>

              {/* Spacer/Empty for right side on desktop */}
              <div className="hidden md:block w-1/2 pl-8"></div>
            </div>

          </div>
        </div>
      </RevealSection>

      {/* Projects Section */}
      <RevealSection id="projects" className="max-w-full md:px-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="● PORTFOLIO ●" whiteText="Featured" redText="Projects" />
        </div>

        {/* Horizontal scroll track */}
        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 px-6 md:px-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing max-w-full">
          {projectsList.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubLink={project.githubLink}
              liveLink={project.liveLink}
              icon={project.icon}
              gradientText={project.gradientText}
            />
          ))}
        </div>

        {/* Scroll Helper Indicator */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end text-xs text-gray-500 font-mono tracking-widest uppercase items-center space-x-2 select-none pointer-events-none mt-2">
          <span>SCROLL HORIZONTALLY</span>
          <ArrowRight size={12} className="animate-bounce-horizontal" />
        </div>
      </RevealSection>

      {/* Client Reviews Section */}
      <RevealSection id="reviews">
        <SectionHeader eyebrow="● TESTIMONIALS ●" whiteText="Client" redText="Reviews" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6">
          {/* Review 1 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left flex flex-col justify-between relative overflow-hidden">
            {/* Quote Mark */}
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#FF1A1A]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex space-x-1 text-[#FF1A1A]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#FF1A1A]" />)}
              </div>

              <p className="text-sm italic text-gray-300 font-sans leading-relaxed">
                "Tayyab's work on our group project's SRS documentation was incredibly thorough and well-structured. Very reliable teammate."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Haris Gul</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FF1A1A] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#FF1A1A]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              <div className="flex space-x-1 text-[#FF1A1A]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#FF1A1A]" />)}
              </div>

              <p className="text-sm italic text-gray-300 font-sans leading-relaxed">
                "He built the backend for our university project with clean, well-documented code. Impressive for a student at this level."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Ali Majeed</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FF1A1A] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#121212] text-left flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-7xl font-serif text-[#FF1A1A]/10 pointer-events-none font-bold select-none">“</div>

            <div className="space-y-4">
              <div className="flex space-x-1 text-[#FF1A1A]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#FF1A1A]" />)}
              </div>

              <p className="text-sm italic text-gray-300 font-sans leading-relaxed">
                "Tayyab consistently delivered quality work in our software engineering coursework. Strong problem-solver and great communicator."
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white font-display">Awais Shahid</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FF1A1A] uppercase mt-0.5">
                Group Project Teammate
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Contact Section */}
      <RevealSection id="contact">
        <SectionHeader eyebrow="● CONTACT ●" whiteText="Get In" redText="Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          {/* Contact Left: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Right: Detail Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            {/* CV Card */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#121212] to-[#0A0A0A] space-y-6">
              <h3 className="text-xl font-bold font-display text-white tracking-wide">
                Download My Resume
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans leading-relaxed">
                Need a copy of my curriculum vitae for evaluation or internship applications? Download it directly here.
              </p>
              <a
                href="/resume.pdf"
                download="Tayyab_Tanveer_Resume.pdf"
                className="inline-flex px-6 py-3 bg-[#121212] border border-white/10 hover:border-red-500 hover:bg-white/5 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer items-center space-x-2"
              >
                <Download size={14} className="text-[#FF1A1A]" />
                <span>DOWNLOAD CV ↓</span>
              </a>
            </div>

            {/* Social Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">
                FIND ME ONLINE
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/tayabawan19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-[#121212] border border-white/5 rounded-xl hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-lg group-hover:scale-110 transition-transform">
                    <LinkedInIcon size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase">LinkedIn</span>
                    <span className="text-xs text-white font-sans font-medium">tayabawan19</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/tayabawan19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-[#121212] border border-white/5 rounded-xl hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-lg group-hover:scale-110 transition-transform">
                    <GitHubIcon size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase">GitHub</span>
                    <span className="text-xs text-white font-sans font-medium">tayabawan19</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:tayabawan.in@gmail.com"
                  className="flex items-center space-x-3 p-4 bg-[#121212] border border-white/5 rounded-xl hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-lg group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase">Email</span>
                    <span className="text-xs text-white font-sans font-medium truncate max-w-[150px]">tayabawan.in@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+923269812642"
                  className="flex items-center space-x-3 p-4 bg-[#121212] border border-white/5 rounded-xl hover:border-red-500/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-lg group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase">Phone</span>
                    <span className="text-xs text-white font-sans font-medium">+92 326 9812642</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Muhammad Tayyab Tanveer. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-mono flex items-center space-x-1.5">
            <span>REACT</span>
            <span className="text-[#FF1A1A]">&bull;</span>
            <span>TAILWIND CSS</span>
            <span className="text-[#FF1A1A]">&bull;</span>
            <span>THREE.JS</span>
            <span className="text-[#FF1A1A]">&bull;</span>
            <span>FRAMER MOTION</span>
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-2xl shadow-black animate-fade-in">

            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-gray-455 hover:text-white hover:bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>

            {/* Title & Download link */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-6 pr-8 space-y-2 sm:space-y-0">
              <h3 className="text-xl font-bold font-display text-[#FF1A1A] tracking-wider uppercase">
                Certificate of Completion
              </h3>
              <a 
                href={activeCert === 'arch' ? '/certificate_arch.pdf' : '/certificate_excelerate.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 hover:border-[#FF1A1A] hover:bg-[#FF1A1A]/20 text-white text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
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
                <div className="w-full aspect-[4/3] min-h-[300px] md:min-h-[450px] bg-white text-black p-6 md:p-12 border-[12px] border-[#0ea5e9] rounded shadow-2xl relative flex flex-col justify-between font-sans select-none overflow-hidden">
                  
                  {/* CSS Geometric patterns on the sides */}
                  <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-br from-[#0ea5e9]/20 via-transparent to-transparent pointer-events-none transform -skew-x-12 -translate-x-10"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-tl from-[#0ea5e9]/20 via-transparent to-transparent pointer-events-none transform -skew-x-12 translate-x-10"></div>

                  {/* Top Header Logo & Seal */}
                  <div className="flex justify-between items-start border-b pb-4 border-gray-250">
                    <div className="text-left">
                      <span className="text-sm font-bold tracking-widest text-[#0ea5e9] uppercase">ARCH TECHNOLOGIES</span>
                      <span className="block text-[8px] text-gray-400 font-mono tracking-wider">PAKISTAN'S DIGITAL AI PLATFORM</span>
                    </div>
                    {/* Seal */}
                    <div className="w-20 h-20 rounded-full border-4 border-double border-[#0ea5e9] bg-[#0ea5e9]/5 flex flex-col items-center justify-center text-center p-2 transform rotate-12 shadow-sm">
                      <span className="text-[6px] font-extrabold text-[#0ea5e9] uppercase leading-none">ARCH TECH</span>
                      <span className="text-[4px] text-gray-500 font-mono leading-none mt-1">APPROVED</span>
                    </div>
                  </div>

                  {/* Certificate Body */}
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

                  {/* Signatures & Footer info */}
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t pt-4 border-gray-200 text-slate-600 space-y-4 sm:space-y-0 text-center sm:text-left">
                    {/* Signature 1 */}
                    <div className="space-y-1">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">M.A Rehman</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">M.A REHMAN</div>
                      <div className="text-[8px] text-slate-400 leading-none">CEO & Founder</div>
                    </div>

                    {/* Signature 2 */}
                    <div className="space-y-1 text-center sm:text-right">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Faraz Malik</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">MR. FARAZ MALIK</div>
                      <div className="text-[8px] text-slate-400 leading-none">Sr. Python Developer</div>
                    </div>
                  </div>

                  {/* Cert ID */}
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
                <div className="w-full aspect-[4/3] min-h-[300px] md:min-h-[450px] bg-white text-black p-6 md:p-12 border-[12px] border-double border-orange-500 rounded shadow-2xl relative flex flex-col justify-between font-sans select-none overflow-hidden">
                  
                  {/* Decorative corner borders */}
                  <div className="absolute top-0 left-0.5 w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500"></div>
                  <div className="absolute bottom-0 left-0.5 w-8 h-8 border-b-4 border-l-4 border-orange-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500"></div>

                  {/* Top Header Logos */}
                  <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg md:text-xl font-extrabold tracking-tight text-orange-600 font-display">RIT</span>
                      <span className="text-[10px] md:text-xs text-gray-500 leading-tight uppercase font-medium border-l pl-2 border-gray-300">Rochester Institute<br/>of Technology</span>
                    </div>
                    <div className="text-lg md:text-xl font-bold tracking-tight text-rose-600 font-mono">
                      Excelerate
                    </div>
                  </div>

                  {/* Certificate Body */}
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

                  {/* Signatures & Footer info */}
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t pt-4 border-gray-200 text-slate-600 space-y-4 sm:space-y-0 text-center sm:text-left">
                    {/* Signature 1 */}
                    <div className="space-y-1">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Kathleen B. Davis</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">KATHLEEN DAVIS</div>
                      <div className="text-[8px] text-slate-400 leading-none">Vice President, Enrollment Management<br/>RIT</div>
                    </div>

                    {/* QR Code Vector SVG */}
                    <div className="w-14 h-14 border border-slate-200 flex items-center justify-center p-1 bg-white shadow-sm rounded-sm">
                      <svg className="w-full h-full text-slate-800" viewBox="0 0 29 29" fill="currentColor">
                        {/* Position Detection Patterns (Top-Left) */}
                        <path d="M0 0h7v7H0zm1 1v5h5V1zm1 1h3v3H2z" />
                        {/* Position Detection Patterns (Top-Right) */}
                        <path d="M22 0h7v7h-7zm1 1v5h5V1zm1 1h3v3H24z" />
                        {/* Position Detection Patterns (Bottom-Left) */}
                        <path d="M0 22h7v7H0zm1 1v5h5v-5zm1 1h3v3H2z" />
                        {/* Small Alignment Pattern (Bottom-Right) */}
                        <path d="M20 20h5v5h-5zm1 1v3h3v-3zm1 1h1v1h-1z" />
                        
                        {/* Data modules */}
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

                    {/* Signature 2 */}
                    <div className="space-y-1 text-center sm:text-right">
                      <div className="italic font-serif text-sm text-slate-800 border-b border-gray-300 px-4 py-0.5">Sundar Kumarasamy</div>
                      <div className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-slate-400">SUNDAR KUMARASAMY</div>
                      <div className="text-[8px] text-slate-400 leading-none">Chief Executive Officer<br/>Excelerate</div>
                    </div>
                  </div>

                  {/* Completion Date */}
                  <div className="text-[10px] text-center text-slate-500 font-mono mt-4">
                    Date of Completion: <span className="font-bold text-slate-800">April 9, 2026</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Floating Chatbot Assistant */}
      <ChatbotWidget />

      {/* Custom Horizontal Scroll Indicator styles */}
      <style>{`
        @keyframes bounceHorizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-horizontal {
          animation: bounceHorizontal 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
