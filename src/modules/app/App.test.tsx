import React from 'react';

import { render, screen } from '@testing-library/react';
import App from './App';
import data from 'api/data.json';

const mock = {
  data: { categories: [], tasksByCategory: {} },
  setData: jest.fn(() => ({})),
  isLoading: false,
  isSuccess: true
};

jest.mock('../progress/hooks/useGetDataQuery', () => ({
  useGetDataQuery: () => {
    return mock;
  }
}));

describe('App', () => {
  it('renders loading ', () => {
    ``;
    mock.isLoading = true;
    render(<App />);
    const h1 = screen.getByText(/Loading/i);
    expect(h1).toBeInTheDocument();
  });

  it('renders app with h1 ', () => {
    mock.isLoading = false;
    render(<App />);
    const h1 = screen.getByText(/My startup progress/i);
    expect(h1).toBeInTheDocument();
  });
});
