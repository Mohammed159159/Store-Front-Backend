import { User, UserUpdate, Users } from "../models/user";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import VerifyAuthToken from "../services/verifyAuth";

const usersStore = new Users();
const secret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await usersStore.index();
        res.json(users);
    } catch (err) {
        res.json(`${err}`);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        res.locals.user = req.params.id;
        const user = await usersStore.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.json(`${err}`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };

        const newUser = await usersStore.create(user);
        const token = jwt.sign({ user: newUser }, secret);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err as string);
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const user: UserUpdate = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const updatedUser = await usersStore.edit(req.params.id, user);
        res.json(updatedUser);
    } catch (err) {
        res.json(`${err}`);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const user = await usersStore.delete(req.params.id);
        res.json(user);
    } catch (err) {
        res.json(`${err}`);
    }
};

const auth = async (req: Request, res: Response) => {
    try {
        const user = await usersStore.auth(
            req.body.firstname,
            req.body.password
        );
        const token = jwt.sign({ user: user }, secret);
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json(err as string);
    }
};
const verifyAuthToken = new VerifyAuthToken()
const users_routes = (app: express.Application) => {
    app.get("/users", verifyAuthToken.authByUserID, index);
    app.get("/users/:id", verifyAuthToken.authByUserID, show);
    app.post("/users", create);
    app.post("/users/auth", auth);
    app.put("/users/:id", verifyAuthToken.authByUserID, edit);
    app.delete("/users/:id", verifyAuthToken.authByUserID, destroy);
};

export default users_routes;
