import { useState } from "react";
import { toast } from "react-toastify";
import { useAddToCart} from "../hooks/useCartHooks";
import { useAddToWishlist } from "../hooks/useWishlistHooks";


const ProductActions = ({ product, currentUser }) => {
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToCart, isPending: addingToCart } = useAddToCart();
  const { mutate: addToWishlist, isPending: addingToWishlist } = useAddToWishlist();


  const handleAddToCart = () => {
    if (!product?.id) return toast.error("Invalid product data");
    if (quantity < 1) return toast.error("Select a valid quantity");
    if (product.stock < quantity) return toast.error(`Only ${product.stock} in stock`);

    addToCart({ product_id: product.id, quantity });
  };

  const handleAddToWishlist = () => {
    addToWishlist(
      { product_id: product.id },
      {
        onSuccess: () => toast.success("Added to wishlist!"),
        onError: (err) =>
          toast.error(err.response?.data?.message || "Failed to add to wishlist"),
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <span className="text-xs text-gray-500">In stock: {product.stock}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={addingToCart || product.stock < 1}
          className="bg-[#1B2930] text-white px-4 py-2 rounded hover:brightness-110 disabled:opacity-50"
        >
          {addingToCart ? "Adding..." : product.stock < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
        <button
          onClick={handleAddToWishlist}
          disabled={addingToWishlist}
          className="bg-[#E2C269] text-[#1B2930] px-4 py-2 rounded hover:brightness-110 disabled:opacity-50"
        >
          {addingToWishlist ? "Adding..." : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
