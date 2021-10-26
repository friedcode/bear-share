import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
jest.mock("./api/api")

test('renders album view', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Select User:")).toBeInTheDocument()
  })
  
});

test('select album shows different view', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Select User:")).toBeInTheDocument()
  })

  userEvent.click(screen.getByTestId('list-item-1'))

  await waitFor(() => {
    expect(screen.getByRole('button', {name: /Back/i})).toBeInTheDocument()
  })
  
});
