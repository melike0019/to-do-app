import React from 'react';
import './CategoryList.css';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-list">
      <h3>Kategoriler</h3>
      <div className="category-items">
        <div
          className={`category-item ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          Tümü
        </div>
        {categories.map(category => (
          <div
            key={category._id}
            className={`category-item ${selectedCategory === category._id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category._id)}
            style={{ borderLeftColor: category.color }}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList; 