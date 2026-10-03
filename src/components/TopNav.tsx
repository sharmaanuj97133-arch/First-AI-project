import React from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';

interface TopNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onApplyPromo: (code: string) => void;
  hasAppliedPromo: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onApplyPromo,
  hasAppliedPromo
}) => {
  const [showBanner, setShowBanner] = React.useState(true);

  return (
    <>
      {/* 1. ANNOUNCEMENT BAR */}
      {showBanner && (
        <aside
          id="announcement-bar"
          className="w-full bg-[#292a2c] border-b border-[#534439]/30 text-[#e3e2e5] px-4 py-2.5 flex items-center justify-between text-xs tracking-wider uppercase font-medium"
        >
          <div className="flex-1 text-center">
            <span className="text-[#ffb77c] mr-2 font-semibold">Launch Offer:</span>
            <span className="text-[#e5e2db]">
              Get ₹500 OFF + Free Shipping | Code:{' '}
              <button
                type="button"
                onClick={() => onApplyPromo('AURIA500')}
                className="text-[#ffb77c] hover:underline tracking-widest font-mono font-bold ml-1 cursor-pointer"
                title="Click to apply promo code"
              >
                {hasAppliedPromo ? 'AURIA500 (Applied ✓)' : 'AURIA500'}
              </button>
            </span>
          </div>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setShowBanner(false)}
            className="text-[#c9c6c0] hover:text-[#e3e2e5] p-1 transition-colors"
          >
            <X size={14} />
          </button>
        </aside>
      )}

      {/* 2. NAVIGATION BAR */}
      <header className="w-full px-5 md:px-10 lg:px-20 h-20 flex items-center justify-between border-b border-[#534439]/20 bg-[#121315]/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-syne text-2xl font-bold tracking-widest uppercase text-[#e3e2e5] hover:text-[#ffb77c] transition-colors"
          >
            AURIA
          </a>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#ffb77c] tracking-[0.18em] pl-3 border-l border-[#534439]/40 uppercase">
            Acoustics
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-semibold tracking-widest uppercase text-[#c9c6c0]">
          <a
            href="#acoustics"
            className="text-[#ffb77c] hover:text-[#ffb77c] transition-colors duration-200"
          >
            Acoustics
          </a>
          <a
            href="#engineering"
            className="hover:text-[#ffb77c] transition-colors duration-200"
          >
            Engineering
          </a>
          <a
            href="#experience"
            className="hover:text-[#ffb77c] transition-colors duration-200"
          >
            Craft
          </a>
          <a
            href="#reviews"
            className="hover:text-[#ffb77c] transition-colors duration-200"
          >
            Reviews
          </a>
          <a
            href="#faq"
            className="hover:text-[#ffb77c] transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center space-x-5">
          <button
            type="button"
            aria-label="Search specifications and reviews"
            onClick={onOpenSearch}
            className="text-[#c9c6c0] hover:text-[#ffb77c] transition-colors p-2 cursor-pointer"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="View shopping cart"
            onClick={onOpenCart}
            className="text-[#c9c6c0] hover:text-[#ffb77c] transition-colors relative p-2 cursor-pointer"
          >
            <ShoppingBag size={18} />
            <span className="absolute top-0.5 right-0.5 text-[10px] font-mono font-bold bg-[#c9803f] text-[#432100] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
          <a
            href="#checkout"
            className="hidden sm:inline-flex items-center justify-center bg-[#ffb77c] text-[#4d2700] text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-[#c9803f] hover:text-[#432100] active:scale-[0.99] transition-all duration-150"
          >
            Pre-Order
          </a>
        </div>
      </header>
    </>
  );
};
