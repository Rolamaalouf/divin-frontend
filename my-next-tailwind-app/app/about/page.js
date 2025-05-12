'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react'; 
import CarouselSection from '../components/carousel';
import LegacySection from '../components/sectionAbout';

const timelineData = [
  {
    year: '2013',
    title: 'Signature Collection Launch',
    description: 'Launched our signature collection, celebrated for its innovative blends and authentic character.',
    image: '/imageone.jpeg',
  },
  {
    year: '2018',
    title: 'Sustainability Initiatives',
    description: 'Committed to sustainability, implementing eco-friendly practices across our vineyards and production processes.',
    image: '/imagetwo.jpg',
  },
  {
    year: '2022 - Present',
    title: 'Global Expansion',
    description: 'Expanded our global presence, bringing our distinct wine selections to new markets and connoisseurs worldwide.',
    image: '/imagethree.jpg',
  },
];

function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const btnRefs = useRef([]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : timelineData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < timelineData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full max-w-10xl mx-auto px-8 sm:px-12 mt-20 mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-[#34434F] mt-[-60] mb-10 text-center tracking-tight">
        Sips of the Past
      </h2>

      <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8 items-center justify-center w-full">
        {/* Left: Image */}
        <div className="w-full flex justify-center mb-10 md:mb-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={timelineData[activeIndex].image}
              src={timelineData[activeIndex].image}
              alt={timelineData[activeIndex].year}
              className="rounded shadow-lg w-full max-w-3xl object-cover h-auto"
              initial={{ opacity: 0.3, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* Middle: Year selector + arrows */}
        <div className="relative flex flex-col items-center gap-2">
          <button onClick={handlePrev} className="text-[#1B2930] hover:text-[#c9a849] mb-2">
            <ChevronUp size={30} />
          </button>

          {timelineData.map((item, idx) => (
            <button
              key={item.year}
              ref={(el) => (btnRefs.current[idx] = el)}
              className={`px-4 py-2 text-lg md:text-xl font-semibold transition-all ${
                activeIndex === idx
                  ? 'text-[#E2C269] scale-110'
                  : 'text-[#34434F] hover:text-[#E2C269]'
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              {item.year}
            </button>
          ))}

          <button onClick={handleNext} className="text-[#1B2930] hover:text-[#c9a849] mt-2">
            <ChevronDown size={30} />
          </button>
        </div>

        {/* Right: Content */}
        <div className="w-full flex flex-col justify-center items-start text-left mt-10 md:mt-0">
          <h3 className="text-[#E2C269] text-3xl md:text-4xl font-extrabold mb-2">
            {timelineData[activeIndex].year}
          </h3>
          <h4 className="text-2xl md:text-3xl font-bold text-[#34434F] mb-4">
            {timelineData[activeIndex].title}
          </h4>
          <p className="text-gray-700 text-lg max-w-prose leading-relaxed">
            {timelineData[activeIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen text-gray-800 overflow-visible">
      {/* HERO SECTION */}
      <div className="relative h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Image
            src="/aboutimage.png"
            alt="About Background"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <Header className="bg-[#1B2930] bg-opacity-90 shadow-md" />
        <motion.div
          className="absolute top-[60%] right-[10%] transform -translate-y-1/2 text-right"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[#E2C269] text-[64px] font-bold leading-tight">
            About<br />Us
          </h1>
        </motion.div>
      </div>

      {/* Updated Timeline */}
      <Timeline />

      <CarouselSection />
      <LegacySection />
    </div>
  );
}
