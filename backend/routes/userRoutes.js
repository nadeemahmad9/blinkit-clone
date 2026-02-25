import express from 'express'
import { addAddress, getAddresses, getAllUsers } from '../controllers/userController.js';

const router = express.Router();


router.post("/address", addAddress)
router.get("/address/:userId", getAddresses)
router.get("/", getAllUsers)

export default router;