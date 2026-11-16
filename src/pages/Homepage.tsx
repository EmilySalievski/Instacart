
import Navbar from '../components/Navbar'
import AddWishlistItem from '../components/AddWishlistItem'
import WishlistSection from '../components/WishlistSection'
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import type { WishlistItemData } from "../types";
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false)

      // TODO: change before deploying
    const token = localStorage.getItem('access')
    
    const navigate = useNavigate()
    const [items, setItems] = useState<WishlistItemData[]>()

    async function getWishlist() {
        if (!token) return;
        const response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.status === 401){
          navigate('/login')
          return
        }
        setItems(data)
    }

    useEffect(() => {
        getWishlist();
    }, [token]);

  return (
    <div className='bg-cream min-h-screen'>
      <Navbar />
      <WishlistSection items={items} />

      <button
        onClick={() => setFormIsOpen(true)}
        className='hover:scale-110 hover:bg-dark-pink hover:shadow-lg duration-300 px-4 fixed bottom-20 right-20 w-auto h-20 bg-light-pink rounded-2xl text-darker-pink text-xl hover:text-white z-30'
      >
        <PlusCircleOutlined /> Add to Wishlist
      </button>

      <div //shaded background
        onClick={() => setFormIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          formIsOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <AddWishlistItem
        onClose={() => setFormIsOpen(false)}
        onCreate={() => getWishlist()}
        className={`top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${
          formIsOpen
            ? 'opacity-100 -translate-y-1/2 scale-100'
            : 'opacity-0 -translate-y-[45%] scale-95 pointer-events-none'
        }`}
      />
    </div>
  )
}

export default Homepage;