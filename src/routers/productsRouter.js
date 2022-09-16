import { Router } from "express";
import { enviarCarrinho, listarProdutos} from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/products", listarProdutos)
productsRouter.post("/cart", enviarCarrinho)

export default productsRouter