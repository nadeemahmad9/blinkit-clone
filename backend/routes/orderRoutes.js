import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

router.post("/", addOrderItems);
router.get("/myorders", getMyOrders)

// ✅ NEW ADMIN ROUTES
router.get("/all", getAllOrders); 
router.put("/:id/status", updateOrderStatus);

export default router;