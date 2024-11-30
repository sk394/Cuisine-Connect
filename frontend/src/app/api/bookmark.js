import axios from "axios";

const BASE_URL= "http://localhost:4000/api/bookmarks";

export const addBookmark = async ({ recipeId, userId }) => {
    const response = await axios.post(`${BASE_URL}/create`, {
        recipeId,
        userId,
    });
    return response.data;
}

export const fetchUserBookmarks = async (userId) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
}

export const removeBookmark = async ({ recipeId, userId }) => {
    const response = await axios.delete(`${BASE_URL}/remove`, {
        data: {
            recipeId,
            userId,
        },
    });
    return response.data;
};