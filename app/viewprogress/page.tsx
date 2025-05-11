'use client'
import { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer} from '../utils/motion'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

type Workshop = {
  id: string;
  title: string;
  date: string;
  category: string;
  skillPoints: number;
  isHost: boolean;
};

type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
  lastPracticed: string;
};

const ProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workshops' | 'skills'>('overview');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      
      // Mock data - in a real app, this would come from your backend
      const mockWorkshops: Workshop[] = [
        { id: '1', title: 'React Advanced Patterns', date: '2023-10-15', category: 'Frontend', skillPoints: 150, isHost: true },
        { id: '2', title: 'Node.js Performance', date: '2023-09-22', category: 'Backend', skillPoints: 120, isHost: false },
        { id: '3', title: 'UI/UX Principles', date: '2023-11-05', category: 'Design', skillPoints: 90, isHost: true },
        { id: '4', title: 'TypeScript Deep Dive', date: '2023-08-30', category: 'Frontend', skillPoints: 110, isHost: false },
        { id: '5', title: 'DevOps Basics', date: '2023-12-12', category: 'DevOps', skillPoints: 80, isHost: false },
      ];

      const mockSkills: Skill[] = [
        { id: '1', name: 'React', level: 4, category: 'Frontend', lastPracticed: '2023-11-20' },
        { id: '2', name: 'TypeScript', level: 3, category: 'Frontend', lastPracticed: '2023-11-18' },
        { id: '3', name: 'Node.js', level: 3, category: 'Backend', lastPracticed: '2023-10-30' },
        { id: '4', name: 'UI Design', level: 2, category: 'Design', lastPracticed: '2023-11-05' },
        { id: '5', name: 'Docker', level: 1, category: 'DevOps', lastPracticed: '2023-12-12' },
      ];

      setWorkshops(mockWorkshops);
      setSkills(mockSkills);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Calculate stats
  const hostedCount = workshops.filter(w => w.isHost).length;
  const attendedCount = workshops.filter(w => !w.isHost).length;
  const totalSkillPoints = workshops.reduce((sum, workshop) => sum + workshop.skillPoints, 0);
  const skillCategories = [...new Set(skills.map(skill => skill.category))];
  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 3);

  // Chart data
  const workshopsByCategoryData = {
    labels: ['Frontend', 'Backend', 'Design', 'DevOps'],
    datasets: [
      {
        label: 'Workshops Attended',
        data: [
          workshops.filter(w => w.category === 'Frontend' && !w.isHost).length,
          workshops.filter(w => w.category === 'Backend' && !w.isHost).length,
          workshops.filter(w => w.category === 'Design' && !w.isHost).length,
          workshops.filter(w => w.category === 'DevOps' && !w.isHost).length,
        ],
        backgroundColor: 'rgba(6, 182, 212, 0.8)',
      },
      {
        label: 'Workshops Hosted',
        data: [
          workshops.filter(w => w.category === 'Frontend' && w.isHost).length,
          workshops.filter(w => w.category === 'Backend' && w.isHost).length,
          workshops.filter(w => w.category === 'Design' && w.isHost).length,
          workshops.filter(w => w.category === 'DevOps' && w.isHost).length,
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  const skillLevelsData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: skills.map(skill => skill.level),
        backgroundColor: 'rgba(6, 182, 212, 0.6)',
        borderColor: 'rgba(6, 182, 212, 1)',
        borderWidth: 1,
      },
    ],
  };

  const skillPointsOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Skill Points Earned',
        data: [0, 0, 0, 0, 0, 0, 0, 110, 120, 150, 90, 80],
        fill: false,
        backgroundColor: 'rgba(6, 182, 212, 1)',
        borderColor: 'rgba(6, 182, 212, 0.8)',
        tension: 0.4,
      },
    ],
  };

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-cyan-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeIn('down', 'tween', 0.1, 1)}>
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">Your SkillVerse Journey</h1>
          <p className="text-cyan-700">Track your learning progress and achievements</p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="mt-8 flex border-b border-cyan-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-cyan-600 border-b-2 border-cyan-500' : 'text-cyan-500 hover:text-cyan-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('workshops')}
            className={`px-4 py-2 font-medium ${activeTab === 'workshops' ? 'text-cyan-600 border-b-2 border-cyan-500' : 'text-cyan-500 hover:text-cyan-600'}`}
          >
            Workshops
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 font-medium ${activeTab === 'skills' ? 'text-cyan-600 border-b-2 border-cyan-500' : 'text-cyan-500 hover:text-cyan-600'}`}
          >
            Skills
          </button>
        </motion.div>

        {isLoading ? (
          <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </motion.div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="mt-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-cyan-500"
                  >
                    <h3 className="text-lg font-medium text-cyan-700">Workshops Hosted</h3>
                    <p className="text-3xl font-bold text-cyan-900 mt-2">{hostedCount}</p>
                    <p className="text-cyan-600 mt-1">You're sharing knowledge with others!</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
                  >
                    <h3 className="text-lg font-medium text-cyan-700">Workshops Attended</h3>
                    <p className="text-3xl font-bold text-cyan-900 mt-2">{attendedCount}</p>
                    <p className="text-cyan-600 mt-1">Keep expanding your horizons!</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500"
                  >
                    <h3 className="text-lg font-medium text-cyan-700">Total Skill Points</h3>
                    <p className="text-3xl font-bold text-cyan-900 mt-2">{totalSkillPoints}</p>
                    <p className="text-cyan-600 mt-1">Your learning is paying off!</p>
                  </motion.div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Workshops by Category</h3>
                    <div className="h-64">
                      <Bar 
                        data={workshopsByCategoryData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-xl shadow-md"
                  >
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Skill Points Over Time</h3>
                    <div className="h-64">
                      <Line 
                        data={skillPointsOverTimeData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Top Skills */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-xl shadow-md mb-8"
                >
                  <h3 className="text-lg font-medium text-cyan-800 mb-4">Your Top Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-4 border border-cyan-100 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-cyan-900">{skill.name}</h4>
                          <span className="text-sm px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                            {skill.category}
                          </span>
                        </div>
                        <div className="w-full bg-cyan-100 rounded-full h-2.5">
                          <div 
                            className="bg-cyan-600 h-2.5 rounded-full" 
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-cyan-600 mt-2">Level {skill.level}/5</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Workshops Tab */}
            {activeTab === 'workshops' && (
              <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Hosted Workshops</h3>
                    {workshops.filter(w => w.isHost).length > 0 ? (
                      <ul className="space-y-4">
                        {workshops.filter(w => w.isHost).map((workshop) => (
                          <motion.li 
                            key={workshop.id}
                            whileHover={{ x: 5 }}
                            className="p-4 border border-cyan-100 rounded-lg"
                          >
                            <h4 className="font-medium text-cyan-900">{workshop.title}</h4>
                            <div className="flex justify-between mt-2 text-sm text-cyan-600">
                              <span>{workshop.category}</span>
                              <span>{new Date(workshop.date).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-amber-600 font-medium">+{workshop.skillPoints} points</span>
                              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">Host</span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-cyan-600">You haven't hosted any workshops yet.</p>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Attended Workshops</h3>
                    {workshops.filter(w => !w.isHost).length > 0 ? (
                      <ul className="space-y-4">
                        {workshops.filter(w => !w.isHost).map((workshop) => (
                          <motion.li 
                            key={workshop.id}
                            whileHover={{ x: 5 }}
                            className="p-4 border border-cyan-100 rounded-lg"
                          >
                            <h4 className="font-medium text-cyan-900">{workshop.title}</h4>
                            <div className="flex justify-between mt-2 text-sm text-cyan-600">
                              <span>{workshop.category}</span>
                              <span>{new Date(workshop.date).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-amber-600 font-medium">+{workshop.skillPoints} points</span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-cyan-600">You haven't attended any workshops yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-medium text-cyan-800 mb-4">Workshop Categories</h3>
                  <div className="h-64">
                    <Pie 
                      data={{
                        labels: ['Frontend', 'Backend', 'Design', 'DevOps'],
                        datasets: [{
                          data: [
                            workshops.filter(w => w.category === 'Frontend').length,
                            workshops.filter(w => w.category === 'Backend').length,
                            workshops.filter(w => w.category === 'Design').length,
                            workshops.filter(w => w.category === 'DevOps').length,
                          ],
                          backgroundColor: [
                            'rgba(6, 182, 212, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(139, 92, 246, 0.7)',
                          ],
                          borderColor: [
                            'rgba(6, 182, 212, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(139, 92, 246, 1)',
                          ],
                          borderWidth: 1,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Your Skill Levels</h3>
                    <div className="h-64">
                      <Bar 
                        data={skillLevelsData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          indexAxis: 'y',
                          scales: {
                            x: {
                              max: 5,
                              ticks: {
                                stepSize: 1,
                              },
                            },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-medium text-cyan-800 mb-4">Skills by Category</h3>
                    <div className="space-y-4">
                      {skillCategories.map((category) => (
                        <div key={category} className="mb-4">
                          <h4 className="font-medium text-cyan-700 mb-2">{category}</h4>
                          <div className="space-y-2">
                            {skills.filter(skill => skill.category === category).map(skill => (
                              <div key={skill.id}>
                                <div className="flex justify-between text-sm text-cyan-600 mb-1">
                                  <span>{skill.name}</span>
                                  <span>Level {skill.level}/5</span>
                                </div>
                                <div className="w-full bg-cyan-100 rounded-full h-2">
                                  <div 
                                    className="bg-cyan-500 h-2 rounded-full" 
                                    style={{ width: `${(skill.level / 5) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-medium text-cyan-800 mb-4">Skill Development Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map(skill => (
                      <motion.div
                        key={skill.id}
                        whileHover={{ scale: 1.03 }}
                        className="p-4 border border-cyan-100 rounded-lg"
                      >
                        <h4 className="font-medium text-cyan-900 mb-2">{skill.name}</h4>
                        <div className="flex justify-between text-sm text-cyan-600 mb-2">
                          <span>{skill.category}</span>
                          <span>Last: {new Date(skill.lastPracticed).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < skill.level ? 'text-amber-400' : 'text-cyan-100'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-cyan-600">({skill.level}/5)</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProgressDashboard;