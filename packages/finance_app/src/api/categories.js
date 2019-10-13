/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_CATEGORIES } from '../graphql/categories';

const getCategories = async () => {
  const response = await axios.post('/graphql', {
    query: GET_CATEGORIES
  });

  return response.data.data.categories;
};

export { getCategories };
