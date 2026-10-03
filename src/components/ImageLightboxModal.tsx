import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  handle: string;
  caption: string;
}

export const ImageLightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  handle,
  caption
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/95 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative max-w-4xl w-full bg-[#121315] border border-[#534439]/40 z-10 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#534439]/30 flex items-center justify-between bg-[#121315]/90">
          <div>
            <span className="font-mono text-xs text-[#ffb77c] font-semibold">{handle}</span>
            <span className="text-xs text-[#8e9197] ml-2">/ {title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#8e9197] hover:text-[#e3e2e5] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-[#0B0C0E] max-h-[75vh] flex items-center justify-center p-2 sm:p-6 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[65vh] w-auto object-contain border border-[#534439]/20"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 bg-[#1b1c1e] border-t border-[#534439]/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#c9c6c0] gap-2">
          <p>{caption}</p>
          <span className="font-mono text-[10px] text-[#8e9197] uppercase shrink-0">
            AURIA Community Archive • Photographed on Location
          </span>
        </div>
      </div>
    </div>
  );
};
