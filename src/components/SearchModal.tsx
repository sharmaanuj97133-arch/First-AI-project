import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { FAQS_DATA, MODES_DATA } from '../data/auriaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnchor: (anchorId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAnchor
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: '40mm Dynamic Biocellulose Drivers', anchor: 'acoustics', type: 'Spec' },
    { title: 'Hybrid Active Noise Cancellation (-38dB)', anchor: 'acoustics', type: 'Spec' },
    { title: '50-Hour Battery Reserve & USB-C Fast Charge', anchor: 'engineering', type: 'Feature' },
    { title: 'Uncompressed High-Fidelity Audio Mode', anchor: 'experience', type: 'DSP Mode' },
    { title: 'Gaming Mode (40ms Low Latency)', anchor: 'experience', type: 'DSP Mode' },
    { title: 'Doorstep Warranty & Replacement Policy', anchor: 'faq', type: 'FAQ' },
    { title: "What's in the Box: Travel Hardcase & Cables", anchor: 'box', type: 'Ecosystem' }
  ];

  const filteredItems = query.trim()
    ? quickLinks.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : quickLinks;

  const handleSelect = (anchor: string) => {
    onSelectAnchor(anchor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Search Box */}
      <div className="relative w-full max-w-xl bg-[#121315] border border-[#534439]/40 text-[#e3e2e5] shadow-2xl z-10 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#534439]/30 flex items-center gap-3">
          <Search size={18} className="text-[#ffb77c]" />
          <input
            autoFocus
            type="text"
            placeholder="Search acoustics, battery, ANC, warranty, specs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#e3e2e5] placeholder:text-[#8e9197] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#8e9197] hover:text-[#e3e2e5] text-xs font-mono"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#8e9197] hover:text-[#e3e2e5]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2 divide-y divide-[#534439]/20">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#8e9197] mb-2">
            {query.trim() ? `Search Results (${filteredItems.length})` : 'Popular Topics & Specifications'}
          </span>
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(item.anchor)}
              className="w-full text-left pt-2 pb-2 flex items-center justify-between group cursor-pointer hover:bg-[#1b1c1e] px-2 transition-colors"
            >
              <div>
                <span className="font-syne text-xs font-medium text-[#e3e2e5] group-hover:text-[#ffb77c] transition-colors">
                  {item.title}
                </span>
                <span className="block text-[10px] font-mono text-[#8e9197]">
                  Category: {item.type}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-[#8e9197] group-hover:text-[#ffb77c] group-hover:translate-x-1 transition-all"
              />
            </button>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-xs text-[#8e9197] py-6 text-center">
              No matching specifications found for &quot;{query}&quot;. Try &quot;ANC&quot;, &quot;battery&quot;, or &quot;warranty&quot;.
            </p>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#1b1c1e] border-t border-[#534439]/20 text-[11px] font-mono text-[#8e9197] flex items-center justify-between">
          <span>AURIA Acoustic Index</span>
          <span className="text-[#ffb77c]">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
