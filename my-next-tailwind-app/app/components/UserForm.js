import AddressForm from './AddressForm';

export const UserForm = ({
  formRef,
  formData,
  handleInputChange,
  updateAddress,
  handleSubmit,
  isEdit,
}) => {
  console.log('Rendering UserForm, isEdit:', isEdit); // Debug

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        console.log('Form submit triggered'); // Debug
        handleSubmit(e);
      }}
      className="bg-white p-4 rounded shadow-md mb-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="border p-2 rounded w-full"
        />
        {!isEdit && (
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="border p-2 rounded w-full"
          />
        )}
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <div className="col-span-1 md:col-span-2">
          <AddressForm address={formData.address} updateAddress={updateAddress} />
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#34434F] text-white px-4 py-2 rounded w-full md:w-auto"
      >
        {isEdit ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};
