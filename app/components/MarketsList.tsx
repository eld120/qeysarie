'use client'
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { StockCard, StockData } from './StockCard';

function MarketList() {

    async function getTopMovers() {
        const response = await fetch('/stock_data.json')
        const data = await response.json()
        return data
    }
    const topMovers = useQuery({ queryKey: ['topMovers'], queryFn: getTopMovers, placeholderData: ['Loading'] })
    const topFive = [...topMovers.data]
    topFive.sort((a: StockData, b: StockData) => b.percentage - a.percentage).slice(0, 5)
    return (
        <div className='container mx-auto mt-2'>
            <div className='flex gap-4 justify-center'>{topFive.slice(0, 5).map((stock: [StockData], index: number) =>
                (<StockCard key={index} {...stock} />)
            )}</div>


        </div>
    )
}


export default MarketList