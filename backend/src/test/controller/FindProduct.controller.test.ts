import request from "supertest";
import { statusCode } from "./../../app/enum/status-code";
import App, { app } from "../../app/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("GET /api/product", () => {
    App.start();
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds 200 OK with all 17 products available in DB", async () => {
        const response = await request(app).get(`/api/product`);
        expect(response.statusCode).toBe(statusCode.successful_request);
    });

    it("Responds with 2 brand names available in DB", async () => {
        const response = await request(app).get(`/api/product`);
        expect(response.body.data.filters.brandName.length).toBe(2);
    });

    it("Responds with 3 category names available in DB", async () => {
        const response = await request(app).get(`/api/product`);
        expect(response.body.data.filters.category.length).toBe(3);
    });

    it("Responds with All 12 Aurora brand products available in DB", async () => {
        const filter = `brandName=Aurora`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.brandName).toBe("Aurora");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });

    it("Responds with All 5 Nova brand products available in DB", async () => {
        const filter = `brandName=Nova`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.brandName).toBe("Nova");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });

    it("Responds with All 7 jacket in product category available in DB", async () => {
        const filter = `category=jacket`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.category).toBe("jacket");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });

    it("Responds with All 2 pant in product category available in DB", async () => {
        const filter = `category=pant`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.category).toBe("pant");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });

    it("Responds with All 8 shirt in product category available in DB", async () => {
        const filter = `category=shirt`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.category).toBe("shirt");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });

    it("Responds with All 8 shirt in product category available in DB", async () => {
        const filter = `category=jeans`;
        const response = await request(app).get(`/api/product?${filter}`);
        for (const element of response.body.data.productData) {
            expect(element.category).toBe("shirt");
        }
        expect(parseInt(response.body.data.productData.length)).toBe(response.body.resultCount);
    });
});
