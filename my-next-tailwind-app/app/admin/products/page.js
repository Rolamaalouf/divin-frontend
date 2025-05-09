'use client';

import React, { useState, useCallback } from "react";
import ProductForm from "../../components/products/ProductForm";
import ProductTable from "../../components/products/ProductTable";
import CategoryForm from "../../components/categories/CategoryForm";
import CategoryList from "../../components/categories/CategoryList";
import { useProducts, useDeleteProduct } from "../../hooks/useProductHooks";

const AdminItemsPage = () => {
  const [tab, setTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const filteredProducts = selectedCategory
    ? products?.filter((p) => String(p.category_id) === String(selectedCategory))
    : products;

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const tabButtonClass = (currentTab) =>
    `px-4 py-2 rounded ${
      tab === currentTab ? "bg-[#E2C269] text-[#1B2930]" : "bg-gray-200 text-[#1B2930]"
    }`;

  return (
    <div className="p-1">
      <div className="flex space-x-4 mb-6 px-4 pt-4">
        <button onClick={() => setTab("products")} className={tabButtonClass("products")}>
          Products
        </button>
        <button onClick={() => setTab("categories")} className={tabButtonClass("categories")}>
          Categories
        </button>
      </div>

      {tab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between px-4">
            <button
              onClick={handleAddProduct}
              className="bg-[#E2C269] text-[#1B2930] px-4 py-2 rounded"
            >
              Add Product
            </button>
            {showForm && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(false);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>

          {showForm && (
            <ProductForm
              selectedProduct={editingProduct}
              onSuccess={() => {
                setEditingProduct(null);
                setShowForm(false);
              }}
            />
          )}

          <ProductTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showCategoryFilter={true}
          />
        </div>
      )}

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
