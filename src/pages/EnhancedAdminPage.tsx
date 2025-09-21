import React, { useState } from 'react';
import { 
  Package, 
  Image, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Navigation,
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  AlertCircle,
  X,
  Filter,
  Tag
} from 'lucide-react';
import { 
  useProducts, 
  useCategories, 
  useBrands, 
  useGenderCategories,
  useOrders 
} from '../hooks/useEnhancedSupabaseData';
import EnhancedProductForm from '../components/admin/EnhancedProductForm';
import type { Database } from '../lib/supabase';

type Product = Database['public']['Tables']['enhanced_products']['Row'];
type Category = Database['public']['Tables']['enhanced_categories']['Row'];
type Brand = Database['public']['Tables']['enhanced_brands']['Row'];

const EnhancedAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'brands' | 'gender' | 'orders' | 'analytics'>('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (loginForm.username === 'admin' && loginForm.password === 'jowhara2024') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <Settings className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-serif font-bold">Admin Login</h1>
            <p className="text-gray-300 mt-2">Jowhara Collection Admin Panel</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Username
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                placeholder="Enter username"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-600">
              <strong>Demo Credentials:</strong><br />
              Username: <code>admin</code><br />
              Password: <code>jowhara2024</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', name: 'Products', icon: <Package className="h-5 w-5" /> },
    { id: 'categories', name: 'Categories', icon: <Tag className="h-5 w-5" /> },
    { id: 'brands', name: 'Brands', icon: <Award className="h-5 w-5" /> },
    { id: 'gender', name: 'Gender Categories', icon: <Users className="h-5 w-5" /> },
    { id: 'orders', name: 'Orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-black">
                  Jowhara Admin
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Enhanced Management Panel</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm p-2 sticky top-24">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && <EnhancedProductsTab />}
            {activeTab === 'categories' && <EnhancedCategoriesTab />}
            {activeTab === 'brands' && <EnhancedBrandsTab />}
            {activeTab === 'gender' && <EnhancedGenderTab />}
            {activeTab === 'orders' && <EnhancedOrdersTab />}
            {activeTab === 'analytics' && <EnhancedAnalyticsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Products Tab Component
const EnhancedProductsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: products, loading, insert, update, remove } = useProducts({
    search: searchTerm,
    category: selectedCategory,
    brand: selectedBrand,
    gender: selectedGender
  });

  const handleSubmit = async (data: any) => {
    if (editingProduct) {
      await update(editingProduct.id, data);
    } else {
      await insert(data);
    }
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await remove(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">All Genders</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
                        alt={product.name} 
                        className="h-12 w-12 rounded-lg object-cover" 
                      />
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {product.gender_category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Brand Name
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    KSh {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock_quantity > product.low_stock_threshold ? 'bg-green-100 text-green-800' : 
                      product.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock_quantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' :
                      product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-gray-400 hover:text-yellow-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <EnhancedProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(undefined);
          }}
        />
      )}
    </div>
  );
};

// Enhanced Categories Tab Component
const EnhancedCategoriesTab: React.FC = () => {
  const { data: categories, loading } = useCategories(false);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <p className="text-gray-600 mt-1">Manage product categories</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img src={category.image || '/placeholder.jpg'} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {category.slug}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Brands Tab Component
const EnhancedBrandsTab: React.FC = () => {
  const { data: brands, loading } = useBrands(false);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brands</h2>
            <p className="text-gray-600 mt-1">Manage brand listings</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Brand</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading brands...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  <img src={brand.logo || '/placeholder.jpg'} alt={brand.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      brand.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {brand.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {brand.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {brand.slug}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Gender Categories Tab Component
const EnhancedGenderTab: React.FC = () => {
  const { data: genderCategories, loading } = useGenderCategories(false);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gender Categories</h2>
            <p className="text-gray-600 mt-1">Manage gender-based product categorization</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading gender categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {genderCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img src={category.image || '/placeholder.jpg'} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Orders Tab Component
const EnhancedOrdersTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">Track and manage customer orders</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center py-12 text-gray-500">
          Orders management coming soon...
        </div>
      </div>
    </div>
  );
};

// Enhanced Analytics Tab Component
const EnhancedAnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
        <div className="text-center py-12 text-gray-500">
          Analytics dashboard coming soon...
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminPage;