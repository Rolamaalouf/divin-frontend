'use client';

import React, { useEffect, useState } from 'react';
import { useCategoryQuery } from '../hooks/useCategoryHooks';

const GlassFilterSection = ({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
  const { data: categories, isLoading, isError } = useCategoryQuery();
  const [dynamicText, setDynamicText] = useState('All our wines will leave you craving for more.');

  useEffect(() => {
    updateDynamicText(selectedCategory);
  }, [selectedCategory]);

  const updateDynamicText = (category) => {
    let text;
    switch (category) {
      case '1':
        text = 'Our white wines promise to delight your senses and leave you wanting more.';
        break;
      case '2':
        text = 'Our red wines are bold, rich, and full of flavor.';
        break;
      case '3':
        text = 'Our rosé wines are the perfect balance of flavor and finesse.';
        break;
      default:
        text = 'All our wines will leave you craving for more.';
        break;
    }
    setDynamicText(text);
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    updateDynamicText(selected);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const getGlassImage = () => {
    switch (selectedCategory) {
      case '1':
        return '/white-glass.png';
      case '2':
        return '/red-glass.png';
      case '3':
        return '/pink-glass.png';
      default:
        return '/allglasses.png';
    }
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div className="relative w-full md:w-[1540px] h-[300px] bg-[#1B2930] mb-10 mt-10 flex items-center px-4 md:px-10 box-border gap-6">
      {/* Text on the left */}
      <div className="text-[#E2C269] font-bold text-lg md:text-xl w-1/3 text-left">
        {dynamicText}
      </div>

      {/* Glass image centered */}
      <div className="flex justify-center flex-1">
        <div className="w-[150px] h-[300px] md:w-[180px] md:h-[360px] flex items-center justify-center overflow-hidden">
          <img
            src={getGlassImage()}
            alt="Wine Glass"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      {/* Buttons on the right */}
      <div className="flex gap-4 w-1/3 justify-end flex-wrap">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-[150px] md:w-[203px] h-[56px] md:h-[76px] bg-[#1B2930] border border-[#E2C269] text-[#E2C269] px-4 py-2 text-sm md:text-base"
        >
          <option value="">All Wines</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-[150px] md:w-[203px] h-[56px] md:h-[76px] bg-[#1B2930] border border-[#E2C269] text-[#E2C269] px-4 py-2 text-sm md:text-base"
        >
          <option value="">Sort</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default GlassFilterSection;
