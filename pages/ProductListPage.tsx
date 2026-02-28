import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, Product, SiteSettings } from '../types';
import { ChevronLeft } from 'lucide-react';

interface ProductListPageProps {
  categories: Category[];
  products: Product[];
  settings: SiteSettings;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ categories, products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const filteredProducts = products.filter(p => p.categoryId === id);

  if (!category) return <div className="p-20 text-center font-bold text-gray-500">Category not found</div>;

  return (
    <Layout settings={settings}>
      <div className="bg-primary py-8 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-4 flex items-center justify-center gap-4 relative">
          <Link to="/products" className="absolute left-6 md:left-4 p-2 bg-white/20 rounded-lg hover:bg-white/40 transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">{category.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 py-8 md:py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">
            No items found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-gray-100 max-w-[300px] md:max-w-none mx-auto w-full"
              >
                <div className="h-56 sm:h-72 md:h-56 overflow-hidden flex items-center justify-center bg-white p-6">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="py-5 px-5">
                  <h3 className="font-bold text-black text-sm md:text-base leading-tight line-clamp-2 text-left h-10 md:h-12">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductListPage;