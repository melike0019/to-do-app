import React from 'react';
import './SortOptions.css';

// SortOptions bileşeni - Todo'ların sıralama seçeneklerini gösterir
const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-options">
      <label>Sıralama:</label>
      {/* Sıralama seçenekleri için dropdown */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="date">Tarihe Göre</option>
        <option value="category">Kategoriye Göre</option>
      </select>
    </div>
  );
};

export default SortOptions; 