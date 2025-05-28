import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Bileşeni', () => {
  const mockTodos = [
    {
      _id: '1',
      text: 'Test Todo 1',
      completed: false,
      category: { _id: '1', name: 'İş', color: '#ff0000' },
      createdAt: '2024-02-20T10:00:00.000Z'
    },
    {
      _id: '2',
      text: 'Test Todo 2',
      completed: true,
      category: { _id: '2', name: 'Kişisel', color: '#00ff00' },
      createdAt: '2024-02-20T11:00:00.000Z'
    }
  ];

  const mockOnToggleTodo = jest.fn();
  const mockOnDeleteTodo = jest.fn();

  beforeEach(() => {
    mockOnToggleTodo.mockClear();
    mockOnDeleteTodo.mockClear();
  });

  test('todo listesi doğru şekilde render ediliyor', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );
    
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getByText('İş')).toBeInTheDocument();
    expect(screen.getByText('Kişisel')).toBeInTheDocument();
  });

  test('todo tamamlandı olarak işaretlenebiliyor', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );
    
    const todoText = screen.getByText('Test Todo 1');
    fireEvent.click(todoText);
    
    expect(mockOnToggleTodo).toHaveBeenCalledWith('1');
  });

  test('todo silinebiliyor', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );
    
    const deleteButtons = screen.getAllByText('Sil');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDeleteTodo).toHaveBeenCalledWith('1');
  });

  test('tamamlanmış todo\'lar üstü çizili görünüyor', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggleTodo}
        onDeleteTodo={mockOnDeleteTodo}
      />
    );
    
    const completedTodo = screen.getByText('Test Todo 2');
    expect(completedTodo).toHaveClass('completed');
  });
}); 