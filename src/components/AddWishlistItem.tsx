import { useState } from 'react';
import {CloseOutlined} from '@ant-design/icons';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function AddWishlistItem({className='', onClose}: {onClose: () => void, className?: string}) {
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('AUD')
    const [daysToWait, setDaysToWait] = useState('7')
    const [imageFile, setImageFile] = useState<File | null>(null)

    async function createItem(){
        // TODO: change before deploying
        const token = localStorage.getItem('access')

        const form = new FormData()
        form.append('name', name)
        form.append('brand', brand)
        form.append('price', price)
        form.append('desc', desc)
        form.append('url', url)
        form.append('days_to_wait', daysToWait)
        form.append('currency', currency)
        if (imageFile) form.append('image', imageFile)
            
        const response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: form
        });

        const data = await response.json()

         if (response.ok) {
            onClose()
        } else {
            console.log(data)
        }
    }

    return (
        <div className={`${className} fixed top-1/2 left-1/2 flex flex-col gap-4 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-3xl bg-white shadow-xl px-6 py-6 z-50`}>
            <h2 className='pb-6'>
                Add to Wishlist
            </h2>

            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-main-brown hover:text-dark-pink transition-colors"
            >
                <CloseOutlined />
            </button>

            <div>
                <div className='flex items-center gap-2 pb-2'>
                    <label htmlFor="url" className='text-black'>
                        Product URL
                    </label>
                    <p className='text-xs'>
                        (optional)
                    </p>
                </div>
                <input 
                    type="text"
                    placeholder="Paste a product link"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                />
            </div>

            <div>
                <label htmlFor="image" className='text-black'>
                    Image
                </label>
                <Upload.Dragger
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => { setImageFile(file); return false; }}  // false = don't auto-upload
                    onRemove={() => setImageFile(null)}
                >
                    <InboxOutlined />
                    <p>Click or drag an image here</p>
                </Upload.Dragger>
            </div>

            <div>
                <div className='flex items-center gap-2 pb-2'>
                    <label htmlFor="name" className='text-black'>
                        Name
                    </label>
                    <p className='text-xs text-red-400'>
                        *
                    </p>
                </div>
                <input 
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                />
            </div>

            <div>
                <div className='flex items-center gap-2 pb-2'>
                    <label htmlFor="description" className='text-black'>
                        Description
                    </label>
                    <p className='text-xs'>
                        (optional)
                    </p>
                </div>
                <input 
                    type="text"
                    placeholder="Describe the item..."
                    value={desc}
                    onChange={(event) => setDesc(event.target.value)}
                    className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                />
            </div>

            <div>
                <div className='flex items-center gap-2 pb-2'>
                    <label htmlFor="brand" className='text-black'>
                        Brand
                    </label>
                    <p className='text-xs'>
                        (optional)
                    </p>
                </div>
                <input 
                    type="text"
                    placeholder="Brand of item..."
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                    className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                />
            </div>

            <div className='flex items-center'>
                <div>
                    <div className='flex items-center gap-2 pb-2'>
                        <label htmlFor="price" className='text-black'>
                            Price
                        </label>
                        <p className='text-xs text-red-400'>
                            *
                        </p>
                    </div>
                    <input 
                        type="text"
                        inputMode='decimal'
                        placeholder="00.00"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                    />
                </div>
                <div>
                    <div className='flex items-center gap-2 pb-2'>
                        <label htmlFor="Currency" className='text-black'>
                            Currency
                        </label>
                        <p className='text-xs text-red-400'>
                            *
                        </p>
                    </div>
                    <input 
                        type="text"
                        placeholder="Paste a product link"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                    />
                </div>
            </div>

            <div>
                <div className='flex items-center gap-2 pb-2'>
                    <label htmlFor="days" className='text-black'>
                        Days to wait
                    </label>
                    <p className='text-xs text-red-400'>
                        *
                    </p>
                </div>
                <input 
                    type="number"
                    placeholder="e.g"
                    value={daysToWait}
                    onChange={(event) => setDaysToWait(event.target.value)}
                    className="rounded-2xl border-light-pink border-2 focus:outline-none focus:border-dark-pink w-full text-sm py-2 px-3 border-2 placeholder:text-main-brown"
                />
            </div>

            <button 
                onClick={createItem}
                className="relative w-full bg-dark-pink overflow-hidden rounded-2xl px-5 py-2.5 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
                    Create
            </button>

        </div>
    )
}

export default AddWishlistItem;