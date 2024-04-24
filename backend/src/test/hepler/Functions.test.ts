import { SetDistinctProperty, GetDistinctProperty, QueryBuilder, SortingBuilder } from "./../../app/helper/Functions";
import { ConnectDB, DisconnectDB } from "../Connection";
import { filters } from "../../app/enum/filters";

describe("Function QueryBuilder", () => {
    it("Responds with final MongoDB query when query object is supplied in request query", () => {
        const query = { brandName: "Aurora", category: "jacket", price: "asc" };
        const expectedResult = { brandName: "Aurora", category: "jacket" };
        const response = QueryBuilder(query);

        expect(response).toEqual(expectedResult);
    });

    it("Responds with final MongoDB query when sort ascending is supplied in request query", () => {
        const sort = { brandName: "Aurora", category: "jacket", price: "asc" };
        const expectedResult = { price: 1 };
        const response = SortingBuilder(sort);

        expect(response).toEqual(expectedResult);
    });
});

describe("Function SortingBuilder", () => {
    it("Responds with final MongoDB query when sort ascending is supplied in request query", () => {
        const sort = { brandName: "Aurora", category: "jacket", price: "desc" };
        const expectedResult = { price: -1 };
        const response = SortingBuilder(sort);

        expect(response).toEqual(expectedResult);
    });

    it("Responds with final MongoDB query when no sorting param is supplied in request query", () => {
        const sort = { brandName: "Aurora", category: "jacket" };
        const expectedResult = { stock: -1 };
        const response = SortingBuilder(sort);

        expect(response).toEqual(expectedResult);
    });
});

describe("Function SetDistinctProperty", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with those many keys inside filters object, which are available in filters enum", async () => {
        const actualResponse = await SetDistinctProperty();
        const expectedResponse = Object.values(filters).length;

        expect(Object.keys(actualResponse.data.filters).length).toBe(expectedResponse);
    });
});

describe("Function GetDistinctProperty", () => {
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds with 2 options in brandName available in DB", async () => {
        const actualResponse = await GetDistinctProperty(filters.property_1);
        expect(actualResponse!.length).toBe(2);
    });

    it("Responds with 3 options in category available in DB", async () => {
        const actualResponse = await GetDistinctProperty(filters.property_2);
        expect(actualResponse!.length).toBe(3);
    });
});
