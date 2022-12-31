import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {Order, Orders} from "../../src/models/order"

const secret = process.env.TOKEN_SECRET as string;

class VerifyAuthToken {

    authByUserID = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const id: number = parseInt(req.params.id)
        this.verify(req, res, next, id)
    };

    authByOrderID = async ( //need to try catch
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
            const order_id = req.params.id
            if(order_id)
            {
                const order: Order = await (new Orders()).show(order_id)
                const id: number = parseInt(order.user_id);
                this.verify(req, res, next, id);
                res.locals.order = order;
            } else {
                this.verify(req, res, next)
            }
    };

    verify = (req: Request, res: Response, next: NextFunction, id?: number): void => {
    try {
        const token = req.headers.authorization as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;
        if (id && id != decoded.user.id) {
            res.status(401);
            res.json(
                "User ID mismatch with token ID 🤨. Did you mean to access a different account?"
            );
            return
        }
        next();
    } catch (err) {
        res.status(401);
        res.json(
            "Invalid token 😥. Please sign in or sign up 👍. Error: " + err
        );
        return;
    }
    }
}

export default VerifyAuthToken;
