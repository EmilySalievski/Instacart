import WishlistItem from "./WishlistItem";
import type { WishlistItemData } from "../types";

function WishlistSection({items, onCreate}: {items?: WishlistItemData[], onCreate: () => void}){

    return (
        <div className='px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {items?.map(item => (
                <WishlistItem  key={item.id} item={item} onCreate={onCreate}/>
            ))}
        </div>
    )
}

export default WishlistSection;