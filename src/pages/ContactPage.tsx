import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-black mb-8">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Phone</h3>
                  <p className="text-gray-600">+254 722 240558</p>
                  <p className="text-sm text-gray-500">Available 24/7 via WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Email</h3>
                  <p className="text-gray-600">info@jowhara.co.ke</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Location</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500">Serving customers nationwide</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-black text-white p-3 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Sunday</p>
                  <p className="text-sm text-gray-500">8:00 AM - 8:00 PM EAT</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-black mb-4">Quick Contact</h3>
              <p className="text-gray-600 mb-4">
                Need immediate assistance? Chat with us on WhatsApp for instant support.
              </p>
              <WhatsAppButton className="w-full justify-center">
                Chat on WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h2 className="text-3xl font-serif font-bold text-black mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-black mb-8 text-center">
            Find Us
          </h2>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Serving All of Kenya
            </h3>
            <p className="text-gray-600 mb-4">
              Based in Nairobi, we deliver our premium products nationwide. 
              Contact us for delivery information to your location.
            </p>
            <div className="text-sm text-gray-500">
              <p>Delivery available in all major cities including:</p>
              <p>Nairobi • Mombasa • Kisumu • Nakuru • Eldoret • Thika</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-black mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">How can I place an order?</h3>
              <p className="text-gray-600 text-sm">
                You can place an order by clicking the WhatsApp button on any product page 
                or by contacting us directly at +254 722 240558.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">Do you deliver nationwide?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we deliver to all major cities and towns across Kenya. 
                Delivery fees vary based on location.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">Are your products authentic?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely! We source all our products directly from authorized distributors 
                and guarantee 100% authenticity.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept M-Pesa, bank transfers, and cash on delivery for orders 
                within Nairobi. Contact us for payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;