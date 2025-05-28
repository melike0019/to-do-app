import React from 'react';
import './SortOptions.css';

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-options">
      <label>Sıralama:</label>
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