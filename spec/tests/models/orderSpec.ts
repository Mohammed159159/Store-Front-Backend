import { Orders } from "../../../src/models/order";
import { Users } from "../../../src/models/user";
import { Products } from "../../../src/models/product";

const store = new Orders();
const usersStore = new Users();
const productsStore = new Products();

describe("1. Order Model", () => {
    it("a. should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("b. should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("c. should have a create method", () => {
        expect(store.create).toBeDefined();
    });

    it("d. should have a addProduct method", () => {
        expect(store.addProduct).toBeDefined();
    });

    it("e. create method should add an order", async () => {
        await usersStore.create({
            firstname: "fname",
            lastname: "lname",
            password: "password",
        });
        const result = await store.create({
            user_id: "1",
            status: "ACTIVE",
        });

        expect(result).toEqual({
            id: 1,
            user_id: "1",
            status: "ACTIVE",
        });
    });

    it("f. index method should return a list of orders", async () => {
        const result = await store.index();

        expect(result[0]).toEqual({
            id: 1,
            user_id: "1",
            status: "ACTIVE",
        });
    });

    it("g. show method should return the correct order", async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            user_id: "1",
            status: "ACTIVE",
        });
    });

    it("h. addProduct method should return the added product", async () => {
        await productsStore.create({
            name: "chips",
            price: 10,
            category: "food",
        });
        const result = await store.addProduct(10, "1", "1");
        expect(result).toEqual({
            id: 1,
            quantity: 10,
            order_id: "1",
            product_id: "1",
        });
    });
});
