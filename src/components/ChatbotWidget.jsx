import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, RotateCcw } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const KNOWLEDGE_BASE = [
  {
    category: "greetings",
    keywords: ["hi", "hello", "salam", "hey", "greetings", "yo", "aola"],
    answer: "Hello! I am Tayyab's virtual assistant. How can I help you today? You can ask me about his projects, skills, education, or internship!"
  },
  {
    category: "thanks",
    keywords: ["thanks", "thank you", "shukriya", "appreciate", "good job"],
    answer: "You're very welcome! Let me know if you want to know anything else about Tayyab's software engineering journey."
  },
  {
    category: "identity",
    keywords: ["who are you", "who is tayyab", "about", "bio", "education", "comsats", "cgpa", "gpa", "degree", "university", "tayyab", "studies", "study"],
    answer: "Muhammad Tayyab Tanveer is a BS Software Engineering student in his 4th semester at COMSATS University Islamabad, maintaining a CGPA of 3.1. He focuses on building robust systems, backend architecture, and design modeling."
  },
  {
    category: "internship",
    keywords: ["internship", "work experience", "excelerate", "experience", "intern", "job"],
    answer: "Tayyab completed a 4-week remote AI-Powered Data Analysis internship with Excelerate. During the internship, he worked on parsing data models, evaluating statistics, and generating automated reports."
  },
  {
    category: "skills",
    keywords: ["skills", "technologies", "languages", "tools", "databases", "concepts", "frameworks", "stack"],
    answer: "Tayyab's technical stack includes:\n\n• Languages: Java, C++, Python\n• Databases: Oracle SQL, MongoDB\n• Tools: VS Code, Figma, Canva, WordPress\n• Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms, SDLC, SRS/SDS Documentation."
  },
  {
    category: "project_food",
    keywords: ["food delivery", "delivery system", "dijkstra", "c++ project"],
    answer: "Project: Food Delivery System\n• Language: C++\n• Core Concepts: Dijkstra's Algorithm, Graphs, Data Structures\n\nThis is a console application that implements Dijkstra's routing algorithm to find the shortest path between nodes, designed to optimize food order routing."
  },
  {
    category: "project_quiz",
    keywords: ["quiz application", "quiz app", "java swing", "oop project"],
    answer: "Project: Quiz Application\n• Language: Java\n• Tech Stack: Java Swing, OOP Patterns\n\nA desktop-based quiz engine allowing administrators to write quizzes and users to take interactive multiple-choice tests, styled using Swing GUI wrappers."
  },
  {
    category: "project_diary",
    keywords: ["digital diary", "diary app", "file handling", "java project"],
    answer: "Project: Digital Diary App\n• Language: Java\n• Core Tech: Stream I/O File Handling, File Security\n\nA local personal diary tool using encrypted text files to store and retrieve private logs, demonstrating secure, persistent data streams."
  },
  {
    category: "project_student",
    keywords: ["student resource", "resource ecosystem", "ecosystem app", "srs documentation", "srs doc"],
    answer: "Project: Student Resource Ecosystem App (Documentation)\n• Deliverables: Software Requirements Specification (SRS)\n• Core Work: UML modeling, use-case logs, database schema planning\n\nA detailed engineering analysis manual capturing the full requirements analysis for a shared student ecosystem database."
  },
  {
    category: "project_social",
    keywords: ["social media", "management tool", "sdlc documentation", "sdlc doc"],
    answer: "Project: Online Social Media Management Tool (Documentation)\n• Deliverables: Full SDLC modeling plans\n• Core Work: Risk assessment diagrams, agile cycle structures, sprint schedules\n\nA comprehensive project management model tracking system stages from initial elicitation to testing plans."
  },
  {
    category: "project_ecommerce",
    keywords: ["jhootayshootay", "e-commerce", "ecommerce", "wordpress project", "pantheon", "woocommerce"],
    answer: "Project: JhootayShootay E-Commerce Store\n• Platforms: WordPress, WooCommerce, Pantheon.io cloud sandbox\n\nAn operational e-commerce clothing store prototype showcasing custom layout systems, payment workflows, and shipping hooks."
  },
  {
    category: "projects_general",
    keywords: ["projects", "work", "portfolio", "what did you build", "built"],
    answer: "Tayyab has built several core academic projects:\n\n1. Food Delivery System (C++)\n2. Quiz Application (Java)\n3. Digital Diary App (Java)\n4. Student Resource Ecosystem App (SRS)\n5. Online Social Media Management Tool (SDLC)\n6. JhootayShootay E-Commerce Store (WordPress)\n\nAsk me about any project by name to see its specific stack and description!"
  },
  {
    category: "contact",
    keywords: ["contact", "email", "phone", "number", "location", "address", "islamabad", "pakistan", "gmail", "tayabawan", "hire"],
    answer: "You can get in touch with Tayyab directly through:\n\n• Email: tayabawan.in@gmail.com\n• Phone: +92 326 9812642\n• Location: Islamabad, Pakistan\n\nYou can also click the LinkedIn or GitHub social links in the footer/hero!"
  },
  {
    category: "languages_spoken",
    keywords: ["speak", "languages you know", "urdu", "english", "punjabi", "language"],
    answer: "Tayyab speaks English, Urdu, and Punjabi fluently."
  },
  {
    category: "ai_ml",
    keywords: ["machine learning", "ml", "ai", "artificial intelligence", "deep learning", "python"],
    answer: "Tayyab has practical exposure to AI-Powered Data Analysis from his 4-week remote internship with Excelerate. He is skilled in Python (standard for AI/ML tasks) and possesses a strong algorithmic foundation in Core Data Structures & Algorithms from COMSATS University Islamabad. While his primary specialization is in backend systems, his mathematical and logic building skills are highly relevant for AI/ML roles!"
  },
  {
    category: "database",
    keywords: ["database", "databases", "sql", "oracle", "mongodb", "schema", "query", "queries"],
    answer: "Tayyab is proficient in both Relational and Non-Relational databases:\n\n• Oracle SQL: Skilled in writing complex SQL queries, database design, normalization, and schema modeling.\n• MongoDB: Experienced in NoSQL document storage, indexing, and aggregate pipelines.\n• Database Planning: Experienced in drawing Entity-Relationship Diagrams (ERDs) and planning schemas for systems like the Student Resource Ecosystem."
  }
];

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('tayyab_chat_history');
      return saved ? JSON.parse(saved) : [
        {
          sender: 'bot',
          text: "Hi there! 👋 I'm Tayyab's AI assistant. Ask me anything about his projects, technical skills, coursework, or contact info!"
        }
      ];
    } catch (e) {
      console.error("Error reading localStorage", e);
      return [
        {
          sender: 'bot',
          text: "Hi there! 👋 I'm Tayyab's AI assistant. Ask me anything about his projects, technical skills, coursework, or contact info!"
        }
      ];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isAIAvailable = !!apiKey;

  const suggestQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Internship details?",
    "How to contact you?"
  ];

  useEffect(() => {
    try {
      localStorage.setItem('tayyab_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleClearChat = () => {
    const initialMsg = [
      {
        sender: 'bot',
        text: "Hi there! 👋 I'm Tayyab's AI assistant. Ask me anything about his projects, technical skills, coursework, or contact info!"
      }
    ];
    setMessages(initialMsg);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // 1. Append user message
    const userMsg = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      if (isAIAvailable) {
        // Generative Gemini AI implementation
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: `
            You are the personal AI assistant for Muhammad Tayyab Tanveer, a BS Software Engineering student at COMSATS University Islamabad (4th semester, CGPA 3.1).
            Answer questions politely, briefly, and professionally using Tayyab's credentials.
            
            Tayyab's Credentials:
            - Education: 4th semester BS Software Engineering at COMSATS University Islamabad. CGPA: 3.1.
            - Skills: Java, C++, Python, Oracle SQL, MongoDB, VS Code, Figma, Canva, WordPress, OOP, Data Structures, SDLC, SRS/SDS Documentation.
            - Internship: 4-week remote AI-Powered Data Analysis internship with Excelerate.
            - Languages: English, Urdu, Punjabi (fluent in all).
            - Contact: Email: tayabawan.in@gmail.com, Phone: +92 326 9812642, Location: Islamabad, Pakistan.
            - Projects: 
              1. Food Delivery System: C++ console app implementing Dijkstra's algorithm for route optimization and shortest-path food delivery.
              2. Quiz Application: Java desktop quiz engine using OOP design patterns and Java Swing GUI layouts.
              3. Digital Diary App: Java local diary tool using Stream I/O File Handling for persistent, secure entry storage and retrieval.
              4. University Student Resource Ecosystem App: Comprehensive SRS documentation with detailed UML models, use cases, and database schemas.
              5. Online Social Media Management Tool: Full system lifecycle documentation mapping the SDLC cycle from requirements to deployment plans.
              6. JhootayShootay E-Commerce Store: WordPress e-commerce store with WooCommerce, hosted on Pantheon.io sandbox environment.
            
            Rules:
            1. Keep responses short and conversational (max 2-3 sentences where possible).
            2. Use lists or bullet points when displaying items like skills or project details.
            3. If the user asks about general knowledge, coding help unrelated to Tayyab's projects, personal queries, or any topic outside Tayyab's profile, explain politely and dynamically that you are specialized to assist with Tayyab's academic and engineering work. State a clear reason (e.g., that you do not have external knowledge bases or personal files regarding that topic) and redirect them to ask about his software projects, skills, or COMSATS coursework.
          `
        });

        // Map conversation history
        const rawHistory = updatedMessages
          .filter(msg => !msg.isTyping)
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          }));

        // Gemini history must start with 'user' role. Filter to start from the first user message.
        const firstUserIdx = rawHistory.findIndex(h => h.role === 'user');
        const apiHistory = firstUserIdx !== -1 ? rawHistory.slice(firstUserIdx) : [];

        // Start chat with history (excluding the current user message being sent)
        const chat = model.startChat({ history: apiHistory.slice(0, -1) });
        const result = await chat.sendMessage(query);
        const responseText = result.response.text();

        setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
        setIsTyping(false);
      } else {
        // Fallback to local rule-based response
        setTimeout(() => {
          const responseText = getKeywordResponse(query);
          setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
          setIsTyping(false);
        }, 550);
      }
    } catch (error) {
      console.error("Gemini API Chat Error:", error);
      // Fallback on error
      setTimeout(() => {
        const responseText = getKeywordResponse(query);
        setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
        setIsTyping(false);
      }, 550);
    }
  };

  const getKeywordResponse = (userQuery) => {
    const cleanQuery = userQuery.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

    if (cleanQuery.includes("c++") || cleanQuery.includes("cpp")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_food").answer;
    }
    if (cleanQuery.includes("machine learning") || cleanQuery.includes("ml") || cleanQuery.includes("ai") || cleanQuery.includes("artificial intelligence") || cleanQuery.includes("deep learning")) {
      return KNOWLEDGE_BASE.find(k => k.category === "ai_ml").answer;
    }
    if (cleanQuery.includes("database") || cleanQuery.includes("databases") || cleanQuery.includes("sql") || cleanQuery.includes("oracle") || cleanQuery.includes("mongodb") || cleanQuery.includes("schema")) {
      return KNOWLEDGE_BASE.find(k => k.category === "database").answer;
    }
    if (cleanQuery.includes("food") || cleanQuery.includes("dijkstra")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_food").answer;
    }
    if (cleanQuery.includes("quiz") || cleanQuery.includes("swing")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_quiz").answer;
    }
    if (cleanQuery.includes("diary")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_diary").answer;
    }
    if (cleanQuery.includes("student resource") || cleanQuery.includes("srs")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_student").answer;
    }
    if (cleanQuery.includes("social media") || cleanQuery.includes("sdlc")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_social").answer;
    }
    if (cleanQuery.includes("jhootay") || cleanQuery.includes("ecommerce") || cleanQuery.includes("woocommerce") || cleanQuery.includes("wordpress")) {
      return KNOWLEDGE_BASE.find(k => k.category === "project_ecommerce").answer;
    }

    for (const item of KNOWLEDGE_BASE) {
      for (const kw of item.keywords) {
        const escapedKw = escapeRegExp(kw);
        const startBoundary = /^\w/.test(kw) ? '\\b' : '';
        const endBoundary = /\w$/.test(kw) ? '\\b' : '';
        const boundaryRegex = new RegExp(`${startBoundary}${escapedKw}${endBoundary}`, 'i');
        if (boundaryRegex.test(cleanQuery)) {
          return item.answer;
        }
      }
    }

    return "I'm sorry, I didn't quite catch that. As Tayyab's assistant, I am specialized in his academic and software engineering background. You can ask me about his projects, database skills, AI/ML exposure, or contact details!";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[360px] h-[480px] bg-[#121418] border border-white/5 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#0A0B0D] px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* pulsing status indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white font-space tracking-wide">Tayyab's Assistant</h4>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {isAIAvailable ? 'Gemini AI Assistant' : 'Rule-Based Helper'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleClearChat}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full cursor-pointer"
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line max-w-[85%] ${msg.sender === 'user'
                        ? 'bg-[#E91E63] text-white rounded-tr-none shadow-md shadow-[#E91E63]/10'
                        : 'bg-white/5 border border-white/5 text-gray-300 rounded-tl-none'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed bg-white/5 border border-white/5 text-gray-300 rounded-tl-none">
                    <div className="flex space-x-1.5 py-1 items-center justify-center w-8">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions pills */}
            <div className="px-4 py-2 bg-[#121418]/60 flex flex-wrap gap-1.5 border-t border-white/5">
              {suggestQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 text-[11px] font-sans font-medium rounded-full bg-white/5 text-gray-400 border border-white/5 hover:border-[#E91E63]/30 hover:text-[#E91E63] hover:bg-[#E91E63]/5 transition-all text-left cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="bg-[#0A0B0D] p-3 border-t border-white/5 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-[#121418] border border-white/5 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] transition-all"
              />
              <button
                type="submit"
                className="p-2 bg-[#E91E63] hover:bg-[#C2185B] text-white rounded-lg transition-colors shadow-md shadow-[#E91E63]/10 flex items-center justify-center cursor-pointer"
                aria-label="Send Message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#E91E63] hover:bg-[#C2185B] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#E91E63]/25 cursor-pointer transition-colors relative"
        aria-label="Toggle assistant widget"
      >
        <MessageSquare size={24} className="stroke-[2px]" />
        {/* subtle badge ring */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A0B0D] rounded-full"></span>
      </motion.button>
    </div>
  );
}
