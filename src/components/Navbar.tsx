import dih from '../assets/dih.png'
import SearchBar from './SearchBar';

function Navbar() {
    return (
        <div className='flex flex-col gap-0'>
            <div className='flex h-20 gap-4 pt-14 pb-10 px-10 items-center bg-main-brown'>
                <img  src={dih} className='w-10 h-10 rounded-xl'/>
                <h1 className='text-xl m-0 text-cream'>Instacart</h1>

                <div className="flex-1 min-w-0 flex justify-center">
                    <SearchBar className="w-full" />
                </div>
                
                <button type="button" className="ml-auto rounded-xl bg-transparent px-4 py-2.5 text-2xl font-judson italic text-cream hover:text-hover-text hover:scale-125 duration-500">
                    My List
                </button>
                <button type="button" className="rounded-xl bg-transparent px-4 py-2.5 text-2xl font-semibold font-judson italic text-cream hover:text-hover-text hover:scale-125 duration-500">
                    Explore
                </button>
                <button type="button" className="rounded-xl bg-transparent px-4 py-2.5 text-2xl font-semibold font-judson italic text-cream hover:text-hover-text hover:scale-125 duration-500">
                    Profile
                </button>
            </div>
            <div className='polka-dot-bar'/>
        </div>
    )
}

export default Navbar;