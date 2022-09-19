import { Router } from "express";
import { receberCarrinho } from "../controllers/cartController.js";
import { enviarCheckout } from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.get("/cart", receberCarrinho)
cartRouter.post("/checkout", enviarCheckout)

export default cartRouter