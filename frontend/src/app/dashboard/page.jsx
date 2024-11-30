import { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";
import PageWrapper from "@/components/page-wrapper";
import { getAllRecipesFeed } from "../api/recipe";
import { getRecipeRatingByUserId } from "../api/rating";
import RecipePostWrapper from "@/components/recipes/recipe-view-wrapper";


const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    const getRecipes = await getAllRecipesFeed();
    
    const recipesWithUserRating = new Map();

    for (const recipe of getRecipes) {
        const rating = await getRecipeRatingByUserId(recipe.id, session?.user?.sub);
        recipesWithUserRating.set(recipe.id, rating?.value?? 0);
    }

    // Map the recipes and add the rating as a new attribute
    const recipesWithRatings = getRecipes.map(recipe => {
        return {
            ...recipe,
            userRating: recipesWithUserRating.get(recipe.id) || 0 
        };
    });
    
    return (
        <PageWrapper>
            <div className="absolute top-0 right-40 left-40 ml-10 h-screen overflow-hide">
                <RecipePostWrapper posts={recipesWithRatings} />
            </div> 
        </PageWrapper>
    );
}

export default DashboardPage;