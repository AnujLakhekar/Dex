import express from "express"

const router = express.Router();
import {overviewController , productsController, deleteController} from "../controllers/overview.controller.js"


router.post("/me", overviewController);
router.post("/create/product", productsController);
router.post("/delete/:productId", deleteController);


export default router;