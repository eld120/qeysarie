'use client'


import { useState } from 'react'


export default function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClick = () => { setIsOpen(!isOpen) }

    return (
        <header>
            <nav className="h-16 flex gap-7 items-center px-8 py-2">

                <button onClick={handleClick}
                    className="flex flex-col justify-center items-center w-9 h-9  hover:bg-stone-100 rounded-2xl" aria-expanded="false" aria-label="Main menu" role="button" tabIndex={0}>
                    <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} >
                    </span>
                    <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} >
                    </span>
                    <span className={`bg-stone-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} >
                    </span>

                </button>


                <h1 className="text-2xl text-slate-800 font-medium cursor-pointer">Finance</h1>
            </nav>
            <hr />
            <div className='flex   px-8 py-3  justify-center align-middle'>
                <h6 className='font-normal p-1 text-slate-600'>Markets</h6>
                <ul className='flex  items-center justify-evenly'>
                    {/* probably should be dynamically generating this */}
                    {/* <li className='font-light text-sm text-center hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Bankruptcy & Defaults</li> */}
                    <li className='font-light text-sm text-center p-1 hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Employment</li>
                    <li className='font-light text-sm text-center p-1 hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Growth</li>
                    {/* <li className='font-light text-sm text-center hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Housing</li> */}
                    <li className='font-light text-sm text-center p-1 hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Inflation</li>
                    <li className='font-light text-sm text-center p-1 hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Interest Rates</li>
                    {/* <li className='font-light text-sm text-center hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Mortgages</li> */}
                    {/* <li className='font-light text-sm text-center hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Energy</li> */}
                    <li className='font-light text-sm text-center p-1 hover:rounded-md hover:border-transparent hover:border-solid hover:bg-stone-100'>Consumer Spending</li>

                </ul>
            </div>

        </header >
    )

}

