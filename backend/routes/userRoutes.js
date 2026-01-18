import express from 'express'
import { addAddress, getAddresses } from '../controllers/userController.js';

const router = express.Router();


router.post("/address", addAddress)
router.get("/address/:userId", getAddresses)

export default router;