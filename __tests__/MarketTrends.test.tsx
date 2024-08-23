/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import MarketTrends from "@/app/components/MarketTrends";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)


describe('first test', () => {
  it('renders a heading', () => {

    jest.mock('queryFunction', () => { })

    render(wrapper(<MarketTrends />))

    const heading = screen.getByText('Market trends')

    expect(heading).toBeInTheDocument()
  })
})