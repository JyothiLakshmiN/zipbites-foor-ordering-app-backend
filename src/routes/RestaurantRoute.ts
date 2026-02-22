import express, { Router } from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";


const router = express.Router();

router.get("/search/:city", param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
    RestaurantController.searchRestaurant
);

router.get("/:restaurantId", param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant parameter must be a valid string"),
    RestaurantController.getRestaurant
)
// router.post("/");
// router.put("/");

export default router;