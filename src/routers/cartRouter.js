import { Router } from "express";
import { receberCarrinho } from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.get("/cart", receberCarrinho)

export default cartRouter