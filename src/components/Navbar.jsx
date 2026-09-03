import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', id: '#home' },
  { label: 'About', id: '#about' },
  { label: 'Intro', id: '#intro-video' },
  { label: 'Experience', id: '#experience' },
  { label: 'Projects', id: '#projects' },
  { label: 'Skills', id: '#skills' },
  { label: 'Build Log', id: '/build-log', isRoute: true },
  { label: 'Contact', id: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    if (location.pathname !== '/') {
      if (location.pathname === '/build-log') {
        setActiveSection('build-log');
      } else {
        setActiveSection('');
      }
      return;
    }

    const sections = ['home', 'about', 'skills', 'services', 'experience', 'projects', 'reviews', 'contact'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px', // Trigger active states in middle of viewport
        }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, [location.pathname]);

  const handleScrollTo = (targetId, isRoute) => {
    setIsOpen(false);

    if (isRoute) {
      navigate(targetId);
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const scroll = (id) => {
      const element = document.querySelector(id);
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

    if (targetId === '#home') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 150);
      } else {
        if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scroll(targetId);
      }, 200);
    } else {
      scroll(targetId);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020817]/85 backdrop-blur-md border-b border-white/6 py-4'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleScrollTo('#home')}
          className="text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          TA<span className="text-[#06B6D4]">YYAB</span>
        </button>

        {/* Center Links (ABOUT, SKILLS, SERVICES, EXPERIENCE, PROJECTS, REVIEWS) */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id.replace('#', '') || (item.isRoute && activeSection === item.id.replace('/', ''));
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id, item.isRoute)}
                className={`text-[14px] font-medium tracking-wide transition-all duration-300 font-sans relative py-1 cursor-pointer group ${
                  isActive ? 'text-[#06B6D4]' : 'text-white/65 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {/* Underline slides up */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#06B6D4] transition-all duration-300 transform ${
                    isActive
                      ? 'translate-y-0 opacity-100 scale-x-100'
                      : 'translate-y-1 opacity-0 scale-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Side CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => handleScrollTo('#contact')}
            style={{ boxShadow: '0 0 20px rgba(6,182,212,0.25)' }}
            className="px-5 py-2 text-[14px] font-medium font-sans text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all duration-300 flex items-center space-x-2 cursor-pointer hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:scale-[1.02]"
          >
            <span>Let's Talk</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white/85 hover:text-white transition-colors cursor-pointer z-50 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 w-full sm:w-[380px] h-[100dvh] bg-[#020817] border-l border-white/10 z-50 flex flex-col justify-between p-8 sm:p-10 lg:hidden shadow-2xl overflow-y-auto"
            >
              {/* Mobile Drawer Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <button
                  onClick={() => handleScrollTo('#home')}
                  className="text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
                >
                  TA<span className="text-[#06B6D4]">YYAB</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/70 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-5 my-auto py-6">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id.replace('#', '') || (item.isRoute && activeSection === item.id.replace('/', ''));
                  return (
                    <motion.button
                      variants={linkVariants}
                      key={item.id}
                      onClick={() => handleScrollTo(item.id, item.isRoute)}
                      className={`text-lg font-bold tracking-widest text-left font-display cursor-pointer relative py-1 group w-fit ${
                        isActive ? 'text-[#06B6D4]' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#06B6D4] transition-all duration-300 transform ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Bottom CTA */}
              <div className="pt-6 border-t border-white/10">
                <motion.button
                  variants={linkVariants}
                  onClick={() => handleScrollTo('#contact')}
                  style={{ boxShadow: '0 0 20px rgba(6,182,212,0.25)' }}
                  className="w-full text-center py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#06B6D4] hover:bg-[#0891B2] rounded-md transition-all font-mono flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>LET'S TALK</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
