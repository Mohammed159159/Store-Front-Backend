import pool from "../database";

export type Order = {
    id?: number;
    user_id: string;
    status: string;
};

export class Orders {
    async index(): Promise<Order[]> {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM orders";

            const result = await client.query(sql);

            client.release();

            return result.rows;
        } catch (err) {
            throw new Error("Could not get orders. Error: " + err);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";

            const result = await client.query(sql, [id]);

            client.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not get order with id: ${id}. Error: ${err}`
            );
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const client = await pool.connect();
            const sql =
                "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";

            const result = await client.query(sql, [
                order.user_id,
                order.status,
            ]);
            client.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not create order for user with id ${order.user_id}. Error: ${err}`
            );
        }
    }
    async addProduct(
        quantity: number,
        order_id: string,
        product_id: string
    ): Promise<void | {
        id: number;
        quantity: number;
        order_id: string;
        product_id: string;
    }> {
        try {
            //check if order is active
            const client = await pool.connect();
            const orderSql = "SELECT * FROM orders WHERE id=($1)";

            const result = await client.query(orderSql, [order_id]);

            client.release();

            const order: Order = result.rows[0];

            if (order.status != "ACTIVE" || order.status == null) {
                throw new Error(
                    `Cannot add this product with id ${product_id} to ${order.status} order of id ${order_id}`
                );
            }
        } catch (err) {
            throw new Error(`${err}`);
        }

        try {
            //add order
            const client = await pool.connect();
            const sql =
                "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";

            const result = await client.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);

            client.release();

            const product_order = result.rows[0];

            return product_order;
        } catch (err) {
            throw new Error(
                `Could not add product with id ${product_id} to order with id ${order_id}. Error: ${err}`
            );
        }
    }
}
