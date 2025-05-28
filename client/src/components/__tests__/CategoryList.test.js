import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryList from '../CategoryList';

describe('CategoryList Bileşeni', () => {
  const mockCategories = [
    { _id: '1', name: 'İş', color: '#ff0000' },
    { _id: '2', name: 'Kişisel', color: '#00ff00' }
  ];

  const mockOnSelectCategory = jest.fn();

  beforeEach(() => {
    mockOnSelectCategory.mockClear();
  });

  test('kategori listesi doğru şekilde render ediliyor', () => {
    render(
      <CategoryList
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={mockOnSelectCategory}
      />
    );
    
    expect(screen.getByText('Kategoriler')).toBeInTheDocument();
    expect(screen.getByText('Tümü')).toBeInTheDocument();
    expect(screen.getByText('İş')).toBeInTheDocument();
    expect(screen.getByText('Kişisel')).toBeInTheDocument();
  });

  test('kategori seçilebiliyor', () => {
    render(
      <CategoryList
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={mockOnSelectCategory}
      />
    );
    
    const categoryItem = screen.getByText('İş');
    fireEvent.click(categoryItem);
    
    expect(mockOnSelectCategory).toHaveBeenCalledWith('1');
  });

  test('tümü seçeneği çalışıyor', () => {
    render(
      <CategoryList
        categories={mockCategories}
        selectedCategory="1"
        onSelectCategory={mockOnSelectCategory}
      />
    );
    
    const allOption = screen.getByText('Tümü');
    fireEvent.click(allOption);
    
    expect(mockOnSelectCategory).toHaveBeenCalledWith(null);
  });

  test('seçili kategori vurgulanıyor', () => {
    render(
      <CategoryList
        categories={mockCategories}
        selectedCategory="1"
        onSelectCategory={mockOnSelectCategory}
      />
    );
    
    const selectedCategory = screen.getByText('İş');
    expect(selectedCategory).toHaveClass('category-item');
    expect(selectedCategory).toHaveClass('active');
  });
}); 