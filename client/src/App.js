import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SortOptions from './components/SortOptions';

function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, [selectedCategory, sortBy]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        params: {
          categoryId: selectedCategory,
          sortBy
        }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Todo\'lar yüklenirken hata oluştu:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata oluştu:', error);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', todoData);
      setTodos([response.data, ...todos]);
    } catch (error) {
      console.error('Todo eklenirken hata oluştu:', error);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/categories', categoryData);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Kategori eklenirken hata oluştu:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Todo güncellenirken hata oluştu:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Todo silinirken hata oluştu:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo Uygulaması</h1>
        
        <div className="app-content">
          <div className="sidebar">
            <CategoryForm onAddCategory={addCategory} />
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          <div className="main-content">
            <div className="todo-header">
              <TodoForm categories={categories} onAddTodo={addTodo} />
              <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
            </div>
            
            <TodoList
              todos={todos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 