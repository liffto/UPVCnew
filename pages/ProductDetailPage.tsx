
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Product, SiteSettings } from '../types';
import { ChevronLeft } from 'lucide-react';
import { WhatsAppIcon } from '../components/IconRenderer';

interface ProductDetailPageProps {
  products: Product[];
  settings: SiteSettings;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when product changes to avoid indexing issues
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  if (!product) return <div className="p-20 text-center font-bold text-gray-500">Product not found</div>;

  const whatsappNumber = settings.whatsapp;
  const whatsappMessage = encodeURIComponent(`Hi, I am interested in ${product.name}. Please provide more details.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Helper to parse description for "AVAILABLE COLOURS :"
  const parseDescription = (desc: string) => {
    const colorMarker = "AVAILABLE COLOURS :";
    if (desc.includes(colorMarker)) {
      const parts = desc.split(colorMarker);
      const mainDesc = parts[0].trim();
      const colorsPart = parts[1].trim();
      // Split by comma, " & ", " AND ", or newlines
      const colors = colorsPart
        .split(/[,&\n]|\s+AND\s+/i)
        .map(c => c.trim())
        .filter(c => c !== "" && c.toUpperCase() !== "AVAILABLE COLOURS");
      return { mainDesc, colors };
    }
    return { mainDesc: desc, colors: [] };
  };

  const { mainDesc, colors } = parseDescription(product.description);

  // Helper to determine color badge styling
  const getColorBadgeStyle = (colorName: string) => {
    const name = colorName.toUpperCase().trim();
    if (name === 'BLACK') {
      return {
        backgroundColor: '#111827',
        color: '#FFFFFF',
        borderColor: '#111827'
      };
    }
    if (name === 'BROWN') {
      return {
        backgroundColor: '#5D4037', // A deep hardware brown
        color: '#FFFFFF',
        borderColor: '#5D4037'
      };
    }
    if (name === 'WHITE') {
      return {
        backgroundColor: '#FFFFFF',
        color: '#111827',
        borderColor: '#E5E7EB'
      };
    }
    // Default for other possible colors
    return {
      backgroundColor: '#F3F4F6',
      color: '#111827',
      borderColor: '#E5E7EB'
    };
  };

  return (
    <Layout settings={settings}>
      {/* Product Breadcrumb & Back */}
      <div className="bg-gray-50/50 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-4 flex items-center gap-4">
          <Link to={`/category/${product.categoryId}`} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Catalog / Details</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="space-y-6">
             <div className="bg-white border-2 border-gray-50 rounded-[2.5rem] overflow-hidden p-8 flex items-center justify-center h-[400px] md:h-[550px] shadow-xl shadow-gray-100/50 relative group">
                <img 
                  key={activeImage} 
                  src={product.images[activeImage] || product.images[0]} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain transition-all duration-700 hover:scale-105" 
                />
             </div>
             {product.images.length > 1 && (
               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {product.images.map((img, i) => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 md:w-24 md:h-24 bg-white border-2 rounded-2xl p-2 overflow-hidden flex items-center justify-center cursor-pointer transition-all ${activeImage === i ? 'border-primary ring-4 ring-primary/10 shadow-lg' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} className="max-w-full max-h-full object-contain" alt="" />
                    </button>
                  ))}
               </div>
             )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col pt-4">
             <div className="mb-10 text-left">
                <span className="inline-block text-[11px] md:text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                  Premium Hardware
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-[#111827] leading-tight mb-6">
                  {product.name}
                </h1>
                <div className="w-20 h-2 bg-primary rounded-full"></div>
             </div>

             <a 
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-4 bg-[#25D366] text-white py-5 px-8 rounded-3xl font-black text-lg md:text-xl hover:bg-[#1da851] hover:shadow-2xl hover:shadow-green-500/30 transition-all mb-10 active:scale-[0.98] shadow-lg"
             >
               <div className="bg-white/20 p-2 rounded-xl flex items-center justify-center">
                 <WhatsAppIcon size={24} />
               </div>
               WhatsApp Inquiry
             </a>

             <div className="bg-[#F9FAFB] rounded-[2.5rem] p-8 md:p-10 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-black mb-8 text-[#111827] border-b border-gray-200 pb-4">
                  Description
                </h3>
                
                {colors.length > 0 && (
                  <div className="mb-10">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5">
                      Available Colours :
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {colors.map((color, idx) => {
                        const style = getColorBadgeStyle(color);
                        return (
                          <div 
                            key={idx} 
                            className="flex flex-col items-center gap-3"
                          >
                            <span 
                              style={{ 
                                backgroundColor: style.backgroundColor, 
                                color: style.color,
                                borderColor: style.borderColor
                              }}
                              className="px-6 py-3 rounded-2xl text-xs md:text-sm font-black shadow-sm uppercase tracking-widest border-2 min-w-[100px] text-center transition-transform hover:scale-105"
                            >
                              {color}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="prose prose-lg text-[#374151] leading-relaxed whitespace-pre-wrap font-bold">
                  {mainDesc.trim() === "" && colors.length === 0 ? "No description details provided." : mainDesc}
                </div>
             </div>

             {/* Meta Info Grid */}
             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                   <p className="text-[11px] uppercase font-black text-gray-400 mb-2 tracking-[0.2em]">Certification</p>
                   <p className="text-base md:text-lg font-black text-black">ISO 9001:2015</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                   <p className="text-[11px] uppercase font-black text-gray-400 mb-2 tracking-[0.2em]">Quality Grade</p>
                   <p className="text-base md:text-lg font-black text-black uppercase">Premium Quality</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
