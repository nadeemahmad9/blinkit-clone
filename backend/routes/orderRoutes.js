import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders } from "../controllers/orderController.js";

router.post("/", addOrderItems);
router.get("/myorders", getMyOrders)

export default router;