import { Router } from "express";
import { getRecipeRatingByUserId, rateRecipe } from "../Controller/RatingController.js";


const router = Router();

router.put("/:recipeId", rateRecipe);
router.get("/single/:recipeId/:userId", getRecipeRatingByUserId);

export default router;