import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { HOTLINKED_IMAGES } from '../data/auriaData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  selectedColorName: string;
  onUpdateQuantity: (qty: number) => void;
  promoCode: string;
  isPromoApplied: boolean;
  onApplyPromo: (code: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  quantity,
  selectedColorName,
  onUpdateQuantity,
  promoCode,
  isPromoApplied,
  onApplyPromo,
  onProceedToCheckout
}) => {
  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const unitPrice = 2999;
  const originalPrice = 5999;
  const subtotal = unitPrice * quantity;
  const originalSubtotal = originalPrice * quantity;
  const promoDiscount = isPromoApplied && quantity > 0 ? 500 : 0;
  const total = Math.max(0, subtotal - promoDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (clean === 'AURIA500') {
      onApplyPromo(clean);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "AURIA500"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#121315] text-[#e3e2e5] border-l border-[#534439]/30 h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#534439]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-syne text-lg font-bold uppercase tracking-wider text-[#e3e2e5]">
              Acoustic Bag
            </span>
            <span className="text-xs font-mono text-[#c57d3c] px-2 py-0.5 border border-[#c57d3c]/30">
              {quantity} {quantity === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#c9c6c0] hover:text-[#e3e2e5] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {quantity === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto border border-[#534439]/40 flex items-center justify-center text-[#c57d3c]">
                <Tag size={28} />
              </div>
              <p className="font-syne text-lg text-[#e3e2e5]">Your acoustic bag is empty</p>
              <p className="text-xs text-[#c9c6c0] max-w-xs mx-auto">
                Select your preferred finish and experience the next generation of precision audio.
              </p>
              <button
                type="button"
                onClick={() => onUpdateQuantity(1)}
                className="mt-4 px-6 py-3 bg-[#ffb77c] text-[#4d2700] text-xs font-bold uppercase tracking-widest hover:bg-[#c9803f]"
              >
                Add 1x AURIA Wireless
              </button>
            </div>
          ) : (
            <div className="border border-[#534439]/30 bg-[#1b1c1e] p-4 flex gap-4">
              {/* Product Thumbnail */}
              <div className="w-24 h-24 bg-[#FAF8F5] border border-[#534439]/20 flex items-center justify-center p-2 shrink-0">
                <img
                  src={HOTLINKED_IMAGES.heroProduct}
                  alt="AURIA Wireless Headphones"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-syne text-sm font-semibold text-[#e3e2e5]">
                      AURIA Wireless
                    </h4>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(0)}
                      className="text-[#8e9197] hover:text-[#ffb4ab] transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-[#c57d3c] mt-0.5">
                    Finish: {selectedColorName}
                  </p>
                  <p className="text-[11px] text-[#8e9197]">40mm BioCell • Hybrid ANC</p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#534439]/20">
                  <div className="flex items-center border border-[#534439]/40 bg-[#121315]">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                      className="p-1 px-2 text-[#c9c6c0] hover:text-[#e3e2e5]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-mono text-xs px-2 text-[#e3e2e5]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(quantity + 1)}
                      className="p-1 px-2 text-[#c9c6c0] hover:text-[#e3e2e5]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="font-syne font-bold text-sm text-[#e3e2e5]">
                      ₹{(unitPrice * quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-[#8e9197] line-through font-mono">
                      ₹{(originalPrice * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promo Code Form */}
          {quantity > 0 && (
            <div className="border border-[#534439]/20 bg-[#1b1c1e] p-4">
              <label htmlFor="cart-promo-input" className="block text-[11px] uppercase tracking-widest text-[#c57d3c] font-semibold mb-2">
                Promotional Code
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  id="cart-promo-input"
                  type="text"
                  placeholder="Enter AURIA500"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 bg-[#121315] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] uppercase font-mono tracking-wider focus:outline-none focus:border-[#ffb77c]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#292a2c] text-[#e3e2e5] text-xs font-semibold uppercase tracking-wider hover:bg-[#343537] border border-[#534439]/30"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-[#ffb4ab] mt-1.5">{promoError}</p>}
              {isPromoApplied && (
                <div className="flex items-center justify-between text-xs text-[#ffb77c] mt-2 pt-2 border-t border-[#534439]/20">
                  <span>Code {promoCode} applied</span>
                  <span className="font-mono font-bold">-₹500</span>
                </div>
              )}
            </div>
          )}

          {/* Quick Perks in Cart */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#c9c6c0]">
            <div className="flex items-center gap-2 p-2.5 bg-[#1b1c1e] border border-[#534439]/20">
              <Truck size={14} className="text-[#c57d3c] shrink-0" />
              <span>Free Express Delivery</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-[#1b1c1e] border border-[#534439]/20">
              <ShieldCheck size={14} className="text-[#c57d3c] shrink-0" />
              <span>1-Year Direct Cover</span>
            </div>
          </div>
        </div>

        {/* Footer & Checkout Action */}
        {quantity > 0 && (
          <div className="p-6 border-t border-[#534439]/20 bg-[#1b1c1e] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8e9197]">
                <span>Base MRP</span>
                <span className="line-through font-mono">
                  ₹{originalSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#e3e2e5]">
                <span>Launch Direct Pricing</span>
                <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {isPromoApplied && (
                <div className="flex justify-between text-[#ffb77c]">
                  <span>Launch Coupon (AURIA500)</span>
                  <span className="font-mono">-₹500</span>
                </div>
              )}
              <div className="flex justify-between text-[#e3e2e5]">
                <span>Insured Express Shipping</span>
                <span className="font-mono text-[#ffb77c]">FREE</span>
              </div>
              <div className="pt-2 border-t border-[#534439]/20 flex justify-between items-baseline font-syne text-base font-bold text-[#e3e2e5]">
                <span>Grand Total</span>
                <span className="text-lg text-[#ffb77c] font-mono">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-[#ffb77c] hover:bg-[#c9803f] text-[#4d2700] hover:text-[#432100] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-center text-[#8e9197] font-mono">
              256-Bit Encrypted • UPI / Cards / COD Supported
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
