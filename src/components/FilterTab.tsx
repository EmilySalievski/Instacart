import { useState, useRef, useEffect } from 'react';

type FilterDropdownProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function FilterDropdown({
  label = 'Category',
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className='relative inline-block'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className={`flex items-center border-2 border-main-brown bg-white overflow-hidden ${
            open ? 'rounded-t-[1.25rem] rounded-b-none' : 'rounded-full'
        }`}
      >
        <span className='flex items-center justify-center px-2 py-1.5 border-r border-main-brown'>
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 9l6 6 6-6' />
          </svg>
        </span>
        <span className={`px-4 py-1.5 min-w-32 text-left ${value ? 'text-black' : 'text-gray-500'}`}>
          {value || label}
        </span>
      </button>

      {open && (
        <ul className='absolute left-0 top-full w-full bg-white rounded-b-[1.25rem] shadow-[0_8px_12px_-4px_rgba(0,0,0,0.15)] z-10 overflow-hidden'>
            {options.map((opt) => (
            <li
                key={opt}
                onClick={() => {
                onChange(opt);
                setOpen(false);
                }}
                className='px-4 py-2 cursor-pointer hover:bg-light-pink'
            >
                {opt}
            </li>
            ))}
        </ul>
        )}
    </div>
  );
}