import WishlistItem from "./WishlistItem";
import type { WishlistItemData } from "../types";

function WishlistSection({items}: {items?: WishlistItemData[]}){

    return (
        <div className='px-10 flex flex-row gap-6'>
            {items?.map(item => (
                <WishlistItem id={item.id} item={item}/>
            ))}
        </div>
    )
}

export default WishlistSection;