'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCategoryQuery } from '../hooks/useCategoryHooks';
import { motion } from 'framer-motion';

const staticCategoryImages = {
  redwine: '/red.png',
  whitewine: '/white.png',
  rosewine: '/rose.png',
};

const normalizeCategoryName = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .replace(/s$/, '');

const SelectionsSection = ({  className = '' }) => {
  const router = useRouter();
  const { data: categories, isLoading, isError } = useCategoryQuery();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError || !categories) return <div className="text-red-500">Failed to load categories</div>;

  const handleCategoryClick = (categoryName) => {
    router.push(`/wines?category=${encodeURIComponent(categoryName)}#categories`);
  };

  return (
    <section
    id="selections"
      className={`bg-[#031B28] w-full py-32 px-4 md:px-20 flex flex-col items-center justify-center ${className}`}
    >
      {/* Animated Header */}
      <div className="flex flex-col items-center mb-20 w-full">
        <div className="flex items-center gap-4 justify-center">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Image src="/cork.png" alt="Corkscrew" width={80} height={80} />
          </motion.div>

          <motion.h1
            className="text-[#E2C269] text-5xl sm:text-6xl font-bold"
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Selections
          </motion.h1>
        </div>
      </div>

      {/* Category Bottles */}
      <div className="flex flex-wrap items-end justify-center gap-20 sm:gap-60 max-w-7xl w-full">
        {categories.map((cat, index) => {
          const normalized = normalizeCategoryName(cat.name);
          const imageSrc = staticCategoryImages[normalized];

          if (!imageSrc) {
            console.warn(`No image for category: ${cat.name}`);
            return null;
          }

          return (
            <motion.div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer hover:opacity-90 transition duration-300"
              onClick={() => handleCategoryClick(cat.name)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-[140px] h-[380px] sm:w-[180px] sm:h-[480px] flex items-end justify-center">
                <Image
                  src={imageSrc}
                  alt={`${cat.name} Bottle`}
                  width={160}
                  height={400}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
              <p className="text-[#E2C269] font-serif font-semibold text-xl sm:text-2xl mt-6 tracking-wide text-center">
                {cat.name}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SelectionsSection;
