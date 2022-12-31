import { Products } from "../../../src/models/product";

const store = new Products();

describe("2. Product Model", () => {
    it("a. should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("b. should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("c. should have a create method", () => {
        expect(store.create).toBeDefined();
    });

    it("d. create method should add a product", async () => {
        const result = await store.create({
            name: "chips",
            price: 10,
            category: "food",
        });

        expect(result).toEqual({
            id: 2,
            name: "chips",
            price: 10,
            category: "food",
        });
    });

    it("e. index method should return a list of products", async () => {
        const result = await store.index();
        expect(result[1]).toEqual({
            id: 2,
            name: "chips",
            price: 10,
            category: "food",
        });
    });

    it("f. show method should return the correct product", async () => {
        const result = await store.show("2");
        expect(result).toEqual({
            id: 2,
            name: "chips",
            price: 10,
            category: "food",
        });
    });
});
