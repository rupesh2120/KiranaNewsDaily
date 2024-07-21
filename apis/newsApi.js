import axios from 'axios';
import { NEWS_API_KEY } from '../constants';

export const fetchHeadlines = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&pageSize=100&apiKey=${NEWS_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};