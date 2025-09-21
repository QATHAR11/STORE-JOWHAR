import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  onItemClick: (item: DropdownItem) => void;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  title, 
  items, 
  onItemClick, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    onItemClick(item);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
      >
        <span>{title}</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="py-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  {item.description && (
                    <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;