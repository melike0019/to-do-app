import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryForm from '../CategoryForm';

describe('CategoryForm Bileşeni', () => {
  const mockOnAddCategory = jest.fn();

  beforeEach(() => {
    mockOnAddCategory.mockClear();
  });

  test('form doğru şekilde render ediliyor', () => {
    render(<CategoryForm onAddCategory={mockOnAddCategory} />);
    
    expect(screen.getByPlaceholderText('Yeni kategori adı...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Kategori Ekle');
  });

  test('boş kategori eklenemiyor', () => {
    render(<CategoryForm onAddCategory={mockOnAddCategory} />);
    
    const addButton = screen.getByText('Kategori Ekle');
    fireEvent.click(addButton);
    
    expect(mockOnAddCategory).not.toHaveBeenCalled();
  });

  test('kategori ve renk seçilerek eklenebiliyor', () => {
    render(<CategoryForm onAddCategory={mockOnAddCategory} />);
    
    const input = screen.getByPlaceholderText('Yeni kategori adı...');
    const colorInput = screen.getByRole('button').previousSibling;
    const addButton = screen.getByText('Kategori Ekle');
    
    fireEvent.change(input, { target: { value: 'Test Kategori' } });
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    fireEvent.click(addButton);
    
    expect(mockOnAddCategory).toHaveBeenCalledWith({
      name: 'Test Kategori',
      color: '#ff0000'
    });
  });

  test('form temizleniyor', () => {
    render(<CategoryForm onAddCategory={mockOnAddCategory} />);
    
    const input = screen.getByPlaceholderText('Yeni kategori adı...');
    const colorInput = screen.getByRole('button').previousSibling;
    const addButton = screen.getByText('Kategori Ekle');
    
    fireEvent.change(input, { target: { value: 'Test Kategori' } });
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    fireEvent.click(addButton);
    
    expect(input.value).toBe('');
    expect(colorInput.value).toBe('#000000');
  });
}); 