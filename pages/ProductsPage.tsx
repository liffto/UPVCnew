import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, SiteSettings } from '../types';

interface ProductsPageProps {
  categories: Category[];
  settings: SiteSettings;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categories, settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-8 text-center text-white">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Our Products</h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100 max-w-[300px] md:max-w-none mx-auto w-full"
            >
              <div className="h-60 sm:h-72 md:h-60 overflow-hidden flex items-center justify-center bg-white p-6">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="py-5 px-5">
                <h3 className="text-base md:text-lg font-bold text-black tracking-tight text-left line-clamp-1">{cat.name}</h3>
                {cat.description && (
                  <p className="text-gray-500 text-[10px] mt-2 line-clamp-2 font-medium text-left leading-relaxed">{cat.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;