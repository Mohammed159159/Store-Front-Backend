import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_USER_PASSWORD,
    ENV,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
} = process.env;

let pool: Pool;

if (ENV == "dev") {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else {
    pool = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_USER_PASSWORD,
    });
}

export default pool;
