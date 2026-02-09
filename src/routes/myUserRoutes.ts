import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { valudateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post('/', jwtCheck, MyUserController.createCurrentUser); // /api/my/user
router.put('/', jwtCheck, jwtParse, valudateMyUserRequest, MyUserController.updateCurrentUser); // /api/my/user
router.get('/', jwtCheck, MyUserController.getCurrentUser); // /api/my/user
export default router;