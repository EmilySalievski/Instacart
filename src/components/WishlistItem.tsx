import blank from '../assets/blank.png'
import Pricetag from '../assets/Pricetag.png'
import StatusTag from './StatusTag'
import type { WishlistItemData, WishlistItemStatus } from "../types";

function WishlistItem({item, onCreate}: {item: WishlistItemData, onCreate: () => void}) {

    const token = localStorage.getItem('access')

    async function updateStatus(newStatus: string){
        if (!token) return;
        const response = await fetch(`http://127.0.0.1:8000/api/wishlist/${item.id}/`, {
            method: "PATCH",
            body: JSON.stringify({
                status: newStatus
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            onCreate();
        }
    }
    return (
        <div className='h-96 rounded-2xl bg-white border-2 border-main-brown overflow-hidden'>
            <div className='h-1/2 relative'>
                <img src={item.image ? item.image : blank} className='w-full h-full object-cover'/>
                <StatusTag className='absolute top-3 right-3' stat={item.status} days={item.days_remaining}/>
            </div>

            <div className='px-2 py-2'>
                <h2>
                    {item.name}
                </h2>
                <div className='flex items-center gap-2'>
                    <img src={Pricetag}/>
                    ${item.price}
                </div>
                {item.status != "READY" && 
                    <>
                        <p>
                            {item.desc}
                        </p>
                    </>
                }
                {item.status === "READY" && 
                <>
                    <div className='flex gap-2 justify-center pt-2'>
                        <button 
                            className="relative w-full bg-transparent border-dark-green border-2 text-dark-green overflow-hidden rounded-2xl px-5 py-2.5 duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
                            onClick={() => updateStatus("BOUGHT")}
                        >
                            Buy
                        </button>
                        <button 
                            className="relative w-full bg-dark-green overflow-hidden rounded-2xl px-5 py-2.5 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
                            onClick={() => updateStatus("RESISTED")}
                        >
                            Resist
                        </button>
                    </div>
                    <div className='flex gap-1 justify-center pt-2'>
                        <p>
                        Still undecided? 
                        </p>
                        <button className='bg-transparent text-dark-blue font-semibold'>
                            Reset timer
                        </button>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default WishlistItem;