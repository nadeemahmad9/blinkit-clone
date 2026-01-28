// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Search, Filter } from "lucide-react";
// import { fetchProducts } from "../services/api"; // We will modify this helper momentarily
// import ProductCard from "../features/products/ProductCard";
// import axios from "axios"; // Direct axios for custom query

// const CategoryPage = () => {
//     const { slug } = useParams(); // Gets 'dairy' from /category/dairy
//     const navigate = useNavigate();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadCategoryProducts = async () => {
//             setLoading(true);
//             try {
//                 // Fetch with query param
//                 const { data } = await axios.get(`/api/products?category=${slug}`);
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error loading category:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadCategoryProducts();
//     }, [slug]);

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-safe font-sans">
//             {/* Sticky Header */}
//             <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
//                 <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>

//                 <div className="flex-1">
//                     <h1 className="text-lg font-extrabold text-brand-dark capitalize">{slug}</h1>
//                     <p className="text-[10px] text-gray-500 font-medium">{products.length} products</p>
//                 </div>

//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                     <Search size={20} className="text-brand-dark" />
//                 </button>
//             </div>

//             {/* Content */}
//             <div className="p-4">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center pt-20">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
//                     </div>
//                 ) : products.length === 0 ? (
//                     <div className="text-center py-20 text-gray-400">
//                         <p>No products found in "{slug}"</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
//                         {products.map((prod) => (
//                             <ProductCard key={prod._id} product={prod} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Search } from "lucide-react";
// import ProductCard from "../features/products/ProductCard";
// import axios from "axios";
// import { CATEGORY_DATA } from "../data/mockData"; // Import your mock data

// const CategoryPage = () => {
//     const { slug } = useParams(); // e.g., "dairy"
//     const navigate = useNavigate();

//     // 1. State for Selected Sub-Category (Default to first one)
//     const [activeSub, setActiveSub] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Get current category info (e.g., Dairy)
//     const currentCategory = CATEGORY_DATA[slug] || { name: slug, subCategories: [] };

//     // Set default sub-category when page loads
//     useEffect(() => {
//         if (currentCategory.subCategories.length > 0) {
//             setActiveSub(currentCategory.subCategories[0].id);
//         }
//     }, [slug]);

//     // Fetch products whenever Sub-Category changes
//     useEffect(() => {
//         if (!activeSub) return;

//         const loadProducts = async () => {
//             setLoading(true);
//             try {
//                 // Fetch products matching the sub-category (e.g., ?category=milk)
//                 // In real app, you might filter by main category AND sub-category
//                 const { data } = await axios.get(`/api/products?category=${activeSub}`);
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error loading products", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadProducts();
//     }, [activeSub]);

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen flex flex-col font-sans">

//             {/* 1. Header (Fixed at top) */}
//             <div className="bg-white sticky top-0 z-20 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-extrabold text-brand-dark flex-1 capitalize">
//                     {currentCategory.name}
//                 </h1>
//                 <Search size={20} className="text-brand-dark" />
//             </div>

//             {/* 2. Main Layout: Sidebar + Grid */}
//             <div className="flex flex-1 overflow-hidden h-[calc(100vh-60px)]">

//                 {/* LEFT SIDEBAR (Sub Categories) */}
//                 <div className="w-24 md:w-35 bg-white border-r border-gray-200 overflow-y-auto pb-20">
//                     {currentCategory.subCategories.map((sub) => (
//                         <div
//                             key={sub.id}
//                             onClick={() => setActiveSub(sub.id)}
//                             className={`
//                  cursor-pointer flex flex-col md:flex-col items-center md:gap-3 p-3 md:px-4 md:py-4 border-b border-gray-50 transition-colors relative
//                  ${activeSub === sub.id ? "bg-green-50" : "hover:bg-gray-50"}
//                `}
//                         >
//                             {/* Active Indicator Bar */}
//                             {activeSub === sub.id && (
//                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green rounded-r" />
//                             )}

//                             {/* Image */}
//                             <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center p-1 border border-gray-100">
//                                 <img src={sub.icon} alt={sub.name} className="w-full h-full object-contain" />
//                             </div>

//                             {/* Text */}
//                             <span className={`text-[10px] md:text-sm font-medium text-center md:text-left mt-1 md:mt-0 ${activeSub === sub.id ? "text-brand-dark font-bold" : "text-gray-500"}`}>
//                                 {sub.name}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* RIGHT CONTENT (Product Grid) */}
//                 <div className="flex-1 overflow-y-auto bg-[#F4F6FB] p-3 pb-24">
//                     {/* Breadcrumb / Title */}
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-sm md:text-lg font-bold text-brand-dark">
//                             Buy {currentCategory.subCategories.find(s => s.id === activeSub)?.name} Online
//                         </h2>
//                     </div>

//                     {loading ? (
//                         <div className="flex justify-center mt-20"><div className="animate-spin w-8 h-8 border-2 border-brand-green rounded-full border-t-transparent"></div></div>
//                     ) : products.length === 0 ? (
//                         <div className="text-center text-gray-400 mt-20">No products found</div>
//                     ) : (
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                             {products.map((prod) => (
//                                 <ProductCard key={prod._id} product={prod} />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default CategoryPage;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Search } from "lucide-react";
// import ProductCard from "../features/products/ProductCard";
// import axios from "axios";
// import { CATEGORY_DATA } from "../data/mockData";

// const CategoryPage = () => {
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const [activeSub, setActiveSub] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const currentCategory = CATEGORY_DATA[slug] || { name: slug, subCategories: [] };

//     useEffect(() => {
//         if (currentCategory.subCategories.length > 0) {
//             setActiveSub(currentCategory.subCategories[0].id);
//         }
//     }, [slug]);

//     useEffect(() => {
//         if (!activeSub) return;
//         const loadProducts = async () => {
//             setLoading(true);
//             try {
//                 const { data } = await axios.get(`/api/products?category=${activeSub}`);
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error loading products", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadProducts();
//     }, [activeSub]);

//     return (
//         // CHANGE 1: Use h-screen and overflow-hidden to lock the main page
//         <div className="bg-brand-gray h-screen flex flex-col font-sans overflow-hidden">

//             {/* Header: Use flex-none so it doesn't shrink */}
//             <div className="bg-white z-20 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3 flex-none">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-extrabold text-brand-dark flex-1 capitalize">
//                     {currentCategory.name}
//                 </h1>
//                 <Search size={20} className="text-brand-dark" />
//             </div>

//             {/* CHANGE 2: Main Layout 
//                 - flex-1: Takes all remaining height
//                 - min-h-0: CRITICAL for allowing children to scroll independently in flexbox
//             */}
//             <div className="flex flex-1 min-h-0 max-w-[1280px] w-full mx-auto">

//                 {/* LEFT SIDEBAR (Scrolls Independently) */}
//                 <div className="w-24 md:w-32 bg-white border-r border-gray-200 overflow-y-auto flex-none h-full pb-20">
//                     {currentCategory.subCategories.map((sub) => (
//                         <div
//                             key={sub.id}
//                             onClick={() => setActiveSub(sub.id)}
//                             className={`
//                                 cursor-pointer flex flex-col items-center gap-2 p-3 border-b border-gray-50 transition-colors relative
//                                 ${activeSub === sub.id ? "bg-green-50" : "hover:bg-gray-50"}
//                             `}
//                         >
//                             {/* Active Indicator */}
//                             {activeSub === sub.id && (
//                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green rounded-r" />
//                             )}

//                             {/* Image */}
//                             <div className={`w-12 h-12 rounded-full flex items-center justify-center p-1 border 
//                                 ${activeSub === sub.id ? "bg-white border-green-200" : "bg-gray-50 border-gray-100"}`}>
//                                 <img src={sub.icon} alt={sub.name} className="w-full h-full object-contain" />
//                             </div>

//                             {/* Text */}
//                             <span className={`text-xs text-center font-medium leading-tight
//                                 ${activeSub === sub.id ? "text-brand-dark font-bold" : "text-gray-500"}`}>
//                                 {sub.name}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* RIGHT CONTENT (Scrolls Independently) */}
//                 <div className="flex-1 bg-[#F4F6FB] h-full overflow-y-auto p-3 pb-24">

//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-sm md:text-lg font-bold text-brand-dark">
//                             Buy {currentCategory.subCategories.find(s => s.id === activeSub)?.name} Online
//                         </h2>
//                     </div>

//                     {loading ? (
//                         <div className="flex justify-center mt-20">
//                             <div className="animate-spin w-8 h-8 border-2 border-brand-green rounded-full border-t-transparent"></div>
//                         </div>
//                     ) : products.length === 0 ? (
//                         <div className="text-center text-gray-400 mt-20">No products found</div>
//                     ) : (
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                             {products.map((prod) => (
//                                 <ProductCard key={prod._id} product={prod} />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default CategoryPage;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Search, Loader } from "lucide-react";
// import ProductCard from "../features/products/ProductCard";
// import axios from "axios";
// import { CATEGORY_DATA } from "../data/mockData";

// const CategoryPage = () => {
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const [activeSub, setActiveSub] = useState(null);
//     const [products, setProducts] = useState([]); // Initialize as empty array
//     const [loading, setLoading] = useState(true);

//     // Safety: Handle case where slug doesn't exist in data
//     const currentCategory = CATEGORY_DATA[slug] || { name: slug, subCategories: [] };
// const BASE_URL = "https://blinkit-clone-backend-60rl.onrender.com";
//     // 1. Set default sub-category when page loads
//     useEffect(() => {
//         if (currentCategory.subCategories.length > 0) {
//             setActiveSub(currentCategory.subCategories[0].id);
//         }
//     }, [slug, currentCategory.subCategories]); // Added dependency for safety

//     // 2. Fetch Products safely
//     useEffect(() => {
//         if (!activeSub) return;

//         const loadProducts = async () => {
//             setLoading(true);
//             try {
//                 // Fetching specific sub-category (e.g., "milk", "chips")
// const { data } = await axios.get(`${BASE_URL}/api/products?category=${activeSub}`);
//                 // ✅ CRITICAL FIX: Ensure 'data' is actually an Array before setting it
//                 if (Array.isArray(data)) {
//                     setProducts(data);
//                 } else {
//                     console.warn("API did not return an array:", data);
//                     setProducts([]);
//                 }
//             } catch (error) {
//                 console.error("Error loading products", error);
//                 setProducts([]); // Fallback to empty list on error
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadProducts();
//     }, [activeSub]);

//     return (
//         // LOCK THE VIEWPORT: h-screen + overflow-hidden prevents body scroll
//         <div className="bg-[#f4f6fb] h-screen flex flex-col font-sans overflow-hidden max-w-[1280px] mx-auto w-full shadow-xl">

//             {/* HEADER: Fixed at top (flex-none) */}
//             <div className="bg-white z-20 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3 flex-none">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-extrabold text-brand-dark flex-1 capitalize">
//                     {currentCategory.name}
//                 </h1>
//                 <Search size={20} className="text-brand-dark" />
//             </div>

//             {/* MAIN CONTENT AREA: flex-1 takes remaining height */}
//             <div className="flex flex-1 min-h-0 bg-white">

//                 {/* LEFT SIDEBAR: Scrolls independently */}
//                 <div className="w-24 md:w-32 bg-white border-r border-gray-200 overflow-y-auto flex-none pb-20 no-scrollbar">
//                     {currentCategory.subCategories.map((sub) => (
//                         <div
//                             key={sub.id}
//                             onClick={() => setActiveSub(sub.id)}
//                             className={`
//                                 cursor-pointer flex flex-col items-center gap-2 p-3 border-b border-gray-50 transition-colors relative
//                                 ${activeSub === sub.id ? "bg-[#ecffec]" : "hover:bg-gray-50"}
//                             `}
//                         >
//                             {/* Green Indicator Bar */}
//                             {activeSub === sub.id && (
//                                 <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#318616] rounded-r-md" />
//                             )}

//                             {/* Image Container */}
//                             <div className={`w-12 h-12 rounded-full flex items-center justify-center p-1 border transition-all
//                                 ${activeSub === sub.id ? "bg-white border-[#318616] scale-105" : "bg-gray-50 border-gray-100"}`}>
//                                 <img src={sub.icon} alt={sub.name} className="w-full h-full object-contain" />
//                             </div>

//                             <span className={`text-[11px] text-center font-medium leading-tight
//                                 ${activeSub === sub.id ? "text-[#318616] font-bold" : "text-gray-500"}`}>
//                                 {sub.name}
//                             </span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* RIGHT PRODUCTS GRID: Scrolls independently */}
//                 <div className="flex-1 bg-[#F4F6FB] h-full overflow-y-auto p-3 pb-24">
//                     <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#F4F6FB] z-10 py-2">
//                         <h2 className="text-sm md:text-lg font-bold text-brand-dark">
//                             {currentCategory.subCategories.find(s => s.id === activeSub)?.name || "Products"}
//                         </h2>
//                     </div>

//                     {loading ? (
//                         <div className="flex flex-col justify-center items-center h-60 gap-2">
//                             <Loader className="animate-spin text-green-600" size={32} />
//                             <p className="text-xs text-gray-500 font-medium">Loading products...</p>
//                         </div>
//                     ) : (
//                         // Safety Check: Ensure products is an Array
//                         Array.isArray(products) && products.length > 0 ? (
//                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                                 {products.map((prod) => (
//                                     <ProductCard key={prod._id} product={prod} />
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center justify-center h-60 text-center">
//                                 <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" className="w-16 h-16 opacity-20 mb-3 grayscale" alt="No items" />
//                                 <p className="text-gray-400 font-medium">No products found in this category.</p>
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Loader } from "lucide-react";
import { CATEGORY_DATA } from "../data/mockData";
// ✅ Import the helper function instead of using axios directly
import { fetchProducts } from "../services/api";
import ProductCard from "../features/products/ProductCard";

const CategoryPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [activeSub, setActiveSub] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentCategory = CATEGORY_DATA[slug] || { name: slug, subCategories: [] };

    // 1. Set default sub-category
    useEffect(() => {
        if (currentCategory.subCategories.length > 0) {
            setActiveSub(currentCategory.subCategories[0].id);
        }
    }, [slug]);

    // 2. Fetch Products
    useEffect(() => {
        if (!activeSub) return;

        const loadProducts = async () => {
            setLoading(true);
            try {
                // ✅ FIX: Use fetchProducts() which handles the Full URL automatically
                // This sends "milk" -> backend receives "milk" -> returns products
                const data = await fetchProducts(activeSub);

                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error loading products", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [activeSub]);

    return (
        <div className="bg-[#f4f6fb] h-screen flex flex-col font-sans overflow-hidden max-w-[1280px] mx-auto w-full shadow-xl">
            {/* ... (Keep your existing JSX Header & Layout) ... */}

            {/* Header */}
            <div className="bg-white z-20 border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3 flex-none">
                <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-extrabold text-brand-dark flex-1 capitalize">
                    {currentCategory.name}
                </h1>
                <Search size={20} className="text-brand-dark" />
            </div>

            <div className="flex flex-1 min-h-0 bg-white">
                {/* Sidebar */}
                <div className="w-24 md:w-32 bg-white border-r border-gray-200 overflow-y-auto flex-none pb-20 no-scrollbar">
                    {currentCategory.subCategories.map((sub) => (
                        <div
                            key={sub.id}
                            onClick={() => setActiveSub(sub.id)}
                            className={`cursor-pointer flex flex-col items-center gap-2 p-3 border-b border-gray-50 transition-colors relative ${activeSub === sub.id ? "bg-[#ecffec]" : "hover:bg-gray-50"}`}
                        >
                            {activeSub === sub.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#318616] rounded-r-md" />}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-1 border transition-all ${activeSub === sub.id ? "bg-white border-[#318616] scale-105" : "bg-gray-50 border-gray-100"}`}>
                                <img src={sub.icon} alt={sub.name} className="w-full h-20 object-cover pt-2 " />
                            </div>
                            <span className={`text-[11px] text-center font-medium leading-tight ${activeSub === sub.id ? "text-[#318616] font-bold" : "text-gray-500"}`}>{sub.name}</span>
                        </div>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="flex-1 bg-[#F4F6FB] h-full overflow-y-auto p-3 pb-24">
                    {/* ... (Keep your product grid logic) ... */}
                    {loading ? (
                        <div className="flex justify-center h-40 items-center"><Loader className="animate-spin" /></div>
                    ) : (
                        // Using your ProductCard component here
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {products.map(p => <ProductCard key={p._id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;