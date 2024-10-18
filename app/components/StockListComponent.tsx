import React from 'react'
import Link from 'next/link'
import { StockData } from './StockCard'
import randomColor from 'randomcolor';
const greenBG = "#e6f4ea"
const greenText = "#137333"
const redText = "#a50e0e"
const redBG = "#fce8e6"

function StockListComponent(props: StockData) {
  const color = randomColor({ luminosity: 'dark' });
  const bgColor = props.price < 0 ? redBG : greenBG
  const txtColor = props.price < 0 ? redText : greenText
  return (
    <li className={'border-t-2 border-slate-100'} key={props.ticker}>

      <Link href={`/quote/${encodeURIComponent(props.ticker)}`} className='flex items-center justify-between p-3'>
        <div>
          <div className="text-white w-12 h-6 text-xs rounded text-center font-medium py-1" style={{ backgroundColor: color }}>{props.ticker}</div>
          <div className='font-light text-sm'>{props.company}</div>
        </div>
        <div className='flex gap-2'>
          <div className='font-medium'>${props.price}</div>
          <div className='font-medium w-12 h-8 rounded text-center py-1' style={{ backgroundColor: bgColor, color: txtColor }}>${props.change}</div>
          <div className='font-medium w-12 h-8 rounded text-center py-1' style={{ backgroundColor: bgColor, color: txtColor }}>{props.percentage}%</div>
        </div>
      </Link>
    </li >
  )
}

export default StockListComponent