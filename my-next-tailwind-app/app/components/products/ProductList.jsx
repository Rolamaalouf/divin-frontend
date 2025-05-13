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
import { useRouter } from 'next/navigation';

const ProductList = ({
  onEdit,
  products,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  showCategoryFilter = false,
  showActions = false,
  showDescription = true,
  showControls = true,
  showStock = true,
  showPopupOnClick = false,
}) => {
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useCategoryQuery();
  const deleteProduct = useDeleteProduct();
  const queryClient = useQueryClient();

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Products per page

  const router = useRouter();

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

  // Pagination logic
  const totalProducts = products ? products.length : 0;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const paginatedProducts = products
    ? products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

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
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
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
      {(!paginatedProducts || paginatedProducts.length === 0) ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 shadow rounded relative cursor-pointer flex flex-col"
              onClick={() => showPopupOnClick && setSelectedProduct(product)}
            >
              <div
                className="w-full h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center overflow-hidden bg-white cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <img
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>

              <h2 className="text-lg font-semibold mt-2 text-[#1B2930]">{product.name}</h2>
              <p className="text-sm text-gray-600">${product.price}</p>

              {showDescription && (
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              )}

              {showStock && (
                <p className="text-sm text-gray-600 mt-1">Stock: {product.stock}</p>
              )}

              {showActions && <ProductActions product={product} showStock={false} />}

              {showControls && (
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
                          Array.isArray(product.image) ? product.image[0] : product.image
                        )
                      }
                      className="text-[#1B2930] hover:scale-110 transition"
                      title="Preview"
                    >
                      <Eye size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#E2C269] text-[#1B2930] rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-[#1B2930] text-[#E2C269]'
                  : 'bg-[#E2C269] text-[#1B2930]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#E2C269] text-[#1B2930] rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
