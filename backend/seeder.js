// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// import { connectDB } from "./config/db.js"; 
// import Product from './models/Product.js'; 

// dotenv.config();
// connectDB();

// const products = [
//   // ================================================
//   // 1. DAIRY CATEGORY 
//   // (Matches Home Page Link: /category/dairy)
//   // ================================================
//   {
//     name: "Amul Taaza Homogenised Toned Milk",
//     weight: "1 L",
//     price: 74,
//     originalPrice: 78,
//     discount: 5,
//     time: 8,
//     category: "Dairy", // ✅ Matches Home Page Category
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/9a4088cc-db19-4add-b3ce-2edd4d09f4ae.png" 
//   },
//   {
//     name: "Amul Gold Full Cream Milk",
//     weight: "500 ml",
//     price: 33,
//     originalPrice: 35,
//     discount: 5,
//     time: 8,
//     category: "Dairy", 
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/628c97e0-5ed4-425d-a667-1d3bfa6f0bde.png"
//   },
//   {
//     name: "Britannia 100% Whole Wheat Bread",
//     weight: "400 g",
//     price: 40,
//     originalPrice: 45,
//     discount: 10,
//     time: 12,
//     category: "Dairy", // Grouped under Dairy for now (or change to 'Bakery')
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68f28239-56ac-451e-bb74-bc582a10b200.png"
//   },
//   {
//     name: "Proto Farm Fresh White Eggs",
//     weight: "6 pcs",
//     price: 55,
//     originalPrice: 65,
//     discount: 15,
//     time: 15,
//     category: "Dairy", 
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/036c632f-a45e-42a5-b60b-545bec401b36.png"
//   },

//   // ================================================
//   // 2. SNACKS CATEGORY 
//   // (Matches fetchProducts("Snacks") in Home.jsx)
//   // ================================================
//   {
//     name: "Lay's India's Magic Masala Chips",
//     weight: "50 g",
//     price: 20,
//     originalPrice: 25,
//     discount: 20,
//     time: 12,
//     category: "Snacks", // ✅ Matches Home Page Request
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4b9969ad-b922-4816-ab13-41ce228ac8b9.png"
//   },
//   {
//     name: "Uncle Chipps Spicy Treat",
//     weight: "50 g",
//     price: 20,
//     originalPrice: 20,
//     discount: 0,
//     time: 12,
//     category: "Snacks", 
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/871988d1-1b77-476f-8dec-922930ad2c4b.png"
//   },
//   {
//     name: "Parle-G Gold Biscuits",
//     weight: "1 kg",
//     price: 110,
//     originalPrice: 120,
//     discount: 8,
//     time: 15,
//     category: "Snacks",
//     image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a54720d4-a6a1-4b61-90d4-d37920be1980.png"
//   },

//   // ================================================
//   // 3. BEVERAGES CATEGORY 
//   // (Matches Home Page Link: /category/beverages)
//   // ================================================
//   {
//     name: "Coca-Cola Soft Drink (750ml)",
//     weight: "750 ml",
//     price: 45,
//     originalPrice: 45,
//     discount: 0,
//     time: 9,
//     category: "Beverages", // ✅ Matches Home Page Category
//     image: "https://www.jiomart.com/images/product/original/490001662/coca-cola-750-ml-product-images-o490001662-p490001662-0-202203151624.jpg?im=Resize=(1000,1000)"
//   },
//   {
//     name: "Real Fruit Power Mixed Fruit Juice",
//     weight: "1 L",
//     price: 110,
//     originalPrice: 125,
//     discount: 12,
//     time: 10,
//     category: "Beverages",
//     image: "https://www.jiomart.com/images/product/original/490009696/real-fruit-power-mixed-fruit-juice-1-l-product-images-o490009696-p490009696-0-202203150538.jpg"
//   }
// ];

// const importData = async () => {
//   try {
//     // Clear existing data first to avoid duplicates
//     await Product.deleteMany();
//     console.log("Old products removed.");

//     // Insert new data
//     await Product.insertMany(products);
//     console.log("Data Imported Successfully!");

//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// importData();



import mongoose from "mongoose";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"; 
import Product from './models/Product.js'; 

dotenv.config();
connectDB();

const products = [
  // ================================================
  // 1. DAIRY PRODUCTS
  // ================================================
  {
    name: "Amul Taaza Homogenised Toned Milk",
    weight: "1 L",
    price: 74,
    originalPrice: 78,
    discount: 5,
    time: 8,
    category: "Dairy",       // ✅ For Home Page
    subCategory: "milk",     // ✅ For Sidebar ID "milk"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/9a4088cc-db19-4add-b3ce-2edd4d09f4ae.png" 
  },
  {
    name: "Amul Gold Full Cream Milk",
    weight: "500 ml",
    price: 33,
    originalPrice: 35,
    discount: 5,
    time: 8,
    category: "Dairy",
    subCategory: "milk",     // ✅ For Sidebar ID "milk"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/628c97e0-5ed4-425d-a667-1d3bfa6f0bde.png"
  },
  {
    name: "Britannia 100% Whole Wheat Bread",
    weight: "400 g",
    price: 40,
    originalPrice: 45,
    discount: 10,
    time: 12,
    category: "Dairy",
    subCategory: "bread",    // ✅ For Sidebar ID "bread"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68f28239-56ac-451e-bb74-bc582a10b200.png"
  },
  {
    name: "Proto Farm Fresh White Eggs",
    weight: "6 pcs",
    price: 55,
    originalPrice: 65,
    discount: 15,
    time: 15,
    category: "Dairy",
    subCategory: "eggs",     // ✅ For Sidebar ID "eggs"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/036c632f-a45e-42a5-b60b-545bec401b36.png"
  },
  {
    name: "Amul Cow Milk",
    weight: "500 ml",
    price: 28,
    originalPrice: 30,
    discount: 6,
    time: 8,
    category: "Dairy",
    subCategory: "milk",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/ae29e828-f5d9-4f8b-89b6-8c6d6919df7b.png"
  },
  {
    name: "Mother Dairy Toned Milk",
    weight: "1 L",
    price: 68,
    originalPrice: 72,
    discount: 5,
    time: 9,
    category: "Dairy",
    subCategory: "milk",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a538dae1-f4a3-49c9-aaf0-586b2855f825.png"
  },
  {
    name: "Harvest Gold White Bread",
    weight: "400 g",
    price: 35,
    originalPrice: 40,
    discount: 12,
    time: 12,
    category: "Dairy",
    subCategory: "bread",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/9b3e11ab-9a5d-463d-b098-379a04ce5b7e.png"
  },
  {
    name: "English Oven Brown Bread",
    weight: "400 g",
    price: 45,
    originalPrice: 50,
    discount: 10,
    time: 12,
    category: "Dairy",
    subCategory: "bread",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/0b267148-c2c6-4eae-9ecd-1e9a83569e3a.png"
  },
  {
    name: "Farm Made Free Range Eggs",
    weight: "6 pcs",
    price: 141,
    originalPrice: 160,
    discount: 11,
    time: 15,
    category: "Dairy",
    subCategory: "eggs",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/388e48ce-a97f-4fd4-82e3-3f6b7189afd9.png"
  },

  // ================================================
  // 2. SNACKS PRODUCTS
  // ================================================
  {
    name: "Lay's India's Magic Masala Chips",
    weight: "50 g",
    price: 20,
    originalPrice: 25,
    discount: 20,
    time: 12,
    category: "Snacks",      // ✅ For Home Page
    subCategory: "chips",    // ✅ For Sidebar ID "chips"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/4b9969ad-b922-4816-ab13-41ce228ac8b9.png"
  },
  {
    name: "Uncle Chipps Spicy Treat",
    weight: "50 g",
    price: 20,
    originalPrice: 20,
    discount: 0,
    time: 12,
    category: "Snacks",
    subCategory: "chips",    // ✅ For Sidebar ID "chips"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/871988d1-1b77-476f-8dec-922930ad2c4b.png"
  },
  {
    name: "Parle-G Gold Biscuits",
    weight: "1 kg",
    price: 110,
    originalPrice: 120,
    discount: 8,
    time: 15,
    category: "Snacks",
    subCategory: "biscuits", // ✅ For Sidebar ID "biscuits"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a54720d4-a6a1-4b61-90d4-d37920be1980.png"
  },
  {
    name: "Doritos Nacho Cheese Chips",
    weight: "75 g",
    price: 44,
    originalPrice: 48,
    discount: 8,
    time: 8,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/729792bc-f395-4569-ab7d-42829daf5f94.png"
  },
  {
    name: "Bingo! Mad Angles Achaari Masti",
    weight: "60 g",
    price: 20,
    originalPrice: 20,
    discount: 0,
    time: 10,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/f96db4a8-7282-4d20-a01e-259cc479f555.png"
  },
  {
    name: "Pringles Original Potato Chips",
    weight: "141 g",
    price: 126,
    originalPrice: 169,
    discount: 25,
    time: 15,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/ff2b0c91-725f-407d-b545-25cfce225899.png"
  },
  {
    name: "Britannia Good Day Cashew Cookies",
    weight: "200 g",
    price: 40,
    originalPrice: 40,
    discount: 0,
    time: 14,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/32f9e932-d9ca-4429-8496-ed74420acd08.png"
  },
  {
    name: "Oreo Vanilla Creme Biscuits",
    weight: "125.25 g",
    price: 38,
    originalPrice: 40,
    discount: 5,
    time: 8,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/011e0390-0968-468c-ad19-6cfbfefb0e2a.png"
  },
  {
    name: "Sunfeast Dark Fantasy Choco Fills",
    weight: "69 g",
    price: 33,
    originalPrice: 35,
    discount: 5,
    time: 12,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/91b5f248-e9f0-4b45-b5e6-1caff4fb8d67.png"
  },

  // ================================================
  // 3. BEVERAGES PRODUCTS
  // ================================================
  {
    name: "Coca-Cola Soft Drink (750ml)",
    weight: "750 ml",
    price: 45,
    originalPrice: 45,
    discount: 0,
    time: 9,
    category: "Beverages",   // ✅ For Home Page
    subCategory: "cold-drinks", // ✅ For Sidebar ID "cold-drinks"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/d84c51e5-6227-4868-8b2d-f708f1be67fc.png"
  },
  {
    name: "Real Fruit Power Mixed Fruit Juice",
    weight: "1 L",
    price: 110,
    originalPrice: 125,
    discount: 12,
    time: 10,
    category: "Beverages",
    subCategory: "juices",   // ✅ For Sidebar ID "juices"
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/ff4a3ece-1ddf-4860-b293-c2c22c768bb6.png"
  },
  {
    name: "Thums Up Soft Drink",
    weight: "750 ml",
    price: 45,
    originalPrice: 45,
    discount: 0,
    time: 9,
    category: "Beverages",
    subCategory: "cold-drinks",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/78afb4b9-c043-4640-ad07-1a38b503eb83.png"
  },
  {
    name: "Sprite Lime Flavored Soft Drink",
    weight: "750 ml",
    price: 45,
    originalPrice: 45,
    discount: 0,
    time: 9,
    category: "Beverages",
    subCategory: "cold-drinks",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/f9dac42c-72c9-47a4-8777-e4d3c9c7522a.png"
  },
  {
    name: "Maaza Mango Drink",
    weight: "600 ml",
    price: 35,
    originalPrice: 35,
    discount: 0,
    time: 8,
    category: "Beverages",
    subCategory: "juices",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/bd4d64b7-7c43-449a-ac11-4a3ddfad644d.png"
  },
  {
    name: "Tropicana 100% Orange Juice",
    weight: "1 L",
    price: 125,
    originalPrice: 145,
    discount: 14,
    time: 15,
    category: "Beverages",
    subCategory: "juices",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/b329dcb8-edd2-406a-9575-40ef17b663ac.png"
  },
  {
    name: "Red Bull Energy Drink",
    weight: "250 ml",
    price: 125,
    originalPrice: 125,
    discount: 0,
    time: 5,
    category: "Beverages",
    subCategory: "cold-drinks",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/6f4bd423-1666-4d23-bf3d-db482be09608.png"
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products removed.");
    await Product.insertMany(products);
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();