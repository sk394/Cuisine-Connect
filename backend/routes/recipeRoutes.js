import { Router } from "express";
import { createRecipe, deleteRecipe, fetchRecipes, fetchSingleRecipe, searchRecipe, updateRecipe } from "../Controller/RecipeController.js";

const router = Router();

router.get("/", fetchRecipes);
router.get("/search", searchRecipe);
router.get("/:id", fetchSingleRecipe);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;