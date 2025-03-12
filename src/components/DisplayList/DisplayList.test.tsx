import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import DisplayList from './index';

describe('DisplayList component', () => {
  it('renders the title when items are present', () => {
    render(<DisplayList title="Test Title" items={['Item 1', 'Item 2']} />);
    const titleElement = screen.getByText(/test title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('does not render the title when items are empty', () => {
    render(<DisplayList title="Test Title" items={[]} />);
    const titleElement = screen.queryByText(/test title/i);
    expect(titleElement).not.toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    render(<DisplayList title="Test Title" items={items} />);
    const itemElements = screen.getAllByText(/item/i);
    expect(itemElements).toHaveLength(items.length);
  });

  it('renders the correct item content', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    render(<DisplayList title="Test Title" items={items} />);
    items.forEach(item => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });
});