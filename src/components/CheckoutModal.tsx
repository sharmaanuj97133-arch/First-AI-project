import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Smartphone, Banknote, ArrowLeft, Copy, Check } from 'lucide-react';
import { HOTLINKED_IMAGES } from '../data/auriaData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  selectedColorName: string;
  isPromoApplied: boolean;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  quantity,
  selectedColorName,
  isPromoApplied,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Anuj Sharma',
    email: 'sharmaanuj97133@gmail.com',
    phone: '+91 98765 43210',
    address: '402, Signature Towers, Indiranagar 100ft Road',
    city: 'Bengaluru',
    pincode: '560038',
    paymentMethod: 'upi'
  });
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const unitPrice = 2999;
  const subtotal = unitPrice * quantity;
  const discount = isPromoApplied ? 500 : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AUR-${Math.floor(10000 + Math.random() * 90000)}-IN`;
    setOrderId(generatedId);
    setStep('success');
    onOrderComplete();
  };

  const handleCopy = () => {
    if (orderId) {
      navigator.clipboard?.writeText(orderId);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121315] border border-[#534439]/40 text-[#e3e2e5] shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#534439]/20 flex items-center justify-between sticky top-0 bg-[#121315]/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <span className="font-syne text-xl font-bold uppercase tracking-widest text-[#e3e2e5]">
              AURIA Encrypted Checkout
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#c57d3c] border border-[#c57d3c]/30 px-2 py-0.5">
              <Shield size={10} /> 256-BIT SSL
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#c9c6c0] hover:text-[#e3e2e5] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            {/* Order Brief Summary */}
            <div className="bg-[#1b1c1e] border border-[#534439]/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FAF8F5] p-1 border border-[#534439]/20 flex items-center justify-center">
                  <img
                    src={HOTLINKED_IMAGES.heroProduct}
                    alt="AURIA Headphones"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-syne text-xs font-semibold text-[#e3e2e5]">
                    AURIA Wireless ({quantity}x)
                  </h4>
                  <p className="text-[11px] font-mono text-[#c57d3c]">Finish: {selectedColorName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-syne text-base font-bold text-[#ffb77c]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-[#8e9197]">Includes all GST & Shipping</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4">
              <h3 className="font-syne text-sm font-semibold uppercase tracking-wider text-[#ffb77c] border-b border-[#534439]/20 pb-2">
                1. Delivery Destination (Express Insured Air)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                  Street Address & Landmark *
                </label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                    Postal PIN Code *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-syne text-sm font-semibold uppercase tracking-wider text-[#ffb77c] border-b border-[#534439]/20 pb-2">
                2. Select Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-3 border flex flex-col items-center text-center cursor-pointer transition-colors ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#ffb77c] bg-[#1b1c1e]'
                      : 'border-[#534439]/30 bg-[#121315] hover:border-[#534439]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className="sr-only"
                  />
                  <Smartphone size={20} className="text-[#ffb77c] mb-2" />
                  <span className="font-syne text-xs font-semibold">UPI Instant</span>
                  <span className="text-[10px] text-[#8e9197] mt-0.5">GPay / PhonePe / Paytm</span>
                </label>

                <label
                  className={`p-3 border flex flex-col items-center text-center cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#ffb77c] bg-[#1b1c1e]'
                      : 'border-[#534439]/30 bg-[#121315] hover:border-[#534439]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="sr-only"
                  />
                  <CreditCard size={20} className="text-[#ffb77c] mb-2" />
                  <span className="font-syne text-xs font-semibold">Cards / Netbanking</span>
                  <span className="text-[10px] text-[#8e9197] mt-0.5">Visa / Mastercard / RuPay</span>
                </label>

                <label
                  className={`p-3 border flex flex-col items-center text-center cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#ffb77c] bg-[#1b1c1e]'
                      : 'border-[#534439]/30 bg-[#121315] hover:border-[#534439]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="sr-only"
                  />
                  <Banknote size={20} className="text-[#ffb77c] mb-2" />
                  <span className="font-syne text-xs font-semibold">Cash on Delivery</span>
                  <span className="text-[10px] text-[#8e9197] mt-0.5">Doorstep payment</span>
                </label>
              </div>
            </div>

            {/* Submission */}
            <div className="pt-4 border-t border-[#534439]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#c9c6c0]">
                <span>Total Payable: </span>
                <span className="font-syne font-bold text-[#ffb77c] text-sm">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#ffb77c] hover:bg-[#c9803f] text-[#4d2700] hover:text-[#432100] text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"
              >
                Confirm & Place Order
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#c57d3c]/20 border border-[#c57d3c] flex items-center justify-center text-[#ffb77c]">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#c57d3c] uppercase tracking-widest">
                Acoustic Reserve Confirmed
              </span>
              <h3 className="font-syne text-2xl font-bold text-[#e3e2e5]">
                Thank you, {formData.name}
              </h3>
              <p className="text-xs text-[#c9c6c0] max-w-md mx-auto">
                Your AURIA order is now serialized and queued for express insured air dispatch to{' '}
                <strong className="text-[#e3e2e5]">{formData.city}</strong>.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="max-w-sm mx-auto p-4 bg-[#1b1c1e] border border-[#534439]/40 flex items-center justify-between">
              <div className="text-left">
                <span className="block text-[10px] font-mono text-[#8e9197] uppercase">
                  Shipment Tracking Code
                </span>
                <span className="font-mono text-sm font-bold text-[#ffb77c]">{orderId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 border border-[#534439]/40 hover:bg-[#292a2c] text-[#c9c6c0] hover:text-[#e3e2e5] transition-colors"
                title="Copy tracking code"
              >
                {copiedTracking ? <Check size={16} className="text-[#ffb77c]" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="text-xs text-[#8e9197] space-y-1">
              <p>Estimated Delivery: 2–3 Business Days</p>
              <p>1-Year Doorstep Warranty Certificate activated automatically.</p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="px-6 py-3 bg-[#e3e2e5] text-[#0B0C0E] hover:bg-[#ffb77c] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
