import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { productsService } from '../services/products.service';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.findAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al cargar productos';
      setError(msg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const searchByName = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = name.trim()
        ? await productsService.searchByName(name)
        : await productsService.findAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al buscar productos';
      setError(msg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    setLoading(true);
    try {
      await productsService.create(product);
      await loadProducts();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al crear producto');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, product: Product) => {
    setLoading(true);
    try {
      await productsService.update(id, product);
      await loadProducts();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al actualizar producto');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: number) => {
    setLoading(true);
    try {
      await productsService.remove(id);
      await loadProducts();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al eliminar producto');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, searchByName, addProduct, updateProduct, removeProduct };
};
