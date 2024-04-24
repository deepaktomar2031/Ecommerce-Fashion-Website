import { Router } from "express";
import { FindProduct } from "./controller/FindProduct.controller";

export const routes = (router: Router) => {
    router.get("/api/product", FindProduct);
};
