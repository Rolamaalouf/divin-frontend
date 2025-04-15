'use client';

import { useUsers } from '../../context/UserContext';
import { useEffect } from 'react';
import { useUserForm } from '../../hooks/useUserform';
import { useUserTable } from '../../hooks/useUserTable';
import { UserForm } from '../../components/UserForm';
import { UserTable } from '../../components/UserTable';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersPage() {
  const {
    users,
    loading,
    fetchUsers,
    updateUser,
    removeUser,
    registerNewUser,
  } = useUsers();

  const {
    formData,
    isEdit,
    handleInputChange,
    updateAddress,
    handleSubmit,
    handleEdit,
    formRef,
  } = useUserForm({ updateUser, registerNewUser });

  const { handleDelete } = useUserTable({ removeUser });

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log('Rendering UsersPage. Users:', users); // Debug

  return (
    <div className="p-4 md:p-6 text-[#001f3f]">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <UserForm
        formRef={formRef}
        formData={formData}
        handleInputChange={handleInputChange}
        updateAddress={updateAddress}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
      />

      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
