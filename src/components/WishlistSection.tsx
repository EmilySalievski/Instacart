import WishlistItem from "./WishlistItem";
import type { WishlistItemData } from "../types";
import FilterDropdown from "./FilterTab";
import { useState } from "react";

function WishlistSection({items, onCreate}: {items?: WishlistItemData[], onCreate: () => void}){
    const [category, setCategory] = useState('All')

    let filteredItems;
    if (category === 'All'){
        filteredItems = items
    }
    else if (category === 'Waiting'){
        filteredItems = items?.filter(item => item.status === null)
    }
    else {
        filteredItems = items?.filter(item => item.status === category.toUpperCase())
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='text-main-brown'>
                    My Wishlist
                </h3>
                <FilterDropdown 
                    label='Category'
                    options={['All', 'Ready', 'Waiting', 'Bought', 'Resisted']}
                    value={category}
                    onChange={setCategory}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5'>
                {filteredItems?.map(item => (
                    <WishlistItem  key={item.id} item={item} onCreate={onCreate}/>
                ))}
            </div>
        </div>
    )
}

export default WishlistSection;