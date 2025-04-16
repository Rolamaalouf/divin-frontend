import React from 'react';
import { useProducts, useDeleteProduct } from '../../hooks/useProductHooks';
import { toast } from 'react-toastify';

const ProductList = ({ onEdit }) => {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (!confirm('Delete this product?')) return;
    deleteProduct.mutate(id, {
      onSuccess: () => toast.success('Product deleted'),
      onError: () => toast.error('Delete failed'),
    });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (!products?.length) return <p>No products found.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 shadow rounded">
          <img
            src={Array.isArray(product.image) ? product.image[0] : product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-sm text-gray-600">${product.price}</p>
          <div className="flex justify-between mt-3">
            <button onClick={() => onEdit(product)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDelete(product.id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
