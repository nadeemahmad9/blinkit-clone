import mongoose from "mongoose";

const productSchema = mongoose.Schema({
name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    weight: { type: String, required: true },
    time: { type: Number, required: true }, // Delivery time in mins
    category: { type: String, required: true },

    },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;