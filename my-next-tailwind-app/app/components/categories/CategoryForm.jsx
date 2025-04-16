import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCreateCategory, useUpdateCategory } from '../../hooks/useCategoryHooks'

const CategoryForm = ({ selectedCategory, onSuccess }) => {
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      setId(selectedCategory.id);
      setName(selectedCategory.name || '');
    } else {
      resetForm();
    }
  }, [selectedCategory]);

  const resetForm = () => {
    setName('');
    setId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    try {
      if (id) {
        // Update category
        updateCategory({ id, data: { name } });
        toast.success('Category updated!');
      } else {
        // Create category
        createCategory({ name });
        toast.success('Category created!');
      }

      resetForm();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save category');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md w-full mx-auto">
      <h2 className="text-lg font-bold mb-4">{id ? 'Edit Category' : 'Add Category'}</h2>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="bg-[#E2C269] text-[#33434F] px-4 py-2 rounded w-full">
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default CategoryForm;
