import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true, default: "UPI" },
    status: { type: String, default: "Placed" }, // Placed, Shipped, Delivered
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;