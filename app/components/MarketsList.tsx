'use client'
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { StockCard, StockData } from './StockCard';

function MarketList(props: StockData[]) {



    const topFive = props.data
    topFive.sort((a: StockData, b: StockData) => b.percentage - a.percentage)
    return (
        <div className='container mx-auto mt-2'>
            <div className='flex gap-4 justify-center'>{topFive.slice(0, 5).map((stock: [StockData], index: number) =>
                (<StockCard key={index} {...stock} />)
            )}</div>


        </div>
    )
}


export default MarketList