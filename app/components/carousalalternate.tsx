

"use client"
import { useState, useEffect, useRef } from 'react';
import { Sidebar } from "./SideBar";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import user from '../models/user';

function SkillverseDashboard() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [showNotification, setShowNotification] = useState(true);
  const [streakCount, setStreakCount] = useState(7);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Determine time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  // Mock data
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Web Development",
      lessonsCompleted: 12,
      totalLessons: 18,
      lastAccessed: "2 hours ago"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alex Chen",
      progress: 30,
      thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Data Science",
      lessonsCompleted: 6,
      totalLessons: 20,
      lastAccessed: "Yesterday"
    },
    {
      id: 3,
      title: "Digital Illustration Masterclass",
      instructor: "Emma Rodriguez",
      progress: 80,
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Design",
      lessonsCompleted: 16,
      totalLessons: 20,
      lastAccessed: "5 hours ago"
    }
  ];

  const recommendations = [
    {
      id: 4,
      title: "Blockchain Basics",
      instructor: "James Wilson",
      thumbnail: "https://images.unsplash.com/photo-1621570075270-49d1e1f9423f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "6h 30m",
      level: "Intermediate",
      rating: 4.8,
      students: 1243,
      isNew: true
    },
    {
      id: 5,
      title: "UX Design Principles",
      instructor: "Lisa Wong",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "4h 15m",
      level: "Beginner",
      rating: 4.6,
      students: 892,
      isNew: false
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      instructor: "Dr. Michael Brown",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "8h 45m",
      level: "Advanced",
      rating: 4.9,
      students: 2156,
      isNew: true
    }
  ];

  const achievements = [
    { name: "Fast Learner", icon: "🏎️", date: "May 5, 2023", description: "Completed 3 courses in one week", progress: 100 },
    { name: "Perfect Week", icon: "🌟", date: "Apr 28, 2023", description: "Learned every day for 7 days straight", progress: 100 },
    { name: "Course Master", icon: "🎓", date: "Apr 15, 2023", description: "Finished a course with 95%+ score", progress: 100 },
    { name: "Dedicated Learner", icon: "📚", date: "In progress", description: "Complete 20 hours of learning", progress: 65 },
    { name: "Skill Explorer", icon: "🔍", date: "In progress", description: "Try 3 different course categories", progress: 40 },
    { name: "Community Star", icon: "💬", date: "In progress", description: "Participate in 5 discussions", progress: 20 }
  ];

  const recentActivities = [
    { type: "completion", course: "State Management in React", score: 92, time: "2 hours ago", icon: "🎯" },
    { type: "enrollment", course: "Advanced CSS Techniques", time: "5 hours ago", icon: "📝" },
    { type: "milestone", course: "Machine Learning Fundamentals", milestone: "Completed 30%", time: "Yesterday", icon: "🏆" },
    { type: "comment", course: "Digital Illustration", discussion: "Shading Techniques", time: "2 days ago", icon: "💬" },
    { type: "friend", action: "Connected with Maria", time: "3 days ago", icon: "👋" }
  ];

  const learningGoals = [
    { name: "Complete React Course", target: "May 30, 2023", progress: 65 },
    { name: "Learn 5 New Algorithms", target: "June 15, 2023", progress: 20 },
    { name: "Build Portfolio Project", target: "July 1, 2023", progress: 10 }
  ];

  // Auto-rotate courses
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseIndex((prev) => (prev + 1) % courses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [courses.length]);

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close notification after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const greeting = () => {
    switch(timeOfDay) {
      case 'morning': return 'Good morning';
      case 'afternoon': return 'Good afternoon';
      case 'evening': return 'Good evening';
      default: return 'Hello';
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-50 to-indigo-50" ref={containerRef}>
      <Sidebar  />
      
      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-y-auto">
        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative mb-6 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-white bg-opacity-20 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">New feature available!</p>
                    <p className="text-sm opacity-90">Try our new AI-powered learning assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ y }}
          className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-cyan-900 via-cyan-700 to-indigo-800 shadow-2xl"
        >
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 to-transparent z-10"></div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-lg"
          />
          <motion.div 
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-amber-400 bg-opacity-20 rounded-full blur-xl"
          />
          
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-8">
            <div className="text-left mb-6 md:mb-0 md:w-2/3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center mb-2"
              >
                <span className="text-lg text-cyan-200 mr-2">{greeting()},</span>
                <div className="relative">
                  <span className="text-4xl md:text-5xl font-bold text-white">Alex</span>
           


                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 origin-left"
                  />
                </div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-lg text-cyan-100 max-w-lg"
              >
                {timeOfDay === 'morning' 
                  ? "A beautiful day to learn something new!" 
                  : timeOfDay === 'afternoon' 
                    ? "Keep up the great learning momentum!" 
                    : "Time to reflect on what you've learned today!"}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex flex-wrap gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Courses
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-cyan-600 bg-opacity-20 hover:bg-opacity-30 text-white font-medium rounded-full shadow-lg transition-all duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  View Progress
                </motion.button>
              </motion.div>
              
              {/* Streak counter */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-2 px-4 w-max"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                    {streakCount}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-cyan-900">Current streak</p>
                  <p className="text-sm font-medium text-cyan-900">7 days in a row</p>
                </div>
              </motion.div>
            </div>

            {/* Image Overflow Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="relative w-full md:w-1/3 lg:w-1/4"
            >
              <img 
                src="/assets/3772712-removebg-preview.png"
                alt="Learning illustration"
                className="absolute -top-10 md:-top-20 -right-10 md:-right-16 w-[200%] md:w-[150%] max-w-none object-contain pointer-events-none z-20"
              />
              <div className="invisible h-[12rem] md:h-[16rem]"></div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              title: "Active Courses", 
              value: "3", 
              icon: (
                <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              bg: "bg-cyan-900 bg-opacity-50",
              change: "+1 this week"
            },
            { 
              title: "Hours Learned", 
              value: "42.5", 
              icon: (
                <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              bg: "bg-amber-900 bg-opacity-50",
              change: "+5.2h this week"
            },
            { 
              title: "Skills Mastered", 
              value: "12", 
              icon: (
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              bg: "bg-emerald-900 bg-opacity-50",
              change: "+2 this month"
            },
            { 
              title: "Weekly Goal", 
              value: `${progress}%`, 
              icon: (
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              bg: "bg-purple-900 bg-opacity-50",
              change: "On track"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-cyan-950 via-cyan-600 to-cyan-900 bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-cyan-100 mt-1">{stat.value}</h3>
                  <p className="text-xs text-cyan-100 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Current Courses Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-900">Your Current Courses</h2>
            <button className="text-cyan-700 hover:text-cyan-900 text-sm font-medium flex items-center group">
              View All
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="relative h-64 overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={courses[currentCourseIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-900 rounded-xl p-6 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-900 bg-cyan-200 rounded-full mb-4">
                    {courses[currentCourseIndex].category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{courses[currentCourseIndex].title}</h3>
                  <p className="text-cyan-100 mb-4">Instructor: {courses[currentCourseIndex].instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-cyan-100 mb-1">
                      <span>Progress</span>
                      <span>{courses[currentCourseIndex].progress}%</span>
                    </div>
                    <div className="w-full bg-cyan-800 bg-opacity-50 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full" 
                        style={{ width: `${courses[currentCourseIndex].progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-cyan-200">Lessons</p>
                      <p className="text-white font-medium">
                        {courses[currentCourseIndex].lessonsCompleted}/{courses[currentCourseIndex].totalLessons}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-cyan-200">Last Accessed</p>
                      <p className="text-white font-medium">{courses[currentCourseIndex].lastAccessed}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transition-all duration-300"
                    >
                      Continue Learning
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium rounded-full shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                <div className="md:w-1/2 flex items-center justify-center relative">
                  <img 
                    src={courses[currentCourseIndex].thumbnail} 
                    alt={courses[currentCourseIndex].title}
                    className="rounded-lg shadow-xl object-cover w-full h-48 md:h-full border-4 border-white border-opacity-20"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-2 -right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    {courses[currentCourseIndex].progress}% Complete
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {courses.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentCourseIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full ${currentCourseIndex === index ? 'bg-amber-400' : 'bg-white bg-opacity-30'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Learning Goals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-900">Your Learning Goals</h2>
            <button className="text-cyan-700 hover:text-cyan-900 text-sm font-medium flex items-center group">
              Add Goal
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-cyan-50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-cyan-900">{goal.name}</h4>
                  <span className="text-xs text-cyan-700">Target: {goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-700 h-2.5 rounded-full" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-cyan-700">{goal.progress}% complete</span>
                  <span className="text-xs text-cyan-700">
                  <span className="text-xs text-cyan-700">
  {Math.ceil((new Date(goal.target).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
</span>

                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Recommendations & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-cyan-900">Recommended For You</h2>
              <button className="text-cyan-700 hover:text-cyan-900 text-sm font-medium flex items-center group">
                See More
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {recommendations.map((course, index) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="flex items-center bg-cyan-50 hover:bg-cyan-100 rounded-xl p-4 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover mr-4 border-2 border-white group-hover:border-cyan-300 transition-all"
                    />
                    {course.isNew && (
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-cyan-900">{course.title}</h4>
                    <p className="text-sm text-cyan-700">{course.instructor}</p>
                    <div className="flex items-center mt-1 text-xs text-cyan-700">
                      <span className="flex items-center mr-3">
                        <svg className="w-3 h-3 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {course.rating} ({course.students.toLocaleString()})
                      </span>
                      <span className="flex items-center mr-3">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Achievements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-cyan-200 rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-cyan-900">Your Achievements</h2>
              <button className="text-cyan-700 hover:text-cyan-900 text-sm font-medium flex items-center group">
                View All
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {achievements.slice(0, 3).map((achievement, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl p-4 text-center shadow-lg cursor-pointer relative overflow-hidden"
                >
                
                  <div className="relative z-10">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium text-cyan-100 mb-1">{achievement.name}</h4>
                    <p className="text-xs text-cyan-100">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-cyan-900 mb-3">In Progress</h4>
              <div className="space-y-4">
                {achievements.slice(3).map((achievement, index) => (
                  <div key={index} className="bg-cyan-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{achievement.icon}</div>
                      <div className="flex-1">
                        <h5 className="font-medium text-cyan-900">{achievement.name}</h5>
                        <p className="text-xs text-cyan-700">{achievement.description}</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-1.5 rounded-full" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-cyan-700">{achievement.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 mt-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-900">Recent Activity</h2>
            <button className="text-cyan-700 hover:text-cyan-900 text-sm font-medium flex items-center group">
              View All
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start p-4 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-all duration-300 group"
              >
                <div className="text-2xl mr-4 group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-cyan-900">
                    {activity.type === "completion" && `Completed "${activity.course}"`}
                    {activity.type === "enrollment" && `Enrolled in "${activity.course}"`}
                    {activity.type === "milestone" && `Reached milestone in "${activity.course}"`}
                    {activity.type === "comment" && `Commented on "${activity.discussion}"`}
                    {activity.type === "friend" && activity.action}
                  </h4>
                  <p className="text-sm text-cyan-700 mt-1">
                    {activity.type === "completion" && `With ${activity.score}% score`}
                    {activity.type === "milestone" && activity.milestone}
                  </p>
                  <p className="text-xs text-cyan-600 mt-2">{activity.time}</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 text-cyan-700 hover:text-cyan-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SkillverseDashboard;