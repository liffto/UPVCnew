import React from 'react';
import Layout from '../components/Layout';
import { Catalog, SiteSettings } from '../types';
import { Download } from 'lucide-react';

interface CatalogsPageProps {
  catalogs: Catalog[];
  settings: SiteSettings;
}

const CatalogsPage: React.FC<CatalogsPageProps> = ({ catalogs, settings }) => {
  return (
    <Layout settings={settings}>
      <div className="bg-primary py-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Catalogs</h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {catalogs.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl shadow-xl flex flex-col items-start border border-gray-100 overflow-hidden group max-w-[300px] md:max-w-none mx-auto w-full">
              <div className="w-full h-[360px] md:h-[400px] bg-white overflow-hidden border-b border-gray-50 p-8 md:p-10 flex items-center justify-center">
                 <img src={cat.image} alt={cat.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="w-full p-6">
                <h3 className="text-lg md:text-xl font-bold text-left mb-6 leading-tight min-h-[3.5rem]">{cat.name}</h3>
                <a 
                  href={cat.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary px-4 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all text-sm shadow-sm"
                >
                  Download <Download size={20} />
                </a>
              </div>
            </div>
          ))}
          {catalogs.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold">No catalogs available yet.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CatalogsPage;