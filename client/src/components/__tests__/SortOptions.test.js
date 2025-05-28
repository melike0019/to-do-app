import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortOptions from '../SortOptions';

describe('SortOptions Bileşeni', () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  test('sıralama seçenekleri doğru şekilde render ediliyor', () => {
    render(<SortOptions sortBy="date" onSortChange={mockOnSortChange} />);
    
    expect(screen.getByText('Sıralama:')).toBeInTheDocument();
    expect(screen.getByText('Tarihe Göre')).toBeInTheDocument();
    expect(screen.getByText('Kategoriye Göre')).toBeInTheDocument();
  });

  test('sıralama değiştirilebiliyor', () => {
    render(<SortOptions sortBy="date" onSortChange={mockOnSortChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'category' } });
    
    expect(mockOnSortChange).toHaveBeenCalledWith('category');
  });

  test('varsayılan sıralama seçeneği doğru', () => {
    render(<SortOptions sortBy="date" onSortChange={mockOnSortChange} />);
    
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('date');
  });
}); 