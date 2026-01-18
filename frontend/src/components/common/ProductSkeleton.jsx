import React from "react";

const ProductSkeleton = () => {
    return (
        <div className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-2 animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full h-24 bg-gray-200 rounded-lg mb-2"></div>

            {/* Time Badge Placeholder */}
            <div className="w-12 h-4 bg-gray-200 rounded px-1"></div>

            {/* Title Placeholder */}
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>

            {/* Bottom Row (Weight & Button) Placeholder */}
            <div className="flex justify-between items-center mt-2">
                <div className="w-10 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-8 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;