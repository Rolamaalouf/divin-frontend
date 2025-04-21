'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import { motion } from 'framer-motion';
import CarouselSection from '../components/carousel';

const NAVY = '#223049';

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

  // For indicator position
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  useEffect(() => {
    if (btnRefs.current[activeIndex]) {
      const btn = btnRefs.current[activeIndex];
      setIndicatorTop(btn.offsetTop);
      setIndicatorHeight(btn.offsetHeight);
    }
  }, [activeIndex]);

  return (
        <section className="w-full max-w-10xl mx-auto px-12 mt-12 mb-10 ">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#34434F] mb-12 -mt-3 tracking-tight text-center">
            Sips of the past
          </h2>
      
          <div className="flex flex-col md:grid md:grid-cols-3 md:gap-2 items-center justify-center w-full">
            {/* Left: Image */}
            <div className="w-full flex justify-center mb-8 md:mb-0">
  <Image
    src={timelineData[activeIndex].image}
    alt={timelineData[activeIndex].year + ' Milestone'}
    width={1000}
    height={600}
    className="rounded shadow w-full max-w-3xl object-cover h-auto"
  />
</div>

      
            {/* Middle: Vertical Dates + Indicator */}
            <div className="relative flex flex-col items-center justify-center h-full">

              {/* Year buttons */}
              {timelineData.map((item, idx) => (
                <button
                  key={item.year}
                  ref={el => (btnRefs.current[idx] = el)}
                  className={`relative z-10 px-4 py-3 text-lg md:text-xl font-bold transition-colors ${
                    activeIndex === idx ? 'text-[#E2C269]' : 'text-[#34434F]'
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.year}
                </button>
              ))}
      
            </div>
      
            {/* Right: Text Content */}
            <div className="w-full flex flex-col justify-center items-start mt-8 md:mt-0">
              <h3 className="text-[#E2C269] text-xl md:text-2xl font-semibold">
                {timelineData[activeIndex].year}
              </h3>
              <h4 className="text-2xl md:text-4xl font-bold text-[#34434F] mt-2">
                {timelineData[activeIndex].title}
              </h4>
              <p className="text-gray-700 mt-4 text-lg max-w-prose">
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
      <Timeline />
      <CarouselSection />
    </div>
  );
}
