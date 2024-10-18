import React from 'react'
import PropTypes from 'prop-types'
import randomColor from 'randomcolor'

export interface StockData {
    company: string
    ticker: string
    date: string
    price: number
    percentage: number
    change: number
    volume: number
}

export const StockCard: React.FC<StockData> = (priceData: StockData) => {
    const stockColor = priceData.change >= 0 ? 'text-green-500' : 'text-red-500'
    const color = randomColor({ luminosity: 'dark' });

    return (
        <div className='bg-white rounded-lg shadow w-44 h-24'>
            <div className='flex'>
                <div className="flex flex-col">
                    <h3 className='text-xs font-medium '><div className='w-12 h-6 py-1 rounded text-white text-center' style={{ backgroundColor: color }}>{priceData.ticker}</div>  {priceData.company}</h3>
                    <p className="text-gray-500 text-sm">${priceData.price}</p>
                </div>
                <p className={`text-sm font-semibold self-center ${stockColor}`}>{priceData.percentage}%</p>
            </div>

        </div >
    )
}





