import { Router } from "express";
import productsRouter from "./productsRouter.js";
import authRoute from "./authRoute.js"

const router = Router();
router.use(productsRouter)
router.use(authRoute)

export default router;