import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { validateAddress } from '../components/validation';

export const useUserForm = ({ registerNewUser, updateUser }) => {
  const formRef = useRef(null);

  const defaultFormData = {
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'customer',
    address: {
      region: '',
      'address-direction': '',
      phone: '',
      building: '',
      floor: '',
    },
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isEdit, setIsEdit] = useState(false);

  const resetForm = () => {
    console.log('Resetting form'); // Debug
    setFormData(defaultFormData);
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value); // Debug
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateAddress = (updatedField) => {
    console.log('Updating address field:', updatedField); // Debug
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        ...updatedField,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Handling form submit', formData); // Debug

    const isValid = validateAddress(formData.address);
    if (!isValid) {
      toast.error('Please complete all address fields.');
      return;
    }

    try {
      if (isEdit) {
        console.log('Updating user:', formData);
        await updateUser(formData.id, formData);
        toast.success('User updated successfully');
      } else {
        console.log('Creating user:', formData);
        await registerNewUser(formData);
        toast.success('User created successfully');
      }
      resetForm();
    } catch (err) {
      toast.error('Something went wrong');
      console.error('Submission error:', err); // Debug
    }
  };

  const handleEdit = (user) => {
    console.log('Editing user:', user); // Debug
    setFormData({
      ...user,
      password: '',
      address: user.address || defaultFormData.address,
    });
    setIsEdit(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    formData,
    isEdit,
    handleInputChange,
    updateAddress,
    handleSubmit,
    handleEdit,
    formRef,
  };
};
