import { useState, useEffect } from 'react';

const OrderItemForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    order_id: '',
    product_id: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        order_id: initialData.order_id ?? '',
        product_id: initialData.product_id ?? '',
        quantity: initialData.quantity ?? '',
        price: initialData.price ?? '',
      });
    }
  }, [initialData]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-4 border rounded space-y-3">
      {['order_id', 'product_id', 'quantity', 'price'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ))}
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 border">Cancel</button>}
      </div>
    </form>
  );
};

export default OrderItemForm;
