import React from 'react'
import PropTypes from 'prop-types'

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


    return (
        <div className='bg-white rounded-lg shadow p-2 w-44 h-24'>
            <div className='flex'>
                <div className="flex flex-col">
                    <h3 className='text-sm font-medium'>{priceData.ticker} : {priceData.company}</h3>
                    <p className="text-gray-500 text-sm">${priceData.price}</p>
                </div>
                <p className={`text-sm font-semibold ${stockColor}`}>{priceData.percentage}%</p>
            </div>

        </div>
    )
}





