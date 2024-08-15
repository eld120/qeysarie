'use client'
import { useEffect, useState } from "react"
import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query"
import { StockCard, StockData } from "./StockCard"

interface SearchInputProps {
    stockArray?: StockData[]
}
async function getStocks(query: string): Promise<StockData[]> {
    const response = await fetch('/stock_data.json', { cache: 'default' })
    const data = await response.json()

    return data?.filter((stock: StockData) => {
        const normalizedInput = query.toLowerCase()

        return stock?.ticker?.toLowerCase().includes(normalizedInput) || stock?.company?.toLowerCase().includes(normalizedInput)
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