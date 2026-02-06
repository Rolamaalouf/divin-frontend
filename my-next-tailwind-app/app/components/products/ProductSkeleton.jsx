const ProductSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 flex gap-8">
        
        {/* Image Skeleton */}
        <div className="w-1/2">
          <div className="h-[400px] rounded skeleton"></div>
        </div>

        {/* Text Skeleton */}
        <div className="w-1/2 space-y-4">
          <div className="h-8 rounded skeleton w-3/4"></div>
          <div className="h-6 rounded skeleton w-1/4"></div>
          <div className="h-4 rounded skeleton"></div>
          <div className="h-4 rounded skeleton w-5/6"></div>
          <div className="h-12 rounded skeleton w-1/2 mt-6"></div>
        </div>

      </div>
    </div>
  );
};

export default ProductSkeleton;
