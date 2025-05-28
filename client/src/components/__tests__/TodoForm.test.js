import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TodoForm from '../TodoForm';

describe('TodoForm Bileşeni', () => {
  const mockCategories = [
    { _id: '1', name: 'Test Kategori 1', color: '#FF0000' },
    { _id: '2', name: 'Test Kategori 2', color: '#00FF00' }
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

  test('boş todo eklenemiyor', async () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const submitButton = screen.getByText('Ekle');
    fireEvent.click(submitButton);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('todo ve kategori seçilerek eklenebiliyor', async () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Yeni todo ekle...');
    const select = screen.getByRole('combobox');
    const submitButton = screen.getByText('Ekle');
    
    await userEvent.type(input, 'Test Todo');
    await userEvent.selectOptions(select, '1');
    fireEvent.click(submitButton);
    
    expect(mockOnAddTodo).toHaveBeenCalledWith({
      text: 'Test Todo',
      categoryId: '1'
    });
  });

  test('form temizleniyor', () => {
    render(<TodoForm categories={mockCategories} onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Yeni todo ekle...');
    const select = screen.getByRole('combobox');
    const submitButton = screen.getByText('Ekle');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.change(select, { target: { value: '1' } });
    fireEvent.click(submitButton);
    
    expect(input.value).toBe('');
    expect(select.value).toBe('');
  });
}); 