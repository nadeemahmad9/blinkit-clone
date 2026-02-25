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

  // @desc    Fetch single product
// @route   GET /api/products/:id

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    // Creates a new product using the data sent from the frontend
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: "Invalid product data", error });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, stock, image, subCategory, description } = req.body;
    
    // Find the product by the ID passed in the URL
    const product = await Product.findById(req.params.id);

    if (product) {
      // Update fields (if a new value is provided, use it. Otherwise, keep the old one)
      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock; // Allows setting stock to 0
      product.image = image || product.image;
      product.subCategory = subCategory || product.subCategory;
      product.description = description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server Error updating product" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Use deleteOne() for newer versions of Mongoose
      await Product.deleteOne({ _id: product._id }); 
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server Error deleting product" });
  }
};