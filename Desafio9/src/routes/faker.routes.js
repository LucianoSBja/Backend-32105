import { Router } from "express";
const router = Router();
import fakerTest from "../controllers/faker.controller.js"


router.get("/", fakerTest);

export default router;