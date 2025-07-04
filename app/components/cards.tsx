
// "use client";

// import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// export function ExpandableCardDemo() {
//   const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
//   const [showScrollButtons, setShowScrollButtons] = useState({
//     left: false,
//     right: true,
//   });
//   const id = useId();
//   const ref = useRef<HTMLDivElement>(null!); // Non-null assertion

//   const containerRef = useRef<HTMLDivElement>(null);

//   const checkScroll = () => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowScrollButtons({
//         left: scrollLeft > 0,
//         right: scrollLeft < scrollWidth - clientWidth - 1,
//       });
//     }
//   };

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: -300,
//         behavior: "smooth",
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({
//         left: 300,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     checkScroll();
//     const container = containerRef.current;
//     container?.addEventListener("scroll", checkScroll);
//     return () => container?.removeEventListener("scroll", checkScroll);
//   }, []);

//   useEffect(() => {
//     function onKeyDown(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setActive(false);
//       }
//     }

//     if (active && typeof active === "object") {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [active]);

//   // useOutsideClick(ref, () => setActive(null));
//   useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

//   return (
//     <div className="min-h-screen py-2 px-4 ">
//       <div className="max-w-7xl ">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <h2 className="text-3xl md:text-4xl  mt-4 font-medium text-cyan-900">
//             Free Courses
//           </h2>
//           <button className="h-12 w-32 bg-cyan-700 hover:bg-cyan-600 rounded-full text-white font-medium transition-colors shadow-md hover:shadow-lg">
//             View All
//           </button>
//         </div>

//         <div className="relative">
//           {showScrollButtons.left && (
//             <button
//               onClick={scrollLeft}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-cyan-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
//               aria-label="Scroll left"
//             >
//               <ChevronLeftIcon />
//             </button>
//           )}

//           <div
//             ref={containerRef}
//             className="flex overflow-x-hidden w-[1300px] gap-4  scrollbar-hide sm:px-8"
//             onScroll={checkScroll}
//           >
//             {cards.map((card) => (
//               <motion.div
//                 layoutId={`card-${card.title}-${id}`}
//                 key={card.title}
//                 onClick={() => setActive(card)}
//                 className="flex-shrink-0 w-20 sm:w-60 bg-gradient-to-br from-cyan-600 to-cyan-700 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 hover:border-white/40"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="flex flex-col h-full">
//                   <motion.div layoutId={`image-${card.title}-${id}`} className="relative">
//                     <img
//                       src={card.src}
//                       alt={card.title}
//                       className="w-full h-40 object-cover rounded-xl"
//                       loading="lazy"
//                     />
//                     <div className="absolute bottom-2 right-2 bg-cyan-800 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
//                       Free
//                     </div>
//                   </motion.div>
//                   <div className="p-6 flex flex-col flex-grow">
//                     <motion.h3
//                       layoutId={`title-${card.title}-${id}`}
//                       className="font-bold text-lg text-white mb-2 line-clamp-2"
//                     >
//                       {card.title}
//                     </motion.h3>
//                     <motion.p
//                       layoutId={`description-${card.description}-${id}`}
//                       className="text-cyan-100 text-sm mb-4"
//                     >
//                       {card.description}
//                     </motion.p>
//                     <div className="mt-auto">
//                       <button className="w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-md">
//                         Enroll Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {showScrollButtons.right && (
//             <button
//               onClick={scrollRight}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-cyan-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
//               aria-label="Scroll right"
//             >
//               <ChevronRightIcon />
//             </button>
//           )}
//         </div>

//         <AnimatePresence>
//           {active && typeof active === "object" && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
//             />
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {active && typeof active === "object" ? (
//             <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
//               <motion.div
//                 layoutId={`card-${active.title}-${id}`}
//                 ref={ref}
//                 className="w-full max-w-4xl bg-gradient-to-br from-cyan-800 to-cyan-900 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-cyan-600/30"
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 transition={{ type: "spring", damping: 25 }}
//               >
//                 <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
//                   <img
//                     src={active.src}
//                     alt={active.title}
//                     className="w-full h-64 object-cover"
//                   />
//                   <motion.button
//                     className="absolute top-4 right-4 bg-cyan-700 hover:bg-cyan-600 rounded-full p-2 shadow-md transition-colors hover:scale-110"
//                     onClick={() => setActive(null)}
//                     whileHover={{ rotate: 90 }}
//                     aria-label="Close"
//                   >
//                     <CloseIcon />
//                   </motion.button>
//                   <div className="absolute bottom-4 left-4 bg-cyan-700 text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm">
//                     Free Course
//                   </div>
//                 </motion.div>

//                 <div className="p-6 md:p-8 overflow-y-auto">
//                   <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
//                     <div>
//                       <motion.h3
//                         layoutId={`title-${active.title}-${id}`}
//                         className="text-2xl md:text-3xl font-bold text-white mb-2"
//                       >
//                         {active.title}
//                       </motion.h3>
//                       <motion.p
//                         layoutId={`description-${active.description}-${id}`}
//                         className="text-cyan-200"
//                       >
//                         {active.description}
//                       </motion.p>
//                     </div>
//                   </div>

//                   <motion.div className="prose prose-invert max-w-none text-cyan-50 space-y-4">
//                     {typeof active.content === "function"
//                       ? active.content()
//                       : active.content}
//                   </motion.div>

//                   <div className="mt-8">
//                     <a
//                       href={active.ctaLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-full block text-center bg-cyan-700 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
//                     >
//                       Enroll Now - Free
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           ) : null}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// const ChevronLeftIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="text-cyan-700 hover:text-white transition-colors"
//   >
//     <path d="m15 18-6-6 6-6" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="text-cyan-700 hover:text-white transition-colors"
//   >
//     <path d="m9 18 6-6-6-6" />
//   </svg>
// );

// const CloseIcon = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-5 w-5 text-white"
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M18 6l-12 12" />
//       <path d="M6 6l12 12" />
//     </svg>
//   );
// };

// const cards = [
//   {
//     description: "Beginner · 4 Hours",
//     title: "Introduction to Web Development",
//     src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     ctaText: "Enroll Now",
//     ctaLink: "#",
//     content: () => {
//       return (
//         <div>
//           <p className="mb-4">
//             This comprehensive course introduces you to the fundamentals of web development. You'll learn HTML, CSS, and JavaScript - the building blocks of the web.
//           </p>
//           <h4 className="font-bold mt-6 mb-2 text-white">What You'll Learn:</h4>
//           <ul className="list-disc pl-5 space-y-2 text-cyan-100">
//             <li>Create structured web pages with HTML</li>
//             <li>Style your pages with CSS</li>
//             <li>Add interactivity with JavaScript</li>
//             <li>Understand responsive design principles</li>
//             <li>Build your first complete website</li>
//           </ul>
//           <div className="mt-6 p-4 bg-cyan-900/50 rounded-lg border border-cyan-600/30">
//             <h4 className="font-bold mb-2 text-white">Course Details</h4>
//             <div className="grid grid-cols-2 gap-2">
//               <p className="text-cyan-100"><span className="font-medium">Duration:</span> 4 hours</p>
//               <p className="text-cyan-100"><span className="font-medium">Level:</span> Beginner</p>
//               <p className="text-cyan-100"><span className="font-medium">Certificate:</span> Yes</p>
//               <p className="text-cyan-100"><span className="font-medium">Projects:</span> 3</p>
//             </div>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     description: "Intermediate · 6 Hours",
//     title: "Python for Data Science",
//     src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     ctaText: "Enroll Now",
//     ctaLink: "#",
//     content: () => {
//       return (
//         <div>
//           <p className="mb-4">
//             Dive into the world of data science with Python. This course covers essential libraries like Pandas, NumPy, and Matplotlib to help you analyze and visualize data effectively.
//           </p>
//           <h4 className="font-bold mt-6 mb-2 text-white">Course Highlights:</h4>
//           <ul className="list-disc pl-5 space-y-2 text-cyan-100">
//             <li>Data manipulation with Pandas</li>
//             <li>Numerical computing with NumPy</li>
//             <li>Data visualization with Matplotlib and Seaborn</li>
//             <li>Basic statistical analysis</li>
//             <li>Real-world data science projects</li>
//           </ul>
//           <div className="mt-6 p-4 bg-cyan-900/50 rounded-lg border border-cyan-600/30">
//             <h4 className="font-bold mb-2 text-white">Prerequisites</h4>
//             <p className="text-cyan-100">Basic Python knowledge recommended</p>
//             <h4 className="font-bold mt-3 mb-2 text-white">Tools Used</h4>
//             <p className="text-cyan-100">Jupyter Notebook, Python 3, Pandas, NumPy, Matplotlib</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     description: "Beginner · 3 Hours",
//     title: "Digital Marketing Fundamentals",
//     src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     ctaText: "Enroll Now",
//     ctaLink: "#",
//     content: () => {
//       return (
//         <div>
//           <p className="mb-4">
//             Learn the core concepts of digital marketing in this beginner-friendly course. Discover how to create effective online campaigns and reach your target audience.
//           </p>
//           <h4 className="font-bold mt-6 mb-2 text-white">Topics Covered:</h4>
//           <ul className="list-disc pl-5 space-y-2 text-cyan-100">
//             <li>SEO fundamentals</li>
//             <li>Social media marketing</li>
//             <li>Email marketing strategies</li>
//             <li>Content marketing</li>
//             <li>Google Analytics basics</li>
//           </ul>
//           <div className="mt-6 p-4 bg-cyan-900/50 rounded-lg border border-cyan-600/30">
//             <h4 className="font-bold mb-2 text-white">Who Should Take This Course</h4>
//             <p className="text-cyan-100">Entrepreneurs, small business owners, and marketing beginners</p>
//             <h4 className="font-bold mt-3 mb-2 text-white">Bonus Materials</h4>
//             <p className="text-cyan-100">Includes downloadable templates and checklists</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     description: "Advanced · 8 Hours",
//     title: "Machine Learning Essentials",
//     src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     ctaText: "Enroll Now",
//     ctaLink: "#",
//     content: () => {
//       return (
//         <div>
//           <p className="mb-4">
//             Take your first steps into the exciting world of machine learning. This course covers fundamental algorithms and practical implementation using Python.
//           </p>
//           <h4 className="font-bold mt-6 mb-2 text-white">Key Concepts:</h4>
//           <ul className="list-disc pl-5 space-y-2 text-cyan-100">
//             <li>Supervised vs unsupervised learning</li>
//             <li>Linear and logistic regression</li>
//             <li>Decision trees and random forests</li>
//             <li>Neural networks introduction</li>
//             <li>Model evaluation techniques</li>
//           </ul>
//           <div className="mt-6 p-4 bg-cyan-900/50 rounded-lg border border-cyan-600/30">
//             <h4 className="font-bold mb-2 text-white">Requirements</h4>
//             <p className="text-cyan-100">Python programming and basic statistics knowledge required</p>
//             <h4 className="font-bold mt-3 mb-2 text-white">Included Resources</h4>
//             <p className="text-cyan-100">Dataset collection and starter notebooks provided</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     description: "Beginner · 5 Hours",
//     title: "Mobile App Development with Flutter",
//     src: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
//     ctaText: "Enroll Now",
//     ctaLink: "#",
//     content: () => {
//       return (
//         <div>
//           <p className="mb-4">
//             Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase with Flutter and Dart.
//           </p>
//           <h4 className="font-bold mt-6 mb-2 text-white">What's Included:</h4>
//           <ul className="list-disc pl-5 space-y-2 text-cyan-100">
//             <li>Flutter widget fundamentals</li>
//             <li>State management techniques</li>
//             <li>Building responsive layouts</li>
//             <li>Navigation and routing</li>
//             <li>Publishing to app stores</li>
//           </ul>
//           <div className="mt-6 p-4 bg-cyan-900/50 rounded-lg border border-cyan-600/30">
//             <h4 className="font-bold mb-2 text-white">Perfect For</h4>
//             <p className="text-cyan-100">Developers looking to create cross-platform apps efficiently</p>
//             <h4 className="font-bold mt-3 mb-2 text-white">Development Environment</h4>
//             <p className="text-cyan-100">Setup guide for VS Code and Android Studio included</p>
//           </div>
//         </div>
//       );
//     },
//   },
// ];


"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";
import useApi from "../services/useApi";

interface Card {
  _id: string;
  title: string;
  description: string;
  coverImage?: string;
  isPaid: boolean;
  amount?: number;
  url: string;
  topics: string[];
  creator: string;
  date: string;
  time: string;
}

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Card | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState({
    left: false,
    right: true,
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const id = useId();
  const ref = useRef<HTMLDivElement>(null); 
  const containerRef = useRef<HTMLDivElement>(null);
  const { request } = useApi();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await request("/courses", "GET");
        setCards(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [request]);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowScrollButtons({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1,
      });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    container?.addEventListener("scroll", checkScroll);
    return () => container?.removeEventListener("scroll", checkScroll);
  }, [cards]); // Re-check scroll when cards change

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

   useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  if (loading) {
    return (
      <div className="min-h-screen py-2 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-cyan-800">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-2 px-4 flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="mt-2 text-gray-600">Please try again later</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl mt-4 font-medium text-cyan-900">
            {active ? active.title : "Available Courses"}
          </h2>
          <button 
            className="h-12 w-32 bg-cyan-700 hover:bg-cyan-600 rounded-full text-white font-medium transition-colors shadow-md hover:shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {active ? "Back to Courses" : "View All"}
          </button>
        </div>

        {!active && (
          <div className="relative">
            {showScrollButtons.left && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-cyan-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon />
              </button>
            )}

            <div
              ref={containerRef}
              className="flex overflow-x-auto w-full gap-4 scrollbar-hide sm:px-8"
              onScroll={checkScroll}
            >
              {cards.map((card) => (
                <motion.div
                  layoutId={`card-${card._id}-${id}`}
                  key={card._id}
                  onClick={() => setActive(card)}
                  className={`flex-shrink-0 w-64 bg-gradient-to-br from-cyan-600 to-cyan-700 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 hover:border-white/40 ${card.isPaid ? 'ring-2 ring-yellow-400' : ''}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col h-full">
                    <motion.div layoutId={`image-${card._id}-${id}`} className="relative">
                      <img
                        src={card.coverImage || '/default-course.jpg'}
                        alt={card.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 bg-cyan-800 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        {card.isPaid ? `₹${card.amount}` : 'Free'}
                      </div>
                    </motion.div>
                    <div className="p-6 flex flex-col flex-grow">
                      <motion.h3
                        layoutId={`title-${card._id}-${id}`}
                        className="font-bold text-lg text-white mb-2 line-clamp-2"
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`creator-${card._id}-${id}`}
                        className="text-cyan-100 text-sm mb-1"
                      >
                        By {card.creator}
                      </motion.p>
                      <motion.p
                        layoutId={`date-${card._id}-${id}`}
                        className="text-cyan-100 text-xs mb-4"
                      >
                        {new Date(card.date).toLocaleDateString()} at {card.time}
                      </motion.p>
                      <div className="mt-auto">
                        <button className="w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-md">
                          {card.isPaid ? 'Buy Now' : 'Enroll Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {showScrollButtons.right && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-cyan-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>
        )}

        <AnimatePresence>
          {active && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
              
              <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                <motion.div
                  layoutId={`card-${active._id}-${id}`}
                  ref={ref}
                  className="w-full max-w-4xl bg-gradient-to-br from-cyan-800 to-cyan-900 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-cyan-600/30"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <motion.div layoutId={`image-${active._id}-${id}`} className="relative">
                    <img
                      src={active.coverImage || '/default-course.jpg'}
                      alt={active.title}
                      className="w-full h-64 object-cover"
                    />
                    <motion.button
                      className="absolute top-4 right-4 bg-cyan-700 hover:bg-cyan-600 rounded-full p-2 shadow-md transition-colors hover:scale-110"
                      onClick={() => setActive(null)}
                      whileHover={{ rotate: 90 }}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </motion.button>
                    <div className="absolute bottom-4 left-4 bg-cyan-700 text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm">
                      {active.isPaid ? `Paid Course - ₹${active.amount}` : 'Free Course'}
                    </div>
                  </motion.div>

                  <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                      <div>
                        <motion.h3
                          layoutId={`title-${active._id}-${id}`}
                          className="text-2xl md:text-3xl font-bold text-white mb-2"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`creator-${active._id}-${id}`}
                          className="text-cyan-200 mb-1"
                        >
                          Created by {active.creator}
                        </motion.p>
                        <motion.p
                          layoutId={`date-${active._id}-${id}`}
                          className="text-cyan-200"
                        >
                          {new Date(active.date).toLocaleDateString()} at {active.time}
                        </motion.p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-3">Course Description</h4>
                      <p className="text-cyan-100 whitespace-pre-line">
                        {active.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-3">Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {active.topics.map((topic, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-700 text-white"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-cyan-700 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                      >
                        {active.isPaid ? 'Purchase Course' : 'Enroll Now - Free'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Icon components remain the same
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan-700 hover:text-white transition-colors"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan-700 hover:text-white transition-colors"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};