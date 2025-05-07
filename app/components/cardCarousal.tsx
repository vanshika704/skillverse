
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
      imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
    },
    {
      id: '2',
      title: 'Intro to Web Development',
      instructor: 'Sam Chen',
      price: 'Free',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    {
      id: '3',
      title: 'Yoga for Beginners',
      instructor: 'Priya K.',
      price: 19,
      imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
    },
    {
      id: '4',
      title: 'Photography Fundamentals',
      instructor: 'Emma W.',
      price: 39,
      imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    },
    {
      id: '5',
      title: 'Music Production 101',
      instructor: 'DJ Kaela',
      price: 49,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    },
    {
      id: '6',
      title: 'Digital Illustration for Beginners',
      instructor: 'Ava Morgan',
      price: 59,
      imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
    },
    {
      id: '7',
      title: 'Fundamentals of Web Development',
      instructor: 'Leo Carter',
      price: 69,
      imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
    },
    {
      id: '8',
      title: 'Creative Writing Masterclass',
      instructor: 'Sophia Lin',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    },
    {
      id: '9',
      title: 'Photography: From Beginner to Pro',
      instructor: 'Ethan Reyes',
      price: 55,
      imageUrl: 'https://images.unsplash.com/photo-1504198266287-1659872e6590',
    },
    {
      id: '10',
      title: 'UI/UX Design Bootcamp',
      instructor: 'Mira Patel',
      price: 79,
      imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd',
    },
    {
      id: '11',
      title: 'Introduction to Game Development',
      instructor: 'Carlos Rivera',
      price: 65,
      imageUrl: 'https://images.unsplash.com/photo-1534889156217-d643df14f14a',
    },
    {
      id: '12',
      title: 'Data Science with Python',
      instructor: 'Nina Zhang',
      price: 89,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    },
    {
      id: '13',
      title: 'Basics of Public Speaking',
      instructor: 'Oliver Brooks',
      price: 39,
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    },
    {
      id: '14',
      title: 'Entrepreneurship Essentials',
      instructor: 'Jasmine Lee',
      price: 99,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    },
    {
      id: '15',
      title: 'Mindfulness & Meditation Basics',
      instructor: 'Liam Nguyen',
      price: 29,
      imageUrl: 'https://images.unsplash.com/photo-1534889156217-d643df14f14a',
    },
  ];

  return (
    <div className="w-[1300px] bg-gradient-to-br from-neutral-950 via-cyan-700 rounded-4xl to-neutral-950 h-full px-6 py-4">
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
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="!py-6"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 'auto',
            centeredSlides: true,
          },
        }}
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
