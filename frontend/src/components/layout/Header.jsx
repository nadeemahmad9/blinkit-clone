// import React from "react";
// import { Search, ShoppingBag, MapPin } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import useCartStore from "../../store/useCartStore"; // Import Store

// const Header = () => {
//     // Get cart data from store
//     const { cartItems, getCartTotal, openCart } = useCartStore();

//     // Calculate total items (sum of all quantities)
//     const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = getCartTotal();

//     return (
//         <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
//             <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">

//                 {/* Logo Section */}
//                 <div className="flex flex-col">
//                     <h1 className="text-2xl font-extrabold tracking-tight text-brand-yellow drop-shadow-sm" style={{ textShadow: "1px 1px 0px #000" }}>
//                         blinkit
//                     </h1>
//                     <div className="flex items-center gap-1 text-xs font-medium text-gray-600 cursor-pointer">
//                         <span className="font-bold text-brand-dark">Delivery in 8 mins</span>
//                     </div>
//                 </div>

//                 {/* ANIMATED CART BUTTON */}
//                 <AnimatePresence>
//                     {totalItems > 0 && (
//                         <motion.button
//                             onClick={openCart} // <--- ADD THIS LINE
//                             initial={{ scale: 0.5, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.5, opacity: 0 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="flex items-center gap-2 bg-brand-green text-white px-3 py-2 rounded-lg font-bold text-sm shadow-md"
//                         >
//                             <ShoppingBag size={18} />
//                             <div className="flex flex-col items-start leading-3">
//                                 <span>₹{totalPrice}</span>
//                                 <span className="text-[9px] opacity-90 font-medium uppercase mt-0.5">View Cart</span>
//                             </div>
//                         </motion.button>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Search Bar */}
//             <div className="px-4 pb-3 max-w-2xl mx-auto">
//                 <div className="relative group">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" size={20} />
//                     <input
//                         type="text"
//                         placeholder="Search 'milk'"
//                         className="w-full bg-brand-gray border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-green/50 focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 font-medium text-brand-dark"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;


// import React from "react";
// import { Search, ShoppingBag, MapPin, User as UserIcon, X } from "lucide-react"; // Added UserIcon
// import { motion, AnimatePresence } from "framer-motion";
// import { useCartStore } from "../../store/useCartStore";
// import { useAuthStore } from "../../store/useAuthStore"; // 1. Import Auth Store
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import AddressDrawer from "../../features/address/AddressDrawer";
// import useAddressStore from "../../store/useAddressStore";

// const Header = () => {
//     const navigate = useNavigate();
//     const [isAddressOpen, setIsAddressOpen] = useState(false); // Local state for drawer
//     const { selectedAddress } = useAddressStore(); // Get selected address
//     const [searchTerm, setSearchTerm] = useState(""); // 3. Local state for input
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const searchRef = useRef(null); // To close dropdown when clicking outside

//     // Cart Data
//     const { cartItems, getCartTotal, openCart } = useCartStore();
//     const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = getCartTotal();

//     // const navigate = useNavigate();
//     // 2. Auth Data
//     const { user, openLogin, openProfile } = useAuthStore();


//     const handleProfileClick = () => {
//         if (user) {
//             openProfile() // Go to profile
//         } else {
//             openLogin(); // Open login if guest
//         }
//     };

//     // Handle typing with Debounce (wait 300ms before API call)

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(async () => {
//             if (searchTerm.trim().length > 1) { // Only search if 2+ chars
//                 try {
//                     const { data } = await axios.get(`/api/products?search=${searchTerm}`);
//                     // Limit to top 5 results for dropdown
//                     setSuggestions(data.slice(0, 5));
//                     setShowSuggestions(true);
//                 } catch (error) {
//                     console.error("Search error", error);
//                 }
//             } else {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//             }
//         }, 300); // 300ms delay

//         return () => clearTimeout(delayDebounceFn);
//     }, [searchTerm]);



//     // Navigate on Enter or Click
//     const handleSearch = (term) => {
//         if (!term) return;
//         setShowSuggestions(false);
//         setSuggestions([]);
//         setSearchTerm(term); // Update input
//         navigate(`/search?q=${term}`);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") handleSearch(searchTerm);
//     };
//     // Close suggestions when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setShowSuggestions(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);


//     return (
//         <div className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//             <div className="px-4 py-3 flex items-center justify-between max-w-[1280px] h-[86px] lg:px-0 mx-auto gap-4">

//                 {/* Left: Logo & Location */}
//                 <div className="flex items-center gap-4 min-w-fit">
//                     <a href="/" className="cursor-pointer">
//                         <svg width="134" height="30" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M14.3342 7.186C16.2619 7.186 17.9832 7.66644 19.4978 8.62732C21.0262 9.57447 22.2242 10.9197 23.0917 12.663C23.9316 14.3377 24.3516 16.3075 24.3516 18.5724C24.3516 20.7687 23.9316 22.7316 23.0917 24.4612C22.2517 26.1908 21.0675 27.5429 19.5391 28.5175C17.9969 29.5058 16.2619 30 14.3342 30C12.9297 30 11.6078 29.7117 10.3685 29.1352C9.12927 28.5587 8.06901 27.7488 7.18775 26.7056V29.4852H0V0H7.18775V10.4598C8.06901 9.41661 9.12927 8.61359 10.3685 8.05079C11.6078 7.47426 12.9297 7.186 14.3342 7.186ZM12.1861 24.0494C13.2051 24.0494 14.1139 23.8161 14.9125 23.3493C15.7112 22.8826 16.3377 22.2306 16.7921 21.3933C17.2465 20.5697 17.4737 19.6294 17.4737 18.5724C17.4737 17.5429 17.2465 16.6095 16.7921 15.7721C16.3377 14.9348 15.7112 14.2828 14.9125 13.8161C14.1139 13.3493 13.2051 13.116 12.1861 13.116C11.2223 13.116 10.3617 13.3493 9.60432 13.8161C8.84699 14.269 8.2549 14.9073 7.82804 15.731C7.40118 16.5683 7.18775 17.5154 7.18775 18.5724C7.18775 19.6294 7.40118 20.5765 7.82804 21.4139C8.2549 22.2375 8.84699 22.8826 9.60432 23.3493C10.3617 23.8161 11.2223 24.0494 12.1861 24.0494Z" fill="#F8CB46"></path>
//                             <path d="M25.3356 29.4852V0H32.5233V29.4852H25.3356Z" fill="#F8CB46"></path>
//                             <path d="M34.5607 29.4852V7.68016H41.7071V29.4852H34.5607Z" fill="#F8CB46"></path>
//                             <path d="M57.2319 7.186C58.7603 7.186 60.1372 7.5429 61.3627 8.25669C62.5882 8.95676 63.5521 9.94509 64.2544 11.2217C64.9291 12.512 65.2664 13.9739 65.2664 15.6074V29.4852H58.4092V17.2135C58.4092 16.4173 58.2508 15.7104 57.9341 15.0927C57.6312 14.4612 57.1974 13.9739 56.6329 13.6307C56.0821 13.2876 55.4349 13.116 54.6914 13.116C53.9891 13.116 53.3419 13.2876 52.7498 13.6307C52.1577 13.9602 51.6965 14.4132 51.366 14.9897C51.0218 15.5388 50.8496 16.1839 50.8496 16.9252L50.8083 29.4852H43.6619V7.68016H50.8083V10.1716C51.483 9.23816 52.3849 8.51064 53.5141 7.98902C54.6432 7.45367 55.8824 7.186 57.2319 7.186Z" fill="#F8CB46"></path>
//                             <path d="M81.0597 17.2135L89.1769 29.4852H81.0597L76.3091 21.7639L74.1198 24.2965V29.4852H66.932V0H74.1198V16.2869L81.0184 7.68016H89.1356L81.0597 17.2135Z" fill="#F8CB46"></path>
//                             <path d="M34.5569 0.00232667H41.7267V5.59207H34.5569V0.00232667Z" fill="#F8CB46"></path>
//                             <path d="M90.3176 29.4198V7.61479H97.464V29.4198H90.3176Z" fill="#54B226"></path>
//                             <path d="M112.575 23.2634L114 27.855C113.353 28.4727 112.534 28.9737 111.542 29.3581C110.564 29.7424 109.607 29.9346 108.671 29.9346C107.322 29.9346 106.117 29.6395 105.057 29.0492C103.996 28.4452 103.17 27.6079 102.578 26.5372C101.986 25.494 101.69 24.2929 101.69 22.9339V13.3183H98.819V7.61479H101.69V0.00241089H108.547V7.61479H113.071V13.3183H108.547V21.6161C108.547 22.3162 108.733 22.8859 109.105 23.3251C109.477 23.7644 109.952 23.984 110.53 23.984C110.943 23.984 111.329 23.9223 111.687 23.7987C112.045 23.6752 112.341 23.4967 112.575 23.2634Z" fill="#54B226"></path>
//                             <path d="M90.2609 0.00241089H97.4307V5.59215H90.2609V0.00241089Z" fill="#54B226"></path>
//                         </svg>
//                     </a>


//                     {/* Location Bar */}
//                     <div className="flex items-start gap-2 max-w-[200px] cursor-pointer hover:bg-gray-50 p-2 rounded-md">
//                         <div className="flex flex-col">
//                             <h3 className="font-extrabold text-[18px] leading-tight text-gray-900 font-sans">
//                                 Delivery in 8 minutes
//                             </h3>

//                             {/* CLICKABLE LOCATION */}

//                             <div
//                                 onClick={() => setIsAddressOpen(true)} // Open Drawer
//                                 className="flex items-center gap-1 text-[13px] text-gray-600 cursor-pointer transition-colors "
//                             >
//                                 <span className="font-bold text-brand-dark">
//                                     {selectedAddress ? selectedAddress.type : "Select Location"}
//                                 </span>
//                                 <span className="truncate max-w-37.5">
//                                     {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : "Add Address"}
//                                 </span>
//                                 <span className="text-[10px]">
//                                     <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>


//                 </div>



//                 {/* Right: Actions (Cart & Profile) */}
//                 <div className="flex items-center gap-3">

//                     {/* A. Login / Profile Button (Always Visible) */}
//                     <button
//                         onClick={handleProfileClick}
//                         className="flex flex-col items-center justify-center text-brand-dark"
//                     >
//                         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-0.5">
//                             <UserIcon size={18} className="text-gray-700" />
//                         </div>
//                         <span className="text-[10px] font-bold">
//                             {user ? (user.name || "Profile") : "Login"}
//                         </span>
//                     </button>

//                     {/* B. Animated Cart Button (Only if items exist) */}
//                     <AnimatePresence>
//                         {totalItems > 0 && (
//                             <motion.button
//                                 onClick={openCart}
//                                 initial={{ scale: 0.5, opacity: 0 }}
//                                 animate={{ scale: 1, opacity: 1 }}
//                                 exit={{ scale: 0.5, opacity: 0 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="flex items-center gap-2 bg-brand-green text-white px-3 py-2 rounded-lg font-bold text-sm shadow-md"
//                             >
//                                 <ShoppingBag size={18} />
//                                 <div className="flex flex-col items-start leading-3">
//                                     <span>₹{totalPrice}</span>
//                                     <span className="text-[9px] opacity-90 font-medium uppercase mt-0.5">View Cart</span>
//                                 </div>
//                             </motion.button>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>




//             {/* Search Bar */}
//             <div className="px-4 pb-3 max-w-2xl mx-auto">
//                 <div className="relative group">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" size={20} />
//                     <input
//                         type="text"
//                         placeholder="Search 'milk'"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         onKeyDown={handleKeyDown} // Listen for Enter key
//                         className="w-full bg-brand-gray border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-green/50 focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 font-medium text-brand-dark"
//                     />
//                     {/* Clear Button */}
//                     {searchTerm && (
//                         <button
//                             onClick={() => { setSearchTerm(""); setSuggestions([]); }}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                             <X size={16} />
//                         </button>
//                     )}

//                     {/* SUGGESTIONS DROPDOWN */}
//                     {showSuggestions && suggestions.length > 0 && (
//                         <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-60">
//                             {suggestions.map((item) => (
//                                 <div
//                                     key={item._id}
//                                     onClick={() => handleSearch(item.name)}
//                                     className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
//                                 >
//                                     <div className="bg-gray-100 p-1.5 rounded-lg">
//                                         <img src={item.image} alt="" className="w-6 h-6 object-contain mix-blend-multiply" />
//                                     </div>
//                                     <div className="flex-1">
//                                         <p className="text-sm font-medium text-gray-800">{item.name}</p>
//                                         <p className="text-[10px] text-gray-400">{item.category}</p>
//                                     </div>
//                                     <div className="-rotate-45 text-gray-300">
//                                         <ArrowUpIcon size={16} />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     <AddressDrawer isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} />

//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper Icon for the arrow
// const ArrowUpIcon = ({ size }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
// )
// {/* MOUNT THE DRAWER */ }

// export default Header;



// import React, { useState, useRef, useEffect } from "react";
// import { Search, ShoppingBag, User as UserIcon, X, ArrowUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCartStore } from "../../store/useCartStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddressDrawer from "../../features/address/AddressDrawer";
// import useAddressStore from "../../store/useAddressStore";

// const Header = () => {
//     const navigate = useNavigate();
//     const [isAddressOpen, setIsAddressOpen] = useState(false);
//     const { selectedAddress } = useAddressStore();
//     const [searchTerm, setSearchTerm] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const searchRef = useRef(null);

//     // Cart Data
//     const { cartItems, getCartTotal, openCart } = useCartStore();
//     const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = getCartTotal();

//     // Auth Data
//     const { user, openLogin, openProfile } = useAuthStore();

//     const handleProfileClick = () => {
//         if (user) {
//             openProfile();
//         } else {
//             openLogin();
//         }
//     };

//     // Handle typing with Debounce
//     useEffect(() => {
//         const delayDebounceFn = setTimeout(async () => {
//             if (searchTerm.trim().length > 1) {
//                 try {
//                     const { data } = await axios.get(`/api/products?search=${searchTerm}`);
//                     setSuggestions(data.slice(0, 5));
//                     setShowSuggestions(true);
//                 } catch (error) {
//                     console.error("Search error", error);
//                 }
//             } else {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//             }
//         }, 300);

//         return () => clearTimeout(delayDebounceFn);
//     }, [searchTerm]);

//     const handleSearch = (term) => {
//         if (!term) return;
//         setShowSuggestions(false);
//         setSuggestions([]);
//         setSearchTerm(term);
//         navigate(`/search?q=${term}`);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") handleSearch(searchTerm);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setShowSuggestions(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="w-full sticky px-5 top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//             {/* Main Flex Container: Aligns items in 3 distinct parts */}
//             <div className="px-4 py-3 flex items-center justify-between max-w-[1280px] h-[86px] lg:px-0 mx-auto gap-8">

//                 {/* 1. LEFT: Logo & Location */}
//                 <div className="flex items-center gap-4 shrink-0">
//                     <a href="/" className="cursor-pointer">
//                         <svg width="134" height="30" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M14.3342 7.186C16.2619 7.186 17.9832 7.66644 19.4978 8.62732C21.0262 9.57447 22.2242 10.9197 23.0917 12.663C23.9316 14.3377 24.3516 16.3075 24.3516 18.5724C24.3516 20.7687 23.9316 22.7316 23.0917 24.4612C22.2517 26.1908 21.0675 27.5429 19.5391 28.5175C17.9969 29.5058 16.2619 30 14.3342 30C12.9297 30 11.6078 29.7117 10.3685 29.1352C9.12927 28.5587 8.06901 27.7488 7.18775 26.7056V29.4852H0V0H7.18775V10.4598C8.06901 9.41661 9.12927 8.61359 10.3685 8.05079C11.6078 7.47426 12.9297 7.186 14.3342 7.186ZM12.1861 24.0494C13.2051 24.0494 14.1139 23.8161 14.9125 23.3493C15.7112 22.8826 16.3377 22.2306 16.7921 21.3933C17.2465 20.5697 17.4737 19.6294 17.4737 18.5724C17.4737 17.5429 17.2465 16.6095 16.7921 15.7721C16.3377 14.9348 15.7112 14.2828 14.9125 13.8161C14.1139 13.3493 13.2051 13.116 12.1861 13.116C11.2223 13.116 10.3617 13.3493 9.60432 13.8161C8.84699 14.269 8.2549 14.9073 7.82804 15.731C7.40118 16.5683 7.18775 17.5154 7.18775 18.5724C7.18775 19.6294 7.40118 20.5765 7.82804 21.4139C8.2549 22.2375 8.84699 22.8826 9.60432 23.3493C10.3617 23.8161 11.2223 24.0494 12.1861 24.0494Z" fill="#F8CB46"></path>
//                             <path d="M25.3356 29.4852V0H32.5233V29.4852H25.3356Z" fill="#F8CB46"></path>
//                             <path d="M34.5607 29.4852V7.68016H41.7071V29.4852H34.5607Z" fill="#F8CB46"></path>
//                             <path d="M57.2319 7.186C58.7603 7.186 60.1372 7.5429 61.3627 8.25669C62.5882 8.95676 63.5521 9.94509 64.2544 11.2217C64.9291 12.512 65.2664 13.9739 65.2664 15.6074V29.4852H58.4092V17.2135C58.4092 16.4173 58.2508 15.7104 57.9341 15.0927C57.6312 14.4612 57.1974 13.9739 56.6329 13.6307C56.0821 13.2876 55.4349 13.116 54.6914 13.116C53.9891 13.116 53.3419 13.2876 52.7498 13.6307C52.1577 13.9602 51.6965 14.4132 51.366 14.9897C51.0218 15.5388 50.8496 16.1839 50.8496 16.9252L50.8083 29.4852H43.6619V7.68016H50.8083V10.1716C51.483 9.23816 52.3849 8.51064 53.5141 7.98902C54.6432 7.45367 55.8824 7.186 57.2319 7.186Z" fill="#F8CB46"></path>
//                             <path d="M81.0597 17.2135L89.1769 29.4852H81.0597L76.3091 21.7639L74.1198 24.2965V29.4852H66.932V0H74.1198V16.2869L81.0184 7.68016H89.1356L81.0597 17.2135Z" fill="#F8CB46"></path>
//                             <path d="M34.5569 0.00232667H41.7267V5.59207H34.5569V0.00232667Z" fill="#F8CB46"></path>
//                             <path d="M90.3176 29.4198V7.61479H97.464V29.4198H90.3176Z" fill="#54B226"></path>
//                             <path d="M112.575 23.2634L114 27.855C113.353 28.4727 112.534 28.9737 111.542 29.3581C110.564 29.7424 109.607 29.9346 108.671 29.9346C107.322 29.9346 106.117 29.6395 105.057 29.0492C103.996 28.4452 103.17 27.6079 102.578 26.5372C101.986 25.494 101.69 24.2929 101.69 22.9339V13.3183H98.819V7.61479H101.69V0.00241089H108.547V7.61479H113.071V13.3183H108.547V21.6161C108.547 22.3162 108.733 22.8859 109.105 23.3251C109.477 23.7644 109.952 23.984 110.53 23.984C110.943 23.984 111.329 23.9223 111.687 23.7987C112.045 23.6752 112.341 23.4967 112.575 23.2634Z" fill="#54B226"></path>
//                             <path d="M90.2609 0.00241089H97.4307V5.59215H90.2609V0.00241089Z" fill="#54B226"></path>
//                         </svg>
//                     </a>

//                     <div className="flex items-start gap-2 max-w-[200px] cursor-pointer hover:bg-gray-50 p-2 rounded-md">
//                         <div className="flex flex-col">
//                             <h3 className="font-extrabold text-[18px] leading-tight text-gray-900 font-sans">
//                                 Delivery in 8 minutes
//                             </h3>
//                             <div
//                                 onClick={() => setIsAddressOpen(true)}
//                                 className="flex items-center gap-1 text-[13px] text-gray-600 cursor-pointer transition-colors"
//                             >
//                                 <span className="font-bold text-brand-dark">
//                                     {selectedAddress ? selectedAddress.type : "Select Location"}
//                                 </span>
//                                 <span className="truncate max-w-37.5">
//                                     {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : "Add Address"}
//                                 </span>
//                                 <span className="text-[10px]">
//                                     <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 2. CENTER: Search Bar (Flex-1) */}
//                 <div className="flex-1 w-full max-w-2xl relative group" ref={searchRef}>
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search 'milk'"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             onKeyDown={handleKeyDown}
//                             className="w-full bg-brand-gray border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-green/50 focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 font-medium text-brand-dark"
//                         />
//                         {searchTerm && (
//                             <button
//                                 onClick={() => { setSearchTerm(""); setSuggestions([]); }}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <X size={16} />
//                             </button>
//                         )}
//                     </div>

//                     {/* SUGGESTIONS DROPDOWN */}
//                     {showSuggestions && suggestions.length > 0 && (
//                         <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-60">
//                             {suggestions.map((item) => (
//                                 <div
//                                     key={item._id}
//                                     onClick={() => handleSearch(item.name)}
//                                     className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
//                                 >
//                                     <div className="bg-gray-100 p-1.5 rounded-lg">
//                                         <img src={item.image} alt="" className="w-6 h-6 object-contain mix-blend-multiply" />
//                                     </div>
//                                     <div className="flex-1">
//                                         <p className="text-sm font-medium text-gray-800">{item.name}</p>
//                                         <p className="text-[10px] text-gray-400">{item.category}</p>
//                                     </div>
//                                     <div className="-rotate-45 text-gray-300">
//                                         <ArrowUp size={16} />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* 3. RIGHT: Actions (Cart & Profile) */}
//                 <div className="flex items-center gap-3 shrink-0">
//                     <button
//                         onClick={handleProfileClick}
//                         className="flex flex-col items-center justify-center text-brand-dark"
//                     >
//                         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-0.5">
//                             <UserIcon size={18} className="text-gray-700" />
//                         </div>
//                         <span className="text-[10px] font-bold">
//                             {user ? (user.name || "Profile") : "Login"}
//                         </span>
//                     </button>

//                     <AnimatePresence>
//                         {totalItems > 0 && (
//                             <motion.button
//                                 onClick={openCart}
//                                 initial={{ scale: 0.5, opacity: 0 }}
//                                 animate={{ scale: 1, opacity: 1 }}
//                                 exit={{ scale: 0.5, opacity: 0 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="flex items-center gap-2 bg-brand-green text-white px-3 py-2 rounded-lg font-bold text-sm shadow-md"
//                             >
//                                 <ShoppingBag size={18} />
//                                 <div className="flex flex-col items-start leading-3">
//                                     <span>₹{totalPrice}</span>
//                                     <span className="text-[9px] opacity-90 font-medium uppercase mt-0.5">View Cart</span>
//                                 </div>
//                             </motion.button>
//                         )}
//                     </AnimatePresence>
//                 </div>

//             </div>

//             <AddressDrawer isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} />
//         </div>
//     );
// };

// export default Header;


// import React, { useState, useRef, useEffect } from "react";
// import { Search, X, ArrowUp, ShoppingBag } from "lucide-react"; // Replaced custom SVGs with Lucide where appropriate for logic elements
// import { motion, AnimatePresence } from "framer-motion";
// import { useCartStore } from "../../store/useCartStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddressDrawer from "../../features/address/AddressDrawer";
// import useAddressStore from "../../store/useAddressStore";

// const Header = () => {
//     const navigate = useNavigate();
//     const [isAddressOpen, setIsAddressOpen] = useState(false);
//     const { selectedAddress } = useAddressStore();

//     // --- Search Logic ---
//     const [searchTerm, setSearchTerm] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const searchRef = useRef(null);

//     // --- Placeholder Animation Logic (From UI Example) ---
//     const placeholders = ['Search "milk"', 'Search "bread"', 'Search "sugar"', 'Search "butter"', 'Search "paneer"', 'Search "chips"'];
//     const [placeholderIndex, setPlaceholderIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
//         }, 2000);
//         return () => clearInterval(interval);
//     }, []);

//     // --- Cart Data ---
//     const { cartItems, getCartTotal, openCart } = useCartStore();
//     const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = getCartTotal();

//     // --- Auth Data ---
//     const { user, openLogin, openProfile } = useAuthStore();

//     const handleProfileClick = () => {
//         if (user) {
//             openProfile();
//         } else {
//             openLogin();
//         }
//     };

//     // --- Search Handlers ---
//     useEffect(() => {
//         const delayDebounceFn = setTimeout(async () => {
//             if (searchTerm.trim().length > 1) {
//                 try {
//                     const { data } = await axios.get(`/api/products?search=${searchTerm}`);
//                     setSuggestions(data.slice(0, 5));
//                     setShowSuggestions(true);
//                 } catch (error) {
//                     console.error("Search error", error);
//                 }
//             } else {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//             }
//         }, 300);
//         return () => clearTimeout(delayDebounceFn);
//     }, [searchTerm]);

//     const handleSearch = (term) => {
//         if (!term) return;
//         setShowSuggestions(false);
//         setSuggestions([]);
//         setSearchTerm(term);
//         navigate(`/search?q=${term}`);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") handleSearch(searchTerm);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setShowSuggestions(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
//             <div className="max-w-[1250px] mx-auto flex items-center h-[86px] px-4 lg:px-0">

//                 {/* --- 1. LEFT SECTION: Logo & Location --- */}
//                 <div className="flex items-center gap-4 min-w-fit">
//                     {/* Logo */}
//                     <a href="/" className="cursor-pointer">
//                         <svg width="134" height="30" viewBox="0 0 114 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M14.3342 7.186C16.2619 7.186 17.9832 7.66644 19.4978 8.62732C21.0262 9.57447 22.2242 10.9197 23.0917 12.663C23.9316 14.3377 24.3516 16.3075 24.3516 18.5724C24.3516 20.7687 23.9316 22.7316 23.0917 24.4612C22.2517 26.1908 21.0675 27.5429 19.5391 28.5175C17.9969 29.5058 16.2619 30 14.3342 30C12.9297 30 11.6078 29.7117 10.3685 29.1352C9.12927 28.5587 8.06901 27.7488 7.18775 26.7056V29.4852H0V0H7.18775V10.4598C8.06901 9.41661 9.12927 8.61359 10.3685 8.05079C11.6078 7.47426 12.9297 7.186 14.3342 7.186ZM12.1861 24.0494C13.2051 24.0494 14.1139 23.8161 14.9125 23.3493C15.7112 22.8826 16.3377 22.2306 16.7921 21.3933C17.2465 20.5697 17.4737 19.6294 17.4737 18.5724C17.4737 17.5429 17.2465 16.6095 16.7921 15.7721C16.3377 14.9348 15.7112 14.2828 14.9125 13.8161C14.1139 13.3493 13.2051 13.116 12.1861 13.116C11.2223 13.116 10.3617 13.3493 9.60432 13.8161C8.84699 14.269 8.2549 14.9073 7.82804 15.731C7.40118 16.5683 7.18775 17.5154 7.18775 18.5724C7.18775 19.6294 7.40118 20.5765 7.82804 21.4139C8.2549 22.2375 8.84699 22.8826 9.60432 23.3493C10.3617 23.8161 11.2223 24.0494 12.1861 24.0494Z" fill="#F8CB46"></path>
//                             <path d="M25.3356 29.4852V0H32.5233V29.4852H25.3356Z" fill="#F8CB46"></path>
//                             <path d="M34.5607 29.4852V7.68016H41.7071V29.4852H34.5607Z" fill="#F8CB46"></path>
//                             <path d="M57.2319 7.186C58.7603 7.186 60.1372 7.5429 61.3627 8.25669C62.5882 8.95676 63.5521 9.94509 64.2544 11.2217C64.9291 12.512 65.2664 13.9739 65.2664 15.6074V29.4852H58.4092V17.2135C58.4092 16.4173 58.2508 15.7104 57.9341 15.0927C57.6312 14.4612 57.1974 13.9739 56.6329 13.6307C56.0821 13.2876 55.4349 13.116 54.6914 13.116C53.9891 13.116 53.3419 13.2876 52.7498 13.6307C52.1577 13.9602 51.6965 14.4132 51.366 14.9897C51.0218 15.5388 50.8496 16.1839 50.8496 16.9252L50.8083 29.4852H43.6619V7.68016H50.8083V10.1716C51.483 9.23816 52.3849 8.51064 53.5141 7.98902C54.6432 7.45367 55.8824 7.186 57.2319 7.186Z" fill="#F8CB46"></path>
//                             <path d="M81.0597 17.2135L89.1769 29.4852H81.0597L76.3091 21.7639L74.1198 24.2965V29.4852H66.932V0H74.1198V16.2869L81.0184 7.68016H89.1356L81.0597 17.2135Z" fill="#F8CB46"></path>
//                             <path d="M34.5569 0.00232667H41.7267V5.59207H34.5569V0.00232667Z" fill="#F8CB46"></path>
//                             <path d="M90.3176 29.4198V7.61479H97.464V29.4198H90.3176Z" fill="#54B226"></path>
//                             <path d="M112.575 23.2634L114 27.855C113.353 28.4727 112.534 28.9737 111.542 29.3581C110.564 29.7424 109.607 29.9346 108.671 29.9346C107.322 29.9346 106.117 29.6395 105.057 29.0492C103.996 28.4452 103.17 27.6079 102.578 26.5372C101.986 25.494 101.69 24.2929 101.69 22.9339V13.3183H98.819V7.61479H101.69V0.00241089H108.547V7.61479H113.071V13.3183H108.547V21.6161C108.547 22.3162 108.733 22.8859 109.105 23.3251C109.477 23.7644 109.952 23.984 110.53 23.984C110.943 23.984 111.329 23.9223 111.687 23.7987C112.045 23.6752 112.341 23.4967 112.575 23.2634Z" fill="#54B226"></path>
//                             <path d="M90.2609 0.00241089H97.4307V5.59215H90.2609V0.00241089Z" fill="#54B226"></path>
//                         </svg>
//                     </a>

//                     {/* Location Bar */}
//                     <div
//                         onClick={() => setIsAddressOpen(true)}
//                         className="flex items-start gap-2 max-w-[200px] cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
//                     >
//                         <div className="flex flex-col">
//                             <h3 className="font-extrabold text-[18px] leading-tight text-gray-900 font-sans">
//                                 Delivery in 8 minutes
//                             </h3>
//                             <div className="flex items-center gap-1 text-[13px] text-gray-600">
//                                 <span className="font-bold text-gray-800">
//                                     {selectedAddress ? selectedAddress.type : "Lucknow"}
//                                 </span>
//                                 <span className="truncate max-w-[120px]">
//                                     {selectedAddress ? `, ${selectedAddress.street}` : ", Uttar Pradesh, India"}
//                                 </span>
//                                 <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- 2. CENTER SECTION: Search Bar --- */}
//                 <div className="flex-1 mx-12 relative z-50" ref={searchRef}>
//                     <div className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-3 border border-gray-200 cursor-text hover:shadow-sm transition-shadow">
//                         {/* Search Icon */}
//                         <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>

//                         <div className="flex-1 relative overflow-hidden h-6">
//                             {/* Actual Input */}
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 onKeyDown={handleKeyDown}
//                                 // If user is typing, show value, else show nothing (placeholder handles it)
//                                 placeholder={placeholders[placeholderIndex]}
//                                 className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder-gray-500 h-full absolute top-0 left-0 z-10"
//                             />
//                         </div>

//                         {/* Clear Button */}
//                         {searchTerm && (
//                             <button
//                                 onClick={() => { setSearchTerm(""); setSuggestions([]); }}
//                                 className="text-gray-400 hover:text-gray-600 ml-2"
//                             >
//                                 <X size={16} />
//                             </button>
//                         )}
//                     </div>

//                     {/* SUGGESTIONS DROPDOWN (Absolute Positioned) */}
//                     {showSuggestions && suggestions.length > 0 && (
//                         <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//                             {suggestions.map((item) => (
//                                 <div
//                                     key={item._id}
//                                     onClick={() => handleSearch(item.name)}
//                                     className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
//                                 >
//                                     <div className="bg-gray-100 p-1.5 rounded-lg">
//                                         <img src={item.image} alt="" className="w-6 h-6 object-contain mix-blend-multiply" />
//                                     </div>
//                                     <div className="flex-1">
//                                         <p className="text-sm font-medium text-gray-800">{item.name}</p>
//                                         <p className="text-[10px] text-gray-400">{item.category}</p>
//                                     </div>
//                                     <div className="-rotate-45 text-gray-300">
//                                         <ArrowUp size={16} />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* --- 3. RIGHT SECTION: Login & Cart --- */}
//                 <div className="flex items-center gap-8 min-w-fit">

//                     {/* Login/Profile Button */}
//                     <button
//                         onClick={handleProfileClick}
//                         className="text-[18px] text-gray-800 font-normal hover:text-gray-900"
//                     >
//                         {user ? (user.name || "Profile") : "Login"}
//                     </button>

//                     {/* Cart Button */}
//                     {totalItems > 0 ? (
//                         <motion.button
//                             onClick={openCart}
//                             initial={{ scale: 0.9, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="flex items-center gap-2 bg-[#0c831f] hover:bg-[#0b741b] text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors"
//                         >
//                             <ShoppingBag className="w-5 h-5 font-bold" />
//                             <div className="flex flex-col items-start leading-none ml-1">
//                                 <span>{totalItems} items</span>
//                                 <span className="text-[10px] opacity-90">₹{totalPrice}</span>
//                             </div>
//                         </motion.button>
//                     ) : (
//                         <button
//                             onClick={openCart}
//                             className="flex items-center gap-2 bg-[#0c831f] hover:bg-[#0b741b] text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors"
//                         >
//                             <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                             <span className="leading-none py-1">My Cart</span>
//                         </button>
//                     )}
//                 </div>

//             </div>

//             <AddressDrawer isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} />
//         </div>
//     );
// };

// export default Header;



import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowUp, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressDrawer from "../../features/address/AddressDrawer";
import useAddressStore from "../../store/useAddressStore";

const Header = () => {
    const navigate = useNavigate();
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const { selectedAddress } = useAddressStore();

    // --- Search Logic ---
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // --- Placeholder Animation Logic ---
    const placeholders = ['Search "milk"', 'Search "bread"', 'Search "sugar"', 'Search "butter"', 'Search "paneer"', 'Search "chips"'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // --- Cart Data ---
    const { cartItems, getCartTotal, openCart } = useCartStore();
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = getCartTotal();

    // --- Auth Data ---
    const { user, openLogin, openProfile } = useAuthStore();

    const handleProfileClick = () => {
        if (user) {
            openProfile();
        } else {
            openLogin();
        }
    };

    // --- Search Handlers ---
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.trim().length > 1) {
                try {
                    const { data } = await axios.get(`/api/products?search=${searchTerm}`);
                    setSuggestions(data.slice(0, 5));
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Search error", error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = (term) => {
        if (!term) return;
        setShowSuggestions(false);
        setSuggestions([]);
        setSearchTerm(term);
        navigate(`/search?q=${term}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch(searchTerm);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* RESPONSIVE CONTAINER:
                - flex-col on mobile (stack elements)
                - lg:flex-row on desktop (side-by-side)
                - h-auto on mobile, fixed h-[86px] on desktop
            */}
            <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row items-center h-auto lg:h-[86px] px-4 lg:px-0 py-3 lg:py-0 gap-3 lg:gap-0">

                {/* --- 1. LEFT SECTION: Logo & Location & Mobile Icons --- */}
                <div className="w-full lg:w-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">

                    {/* Top Row: Logo + Mobile Actions */}
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        {/* Logo */}
                        <a href="/" className="cursor-pointer shrink-0">
                            <svg width="120" height="28" viewBox="0 0 114 30" fill="none" className="lg:w-[134px] lg:h-[30px]" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3342 7.186C16.2619 7.186 17.9832 7.66644 19.4978 8.62732C21.0262 9.57447 22.2242 10.9197 23.0917 12.663C23.9316 14.3377 24.3516 16.3075 24.3516 18.5724C24.3516 20.7687 23.9316 22.7316 23.0917 24.4612C22.2517 26.1908 21.0675 27.5429 19.5391 28.5175C17.9969 29.5058 16.2619 30 14.3342 30C12.9297 30 11.6078 29.7117 10.3685 29.1352C9.12927 28.5587 8.06901 27.7488 7.18775 26.7056V29.4852H0V0H7.18775V10.4598C8.06901 9.41661 9.12927 8.61359 10.3685 8.05079C11.6078 7.47426 12.9297 7.186 14.3342 7.186ZM12.1861 24.0494C13.2051 24.0494 14.1139 23.8161 14.9125 23.3493C15.7112 22.8826 16.3377 22.2306 16.7921 21.3933C17.2465 20.5697 17.4737 19.6294 17.4737 18.5724C17.4737 17.5429 17.2465 16.6095 16.7921 15.7721C16.3377 14.9348 15.7112 14.2828 14.9125 13.8161C14.1139 13.3493 13.2051 13.116 12.1861 13.116C11.2223 13.116 10.3617 13.3493 9.60432 13.8161C8.84699 14.269 8.2549 14.9073 7.82804 15.731C7.40118 16.5683 7.18775 17.5154 7.18775 18.5724C7.18775 19.6294 7.40118 20.5765 7.82804 21.4139C8.2549 22.2375 8.84699 22.8826 9.60432 23.3493C10.3617 23.8161 11.2223 24.0494 12.1861 24.0494Z" fill="#F8CB46"></path>
                                <path d="M25.3356 29.4852V0H32.5233V29.4852H25.3356Z" fill="#F8CB46"></path>
                                <path d="M34.5607 29.4852V7.68016H41.7071V29.4852H34.5607Z" fill="#F8CB46"></path>
                                <path d="M57.2319 7.186C58.7603 7.186 60.1372 7.5429 61.3627 8.25669C62.5882 8.95676 63.5521 9.94509 64.2544 11.2217C64.9291 12.512 65.2664 13.9739 65.2664 15.6074V29.4852H58.4092V17.2135C58.4092 16.4173 58.2508 15.7104 57.9341 15.0927C57.6312 14.4612 57.1974 13.9739 56.6329 13.6307C56.0821 13.2876 55.4349 13.116 54.6914 13.116C53.9891 13.116 53.3419 13.2876 52.7498 13.6307C52.1577 13.9602 51.6965 14.4132 51.366 14.9897C51.0218 15.5388 50.8496 16.1839 50.8496 16.9252L50.8083 29.4852H43.6619V7.68016H50.8083V10.1716C51.483 9.23816 52.3849 8.51064 53.5141 7.98902C54.6432 7.45367 55.8824 7.186 57.2319 7.186Z" fill="#F8CB46"></path>
                                <path d="M81.0597 17.2135L89.1769 29.4852H81.0597L76.3091 21.7639L74.1198 24.2965V29.4852H66.932V0H74.1198V16.2869L81.0184 7.68016H89.1356L81.0597 17.2135Z" fill="#F8CB46"></path>
                                <path d="M34.5569 0.00232667H41.7267V5.59207H34.5569V0.00232667Z" fill="#F8CB46"></path>
                                <path d="M90.3176 29.4198V7.61479H97.464V29.4198H90.3176Z" fill="#54B226"></path>
                                <path d="M112.575 23.2634L114 27.855C113.353 28.4727 112.534 28.9737 111.542 29.3581C110.564 29.7424 109.607 29.9346 108.671 29.9346C107.322 29.9346 106.117 29.6395 105.057 29.0492C103.996 28.4452 103.17 27.6079 102.578 26.5372C101.986 25.494 101.69 24.2929 101.69 22.9339V13.3183H98.819V7.61479H101.69V0.00241089H108.547V7.61479H113.071V13.3183H108.547V21.6161C108.547 22.3162 108.733 22.8859 109.105 23.3251C109.477 23.7644 109.952 23.984 110.53 23.984C110.943 23.984 111.329 23.9223 111.687 23.7987C112.045 23.6752 112.341 23.4967 112.575 23.2634Z" fill="#54B226"></path>
                                <path d="M90.2609 0.00241089H97.4307V5.59215H90.2609V0.00241089Z" fill="#54B226"></path>
                            </svg>
                        </a>

                        {/* Mobile-Only Actions (Profile & Cart Icons) */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <button onClick={handleProfileClick}>
                                <User size={24} className="text-gray-700" />
                            </button>
                            <button onClick={openCart} className="relative">
                                <ShoppingBag size={24} className="text-gray-700" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Location Bar */}
                    <div
                        onClick={() => setIsAddressOpen(true)}
                        className="flex items-start gap-2 w-full lg:w-auto max-w-full lg:max-w-[200px] cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                        <div className="flex flex-col w-fit">
                            <h3 className="font-extrabold text-[16px] lg:text-[18px] leading-tight text-gray-900 font-sans">
                                Delivery in 8 minutes
                            </h3>
                            <div className="flex items-center gap-1 text-[13px] text-gray-600 w-full">
                                <span className="font-bold text-gray-800 whitespace-nowrap">
                                    {selectedAddress ? selectedAddress.type : "City"}
                                </span>
                                <span className="truncate block max-w-[200px] lg:max-w-[120px]">
                                    {selectedAddress ? `, ${selectedAddress.street}` : ", state, country"}
                                </span>
                                <svg className="w-3 h-3 text-gray-800 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. CENTER SECTION: Search Bar --- */}
                <div className="w-full lg:flex-1 lg:mx-12 relative z-50 order-last lg:order-none mt-1 lg:mt-0" ref={searchRef}>
                    <div className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-3 border border-gray-200 cursor-text hover:shadow-sm transition-shadow">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        <div className="flex-1 relative overflow-hidden h-6">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholders[placeholderIndex]}
                                className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder-gray-500 h-full absolute top-0 left-0 z-10"
                            />
                        </div>

                        {searchTerm && (
                            <button
                                onClick={() => { setSearchTerm(""); setSuggestions([]); }}
                                className="text-gray-400 hover:text-gray-600 ml-2"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            {suggestions.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => handleSearch(item.name)}
                                    className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                >
                                    <div className="bg-gray-100 p-1.5 rounded-lg">
                                        <img src={item.image} alt="" className="w-6 h-6 object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                        <p className="text-[10px] text-gray-400">{item.category}</p>
                                    </div>
                                    <div className="-rotate-45 text-gray-300">
                                        <ArrowUp size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- 3. RIGHT SECTION: Login & Cart (Desktop Only) --- */}
                {/* Hidden on Mobile because mobile uses BottomNav + Top Icons */}
                <div className="hidden lg:flex items-center gap-8 min-w-fit">

                    <button
                        onClick={handleProfileClick}
                        className="text-[18px] text-gray-800 font-normal hover:text-gray-900"
                    >
                        {user ? (user.name || "Profile") : "Login"}
                    </button>

                    {totalItems > 0 ? (
                        <motion.button
                            onClick={openCart}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-[#0c831f] hover:bg-[#0b741b] text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5 font-bold" />
                            <div className="flex flex-col items-start leading-none ml-1">
                                <span>{totalItems} items</span>
                                <span className="text-[10px] opacity-90">₹{totalPrice}</span>
                            </div>
                        </motion.button>
                    ) : (
                        <button
                            onClick={openCart}
                            className="flex items-center gap-2 bg-[#0c831f] hover:bg-[#0b741b] text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors"
                        >
                            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="leading-none py-1">My Cart</span>
                        </button>
                    )}
                </div>

            </div>

            <AddressDrawer isOpen={isAddressOpen} onClose={() => setIsAddressOpen(false)} />
        </div>
    );
};

export default Header;