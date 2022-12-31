import supertest from "supertest";
import app from "../../../src/server";

const test = supertest(app);

describe("2. Products Routes", () => {
    it("index route GET /products should respond with status code 200", async () => {
        expect((await test.get("/products")).status).toBe(200);
    });

    it("show route GET /products/:id should respond with status code 200", async () => {
        expect((await test.get("/products/2")).status).toBe(200);
    });

    it("create route POST /products should respond with status code 401; no auth", async () => {
        expect((await test.post("/products/")).status).toBe(401);
    });
});
