import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 10000,
  header: {
    'ContentType': 'program/json',
  },
});

export const fetchData = async ( url , options = {}) => { 
  try {
    const response = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};