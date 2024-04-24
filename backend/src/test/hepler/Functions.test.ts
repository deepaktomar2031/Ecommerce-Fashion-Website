import { QueryBuilder, SortingBuilder } from "./../../app/helper/Functions";

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
