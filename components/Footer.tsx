import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Box, ArrowRight, Instagram } from 'lucide-react';
import { SiteSettings } from '../types';
import { WhatsAppIcon } from './IconRenderer';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-[#1a1d1a] text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              {settings.footerLogo ? (
                <img 
                  src={settings.footerLogo} 
                  alt="Footer Logo" 
                  className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-md transition-transform group-hover:scale-105">
                     <Box size={32} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold leading-none tracking-tight">HITECH</span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">UPVC hardware</span>
                  </div>
                </div>
              )}
            </Link>
            <p className="text-gray-200 text-sm leading-relaxed font-semibold">
              We, Hi-Tech UPVC Hardwares, are a leading ISO 9001:2015 certified uPVC Hardware provider, with a complete range of uPVC Hardware, Tools, & Accessories, that offers integrated innovative solutions in the area of uPVC Hardware products.
            </p>
            <div className="flex gap-3">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] p-3 rounded-xl hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center border border-[#25D366]/30"><WhatsAppIcon size={20} /></a>
              <a href={`call:${settings.adminPhone}`} className="bg-primary/20 text-primary p-3 rounded-xl hover:bg-primary hover:text-white transition-all border border-primary/30"><Phone size={20} /></a>
              <a href={`mailto:${settings.email}`} className="bg-blue-500/20 text-blue-400 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/30"><Mail size={20} /></a>
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-white/20" aria-label="Facebook"><Facebook size={20} /></a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white p-3 rounded-xl hover:bg-pink-600 hover:text-white transition-all border border-white/20" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-8">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Product Catalog', path: '/products' },
                { name: 'About Our Company', path: '/about' },
                { name: 'Technical Manuals', path: '/catalogs' },
                { name: 'Project Gallery', path: '/gallery' },
                { name: 'Contact Support', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-100 hover:text-white text-sm font-bold flex items-center gap-2 group transition-colors">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-8">Our Presence</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="flex gap-4 col-span-1 md:col-span-2">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Head Office (Tirupur)</p>
                  <p className="text-gray-100 leading-relaxed font-semibold mb-3">{settings.headOfficeAddress}</p>
                  <div className="space-y-1">
                    <p className="text-white/90 font-bold">Hitech Head Number: <span className="text-primary">{settings.adminPhone}</span></p>
                    <p className="text-white/90 font-bold">Tirupur (Ho): <span className="text-primary">{settings.headOfficePhone}</span></p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Coimbatore Office</p>
                  <p className="text-gray-100 leading-relaxed font-semibold mb-2">{settings.coimbatoreAddress}</p>
                  <div className="space-y-1">
                    <p className="text-white/90 font-bold">Call: <span className="text-primary">{settings.coimbatorePhone}</span></p>
                    <p className="text-white/90 font-bold">Landline: <span className="text-primary">{settings.coimbatoreLandline}</span></p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Madurai Office</p>
                  <p className="text-gray-100 leading-relaxed font-semibold mb-2">{settings.maduraiAddress}</p>
                  <p className="text-white/90 font-bold">Call: <span className="text-primary">{settings.maduraiPhone}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-400 text-center md:text-left flex-grow">
            © {new Date().getFullYear()} Hi-Tech UPVC Hardwares • All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {settings.poweredByLogo && (
              <div className="flex items-center gap-3">
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Powered By</span>
                 <a href="https://liffto.in" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                   <img 
                     src={settings.poweredByLogo} 
                     alt="Liffto" 
                     className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity brightness-0 invert" 
                   />
                 </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Fix for Module '"file:///components/Footer"' has no default export
export default Footer;