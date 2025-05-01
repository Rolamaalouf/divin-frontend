'use client';

import { useState, useEffect } from 'react';
import AddressForm from '../AddressForm';
import { validateAddress } from '../validation';
import { notify } from '../toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const defaultAddress = {
  phone: '',
  region: '',
  'address-direction': '',
  building: '',
  floor: '',
};

const OrderForm = ({ initialData, initialOrderItems = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    guest_id: '',
    address: defaultAddress,
    shipping_fees: '',
    status: '',
    promocode: '',
  });

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        user_id: initialData.user_id ?? '',
        guest_id: initialData.guest_id ?? '',
        address: {
          phone: initialData.address?.phone ?? '',
          region: initialData.address?.region ?? '',
          'address-direction': initialData.address?.['address-direction'] ?? '',
          building: initialData.address?.building ?? '',
          floor: initialData.address?.floor ?? '',
        },
        shipping_fees: initialData.shipping_fees ?? '',
        status: initialData.status ?? '',
        promocode: initialData.promocode ?? '',
      });
    }

    if (initialOrderItems?.length) {
      setOrderItems(initialOrderItems);
    }
  }, [JSON.stringify(initialData), JSON.stringify(initialOrderItems)]); // Prevent infinite loop

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (updatedAddress) => {
    setFormData((prev) => ({ ...prev, address: updatedAddress }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAddress(formData.address)) {
      notify('error', 'Please complete all address fields.');
      return;
    }

    notify('success', 'Order submitted successfully');
    onSubmit({ ...formData, orderItems });
  };

  const handleCancelConfirm = () => {
    confirmAlert({
      title: 'Cancel Changes?',
      message: 'Are you sure you want to cancel? Unsaved changes will be lost.',
      buttons: [
        {
          label: 'Yes, Cancel',
          onClick: () => {
            notify('info', 'Order form cancelled');
            onCancel?.();
          },
        },
        {
          label: 'No',
          onClick: () => notify('info', 'Cancel aborted'),
        },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <input
        name="user_id"
        placeholder="User ID"
        value={formData.user_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="guest_id"
        placeholder="Guest ID"
        value={formData.guest_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <AddressForm address={formData.address} onChange={handleAddressChange} />

      <input
        name="shipping_fees"
        placeholder="Shipping Fees"
        value={formData.shipping_fees}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="promocode"
        placeholder="Promocode"
        value={formData.promocode}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        {onCancel && (
          <button type="button" onClick={handleCancelConfirm} className="px-4 py-2 border">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;
