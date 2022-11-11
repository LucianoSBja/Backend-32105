import { Router } from "express";
const router = Router();
import productsRoute from "./products.routes.js"
import controller from "../controllers/index.controller.js"
import fakerTest from "../controllers/faker.controller.js"


//? INDEX
router.get("/", controller.index)
router.use("/api/products", productsRoute);
router.use("/api/products-test", fakerTest)

export default router