'use client';

import React, { useState, useEffect } from 'react';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProductHooks';
import { useCategoryQuery } from '../../hooks/useCategoryHooks'; // Use React Query for categories
import { toast } from 'react-toastify';

const ProductForm = ({ selectedProduct, onSuccess }) => {
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useCategoryQuery();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: 0,
    category_id: '',
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name ?? '',
        description: selectedProduct.description ?? '',
        price: selectedProduct.price ?? '',
        stock: selectedProduct.stock ?? 0,
        category_id: selectedProduct.category_id ?? '',
      });

      const previewImages = Array.isArray(selectedProduct.image)
        ? selectedProduct.image
        : selectedProduct.image
        ? [selectedProduct.image]
        : [];

      setPreview(previewImages);
    } else {
      resetForm();
    }
    // eslint-disable-next-line
  }, [selectedProduct]);

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      price: '',
      stock: 0,
      category_id: '',
    });
    setImages([]);
    setPreview([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category_id } = form;
    if (!name || !price || !category_id) {
      toast.error('All required fields must be filled');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    images.forEach((img) => formData.append('images', img));

    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({ id: selectedProduct.id, data: formData });
        toast.success('Product updated!');
      } else {
        await createProduct.mutateAsync(formData);
        toast.success('Product created!');
      }

      resetForm();
      onSuccess?.();
    } catch (err) {
      toast.error('Failed to save product');
      console.error('Submit error:', err);
    }
  };

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Error loading categories.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-xl w-full mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedProduct ? 'Edit' : 'Add'} Product
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        rows={3}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        {(categories || []).map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="mb-3"
        accept="image/*"
      />

      <div className="flex gap-2 overflow-x-auto mb-4">
        {preview.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`preview-${i}`}
            className="h-20 w-20 object-cover rounded"
          />
        ))}
      </div>

      <div className="flex justify-end space-x-3 mt-4">
  <button
    type="submit"
    className="bg-[#E2C269] text-[#1B2930] px-4 py-2 rounded"
  >
    {selectedProduct ? 'Update' : 'Add'}
  </button>
  <button
    type="button"
    onClick={() => {
      resetForm();
      onSuccess?.();
    }}
    className="bg-gray-400 text-white px-4 py-2 rounded"
  >
    Cancel
  </button>
</div>

    </form>
  );
};

export default ProductForm;
