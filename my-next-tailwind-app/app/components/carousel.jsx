'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const carouselImages = [
  '/carousel/cone.jpeg',
  '/carousel/ctwo.jpeg',
  '/carousel/cthree.jpeg',
  '/carousel/cfour.jpeg',
  '/carousel/cfive.jpeg',
  '/carousel/csix.jpeg',
  '/carousel/cseven.jpg',
  '/carousel/ceight.jpg',
];

export default function CarouselSection() {
  const [current, setCurrent] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  // Update visibleImages based on screen width
  useEffect(() => {
    const updateVisibleImages = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleImages(1);
      else if (width < 1024) setVisibleImages(2);
      else setVisibleImages(3);
    };

    updateVisibleImages();
    window.addEventListener('resize', updateVisibleImages);
    return () => window.removeEventListener('resize', updateVisibleImages);
  }, []);

  const prevSlide = () => {
    setCurrent(prev => (prev <= 0 ? carouselImages.length - visibleImages : prev - 1));
  };

  const nextSlide = () => {
    setCurrent(prev => (prev >= carouselImages.length - visibleImages ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 bg-[#031B28] flex flex-col items-center relative">
      <h2 className="text-[#E2C269] text-3xl md:text-4xl font-bold text-center mb-8">
        Live the moment
      </h2>

      <div className="relative w-full max-w-7xl flex items-center justify-between overflow-hidden px-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-20 flex items-center justify-center h-full px-3 text-3xl text-[#E2C269] hover:text-white focus:outline-none"
          aria-label="Previous"
        >
          &#8592;
        </button>

        {/* Carousel Images */}
        <div className="flex flex-grow justify-center gap-4 overflow-hidden">
          {carouselImages.slice(current, current + visibleImages).map((src, idx) => (
            <div
              key={idx}
              className="w-full max-w-[300px] aspect-video rounded-lg overflow-hidden bg-gray-200"
            >
              <Image
                src={src}
                alt={`Carousel ${current + idx + 1}`}
                width={300}
                height={169}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-20 flex items-center justify-center h-full px-3 text-3xl text-[#E2C269] hover:text-white focus:outline-none"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
