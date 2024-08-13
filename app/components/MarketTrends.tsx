import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StockData } from './StockCard';
import { StockCard } from './StockCard';
const queryFunction = async () => {
    const response = await fetch('/stock_data.json')
    if (!response.ok) {
        throw new Error('WOMP WAGON')
    }
    return response.json()
}

function MarketTrends() {
    // const [trend, setTrend] = useState(['mostActive'])
    const [activeTrend, setActiveTrend] = useState<'mostActive' | 'gainers' | 'losers' | 'trending'>('mostActive');


    const { isLoading, error, data } = useQuery<StockData[], Error>({
        queryKey: ['allStocks', activeTrend],
        queryFn: queryFunction


    })

    const sortedStocks = data?.sort((a: StockData, b: StockData) => {
        if (activeTrend === 'mostActive') {
            return b.volume - a.volume
        } else if (activeTrend === 'gainers') {
            return b.percentage - a.percentage
        } else if (activeTrend === 'losers') {
            return a.percentage - b.percentage
        }
    }).slice(0, 11)
    const displayStocks = sortedStocks || []
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.error(error.message)
    }
    return (
        <div>
            <h4>Market trends</h4>
            <div className="flex gap-4">
                <button onClick={() => {
                    setActiveTrend('mostActive')
                }}>Most active</button>
                <button onClick={() => {
                    setActiveTrend('gainers')
                }}>Gainers</button>
                <button onClick={() => {
                    setActiveTrend('losers')
                }}>Losers</button>
                <button onClick={() => {
                    setActiveTrend('trending')
                }}>Trending</button>
            </div>
            <div>
                <ul>
                    {displayStocks?.map(stock => (
                        <li><StockCard key={stock.ticker}  {...stock} /></li>)
                    )}
                </ul>
            </div>

        </div>
    )
}

export default MarketTrends