'use client'

import Header from "./components/Header";
import SearchInput from "./components/BasicSearchBar";
import NewSearchBar from "./components/NewSearchBar";
import MarketList from "./components/MarketsList";
import HeroSection from "./components/HeroSection";
import MarketTrends from "./components/MarketTrends";




export default function Home() {

  return (
    <>
      <Header />

      <MarketList />
      <NewSearchBar />
      <HeroSection />
      <MarketTrends />
    </>
  );
}
