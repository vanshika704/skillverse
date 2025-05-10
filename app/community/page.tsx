


// 'use client';

// import { motion } from 'framer-motion';
// import { FiSearch, FiFilter, FiTrendingUp, FiUsers, FiAward, FiBookmark } from 'react-icons/fi';
// import CoverflowCarousel from '../components/cardCarousal';
// import { ExpandableCardDemo } from '../components/cards';
// import { Sidebar } from '../components/SideBar';

// export default function Community() {
//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 overflow-x-hidden">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="flex w-full"
//       >
//         <div className="hidden md:block fixed h-full">
//           <Sidebar />
//         </div>
        
//         <div className="flex-1 p-2 md:p-6 md:ml-[100px] lg:ml-[100px] w-full box-border max-w-[calc(100vw-16px)] md:max-w-[calc(100vw-200px)] lg:max-w-[calc(100vw-220px)]">
//           {/* Header */}
//           <motion.div
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="mb-6 md:mb-10 w-full"
//           >
//             <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-cyan-900 mb-1 md:mb-2">SkillVerse Community</h1>
//             <p className="text-cyan-700 text-sm md:text-base">Connect, learn and grow with fellow skill enthusiasts</p>
            
//             {/* Search and Filter */}
//             <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-6 w-full">
//               <div className="relative flex-1 min-w-0">
//                 <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-cyan-400 text-lg" />
//                 <input
//                   type="text"
//                   placeholder="Search courses, skills or members..."
//                   className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm text-sm md:text-base"
//                 />
//               </div>
//               <button className="flex-shrink-0 flex items-center justify-center px-2 py-2.5 md:py-3 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm md:text-base whitespace-nowrap">
//                 <FiFilter className="text-base" />
//                 <span>Filters</span>
//               </button>
//             </div>
//           </motion.div>
          
//           {/* Stats Cards */}
//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10 w-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {[{
//               icon: <FiTrendingUp size={18} className="md:size-5" />,
//               label: "Active Learners",
//               value: "12,345"
//             }, {
//               icon: <FiUsers size={18} className="md:size-5" />,
//               label: "Skill Mentors",
//               value: "1,234"
//             }, {
//               icon: <FiAward size={18} className="md:size-5" />,
//               label: "Courses Available",
//               value: "567"
//             }].map((card, index) => (
//               <div key={index} className="bg-cyan-500 p-4 md:p-5 rounded-xl shadow-sm border border-cyan-100 w-full">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2.5 md:p-3 rounded-lg bg-cyan-100 text-cyan-900">
//                     {card.icon}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-xs md:text-sm text-cyan-900 truncate">{card.label}</p>
//                     <p className="text-xl md:text-2xl font-bold text-cyan-900 truncate">{card.value}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
          
//           {/* Featured Courses */}
//           <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="mb-8 md:mb-12 w-full"
//           >
//             <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
//               <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
//                 <FiBookmark className="text-cyan-500 text-lg md:text-xl" />
//                 <span>Featured Courses</span>
//               </h2>
//               <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
//                 View all →
//               </button>
//             </div>
//             <div className="w-full">
//               <CoverflowCarousel />
//             </div>
//           </motion.section>
          
//           {/* Community Posts */}
//           <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mb-8 md:mb-12 w-full"
//           >
//             <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 mb-4 md:mb-6">Community Discussions</h2>
//             <div className="w-full">
//               <ExpandableCardDemo />
//             </div>
//           </motion.section>
          
//           {/* CTA Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="mt-8 md:mt-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white w-full"
//           >
//             <div className="max-w-2xl mx-auto text-center">
//               <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Ready to share your skills?</h3>
//               <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">Join our community of learners and mentors to grow together.</p>
//               <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
//                 <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-cyan-800 font-medium rounded-lg hover:bg-opacity-90 transition text-sm md:text-base whitespace-nowrap">
//                   Create a Course
//                 </button>
//                 <button className="px-4 py-2 md:px-6 md:py-3 border border-white bg-transparent font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition text-sm md:text-base whitespace-nowrap">
//                   Explore Community
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiTrendingUp, FiUsers, FiAward, FiBookmark, FiStar, FiClock, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import CoverflowCarousel from '../components/cardCarousal';
import { ExpandableCardDemo } from '../components/cards';
import { Sidebar } from '../components/SideBar';

export default function Community() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full"
      >
        <div className="hidden md:block fixed h-full">
          <Sidebar />
        </div>
        
        <div className="flex-1 p-2 md:p-6 md:ml-[100px] lg:ml-[100px] w-full box-border max-w-[calc(100vw-16px)] md:max-w-[calc(100vw-200px)] lg:max-w-[calc(100vw-220px)]">
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-6 md:mb-10 w-full"
          >
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-cyan-900 mb-1 md:mb-2">SkillVerse Community</h1>
            <p className="text-cyan-700 text-sm md:text-base">Connect, learn and grow with fellow skill enthusiasts</p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-6 w-full">
              <div className="relative flex-1 min-w-0">
                <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-cyan-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search courses, skills or members..."
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm text-sm md:text-base"
                />
              </div>
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiFilter className="mr-1" />
                  <span>All</span>
                </button>
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiDollarSign className="mr-1" />
                  <span>Free</span>
                </button>
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiDollarSign className="mr-1" />
                  <span>Paid</span>
                </button>
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiClock className="mr-1" />
                  <span>Latest</span>
                </button>
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiStar className="mr-1" />
                  <span>Popular</span>
                </button>
                <button className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors text-sm">
                  <FiBarChart2 className="mr-1" />
                  <span>Trending</span>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[{
              icon: <FiTrendingUp size={18} className="md:size-5" />,
              label: "Active Learners",
              value: "12,345"
            }, {
              icon: <FiUsers size={18} className="md:size-5" />,
              label: "Skill Mentors",
              value: "1,234"
            }, {
              icon: <FiAward size={18} className="md:size-5" />,
              label: "Courses Available",
              value: "567"
            }, {
              icon: <FiStar size={18} className="md:size-5" />,
              label: "New This Week",
              value: "42"
            }].map((card, index) => (
              <div key={index} className="bg-cyan-500 p-4 md:p-5 rounded-xl shadow-sm border border-cyan-100 w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 md:p-3 rounded-lg bg-cyan-100 text-cyan-900">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-cyan-900 truncate">{card.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-cyan-900 truncate">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Featured Courses (Coverflow Carousel - used only once) */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiBookmark className="text-cyan-500 text-lg md:text-xl" />
                <span>Featured Courses</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                View all →
              </button>
            </div>
            <div className="w-full">
              <CoverflowCarousel />
            </div>
          </motion.section>
          
          {/* Free Courses - Grid Layout */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiDollarSign className="text-green-500 text-lg md:text-xl" />
                <span>Free Courses</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                View all free courses →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl border border-cyan-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-40 bg-green-100 flex items-center justify-center text-green-500">
                    <FiDollarSign size={32} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-cyan-900">Free Course {item}</h3>
                    <p className="text-sm text-cyan-600 mt-1">Beginner-friendly course on topic {item}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">FREE</span>
                      <span className="text-xs text-cyan-500">{Math.floor(Math.random() * 50) + 10} lessons</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Premium Courses - List Layout */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiDollarSign className="text-purple-500 text-lg md:text-xl" />
                <span>Premium Courses</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                View all premium courses →
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-cyan-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-32 h-24 bg-purple-100 flex items-center justify-center text-purple-500 rounded-lg flex-shrink-0">
                    <FiDollarSign size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-cyan-900">Premium Course {item}</h3>
                    <p className="text-sm text-cyan-600 mt-1">Advanced course with certification</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">PREMIUM</span>
                      <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded">{Math.floor(Math.random() * 10) + 5} modules</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Certification</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <span className="font-bold text-purple-600">${Math.floor(Math.random() * 50) + 20}</span>
                    <button className="mt-2 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Latest Additions - Card Layout */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiClock className="text-amber-500 text-lg md:text-xl" />
                <span>Latest Additions</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                View all new courses →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-white rounded-lg border border-cyan-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-24 bg-amber-100 flex items-center justify-center text-amber-500">
                    <FiClock size={20} />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-cyan-900 truncate">New Course {item}</h3>
                    <p className="text-xs text-cyan-500 mt-1">Added {item} day{item !== 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Popular Skills */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiStar className="text-yellow-500 text-lg md:text-xl" />
                <span>Popular Skills</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                Explore all skills →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {['Web Development', 'Data Science', 'Graphic Design', 'Digital Marketing', 
                'Mobile App Dev', 'UI/UX Design', 'Photography', 'Video Editing'].map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-cyan-900">{skill}</h3>
                  <p className="text-xs text-cyan-600 mt-1">{Math.floor(Math.random() * 100) + 20} courses</p>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Top Mentors */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mb-8 md:mb-12 w-full"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiUsers className="text-rose-500 text-lg md:text-xl" />
                <span>Top Mentors</span>
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-xs md:text-sm font-medium whitespace-nowrap">
                View all mentors →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {['Alex Johnson', 'Maria Garcia', 'Sam Wilson', 'Priya Patel', 
                'James Lee', 'Emma Davis', 'Carlos Ruiz', 'Aisha Khan'].map((mentor, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-cyan-100 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-2 flex items-center justify-center text-cyan-800 font-bold">
                    {mentor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-medium text-cyan-900">{mentor}</h3>
                  <p className="text-xs text-cyan-600 mt-1">{['Web Dev', 'Data Sci', 'Design', 'Marketing', 'Mobile', 'UI/UX', 'Photo', 'Video'][index]}</p>
                </div>
              ))}
            </div>
          </motion.section>
          
          {/* Community Discussions */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 md:mb-12 w-full"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-900 mb-4 md:mb-6">Community Discussions</h2>
            <div className="w-full">
              <ExpandableCardDemo />
            </div>
          </motion.section>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 md:mt-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white w-full"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Ready to share your skills?</h3>
              <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">Join our community of learners and mentors to grow together.</p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-cyan-800 font-medium rounded-lg hover:bg-opacity-90 transition text-sm md:text-base whitespace-nowrap">
                  Create a Course
                </button>
                <button className="px-4 py-2 md:px-6 md:py-3 border border-white bg-transparent font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition text-sm md:text-base whitespace-nowrap">
                  Explore Community
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}