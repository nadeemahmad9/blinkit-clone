// import Product from "../models/Product.js";

import Product from "../models/Product.js";


// // Fetch products (supports ?category=Dairy)
// //  GET /api/products
// export const getProducts = async (req, res) => {
//   try {
//     const { category, search } = req.query;
    
//     let query = {};
    
//     // If a category param exists, filter by it (Case Insensitive)
//     if (category) {
//       query.category = { $regex: category, $options: 'i' }; 
//     }

//     // Filter by Search Keyword (Name)
//     if (search) {
//       query.name = { $regex: search, $options: 'i' }; // 'i' makes it case-insensitive
//     }

//     const products = await Product.find(query);
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      // ✅ MAGIC FIX: Search in BOTH 'category' AND 'subCategory'
      // This makes "Dairy" work AND "milk" work at the same time.
      query.$or = [
        { category: { $regex: category, $options: 'i' } },
        { subCategory: { $regex: category, $options: 'i' } }
      ];
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query);
    res.json(products || []);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
};