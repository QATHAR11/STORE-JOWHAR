import React, { useState, useEffect } from 'react';
import { Star, Instagram } from 'lucide-react';
import { categories, products } from '../data/mockData';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Static Banner */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/bann.jpeg"
            alt="Jowhara Collection Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            {/* Logo Space - You can replace this with your actual logo */}
            <div className="mb-8">
              <img 
                src="JWLOGO.jpeg" 
                alt="Jowhara Collection" 
                className="h-20 w-auto mx-auto mb-4 opacity-90"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
              Luxury Beauty & Fragrance
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover our premium collection of beauty and fragrance products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </button>
              <WhatsAppButton className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black">
                Order via WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              Our Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium beauty and fragrance products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => onNavigate('shop')}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites that embody luxury and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">
                Crafted with Passion
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Jowhara Collection was born from a vision to bring luxury beauty and fragrance 
                products to the modern woman. Every product is carefully selected and crafted 
                to deliver an exceptional experience that embodies elegance and sophistication.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-300">Trusted by 1000+ customers</span>
              </div>
              <button
                onClick={() => onNavigate('about')}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury products"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Instagram className="h-8 w-8 text-pink-600" />
              <h2 className="text-4xl font-serif font-bold text-black">
                @jowhara_collection
              </h2>
            </div>
            <p className="text-gray-600">Follow us for daily beauty inspiration</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={`https://images.pexels.com/photos/${3762879 + index}/pexels-photo-${3762879 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust Jowhara Collection for their beauty needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Shop Collection
            </button>
            <WhatsAppButton className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black">
              Chat with Us
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
