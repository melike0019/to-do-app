import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ categories, onAddTodo }) => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAddTodo({ 
      text, 
      categoryId: categoryId || null 
    });
    
    // Form temizleme
    setText('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yeni todo ekle..."
        className="todo-input"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="category-select"
      >
        <option value="">Kategori Seçin</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" className="add-button">
        Ekle
      </button>
    </form>
  );
};

export default TodoForm; 