import WishlistItem from "./WishlistItem";
import type { components } from "../api/schema";
import { useEffect, useState } from "react";

type WishlistItemData = components["schemas"]["WishlistItem"][];

function WishlistSection(){
    const [items, setItems] = useState<WishlistItemData>([]);

    useEffect(() => {
        async function getWishlist() {
            const response = await fetch("http://127.0.0.1:8000/api/wishlist/");
            const data = await response.json();
            setItems(data)
        }

        getWishlist();
    }, []);

    return (
        <div className='px-10'>
            {items.map(item => (
                <WishlistItem id={item.id} item={item}/>
            ))}
        </div>
    )
}

export default WishlistSection;