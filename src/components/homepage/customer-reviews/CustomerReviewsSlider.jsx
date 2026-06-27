'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiDoubleQuotesR } from 'react-icons/ri';

// Import essential Swiper core styling parameters
import 'swiper/css';

const CustomerReviewsSlider = ({ reviews }) => {
    // Component to parse structural rating systems dynamically
    const renderStars = (rating) => {
        const totalStars = 5;
        return (
            <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(totalStars)].map((_, index) => (
                    index < rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} className="text-slate-600" />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full cursor-grab active:cursor-grabbing">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 } // Shows 3 items initially on desktop viewports
                }}
                className="py-4"
            >
                {reviews.map((review) => {
                    // Pull simple fallback tag from email string addresses
                    const userHandle = review.email ? review.email.split('@')[0] : 'anonymous_user';

                    return (
                        <SwiperSlide key={review._id?.$oid || review._id}>
                            <div className="relative rounded-2xl bg-[#131c2e] p-6 sm:p-8 border border-slate-800/60 h-full flex flex-col justify-between transition-all duration-300 hover:border-slate-700/80 shadow-md">

                                {/* Top Layout Row */}
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    {renderStars(review.rating || 5)}
                                    <RiDoubleQuotesR className="text-3xl text-indigo-500/20" />
                                </div>

                                {/* Main Review Comments */}
                                <p className="text-slate-300 text-sm italic leading-relaxed min-h-[72px] line-clamp-3">
                                    {review.comment || 'Outstanding blueprint, completely optimized my design speed.'}
                                </p>

                                {/* Bottom Profile Footers */}
                                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-white truncate max-w-[160px]">
                                            @{userHandle}
                                        </p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                            Verified Buyer
                                        </p>
                                    </div>

                                    {/* Small context indicator linking prompt references */}
                                    <span className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono text-indigo-400">
                                        ID: ...{String(review.promptId?.$oid || review.promptId || 'ref').slice(-4)}
                                    </span>
                                </div>

                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default CustomerReviewsSlider;