import React from 'react';
import './TodoList.css';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo._id} className="todo-item">
          <div className="todo-content">
            <span
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onClick={() => onToggleTodo(todo._id)}
            >
              {todo.text}
            </span>
            {todo.category && (
              <span
                className="todo-category"
                style={{ backgroundColor: todo.category.color }}
              >
                {todo.category.name}
              </span>
            )}
          </div>
          <div className="todo-actions">
            <span className="todo-date">
              {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
            </span>
            <button
              onClick={() => onDeleteTodo(todo._id)}
              className="delete-button"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList; 