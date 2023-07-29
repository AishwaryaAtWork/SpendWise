'use client'
import { useState } from "react";


export default function Home() {

  const [items, setItems] = useState([
    { name: 'Coffee', price: 4.95 },
    { name: 'Movie', price: 24.95 },
    { name: 'candy', price: 7.95 },
  ]);

  const [total, setTotal] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-black">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm ">

         <h1 className='text-center p-3 mb-5 text-5xl text-white'>SpendWise</h1>

         <div className="bg-slate-800 p-3 rounded-lg text-white">
            <form className="grid grid-cols-6 items-center text-black">
              
              <input className="col-span-3 p-2 border" type="text" placeholder="Enter Item"/>
              <input className="col-span-2 p-2 border mx-3" type="text" placeholder="Enter $"/>
              
              <button className="text-white bg-slate-950 hover:bg-slate-900 p-2 text-xl cursor-pointer" 
                type="submit">+</button>
            </form>

            <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-3 w-full flex justify-between bg-slate-950'
              >
                <div className='p-3 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button className='ml-8 p-3 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >X</button>
              </li>
            ))}
          </ul>

          {items.length < 1 ? ('') : (
            <div className="p-3 flex justify-between text-md font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}

         </div>

      </div>
    </main>
  )
}
