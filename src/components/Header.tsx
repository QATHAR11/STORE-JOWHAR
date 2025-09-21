import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag, User, Shield } from 'lucide-react';
import { navigationConfig } from '../data/mockData';
import DropdownMenu from './DropdownMenu';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: 'home' }
  ];

  const handleDropdownItemClick = (item: any, type: string) => {
    onNavigate('shop');
    console.log(`Selected ${type}:`, item);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex items-center space-x-3">
              <img 
                src="JWLOGO.jpeg" 
                alt="Jowhara Collection" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-serif font-bold text-black">
                  Jowhara Collection
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Beauty & Fragrance</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-600 ${
                  currentPage === item.href ? 'text-black border-b-2 border-black' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Dropdown Menus */}
            {navigationConfig.filter(nav => nav.active).map((navItem) => (
              <DropdownMenu
                key={navItem.id}
                title={navItem.name}
                items={navItem.items}
                onItemClick={(item) => handleDropdownItemClick(item, navItem.type)}
              />
            ))}
            
            <button onClick={() => onNavigate('shop')} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Shop
            </button>
            <button onClick={() => onNavigate('about')} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              About
            </button>
            <button onClick={() => onNavigate('contact')} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-700 hover:text-black cursor-pointer transition-colors" />
            <ShoppingBag className="h-5 w-5 text-gray-700 hover:text-black cursor-pointer transition-colors" />
            <User className="h-5 w-5 text-gray-700 hover:text-black cursor-pointer transition-colors" />
            {/* Admin Icon */}
            <button
              onClick={() => onNavigate('admin')}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${currentPage === 'admin' ? 'text-black' : 'text-gray-600'}`}
              title="Admin Panel"
            >
              <Shield className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left ${
                    currentPage === item.href ? 'text-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Dropdown Items */}
              {navigationConfig.filter(nav => nav.active).map((navItem) => (
                <div key={navItem.id} className="border-t border-gray-100 pt-2">
                  <div className="px-3 py-2 text-sm font-semibold text-gray-900">
                    {navItem.name}
                  </div>
                  {navItem.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleDropdownItemClick(item, navItem.type);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ))}
              
              <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 w-full text-left">Shop</button>
              <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 w-full text-left">About</button>
              <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 w-full text-left">Contact</button>
              
              <div className="flex items-center space-x-4 px-3 py-2">
                <Search className="h-5 w-5 text-gray-700" />
                <ShoppingBag className="h-5 w-5 text-gray-700" />
                <User className="h-5 w-5 text-gray-700" />
                {/* Admin Icon (Mobile) */}
                <button
                  onClick={() => { onNavigate('admin'); setIsMenuOpen(false); }}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${currentPage === 'admin' ? 'text-black' : 'text-gray-600'}`}
                  title="Admin Panel"
                >
                  <Shield className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
