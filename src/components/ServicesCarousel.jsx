import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const servicesList = [
  {
    num: "01",
    title: "Full-Stack Web Development",
    desc: "Designing and engineering responsive, high-performance web applications. Expertise in React, Node.js, Express, REST APIs, and database modeling.",
    gradient: "from-[#FF1A1A]/10 to-[#121212]"
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Developing cross-platform mobile apps using React Native and Expo. Implementing live GPS tracking, OTP auth, local storage, and push notifications.",
    gradient: "from-[#FF1A1A]/5 to-[#121212]"
  },
  {
    num: "03",
    title: "AI-Powered Data Analysis",
    desc: "Leveraging Python and data analysis paradigms. Focused on cleaning, parsing datasets, generating statistical models, and creating automated visual reports.",
    gradient: "from-[#E53935]/10 to-[#121212]"
  },
  {
    num: "04",
    title: "Software Documentation & SRS",
    desc: "Authored system models using Agile processes, including full Software Requirements Specifications (SRS), Software Design Documents (SDD), and UML architectures.",
    gradient: "from-[#FF1A1A]/8 to-[#121212]"
  },
  {
    num: "05",
    title: "E-Commerce Solutions",
    desc: "Launching custom operational e-commerce stores with WooCommerce and WordPress, including advanced checkout flows, payment processing, and SEO setups.",
    gradient: "from-[#E53935]/5 to-[#121212]"
  }
];

export default function ServicesCarousel() {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-10 px-4">
      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          // When viewport >= 768px (medium screen), show 3 slides
          768: {
            slidesPerView: 3,
          }
        }}
        coverflowEffect={{
          rotate: 5,
          stretch: 15,
          depth: 120,
          modifier: 2.0,
          slideShadows: false,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.custom-swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-prev',
        }}
        className="services-swiper py-12"
      >
        {servicesList.map((service, idx) => (
          <SwiperSlide key={idx} className="transition-all duration-300">
            {({ isActive }) => (
              <div 
                className={`glass-card rounded-2xl border border-white/5 p-8 flex flex-col justify-between h-[360px] relative overflow-hidden bg-gradient-to-br ${service.gradient} transition-transform duration-500 ${
                  isActive 
                    ? 'scale-105 border-red-500/30 shadow-[0_15px_40px_-15px_rgba(255,26,26,0.25)]' 
                    : 'scale-90 opacity-60'
                }`}
              >
                {/* Traffic lights decoration & Number */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] block"></span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500 tracking-wider">
                    //{service.num}
                  </span>
                </div>

                {/* Service Info */}
                <div className="my-auto space-y-4">
                  <h3 className="text-2xl font-bold font-display text-white tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Explore link */}
                <div className="w-full text-left">
                  <a
                    href="#contact"
                    className="text-xs font-mono font-bold tracking-wider text-red-500 hover:text-white transition-colors duration-300 flex items-center space-x-1.5 group"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactSection = document.querySelector('#contact');
                      if (contactSection) {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = contactSection.getBoundingClientRect().top;
                        window.scrollTo({
                          top: elementRect - bodyRect - offset,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    <span>— EXPLORE DETAILS</span>
                  </a>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls and Pagination */}
      <div className="flex justify-between items-center w-full max-w-xs mx-auto mt-8">
        {/* Left Arrow Button */}
        <button 
          className="custom-swiper-prev p-3 border border-white/10 hover:border-red-500/50 bg-[#0C0C0C] text-gray-400 hover:text-white rounded-full transition-all cursor-pointer hover:shadow-[0_0_15px_-3px_rgba(255,26,26,0.3)] z-10"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Bullet Pagination Container */}
        <div className="custom-swiper-pagination flex justify-center items-center space-x-2">
          {/* Swiper will inject bullet span elements here, styled dynamically */}
        </div>

        {/* Right Arrow Button */}
        <button 
          className="custom-swiper-next p-3 border border-white/10 hover:border-red-500/50 bg-[#0C0C0C] text-gray-400 hover:text-white rounded-full transition-all cursor-pointer hover:shadow-[0_0_15px_-3px_rgba(255,26,26,0.3)] z-10"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Embedded Swiper Pagination Custom Styling */}
      <style>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          background: #333333;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          border-radius: 9999px;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #FF1A1A;
          width: 24px;
          box-shadow: 0 0 10px rgba(255, 26, 26, 0.5);
        }
      `}</style>
    </div>
  );
}
