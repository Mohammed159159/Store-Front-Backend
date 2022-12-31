import express, { Request, Response } from "express";
import { Orders, Order } from "../models/order";
import jwt, { JwtPayload } from "jsonwebtoken";
import VerifyAuthToken from "../services/verifyAuth";

const ordersStore = new Orders();
const secret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response): Promise<void> => { //TODO: show ACTIVE orders by CURRENT user only
    try {                                                             //TODO: filtering orders by status
        const orders = await ordersStore.index();
        res.json(orders);
    } catch (err) {
        res.json(`${err}`);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    const order = await ordersStore.show(req.params.id);
    try {
        const token = req.headers.authorization as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        if (decoded.user.id == order.user_id) {
            res.json(order);
        } else {
            res.json("ID mistmatch. Cannot get order with id: " + order.id);
        }
    } catch (err) {
        res.status(401);
        res.json("Error: " + err);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        const order: Order = {
            user_id: decoded.user.id,
            status: "ACTIVE", //TODO: need to allow user to add products to order on creation?
        };

        const newOrder = await ordersStore.create(order);

        res.json(newOrder);
    } catch (err) {
        res.json(`${err}`);
    }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product_order = await ordersStore.addProduct(
            req.body.quantity,
            req.params.id,
            req.body.product_id
        );
        res.json(product_order);
    } catch (err) {
        res.json(`${err}`);
    }
};
const verifyAuthToken = new VerifyAuthToken()
const orders_routes = (app: express.Application) => {
    app.use("/orders", verifyAuthToken.authByOrderID);
    app.get("/orders", index);
    app.get("/orders/:id", show);
    app.post("/orders", create);
    app.post("/orders/:id/products", addProduct);
};

export default orders_routes;
