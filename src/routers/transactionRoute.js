import express from "express";
import { insert } from "../controllers/transactionController";
import { validation } from "../middlewares/authMiddleware";


const router = express.Router();
router.post(',products', validation, insert);

export default router;