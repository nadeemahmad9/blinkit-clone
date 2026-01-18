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
                const { data } = await axios.get("/api/products");
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return (
        <div className="bg-[#F4F6FB] min-h-screen pb-safe font-sans">
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
                    /* RESPONSIVE GRID LOGIC (Granular Control):
                       - grid-cols-2: Default Mobile (< 450px)
                       - min-[450px]:grid-cols-3: Large Phones / Small Tablets (e.g. iPhone Pro Max)
                       - md:grid-cols-4: Tablets (iPad Portrait)
                       - lg:grid-cols-5: Small Laptops / iPad Landscape
                       - xl:grid-cols-6: Desktop Monitors
                       - 2xl:grid-cols-7: Large/Ultrawide Screens
                       
                       - gap-2: Tighter gap on mobile to fit content
                       - sm:gap-4: More breathing room on larger screens
                       - justify-items-center: Keeps fixed-width cards centered in their grid cells
                    */
                    <div className="grid grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-4 justify-items-center">
                        {products.map((prod) => (
                            // Wrapper div ensures card respects grid centering
                            <div key={prod._id} className="w-full flex justify-center">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;