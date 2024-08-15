import React from 'react'
import Link from 'next/link'
import { StockData } from './StockCard'


function StockListComponent(props: StockData) {

  return (
    <li className={'border-t-2 flex gap-10 px-10'} key={props.ticker}>
      {/* <Link href={`/quote/${encodeURIComponent(props.ticker)}`}> */}

      <div className=''>{props.ticker}</div>
      <div className=''>{props.company}</div>
      <div className=''>${props.price}</div>
      <div className=''>${props.change}</div>
      <div className=''>{props.percentage}</div>
      {/* </Link> */}
    </li >
  )
}

export default StockListComponent