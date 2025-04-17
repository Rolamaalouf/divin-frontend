import React, { useState } from 'react';
import Image from 'next/image';

const carouselImages = [
  '/carousel/cone.jpeg',
  '/carousel/ctwo.jpeg',
  '/carousel/cthree.jpeg',
  '/carousel/cfour.jpeg',
  '/carousel/cfive.jpeg',
  '/carousel/csix.jpeg',
  '/carousel/cseven.jpg',
  '/carousel/ceight.jpeg',
];

export default function CarouselSection() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 bg-[#1B2930] flex justify-center items-center">
      <div className="relative w-full max-w-2xl flex justify-center items-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 flex items-center justify-center h-full px-3 text-3xl text-[#E2C269] hover:text-white focus:outline-none"
          aria-label="Previous"
        >
          &#8592;
        </button>

        {/* Image */}
        <div className="w-full flex justify-center items-center">
          <Image
            src={carouselImages[current]}
            alt={`Carousel ${current + 1}`}
            width={700}
            height={450}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 flex items-center justify-center h-full px-3 text-3xl text-[#E2C269] hover:text-white focus:outline-none"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
