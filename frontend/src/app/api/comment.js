import axios from "axios";

const BASE_URL= "http://localhost:4000/api/comments";

export const addComment = async ({ recipeId, userId, content }) => {
    const response = await axios.put(`${BASE_URL}/create/${recipeId}`, {
        recipeId,
        userId,
        content, 
    });
    return response.data;
}

export const getAllCommentsByRecipeId = async (recipeId) => {
    const response = await axios.get(`${BASE_URL}/${recipeId}`);
    return response.data;
}