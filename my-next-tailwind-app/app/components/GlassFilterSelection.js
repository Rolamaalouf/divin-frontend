'use client';

import React, { useEffect, useState } from 'react';
import { useCategoryQuery } from '../hooks/useCategoryHooks';

const GlassFilterSection = ({ selectedCategory, setSelectedCategory }) => {
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
        text = 'Our red wines are bold, rich, and full of flavor. Lorem ipsum.';
        break;
      case '3':
        text = 'Our rosé wines are the perfect balance of flavor and finesse. Lorem ipsum.';
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
    <div className="relative w-full md:w-[1540px] h-[300px] bg-[#1B2930] mb-10 mt-10 flex items-center px-10 box-border">
      {/* Text on the left */}
      <div className="text-[#E2C269] font-bold text-xl w-1/3 text-left">
        {dynamicText}
      </div>

      {/* Glass image centered */}
      <div className="flex justify-center flex-1">
        <img src={getGlassImage()} alt="Wine Glass" className="w-[150px] h-auto" />
      </div>

      {/* Buttons on the right */}
      <div className="flex gap-4 w-1/3 justify-end">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-[203px] h-[76px] bg-[#1B2930] border border-[#E2C269] text-[#E2C269] px-4 py-2"
        >
          <option value="">All Wines</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select className="w-[203px] h-[76px] bg-[#1B2930] border border-[#E2C269] text-[#E2C269] px-4 py-2">
          <option>Sort</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default GlassFilterSection;
