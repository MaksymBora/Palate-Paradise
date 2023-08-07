import axios from 'axios';
import { notifyError } from '../notifications';

export default class RecipeApiService {
  constructor() {
    this.BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
    this.category = '';
    this.page = 1;
    this.limit = 6;
    this.time = '';
    this.area = '';
    this.ingredients = '';
    this.recipeId = '';
  }

  resizePage() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      return 'per_page=9&limit=9';
    }

    if (screenWidth >= 768 && screenWidth < 1280) {
      return 'per_page=8&limit=8';
    }

    if (screenWidth < 768) {
      return 'per_page=6&limit=6';
    }
  }

  async getCooksEvents() {
    const url = `${this.BASE_URL}/events`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getCategories() {
    const url = `${this.BASE_URL}/categories`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getRecipe() {
    const url = `${this.BASE_URL}/recipes?category=${this.category}&page=${
      this.page
    }&${this.resizePage()}&time=${this.time}&area=${this.area}&ingredients=${
      this.ingredients
    }`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getRecByIngredient() {
    const url = `${this.BASE_URL}/recipes?ingredient=${
      this.ingredients
    }&page=1&${this.resizePage()}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getPopular() {
    const url = `${this.BASE_URL}/recipes/popular`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getRecipeById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  // !!! PATCH RATING  !!!//
  async patchRatingById() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/rating`;
    try {
      const response = await axios.patch(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getIngredients() {
    const url = `${this.BASE_URL}/ingredients`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  async getAreas() {
    const url = `${this.BASE_URL}/areas`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }

  // !!! POST ORDER  CHECK DOCS!!!//
  async postOrder() {
    const url = `${this.BASE_URL}/recipes/${this.recipeId}/orders/add`;
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      notifyError(error);
    }
  }
}
