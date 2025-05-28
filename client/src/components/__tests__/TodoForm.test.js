import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from '../TodoForm';

describe('TodoForm Bileşeni', () => {
  const mockCategories = [
    { _id: '1', name: 'İş', color: '#ff0000' },
    { _id: '2', name: 'Kişisel', color: '#00ff00' }
  ];

  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('form doğru şekilde render ediliyor', () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    expect(screen.getByPlaceholderText('Yeni todo ekle...')).toBeInTheDocument();
    expect(screen.getByText('Kategori Seçin')).toBeInTheDocument();
    expect(screen.getByText('Ekle')).toBeInTheDocument();
  });

  test('boş todo eklenemiyor', () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const addButton = screen.getByText('Ekle');
    fireEvent.click(addButton);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('todo ve kategori seçilerek eklenebiliyor', () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Yeni todo ekle...');
    const select = screen.getByRole('combobox');
    const addButton = screen.getByText('Ekle');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.change(select, { target: { value: '1' } });
    fireEvent.click(addButton);
    
    expect(mockOnAddTodo).toHaveBeenCalledWith({
      text: 'Test Todo',
      categoryId: '1'
    });
  });

  test('form temizleniyor', () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Yeni todo ekle...');
    const select = screen.getByRole('combobox');
    const addButton = screen.getByText('Ekle');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.change(select, { target: { value: '1' } });
    fireEvent.click(addButton);
    
    expect(input.value).toBe('');
    expect(select.value).toBe('');
  });
}); 