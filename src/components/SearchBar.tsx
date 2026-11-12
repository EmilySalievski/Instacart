import { SearchOutlined } from '@ant-design/icons';

function SearchBar({className=''}){
    return (
        <div className={`bg-light-pink rounded-2xl min-w-0 max-w-3xs w-full text-sm flex flew-row gap-2 hover:border-hover-text ${className}`}>
            <SearchOutlined className='pl-2'/>
            <input
                type="text"
                placeholder="Search Friends or Products..."
                className="bg-transparent outline-none border-none bg-light-pink rounded-2xl min-w-0 max-w-60 w-full text-sm py-1 border-medium text-color-"
            />
        </div>
    )
}

export default SearchBar;