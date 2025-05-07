'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCategoryQuery } from '../hooks/useCategoryHooks';
import {motion} from "framer-motion"

// Map normalized category names to image paths
const staticCategoryImages = {
  redwine: '/red.png',
  whitewine: '/white.png',
  rosewine: '/rose.png',
};

const normalizeCategoryName = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '') // remove spaces
    .replace(/s$/, ''); // remove trailing 's'

const SelectionsSection = ({ className = '' }) => {
  const router = useRouter();
  const { data: categories, isLoading, isError } = useCategoryQuery();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError || !categories) return <div className="text-red-500">Failed to load categories</div>;

  const handleCategoryClick = (categoryName) => {
    router.push(`/wines?category=${encodeURIComponent(categoryName)}#categories`);
  };


  return (
    <section
      className={`bg-[#1B2930] w-full py-16 px-4 md:px-20 flex flex-col items-center justify-center ${className}`}
    >
      {/* Animated Header */}
      <div className="flex flex-col items-center mb-12 w-full">
        <div className="flex items-center gap-4 justify-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image src="/cork.png" alt="Corkscrew" width={100} height={100} />
          </motion.div>

          <motion.h1
            className="text-[#E2C269] text-6xl font-bold"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Selections
          </motion.h1>
        </div>
      </div>

      {/* Category Bottles */}
      <div className="flex flex-row items-end justify-center gap-32 w-full max-w-5xl flex-wrap">
        {categories.map((cat) => {
          const normalized = normalizeCategoryName(cat.name);
          const imageSrc = staticCategoryImages[normalized];

          if (!imageSrc) {
            console.warn(`No image for category: ${cat.name}`);
            return null;
          }

          return (
            <motion.div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer hover:opacity-90 flex-1 max-w-[160px]"
              onClick={() => handleCategoryClick(cat.name)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-[160px] h-[420px] flex items-end justify-center">
                <Image
                  src={imageSrc}
                  alt={`${cat.name} Bottle`}
                  width={140}
                  height={340}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-[#E2C269] font-bold text-lg mt-6 text-center">{cat.name}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SelectionsSection;