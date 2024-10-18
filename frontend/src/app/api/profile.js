import axios from "axios";

const BASE_URL= "http://localhost:4000/api/user";

export const getProfileDetails = async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
}

export const updateProfileDetails = async (userId, data) => {
    const response = await axios.put(`${BASE_URL}/${userId}`, data);
    return response.data;
}