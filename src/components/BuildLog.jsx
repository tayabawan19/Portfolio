import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  LayoutGrid, 
  ListTodo, 
  ExternalLink, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  Award,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const GitHubIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Data Structure (phases array) representing AI Engineering Learning Progress
export const phasesData = [
  {
    id: 1,
    title: "Phase 1: Python Foundations",
    month: "July 2026",
    status: "in-progress",
    progress: Math.round((11 / 14) * 100), // 79% of Phase 1 complete
    days: [
      { day: 1, topic: "Variables & Data Types", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day1.py" },
      { day: 2, topic: "Lists & Dictionaries", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day2.py" },
      { day: 3, topic: "Functions", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day3.py" },
      { day: 4, topic: "Loops & Conditionals", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day4.py" },
      { day: 5, topic: "File Handling", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day5.py" },
      { day: 6, topic: "Packages & APIs (requests, dotenv)", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day6.py" },
      { day: 7, topic: "Classes & OOP", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day7.py" },
      { day: 8, topic: "Error Handling (try/except)", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day8.py" },
      { day: 9, topic: "Working with JSON", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day9.py" },
      { day: 10, topic: "Mini Project: ChatManager", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day10.py" },
      { day: 11, topic: "Real AI API Integration using Groq + Llama 3.3 70B", completed: true, link: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day11.py" },
      { day: 12, topic: "Chatbot with Memory", completed: false },
      { day: 13, topic: "Prompt Engineering", completed: false },
      { day: 14, topic: "End-to-End AI App", completed: false }
    ],
    projects: [
      {
        name: "ChatManager CLI",
        built: "Day 10",
        description: "A command-line chatbot with persistent memory using OOP, JSON file storage, and proper error handling. Saves and loads conversation history between sessions.",
        tech: ["Python", "json", "datetime"],
        github: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day10.py"
      },
      {
        name: "First Real AI API Call",
        built: "Day 11",
        description: "Connected to Groq's free API to call Llama 3.3 70B for the first time, replacing all previous fake/simulated AI responses with a real LLM.",
        tech: ["Python", "groq SDK", "python-dotenv"],
        github: "https://github.com/tayabawan19/AI-Engineering-Journey/blob/main/day11.py"
      }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Machine Learning",
    month: "August 2026",
    status: "upcoming",
    progress: 0,
    days: [
      { day: 15, topic: "TBD", completed: false },
      { day: 16, topic: "TBD", completed: false },
      { day: 17, topic: "TBD", completed: false },
      { day: 18, topic: "TBD", completed: false },
      { day: 19, topic: "TBD", completed: false },
      { day: 20, topic: "TBD", completed: false }
    ],
    projects: []
  },
  {
    id: 3,
    title: "Phase 3: Deep Learning & Neural Networks",
    month: "September 2026",
    status: "upcoming",
    progress: 0,
    days: [
      { day: 21, topic: "TBD", completed: false },
      { day: 22, topic: "TBD", completed: false },
      { day: 23, topic: "TBD", completed: false },
      { day: 24, topic: "TBD", completed: false },
      { day: 25, topic: "TBD", completed: false }
    ],
    projects: []
  },
  {
    id: 4,
    title: "Phase 4: LLMs & AI Engineering — RAG, LangChain, Vector DBs",
    month: "October 2026",
    status: "upcoming",
    progress: 0,
    days: [
      { day: 26, topic: "TBD", completed: false },
      { day: 27, topic: "TBD", completed: false },
      { day: 28, topic: "TBD", completed: false },
      { day: 29, topic: "TBD", completed: false },
      { day: 30, topic: "TBD", completed: false }
    ],
    projects: []
  },
  {
    id: 5,
    title: "Phase 5: MLOps & Deployment",
    month: "November 2026",
    status: "upcoming",
    progress: 0,
    days: [
      { day: 31, topic: "TBD", completed: false },
      { day: 32, topic: "TBD", completed: false },
      { day: 33, topic: "TBD", completed: false },
      { day: 34, topic: "TBD", completed: false },
      { day: 35, topic: "TBD", completed: false }
    ],
    projects: []
  },
  {
    id: 6,
    title: "Phase 6: Portfolio Projects",
    month: "December 2026",
    status: "upcoming",
    progress: 0,
    days: [
      { day: 36, topic: "TBD", completed: false },
      { day: 37, topic: "TBD", completed: false },
      { day: 38, topic: "TBD", completed: false },
      { day: 39, topic: "TBD", completed: false },
      { day: 40, topic: "TBD", completed: false }
    ],
    projects: []
  }
];

export default function BuildLog() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'timeline'
  const [expandedPhase, setExpandedPhase] = useState({ 1: true, 2: false, 3: false, 4: false, 5: false, 6: false });

  // Calculate general stats
  const totalDays = phasesData.reduce((acc, phase) => acc + phase.days.length, 0);
  const completedDays = phasesData.reduce((acc, phase) => 
    acc + phase.days.filter(d => d.completed).length, 0
  );
  const overallProgress = Math.round((completedDays / totalDays) * 100);
  const totalProjects = phasesData.reduce((acc, phase) => acc + phase.projects.length, 0);

  const togglePhase = (id) => {
    setExpandedPhase(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20';
      case 'in-progress': return 'text-[#FF1A1A] bg-[#FF1A1A]/10 border-[#FF1A1A]/20';
      default: return 'text-gray-400 bg-gray-900/40 border-white/5';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
      
      {/* Back button and title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center space-x-4">
          <a 
            href="/"
            className="p-2.5 bg-[#121212] border border-white/5 hover:border-red-500/30 hover:bg-[#FF1A1A]/5 rounded-xl transition-all duration-300 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </a>
          <div>
            <span className="text-[10px] md:text-xs font-bold font-mono tracking-[0.25em] text-[#FF1A1A] uppercase">
              AI ENGINEERING JOURNAL
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-wide text-white mt-1">
              BUILD <span className="text-[#FF1A1A]">LOG</span>
            </h1>
          </div>
        </div>

        {/* View Switcher Button */}
        <div className="flex items-center bg-[#121212] border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setView('dashboard')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              view === 'dashboard'
                ? 'bg-[#FF1A1A] text-white shadow-md shadow-[#FF1A1A]/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              view === 'timeline'
                ? 'bg-[#FF1A1A] text-white shadow-md shadow-[#FF1A1A]/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ListTodo size={14} />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Progress Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-[#121212] flex items-center space-x-4">
          <div className="p-3 bg-[#FF1A1A]/10 text-[#FF1A1A] rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</span>
            <span className="text-2xl font-bold font-display text-white">{overallProgress}%</span>
          </div>
        </div>

        {/* Days Completed Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-[#121212] flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Days Tracked</span>
            <span className="text-2xl font-bold font-display text-white">{completedDays} / {totalDays}</span>
          </div>
        </div>

        {/* Projects Finished Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-[#121212] flex items-center space-x-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Completed Projects</span>
            <span className="text-2xl font-bold font-display text-white">{totalProjects}</span>
          </div>
        </div>

        {/* Current Phase Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-[#121212] flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Layers size={20} />
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Current Focus</span>
            <span className="text-sm font-bold font-display text-white uppercase tracking-wider truncate max-w-[160px]">Phase 1: Python</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {phasesData.map((phase) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-card rounded-2xl border border-white/5 bg-[#121212] overflow-hidden"
              >
                {/* Phase Header */}
                <div 
                  onClick={() => togglePhase(phase.id)}
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/[0.01] transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase border rounded ${getStatusColor(phase.status)}`}>
                        {phase.status === 'completed' ? 'Completed' : phase.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        Phase {phase.id} &bull; {phase.month}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide uppercase">
                      {phase.title}
                    </h2>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="flex items-center space-x-6 min-w-[200px] md:min-w-[280px]">
                    <div className="w-full bg-[#0A0A0A] h-2 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          phase.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-[#FF1A1A] to-[#E53935]'
                        }`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-mono font-bold text-white w-8 text-right">
                      {phase.progress}%
                    </span>
                    <div className="text-gray-500 hover:text-white transition-colors">
                      {expandedPhase[phase.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedPhase[phase.id] && (
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 border-t border-white/5 bg-[#0A0A0A]/40 space-y-6">
                    
                    {/* Projects Section */}
                    {phase.projects.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A1A] uppercase">
                          PHASE PROJECTS
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {phase.projects.map((proj, pIdx) => (
                            <div 
                              key={pIdx}
                              className="p-5 bg-[#121212]/90 border border-white/5 rounded-xl hover:border-red-500/20 transition-all duration-300 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between">
                                  <h5 className="text-base font-bold font-display text-white uppercase tracking-wider">
                                    {proj.name}
                                  </h5>
                                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase px-1.5 py-0.5 border border-white/5 rounded">
                                    {proj.built}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 font-sans mt-1.5 leading-relaxed">
                                  {proj.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {proj.tech.map((t, idx) => (
                                    <span key={idx} className="text-[9px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-white/5">
                                {proj.github && (
                                  <a 
                                    href={proj.github} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-[#FF1A1A] hover:text-[#E53935] tracking-widest uppercase transition-colors"
                                  >
                                    <GitHubIcon size={12} />
                                    <span>Code Repository</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Day-by-Day Topics */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
                        CURRICULUM TOPICS
                      </h4>
                      {phase.days.length === 0 ? (
                        <p className="text-xs text-gray-600 font-mono italic">No topics scheduled yet.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {phase.days.map((dayObj) => {
                            const DayElement = dayObj.completed && dayObj.link ? 'a' : 'div';
                            const extraProps = dayObj.completed && dayObj.link ? {
                              href: dayObj.link,
                              target: "_blank",
                              rel: "noreferrer"
                            } : {};

                            return (
                              <DayElement 
                                key={dayObj.day} 
                                {...extraProps}
                                className={`p-3 border rounded-lg flex items-center space-x-3 transition-colors ${
                                  dayObj.completed 
                                    ? 'bg-[#121212]/50 border-emerald-500/10 text-gray-300 hover:border-red-500/20 hover:bg-[#121212]/80 cursor-pointer' 
                                    : 'bg-[#121212]/20 border-white/5 text-gray-500'
                                }`}
                              >
                                <div>
                                  {dayObj.completed ? (
                                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                  ) : (
                                    <Circle size={16} className="text-gray-700 shrink-0" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className={`block text-[9px] font-mono uppercase tracking-wider ${
                                    dayObj.completed ? 'text-[#FF1A1A]' : 'text-gray-600'
                                  }`}>
                                    Day {dayObj.day}
                                  </span>
                                  <p className="text-xs font-medium truncate mt-0.5">
                                    {dayObj.topic}
                                  </p>
                                </div>
                                {dayObj.completed && dayObj.link && (
                                  <div className="text-gray-600 group-hover:text-white transition-colors pl-1">
                                    <ExternalLink size={10} />
                                  </div>
                                )}
                              </DayElement>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-4xl mx-auto mt-6"
          >
            {/* Center glowing red vertical timeline divider line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF1A1A] via-[#E53935] to-[#FF1A1A]/20 shadow-[0_0_10px_rgba(255,26,26,0.3)] transform -translate-x-1/2"></div>

            <div className="space-y-8">
              {phasesData.flatMap(phase => 
                phase.days.map(d => ({ ...d, phaseTitle: phase.title, phaseId: phase.id }))
              ).map((dayObj, index) => {
                const isClickable = dayObj.completed && dayObj.link;
                const DayCard = isClickable ? 'a' : 'div';
                const cardProps = isClickable ? {
                  href: dayObj.link,
                  target: "_blank",
                  rel: "noreferrer"
                } : {};

                return (
                  <motion.div
                    key={dayObj.day}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                    className="relative flex flex-col md:flex-row items-start md:justify-between w-full"
                  >
                    {/* Glowing Icon Node */}
                    <div className={`absolute left-4 md:left-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transform -translate-x-1/2 z-10 transition-all duration-300 ${
                      dayObj.completed
                        ? 'bg-[#0A0A0A] border-[#FF1A1A] shadow-[0_0_8px_rgba(255,26,26,0.4)]'
                        : 'bg-[#121212] border-gray-800'
                    }`}>
                      {dayObj.completed ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]"></div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                      )}
                    </div>

                    {/* Left or Right Content Card */}
                    <div className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                      dayObj.day % 2 === 1 ? 'md:text-right md:pr-6' : 'md:order-last md:pl-6 text-left'
                    }`}>
                      <DayCard 
                        {...cardProps}
                        className={`block glass-card p-5 rounded-xl border transition-all duration-300 ${
                          dayObj.completed 
                            ? 'border-white/5 bg-[#121212] hover:border-red-500/30' 
                            : 'border-white/5 bg-[#121212]/30 opacity-60'
                        }`}
                      >
                        <div className={`flex items-center gap-2 mb-1.5 ${
                          dayObj.day % 2 === 1 ? 'md:justify-end' : 'justify-start'
                        }`}>
                          <span className={`px-2 py-0.5 text-[8px] font-mono font-bold tracking-wider rounded uppercase ${
                            dayObj.completed 
                              ? 'bg-[#FF1A1A]/10 text-[#FF1A1A] border border-[#FF1A1A]/20' 
                              : 'bg-gray-900/60 text-gray-500 border border-white/5'
                          }`}>
                            DAY {dayObj.day}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            Phase {dayObj.phaseId}
                          </span>
                        </div>
                        
                        <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase flex items-center gap-1.5 justify-start md:justify-items-stretch">
                          <span>{dayObj.topic}</span>
                          {isClickable && <ExternalLink size={10} className="text-[#FF1A1A] inline" />}
                        </h3>
                        <p className="text-[9px] font-mono text-gray-500 mt-1 uppercase">
                          {dayObj.phaseTitle.split(":")[0]}
                        </p>
                      </DayCard>
                    </div>

                    {/* Spacer for other side on desktop */}
                    <div className="hidden md:block w-[46%]"></div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
