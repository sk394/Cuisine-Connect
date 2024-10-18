import { Router } from "express";
import { createRecipe, deleteRecipe, fetchRecipes, fetchSingleRecipe, getRecipesForFeed, getUserRecipes, searchRecipe, updateRecipe } from "../Controller/RecipeController.js";

const router = Router();

router.get("/", fetchRecipes);
router.get("/feed", getRecipesForFeed);
router.get("/user/:userId", getUserRecipes);
router.get("/search", searchRecipe);
router.get("/single/:id", fetchSingleRecipe);
router.get
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id/:userId", deleteRecipe);

export default router;