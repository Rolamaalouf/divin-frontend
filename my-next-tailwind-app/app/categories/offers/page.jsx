'use client';

import React from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProductHooks';

const OffersPage = () => {
  const { data: products, isLoading, isError } = useProducts();

  // 🔥 Filter offers products
  const offerProducts = products?.filter(
    (product) =>
      product.category?.slug === 'offers' ||
      product.category?.name?.toLowerCase() === 'offers'
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#031B28] flex items-center justify-center text-[#E2C269]">
        Loading offers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#031B28] flex items-center justify-center text-red-500">
        Something went wrong.
      </div>
    );
  }

  if (!offerProducts || offerProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#031B28] flex flex-col items-center justify-center text-[#E2C269]">
        <h2 className="text-2xl mb-4">No active offers 🍷</h2>
        <Link
          href="/shop"
          className="border border-[#E2C269] px-6 py-3 hover:bg-[#E2C269] hover:text-[#031B28] transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#031B28] px-6 md:px-16 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E2C269] mb-2">
          Special Offers 🍷
        </h1>
        <p className="text-[#E2C269]/80">
          Limited-time wines at special prices
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {offerProducts.map((product) => (
          <div
            key={product.id}
            className="relative border border-[#E2C269] rounded-lg overflow-hidden hover:scale-[1.02] transition"
          >
            {/* Offer badge */}
            <span className="absolute top-3 left-3 bg-[#E2C269] text-[#031B28] text-xs font-bold px-3 py-1 rounded-full">
              OFFER
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="text-[#E2C269] font-semibold text-lg mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-sm line-through text-[#E2C269]/60">
                    ${product.oldPrice}
                  </span>
                )}

                <span className="text-lg font-bold text-[#E2C269]">
                  ${product.price}
                </span>
              </div>

              <Link
                href={`/product/${product.slug}`}
                className="block mt-4 text-center border border-[#E2C269] py-2 text-[#E2C269] hover:bg-[#E2C269] hover:text-[#031B28] transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
