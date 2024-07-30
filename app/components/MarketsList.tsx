'use client'
import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';

function MarketList() {
    const [topMovers, setTopMovers] = useState<StockData[]>([])
    useEffect(() => {
        const fetchTopMovers = async () => {
            try {
                const response = await fetch('/stock_data.json')
                const data = await response.json()

                setTopMovers(data.slice(0, 5))
            } catch (error) {
                console.error('Womp failed to fetch top movers', error)
            }
        }
        fetchTopMovers();
    }, [])
    return (
        <div className='container mx-auto mt-2'>
            <div className='flex gap-4 justify-center'>{topMovers.map((stock, index) =>
                (<StockCard key={index} {...stock} />)
            )}</div>


        </div>
    )
}


export default MarketList