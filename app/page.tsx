'use client'

import Header from "./components/Header";
//import MyComponent from "./components/Model_a";
import MyComponent from './components/Model_b';
import ParentComponent from "./components/Model_b_parent";
import MarketList from "./components/MarketsList";
export default function Home() {

  return (
    <>
      <Header />

      <MarketList />

    </>
  );
}
