'use client';

import React, { useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ITEMS_PER_PAGE = 5;

const ProductTable = ({ products = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewProduct, setViewProduct] = useState(null);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = products.slice(start, start + ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 text-xl hover:text-red-600"
          >
            ×
          </button>
          <h1 className="text-lg font-bold mb-4 text-[#34434F]">Confirm Deletion</h1>
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(id);
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-[#34434F] text-white">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3 flex space-x-2">
                <button onClick={() => setViewProduct(product)}>
                  <Eye className="text-blue-600" />
                </button>
                <button onClick={() => onEdit(product)}>
                  <Pencil className="text-green-600" />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <Trash2 className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i + 1 ? 'bg-[#E2C269]' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {viewProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[600px] max-w-full relative shadow-lg flex">
      <button
        className="absolute top-2 right-2 text-gray-600 text-xl"
        onClick={() => setViewProduct(null)}
      >
        ×
      </button>
      <div className="w-1/2 pr-4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-2">{viewProduct.name}</h3>
        <p className="mb-2 flex-grow">{viewProduct.description}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {Array.isArray(viewProduct.image)
          ? viewProduct.image.map((img, i) => (
              <img key={i} src={img} alt="product" className="max-w-full max-h-full rounded" />
            ))
          : viewProduct.image && (
              <img src={viewProduct.image} alt="product" className="max-w-full max-h-full rounded" />
            )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductTable;
