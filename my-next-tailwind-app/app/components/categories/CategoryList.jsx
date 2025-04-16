import React from 'react';
import { toast } from 'react-toastify';
import { useCategoryQuery, useDeleteCategory, useUpdateCategory } from '../../hooks/useCategoryHooks';


const CategoryList = ({ onEdit }) => {
  const { data: categories, isLoading, isError } = useCategoryQuery();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (category) => {
    // Here you'd pass the selected category to the onEdit function.
    onEdit(category);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;
  if (!categories?.length) return <p>No categories found.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">{cat.name}</h2>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => handleUpdate(cat)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
