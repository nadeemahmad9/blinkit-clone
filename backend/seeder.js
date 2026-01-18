import mongoose from "mongoose";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"; // Ensure this path is correct
import Product from './models/Product.js'; // Ensure this path is correct

dotenv.config();
connectDB();

const products = [
  // --- DAIRY CATEGORY (Sub-categories: milk, bread, eggs) ---
  {
    name: "Amul Taaza Homogenised Toned Milk",
    weight: "1 L",
    price: 74,
    originalPrice: 78,
    discount: 5,
    time: 8,
    category: "milk", // Matches Sidebar ID
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/9a4088cc-db19-4add-b3ce-2edd4d09f4ae.png" 
  },
  {
    name: "Amul Gold Full Cream Milk",
    weight: "500 ml",
    price: 33,
    originalPrice: 35,
    discount: 5,
    time: 8,
    category: "milk",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/628c97e0-5ed4-425d-a667-1d3bfa6f0bde.png"
  },
  {
    name: "Britannia 100% Whole Wheat Bread",
    weight: "400 g",
    price: 40,
    originalPrice: 45,
    discount: 10,
    time: 12,
    category: "bread", // Matches Sidebar ID
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68f28239-56ac-451e-bb74-bc582a10b200.png"
  },
  {
    name: "Proto Farm Fresh White Eggs",
    weight: "6 pcs",
    price: 55,
    originalPrice: 65,
    discount: 15,
    time: 15,
    category: "eggs", // Matches Sidebar ID
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/036c632f-a45e-42a5-b60b-545bec401b36.png"
  },

  // --- SNACKS CATEGORY (Sub-categories: chips, biscuits) ---
  {
    name: "Lay's India's Magic Masala Chips",
    weight: "50 g",
    price: 20,
    originalPrice: 25,
    discount: 20,
    time: 12,
    category: "snacks", // Matches Sidebar ID
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4b9969ad-b922-4816-ab13-41ce228ac8b9.png"
  },
  {
    name: "Uncle Chipps Spicy Treat",
    weight: "50 g",
    price: 20,
    originalPrice: 20,
    discount: 0,
    time: 12,
    category: "snacks",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/871988d1-1b77-476f-8dec-922930ad2c4b.png"
  },
  {
    name: "Parle-G Gold Biscuits",
    weight: "1 kg",
    price: 110,
    originalPrice: 120,
    discount: 8,
    time: 15,
    category: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a54720d4-a6a1-4b61-90d4-d37920be1980.png"
  },

  // --- BEVERAGES CATEGORY (Sub-categories: cold-drinks, juices) ---
  {
    name: "Coca-Cola Soft Drink (750ml)",
    weight: "750 ml",
    price: 45,
    originalPrice: 45,
    discount: 0,
    time: 9,
    category: "cold-drinks",
    image: "https://www.jiomart.com/images/product/original/490001662/coca-cola-750-ml-product-images-o490001662-p490001662-0-202203151624.jpg?im=Resize=(1000,1000)"
  },
  {
    name: "Real Fruit Power Mixed Fruit Juice",
    weight: "1 L",
    price: 110,
    originalPrice: 125,
    discount: 12,
    time: 10,
    category: "juices",
    image: "https://www.jiomart.com/images/product/original/490009696/real-fruit-power-mixed-fruit-juice-1-l-product-images-o490009696-p490009696-0-202203150538.jpg"
  }
];

const importData = async () => {
  try {
    // Clear existing data first to avoid duplicates
    await Product.deleteMany();

    // Insert new data
    await Product.insertMany(products);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();