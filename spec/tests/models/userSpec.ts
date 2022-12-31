import { Users } from "../../../src/models/user";
import bcrypt from "bcrypt";

const store = new Users();

const pepper = process.env.BCRYPT_PASSWORD as string;

//TODO: allow tests to run in order create user and set header -> do user methods -> create product -> do product methods
//-> create order -> do order methods

describe("3. User Model", () => {
    it("a. should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("b. should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("c. should have a create method", () => {
        expect(store.create).toBeDefined();
    });

    it("d. should have an update method", () => {
        expect(store.edit).toBeDefined();
    });

    it("e. should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });

    it("f. should have an auth method", () => {
        expect(store.auth).toBeDefined;
    });

    it("g. create method should add a user", async () => {
        const result = await store.create({
            firstname: "fname",
            lastname: "lname",
            password: "password",
        });

        expect(result.firstname).toBe("fname");
        expect(result.lastname).toBe("lname");
        expect(bcrypt.compareSync("password" + pepper, result.password)).toBe(
            true
        );
    });

    it("h. index method should return a list of users", async () => {
        const result_ = await store.index();
        const result = result_[1];
        expect(result.firstname).toBe("fname");
        expect(result.lastname).toBe("lname");
        expect(bcrypt.compareSync("password" + pepper, result.password)).toBe(
            true
        );
    });

    it("i. show method should return the correct user", async () => {
        const result = await store.show("2");
        expect(result.firstname).toBe("fname");
        expect(result.lastname).toBe("lname");
        expect(bcrypt.compareSync("password" + pepper, result.password)).toBe(
            true
        );
    });

    it("j. delete method should remove the user", async () => {
        store.delete("2");
        const result = await store.index();

        expect(result.length).toEqual(2);
    });

    it("k. auth method should return User on provision with ceridentials", async () => {
        expect(await store.auth("fname", "password")).not.toBe(null);
    });
});
