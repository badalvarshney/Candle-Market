import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle, Plus, Send } from 'lucide-react';
import { fetchReviewsAPI, submitReviewAPI } from '../services/api';

export default function ReviewsSection({ showAddButton = true, isSlider = false }) {
  const [reviews, setReviews] = useState([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    city: 'Mumbai',
    rating: 5,
    text: '',
    boughtProduct: 'Golden Amber & Vanilla'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadReviews = async () => {
    try {
      const data = await fetchReviewsAPI();
      if (data) {
        setReviews(data);
      }
    } catch (err) {
      console.warn('Error loading reviews from API:', err.message);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReviewAPI(newReview);
      setIsSubmitted(true);
      loadReviews();
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitOpen(false);
        setNewReview({ name: '', city: 'Mumbai', rating: 5, text: '', boughtProduct: 'Golden Amber & Vanilla' });
      }, 2500);
    } catch (err) {
      alert('Error submitting review');
    }
  };

  const displayReviews = isSlider && reviews.length > 0 ? [...reviews, ...reviews, ...reviews] : reviews;

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[#C59B27] text-xs font-bold uppercase tracking-widest block mb-2">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#111827] uppercase">
            LOVED BY CANDLE LOVERS NATIONWIDE
          </h2>
          <p className="text-[#6B7280] text-xs uppercase tracking-wider mt-2 font-light">
            Over 10,000+ homes lit with warmth and pure botanical fragrance.
          </p>
        </div>

        {showAddButton && (
          <button
            onClick={() => setIsSubmitOpen(!isSubmitOpen)}
            className="btn-outline-kimirica text-xs py-2.5 px-4 self-start md:self-auto cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#B45309]" />
            <span>WRITE A REVIEW</span>
          </button>
        )}
      </div>

      {/* Customer Submit Review Form Accordion */}
      {showAddButton && isSubmitOpen && (
        <div className="bg-white p-6 border border-[#B45309] shadow-md mb-8 animate-fade-in max-w-xl mx-auto">
          <h3 className="font-serif text-base font-bold text-[#111827] uppercase tracking-wider mb-4 border-b border-[#E8E3DA] pb-2">
            SHARE YOUR ILLUMINATION EXPERIENCE
          </h3>

          {isSubmitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold uppercase text-center">
              Thank you! Your review has been submitted.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2 text-stone-900 focus:border-[#B45309]"
                    placeholder="e.g. Ananya S."
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-900 uppercase block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-stone-300 p-2 text-stone-900 focus:border-[#B45309]"
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase block mb-1">Product Purchased</label>
                <input
                  type="text"
                  required
                  value={newReview.boughtProduct}
                  onChange={(e) => setNewReview({ ...newReview, boughtProduct: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2 text-stone-900 focus:border-[#B45309]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase block mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2 text-stone-900 focus:border-[#B45309]"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★</option>
                  <option value={3}>3 Stars ★★★</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-900 uppercase block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full bg-[#FAFAF7] border border-stone-300 p-2 text-stone-900 focus:border-[#B45309]"
                  placeholder="How was the candle scent, crackle sound, and burn time?"
                />
              </div>

              <button type="submit" className="btn-kimirica text-xs py-2.5 px-6 w-full justify-center">
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT REVIEW</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reviews Display */}
      {isSlider ? (
        <div
          className="relative overflow-hidden py-4 -mx-4 px-4 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-6 w-max"
            style={{
              animation: 'reviewsMarquee 35s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {displayReviews.map((t, idx) => (
              <div
                key={`${t._id || t.id || idx}-${idx}`}
                className="kimirica-card p-6 flex flex-col justify-between w-[320px] sm:w-[380px] shrink-0 relative shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#E8E3DA] absolute top-4 right-4 pointer-events-none" />

                <div>
                  <div className="flex text-[#C59B27] mb-3">
                    {[...Array(Number(t.rating) || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-[#4B5563] text-xs leading-relaxed mb-6 font-light">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#111827] text-xs uppercase tracking-wider flex items-center gap-1">
                      <span>{t.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#1B3B32]" title="Verified Purchaser" />
                    </h4>
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{t.city} • Verified Buyer</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#1B3B32] bg-[#F9F5F0] px-2 py-0.5 uppercase tracking-wider border border-[#E8E3DA]">
                    {t.boughtProduct}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes reviewsMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
          `}</style>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((t, idx) => (
            <div
              key={t._id || t.id || idx}
              className="kimirica-card p-6 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#E8E3DA] absolute top-4 right-4 pointer-events-none" />

              <div>
                <div className="flex text-[#C59B27] mb-3">
                  {[...Array(Number(t.rating) || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-[#4B5563] text-xs leading-relaxed mb-6 font-light">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#111827] text-xs uppercase tracking-wider flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B3B32]" title="Verified Purchaser" />
                  </h4>
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{t.city} • Verified Buyer</span>
                </div>
                <span className="text-[9px] font-bold text-[#1B3B32] bg-[#F9F5F0] px-2 py-0.5 uppercase tracking-wider border border-[#E8E3DA]">
                  {t.boughtProduct}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
