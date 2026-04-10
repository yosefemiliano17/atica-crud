import React from 'react';
import type { Product } from '../../types';
import './Products.css';

interface ConfirmDeleteModalProps {
  product: Product;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ product, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Eliminar Producto</h2>
        <p>¿Estás seguro de que deseas eliminar el producto <strong>{product.name}</strong>?</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginTop: '0.5rem' }}>
          Esta acción no se puede deshacer.
        </p>
        
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button 
            type="button" 
            className="btn-danger" 
            onClick={() => {
              if (product.id) onConfirm(product.id);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
