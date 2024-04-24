import App from "../../app/index";
import { ConnectDB, DisconnectDB } from "../Connection";

describe("GET /api/product", () => {
    App.start();
    beforeAll(async () => {
        await ConnectDB();
    });

    afterAll(async () => {
        await DisconnectDB();
    });

    it("Responds", async () => {

    });
});
