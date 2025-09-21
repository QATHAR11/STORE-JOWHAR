import React from 'react';
import { Product } from '../types';
import { Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3">
            <button
              onClick={() => onViewProduct(product)}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-semibold rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">
            KSh {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        <button
          onClick={() => onViewProduct(product)}
          className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;