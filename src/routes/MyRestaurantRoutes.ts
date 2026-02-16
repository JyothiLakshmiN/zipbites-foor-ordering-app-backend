import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {validateMyRestaurantRequest} from "../middleware/validation";
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
router.post('/',
    upload.single("imageFile"), 
    jwtCheck, 
    jwtParse, 
    validateMyRestaurantRequest, 
    MyRestaurantController.createMyRestaurant
); // /api/my/restaurant
router.put('/', 
    upload.single("imageFile"), 
    jwtCheck, 
    jwtParse, 
    validateMyRestaurantRequest, 
    MyRestaurantController.updateMyRestaurant
); // /api/my/restaurant

router.get('/', 
    jwtCheck, 
    jwtParse, 
    MyRestaurantController.getMyRestaurant
); // /api/my/restaurant

export default router;