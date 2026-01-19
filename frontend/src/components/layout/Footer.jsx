import React from "react";

const Footer = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center pt-8 pb-4 font-sans text-gray-700">

            {/* --- Main Footer Links Section --- */}
            <footer className="w-full max-w-[1280px] px-4 md:px-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[15px] leading-7">

                    {/* Column 1: Useful Links (Split into two sub-columns) */}
                    <div className="flex gap-10 md:gap-20">
                        <div>
                            <h3 className="font-bold text-black mb-4">Useful Links</h3>
                            <ul className="space-y-2 text-gray-500">
                                <li><a href="#" className="hover:text-black">About</a></li>
                                <li><a href="#" className="hover:text-black">Careers</a></li>
                                <li><a href="#" className="hover:text-black">Blog</a></li>
                                <li><a href="#" className="hover:text-black">Press</a></li>
                                <li><a href="#" className="hover:text-black">Lead</a></li>
                                <li><a href="#" className="hover:text-black">Value</a></li>
                            </ul>
                        </div>
                        <div className="mt-10"> {/* Offset to align with second row */}
                            <ul className="space-y-2 text-gray-500">
                                <li><a href="#" className="hover:text-black">Privacy</a></li>
                                <li><a href="#" className="hover:text-black">Terms</a></li>
                                <li><a href="#" className="hover:text-black">FAQs</a></li>
                                <li><a href="#" className="hover:text-black">Security</a></li>
                                <li><a href="#" className="hover:text-black">Mobile</a></li>
                                <li><a href="#" className="hover:text-black">Contact</a></li>
                            </ul>
                        </div>
                        <div className="mt-10">
                            <ul className="space-y-2 text-gray-500">
                                <li><a href="#" className="hover:text-black">Partner</a></li>
                                <li><a href="#" className="hover:text-black">Franchise</a></li>
                                <li><a href="#" className="hover:text-black">Seller</a></li>
                                <li><a href="#" className="hover:text-black">Warehouse</a></li>
                                <li><a href="#" className="hover:text-black">Deliver</a></li>
                                <li><a href="#" className="hover:text-black">Resources</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2 & 3: Categories (Spans wider area) */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="font-bold text-black">Categories</h3>
                            <a href="#" className="text-green-600 text-sm font-medium hover:text-green-700">see all</a>
                        </div>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-black">Vegetables & Fruits</a></li>
                            <li><a href="#" className="hover:text-black">Cold Drinks & Juices</a></li>
                            <li><a href="#" className="hover:text-black">Bakery & Biscuits</a></li>
                            <li><a href="#" className="hover:text-black">Dry Fruits, Masala & Oil</a></li>
                            <li><a href="#" className="hover:text-black">Paan Corner</a></li>
                            <li><a href="#" className="hover:text-black">Pharma & Wellness</a></li>
                            <li><a href="#" className="hover:text-black">Ice Creams & Frozen Desserts</a></li>
                            <li><a href="#" className="hover:text-black">Beauty & Cosmetics</a></li>
                            <li><a href="#" className="hover:text-black">Stationery Needs</a></li>
                            <li><a href="#" className="hover:text-black">Print Store</a></li>
                            <li><a href="#" className="hover:text-black">Dairy & Breakfast</a></li>
                            <li><a href="#" className="hover:text-black">Instant & Frozen Food</a></li>
                            <li><a href="#" className="hover:text-black">Sweet Tooth</a></li>
                            <li><a href="#" className="hover:text-black">Sauces & Spreads</a></li>
                            <li><a href="#" className="hover:text-black">Organic & Premium</a></li>
                            <li><a href="#" className="hover:text-black">Cleaning Essentials</a></li>
                            <li><a href="#" className="hover:text-black">Personal Care</a></li>
                            <li><a href="#" className="hover:text-black">Fashion & Accessories</a></li>
                            <li><a href="#" className="hover:text-black">Books</a></li>
                            <li><a href="#" className="hover:text-black">Navratri Specials</a></li>
                            <li><a href="#" className="hover:text-black">Munchies</a></li>
                            <li><a href="#" className="hover:text-black">Tea, Coffee & Health Drinks</a></li>
                            <li><a href="#" className="hover:text-black">Atta, Rice & Dal</a></li>
                            <li><a href="#" className="hover:text-black">Chicken, Meat & Fish</a></li>
                            <li><a href="#" className="hover:text-black">Baby Care</a></li>
                            <li><a href="#" className="hover:text-black">Home & Office</a></li>
                            <li><a href="#" className="hover:text-black">Pet Care</a></li>
                            <li><a href="#" className="hover:text-black">Electronics & Electricals</a></li>
                            <li><a href="#" className="hover:text-black">Toys & Games</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            {/* --- Download App & Social Links Row --- */}
            <div className="w-full bg-gray-50 py-8 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between max-w-[1280px] gap-6 text-gray-500 text-sm">

                {/* Copyright */}
                <div className="w-full md:w-auto text-center md:text-left">
                    © Blink Commerce Private Limited, 2016-2026
                </div>

                {/* Download App */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <span className="font-bold text-gray-700">Download App</span>
                    <div className="flex gap-3">
                        {/* App Store Image Placeholder */}
                        <img
                            src="https://blinkit.com/d61019073b700ca49d22.png"
                            alt="App Store"
                            className="h-[30px] w-auto cursor-pointer"
                        />
                        {/* Play Store Image Placeholder */}
                        <img
                            src="https://blinkit.com/8ed033800ea38f24c4f0.png"
                            alt="Play Store"
                            className="h-[30px] w-auto cursor-pointer"
                        />
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3">
                    <SocialIcon>
                        <path fillRule="evenodd" clipRule="evenodd" d="M42.9417 77.2H54.1817V49.9967H61.68L62.6733 40.6233H54.1817L54.1933 35.93C54.1933 33.4867 54.4267 32.175 57.9333 32.175H62.62V22.8H55.12C46.1117 22.8 42.9417 27.3483 42.9417 34.995V40.6233H37.3267V49.9983H42.9417V77.2V77.2ZM50 100C22.3867 100 0 77.6133 0 50C0 22.385 22.3867 0 50 0C77.6133 0 100 22.385 100 50C100 77.6133 77.6133 100 50 100Z" fill="#1F1F1F"></path>
                    </SocialIcon>
                    <SocialIcon>
                        {/* 1. Add Background Circle (Dark) */}
                        <rect width="100" height="100" rx="50" fill="#1F1F1F"></rect>
                        <path fillRule="evenodd" clipRule="evenodd" d="M42.9417 77.2H54.1817V49.9967H61.68L62.6733 40.6233H54.1817L54.1933 35.93C54.1933 33.4867 54.4267 32.175 57.9333 32.175H62.62V22.8H55.12C46.1117 22.8 42.9417 27.3483 42.9417 34.995V40.6233H37.3267V49.9983H42.9417V77.2V77.2ZM50 100C22.3867 100 0 77.6133 0 50C0 22.385 22.3867 0 50 0C77.6133 0 100 22.385 100 50C100 77.6133 77.6133 100 50 100Z" fill="white"
                        ></path>
                    </SocialIcon>
                    <SocialIcon>
                        <rect width="100" height="100" rx="50" fill="#1F1F1F"></rect>
                        <path d="M49.5935 59.3496C54.5326 59.3496 58.5366 55.3456 58.5366 50.4065C58.5366 45.4674 54.5326 41.4634 49.5935 41.4634C44.6544 41.4634 40.6504 45.4674 40.6504 50.4065C40.6504 55.3456 44.6544 59.3496 49.5935 59.3496Z" fill="white"></path>
                        <path d="M60.7724 28.4553H38.4146C35.1626 28.4553 32.3171 29.4716 30.4878 31.3008C28.6585 33.1301 27.6423 35.9756 27.6423 39.2276V61.5854C27.6423 64.8374 28.6585 67.6829 30.6911 69.7155C32.7236 71.5447 35.3659 72.561 38.6179 72.561H60.7724C64.0244 72.561 66.8699 71.5447 68.6992 69.7155C70.7317 67.8862 71.748 65.0407 71.748 61.7886V39.4309C71.748 36.1789 70.7317 33.5366 68.9024 31.5041C66.8699 29.4716 64.2276 28.4553 60.7724 28.4553ZM49.5935 64.2276C41.8699 64.2276 35.7724 57.9268 35.7724 50.4065C35.7724 42.6829 42.0732 36.5854 49.5935 36.5854C57.1138 36.5854 63.6179 42.6829 63.6179 50.4065C63.6179 58.1301 57.3171 64.2276 49.5935 64.2276ZM64.0244 39.2276C62.1951 39.2276 60.7724 37.8049 60.7724 35.9756C60.7724 34.1463 62.1951 32.7236 64.0244 32.7236C65.8537 32.7236 67.2764 34.1463 67.2764 35.9756C67.2764 37.8049 65.8537 39.2276 64.0244 39.2276Z" fill="white"></path>
                    </SocialIcon>
                    <SocialIcon>
                        <rect width="100" height="100" rx="50" fill="#1F1F1F"></rect>
                        <path d="M38.5 37.5H28V72H38.5V37.5Z" fill="white"></path>
                        <path d="M64.0045 37.5C58 37.5 56.335 39.468 55 42V37.5H44.5V72H55V52.5C55 49.5 55 46.5 60.25 46.5C65.5 46.5 65.5 49.5 65.5 52.5V72H76V52.5C76 43.5 74.5 37.5 64.0045 37.5Z" fill="white"></path>
                        <path d="M33.25 34.5C36.1495 34.5 38.5 32.1495 38.5 29.25C38.5 26.3505 36.1495 24 33.25 24C30.3505 24 28 26.3505 28 29.25C28 32.1495 30.3505 34.5 33.25 34.5Z" fill="white"></path>
                    </SocialIcon>
                </div>
            </div>

            {/* --- Disclaimer Text --- */}
            <div className="max-w-[1280px] px-4 md:px-8 mt-6 text-xs text-gray-400 leading-relaxed">
                “Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.
            </div>

        </div>
    );
};

// Helper Component for Social Icons to reduce clutter
const SocialIcon = ({ children }) => (
    <div className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
        <svg
            viewBox="0 0 100 100" // Adjusted viewBox for consistent scaling
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            {children}
        </svg>
    </div>
);

export default Footer;