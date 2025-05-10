"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '../services/useApi';

type FormData = {
  title: string;
  description: string;
  date: string;
  time: string;
  isPaid: boolean;
  amount: number;
  url: string;
  topics: string;
  creator: string;
  enrolledUsers: string;
};

export default function AddCourseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    isPaid: false,
    amount: 0,
    url: '',
    topics: '',
    creator: '',
    enrolledUsers: ''
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const courseData = {
        ...formData,
        topics: formData.topics.split(',').map(topic => topic.trim()),
        enrolledUsers: formData.enrolledUsers.split(',').map(email => email.trim()),
        amount: formData.isPaid ? parseFloat(formData.amount.toString()) : 0
      };

      if (coverImage) {
        const formData = new FormData();
        Object.entries(courseData).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("coverImage", coverImage);
        
        await request("/courses", "POST", formData, true);
      } else {
        await request("/courses", "POST", courseData);
      }

      setIsOpen(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        isPaid: false,
        amount: 0,
        url: '',
        topics: '',
        creator: '',
        enrolledUsers: ''
      });
      setCoverImage(null);
    } catch (err: any) {
      console.error('Error creating course:', err);
      setError(err.message || "Failed to create course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-cyan-700 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg"
        whileHover={{ 
          scale: 1.02,
          background: "linear-gradient(to right, #0891b2, #06b6d4)",
          boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        Add Course
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-gray-900/45 bg-opacity-90 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-cyan-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
                    Add New Course
                  </h2>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="text-cyan-600 hover:text-cyan-800"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isSubmitting}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {error && (
                      <motion.div 
                        className="p-4 bg-red-50 text-red-600 rounded-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-cyan-800 font-medium mb-2" htmlFor="title">
                          Title*
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-cyan-800 font-medium mb-2" htmlFor="creator">
                          Creator*
                        </label>
                        <input
                          type="text"
                          id="creator"
                          name="creator"
                          value={formData.creator}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-cyan-800 font-medium mb-2" htmlFor="description">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-cyan-800 font-medium mb-2" htmlFor="coverImage">
                        Cover Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-cyan-200 border-dashed rounded-lg cursor-pointer hover:bg-cyan-50 transition-all ${isSubmitting ? 'opacity-50' : ''}`}>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="mb-2 text-sm text-cyan-700">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-cyan-500">
                              PNG, JPG, JPEG (MAX. 5MB)
                            </p>
                          </div>
                          <input 
                            id="coverImage" 
                            name="coverImage" 
                            type="file" 
                            className="hidden" 
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleImageChange}
                            disabled={isSubmitting}
                          />
                        </label>
                        {coverImage && (
                          <div className="flex-shrink-0">
                            <img 
                              src={URL.createObjectURL(coverImage)} 
                              alt="Preview" 
                              className="h-32 w-32 object-cover rounded-lg border border-cyan-200"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-cyan-800 font-medium mb-2" htmlFor="date">
                          Date*
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-cyan-800 font-medium mb-2" htmlFor="time">
                          Time*
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-cyan-800 font-medium mb-2" htmlFor="url">
                        YouTube/Live URL*
                      </label>
                      <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-cyan-800 font-medium mb-2" htmlFor="topics">
                        Topics (comma separated)*
                      </label>
                      <input
                        type="text"
                        id="topics"
                        name="topics"
                        value={formData.topics}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-cyan-800 font-medium mb-2" htmlFor="enrolledUsers">
                        Enrolled Users (comma separated emails)
                      </label>
                      <input
                        type="text"
                        id="enrolledUsers"
                        name="enrolledUsers"
                        value={formData.enrolledUsers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div 
                      className="flex items-center mb-6"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <input
                        type="checkbox"
                        id="isPaid"
                        name="isPaid"
                        checked={formData.isPaid}
                        onChange={handleChange}
                        className="w-5 h-5 text-cyan-600 border-cyan-300 rounded focus:ring-cyan-500"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="isPaid" className="ml-3 block text-cyan-800 font-medium">
                        This is a paid course
                      </label>
                    </motion.div>

                    {formData.isPaid && (
                      <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-cyan-800 font-medium mb-2" htmlFor="amount">
                          Amount (in Rupees)
                        </label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    )}
                  </div>

                  <motion.div 
                    className="flex justify-end space-x-4 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 border border-cyan-300 text-cyan-700 font-medium rounded-lg hover:bg-cyan-50 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-cyan-300 transition-all shadow-lg disabled:opacity-50"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(8, 145, 178, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Save Course'
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}