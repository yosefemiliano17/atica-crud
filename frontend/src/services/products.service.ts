import axios from 'axios';
import { API_URL } from '../config/env';
import type { Product } from '../types';

export const productsService = {
  findAll: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  searchByName: async (name: string): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  create: async (product: Product): Promise<Product> => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },

  update: async (id: number, product: Product): Promise<Product> => {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/${id}`);
  },
};
