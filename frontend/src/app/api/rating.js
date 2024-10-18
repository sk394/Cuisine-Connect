import axios from "axios";

const BASE_URL= "http://localhost:4000/api/ratings";

export const rateRecipe = async ({recipeId, userId, value}) => {
    const response = await axios.put(`${BASE_URL}/${recipeId}`,{userId, value});
    return response.data;
}

export const getRecipeRatingByUserId = async (recipeId, userId) => {
    const response = await axios.get(`${BASE_URL}/single/${recipeId}/${userId}`);
    return response.data;
}

