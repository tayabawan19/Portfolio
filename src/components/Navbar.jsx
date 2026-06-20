import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 120;

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

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height offset
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
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleClick(e, '#home')}
          className="text-xl font-bold tracking-tight text-white font-space hover:text-[#E91E63] transition-colors animate-fade-in"
        >
          TAYYAB<span className="text-[#E91E63]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-sm font-medium transition-colors hover:text-[#E91E63] font-sans ${
                activeSection === item.href.replace('#', '') 
                  ? 'text-[#E91E63]' 
                  : 'text-gray-400'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md border border-[#E91E63]/30 text-white bg-[#E91E63]/10 hover:bg-[#E91E63] hover:border-[#E91E63] transition-all font-mono shadow-sm shadow-[#E91E63]/10"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0B0D]/95 border-b border-gray-800 px-6 py-8 flex flex-col space-y-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-base font-medium transition-colors hover:text-[#E91E63] font-sans ${
                activeSection === item.href.replace('#', '') 
                  ? 'text-[#E91E63]' 
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="w-full text-center py-3 text-sm font-semibold uppercase tracking-wider rounded-md border border-[#E91E63]/30 text-white bg-[#E91E63]/10 hover:bg-[#E91E63] transition-all font-mono"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
