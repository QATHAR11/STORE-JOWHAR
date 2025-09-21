import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phone = "254722240558", 
  message = "Hello! I'm interested in your products.",
  className = "",
  children
}) => {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>{children || "Order via WhatsApp"}</span>
    </button>
  );
};

export default WhatsAppButton;