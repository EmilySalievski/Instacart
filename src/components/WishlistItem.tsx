import blank from '../assets/blank.png'
import Pricetag from '../assets/Pricetag.png'
import StatusTag from './StatusTag'
import type { components } from "../api/schema";

type WishlistItemData= components["schemas"]["WishlistItem"];

function WishlistItem({item, id}: {item: WishlistItemData, id: number}) {
    return (
        <div className='w-1/3 h-96 rounded-2xl bg-white border-2 border-main-brown overflow-hidden'>
            <div className='h-1/2 relative'>
                <img src={item.image ? item.image : blank} className='w-full h-full object-cover'/>
                <StatusTag className='absolute top-3 right-3' stat={item.status} />
            </div>

            <div className='px-2 py-2'>
                <h2>
                    {item.name}
                </h2>
                <p>
                    {item.desc}
                </p>
                <div className='flex items-center gap-2'>
                    <img src={Pricetag}/>
                    ${item.price}
                </div>
            </div>
        </div>
    )
}

export default WishlistItem;