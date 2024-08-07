'use client'

import Header from "./components/Header";
import SearchInput from "./components/BasicSearchBar";
import NewSearchBar from "./components/NewSearchBar";
import MarketList from "./components/MarketsList";
import HeroSection from "./components/HeroSection";




export default function Home() {

  return (
    <>
      <Header />

      <MarketList />
      <NewSearchBar />
      <HeroSection />
    </>
  );
}
