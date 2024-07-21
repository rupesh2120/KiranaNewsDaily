import axios from 'axios';
import { NEWS_API_KEY } from '../constants';

export const fetchHeadlines = async () => {
  console.log("API key", NEWS_API_KEY)
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${NEWS_API_KEY}`);
    console.log("API key", response.data, response.data.articles)
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};