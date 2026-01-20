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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/786a4220-4352-4749-9b98-5c4d293d052d.png"
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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/e5926514-4148-4221-8664-897452d92131.png"
  },
  {
    name: "Farm Made Brown Eggs",
    weight: "6 pcs",
    price: 75,
    originalPrice: 90,
    discount: 16,
    time: 15,
    category: "Dairy",
    subCategory: "eggs",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/3d4493d5-072a-4318-87e0-41315907406a.png"
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
    weight: "44 g",
    price: 20,
    originalPrice: 20,
    discount: 0,
    time: 10,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/2e2d93e2-8947-4180-8772-563d76e33887.png"
  },
  {
    name: "Bingo! Mad Angles Achaari Masti",
    weight: "66 g",
    price: 20,
    originalPrice: 20,
    discount: 0,
    time: 10,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/674d852a-0630-4e5a-8b01-5743b276701a.png"
  },
  {
    name: "Pringles Original Potato Chips",
    weight: "134 g",
    price: 115,
    originalPrice: 150,
    discount: 23,
    time: 15,
    category: "Snacks",
    subCategory: "chips",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/541249e9-0158-45e0-94a4-573517878440.png"
  },
  {
    name: "Britannia Good Day Cashew Cookies",
    weight: "200 g",
    price: 45,
    originalPrice: 50,
    discount: 10,
    time: 14,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/20b08051-9e73-4560-8f9f-689e3a6230f2.png"
  },
  {
    name: "Oreo Vanilla Creme Biscuits",
    weight: "120 g",
    price: 35,
    originalPrice: 35,
    discount: 0,
    time: 12,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/88d8d32b-3121-4f1e-9a6d-e4483788a83d.png"
  },
  {
    name: "Sunfeast Dark Fantasy Choco Fills",
    weight: "75 g",
    price: 40,
    originalPrice: 45,
    discount: 11,
    time: 12,
    category: "Snacks",
    subCategory: "biscuits",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/0f799797-25d2-4541-b203-9e4695e87019.png"
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
    image: "https://www.jiomart.com/images/product/original/490001662/coca-cola-750-ml-product-images-o490001662-p490001662-0-202203151624.jpg?im=Resize=(1000,1000)"
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
    image: "https://www.jiomart.com/images/product/original/490009696/real-fruit-power-mixed-fruit-juice-1-l-product-images-o490009696-p490009696-0-202203150538.jpg"
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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/24f11370-9884-4866-8d19-455bc328dce5.png"
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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/574e4c34-8c88-4665-bbf0-67c4620be670.png"
  },
  {
    name: "Maaza Mango Drink",
    weight: "1.2 L",
    price: 75,
    originalPrice: 80,
    discount: 6,
    time: 10,
    category: "Beverages",
    subCategory: "juices",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/18158097-7592-4217-9102-861cb7d50731.png"
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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/29a0076a-3606-4449-971c-e945c57176df.png"
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
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/8816c204-0678-430c-901d-d2495d4653d9.png"
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