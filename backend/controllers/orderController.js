import Order from "../models/Order.js";

//  Create new order
//  POST /api/orders
//  Private (User must be logged in)
export const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice, userId } = req.body; // We will send userId from frontend

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  } else {
    const order = new Order({
      user: userId,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    // We expect the frontend to send ?userId=... or we use the body. 
    // Since it's a GET request, we'll use query params or just pass it in the URL.
    // For simplicity, let's pass userId as a query param: /api/orders/myorders?userId=123
    const { userId } = req.query;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};