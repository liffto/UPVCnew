import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Category, Product, SiteSettings } from '../types';
import { Search, X, Grid, List } from 'lucide-react';
import { NO_IMAGE_URL } from '../constants';

interface ProductsPageProps {
  categories: Category[];
  products?: Product[];
  settings: SiteSettings;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categories, products = [], settings }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Categories
  const filteredCategories = categories.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      cat.name.toLowerCase().includes(query) ||
      (cat.description && cat.description.toLowerCase().includes(query))
    );
  });

  // Filter Products (Items)
  const filteredProducts = products.filter((prod) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false; // Don't show individual product list if query is empty (keep view focused on category list)
    
    // Find category name to match against it as well
    const categoryName = categories.find(c => c.id === prod.categoryId)?.name || '';
    
    return (
      prod.name.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      categoryName.toLowerCase().includes(query)
    );
  });

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <Layout settings={settings}>
      {/* Page Header */}
      <div className="bg-primary py-12 md:py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in">Our Products</h1>
          <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Browse our catalog of high-quality, ISO 9001:2015 certified uPVC hardware and accessories.
          </p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-[#F4F9F1] py-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search for categories, products, specific hardware items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 pl-12 pr-12 py-4 rounded-2xl border-2 border-primary/20 focus:border-primary focus:outline-none shadow-md text-base md:text-lg transition-all placeholder:text-gray-400"
            />
            {hasSearch && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full p-0.5" />
              </button>
            )}
          </div>
          {hasSearch && (
            <p className="text-xs md:text-sm text-gray-500 mt-3 text-center font-medium">
              Showing matches for "<span className="text-primary font-bold">{searchQuery}</span>"
            </p>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-4 py-12">
        {!hasSearch ? (
          // Standard Category Grid
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 max-w-[300px] md:max-w-none mx-auto w-full flex flex-col h-full"
                >
                  <div className="h-60 sm:h-64 md:h-56 overflow-hidden flex items-center justify-center bg-white p-6 relative">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = NO_IMAGE_URL;
                      }}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="py-5 px-5 flex-grow flex flex-col justify-between border-t border-gray-50 bg-gray-50/10">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight text-left line-clamp-1">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-gray-500 text-xs mt-2 line-clamp-2 font-medium text-left leading-relaxed">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Search Mode: Categories & Products
          <div className="space-y-12">
            {/* Category Matches */}
            {filteredCategories.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                  <Grid className="text-primary w-5 h-5" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Matching Categories ({filteredCategories.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
                  {filteredCategories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      to={`/category/${cat.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 max-w-[300px] md:max-w-none mx-auto w-full flex flex-col h-full"
                    >
                      <div className="h-48 overflow-hidden flex items-center justify-center bg-white p-6 relative">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = NO_IMAGE_URL;
                          }}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="py-4 px-4 flex-grow flex flex-col justify-between border-t border-gray-50 bg-gray-50/10">
                        <div>
                          <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight text-left line-clamp-1">
                            {cat.name}
                          </h3>
                        </div>
                        <span className="text-primary font-bold text-xs mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start">
                          View Category &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Item Matches */}
            {filteredProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                  <List className="text-primary w-5 h-5" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Matching Specific Items ({filteredProducts.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
                  {filteredProducts.map((prod) => {
                    const categoryName = categories.find(c => c.id === prod.categoryId)?.name || 'Hardware';
                    return (
                      <Link 
                        key={prod.id} 
                        to={`/product/${prod.id}`}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 max-w-[300px] md:max-w-none mx-auto w-full flex flex-col h-full"
                      >
                        <div className="h-48 overflow-hidden flex items-center justify-center bg-white p-6 relative">
                          <img 
                            src={prod.images[0] || NO_IMAGE_URL} 
                            alt={prod.name} 
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = NO_IMAGE_URL;
                            }}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                          />
                          <span className="absolute top-3 left-3 bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                            {categoryName}
                          </span>
                        </div>
                        <div className="py-4 px-4 flex-grow flex flex-col justify-between border-t border-gray-50 bg-gray-50/10">
                          <div>
                            <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight text-left line-clamp-2 min-h-[2.5rem]">
                              {prod.name}
                            </h3>
                            {prod.description && (
                              <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 font-medium text-left leading-relaxed">
                                {prod.description}
                              </p>
                            )}
                          </div>
                          <span className="text-primary font-bold text-xs mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start">
                            View Details &rarr;
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Zero Results State */}
            {filteredCategories.length === 0 && filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 max-w-xl mx-auto px-6">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No items or categories found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                  We couldn't find any categories or specific items matching "{searchQuery}". Please check your spelling or try different keywords.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary-dark shadow-md transition-colors text-sm animate-pulse"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
