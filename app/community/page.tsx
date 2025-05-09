
'use client'; 

import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiTrendingUp, FiUsers, FiAward, FiBookmark } from 'react-icons/fi';

import CoverflowCarousel from '../components/cardCarousal';
import { ExpandableCardDemo } from '../components/cards';
import { Sidebar } from '../components/SideBar';

export default function Community() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" w-full overflow-x-hidden  h-screen  bg-gradient-to-br from-cyan-200 to-blue-50"
    >
      <div className="flex max-w-screen">
        <Sidebar />
        
        <div className="flex-1 p-0 ml-0 md:ml-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-cyan-900 mb-2">SkillVerse Community</h1>
            <p className="text-cyan-700">Connect, learn and grow with fellow skill enthusiasts</p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search courses, skills or members..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-cyan-200 text-cyan-600 hover:bg-cyan-50 transition-colors">
                <FiFilter />
                <span>Filters</span>
              </button>
            </div>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white p-5 rounded-xl shadow-sm border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-cyan-100 text-cyan-600">
                  <FiTrendingUp size={20} />
                </div>
                <div>
                  <p className="text-sm text-cyan-500">Active Learners</p>
                  <p className="text-2xl font-bold text-cyan-900">12,345</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-cyan-100 text-cyan-600">
                  <FiUsers size={20} />
                </div>
                <div>
                  <p className="text-sm text-cyan-500">Skill Mentors</p>
                  <p className="text-2xl font-bold text-cyan-900">1,234</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-cyan-100 text-cyan-600">
                  <FiAward size={20} />
                </div>
                <div>
                  <p className="text-sm text-cyan-500">Courses Available</p>
                  <p className="text-2xl font-bold text-cyan-900">567</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Featured Courses */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-cyan-900 flex items-center gap-2">
                <FiBookmark className="text-cyan-500" />
                Featured Courses
              </h2>
              <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
                View all →
              </button>
            </div>
            <CoverflowCarousel />
          </motion.section>
          
          {/* Community Posts */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-cyan-900 mb-6">Community Discussions</h2>
            <ExpandableCardDemo />
          </motion.section>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 text-white"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to share your skills?</h3>
              <p className="mb-6 opacity-90">Join our community of learners and mentors to grow together.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-white text-cyan-800 font-medium rounded-lg hover:bg-opacity-90 transition">
                  Create a Course
                </button>
                <button className="px-6 py-3 border border-white bg-transparent font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                  Explore Community
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}