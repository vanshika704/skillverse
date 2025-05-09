"use client"
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiStar, FiClock, FiMapPin, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';
import { Sidebar } from '../components/SideBar';

// Image paths
const LearningIllustration = '/assets/5869496.jpg';
const NoResultsIllustration = '/assets/5189219.jpg';
const SkillCategoriesIllustration = '/assets/5293.jpg';

interface Skill {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  duration: string;
  location: string;
  price: string;
  image: string;
  category: string;
  popular?: boolean;
}

const skillsData: Skill[] = [
  // ... (keep your existing skills data)
];

const categories = ["All", "Creative", "Technical", "Communication", "Lifestyle", "Business"];

export default function FindSkill() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredSkills = skillsData.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         skill.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesPrice = parseInt(skill.price.slice(1)) <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-cyan-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-cyan-200 opacity-15 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-cyan-300 opacity-10 blur-xl"></div>
        </div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-cyan-400 via-cyan-600 to-cyan-900 text-white"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-20 right-30 w-60 h-60 rounded-full bg-white"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Discover Your <span className="text-cyan-200">Next Adventure</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl max-w-3xl mb-10 text-cyan-100"
            >
              Join our community of 50,000+ learners mastering new skills every day
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-full max-w-2xl"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-cyan-900 h-5 w-5" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-32 py-4 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-cyan-100 focus:outline-none text-gray-800"
                placeholder="Search for skills, instructors, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-900 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md">
                Search
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 w-full max-w-2xl"
            >
              <Image 
                src={LearningIllustration} 
                alt="Learning illustration"
                width={800}
                height={400}
                className="w-full h-auto rounded-lg shadow-xl"
                priority
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categories Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Categories</h2>
                <p className="text-gray-600">Find skills that match your interests</p>
              </div>
              <div className="hidden md:block">
                <Image 
                  src={SkillCategoriesIllustration} 
                  alt="Skill categories illustration"
                  width={160}
                  height={160}
                  className="w-40 h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-cyan-500 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:shadow-md shadow-sm'
                  }`}
                >
                  <span className="font-medium">{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Filters Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <h3 className="flex items-center text-lg font-bold text-gray-800 mb-3">
                  <FiFilter className="mr-2 text-cyan-500" />
                  Refine Your Search
                </h3>
                <p className="text-gray-600 text-sm">Adjust filters to find perfect matches</p>
              </div>
              
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>$0</span>
                        <span className="font-medium text-cyan-600">${priceRange}</span>
                        <span>$500</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                    <div className="flex flex-wrap gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <button
                          key={level}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition shadow-sm"
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Format Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <div className="flex flex-wrap gap-2">
                      {['Online', 'In-Person', 'Hybrid'].map(format => (
                        <button
                          key={format}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition shadow-sm"
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <div className="flex flex-wrap gap-2">
                      {['< 4 weeks', '4-8 weeks', '8+ weeks'].map(duration => (
                        <button
                          key={duration}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition shadow-sm"
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Results Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredSkills.length} {filteredSkills.length === 1 ? 'Skill' : 'Skills'} Found
              </h2>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2 text-sm">Sort by:</span>
                <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSkills.map((skill) => (
                  <motion.article
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative group"
                  >
                    {skill.popular && (
                      <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                        Popular
                      </div>
                    )}
                    
                    <button 
                      onClick={() => toggleFavorite(skill.id)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-cyan-50 transition"
                      aria-label={favorites.includes(skill.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <FiHeart 
                        className={`h-5 w-5 transition-colors ${
                          favorites.includes(skill.id) 
                            ? 'fill-cyan-500 text-cyan-500' 
                            : 'text-gray-400 group-hover:text-cyan-400'
                        }`} 
                      />
                    </button>
                    
                    <div className="h-48 bg-gradient-to-r from-cyan-400 to-cyan-600 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white opacity-20">{skill.title.charAt(0)}</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{skill.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          skill.category === 'Technical' ? 'bg-blue-100 text-blue-800' :
                          skill.category === 'Creative' ? 'bg-purple-100 text-purple-800' :
                          skill.category === 'Communication' ? 'bg-green-100 text-green-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {skill.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">by {skill.instructor}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-5 text-sm">
                        <div className="flex items-center">
                          <FiStar className="text-amber-400 mr-1" />
                          <span className="font-medium text-gray-700">{skill.rating}</span>
                          <span className="text-gray-500 ml-1">({skill.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="text-cyan-500 mr-1" />
                          <span className="text-gray-600">{skill.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <FiMapPin className="text-cyan-500 mr-1" />
                          <span className="text-gray-600">{skill.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-2xl font-bold text-cyan-600">{skill.price}</span>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm"
                        >
                          Enroll Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg p-12 text-center"
              >
                <Image 
                  src={NoResultsIllustration} 
                  alt="No results found"
                  width={256}
                  height={256}
                  className="w-64 h-auto mx-auto mb-8"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No matching skills found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any skills matching your criteria. Try adjusting your filters or search for something different.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setPriceRange(500);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md"
                >
                  Reset All Filters
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        </main>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Start Your Learning Journey?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 max-w-3xl mx-auto text-cyan-100"
            >
              Join our community of passionate learners and unlock your potential today.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg"
              >
                Browse All Skills
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg"
              >
                Become an Instructor
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}