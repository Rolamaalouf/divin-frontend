'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import GlassFilterSection from '../components/GlassFilterSelection'; // adjust path if needed
import ProductList from '../components/products/ProductList'; // adjust path if needed
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProductHooks'; // adjust path if needed

export default function WinesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { data: products, isLoading, isError } = useProducts();

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products?.filter((p) => String(p.category_id) === String(selectedCategory))
    : products;

  // Then sort products
  const sortedProducts = filteredProducts?.slice().sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.price - b.price;
    }
    if (sortOrder === 'high-to-low') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="relative w-full min-h-screen text-gray-800 overflow-visible">
      <Header className="bg-[#1B2930] bg-opacity-90 shadow-md" />
      
      {/* HERO SECTION */}
      <div className="relative h-[100vh]">
        <div className="absolute bottom-35 left-0 w-full h-full -z-10">
          <Image
            src="/wines.png"
            alt="Wines Background"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <motion.div
          className="absolute top-[60%] right-[10%] transform -translate-y-1/2 text-right"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[#E2C269] text-[64px] font-bold leading-tight">
            Wines
          </h1>
        </motion.div>
      </div>

      {/* FILTER + PRODUCT LIST SECTION */}
      <div className="max-w-[1600px] mx-auto px-4 py-10">
        <GlassFilterSection 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="mt-10">
          {isError && <p className="text-red-500">Failed to load products.</p>}
          <ProductList 
            products={sortedProducts} 
            isLoading={isLoading} 
            showActions
            showDescription={false}     
            showControls={false} 
            showStock={false}
            showPopupOnClick={true}
          />
        </div>
      </div>
    </div>
  );
}