import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
  image: string;
}

const WindowCardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards: Card[] = [
    {
      id: 1,
      title: "Mountain View",
      content: "Experience the breathtaking beauty of alpine landscapes.",
      color: "bg-gradient-to-br from-blue-500 to-teal-400",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Ocean Breeze",
      content: "Feel the serenity of endless blue waters and golden sands.",
      color: "bg-gradient-to-br from-cyan-400 to-blue-600",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80"
    },
    {
      id: 3,
      title: "Forest Retreat",
      content: "Immerse yourself in the tranquility of ancient woodlands.",
      color: "bg-gradient-to-br from-green-500 to-emerald-700",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Desert Mirage",
      content: "Discover the mysterious beauty of endless golden dunes.",
      color: "bg-gradient-to-br from-amber-400 to-orange-600",
      image: "https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 5,
      title: "City Lights",
      content: "Vibrant energy of urban landscapes after dark.",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const nextCard = (): void => {
    setDirection("right");
    setCurrentIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = (): void => {
    setDirection("left");
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const variants = {
    enter: (direction: 'left' | 'right' | null) => {
      return {
        x: direction === "right" ? 1000 : -1000,
        opacity: 0,
        scale: 0.8
      };
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: 'left' | 'right' | null) => {
      return {
        x: direction === "right" ? -1000 : 1000,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.5,
          ease: "easeIn"
        }
      };
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 15,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const windowVariants = {
    initial: { clipPath: "circle(10% at 50% 50%)" },
    animate: { 
      clipPath: "circle(100% at 50% 50%)",
      transition: { 
        duration: 1.2,
        ease: [0.83, 0, 0.17, 1]
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-3xl" />
        
        {/* Navigation Arrows */}
        <motion.button 
          onClick={prevCard}
          className="absolute left-4 z-20 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button 
          onClick={nextCard}
          className="absolute right-4 z-20 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {/* Indicators */}
        <div className="absolute bottom-6 flex gap-2 z-20">
          {cards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? "right" : "left");
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={cards[currentIndex].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <motion.div 
            className={`relative w-full h-full rounded-2xl overflow-hidden ${cards[currentIndex].color}`}
            variants={hoverVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredCard(currentIndex)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Window Reveal Effect */}
            <motion.div 
              className="absolute inset-0 bg-black/30"
              variants={windowVariants}
              initial="initial"
              animate="animate"
            />
            
            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <motion.h2 
                className="text-4xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {cards[currentIndex].title}
              </motion.h2>
              <motion.p 
                className="text-xl mb-6 max-w-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {cards[currentIndex].content}
              </motion.p>
              <motion.button
                className="self-start px-6 py-3 bg-white text-gray-800 rounded-full font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More
              </motion.button>
            </div>
            
            {/* Background Image */}
            <motion.img 
              src={cards[currentIndex].image} 
              alt={cards[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Hover Effect - Glow */}
            {hoveredCard === currentIndex && (
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Preview Cards */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${index === currentIndex ? 'ring-2 ring-white' : ''}`}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <img 
              src={card.image} 
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WindowCardCarousel;