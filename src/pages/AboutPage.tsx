import React from 'react';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion",
      description: "Every product is selected with love and care for our customers"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality",
      description: "We never compromise on the quality of our beauty and fragrance products"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building a community of confident, beautiful women across Kenya"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Innovation",
      description: "Constantly seeking the latest trends and innovations in beauty"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">
              About Jowhara Collection
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering women through luxury beauty and fragrance products, 
              one customer at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-serif font-bold text-black mb-6">
                The Founder's Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jowhara Collection was born from a simple yet powerful vision: to make luxury 
                  beauty and fragrance products accessible to every woman in Kenya. As a female 
                  entrepreneur, I understood the challenges women face in finding high-quality, 
                  authentic beauty products that truly deliver on their promises.
                </p>
                <p>
                  What started as a personal quest for the perfect fragrance evolved into a 
                  mission to curate the finest collection of beauty products from around the world. 
                  Each product in our collection is personally tested and approved, ensuring that 
                  our customers receive only the best.
                </p>
                <p>
                  Today, Jowhara Collection stands as a testament to the power of passion, 
                  dedication, and the belief that every woman deserves to feel beautiful and 
                  confident. We're not just selling products; we're building a community of 
                  empowered women who celebrate their unique beauty.
                </p>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-black mb-2">
                  "Beauty is not just about looking good; it's about feeling confident and 
                  empowered in your own skin."
                </p>
                <p className="text-gray-600">- Founder, Jowhara Collection</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Founder"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-lg">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Jowhara Collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="text-black mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              Our Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-serif font-bold mb-4">Authenticity</h3>
              <p className="text-gray-300">
                We believe in the power of authentic beauty products. Every item in our 
                collection is sourced directly from trusted suppliers and verified for 
                authenticity.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-serif font-bold mb-4 text-black">Accessibility</h3>
              <p className="text-gray-600">
                Luxury shouldn't be exclusive. We work hard to make premium beauty 
                products accessible to women from all walks of life across Kenya.
              </p>
            </div>
            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-serif font-bold mb-4">Empowerment</h3>
              <p className="text-gray-300">
                Beyond products, we're building a movement. Every purchase supports 
                female entrepreneurship and contributes to women's economic empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Premium Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-gray-300">Product Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-black mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To revolutionize the beauty industry in Kenya by providing authentic, 
            high-quality beauty and fragrance products while empowering women to 
            embrace their unique beauty and build confidence that radiates from within. 
            We are committed to excellence, authenticity, and creating a community 
            where every woman feels valued and beautiful.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;