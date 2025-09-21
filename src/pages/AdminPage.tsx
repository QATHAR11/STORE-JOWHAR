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
  X
} from 'lucide-react';
import { products, banners, brands, navigationConfig, categories } from '../data/mockData';
import { Product, Banner, Brand, NavigationItem } from '../types';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'navigation' | 'brands' | 'orders' | 'analytics'>('products');
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
    { id: 'products', name: 'Products', icon: <Package className="h-5 w-5" />, count: products.length },
    { id: 'banners', name: 'Banners', icon: <Image className="h-5 w-5" />, count: banners.length },
    { id: 'navigation', name: 'Navigation', icon: <Navigation className="h-5 w-5" />, count: navigationConfig.length },
    { id: 'brands', name: 'Brands', icon: <Award className="h-5 w-5" />, count: brands.length },
    { id: 'orders', name: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, count: 24 },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, count: null }
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
                <p className="text-xs text-gray-500 -mt-1">Management Panel</p>
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {tab.icon}
                      <span className="font-medium">{tab.name}</span>
                    </div>
                    {tab.count && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === tab.id ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'banners' && <BannersTab />}
            {activeTab === 'navigation' && <NavigationTab />}
            {activeTab === 'brands' && <BrandsTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Tab Component
const ProductsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  KSh {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  {product.featured ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Featured
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Regular
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{products.filter(p => p.stock > 0).length}</div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{products.filter(p => p.stock === 0).length}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{products.filter(p => p.featured).length}</div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Banners Tab Component
const BannersTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Banner Management</h2>
            <p className="text-gray-600 mt-1">Control homepage banners and promotions</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Banner</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    banner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{banner.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{banner.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {banner.category || 'General'}
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
      </div>
    </div>
  );
};

// Navigation Tab Component  
const NavigationTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Navigation Settings</h2>
            <p className="text-gray-600 mt-1">Configure dropdown menus and navigation items</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Navigation Item</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {navigationConfig.map((navItem) => (
            <div key={navItem.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{navItem.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {navItem.type}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    navItem.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {navItem.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {navItem.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-600 truncate">{item.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Brands Tab Component
const BrandsTab: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brand Management</h2>
            <p className="text-gray-600 mt-1">Manage brand listings and information</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Brand</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    brand.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {brand.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                <div className="flex items-center justify-end space-x-2">
                  <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Orders Tab Component
const OrdersTab: React.FC = () => {
  // Mock order data
  const mockOrders = [
    {
      id: 'ORD001',
      customerName: 'Sarah Johnson',
      customerPhone: '+254 712 345 678',
      items: ['Luxury Hair Serum', 'Radiance Face Cream'],
      total: 5700,
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ORD002', 
      customerName: 'Mary Wanjiku',
      customerPhone: '+254 723 456 789',
      items: ['Midnight Oud', 'Beard Growth Oil'],
      total: 6300,
      status: 'confirmed',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 'ORD003',
      customerName: 'Grace Achieng',
      customerPhone: '+254 734 567 890',
      items: ['Fresh Citrus Body Spray'],
      total: 1200,
      status: 'delivered',
      createdAt: '2024-01-14T16:45:00Z'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">Track and manage customer orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Total: KSh {mockOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerPhone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.join(', ')}
                  </div>
                  <div className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  KSh {order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {order.status === 'confirmed' && <Clock className="h-3 w-3 mr-1" />}
                    {order.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-yellow-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Stats */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{mockOrders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{mockOrders.filter(o => o.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{mockOrders.filter(o => o.status === 'confirmed').length}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{mockOrders.filter(o => o.status === 'delivered').length}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab: React.FC = () => {
  const analyticsData = {
    totalRevenue: 145000,
    totalOrders: 89,
    averageOrderValue: 1629,
    topSellingCategory: 'Perfume',
    revenueGrowth: 15.3,
    orderGrowth: 8.7,
    customerRetention: 73.2
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">KSh {analyticsData.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{analyticsData.revenueGrowth}%</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalOrders}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+{analyticsData.orderGrowth}%</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">KSh {analyticsData.averageOrderValue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">Per order</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Customer Retention</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.customerRetention}%</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">Returning customers</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const percentage = Math.floor(Math.random() * 40) + 10; // Mock data
              const amount = Math.floor(Math.random() * 50000) + 10000; // Mock data
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">KSh {amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index % 6 === 0 ? 'bg-blue-500' :
                        index % 6 === 1 ? 'bg-green-500' :
                        index % 6 === 2 ? 'bg-yellow-500' :
                        index % 6 === 3 ? 'bg-red-500' :
                        index % 6 === 4 ? 'bg-purple-500' : 'bg-pink-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New order received from Sarah Johnson</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Product "Midnight Oud" restocked</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Low stock alert: Beard Growth Oil</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Order ORD001 marked as delivered</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New customer registered: Mary Wanjiku</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Products</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Units Sold</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Growth</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                {products.filter(p => p.featured).map((product, index) => {
                  const unitsSold = Math.floor(Math.random() * 50) + 10;
                  const revenue = unitsSold * product.price;
                  const growth = Math.floor(Math.random() * 30) + 5;
                  
                  return (
                    <tr key={product.id} className="border-t border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <img src={product.images[0]} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{product.category}</td>
                      <td className="py-3 text-sm text-gray-900">{unitsSold}</td>
                      <td className="py-3 text-sm font-medium text-gray-900">KSh {revenue.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">+{growth}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
