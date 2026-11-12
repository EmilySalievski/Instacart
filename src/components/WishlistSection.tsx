import WishlistItem from "./WishlistItem";
import type { components } from "../api/schema";
import { useEffect, useState } from "react";

type WishlistItemData = components["schemas"]["WishlistItem"][];

function WishlistSection(){
    const [items, setItems] = useState<WishlistItemData>([]);

    useEffect(() => {
        async function getWishlist() {
            const response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk0NDY1Mzk5LCJpYXQiOjE3OTQ0NjUwOTksImp0aSI6IjkyYzkyOTJlNzlkZDQyZjhiZjZhZmRjN2E5M2Q5MjYwIiwidXNlcl9pZCI6IjEifQ.e-ssZTMKC8rV_Rh2_S0MImnuOccx_XVDhj8oud8J1uE",
                    "Content-Type": "application/json"
                }
            });
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