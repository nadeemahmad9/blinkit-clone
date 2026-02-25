import express from 'express';
import { 
    getProductById, 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

// ✅ GET all products
router.get('/', getProducts);

// ✅ POST a new product (Used by AddProductModal)
router.post('/', createProduct);

// ✅ GET single product by ID
router.get("/:id", getProductById);

// ✅ PUT (Edit) a product by ID (Used by EditProductModal)
router.put("/:id", updateProduct);

// ✅ DELETE a product by ID (Used by the Trash icon)
router.delete("/:id", deleteProduct);

export default router;