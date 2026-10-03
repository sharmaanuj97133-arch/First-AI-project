/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Lock,
  Headphones,
  Sliders,
  Volume2,
  VolumeX,
  BatteryCharging,
  Zap,
  Mic,
  Activity,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag,
  Info,
  Maximize2
} from 'lucide-react';
import { TopNav } from './components/TopNav';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ReviewModal } from './components/ReviewModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { SpatialAudioModal } from './components/SpatialAudioModal';
import {
  MODES_DATA,
  HOTLINKED_IMAGES,
  COLOR_OPTIONS,
  TESTIMONIALS_DATA,
  FAQS_DATA,
  BOX_CONTENTS
} from './data/auriaData';
import { audioSynth } from './utils/audioSynth';

export default function App() {
  // Navigation & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSpatialModalOpen, setIsSpatialModalOpen] = useState(false);

  // Lightbox State
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    handle: string;
    caption: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    handle: '',
    caption: ''
  });

  // Cart & Order State
  const [cartCount, setCartCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [promoCode, setPromoCode] = useState('AURIA500');
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Section States
  const [activeModeKey, setActiveModeKey] = useState<string>('music');
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [isPlayingModeAudio, setIsPlayingModeAudio] = useState(false);
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS_DATA);
  const [activeReviewFilter, setActiveReviewFilter] = useState<'All' | 'Studio' | 'Travel' | 'Everyday'>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'AURIA500') {
      setPromoCode('AURIA500');
      setIsPromoApplied(true);
      showToast('Offer Applied: Extra ₹500 OFF + Free Shipping!');
    }
  };

  const handleAddToCart = () => {
    if (cartCount === 0) {
      setCartCount(1);
    }
    setIsCartOpen(true);
    showToast('AURIA Wireless added to acoustic bag.');
  };

  const handleDirectBuy = () => {
    if (cartCount === 0) {
      setCartCount(1);
    }
    setIsCheckoutOpen(true);
  };

  const handleToggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handlePlayModeAudio = () => {
    if (isPlayingModeAudio) {
      audioSynth.stop();
      setIsPlayingModeAudio(false);
    } else {
      audioSynth.playProfile(activeModeKey, 4);
      setIsPlayingModeAudio(true);
      setTimeout(() => {
        setIsPlayingModeAudio(false);
      }, 4000);
    }
  };

  const handleAddReview = (newRev: {
    quote: string;
    text: string;
    author: string;
    location: string;
    rating: number;
    tag: string;
  }) => {
    const fullReview = {
      ...newRev,
      badge: 'Verified Buyer'
    };
    setReviewsList([fullReview, ...reviewsList]);
    showToast('Your review has been verified & published.');
  };

  const handleOpenLightbox = (imageUrl: string, title: string, handle: string, caption: string) => {
    setLightboxData({
      isOpen: true,
      imageUrl,
      title,
      handle,
      caption
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      showToast('Welcome to the AURIA Listening Club.');
      setNewsletterEmail('');
    }
  };

  const activeMode = MODES_DATA[activeModeKey] || MODES_DATA.music;

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeReviewFilter === 'All') return true;
    if (activeReviewFilter === 'Studio') return rev.tag.includes('Studio');
    if (activeReviewFilter === 'Travel') return rev.tag.includes('Travel');
    if (activeReviewFilter === 'Everyday') return rev.tag.includes('Everyday') || rev.tag.includes('Daily');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#121315] text-[#e3e2e5] font-sans antialiased selection:bg-[#c9803f] selection:text-[#432100]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1b1c1e] text-[#e3e2e5] border border-[#ffb77c] px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-mono">
          <Sparkles size={16} className="text-[#ffb77c] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Announcement Bar */}
      <TopNav
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onApplyPromo={handleApplyPromo}
        hasAppliedPromo={isPromoApplied}
      />

      <main>
        {/* 3. HERO SECTION (Refined Off-White Section) */}
        <section className="bg-[#FAF8F5] text-[#121315] pt-12 pb-16 lg:py-24 border-b border-[#E3DFD5]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFECE4] border border-[#DDD8CD] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C57D3C]"></span>
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#534439]">
                  NEW GENERATION WIRELESS AUDIO
                </span>
              </div>

              <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B0C0E] leading-[1.08]">
                Hear more.
                <br />
                Feel everything.
              </h1>

              <p className="text-base sm:text-lg text-[#474742] max-w-lg leading-relaxed">
                Premium wireless headphones engineered for immersive sound, everyday comfort and
                effortless listening.
              </p>

              {/* Social Proof micro-card */}
              <div className="inline-flex items-center gap-3 p-3 bg-white border border-[#E3DFD5] shadow-sm w-fit">
                <div className="text-[#C57D3C] text-sm tracking-wider font-semibold">★★★★★</div>
                <div className="text-xs font-mono font-medium text-[#31312C] border-l border-[#DDD8CD] pl-3">
                  4.9/5 • 2,000+ verified customers
                </div>
              </div>

              {/* Color Finish Picker */}
              <div className="pt-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#534439]">
                    Selected Finish:
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0B0C0E]">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`group flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-all cursor-pointer ${
                        selectedColor.id === c.id
                          ? 'border-[#0B0C0E] bg-white text-[#0B0C0E] font-bold shadow-xs'
                          : 'border-[#DDD8CD] bg-[#FAF8F5] text-[#534439] hover:border-[#8E9197]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing block */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-syne text-3xl sm:text-4xl font-bold text-[#0B0C0E]">
                  ₹2,999
                </span>
                <span className="text-lg line-through text-[#8E9197] font-mono">₹5,999</span>
                <span className="px-2.5 py-0.5 bg-[#C57D3C]/15 text-[#8C4F10] text-[11px] font-semibold tracking-wider uppercase border border-[#C57D3C]/30">
                  50% OFF
                </span>
              </div>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleDirectBuy}
                  className="inline-flex items-center justify-center gap-3 bg-[#0B0C0E] text-[#F5F2EB] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#C57D3C] hover:text-[#0B0C0E] transition-all duration-200 cursor-pointer"
                >
                  <span>BUY NOW</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#acoustics"
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#0B0C0E]/30 text-[#0B0C0E] text-xs font-bold uppercase tracking-widest hover:border-[#0B0C0E] hover:bg-[#0B0C0E]/5 transition-all text-center"
                >
                  EXPLORE FEATURES
                </a>
              </div>

              {/* Trust micro-row */}
              <div className="pt-3 flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#534439] font-medium border-t border-[#E3DFD5]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#C57D3C] font-bold">✓</span> 1-Year Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#C57D3C] font-bold">✓</span> Free Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#C57D3C] font-bold">✓</span> 7-Day Replacement
                </span>
              </div>
            </div>

            {/* Right Column (Hero Product Visual) */}
            <div className="lg:col-span-6 flex justify-center items-center relative group">
              <div className="w-full max-w-lg aspect-square relative flex items-center justify-center overflow-hidden">
                <img
                  src={HOTLINKED_IMAGES.heroProduct}
                  alt="AURIA Wireless Headphones in pristine studio setting"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRUST STRIP */}
        <section className="bg-[#0d0e10] border-b border-[#534439]/20 py-8">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#534439]/20">
            <div className="flex items-center gap-4 pt-4 md:pt-0">
              <Truck size={28} className="text-[#ffb77c] shrink-0" />
              <div>
                <h4 className="font-syne text-sm font-semibold text-[#e3e2e5]">Free Shipping</h4>
                <p className="text-xs text-[#c9c6c0]">All India express delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <RotateCcw size={28} className="text-[#ffb77c] shrink-0" />
              <div>
                <h4 className="font-syne text-sm font-semibold text-[#e3e2e5]">
                  7-Day Replacement
                </h4>
                <p className="text-xs text-[#c9c6c0]">Hassle-free direct swaps</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <Shield size={28} className="text-[#ffb77c] shrink-0" />
              <div>
                <h4 className="font-syne text-sm font-semibold text-[#e3e2e5]">1-Year Warranty</h4>
                <p className="text-xs text-[#c9c6c0]">Comprehensive doorstep cover</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <Lock size={28} className="text-[#ffb77c] shrink-0" />
              <div>
                <h4 className="font-syne text-sm font-semibold text-[#e3e2e5]">Secure Payment</h4>
                <p className="text-xs text-[#c9c6c0]">256-bit encrypted checkout</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PRODUCT FEATURES ("Why you'll love it") */}
        <section className="py-20 bg-[#121315] border-b border-[#534439]/20" id="acoustics">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block mb-2">
                ACOUSTIC SPECIFICATIONS
              </span>
              <h2 className="font-syne text-3xl md:text-4xl font-bold text-[#e3e2e5]">
                Why you&apos;ll love it.
              </h2>
              <p className="text-sm md:text-base text-[#c9c6c0] mt-2">
                Precision engineering meeting everyday luxury.
              </p>
            </div>

            {/* Showcase Layout with 5 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Card 1 */}
              <div className="bg-[#1f2022] border border-[#534439]/20 p-6 flex flex-col justify-between hover:border-[#ffb77c]/40 transition-colors">
                <Sliders size={32} className="text-[#ffb77c] mb-4" />
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-2">
                    40mm Dynamic Drivers
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0]">
                    Custom biocellulose diaphragm for articulate bass and pristine highs without
                    harmonic clipping.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#534439]/20 text-[11px] font-mono text-[#ffb77c]">
                  20Hz - 20kHz
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1f2022] border border-[#534439]/20 p-6 flex flex-col justify-between hover:border-[#ffb77c]/40 transition-colors">
                <Volume2 size={32} className="text-[#ffb77c] mb-4" />
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-2">
                    Active Noise Cancellation
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0]">
                    Hybrid ANC with inverted phase cancellation, blocking up to 38dB of ambient
                    noise.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#534439]/20 text-[11px] font-mono text-[#ffb77c]">
                  -38dB DAMPING
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1f2022] border border-[#534439]/20 p-6 flex flex-col justify-between hover:border-[#ffb77c]/40 transition-colors">
                <BatteryCharging size={32} className="text-[#ffb77c] mb-4" />
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-2">
                    Long Battery Life
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0]">
                    Up to 50 hours of uninterrupted playback. 10 minutes of fast USB-C charge yields
                    5 hours.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#534439]/20 text-[11px] font-mono text-[#ffb77c]">
                  50H RESERVE
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1f2022] border border-[#534439]/20 p-6 flex flex-col justify-between hover:border-[#ffb77c]/40 transition-colors">
                <Zap size={32} className="text-[#ffb77c] mb-4" />
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-2">
                    Low Latency
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0]">
                    Ultra-fast 40ms gaming and media mode eliminates lip-sync delay seamlessly.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#534439]/20 text-[11px] font-mono text-[#ffb77c]">
                  &lt;40MS DELAY
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-[#1f2022] border border-[#534439]/20 p-6 flex flex-col justify-between hover:border-[#ffb77c]/40 transition-colors">
                <Mic size={32} className="text-[#ffb77c] mb-4" />
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-2">
                    Clear AI Calls
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0]">
                    Quad-beamforming microphone array with environmental neural noise suppression.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#534439]/20 text-[11px] font-mono text-[#ffb77c]">
                  ENC QUAD-MIC
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. IMMERSIVE PRODUCT SECTION (Full-bleed obsidian dark #0B0C0E) */}
        <section className="bg-[#0d0e10] text-[#e3e2e5] py-24 md:py-32 border-b border-[#534439]/20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold tracking-widest text-[#ffb77c] uppercase mb-4">
              SPATIAL IMMERSION
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl tracking-widest uppercase font-extrabold max-w-4xl text-[#e3e2e5]">
              SOUND THAT SURROUNDS YOU.
            </h2>
            <p className="text-sm md:text-base text-[#c9c6c0] max-w-2xl mt-6 leading-relaxed">
              Crafted to vanish on your head while placing you directly inside the acoustic stage.
              Every note, breathe, and instrument rendered in intimate spatial clarity.
            </p>

            {/* Cinematic Large Anchor Asset */}
            <div className="w-full max-w-5xl mt-12 border border-[#534439]/20 bg-[#1b1c1e] p-2 relative group">
              <img
                src={HOTLINKED_IMAGES.surroundCinematic}
                alt="AURIA Pro headphones resting on textured dark stone surface with warm ambient lighting"
                className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setIsSpatialModalOpen(true)}
                className="absolute bottom-6 right-6 bg-[#0B0C0E]/90 hover:bg-[#ffb77c] hover:text-[#0B0C0E] border border-[#534439]/40 text-[#e3e2e5] text-xs font-mono uppercase px-4 py-2 flex items-center gap-2 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <Sparkles size={14} className="text-[#ffb77c] group-hover:text-[#0B0C0E]" />
                <span>Audition Spatial Stage</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. EXPERIENCE SELECTOR ("Built for the way you listen") */}
        <section className="py-20 bg-[#121315] border-b border-[#534439]/20" id="experience">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-10">
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest">
                ADAPTIVE DSP
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5] mt-1">
                Built for the way you listen.
              </h2>
            </div>

            {/* 5 Interactive Mode Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {(['music', 'gaming', 'travel', 'work', 'fitness'] as const).map((modeKey) => {
                const isActive = activeModeKey === modeKey;
                return (
                  <button
                    key={modeKey}
                    type="button"
                    onClick={() => {
                      setActiveModeKey(modeKey);
                      if (isPlayingModeAudio) {
                        audioSynth.playProfile(modeKey, 4);
                      }
                    }}
                    className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#ffb77c] bg-[#ffb77c] text-[#4d2700] font-bold'
                        : 'border-[#534439]/30 text-[#c9c6c0] hover:border-[#a08d80]'
                    }`}
                  >
                    {modeKey}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Card Display Container */}
            <div className="bg-[#1f2022] border border-[#534439]/20 p-8 md:p-12 transition-all">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block">
                    {activeMode.tag}
                  </span>
                  <h3 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5]">
                    {activeMode.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#c9c6c0] leading-relaxed">
                    {activeMode.desc}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#534439]/20">
                    <div>
                      <div className="font-mono text-xs text-[#8e9197] uppercase">
                        {activeMode.m1Label}
                      </div>
                      <div className="font-syne text-sm font-semibold text-[#e3e2e5] mt-1">
                        {activeMode.m1Val}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#8e9197] uppercase">
                        {activeMode.m2Label}
                      </div>
                      <div className="font-syne text-sm font-semibold text-[#e3e2e5] mt-1">
                        {activeMode.m2Val}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#8e9197] uppercase">
                        {activeMode.m3Label}
                      </div>
                      <div className="font-syne text-sm font-semibold text-[#e3e2e5] mt-1">
                        {activeMode.m3Val}
                      </div>
                    </div>
                  </div>

                  {/* Sound Sample Trigger */}
                  <div className="pt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handlePlayModeAudio}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#292a2c] hover:bg-[#343537] text-xs font-mono text-[#ffb77c] border border-[#534439]/30 transition-colors cursor-pointer"
                    >
                      <Volume2 size={16} className={isPlayingModeAudio ? 'animate-bounce' : ''} />
                      <span>{isPlayingModeAudio ? 'Playing Frequency Demo...' : 'Audition Profile Sound'}</span>
                    </button>
                    <span className="text-[11px] text-[#8e9197]">
                      {activeMode.freqProfile}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-[#292a2c] border border-[#534439]/20 text-center">
                  <Headphones size={72} className="text-[#ffb77c] mb-3" />
                  <span className="font-mono text-xs text-[#c9c6c0] uppercase tracking-wider">
                    AURIA DSP ENGINE
                  </span>
                  <span className="text-[10px] text-[#8e9197] mt-1">
                    Active Tuning: {activeModeKey.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SOCIAL PROOF ("Loved by people who listen") */}
        <section className="py-20 bg-[#1b1c1e] border-b border-[#534439]/20" id="reviews">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            {/* Summary Header Banner */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-12 border-b border-[#534439]/20 gap-4">
              <div>
                <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5]">
                  Loved by people who listen.
                </h2>
                <p className="text-sm text-[#c9c6c0] mt-1">
                  Verified audiophile feedback from across the subcontinent.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-3 bg-[#1f2022] px-5 py-3 border border-[#534439]/30">
                  <span className="text-[#ffb77c] text-xl">★★★★★</span>
                  <span className="text-xs font-semibold text-[#e3e2e5]">
                    4.9 out of 5 stars based on 2,140 verified owners
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-3 bg-[#292a2c] hover:bg-[#343537] text-xs font-semibold uppercase tracking-wider text-[#ffb77c] border border-[#534439]/40 cursor-pointer transition-colors"
                >
                  Write Review
                </button>
              </div>
            </div>

            {/* 3 High Credibility Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReviews.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f2022] border border-[#534439]/20 p-8 flex flex-col justify-between hover:border-[#ffb77c]/30 transition-colors"
                >
                  <div>
                    <div className="text-[#ffb77c] text-sm tracking-widest mb-3">★★★★★</div>
                    <h3 className="font-syne text-base font-semibold text-[#e3e2e5] mb-3">
                      &quot;{item.quote}&quot;
                    </h3>
                    <p className="text-xs leading-relaxed text-[#c9c6c0]">{item.text}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-[#534439]/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#e3e2e5]">{item.author}</div>
                      <div className="font-mono text-[11px] text-[#ffb77c]">
                        {item.location} — {item.badge}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#8e9197] px-2 py-0.5 border border-[#534439]/30">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. COMMUNITY ARCHIVE ("Hear it. Wear it. Share it.") */}
        <section className="py-20 bg-[#121315] border-b border-[#534439]/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest">
                  COMMUNITY ARCHIVE
                </span>
                <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5] mt-1">
                  Hear it. Wear it. Share it.
                </h2>
              </div>
              <p className="text-xs text-[#c9c6c0] mt-2 md:mt-0">
                Tag <span className="text-[#ffb77c] font-mono font-medium">@auriasound</span> to be
                featured in the collective.
              </p>
            </div>

            {/* 4-tile grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Tile 1 */}
              <div
                onClick={() =>
                  handleOpenLightbox(
                    HOTLINKED_IMAGES.community1,
                    'Studio desk setup',
                    '@kabir.audio',
                    'A stylish young man working at an uncluttered modern mahogany desk with AURIA dark minimalist wireless headphones resting on his neck, warm soft architectural lighting.'
                  )
                }
                className="group relative aspect-square bg-[#1f2022] overflow-hidden border border-[#534439]/20 cursor-pointer"
              >
                <img
                  src={HOTLINKED_IMAGES.community1}
                  alt="A stylish young man working at an uncluttered modern mahogany desk with AURIA headphones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0e10]/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="font-mono text-xs text-[#ffb77c]">@kabir.audio</span>
                  <span className="text-xs text-[#e3e2e5]">Studio desk setup</span>
                </div>
              </div>

              {/* Tile 2 */}
              <div
                onClick={() =>
                  handleOpenLightbox(
                    HOTLINKED_IMAGES.community2,
                    'Modern gallery session',
                    '@tanya_sound',
                    'A woman in an architectural concrete art museum wearing sleek obsidian over-ear headphones while observing an installation.'
                  )
                }
                className="group relative aspect-square bg-[#1f2022] overflow-hidden border border-[#534439]/20 cursor-pointer"
              >
                <img
                  src={HOTLINKED_IMAGES.community2}
                  alt="A woman in an architectural concrete art museum wearing sleek obsidian over-ear headphones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0e10]/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="font-mono text-xs text-[#ffb77c]">@tanya_sound</span>
                  <span className="text-xs text-[#e3e2e5]">Modern gallery session</span>
                </div>
              </div>

              {/* Tile 3 */}
              <div
                onClick={() =>
                  handleOpenLightbox(
                    HOTLINKED_IMAGES.community3,
                    'Transit acoustic sanctuary',
                    '@vikram_v',
                    'A creative professional sitting in a twilight commuter train with reflections on window glass, wearing matte black wireless headphones.'
                  )
                }
                className="group relative aspect-square bg-[#1f2022] overflow-hidden border border-[#534439]/20 cursor-pointer"
              >
                <img
                  src={HOTLINKED_IMAGES.community3}
                  alt="A creative professional sitting in a commuter train wearing AURIA headphones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0e10]/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="font-mono text-xs text-[#ffb77c]">@vikram_v</span>
                  <span className="text-xs text-[#e3e2e5]">Transit acoustic sanctuary</span>
                </div>
              </div>

              {/* Tile 4 */}
              <div
                onClick={() =>
                  handleOpenLightbox(
                    HOTLINKED_IMAGES.community4,
                    'Everyday acoustic carry',
                    '@designmonk',
                    'Macro flat-lay still life of AURIA headphones placed beside an analog Leica camera and hardbound architectural monograph notebook on dark slate stone.'
                  )
                }
                className="group relative aspect-square bg-[#1f2022] overflow-hidden border border-[#534439]/20 cursor-pointer"
              >
                <img
                  src={HOTLINKED_IMAGES.community4}
                  alt="Macro flat-lay still life of AURIA headphones placed beside an analog Leica camera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0e10]/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="font-mono text-xs text-[#ffb77c]">@designmonk</span>
                  <span className="text-xs text-[#e3e2e5]">Everyday acoustic carry</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. BRAND STORY (Full-bleed charcoal/dark section) */}
        <section className="py-24 bg-[#0E0F12] border-b border-[#534439]/20">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="max-w-3xl mb-16">
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block mb-2">
                MANIFESTO
              </span>
              <h2 className="font-syne text-3xl md:text-5xl text-[#e3e2e5] font-semibold leading-tight">
                We didn&apos;t build another pair of headphones.
              </h2>
              <p className="text-base md:text-lg text-[#c9c6c0] mt-4 leading-relaxed">
                We set out to engineer an heirloom acoustic instrument tailored for modern Indian
                audio sensibilities—unforgiving fidelity, resilient ergonomics, and quiet physical
                poise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#534439]/20">
              <div>
                <span className="font-mono text-[#ffb77c] text-xs font-semibold">01 / ACOUSTICS</span>
                <h3 className="font-syne text-lg text-[#e3e2e5] mt-2 mb-2 font-semibold">
                  Sound First
                </h3>
                <p className="text-xs leading-relaxed text-[#c9c6c0]">
                  Tuned for organic warmth, deep low-frequency control, and crisp high registers
                  without artificial digital colorization or synthetic treble spikes.
                </p>
              </div>

              <div>
                <span className="font-mono text-[#ffb77c] text-xs font-semibold">02 / ERGONOMICS</span>
                <h3 className="font-syne text-lg text-[#e3e2e5] mt-2 mb-2 font-semibold">
                  Designed for Everyday Life
                </h3>
                <p className="text-xs leading-relaxed text-[#c9c6c0]">
                  Ultralight anodized aluminum headband balanced for 0g hot-spot pressure. CloudFoam™
                  cushions adapt gracefully to ear contours.
                </p>
              </div>

              <div>
                <span className="font-mono text-[#ffb77c] text-xs font-semibold">
                  03 / SUSTAINABILITY
                </span>
                <h3 className="font-syne text-lg text-[#e3e2e5] mt-2 mb-2 font-semibold">
                  Built to Last
                </h3>
                <p className="text-xs leading-relaxed text-[#c9c6c0]">
                  Engineered with modular replaceable ear cushions and aerospace-grade structural
                  components to reject planned obsolescence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. PRODUCT ENGINEERING (Split-screen layout) */}
        <section className="py-20 bg-[#121315] border-b border-[#534439]/20" id="engineering">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: High detail angled crop */}
            <div className="lg:col-span-6 bg-[#0d0e10] border border-[#534439]/20 p-4">
              <img
                src={HOTLINKED_IMAGES.macroEngineering}
                alt="Macro detail of AURIA acoustic earcup and precision machined brushed copper mechanical swivel"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: Engineered for your everyday */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest">
                  TACTILE RIGOR
                </span>
                <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5] mt-1">
                  Engineered for your everyday.
                </h2>
              </div>

              <div className="space-y-6 divide-y divide-[#534439]/20">
                <div className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#ffb77c] font-bold">01 / SOUND</span>
                    <span className="font-mono text-xs text-[#c9c6c0]">40mm BioCell</span>
                  </div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5]">
                    Custom-Calibrated Diaphragms
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0] mt-1">
                    Biocellulose composite provides rapid transient response and deep sub-bass
                    reproduction without distortion.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#ffb77c] font-bold">02 / COMFORT</span>
                    <span className="font-mono text-xs text-[#c9c6c0]">CloudFoam™</span>
                  </div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5]">
                    Protein Leather Earcups
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0] mt-1">
                    Breathable memory foam creates a firm acoustic seal while minimizing clamp
                    fatigue over long working days.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#ffb77c] font-bold">03 / BATTERY</span>
                    <span className="font-mono text-xs text-[#c9c6c0]">50h Reserve</span>
                  </div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5]">
                    Rapid Endurance Power
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0] mt-1">
                    50 hours playback on a single charge. 10 minutes of quick USB-C top-up delivers
                    5 hours of full audio playback.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#ffb77c] font-bold">04 / CALLS</span>
                    <span className="font-mono text-xs text-[#c9c6c0]">Neural ENC</span>
                  </div>
                  <h3 className="font-syne text-base font-semibold text-[#e3e2e5]">
                    Quad-Mic Beamforming Array
                  </h3>
                  <p className="text-xs leading-relaxed text-[#c9c6c0] mt-1">
                    Algorithmic noise suppression separates your natural vocal frequencies from loud
                    café hum and traffic wind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. WHAT'S IN THE BOX */}
        <section className="py-20 bg-[#FAF8F5] text-[#121315] border-b border-[#E3DFD5]" id="box">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[11px] font-semibold text-[#C57D3C] uppercase tracking-widest block mb-2">
                COMPLETE ECOSYSTEM
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#0B0C0E]">
                What&apos;s in the box.
              </h2>
              <p className="text-xs md:text-sm text-[#474742] mt-2">
                Every component thoughtfully crafted and packaged in zero-plastic recyclable unboxing
                material.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 bg-white p-8 border border-[#E3DFD5] flex items-center justify-center">
                <img
                  src={HOTLINKED_IMAGES.boxImage}
                  alt="AURIA Wireless Headphones in box packaging preview"
                  className="w-full max-h-80 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="lg:col-span-7">
                <ul className="divide-y divide-[#E3DFD5] border-y border-[#E3DFD5]">
                  {BOX_CONTENTS.map((item) => (
                    <li key={item.num} className="py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#C57D3C] font-semibold">
                          {item.num}
                        </span>
                        <span className="font-syne text-base text-[#0B0C0E] font-medium">
                          {item.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#8E9197]">{item.spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 13. ACCORDION FAQ */}
        <section className="py-20 bg-[#121315] border-b border-[#534439]/20" id="faq">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-12">
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest">
                TRANSPARENCY
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#e3e2e5] mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3" id="faq-accordion">
              {FAQS_DATA.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="border border-[#534439]/20 bg-[#1f2022]">
                    <button
                      type="button"
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between text-[#e3e2e5] font-syne text-base font-semibold cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-[#ffb77c]">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs text-[#c9c6c0] leading-relaxed border-t border-[#534439]/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 14. FINAL PURCHASE CONVERSION CTA */}
        <section
          className="py-24 bg-[#0d0e10] text-[#e3e2e5] border-b border-[#534439]/20 relative"
          id="checkout"
        >
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-[11px] font-semibold tracking-widest text-[#ffb77c] uppercase mb-3 block">
              AUDIOPHILE STANDARD
            </span>
            <h2 className="font-syne text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#e3e2e5]">
              Your playlist deserves better.
            </h2>
            <p className="text-base md:text-lg text-[#c9c6c0] mt-4 max-w-xl mx-auto">
              Premium sound. Everywhere you go.
            </p>

            {/* Price Display */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-syne text-4xl font-bold text-[#e3e2e5]">₹2,999</span>
              <span className="text-base text-[#8e9197] line-through font-mono">₹5,999</span>
              <span className="px-3 py-1 bg-[#ffb77c]/20 text-[#ffb77c] text-xs font-mono border border-[#ffb77c]/40 font-semibold">
                SAVE 50%
              </span>
            </div>

            {/* Big CTA Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full sm:w-auto px-12 py-5 bg-[#F5F2EB] text-[#0B0C0E] hover:bg-[#c9803f] hover:text-[#432100] text-sm tracking-widest uppercase font-bold transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-xl active:scale-[0.99]"
              >
                <span>BUY NOW — ₹2,999</span>
                <ShoppingBag size={18} />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#c9c6c0] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="text-[#ffb77c] font-bold">●</span> Free Express Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#ffb77c] font-bold">●</span> 7-Day Hassle-Free Replacement
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#ffb77c] font-bold">●</span> 1-Year Warranty
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* 15. FOOTER */}
      <footer className="w-full px-6 md:px-10 lg:px-20 py-16 border-t border-[#534439]/20 bg-[#0d0e10]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="font-syne text-2xl font-bold tracking-widest uppercase text-[#e3e2e5]"
            >
              AURIA
            </a>
            <p className="text-xs text-[#c9c6c0] max-w-sm leading-relaxed">
              Acoustic laboratories pioneering high-fidelity wireless audio architecture in India.
            </p>

            {/* Newsletter Subscribe */}
            <div className="pt-4">
              <label
                htmlFor="footer-newsletter"
                className="block text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest mb-2"
              >
                Join the AURIA Listening Club
              </label>
              {newsletterSubscribed ? (
                <div className="p-3 bg-[#1f2022] border border-[#ffb77c]/40 text-xs text-[#ffb77c] font-mono">
                  ✓ You are subscribed to the AURIA Listening Club dispatch.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-md">
                  <input
                    id="footer-newsletter"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#1f2022] text-[#e3e2e5] placeholder:text-[#8e9197] text-xs px-4 py-3 border border-[#534439]/30 focus:border-[#ffb77c] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#ffb77c] text-[#4d2700] text-xs font-bold px-5 py-3 tracking-widest uppercase hover:bg-[#c9803f] cursor-pointer shrink-0 transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block mb-4">
                Shop
              </span>
              <ul className="space-y-2.5 text-xs text-[#c9c6c0]">
                <li>
                  <a href="#acoustics" className="hover:text-[#ffb77c] transition-colors">
                    Headphones
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-[#ffb77c] transition-colors">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#engineering" className="hover:text-[#ffb77c] transition-colors">
                    Replacement Cushions
                  </a>
                </li>
                <li>
                  <a href="#checkout" className="hover:text-[#ffb77c] transition-colors">
                    Special Editions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block mb-4">
                Support
              </span>
              <ul className="space-y-2.5 text-xs text-[#c9c6c0]">
                <li>
                  <a href="#faq" className="hover:text-[#ffb77c] transition-colors">
                    Warranty Registration
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#ffb77c] transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#ffb77c] transition-colors">
                    Replacement Policy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#ffb77c] transition-colors">
                    Acoustic Whitepaper
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#ffb77c] uppercase tracking-widest block mb-4">
                Company
              </span>
              <ul className="space-y-2.5 text-xs text-[#c9c6c0]">
                <li>
                  <a href="#engineering" className="hover:text-[#ffb77c] transition-colors">
                    Bespoke Acoustics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffb77c] transition-colors">
                    Architectural Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffb77c] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffb77c] transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Badges & Copyright */}
        <div className="max-w-7xl mx-auto w-full pt-8 border-t border-[#534439]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8e9197] text-center md:text-left">
            © 2025 AURIA Acoustic Laboratories Pvt. Ltd. All rights reserved. Precision engineered in
            India.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] font-mono text-[#c9c6c0]">
            <span className="px-2 py-1 bg-[#1f2022] border border-[#534439]/30">VISA</span>
            <span className="px-2 py-1 bg-[#1f2022] border border-[#534439]/30">MASTERCARD</span>
            <span className="px-2 py-1 bg-[#1f2022] border border-[#534439]/30">UPI</span>
            <span className="px-2 py-1 bg-[#1f2022] border border-[#534439]/30">RUPAY</span>
            <span className="px-2 py-1 bg-[#1f2022] border border-[#534439]/30">256-BIT SSL</span>
          </div>
        </div>
      </footer>

      {/* RESPONSIVE STICKY MOBILE BOTTOM PURCHASE BAR */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#292a2c]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-2xl border-t border-[#534439]/30">
        <div>
          <div className="font-syne text-xs font-bold text-[#e3e2e5]">AURIA Wireless</div>
          <div className="font-mono text-xs text-[#ffb77c] font-semibold">
            ₹2,999 <span className="line-through text-[#8e9197] ml-1 font-normal">₹5,999</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDirectBuy}
          className="bg-[#ffb77c] text-[#4d2700] text-xs px-5 py-2.5 uppercase tracking-widest font-bold cursor-pointer"
        >
          BUY NOW
        </button>
      </aside>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        quantity={cartCount}
        selectedColorName={selectedColor.name}
        onUpdateQuantity={(qty) => setCartCount(qty)}
        promoCode={promoCode}
        isPromoApplied={isPromoApplied}
        onApplyPromo={handleApplyPromo}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Dialog */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        quantity={Math.max(1, cartCount)}
        selectedColorName={selectedColor.name}
        isPromoApplied={isPromoApplied}
        onOrderComplete={() => {
          setCartCount(0);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAnchor={(anchor) => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        handle={lightboxData.handle}
        caption={lightboxData.caption}
      />

      {/* Spatial Audio Demonstration Modal */}
      <SpatialAudioModal
        isOpen={isSpatialModalOpen}
        onClose={() => setIsSpatialModalOpen(false)}
      />
    </div>
  );
}
