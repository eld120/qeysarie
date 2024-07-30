import React from 'react'
import PropTypes from 'prop-types'

interface StockData {
    company: string
    ticker: string
    price: number
    percentage: number
    change: number
}

const StockCard: React.FC<StockData> = ({ company, ticker, price, percentage, change }) => {
    const stockColor = change >= 0 ? 'text-red-500' : 'text-green-500'


    return (
        <div className='bg-white rounded-lg shadow p-2 max-w-44 min-w-20'>
            <div className='flex'>
                <div className="flex flex-col">
                    <h3 className='text-sm font-medium'> {ticker} {/*: {company} */}</h3>
                    <p className="text-gray-500 text-sm">${price}</p>
                </div>
                <p className={`text-sm font-semibold ${stockColor}`}>{percentage}%</p>
            </div>

        </div>
    )
}




export default StockCard
