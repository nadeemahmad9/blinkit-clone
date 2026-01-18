import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This helper allows us to write dynamic classes like: cn("bg-red-500", isActive && "bg-green-500")
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}