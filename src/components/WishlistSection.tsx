import WishlistItem from "./WishlistItem";
import type { components } from "../api/schema";
import { useEffect, useState } from "react";

type WishlistItemData = components["schemas"]["WishlistItem"][];

function WishlistSection(){
    const [items, setItems] = useState<WishlistItemData>([]);

    // TODO: change before deploying
    const token = localStorage.getItem('access')

    useEffect(() => {
        async function getWishlist() {
            if (!token) return;
            const response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setItems(data)
        }

        getWishlist();
    }, [token]);

    return (
        <div className='px-10'>
            {items.map(item => (
                <WishlistItem id={item.id} item={item}/>
            ))}
        </div>
    )
}

export default WishlistSection;