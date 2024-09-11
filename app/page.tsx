
'use client'
import { GetServerSideProps } from "next";
import { useQuery } from '@tanstack/react-query';
import Header from "./components/Header";

import NewSearchBar from "./components/NewSearchBar";
import MarketList from "./components/MarketsList";
import HeroSection from "./components/HeroSection";
import MarketTrends from "./components/MarketTrends";
import { StockData } from "./components/StockCard";

async function getTodaysStockPrices(): Promise<StockData[]> {
  const response = await fetch(`http://localhost:8088/api/v1.0/stock-prices/get_today/`, {
    cache: 'default',
  })
  const data = await response.json()


  return data

}


export default function Home() {


  const { isLoading, error, data } = useQuery<StockData[], Error>({
    queryKey: ['todayStocks'],
    queryFn: getTodaysStockPrices
  })


  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <>
      <Header />

      <MarketList />
      <NewSearchBar />
      <HeroSection data={data.results} />
      <MarketTrends />
    </>
  );
}
