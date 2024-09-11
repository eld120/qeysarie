import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StockData } from './StockCard';
import StockListComponent from './StockListComponent';


// const queryFunction = async () => {
//     const response = await fetch('/stock_data.json')
//     if (!response.ok) {
//         throw new Error('WOMP WAGON')
//     }
//     return response.json()
// }

function MarketTrends(props: StockData[]) {
    // const [trend, setTrend] = useState(['mostActive'])
    const [activeTrend, setActiveTrend] = useState<'mostActive' | 'gainers' | 'losers' | 'trending'>('mostActive');


    // const { isLoading, error, data } = useQuery<StockData[], Error>({
    //     queryKey: ['allStocks'],
    //     queryFn: queryFunction
    // })

    const sortedStocks = props.data.sort((a: StockData, b: StockData) => {
        if (activeTrend === 'mostActive') {
            return b.volume - a.volume
        } else if (activeTrend === 'gainers') {
            return b.percentage - a.percentage
        } else if (activeTrend === 'losers') {
            return a.percentage - b.percentage
        }
    }).slice(0, 11)
    const displayStocks = sortedStocks || []

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    // if (error) {
    //     console.error(error.message)
    // }
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
                        <StockListComponent key={stock.ticker}  {...stock} />)
                    )}
                </ul>
            </div>

        </div>
    )
}

export default MarketTrends