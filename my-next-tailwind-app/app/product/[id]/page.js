'use client';

import { useParams } from 'next/navigation';
import { useProduct, useProducts } from '../../hooks/useProductHooks';
import ProductActions from '../../components/ProductActions'; 
import Header from '../../components/header';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Link from 'next/link';

const ProductPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, error } = useProduct(productId);
  const { data: products } = useProducts(); // Fetch all products to filter by category

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product.</p>;
  if (!product) return <p>Product not found.</p>;

  // Filter related products by same category but exclude the current product
  const relatedProducts = products?.filter(
    (prod) => prod.category_id === product.category_id && prod.id !== product.id
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
<div className="bg-[#1B2930] sticky top-0 z-50">
  <Header />
</div>
      <div className="max-w-4xl mx-auto p-6 flex gap-8">
        <div className="w-1/2">
          <Zoom>
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="w-full h-[400px] object-contain"
            />
          </Zoom>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold text-[#34434F]">{product.name}</h1>
          <p className="mt-2 text-lg text-gray-700">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-6">
            <ProductActions product={product} />
          </div>
        </div>
      </div>

{/* Related Products Section */}
{relatedProducts?.length > 0 && (
  <div className="mt-12 px-6">
    <h2 className="text-2xl font-semibold text-gold text-[#34434F] mb-4 text-center">Related Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {relatedProducts.map((rp) => (
        <Link key={rp.id} href={`/product/${rp.id}`} className="bg-[#FFFFFF] p-4 rounded text-center">
          <img
            src={Array.isArray(rp.image) ? rp.image[0] : rp.image}
            alt={rp.name}
            className="w-full h-48 object-contain"
          />
          <h3 className="mt-2 text-lg text-gold">{rp.name}</h3>
          <p className="text-gold">${rp.price}</p>
        </Link>
      ))}
    </div>
  </div>
      )}
    </div>
  );
};

export default ProductPage;
