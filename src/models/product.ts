import pool from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class Products {
    async index(): Promise<Product[]> {
        try {
            const client = await pool.connect();
            const sql = `SELECT * FROM products`;

            const result = await client.query(sql);

            client.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const client = await pool.connect();
            const sql = `SELECT * FROM products WHERE id=($1)`;

            const result = await client.query(sql, [id]);

            client.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not get product with id: ${id}. Error: ${err}`
            );
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const client = await pool.connect();
            const sql =
                "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";

            const result = await client.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);

            client.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not create product with name: ${product.name}. Error: ${err}`
            );
        }
    }
}
