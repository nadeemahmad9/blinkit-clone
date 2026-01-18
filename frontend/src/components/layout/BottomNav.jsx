import React from "react";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "../../utils/cn";

const BottomNav = () => {
    const activeTab = "Home"; // In future, use location.pathname

    const NavItem = ({ icon: Icon, label, isActive }) => (
        <button className="flex flex-col items-center justify-center gap-1 w-full h-full relative">
            {/* Active Indicator Line */}
            {isActive && (
                <span className="absolute -top-3 w-8 h-1 bg-brand-green rounded-b-full" />
            )}
            <Icon
                size={24}
                className={cn("transition-colors duration-200", isActive ? "text-brand-dark" : "text-gray-400")}
                strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={cn("text-[10px] font-bold", isActive ? "text-brand-dark" : "text-gray-500")}>
                {label}
            </span>
        </button>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 pb-safe z-40 flex justify-around items-center px-2 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
            <NavItem icon={Home} label="Home" isActive={true} />
            <NavItem icon={Search} label="Search" isActive={false} />
            <NavItem icon={ShoppingBag} label="Cart" isActive={false} />
            <NavItem icon={User} label="Profile" isActive={false} />
        </div>
    );
};

export default BottomNav;