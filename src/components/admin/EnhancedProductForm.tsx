import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { useCategories, useBrands } from '../../hooks/useEnhancedSupabaseData';
import type { Database } from '../../lib/supabase';

type Product = Database['public']['Tables']['enhanced_products']['Row'];
type ProductInsert = Database['public']['Tables']['enhanced_products']['Insert'];

interface EnhancedProductFormProps {
  product?: Product;
  onSubmit: (data: ProductInsert) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

const EnhancedProductForm: React.FC<EnhancedProductFormProps> = ({
  product,
  onSubmit,
  onClose,
  loading = false
}) => {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const [formData, setFormData] = useState<ProductInsert>({
    name: product?.name || '',
    slug: product?.slug || '',
    sku: product?.sku || '',
    brand_id: product?.brand_id || null,
    category_id: product?.category_id || null,
    gender_category: product?.gender_category || 'Unisex',
    price: product?.price || 0,
    compare_price: product?.compare_price || null,
    cost_price: product?.cost_price || null,
    description: product?.description || '',
    short_description: product?.short_description || '',
    ingredients: product?.ingredients || '',
    usage_instructions: product?.usage_instructions || '',
    benefits: product?.benefits || '',
    images: product?.images || [''],
    video_url: product?.video_url || '',
    weight: product?.weight || null,
    stock_quantity: product?.stock_quantity || 0,
    low_stock_threshold: product?.low_stock_threshold || 5,
    track_inventory: product?.track_inventory ?? true,
    allow_backorder: product?.allow_backorder ?? false,
    featured: product?.featured || false,
    status: product?.status || 'active',
    seo_title: product?.seo_title || '',
    seo_description: product?.seo_description || '',
    tags: product?.tags || [],
    sort_order: product?.sort_order || 0
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !product) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Clean up data
      const cleanedData = {
        ...formData,
        images: Array.isArray(formData.images) 
          ? formData.images.filter(img => img && img.trim() !== '') 
          : [],
        tags: Array.isArray(formData.tags) 
          ? formData.tags.filter(tag => tag && tag.trim() !== '')
          : []
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
      images: [...(Array.isArray(prev.images) ? prev.images : []), '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: Array.isArray(prev.images) 
        ? prev.images.filter((_, i) => i !== index) 
        : []
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: Array.isArray(prev.images)
        ? prev.images.map((img, i) => i === index ? value : img)
        : [value]
    }));
  };

  const addTag = () => {
    const tagInput = document.getElementById('new-tag') as HTMLInputElement;
    const newTag = tagInput?.value.trim();
    if (newTag) {
      setFormData(prev => ({
        ...prev,
        tags: [...(Array.isArray(prev.tags) ? prev.tags : []), newTag]
      }));
      tagInput.value = '';
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: Array.isArray(prev.tags) 
        ? prev.tags.filter((_, i) => i !== index)
        : []
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
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
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                value={formData.brand_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, brand_id: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Compare Price (KSh)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.compare_price || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, compare_price: parseFloat(e.target.value) || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Price (KSh)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.cost_price || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, cost_price: parseFloat(e.target.value) || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                min="0"
                value={formData.low_stock_threshold}
                onChange={(e) => setFormData(prev => ({ ...prev, low_stock_threshold: parseInt(e.target.value) || 5 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender Category
              </label>
              <select
                value={formData.gender_category || 'Unisex'}
                onChange={(e) => setFormData(prev => ({ ...prev, gender_category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={formData.short_description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                rows={4}
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <textarea
                rows={3}
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
                rows={3}
                value={formData.usage_instructions || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, usage_instructions: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Images */}
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
              {Array.isArray(formData.images) && formData.images.map((image, index) => (
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

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                id="new-tag"
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(formData.tags) && formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="track_inventory"
                checked={formData.track_inventory}
                onChange={(e) => setFormData(prev => ({ ...prev, track_inventory: e.target.checked }))}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="track_inventory" className="ml-2 text-sm text-gray-700">
                Track Inventory
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="allow_backorder"
                checked={formData.allow_backorder}
                onChange={(e) => setFormData(prev => ({ ...prev, allow_backorder: e.target.checked }))}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="allow_backorder" className="ml-2 text-sm text-gray-700">
                Allow Backorder
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seo_title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Description
              </label>
              <textarea
                rows={2}
                value={formData.seo_description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
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

export default EnhancedProductForm;