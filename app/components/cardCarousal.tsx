
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

type Workshop = {
  id: string;
  title: string;
  instructor: string;
  price: number | 'Free';
  imageUrl: string;
};

export default function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const workshops: Workshop[] = [
    {
      id: '1',
      title: 'Digital Painting Basics',
      instructor: 'Alex Morgan',
      price: 29,
      imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=500'
    },
    {
      id: '2',
      title: 'Intro to Web Development',
      instructor: 'Sam Chen',
      price: 'Free',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500'
    },
    {
      id: '3',
      title: 'Yoga for Beginners',
      instructor: 'Priya K.',
      price: 19,
      imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500'
    },
    {
      id: '4',
      title: 'Photography Fundamentals',
      instructor: 'Emma W.',
      price: 39,
      imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500'
    },
    {
      id: '5',
      title: 'Music Production 101',
      instructor: 'DJ Kaela',
      price: 49,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500'
    }
  ];

  return (
    <div className="w-full h-full px-6 py-4">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={true}
        autoplay={{
          delay: 2000, // 3 seconds between slides
          disableOnInteraction: false, // continue autoplay after user interaction
          pauseOnMouseEnter: true, // pause autoplay when mouse is over the carousel
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="!py-6"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {workshops.map((workshop, index) => (
          <SwiperSlide key={workshop.id} className="!w-80 !h-64">
            <motion.div
              className={`relative h-full rounded-xl overflow-hidden shadow-lg ${
                index === activeIndex ? 'ring-4 ring-cyan-400' : 'opacity-90'
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={workshop.imageUrl}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{workshop.title}</h3>
                <p className="text-cyan-100 text-sm mb-2">
                  by {workshop.instructor}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      workshop.price === 'Free'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-white text-cyan-700'
                    }`}
                  >
                    {workshop.price === 'Free' ? 'Free' : `$${workshop.price}`}
                  </span>
                  <button className="text-white hover:text-cyan-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}