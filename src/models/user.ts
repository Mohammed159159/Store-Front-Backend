import pool from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

export type UserUpdate = {
    firstname?: string;
    lastname?: string;
    password?: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class Users {
    async index(): Promise<User[]> {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM users";

            const result = await client.query(sql);

            client.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = "SELECT * FROM users WHERE id=($1)";
            const client = await pool.connect();

            const result = await client.query(sql, [id]);

            client.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql =
                "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
            const client = await pool.connect();

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await client.query(sql, [
                u.firstname,
                u.lastname,
                hash,
            ]);

            const user = result.rows[0];

            client.release();

            return user;
        } catch (err) {
            throw new Error(
                `Could not add new user ${
                    u.firstname + " " + u.lastname
                }. Error: ${err}`
            );
        }
    }

    async edit(id: string, user_update: UserUpdate): Promise<User> {
        try {
            const client = await pool.connect();
            const sql =
                "UPDATE users SET firstname=COALESCE($1, firstname), lastname=COALESCE($2, lastname), password=COALESCE($3, password) WHERE id=$4 RETURNING *";
            let password: string | null;
            if (user_update.password) {
                password = bcrypt.hashSync(
                    user_update.password + pepper,
                    parseInt(saltRounds)
                );
            } else {
                password = null;
            }
            const result = await client.query(sql, [
                user_update.firstname,
                user_update.lastname,
                password,
                id,
            ]);
            const updated_user = result.rows[0];
            client.release();

            return updated_user;
        } catch (err) {
            throw new Error(`Could not update user ${id}. Error ${err}`);
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const client = await pool.connect();
            const sql = "DELETE FROM users WHERE id=($1) RETURNING *";

            const result = await client.query(sql, [id]);

            const user = result.rows[0];

            client.release();

            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async auth(firstname: string, password: string): Promise<User | null> {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM users WHERE firstname=($1)";

            const result = await client.query(sql, [firstname]);
            const user = result.rows[0];

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            } else return null;
        } catch (err) {
            throw new Error(
                `Could not sign in using the provided credintials. Error: ${err}`
            );
        }
    }
}
