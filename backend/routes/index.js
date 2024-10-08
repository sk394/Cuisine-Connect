import { Router } from "express";
import userRoutes from "./userRoutes.js";
import recipeRoutes from "./recipeRoutes.js";


const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/recipes", recipeRoutes);

export default router;