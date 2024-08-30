'use client'
import { useEffect, useState } from "react"
import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query"
import { StockData, StockCard } from "./StockCard"
import { StockPriceData } from "./New/StockPriceCard"
interface SearchInputProps {
    stockArray?: StockPriceData[]
}
interface Stock {
    name: string
    slug: string
    ticker: string
}
interface IntermediateStockData {
    date: string
    price: string
    stock: Stock
    volume: number
}
function transformStockPriceData(stockArray: IntermediateStockData[]) {
    const newStockMap: any = {}
    const finalArray: StockData[] = []
    stockArray.forEach((obj: IntermediateStockData) => {
        if (!newStockMap[obj.stock.ticker]) {
            newStockMap[obj.stock.ticker] = {}
        }

        newStockMap[obj.stock.ticker][obj.date] = {
            company: obj.stock.name,
            price: obj.price,
            volume: obj.volume

        }

        if (Object.keys(newStockMap[obj.stock.ticker]).length > 1) {
            const [firstDate, secondDate] = Object.keys(newStockMap[obj.stock.ticker])
            if (new Date(firstDate) > new Date(secondDate)) {
                const dollarDiff = parseFloat(newStockMap[obj.stock.ticker][firstDate].price) - parseFloat(newStockMap[obj.stock.ticker][secondDate].price)
                const percentageDiff = dollarDiff / newStockMap[obj.stock.ticker][secondDate].price
                newStockMap[obj.stock.ticker][obj.date] = {
                    company: obj.stock.name,
                    price: obj.price,
                    volume: obj.volume,
                    percentage: (percentageDiff * 100).toFixed(2),
                    change: dollarDiff
                }

                finalArray.push({
                    company: obj.stock.name,
                    price: obj.price,
                    date: obj.date,
                    volume: obj.volume,
                    percentage: (percentageDiff * 100).toFixed(2),
                    change: dollarDiff
                })
            } else {
                const dollarDiff = parseFloat(newStockMap[obj.stock.ticker][secondDate].price) - parseFloat(newStockMap[obj.stock.ticker][firstDate].price)
                const percentageDiff = dollarDiff / newStockMap[obj.stock.ticker][firstDate].price
                newStockMap[obj.stock.ticker][obj.date] = {
                    company: obj.stock.name,
                    ticker: obj.stock.ticker,
                    price: parseFloat(obj.price),
                    percentage: (percentageDiff * 100).toFixed(2),
                    change: dollarDiff,
                    volume: obj.volume
                }

                finalArray.push({
                    company: obj.stock.name,
                    ticker: obj.stock.ticker,
                    price: parseFloat(obj.price),
                    percentage: (percentageDiff * 100).toFixed(2),
                    change: dollarDiff,
                    volume: obj.volume
                })

            }


        }
    })
    return finalArray

}
async function getStocks(query: string): Promise<StockPriceData[]> {
    const response = await fetch(`http://localhost:8000/api/v1.0/stock-prices/?name=${query}&ticker=${query}`, {
        cache: 'default',
    })
    const data = await response.json()


    return transformStockPriceData(data.results).filter((obj: StockData) => {
        const normalizedInput = query.toLowerCase()

        return obj?.ticker.toLowerCase().includes(normalizedInput) || obj?.company.toLowerCase().includes(normalizedInput)

    })

}

export default function NewSearchBar() {
    const [query, setQuery] = useState('')
    const [debounceQuery, setDebounceQuery] = useState('')

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setDebounceQuery(query)
        }, 250)
        return () => clearTimeout(timeOut)
    }, [query])

    const { isLoading, error, data } = useQuery({ queryKey: ['stockArray', debounceQuery], queryFn: () => getStocks(debounceQuery), placeholderData: ['Loading'] })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO start in a loading state
        setQuery(event.target.value)
    }

    return (
        <>
            <input type="text" placeholder="Search by ticker or name" value={query} onChange={handleInputChange} className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {query}
            {!debounceQuery ? (<div></div>) : (
                <div className="container mx-auto mt-3 flex flex-wrap gap-3">

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : data?.length > 0 ? (
                        data?.map((stock) => (
                            <div key={stock.ticker}>
                                <StockCard {...stock} />

                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div >)}
        </>
    )
}