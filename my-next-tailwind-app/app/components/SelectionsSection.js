'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCategoryQuery } from '../hooks/useCategoryHooks';

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
    .replace(/s$/, ''); // remove trailing 's' (e.g., 'wines' → 'wine')

const SelectionsSection = () => {
  const router = useRouter();
  const { data: categories, isLoading, isError } = useCategoryQuery();

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError || !categories) return <div className="text-red-500">Failed to load categories</div>;

  const handleCategoryClick = (categoryName) => {
    router.push(`/wines?category=${encodeURIComponent(categoryName)}#categories`);
  };

  return (
    <section className="bg-[#1B2930] w-full py-16 px-4 md:px-20 flex flex-col items-center justify-center">
      {/* Centered Header Section */}
      <div className="flex flex-col items-center mb-12 w-full">
        <div className="flex items-center gap-4 justify-center">
          <Image src="/cork.png" alt="Corkscrew" width={100} height={100} />
          <h1 className="text-[#E2C269] text-6xl font-bold">Selections</h1>
        </div>
      </div>

      {/* Bottles Row */}
      <div className="flex flex-row items-end justify-center gap-24 w-full max-w-5xl">
        {categories.map((cat) => {
          const normalized = normalizeCategoryName(cat.name);
          const imageSrc = staticCategoryImages[normalized];

          if (!imageSrc) {
            console.warn(`No image for category: ${cat.name}`);
            return null;
          }

          return (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer hover:opacity-90 flex-1"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="w-[140px] h-[400px] flex items-end justify-center">
                <Image
                  src={imageSrc}
                  alt={`${cat.name} Bottle`}
                  width={120}
                  height={320}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-[#E2C269] font-bold text-lg mt-6 text-center">{cat.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};


export default SelectionsSection;
