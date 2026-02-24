import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

router.get("/all", getAllOrders); 
router.get("/myorders", getMyOrders)
router.post("/", addOrderItems);

router.put("/:id/status", updateOrderStatus);

export default router;