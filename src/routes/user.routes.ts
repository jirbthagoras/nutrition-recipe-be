import {  Router } from 'express';
import {getUserController, loginController, registerController} from "../controllers/user.controller";
import {validateDTO} from "../middlewares/validate.middleware";
import {registerUserSchema} from "../dtos/user.dtos";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/:userId", getUserController);

export default router;