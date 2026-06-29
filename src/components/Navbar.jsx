import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', id: '#about' },
  { label: 'SKILLS', id: '#skills' },
  { label: 'SERVICES', id: '#services' },
  { label: 'EXPERIENCE', id: '#experience' },
  { label: 'PROJECTS', id: '#projects' },
  { label: 'REVIEWS', id: '#reviews' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Add blur on scroll
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sections = ['about', 'skills', 'services', 'experience', 'projects', 'reviews'];
      const scrollPos = window.scrollY + 120; // offset

      // If at very top, set active to home
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (targetId) => {
    setIsOpen(false);
    
    // For logo or home, scroll to very top
    if (targetId === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // sticky navbar offset
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

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Split logo (TA bold white + YYAB bold red) */}
        <button 
          onClick={() => handleScrollTo('#home')}
          className="text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          TA<span className="text-[#FF1A1A]">YYAB</span>
        </button>

        {/* Center Links (ABOUT, SKILLS, SERVICES, EXPERIENCE, PROJECTS, REVIEWS) */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-xs font-semibold tracking-widest transition-all duration-300 font-display hover:text-[#FF1A1A] cursor-pointer ${
                activeSection === item.id.replace('#', '') 
                  ? 'text-[#FF1A1A]' 
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Red Contact Button with Phone Icon */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => handleScrollTo('#contact')}
            className="px-5 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white bg-[#FF1A1A] hover:bg-[#E53935] rounded-md transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-md shadow-[#FF1A1A]/20 hover:shadow-[#FF1A1A]/40"
          >
            <Phone size={14} />
            <span>CONTACT</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 border-b border-white/5 px-6 py-8 flex flex-col space-y-6 absolute top-full left-0 w-full backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-sm font-bold tracking-widest text-left font-display hover:text-[#FF1A1A] cursor-pointer ${
                activeSection === item.id.replace('#', '') 
                  ? 'text-[#FF1A1A]' 
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo('#contact')}
            className="w-full text-center py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#FF1A1A] hover:bg-[#E53935] rounded-md transition-all font-mono flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Phone size={14} />
            <span>CONTACT</span>
          </button>
        </div>
      )}
    </nav>
  );
}
