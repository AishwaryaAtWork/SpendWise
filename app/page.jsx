'use client'
import { useEffect, useState } from "react";
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({name: '', price: ''});
  const [total, setTotal] = useState(0);

  //Add items to database
  const addItem = async (e) =>{
    e.preventDefault();
    
    if(newItem.name !== '' && newItem.price !== ''){
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({name: '', price: ''});
    }
  }

  //Read items from database
  useEffect(() =>{
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      let itemsArr = [];

      querySnapshot.forEach((doc) =>{
        itemsArr.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArr);

      //Read total from itemsArr
      const calcToatal = () =>{
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice);
      };

      calcToatal();
      return () => unsubscribe();
    });
  },[]);

  //Delete items from database
  const deleteItem = async (id) =>{
    await deleteDoc(doc(db, 'items', id));
  };


  return (
    <>    
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-black">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm ">

         <h1 className='text-center p-3 mb-5 text-5xl text-white'>SpendWise</h1>

         <div className="bg-slate-800 p-3 rounded-lg text-white">
            <form className="grid grid-cols-6 items-center text-black">
              
              <input className="col-span-3 p-2 border" type="text" 
                placeholder="Enter Item" value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})} />

              <input className="col-span-2 p-2 border mx-3" type="text" 
                placeholder="Enter $" value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
              
              <button className="text-white bg-slate-950 hover:bg-slate-900 p-2 text-xl cursor-pointer" 
                type="submit" onClick={addItem}>+</button>
            </form>

            <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-3 w-full flex justify-between bg-slate-950'>

                <div className='p-3 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>

                <button className='ml-8 p-3 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                  onClick={() => deleteItem(item.id)}
                >X</button>
              </li>
            ))}
          </ul>

          {items.length < 1 ? ('') : (
            <div className="p-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}

         </div>

      </div>
    </main>
    </>
  )
}
