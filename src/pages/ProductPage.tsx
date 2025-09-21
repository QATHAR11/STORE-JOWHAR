import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/mockData';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onViewProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = `Hi! I'm interested in ordering ${quantity}x ${product.name} (KSh ${product.price.toLocaleString()} each). Total: KSh ${(product.price * quantity).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Shop</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-serif font-bold text-black mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reviews)</span>
              </div>
              <p className="text-4xl font-bold text-black mb-6">
                KSh {product.price.toLocaleString()}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-black mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.ingredients && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-3">Key Ingredients</h3>
                <p className="text-gray-600">
                  {product.ingredients}
                </p>
              </div>
            )}

            {product.usage && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-3">How to Use</h3>
                <p className="text-gray-600">
                  {product.usage}
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-lg font-semibold text-black">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} in stock
                </span>
              </div>

              <div className="space-y-4">
                <WhatsAppButton
                  message={whatsappMessage}
                  className="w-full justify-center text-lg py-4"
                >
                  Order Now - KSh {(product.price * quantity).toLocaleString()}
                </WhatsAppButton>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="border-2 border-black text-black py-3 px-6 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300">
                    Add to Wishlist
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Share Product
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-black">100%</div>
                  <div className="text-sm text-gray-600">Authentic</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">Fast</div>
                  <div className="text-sm text-gray-600">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-black mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onViewProduct={onViewProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;