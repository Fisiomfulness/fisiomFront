import { BASE_URL } from "./utils/api";

export const baseUrl = `${BASE_URL}/`;
export const apiEndpoints = {
  products: baseUrl + 'products/',
  productsDetail: baseUrl + 'products/detail/',
  categories: baseUrl + 'category/',
  professionals: baseUrl + 'professionals/',
  professionalsDetail: baseUrl + 'professionals/detail/',
  professionalRating: baseUrl + 'professionals/rating/',
  specialties: baseUrl + 'specialty/',
  users: baseUrl + 'users/',
  interests: baseUrl + 'interests/',
  services: baseUrl + 'services/',
};