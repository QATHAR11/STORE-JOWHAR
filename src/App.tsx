import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('shop');
  };

  // Check if current page is admin
  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onViewProduct={handleViewProduct} />
        )}
        {currentPage === 'shop' && (
          <ShopPage onViewProduct={handleViewProduct} />
        )}
        {currentPage === 'product' && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onBack={handleBackFromProduct}
            onViewProduct={handleViewProduct}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
