'use client';

import React, { useState } from 'react';
import { useCategoryQuery } from '../../hooks/useCategoryHooks';
import { useDeleteProduct } from '../../hooks/useProductHooks';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import ProductActions from '../ProductActions';



const ProductList = ({
  onEdit,
  products,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  showCategoryFilter = false, 
  showActions = false, 
}) => {
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useCategoryQuery();
  const deleteProduct = useDeleteProduct();
  const queryClient = useQueryClient();

  const [previewImage, setPreviewImage] = useState(null);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteProduct.mutateAsync(id);
              toast.success('Product deleted');
              queryClient.invalidateQueries(['products']);
            } catch (error) {
              toast.error('Delete failed');
            }
          },
        },
        { label: 'Cancel' },
      ],
    });
  };
  
  const handleEdit = (product) => {
    onEdit?.(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading || categoriesLoading) return <p>Loading...</p>;
  if (categoriesError) return <p>Error loading categories.</p>;

  return (
    <>
      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[400px] max-h-[800px] w-auto h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* 🔥 CONDITIONAL CATEGORY FILTER */}
      {showCategoryFilter && (
        <div className="mb-6">
          <select
            className="px-4 py-2 border rounded w-full max-w-xs text-[#1B2930] bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Product Grid */}
      {(!products || products.length === 0) ? (
        <p>No products found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded relative">
              <div className="w-[400px] h-[800px] flex items-center justify-center overflow-hidden bg-white">
                <div className="w-full h-full px-0 py-26">
                  <img
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold mt-2 text-[#1B2930]">{product.name}</h2>
<p className="text-sm text-gray-600">${product.price}</p>
<p className="text-sm text-gray-600 mt-1">{product.description}</p>
<p className="text-sm text-gray-600 mt-1">Stock: {product.stock}</p>

{showActions && <ProductActions product={product} />}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-[#1B2930] hover:scale-110 transition"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-[#1B2930] hover:scale-110 transition"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>

                {product.image && (
                  <button
                    onClick={() =>
                      setPreviewImage(
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      )
                    }
                    className="text-[#1B2930] hover:scale-110 transition"
                    title="Preview"
                  >
                    <Eye size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
