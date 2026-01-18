import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Button = ({ children, variant = "primary", className, ...props }) => {
    const baseStyles = "rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50";

    const variants = {
        primary: "bg-brand-green text-white hover:bg-[#096b1a] shadow-sm", // Blinkit Green
        secondary: "bg-brand-yellow text-black hover:bg-[#eac035]", // Blinkit Yellow
        outline: "border border-brand-green text-brand-green bg-green-50/50 hover:bg-green-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }} // Critical for "fast" app feel
            className={cn(baseStyles, variants[variant], "py-2 px-4 text-sm", className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;