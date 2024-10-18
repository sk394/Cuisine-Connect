import { Router } from "express";
import { addComment, getAllCommentsByRecipeId } from "../Controller/CommentController.js";


const router = Router();

router.put("/create/:recipeId", addComment);
router.get("/:recipeId", getAllCommentsByRecipeId);

export default router;