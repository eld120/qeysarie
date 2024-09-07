/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import MarketTrends from "@/app/components/MarketTrends";
import { getStocks } from "@/app/components/MarketTrends";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { it } from 'node:test';
import { StockCard } from '@/app/components/StockCard';
const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
export function useCustomHook() {
  return useQuery({
    queryKey: ['customHook'],
    queryFn: () => {
      [{
        company: 'Alphabet Inc.',
        ticker: 'GOOG',
        date: '2024-09-04',
        price: 157.81,
        percentage: -0.5,
        change: -0.8,
        volume: 17390400,
      }]
    }
  })
}

// describe('first test', () => {
//   it('renders a heading', async () => {
//     const queryClient = new QueryClient();
//     render(
//       <QueryClientProvider client={queryClient}>
//         <MarketTrends />
//       </QueryClientProvider>
//     );
//     await screen.findByText('Loading...');



//     const { result } = renderHook(() => useCustomHook(), { wrapper });

//     await waitFor(() => {
//       expect(result.current.isSuccess).toBe(true)

//     });
//     const heading = await screen.findByText('Market trends');
//     expect(heading).toBeInTheDocument();
//     // render(wrapper(<MarketTrends />))
//     //const useQueryMock = jest.spyOn(useQuery, 'customHook').mockImplementation();

//     // const heading = await screen.findByText('Market trends')
//     // // await waitFor(() => result.current.isSuccess)
//     // expect(heading).toBeInTheDocument()



//   })
// })

test('Tests StockCard component', () => {
  it('renders all expected attributes', async () => {
    const data = {
      company: 'Alphabet Inc.',
      ticker: 'GOOG',
      date: '2024-09-04',
      price: 157.81,
      percentage: -0.5,
      change: -0.8,
      volume: 17390400,
    }
    render(<StockCard {...data} />)


    const price = screen.getByText("$157.81")
    const percentage = screen.getByText("-0.5%")
    const ticker = screen.getByText("GOOG : Alphabet Inc.")

    expect(ticker).toBeInTheDocument()
    expect(percentage).toBeInTheDocument()
    expect(price).toBeInTheDocument()



  })
  it('renders the correct stock color', async () => {
    const data = {
      company: 'Alphabet Inc.',
      ticker: 'GOOG',
      date: '2024-09-04',
      price: 157.81,
      percentage: 0.5,
      change: 0.8,
      volume: 17390400,
    }
    render(<StockCard {...data} />)
    expect(screen.getByText("-0.5%").classList[2]).toEqual('text-red-500')
    expect(screen.getByText("0.5%").classList[2]).toEqual('text-green-500')

  })
})