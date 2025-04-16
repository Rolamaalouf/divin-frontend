'use client'

import React, { useState } from "react";
import ProductForm from "../../components/products/ProductForm";
import ProductList from "../../components/products/ProductList";
import CategoryForm from "../../components/categories/CategoryForm";
import CategoryList from "../../components/categories/CategoryList";

const AdminItemsPage = () => {
  const [tab, setTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <div className="p-1">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 px-4 pt-4">
        <button
      onClick={() => setTab("products")}
      className={`px-4 py-2 rounded ${
        tab === "products"
          ? "bg-[#E2C269] text-[#33434F]"
          : "bg-gray-200 text-[#33434F]"
      }`}
    >
     Products
        </button>
        <button
          onClick={() => setTab("categories")}
          className={`px-4 py-2 rounded ${tab === "categories" ? "bg-[#E2C269] text-[#33434F]"
          : "bg-gray-200 text-[#33434F]"}`}
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
          <ProductList onEdit={(prod) => setEditingProduct(prod)} />
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
