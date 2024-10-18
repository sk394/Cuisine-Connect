import { Router } from "express";
import userRoutes from "./userRoutes.js";
import recipeRoutes from "./recipeRoutes.js";
import commentRoutes from "./commentRoutes.js";
import ratingsRoutes from "./ratingsRoutes.js";
import bookmarkRoutes from "./bookmarkRoutes.js";


const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/recipes", recipeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/ratings", ratingsRoutes);
router.use("/api/bookmarks", bookmarkRoutes);

export default router;