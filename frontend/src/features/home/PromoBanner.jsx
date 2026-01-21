import React from "react";

const PROMO_BANNERS = [
    {
        id: 1,
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
        alt: "Pharmacy",
    },
    {
        id: 2,
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/pet_crystal_WEB-1.png",
        alt: "Pet Care",
    },
    {
        id: 3,
        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/baby_crystal_WEB-1.png",
        alt: "Baby Care",
    },
];

const PromoBanner = () => {
    return (
        <div className="px-7 mb-6">
            {/* Container: 
        - flex: Aligns items in a row
        - overflow-x-auto: Enables horizontal scrolling
        - no-scrollbar: Custom class to hide the scrollbar (see styles below)
        - gap-4: Spacing between banners
      */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {PROMO_BANNERS.map((banner) => (
                    <div
                        key={banner.id}
                        // Dimensions from your HTML: width ~335px, height 195px
                        // flex-shrink-0: Prevents the image from shrinking in the flex row
                        className="min-w-[335px] h-[195px] flex-shrink-0 cursor-pointer transition-transform duration-200"
                    >
                        <img
                            src={banner.image}
                            alt={banner.alt}
                            className="w-full h-full object-fill rounded-2xl shadow-sm border border-gray-100"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromoBanner;