import { Router } from "express";
import { listarProdutos } from "../controllers/productsController.js";

const productsRouter = Router();
productsRouter.get("/products", listarProdutos)


export default productsRouter