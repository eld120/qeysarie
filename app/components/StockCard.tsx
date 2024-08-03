import React from 'react'
import PropTypes from 'prop-types'

export interface StockData {
    company: string
    ticker: string
    price: number
    percentage: number
    change: number
    volume: number
}

export const StockCard: React.FC<StockData> = (stock: StockData) => {
    const stockColor = stock.change >= 0 ? 'text-green-500' : 'text-red-500'


    return (
        <div className='bg-white rounded-lg shadow p-2 max-w-44 min-w-20'>
            <div className='flex'>
                <div className="flex flex-col">
                    <h3 className='text-sm font-medium'> {stock.ticker} {/*: {company} */}</h3>
                    <p className="text-gray-500 text-sm">${stock.price}</p>
                </div>
                <p className={`text-sm font-semibold ${stockColor}`}>{stock.percentage}%</p>
            </div>

        </div>
    )
}





