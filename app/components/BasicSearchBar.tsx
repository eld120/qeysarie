'use client'
import { useState, Fragment, ChangeEvent } from "react"
import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query"
import { StockCard, StockData } from "./StockCard"

interface SearchInputProps {
    stockArray?: StockData[]
}


export default function SearchInput() {
    const [query, setQuery] = useState('')
    let otherBouncer: NodeJS.Timeout | undefined
    const queryClient = useQueryClient()
    const [filteredData, setFilteredData] = useState([])
    async function getCompanyOrTicker(context: QueryFunctionContext): Promise<StockData[]> {
        function filteredStocks() {
            return data?.filter((stock: StockData) => {
                const normalizedInput = query.toLowerCase()

                return stock?.ticker?.toLowerCase().includes(normalizedInput) || stock?.company?.toLowerCase().includes(normalizedInput)
            })
        }
        clearTimeout(otherBouncer)
        otherBouncer = setTimeout(() => setFilteredData(filteredStocks()), 100)
        const response = await fetch('/stock_data.json', { cache: 'default', signal: context.signal })
        const data = await response.json()
        console.log('WHAT IS HAPPENING???!?!?!?')
        return data
    }


    const { isLoading, error, data } = useQuery({ queryKey: ['stockArray', query], queryFn: getCompanyOrTicker, placeholderData: ['Loading'] })


    let deBOUNCER: NodeJS.Timeout | undefined = undefined
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO start in a loading state
        setQuery(event.target.value)
        // clearTimeout(deBOUNCER)
        // deBOUNCER = setTimeout(() => {
        //     setQuery(event.target.value)
        //     deBOUNCER = undefined
        // }, 100)
    }


    return (
        <>
            <input type="text" placeholder="Search by ticker or name" value={query} onChange={handleInputChange} className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="container mx-auto mt-3 flex flex-wrap gap-3">

                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredData?.length > 0 ? (
                    filteredData?.map((stock) => (
                        <div key={stock.ticker}>
                            <StockCard {...stock} />
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div >
        </>
    )
}