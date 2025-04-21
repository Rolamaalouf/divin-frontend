'use client';

import React, { useState } from "react";
import ProductForm from "../../components/products/ProductForm";
import ProductList from "../../components/products/ProductList";
import CategoryForm from "../../components/categories/CategoryForm";
import CategoryList from "../../components/categories/CategoryList";
import { useProducts } from "../../hooks/useProductHooks";

const AdminItemsPage = () => {
  const [tab, setTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: products, isLoading: productsLoading } = useProducts();

  // Filter products based on selectedCategory
  const filteredProducts = selectedCategory
    ? products?.filter(p => String(p.category_id) === String(selectedCategory))
    : products;

  return (
    <div className="p-1">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 px-4 pt-4">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded ${
            tab === "products"
              ? "bg-[#E2C269] text-[#1B2930]"
              : "bg-gray-200 text-[#1B2930]"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("categories")}
          className={`px-4 py-2 rounded ${
            tab === "categories"
              ? "bg-[#E2C269] text-[#1B2930]"
              : "bg-gray-200 text-[#1B2930]"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Product Tab */}
      {tab === "products" && (
        <div className="space-y-6">
          <ProductForm
            selectedProduct={editingProduct}
            onSuccess={() => setEditingProduct(null)}
          />
          <ProductList
            onEdit={(prod) => setEditingProduct(prod)}
            products={filteredProducts}
            isLoading={productsLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      )}

      {/* Category Tab */}
      {tab === "categories" && (
        <div className="space-y-6">
          <CategoryForm
            selectedCategory={editingCategory}
            onSuccess={() => setEditingCategory(null)}
          />
          <CategoryList onEdit={(cat) => setEditingCategory(cat)} />
        </div>
      )}
    </div>
  );
};

export default AdminItemsPage;
