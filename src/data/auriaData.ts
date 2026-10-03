export interface ModeInfo {
  key: string;
  tag: string;
  title: string;
  desc: string;
  iconName: string;
  m1Label: string;
  m1Val: string;
  m2Label: string;
  m2Val: string;
  m3Label: string;
  m3Val: string;
  freqProfile: string;
  soundType: 'flat' | 'gaming' | 'anc' | 'voice' | 'punchy';
}

export const MODES_DATA: Record<string, ModeInfo> = {
  music: {
    key: 'music',
    tag: 'ACOUSTIC MASTERY',
    title: 'Uncompressed High-Fidelity Audio',
    desc: 'Tuned with a flat reference curve with dynamic bass extension. Experience multi-layered separation in acoustic instruments, rich midrange vocals, and high-frequency sparkle without auditory fatigue.',
    iconName: 'Headphones',
    m1Label: 'Codec',
    m1Val: 'AAC / SBC / Hi-Res',
    m2Label: 'EQ Preset',
    m2Val: 'Audiophile Curve',
    m3Label: 'THD',
    m3Val: '< 0.1% @ 1kHz',
    freqProfile: 'Flat reference 20Hz - 20kHz with gentle 3dB sub-bass warmth',
    soundType: 'flat'
  },
  gaming: {
    key: 'gaming',
    tag: 'LOW LATENCY MODE',
    title: 'Ultra-Fast 40ms Spatial Response',
    desc: 'Synchronizes sound waves instantly to visual frames. Pinpoint positional footsteps, gunshot vectors, and team communications in competitive gaming environments.',
    iconName: 'Gamepad2',
    m1Label: 'Latency',
    m1Val: '< 40ms Delay',
    m2Label: 'Channel',
    m2Val: 'Virtual 7.1 Spatial',
    m3Label: 'Sync',
    m3Val: 'Zero Lip-Sync Drift',
    freqProfile: 'Enhanced transient attack on footsteps & atmospheric cues',
    soundType: 'gaming'
  },
  travel: {
    key: 'travel',
    tag: 'HYBRID ANC ACTIVE',
    title: 'Total Cabin Drone Neutralization',
    desc: 'Blocks continuous low-frequency hum from jet turbines, train tracks, and heavy highway traffic. Enjoy a serene sonic cocoon throughout your long journeys.',
    iconName: 'Plane',
    m1Label: 'ANC Damping',
    m1Val: '-38dB Damping',
    m2Label: 'Pressure',
    m2Val: 'Barometric Balanced',
    m3Label: 'Endurance',
    m3Val: '40H Reserve (ANC ON)',
    freqProfile: 'Inverted phase acoustic masking for 50Hz - 800Hz rumble',
    soundType: 'anc'
  },
  work: {
    key: 'work',
    tag: 'COLLABORATION FOCUS',
    title: 'Multi-Point Call Isolation',
    desc: 'Seamlessly stay paired to your laptop for Zoom/Teams conferences while receiving urgent phone calls. Quad beamforming mics filter typing clatter and office crosstalk.',
    iconName: 'Briefcase',
    m1Label: 'Pairing',
    m1Val: 'Dual Multipoint',
    m2Label: 'Voice Isolation',
    m2Val: 'Neural AI ENC',
    m3Label: 'Sidetone',
    m3Val: 'Natural Voice Loop',
    freqProfile: 'Vocal register boost (1kHz - 4kHz) with noise ducking',
    soundType: 'voice'
  },
  fitness: {
    key: 'fitness',
    tag: 'SECURE ENDURANCE',
    title: 'Sweat-Resistant Ergonomic Clamp',
    desc: 'Engineered with IPX4 moisture resistance and breathable memory foam ear cushions that stay firmly seated during high-intensity training and daily outdoor runs.',
    iconName: 'Activity',
    m1Label: 'Rating',
    m1Val: 'IPX4 Certified',
    m2Label: 'Cushions',
    m2Val: 'Breathable Leatherette',
    m3Label: 'Weight',
    m3Val: '248g Balanced',
    freqProfile: 'Energized rhythmic bass drive with secure seal compensation',
    soundType: 'punchy'
  }
};

export const HOTLINKED_IMAGES = {
  heroProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBouNWsbChhQ--rtSmlBD_5KCq1VLaUt7eUVxeDLLuJFLaSmWl1v0jbe1x4whOyTx98iXL_xxmtLjlXvuX1Oas1FpZtW32iWb1-2K7VrB8Es-Aa-CCeACpFIcFiFep5pTy2xSOMEmAFaqc99ZioQhu7Ygqym658tew8ykGScvR0SnA3CrxCoZs6RGFPn44fbbZd34FF6lEXpM3RdACAJPMJGF4w2pjklTjnREhLmfSLbD-wLZbyWZ86',
  surroundCinematic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC23RG2M1izSp7TvFWjbGXxqSvCR9WZ2xeTrHmgzVJQw5XOLt7vO_LIuQ3_om0w86-CzL7pRS1WzbWDo9xoHvpGk8GgJTnlDUXgpn-owFYBcIvjzaWMYC8fknwOiht6VLIe2KaGmZayXVHrvoP0fCQ7a_PYDEiCL3PkhpoVy-RL51mpcDPkUlTpCfUu6CGpSO8rlSZqQA3-bsiJh1CYaiFq0CifXgSxSz6X680ye30KR4FkHk5vM1Tl',
  macroEngineering: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC23RG2M1izSp7TvFWjbGXxqSvCR9WZ2xeTrHmgzVJQw5XOLt7vO_LIuQ3_om0w86-CzL7pRS1WzbWDo9xoHvpGk8GgJTnlDUXgpn-owFYBcIvjzaWMYC8fknwOiht6VLIe2KaGmZayXVHrvoP0fCQ7a_PYDEiCL3PkhpoVy-RL51mpcDPkUlTpCfUu6CGpSO8rlSZqQA3-bsiJh1CYaiFq0CifXgSxSz6X680ye30KR4FkHk5vM1Tl',
  community1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVX--WN9vIqc1t4STiEDxw2pTvRfyS0QpvGBriBYulfFnFSEuAkqoYG2vbCpUxTTqbbd5gEzR8NDiXiJgGH6CiizE0y3fmzAI8jNhIaV310gNZPQVYXUyMOlSF6mpKqWH4j1TTsN3Yi9vTNHkJigDW23G9PFkaQxV_0Cvsbw421wgxCVo9jHnnX29ao6IR66udtAq9F2gmUTLrXKuiWCswS9BH8kwHMeLCc7j208SyIVW5vnYdEXFv',
  community2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaT2P5kekRYBcenaUgnZoMFpoy3bQg0WDUlOZ7tmOJpw3J0WKkGt1yyqUAqdvRCEpeQS5pDzWROXe9N8rRdJHqicpWd1V5aYLq2IAIe1C0KvjCrYybEpPniTB9aiNsiw3BFt7k2wC-ckGvoKojCt6v1Z3hHCj_NiHobHjqimwMq8kYFk_iFnajx1Wmaa5JqlwJCWBIYdeXjzRf1srj3cBZZORsAkz5xf8ieVtKGdMo89bc9goEBY9Z',
  community3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvAOjgloPGQC0i2DUAYIVK1QBG9QtDgGBHBFyv9SwPP11zitBAaQWQK5_R3gVlfnuOEbm0hslAD4ZDH1NOEUqrVIVz1Jqov6qvjj3CHThoTtej8tnNv7bkw1qvQD_P3UHQUuKz09MO3BWlJeSazoFftN1lYof8FkK5D0YkPM5bF_N-m-yfqKhW9YwJU5L45gH1YvNuucxzIvVy8C0ws4Xu_8_8LiMV8sZq1u1ntOuC3ovsFxQg0gn',
  community4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7waa5P2ZhYLCakS_I_C3U9tzOYGUjeOtAUO53zq40Jf3WJovuq3lPCyqfRrT0j2_cPFpdwuriEhoDEFTR-SHkCM8zyp7heYT9fN02lYu9spkCkWQAkZku15C5efXv0X-sh1MEIug5zhv9bCwYPRn-x_J4mjzbsNzOmpCWAEjazrX6D9BCyyxATYj6fQBuDhBxLrXHoyzvWtnGPb--iFoYhOYQbCXjiv1XQhjQojPeaduG7H6tdp3',
  boxImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBouNWsbChhQ--rtSmlBD_5KCq1VLaUt7eUVxeDLLuJFLaSmWl1v0jbe1x4whOyTx98iXL_xxmtLjlXvuX1Oas1FpZtW32iWb1-2K7VrB8Es-Aa-CCeACpFIcFiFep5pTy2xSOMEmAFaqc99ZioQhu7Ygqym658tew8ykGScvR0SnA3CrxCoZs6RGFPn44fbbZd34FF6lEXpM3RdACAJPMJGF4w2pjklTjnREhLmfSLbD-wLZbyWZ86'
};

export const COLOR_OPTIONS = [
  { id: 'obsidian', name: 'Obsidian Matte', hex: '#0B0C0E', border: '#343537', desc: 'Deep brushed acoustic graphite finish' },
  { id: 'copper', name: 'Raw Amber Copper', hex: '#C57D3C', border: '#C57D3C', desc: 'Precision machined copper accent edition' },
  { id: 'chalk', name: 'Chalk Canvas', hex: '#E5E2DB', border: '#B7B5AF', desc: 'Warm architectural light tone' }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "Surpasses imported headphones twice its price.",
    text: "The build quality is remarkably solid. The headband clamp force is zero-fatigue even after a 6-hour production session in my studio. Bass response is fast and completely free of artificial boominess.",
    author: "Arjun M.",
    location: "Bengaluru",
    badge: "Verified Buyer",
    rating: 5,
    tag: "Studio Production"
  },
  {
    quote: "Flight ANC completely muted engine hum.",
    text: "Tested these on a BOM to DEL flight. The hybrid ANC handles repetitive cabin noise effortlessly. The memory foam cushions breathe comfortably and call clarity on airport layovers is pristine.",
    author: "Neha K.",
    location: "Mumbai",
    badge: "Verified Buyer",
    rating: 5,
    tag: "Travel & Commute"
  },
  {
    quote: "Exemplary industrial precision and battery.",
    text: "I charge these once every two weeks for my daily clinical research and commute. The physical tactile switches on the right cup are responsive and prevent accidental touches.",
    author: "Dr. Rohan S.",
    location: "New Delhi",
    badge: "Verified Buyer",
    rating: 5,
    tag: "Everyday Carry"
  }
];

export const FAQS_DATA = [
  {
    id: 1,
    question: "Is there a warranty?",
    answer: "Yes, AURIA includes a 1-year comprehensive doorstep replacement warranty covering all internal drivers, battery performance, and electronics. Our support team arranges direct courier pick-up from anywhere in India."
  },
  {
    id: 2,
    question: "How long does the battery last?",
    answer: "You get up to 50 hours of continuous audio playback with Active Noise Cancellation switched off, and 40 hours with ANC active. Fast charging gives 5 hours of listening time from just 10 minutes plugged into USB-C."
  },
  {
    id: 3,
    question: "Does it support ANC?",
    answer: "Yes, AURIA features dual-feedforward and feedback hybrid Active Noise Cancellation that dampens ambient sound up to 38dB, easily handling airplanes, metro trains, and noisy workspaces."
  },
  {
    id: 4,
    question: "Is it compatible with iPhone and Android?",
    answer: "Universal Bluetooth 5.3 architecture works flawlessly with iOS, Android, macOS, and Windows. It supports multipoint pairing so you can switch automatically between your phone and laptop."
  },
  {
    id: 5,
    question: "How long does shipping take?",
    answer: "We provide free express insured air shipping. Metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai) receive deliveries within 2 to 3 business days; other regions within 4 business days."
  },
  {
    id: 6,
    question: "What is the replacement/return policy?",
    answer: "We stand by an ironclad 7-day hassle-free doorstep replacement guarantee. If there is any fit or technical concern, contact our dedicated concierge for an instant swap."
  }
];

export const BOX_CONTENTS = [
  { num: '01', title: 'AURIA Wireless Headphones', spec: 'Obsidian Matte' },
  { num: '02', title: 'Premium Travel Hardcase', spec: 'Acoustic Canvas' },
  { num: '03', title: 'Braided USB-C Fast-Charging Cable', spec: '1.2m Reinforced' },
  { num: '04', title: '3.5mm Gold-Plated Audio Cable', spec: 'Oxygen-Free Copper' },
  { num: '05', title: 'Quick Start Guide & Warranty Certificate', spec: 'Serial Authenticated' }
];
