import WishlistItem from "./WishlistItem";
import type { components } from "../api/schema";
import { useEffect, useState } from "react";

type WishlistItemData = components["schemas"]["WishlistItem"][];

function WishlistSection({items}: {items?: WishlistItemData}){

    return (
        <div className='px-10 flex flex-row gap-6'>
            {items?.map(item => (
                <WishlistItem id={item.id} item={item}/>
            ))}
        </div>
    )
}

export default WishlistSection;