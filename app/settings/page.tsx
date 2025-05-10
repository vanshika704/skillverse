"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiLock, FiBell, FiShield, FiCreditCard, 
  FiEye, FiGlobe, FiHelpCircle, FiMail, FiPhone, 
  FiCalendar, FiAward, FiLink, FiUpload, FiX, FiMoon, FiSun
} from 'react-icons/fi';
import { Sidebar } from '../components/SideBar';

// Define all possible settings sections as a type
type SettingSection = 'profile' | 'account' | 'notifications' | 'privacy' | 'payments' | 'display' | 'language' | 'help';

// Type for social links
type SocialLink = {
  platform: string;
  url: string;
  connected: boolean;
};

// Type for skills
type Skill = {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  verified: boolean;
};

const SettingsPage = () => {
  // State with proper typing
  const [activeSection, setActiveSection] = useState<SettingSection>('profile');
  const [profileImage, setProfileImage] = useState<string | null>('/default-avatar.png');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    messages: true,
    endorsements: true,
    courses: true,
    mentions: false,
    system: true,
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Twitter', url: '', connected: false },
    { platform: 'LinkedIn', url: '', connected: true },
    { platform: 'GitHub', url: '', connected: false },
  ]);
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', level: 'Advanced', verified: true },
    { name: 'TypeScript', level: 'Intermediate', verified: true },
    { name: 'UI Design', level: 'Beginner', verified: false },
  ]);

  // Sections with proper typing
  const sections: {
    id: SettingSection;
    icon: React.ReactNode;
    title: string;
  }[] = [
    { id: 'profile', icon: <FiUser />, title: 'Profile' },
    { id: 'account', icon: <FiLock />, title: 'Account' },
    { id: 'notifications', icon: <FiBell />, title: 'Notifications' },
    { id: 'privacy', icon: <FiShield />, title: 'Privacy' },
    { id: 'payments', icon: <FiCreditCard />, title: 'Payments' },
    { id: 'display', icon: <FiEye />, title: 'Display' },
    { id: 'language', icon: <FiGlobe />, title: 'Language' },
    { id: 'help', icon: <FiHelpCircle />, title: 'Help' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSocialConnection = (platform: string) => {
    setSocialLinks(prev => prev.map(social => 
      social.platform === platform 
        ? { ...social, connected: !social.connected } 
        : social
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Your existing left sidebar would be here */}
      <Sidebar/>
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Settings header with tabs */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors flex items-center ${
                  activeSection === section.id
                    ? 'bg-cyan-100 text-cyan-700 border-b-2 border-cyan-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2 text-cyan-500">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6"
            >
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-100">
                          <img 
                            src={profileImage || '/default-avatar.png'} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <label className="absolute bottom-0 right-0 bg-cyan-500 text-white p-2 rounded-full cursor-pointer hover:bg-cyan-600 transition-colors">
                          <FiUpload size={16} />
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleImageUpload} 
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder="John"
                            defaultValue="Alex"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder="Doe"
                            defaultValue="Johnson"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          rows={3}
                          placeholder="Tell us about yourself..."
                          defaultValue="Frontend developer passionate about creating beautiful, accessible user experiences."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiAward className="mr-2 text-cyan-500" /> Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <div key={skill.name} className="bg-cyan-50 px-4 py-2 rounded-full flex items-center">
                          <span className="font-medium text-cyan-700">{skill.name}</span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="text-sm text-gray-600">{skill.level}</span>
                          {skill.verified && (
                            <span className="ml-2 text-cyan-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      ))}
                      <button className="flex items-center text-cyan-600 hover:text-cyan-700">
                        <span className="text-xl mr-1">+</span> Add Skill
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FiLink className="mr-2 text-cyan-500" /> Social Links
                    </h3>
                    <div className="space-y-3">
                      {socialLinks.map((social) => (
                        <div key={social.platform} className="flex items-center">
                          <div className="w-32 text-sm font-medium text-gray-700">{social.platform}</div>
                          <input
                            type="text"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            placeholder={`https://${social.platform.toLowerCase()}.com/username`}
                            disabled={!social.connected}
                            value={social.url}
                            onChange={(e) => {
                              setSocialLinks(prev => prev.map(s => 
                                s.platform === social.platform 
                                  ? { ...s, url: e.target.value } 
                                  : s
                              ));
                            }}
                          />
                          <button
                            onClick={() => toggleSocialConnection(social.platform)}
                            className={`ml-3 px-4 py-2 rounded-lg ${
                              social.connected 
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                : 'bg-cyan-500 text-white hover:bg-cyan-600'
                            }`}
                          >
                            {social.connected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Display Section */}
              {activeSection === 'display' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Theme Preferences</h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div 
                        className={`flex-1 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          !darkMode 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setDarkMode(false)}
                      >
                        <div className="flex items-center mb-4">
                          <FiSun className="mr-3 text-cyan-500" />
                          <span className="font-medium">Light Mode</span>
                          {!darkMode && (
                            <span className="ml-auto text-sm bg-cyan-500 text-white px-2 py-1 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="h-2 bg-gray-100 rounded-full mb-2"></div>
                          <div className="h-2 bg-gray-100 rounded-full mb-2 w-3/4"></div>
                          <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                        </div>
                      </div>
                      
                      <div 
                        className={`flex-1 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          darkMode 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setDarkMode(true)}
                      >
                        <div className="flex items-center mb-4">
                          <FiMoon className="mr-3 text-cyan-500" />
                          <span className="font-medium">Dark Mode</span>
                          {darkMode && (
                            <span className="ml-auto text-sm bg-cyan-500 text-white px-2 py-1 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                          <div className="h-2 bg-gray-700 rounded-full mb-2"></div>
                          <div className="h-2 bg-gray-700 rounded-full mb-2 w-3/4"></div>
                          <div className="h-2 bg-gray-700 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Font Size</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                        <button
                          key={size}
                          className={`px-6 py-2 border rounded-lg ${
                            size === 'Medium' 
                              ? 'border-cyan-500 bg-cyan-50 text-cyan-700' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Accessibility</h3>
                    <div className="space-y-4">
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mt-1 mr-3 h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500" 
                          defaultChecked 
                        />
                        <div>
                          <div className="font-medium">High contrast mode</div>
                          <div className="text-sm text-gray-500">Increases color contrast for better visibility</div>
                        </div>
                      </label>
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mt-1 mr-3 h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500" 
                        />
                        <div>
                          <div className="font-medium">Reduce motion</div>
                          <div className="text-sm text-gray-500">Minimizes animations and transitions</div>
                        </div>
                      </label>
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mt-1 mr-3 h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500" 
                          defaultChecked 
                        />
                        <div>
                          <div className="font-medium">Screen reader support</div>
                          <div className="text-sm text-gray-500">Optimizes for assistive technologies</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Other sections would follow similar patterns */}
              
              {activeSection !== 'profile' && activeSection !== 'display' && (
                <div className="text-center py-12">
                  <div className="mx-auto w-48 h-48 bg-cyan-50 rounded-full flex items-center justify-center mb-6">
                    <div className="text-4xl text-cyan-500">
                      {sections.find(s => s.id === activeSection)?.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    {sections.find(s => s.id === activeSection)?.title} Settings
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    This section is currently under development. We're working hard to bring you these features soon!
                  </p>
                  <button className="mt-6 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    Notify Me When Ready
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;