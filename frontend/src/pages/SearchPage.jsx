// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom"; // Hooks for query string
// import { ArrowLeft, Search as SearchIcon } from "lucide-react";
// import axios from "axios";
// import ProductCard from "../features/products/ProductCard";
// import ProductSkeleton from "../components/common/ProductSkeleton";

// const SearchPage = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const query = searchParams.get("q"); // Get 'milk' from /search?q=milk

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             setLoading(true);
//             try {
//                 const { data } = await axios.get(`/api/products?search=${query}`);
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error searching:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (query) {
//             fetchSearchResults();
//         }
//     }, [query]);

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-safe font-sans">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>

//                 <div className="flex-1">
//                     <h1 className="text-lg font-extrabold text-brand-dark">
//                         Results for "{query}"
//                     </h1>
//                 </div>
//             </div>

//             {/* Results Grid */}
//             <div className="p-4">
//                 {loading ? (
//                     /* SKELETON GRID */
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                         {/* Show 8 skeletons while loading */}
//                         {[...Array(8)].map((_, i) => (
//                             <ProductSkeleton key={i} />
//                         ))}
//                     </div>
//                 ) : products.length === 0 ? (
//                     /* EMPTY STATE */
//                     <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
//                         <SearchIcon size={48} className="mb-2 opacity-20" />
//                         <p>No products found for "{query}"</p>
//                     </div>
//                 ) : (
//                     /* REAL DATA GRID */
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                         {products.map((prod) => (
//                             <ProductCard key={prod._id} product={prod} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchPage;


import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import axios from "axios";
import ProductCard from "../features/products/ProductCard";
import ProductSkeleton from "../components/common/ProductSkeleton";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // Ensure query is not null/empty before calling API
                if (query) {
                    const { data } = await axios.get(`/api/products?search=${query}`);
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error searching:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="bg-brand-gray min-h-screen font-sans">

            {/* --- Header (Sticky & Centered Content) --- */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>

                    <div className="flex-1">
                        <h1 className="text-lg font-extrabold text-brand-dark truncate">
                            {query ? `Results for "${query}"` : "Search"}
                        </h1>
                        {/* Optional: Show count */}
                        {!loading && products.length > 0 && (
                            <p className="text-xs text-gray-500">{products.length} items found</p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-[1280px] mx-auto p-4">

                {loading ? (
                    /* SKELETON GRID (Matches Product Grid) */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="flex flex-col items-center justify-center pt-20 text-gray-400 min-h-[50vh]">

                        <div className="bg-white p-6 rounded-full mb-4 shadow-sm">
                            <SearchIcon size={48} className="opacity-20 text-brand-dark" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-600">No products found</h2>
                        <p className="text-sm">Could not find any matches for "{query}"</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 text-brand-green font-bold text-sm hover:underline"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    /* REAL DATA GRID */
                    /* Mobile: 2 cols
                       Small Tablet: 3 cols
                       Tablet: 4 cols
                       Desktop: 6 cols 
                    */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {products.map((prod) => (
                            <ProductCard key={prod._id} product={prod} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;