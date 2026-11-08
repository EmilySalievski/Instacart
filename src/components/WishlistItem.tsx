import jacket from '../assets/Test/jacket.png'
import Pricetag from '../assets/Pricetag.png'
import StatusTag from './StatusTag'

function WishlistItem() {
    return (
        <div className='w-1/3 h-96 rounded-2xl bg-white border-2 border-main-brown overflow-hidden'>
            <div className='h-1/2 relative'>
                <img src={jacket} className='w-full h-full object-cover'/>
                <StatusTag className='absolute top-3 right-3'/>
            </div>

            <div className='px-2 py-2'>
                <h2>
                    Brand - Title goes here
                </h2>
                <p>
                    Description goes here
                </p>
                <div className='flex items-center gap-2'>
                    <img src={Pricetag}/>
                    $00.00
                </div>
            </div>
        </div>
    )
}

export default WishlistItem;