import { useState } from 'react'
import Navbar from './components/Navbar'
import WishlistSection from './components/WishlistSection'

function App() {
  return (
    <div className='bg-cream'>
      <Navbar/>
      <WishlistSection/>
    </div>
  )
}

export default App
