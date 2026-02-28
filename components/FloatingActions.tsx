import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { SiteSettings } from '../types';
import { WhatsAppIcon } from './IconRenderer';

interface FloatingActionsProps {
  settings: SiteSettings;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ settings }) => {
  // Moving down 26px from 128px (bottom-32) = 102px
  return (
    <div className="fixed right-6 bottom-[102px] flex flex-col gap-3 z-40">
      <a 
        href={`https://wa.me/${settings.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
      <a 
        href={`mailto:${settings.email}`}
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Email"
      >
        <Mail size={24} />
      </a>
      <a 
        href={`call:${settings.adminPhone}`}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Call"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingActions;
