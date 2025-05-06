export default function OrderDetail({ order }) {
    const {
      id,
      user_id,
      guest_id,
      name,
      email,
      status,
      shipping_fees,
      createdAt,
      address,
      orderItems = [],
      user, // user object from the backend
    } = order;
  
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Order #{id}</h1>
  
        <div className="mb-4 space-y-1">
          {user_id ? (
            <>
              <p><strong>User ID:</strong> {user?.id}</p>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {name || 'Guest'}</p>
              <p><strong>Email:</strong> {email || 'N/A'}</p>
            </>
          )}
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Shipping Fee:</strong> ${shipping_fees?.toFixed(2)}</p>
          <p><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</p>
        </div>
  
        {address && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <p><strong>Region:</strong> {address.region}</p>
            <p><strong>Direction:</strong> {address["address-direction"]}</p>
            <p><strong>Building:</strong> {address.building}</p>
            <p><strong>Floor:</strong> {address.floor}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
          </div>
        )}
  
        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-2">Order Items</h2>
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <div key={item.id} className="border-b py-2">
              <p>
                <strong>{item.product?.name || 'Unnamed Product'}</strong> - ${item.price} × {item.quantity}
              </p>
            </div>
          ))
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    );
  }
  