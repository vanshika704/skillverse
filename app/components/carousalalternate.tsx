"use client"
import { useState, useEffect } from 'react';
import { Sidebar } from "./SideBar";
import { motion, AnimatePresence } from 'framer-motion';

function SkillverseDashboard() {
  // const [activeTab, setActiveTab] = useState('dashboard');
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alex Chen",
      progress: 30,
      thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Data Science"
    },
    {
      id: 3,
      title: "Digital Illustration Masterclass",
      instructor: "Emma Rodriguez",
      progress: 80,
      thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Design"
    }
  ];

  const recommendations = [
    {
      id: 4,
      title: "Blockchain Basics",
      instructor: "James Wilson",
      thumbnail: "https://images.unsplash.com/photo-1621570075270-49d1e1f9423f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "6h 30m",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "UX Design Principles",
      instructor: "Lisa Wong",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "4h 15m",
      level: "Beginner"
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      instructor: "Dr. Michael Brown",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "8h 45m",
      level: "Advanced"
    }
  ];

  const achievements = [
    { name: "Fast Learner", icon: "🏎️", date: "May 5, 2023" },
    { name: "Perfect Week", icon: "🌟", date: "Apr 28, 2023" },
    { name: "Course Master", icon: "🎓", date: "Apr 15, 2023" }
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

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar  />
      
      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-y-auto">
   

<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-cyan-900 via-cyan-500 to-cyan-800 shadow-2xl"
>
  <div className="absolute inset-0 bg-noise opacity-10"></div>
  
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8">
    <div className="text-left mb-6 md:mb-0 md:w-2/3">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        Welcome back, <span className="text-amber-300">Alex</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-lg text-cyan-100"
      >
        Continue your learning journey today
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex flex-wrap gap-4"
      >
        <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
          Explore Courses
        </button>
        <button className="px-6 py-3 bg-cyan-500 bg-opacity-20 hover:bg-opacity-30 text-white font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
          View Progress
        </button>
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
          <div className="bg-cyan-800 bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Active Courses</p>
                <h3 className="text-2xl font-bold text-white mt-1">3</h3>
              </div>
              <div className="p-3 rounded-full bg-cyan-900 bg-opacity-50">
                <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-cyan-800  bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Hours Learned</p>
                <h3 className="text-2xl font-bold text-white mt-1">42.5</h3>
              </div>
              <div className="p-3 rounded-full bg-amber-900 bg-opacity-50">
                <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-cyan-800 bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Skills Mastered</p>
                <h3 className="text-2xl font-bold text-white mt-1">12</h3>
              </div>
              <div className="p-3 rounded-full bg-emerald-900 bg-opacity-50">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-cyan-800 bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Weekly Goal</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-cyan-900 bg-opacity-50 rounded-full h-2.5 mr-2">
                    <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-900 bg-opacity-50">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Current Courses Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-white border-opacity-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-700">Your Current Courses</h2>
            <button className="text-cyan-700 hover:text-white text-sm font-medium flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                className="absolute inset-0 bg-gradient-to-r from-cyan-800 to-cyan-900 rounded-xl p-6 flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-900 bg-cyan-200 rounded-full mb-4">
                    {courses[currentCourseIndex].category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{courses[currentCourseIndex].title}</h3>
                  <p className="text-cyan-100 mb-4">Instructor: {courses[currentCourseIndex].instructor}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-cyan-100 mb-1">
                      <span>Progress</span>
                      <span>{courses[currentCourseIndex].progress}%</span>
                    </div>
                    <div className="w-full bg-cyan-900 bg-opacity-50 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full" 
                        style={{ width: `${courses[currentCourseIndex].progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                    Continue Learning
                  </button>
                </div>
                
                <div className="md:w-1/2 flex items-center justify-center">
                  <img 
                    src={courses[currentCourseIndex].thumbnail} 
                    alt={courses[currentCourseIndex].title}
                    className="rounded-lg shadow-xl object-cover w-full h-48 md:h-full border-4 border-white border-opacity-20"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCourseIndex(index)}
                  className={`w-2 h-2 rounded-full ${currentCourseIndex === index ? 'bg-amber-400' : 'bg-white bg-opacity-30'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Recommendations & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-cyan-900">Recommended For You</h2>
              <button className="text-cyan-900 hover:text-white text-sm font-medium flex items-center">
                See More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center bg-cyan-200 bg-opacity-5 hover:bg-opacity-10 rounded-xl p-4 transition-all duration-300 cursor-pointer"
                >
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover mr-4 border border-white border-opacity-10"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-cyan-900">{course.title}</h4>
                    <p className="text-sm text-cyan-900">{course.instructor}</p>
                    <div className="flex items-center mt-1 text-xs text-cyan-900">
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
                  <button className="p-2 bg-cyan-700 bg-opacity-50 hover:bg-opacity-70 rounded-full text-cyan-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Achievements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-white border-opacity-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Your Achievements</h2>
              <button className="text-cyan-200 hover:text-white text-sm font-medium flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-cyan-800 to-cyan-900 rounded-xl p-4 text-center shadow-lg cursor-pointer"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium text-white mb-1">{achievement.name}</h4>
                  <p className="text-xs text-cyan-200">{achievement.date}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-3">Next Milestone</h4>
              <div className="flex items-center">
                <div className="relative w-full h-3 bg-cyan-900 bg-opacity-50 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-white">60%</span>
              </div>
              <p className="mt-2 text-sm text-cyan-200">Complete 5 more hours to unlock "Dedicated Learner" badge</p>
            </div>
          </motion.div>
        </div>
        
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white bg-opacity-10 rounded-2xl p-6 mt-8 backdrop-blur-sm border border-white border-opacity-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cyan-700">Recent Activity</h2>
            <button className="text-cyan-900 hover:text-white text-sm font-medium flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start p-4 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-xl transition-all duration-300"
              >
                <div className="p-2 bg-cyan-800 bg-opacity-50 rounded-full mr-4">
                  <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-cyan-900">Completed "State Management in React"</h4>
                  <p className="text-sm text-cyan-900 mt-1">You've completed the module with 92% score</p>
                  <p className="text-xs text-cyan-700 mt-2">2 hours ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SkillverseDashboard;