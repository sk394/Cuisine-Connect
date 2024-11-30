import axios from "axios";

const BASE_URL= "http://localhost:4000/api/recipes";

export const getAllRecipes = async (page = 1, limit= 10) => {
    const response = await axios.get(BASE_URL, {params: {page, limit}});
    return response.data;
}

export const getAllRecipesFeed = async () => {
    const response = await axios.get(`${BASE_URL}/feed`);
    return response.data;
}

export const createRecipe = async (recipe) => {
    const response = await axios.post(BASE_URL, recipe);
    return response.data;
}

export const getRecipe = async (id) => {
    const response = await axios.get(`${BASE_URL}/single/${id}`);
    return response.data;
}

export const updateRecipe = async (id, recipe) => {
    const response = await axios.put(`${BASE_URL}/${id}`, recipe);
    return response.data;
}

export const deleteRecipe = async ({id, userId}) => {
    const response = await axios.delete(`${BASE_URL}/${id}/${userId}`);
    return response.data;
}

export const searchRecipes = async (query) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data;
}

export const getUserPostedRecipes = async (userId) => {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
}

