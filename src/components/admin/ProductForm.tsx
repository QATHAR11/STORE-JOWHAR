import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Database } from '../../lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

interface ProductFormProps {
  product?: Product;
  categories: string[];
  onSubmit: (data: ProductInsert) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  onClose,
  loading = false
}) => {
  const [formData, setFormData] = useState<ProductInsert>({
    name: product?.name || '',
    category: product?.category || categories[0] || '',
    price: product?.price || 0,
    description: product?.description || '',
    ingredients: product?.ingredients || '',
    usage: product?.usage || '',
    images: product?.images || [''],
    stock: product?.stock || 0,
    featured: product?.featured || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out empty image URLs
      const cleanedData = {
        ...formData,
        images: formData.images?.filter(img => img.trim() !== '') || []
      };
      await onSubmit(cleanedData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.map((img, i) => i === index ? value : img) || []
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (KSh) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients
            </label>
            <textarea
              rows={2}
              value={formData.ingredients || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage Instructions
            </label>
            <textarea
              rows={2}
              value={formData.usage || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, usage: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </button>
            </div>
            <div className="space-y-2">
              {formData.images?.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => updateImageField(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  {formData.images && formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured Product
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (product ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;