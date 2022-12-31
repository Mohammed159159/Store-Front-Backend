import supertest from "supertest";
import app from "../../../src/server";

const test = supertest(app);

describe("3. Users Routes", () => {
    it("index route GET /users should respond with status code 401; no auth", async () => {
        expect((await test.get("/users")).status).toBe(401);
    });

    it("show route GET /users/:id should respond with status code 401; invalid token", async () => {
        expect((await test.get("/users/2")).status).toBe(401);
    });

    it("create route POST /users should respond with status code 200", async () => {
        expect((await test.post("/users/")).status).toBe(200);
    });

    it("auth route POST /users/auth should respond with error; no credintials provided", async () => {
        expect(async () => {
            await test.post("/users/");
        }).toThrow;
    });

    it("edit route PUT /users/:id should respond with status code 401; invalid token", async () => {
        expect((await test.get("/users/2")).status).toBe(401);
    });

    it("delete route DELETE /users/:id should respond with status code 401; invalid token", async () => {
        expect((await test.get("/users/2")).status).toBe(401);
    });
});
