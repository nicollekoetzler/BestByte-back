import { Router } from "express";
import productsRouter from "./productsRouter.js";
import authRoute from "./authRoute.js";
import cartRouter from "./cartRouter.js"

const router = Router();
router.use(productsRouter)
router.use(authRoute)
router.use(cartRouter)

export default router;