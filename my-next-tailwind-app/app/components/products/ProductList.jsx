import React, { useState } from 'react';
import { useProducts, useDeleteProduct } from '../../hooks/useProductHooks';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Eye, Pencil, Trash2, X } from 'lucide-react';

const ProductList = ({ onEdit }) => {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const [previewImage, setPreviewImage] = useState(null);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            deleteProduct.mutate(id, {
              onSuccess: () => toast.success('Product deleted'),
              onError: () => toast.error('Delete failed'),
            }),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  const handleEdit = (product) => {
    onEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (!products?.length) return <p>No products found.</p>;

  return (
    <>
      {/* Modal */}
      {previewImage && (
  <div
    className="fixed inset-0 bg-transparent bg-opacity-70 z-50 flex items-center justify-center"
    onClick={() => setPreviewImage(null)}
  >
    <div
      className="relative bg-transparent p-4"
      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to the backdrop
    >

      <img
        src={previewImage}
        alt="Preview"
        className="w-[300px] h-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
)}



      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded relative">
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-2 text-[#1B2930]">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="text-sm text-gray-600 mt-1">Stock: {product.stock}</p>

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
    </>
  );
};

export default ProductList;
