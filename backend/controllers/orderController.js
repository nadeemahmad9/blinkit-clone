import Order from "../models/Order.js";

//  Create new order
//  POST /api/orders
//  Private (User must be logged in)
export const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice, userId, paymentMethod } = req.body; // We will send userId from frontend

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  } else {
    const order = new Order({
      user: userId,
      orderItems,
      totalPrice,
      paymentMethod: paymentMethod || "UPI", // Default to UPI if missing
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

// @desc    Get ALL orders for Admin panel
// @route   GET /api/orders/all
export const getAllOrders = async (req, res) => {
  try {
    // We use .populate() to grab the customer's details from the User collection
    // so the admin panel can show their name, email, and phone number!
    const orders = await Order.find({})
      .populate("user", "name email phone")
      .sort({ createdAt: -1 }); // Newest orders at the top

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server Error fetching all orders" });
  }
};


// @desc    Update order status (Pending -> Processing -> Delivered)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server Error updating order status" });
  }
};