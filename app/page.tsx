'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => { setIsOpen(!isOpen) }
  return (
    <>
      <header>
        <nav className="h-12 flex items-center">

          <button onClick={handleClick}
            className="flex flex-col justify-center items-center w-9 h-9 hover:bg-slate-200 rounded-2xl" aria-expanded="false" aria-label="Main menu" role="button" tabIndex="0">
            <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} >
            </span>
            <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} >
            </span>
            <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} >
            </span>

          </button>


          <h1 className="text-2xl font-bold hover:text-green-700">Qeysarie</h1>
        </nav>
      </header >
    </>
  );
}
