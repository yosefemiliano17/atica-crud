import React, { useState, useRef } from 'react';
import type { Product } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import ProductModal from './ProductModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import './Products.css';

const ProductsList: React.FC = () => {
  const { products, loading, error, searchByName, addProduct, updateProduct, removeProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchByName(value), 400);
  };

  const handleAddProduct = () => { setSelectedProduct(null); setProductModalOpen(true); };
  const handleEditProduct = (product: Product) => { setSelectedProduct(product); setProductModalOpen(true); };
  const handleDeleteClick = (product: Product) => { setSelectedProduct(product); setDeleteModalOpen(true); };

  const handleSaveProduct = async (product: Product) => {
    const payload = { ...product, price: Number(product.price), stock: Number(product.stock) };
    const success = payload.id
      ? await updateProduct(payload.id, payload)
      : await addProduct(payload);
    if (success) setProductModalOpen(false);
  };

  const handleConfirmDelete = async (id: number) => {
    const success = await removeProduct(id);
    if (success) setDeleteModalOpen(false);
  };

  return (
    <div className="products-page">
      <div className="products-container">


        <div className="products-header">
          <h1>Productos</h1>
          <button className="btn-primary" onClick={handleAddProduct} disabled={loading}>
            + Nuevo Producto
          </button>
        </div>


        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar productos por nombre…"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => { setSearchTerm(''); searchByName(''); }}
              >
                ✕
              </button>
            )}
          </div>
          {loading && <span className="search-loading">Buscando…</span>}
        </div>


        {error && <div className="error-banner">{error}</div>}


        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{product.id}</td>
                    <td style={{ fontWeight: 600 }}>{product.name}</td>
                    <td style={{ color: 'var(--text)' }}>{product.description}</td>
                    <td>
                      <code style={{ background: 'var(--accent-soft)', color: 'var(--accent)', padding: '0.2em 0.5em', borderRadius: '5px', fontSize: '0.78rem' }}>
                        {product.sku}
                      </code>
                    </td>
                    <td>{product.stock}</td>
                    <td className="price-col">${Number(product.price).toFixed(2)}</td>
                    <td className="action-buttons">
                      <button className="btn-secondary" onClick={() => handleEditProduct(product)} disabled={loading}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDeleteClick(product)} disabled={loading}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan={7}>
                    {loading
                      ? 'Buscando…'
                      : searchTerm
                        ? `No se encontraron productos con el nombre "${searchTerm}".`
                        : 'No hay productos registrados.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {products.length > 0 && (
          <p className="result-count">
            {products.length} producto{products.length !== 1 ? 's' : ''}{searchTerm ? ` encontrado${products.length !== 1 ? 's' : ''} para "${searchTerm}"` : ''}
          </p>
        )}

      </div>

      {isProductModalOpen && (
        <ProductModal product={selectedProduct} onClose={() => setProductModalOpen(false)} onSave={handleSaveProduct} />
      )}
      {isDeleteModalOpen && selectedProduct && (
        <ConfirmDeleteModal product={selectedProduct} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
};

export default ProductsList;
