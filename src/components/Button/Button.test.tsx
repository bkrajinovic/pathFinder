import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('shared-button color-primary size-medium');
  });

  it('renders with custom size and color', () => {
    render(<Button size="large" color="secondary">Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('shared-button color-secondary size-large');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays tooltip text', () => {
    render(<Button tooltipText="Tooltip text">Hover me</Button>);
    const buttonElement = screen.getByText(/hover me/i);
    expect(buttonElement).toHaveAttribute('title', 'Tooltip text');
  });

  it('renders children correctly', () => {
    render(<Button><span>Child element</span></Button>);
    const childElement = screen.getByText(/child element/i);
    expect(childElement).toBeInTheDocument();
  });
});