import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import ProductCard from "../features/products/ProductCard";
import ProductSkeleton from "../components/common/ProductSkeleton";

const AllProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                // ✅ FIX 1: Use the Full Backend URL (Render)
                const BASE_URL = "https://blinkit-clone-backend-60rl.onrender.com";
                const { data } = await axios.get(`${BASE_URL}/api/products`);

                // ✅ FIX 2: Safety Check - Only set products if it's an Array
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API returned invalid data:", data);
                    setProducts([]); // Fallback to empty list
                }
            } catch (error) {
                console.error("Error loading products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return (
        <div className="bg-[#f4f6fb] min-h-screen pb-safe font-sans">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-extrabold text-brand-dark">All Products</h1>
                    <p className="text-[10px] text-gray-500 font-medium">{products.length} items</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-[1440px] mx-auto p-2 sm:p-4">
                {loading ? (
                    <div className="grid grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-4">
                        {[...Array(12)].map((_, i) => <ProductSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-4 justify-items-center">
                        {/* ✅ FIX 3: Add explicit check before mapping */}
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((prod) => (
                                <div key={prod._id} className="w-full flex justify-center">
                                    <ProductCard product={prod} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-400">
                                No products found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;