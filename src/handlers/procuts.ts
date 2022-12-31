import { Product, Products } from "../models/product";
import express, { Request, Response } from "express";
import VerifyAuthToken from "../services/verifyAuth";
// import verifyAuthToken from "../services/verifyAuth";

const productsStore = new Products();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await productsStore.index();
        res.json(products);
    } catch (err) {
        res.json(`${err}`);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await productsStore.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.json(`${err}`);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const createdProduct = await productsStore.create(product);

        res.json(createdProduct);
    } catch (err) {
        res.json(`${err}`);
    }
};

const verifyAuthToken = new VerifyAuthToken()
const products_routes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products/", verifyAuthToken.authByUserID, create);
};

export default products_routes;
