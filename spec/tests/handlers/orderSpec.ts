import supertest from "supertest";
import app from "../../../src/server";

const test = supertest(app);

describe("1. Orders Routes", () => {
    it("index route GET /orders should respond with status code 401; not yet authorized", async () => {
        expect((await test.get("/orders")).status).toBe(401);
    });

    it("show route GET /orders/:id should respond with status code 401; no token is provided", async () => {
        expect((await test.get("/orders/1")).status).toBe(401);
    });

    it("create route POST /orders should respond with status code 401; not yet authorized", async () => {
        expect((await test.post("/orders/")).status).toBe(401);
    });

    it("addProducts route POST /orders/:id/products should throw error; no values provided", async () => {
        expect(async () => {
            await test.post("/orders/2/products");
        }).toThrow;
    });
});
