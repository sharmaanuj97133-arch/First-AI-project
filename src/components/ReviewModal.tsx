import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: {
    quote: string;
    text: string;
    author: string;
    location: string;
    rating: number;
    tag: string;
  }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('Daily Listening');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote || !text) return;
    onSubmitReview({
      quote,
      text,
      author,
      location: location || 'Verified Buyer',
      rating,
      tag
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0C0E]/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#121315] border border-[#534439]/40 text-[#e3e2e5] shadow-2xl z-10">
        <div className="p-6 border-b border-[#534439]/20 flex items-center justify-between">
          <div>
            <span className="font-syne text-lg font-bold uppercase tracking-wider text-[#e3e2e5]">
              Write an Owner Review
            </span>
            <p className="text-[11px] text-[#8e9197]">Share your acoustic impressions with the collective</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#8e9197] hover:text-[#e3e2e5]"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-[#c57d3c]/20 border border-[#c57d3c] flex items-center justify-center text-[#ffb77c]">
              <Check size={24} />
            </div>
            <h4 className="font-syne text-lg font-bold text-[#e3e2e5]">Review Verified & Posted</h4>
            <p className="text-xs text-[#c9c6c0]">Thank you for contributing to the AURIA collective.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#c57d3c] font-semibold mb-1">
                Rating
              </label>
              <div className="flex gap-2 text-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer text-[#ffb77c] hover:scale-110 transition-transform"
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-mono text-[#c9c6c0] ml-2 self-center">{rating} / 5 Stars</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                  Your Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Siddharth V."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                Headline / One-Liner *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. &quot;Surpassed all expectations on vocal clarity.&quot;"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                Detailed Acoustic Feedback *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe bass response, comfort over long listening sessions, ANC performance, and build quality..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-[#1b1c1e] border border-[#534439]/40 p-3 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#c9c6c0] mb-1">
                Listening Application
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#1b1c1e] border border-[#534439]/40 px-3 py-2 text-xs text-[#e3e2e5] focus:outline-none focus:border-[#ffb77c]"
              >
                <option value="Studio Production">Studio Production</option>
                <option value="Travel & Commute">Travel & Commute</option>
                <option value="Daily Listening">Daily Listening</option>
                <option value="Gaming & Spatial">Gaming & Spatial</option>
                <option value="Clinical / Research">Clinical / Research</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-[#8e9197] hover:text-[#e3e2e5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#ffb77c] text-[#4d2700] hover:bg-[#c9803f] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
