import React, { useState } from 'react';
import './CategoryForm.css';

const CategoryForm = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAddCategory({ name, color });
    setName('');
    setColor('#000000');
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Yeni kategori adı..."
        className="category-input"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="color-input"
      />
      <button type="submit" className="add-category-button">
        Kategori Ekle
      </button>
    </form>
  );
};

export default CategoryForm; 