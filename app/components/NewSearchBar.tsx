'use client'
import { useEffect, useState } from "react"
import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query"
import { StockData, StockCard } from "./StockCard"

interface SearchInputProps {
    stockArray?: StockData[]
}




export async function getStocks(query: string): Promise<StockData[]> {
    const response = await fetch(`http://localhost:8088/api/v1.0/stock-prices/get_market_trends/?name=${query}&ticker=${query}`, {
        cache: 'default',
    })
    const data = await response.json()


    return data.results.filter((obj: StockData) => {
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

    const { isLoading, error, data } = useQuery({ queryKey: ['stockArray', debounceQuery], queryFn: () => getStocks(debounceQuery) })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO start in a loading state
        setQuery(event.target.value)
    }

    return (
        <div className="flex flex-col justify-center my-10">
            <div className="flex justify-center"><input type="text" placeholder="Search by ticker or name" value={query} onChange={handleInputChange} className="w-96 rounded-3xl border border-gray-300 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto" /></div>

            {!debounceQuery ? (<div></div>) : (
                <div className="container mx-auto mt-3 flex flex-wrap gap-3 justify-between">

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
        </div>
    )
}