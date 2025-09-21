import { Product, Category, Banner, Brand, NavigationItem } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Hair',
    description: 'Premium hair care products for all hair types',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Beard',
    description: 'Professional beard grooming essentials',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Skincare',
    description: 'Luxurious skincare for radiant complexion',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Perfume',
    description: 'Exquisite fragrances for every occasion',
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Body Spray',
    description: 'Refreshing body sprays for daily use',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Air Freshener',
    description: 'Transform your space with luxury scents',
    image: 'https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Luxury Fragrances',
    subtitle: 'Discover our premium perfume collection',
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Perfume',
    active: true
  },
  {
    id: '2',
    title: 'Hair Care Excellence',
    subtitle: 'Professional hair treatments for every need',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Hair',
    active: true
  },
  {
    id: '3',
    title: 'Skincare Luxury',
    subtitle: 'Radiant skin with our premium skincare line',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Skincare',
    active: true
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Hair Serum',
    category: 'Hair',
    price: 2500,
    description: 'Premium hair serum for silky smooth hair',
    ingredients: 'Argan oil, Vitamin E, Keratin proteins',
    usage: 'Apply 2-3 drops to damp hair, style as usual',
    images: [
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 25,
    featured: true
  },
  {
    id: '2',
    name: 'Beard Growth Oil',
    category: 'Beard',
    price: 1800,
    description: 'Natural beard oil for healthy growth',
    ingredients: 'Jojoba oil, Castor oil, Essential oils',
    usage: 'Massage into beard and skin daily',
    images: [
      'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 30,
    featured: true
  },
  {
    id: '3',
    name: 'Radiance Face Cream',
    category: 'Skincare',
    price: 3200,
    description: 'Anti-aging cream for glowing skin',
    ingredients: 'Hyaluronic acid, Retinol, Vitamin C',
    usage: 'Apply morning and evening to clean skin',
    images: [
      'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 20,
    featured: true
  },
  {
    id: '4',
    name: 'Midnight Oud',
    category: 'Perfume',
    price: 4500,
    description: 'Luxurious oud fragrance for evening wear',
    ingredients: 'Oud, Rose, Amber, Musk',
    usage: 'Spray on pulse points',
    images: [
      'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 15,
    featured: true
  },
  {
    id: '5',
    name: 'Fresh Citrus Body Spray',
    category: 'Body Spray',
    price: 1200,
    description: 'Refreshing citrus body spray',
    ingredients: 'Citrus extracts, Natural oils',
    usage: 'Spray all over body after shower',
    images: [
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 40
  },
  {
    id: '6',
    name: 'Lavender Room Spray',
    category: 'Air Freshener',
    price: 800,
    description: 'Calming lavender air freshener',
    ingredients: 'Lavender essential oil, Natural extracts',
    usage: 'Spray in room as needed',
    images: [
      'https://images.pexels.com/photos/4210374/pexels-photo-4210374.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    stock: 50
  }
];

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Chanel',
    description: 'Luxury French fashion and beauty brand',
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400',
    active: true
  },
  {
    id: '2',
    name: 'Dior',
    description: 'Premium French luxury goods company',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    active: true
  },
  {
    id: '3',
    name: 'Tom Ford',
    description: 'American luxury fashion house',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
    active: true
  },
  {
    id: '4',
    name: 'Versace',
    description: 'Italian luxury fashion company',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    active: true
  }
];

export const navigationConfig: NavigationItem[] = [
  {
    id: 'categories',
    name: 'Browse by Category',
    type: 'category',
    items: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      image: cat.image
    })),
    active: true
  },
  {
    id: 'brands',
    name: 'Browse by Brand',
    type: 'brand',
    items: brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      description: brand.description,
      image: brand.image
    })),
    active: true
  },
  {
    id: 'gender',
    name: 'Browse by Gender',
    type: 'gender',
    items: [
      {
        id: 'women',
        name: 'Women',
        description: 'Beauty products for women',
        image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'men',
        name: 'Men',
        description: 'Grooming products for men',
        image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'unisex',
        name: 'Unisex',
        description: 'Products suitable for everyone',
        image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    active: true
  }
];