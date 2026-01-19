

import React, { useState, useEffect } from "react";
// import BottomNav from "../components/layout/BottomNav";
import ProductCard from "../features/products/ProductCard";
import { fetchProducts } from "../services/api";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import PromoBanner from "../features/home/PromoBanner";

const CATEGORIES = [
    { id: 1, name: "Dairy", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png" },
    { id: 2, name: "Snacks", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-5_4.png" },
    { id: 3, name: "Beverages", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-4_9.png" },
    { id: 4, name: "Fruits & Vegetables", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-3_9.png" },
    { id: 5, name: "Breakfast & Instant Food", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-6_5.png" },
    { id: 6, name: "Sweet Tooth", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-7_3.png" },
    { id: 7, name: "Bakery & Biscuits", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-8_4.png" },
    { id: 8, name: "Tea, Coffee & Milk Drinks", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2025-11/Slice-7-1_0.png" },
    { id: 9, name: "Atta, Rice & Dal", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-10.png" },
    { id: 10, name: "Masala, Oil & More", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-11.png" },
    { id: 11, name: "Sauces & Spreads", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-12.png" },
    { id: 12, name: "Organic & Health Living", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-14.png" },
    { id: 13, name: "Baby Care", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-15.png" },
    { id: 14, name: "Cleaning Essentials", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-17.png" },
    { id: 15, name: "Home & Office", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-18.png" },
    { id: 16, name: "Personal Care", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-19.png" },
    { id: 17, name: "Pet Care", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-20.png" },
    { id: 18, name: "Paan Corner", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-12/paan-corner_web.png" },
];

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [snackProducts, setSnackProducts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // 2. Fetch data in parallel
                // fetchProducts() -> Gets all/random products for "Recommended"
                // fetchProducts("Snacks") -> Gets only products with category "Snacks"
                const [recommendedData, snacksData] = await Promise.all([
                    fetchProducts(),
                    fetchProducts("Snacks")
                ]);

                setRecommendedProducts(recommendedData);
                setSnackProducts(snacksData);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [])

    return (
        // Added max-w and mx-auto to center content on large screens
        <div className="min-h-screen pb-24 font-sans max-w-[1280px] mx-auto bg-white">

            {/* Hero Banner Area */}
            {/* Hero Banner Area */}
            <div className="p-4">
                <div className="w-full rounded-2xl overflow-hidden relative shadow-sm group">

                    {/* Responsive Aspect Ratio Logic:
       1. aspect-square -> Forces 1:1 Height/Width on Mobile
       2. md:aspect-[21/9] -> Switches to Wide Banner on Tablet/Desktop
    */}
                    <div className="aspect-square md:aspect-[21/9] w-full relative">
                        <img
                            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
                            alt="Hero Banner"
                            // object-cover: Crops image to fill the square (Mobile)
                            // md:object-fill: Shows full image without cropping (Desktop)
                            className="w-full h-full object-cover md:object-fill transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                </div>
            </div>

            <PromoBanner />

            {/* Category Section */}
            <div className="px-4 mb-8 mt-4">
                <h2 className="text-lg font-extrabold text-brand-dark mb-4">Shop by Category</h2>

                {/* RESPONSIVE GRID FIX:
                   - grid-cols-3: Mobile (3 items per row)
                   - sm:grid-cols-4: Large Mobile/Small Tablet (4 items)
                   - md:grid-cols-6: Tablet (6 items)
                   - lg:grid-cols-9: Desktop (9 items - matches your original intent)
                   - justify-items-center: Centers the images in their grid cells
                */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-y-6 gap-x-2 justify-items-center">
                    {CATEGORIES.map((cat) => (
                        <Link
                            to={`/category/${cat.name.toLowerCase()}`}
                            key={cat.id}
                            className="flex flex-col items-center gap-2 group cursor-pointer w-full"
                        >
                            {/* Removed fixed width w-[115px] to allow it to fit the grid column, added max-width for sanity */}
                            <div className="w-full max-w-[115px] aspect-[115/169] overflow-hidden transition-transform hover:scale-105 duration-200">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-fill"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Product Grid - "Recommended" */}
            {/* SECTION 1: Recommended */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-extrabold text-brand-dark">Recommended</h2>
                    <Link to="/products" className="text-xs font-bold text-brand-green hover:text-green-700">
                        See all
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader className="animate-spin text-brand-green" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Map the Recommended State */}
                        {recommendedProducts.slice(0, 6).map((prod) => (
                            <ProductCard key={prod._id} product={prod} />
                        ))}
                    </div>
                )}
            </div>

            {/* SECTION 2: Snacks & Munchies (Fetched from Backend) */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-extrabold text-brand-dark">Snacks & Munchies</h2>
                    <Link to="/category/snacks" className="text-xs font-bold text-brand-green hover:text-green-700">
                        See all
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader className="animate-spin text-brand-green" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Map the Snacks State */}
                        {snackProducts.length > 0 ? (
                            snackProducts.slice(0, 6).map((prod) => (
                                <ProductCard key={prod._id} product={prod} />
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 col-span-full text-center py-4">
                                No snacks found.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* <BottomNav /> */}
        </div>
    );
};

export default Home;