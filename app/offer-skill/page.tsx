"use client"
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Sidebar } from '../components/SideBar';
import { FiCalendar, FiUsers, FiStar, FiDollarSign, FiEdit, FiEye, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import AddCourseButton from '../components/addcourse';

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

type DecodedToken = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

type Workshop = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  maxParticipants: number;
  registered: number;
  status: 'draft' | 'upcoming' | 'completed' | 'cancelled';
};

type Feedback = {
  id: string;
  participant: string;
  rating: number;
  comment: string;
  date: Date;
  workshopId: string;
  workshopTitle: string;
};

type Transaction = {
  id: string;
  date: Date;
  workshopTitle: string;
  participants: number;
  amount: number;
  status: 'processing' | 'paid' | 'failed';
};

export default function OfferskillsPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'workshops' | 'feedback' | 'earnings'>('schedule');
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React and build your first app',
      start: new Date(2023, 10, 15, 14, 0),
      end: new Date(2023, 10, 15, 16, 0),
      location: 'Online',
      maxParticipants: 20,
      registered: 15,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript features',
      start: new Date(2023, 10, 20, 10, 0),
      end: new Date(2023, 10, 20, 12, 0),
      location: 'Online',
      maxParticipants: 15,
      registered: 12,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'UI Design Fundamentals',
      description: 'Learn design principles and Figma basics',
      start: new Date(2023, 9, 5, 14, 0),
      end: new Date(2023, 9, 5, 16, 0),
      location: 'Online',
      maxParticipants: 25,
      registered: 25,
      status: 'completed'
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      description: 'Building RESTful APIs with Node.js and Express',
      start: new Date(2023, 10, 25, 9, 0),
      end: new Date(2023, 10, 25, 11, 0),
      location: 'Online',
      maxParticipants: 18,
      registered: 10,
      status: 'draft'
    }
  ]);

  const [feedback, setFeedback] = useState<Feedback[]>([
    {
      id: '1',
      participant: 'John Doe',
      rating: 5,
      comment: 'Amazing workshop! Learned so much about React in such a short time.',
      date: new Date(2023, 9, 6),
      workshopId: '3',
      workshopTitle: 'UI Design Fundamentals'
    },
    {
      id: '2',
      participant: 'Jane Smith',
      rating: 4,
      comment: 'Great content, but could use more hands-on examples.',
      date: new Date(2023, 9, 7),
      workshopId: '3',
      workshopTitle: 'UI Design Fundamentals'
    },
    {
      id: '3',
      participant: 'Alex Johnson',
      rating: 3,
      comment: 'Good introduction to the topic, but a bit too basic for my level.',
      date: new Date(2023, 9, 8),
      workshopId: '3',
      workshopTitle: 'UI Design Fundamentals'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date(2023, 9, 6),
      workshopTitle: 'UI Design Fundamentals',
      participants: 25,
      amount: 250,
      status: 'paid'
    },
    {
      id: '2',
      date: new Date(2023, 9, 13),
      workshopTitle: 'React Basics',
      participants: 20,
      amount: 200,
      status: 'paid'
    },
    {
      id: '3',
      date: new Date(2023, 9, 20),
      workshopTitle: 'TypeScript Fundamentals',
      participants: 15,
      amount: 180,
      status: 'paid'
    },
    {
      id: '4',
      date: new Date(2023, 10, 1),
      workshopTitle: 'Advanced CSS',
      participants: 18,
      amount: 160,
      status: 'processing'
    }
  ]);

  const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    location: 'Online',
    maxParticipants: 10,
    registered: 0,
    status: 'draft'
  });

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [workshopFilter, setWorkshopFilter] = useState('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workshop: Workshop = {
      ...newWorkshop as Omit<Workshop, 'id'>,
      id: Math.random().toString(36).substring(2, 9),
    };
    setWorkshops([...workshops, workshop]);
    setNewWorkshop({
      title: '',
      description: '',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      location: 'Online',
      maxParticipants: 10,
      registered: 0,
      status: 'draft'
    });
  };

  const handleUpdateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    
    const updatedWorkshops = workshops.map(w => 
      w.id === selectedWorkshop.id ? selectedWorkshop : w
    );
    setWorkshops(updatedWorkshops);
    setIsEditModalOpen(false);
  };

  const handleDeleteWorkshop = (id: string) => {
    setWorkshops(workshops.filter(w => w.id !== id));
  };

  const colors = {
    primary: '#06b6d4',
    primaryLight: '#e0f2fe',
    primaryDark: '#0e7490',
    background: '#f8fafc',
    text: '#1e293b',
    textLight: '#64748b',
    accent: '#22d3ee',
    white: '#ffffff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const statusColors = {
    draft: { bg: '#f3f4f6', text: '#6b7280' },
    upcoming: { bg: colors.primaryLight, text: colors.primaryDark },
    completed: { bg: '#dcfce7', text: '#166534' },
    cancelled: { bg: '#fee2e2', text: '#991b1b' }
  };

  const transactionStatusColors = {
    processing: { bg: colors.primaryLight, text: colors.primaryDark },
    paid: { bg: '#dcfce7', text: '#166534' },
    failed: { bg: '#fee2e2', text: '#991b1b' }
  };

  // Custom event styles for calendar
  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.status === 'completed' ? colors.success : 
                          event.status === 'cancelled' ? colors.error : 
                          event.status === 'draft' ? colors.textLight : colors.primary;
    
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '0.85rem'
    };
    
    return { style };
  };

  // Custom toolbar to add our own buttons and styling
  const CustomToolbar = (toolbar: any) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const goToPrevious = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const changeView = (view: string) => {
      toolbar.onView(view);
    };

    return (
      <div className="rbc-toolbar mb-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button 
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-white border border-cyan-200 rounded-md text-cyan-700 hover:bg-cyan-50"
            >
              Today
            </button>
            <button 
              onClick={goToPrevious}
              className="p-1 text-cyan-700 hover:bg-cyan-50 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className="p-1 text-cyan-700 hover:bg-cyan-50 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <span className="text-lg font-medium text-cyan-900 mb-2 sm:mb-0">
            {toolbar.label}
          </span>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => changeView(Views.MONTH)}
              className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.MONTH ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
            >
              Month
            </button>
            <button 
              onClick={() => changeView(Views.WEEK)}
              className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.WEEK ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
            >
              Week
            </button>
            <button 
              onClick={() => changeView(Views.DAY)}
              className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.DAY ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
            >
              Day
            </button>
            <button 
              onClick={() => changeView(Views.AGENDA)}
              className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.AGENDA ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
            >
              Agenda
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredWorkshops = workshops.filter(workshop => {
    if (workshopFilter === 'all') return true;
    return workshop.status === workshopFilter;
  });

  const filteredFeedback = feedbackFilter === 'all' 
    ? feedback 
    : feedback.filter(f => {
        if (feedbackFilter === 'high') return f.rating >= 4;
        if (feedbackFilter === 'low') return f.rating <= 2;
        return true;
      });

  const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);
  const upcomingPayout = transactions
    .filter(t => t.status === 'processing')
    .reduce((sum, t) => sum + t.amount, 0);
  const workshopsThisMonth = workshops.filter(w => 
    w.start.getMonth() === new Date().getMonth() && 
    w.start.getFullYear() === new Date().getFullYear()
  ).length;

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Offerskills Dashboard</h1>
            <div className="flex items-center space-x-4">
              {/* <span className="font-medium text-white">{decodedToken?.username}</span> */}
               <AddCourseButton/>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="bg-white px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
              <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                <FiCalendar className="text-cyan-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-cyan-800">Workshops Hosted</p>
                <p className="text-2xl font-bold text-cyan-900">{workshops.length}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
              <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                <FiUsers className="text-cyan-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-cyan-800">Participants</p>
                <p className="text-2xl font-bold text-cyan-900">
                  {workshops.reduce((sum, w) => sum + w.registered, 0)}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
              <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                <FiStar className="text-cyan-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-cyan-800">Avg. Rating</p>
                <p className="text-2xl font-bold text-cyan-900">
                  {feedback.length > 0 
                    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) 
                    : '0.0'} ★
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-cyan-50 p-1 rounded-lg mb-6">
            {(['schedule', 'workshops', 'feedback', 'earnings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-cyan-600 shadow-sm' 
                    : 'text-cyan-700 hover:bg-cyan-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {activeTab === 'schedule' && (
              <div className="grid lg:grid-cols-2 gap-8 p-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-cyan-900">Schedule New Workshop</h2>
                  <form onSubmit={handleScheduleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
                      <input
                        type="text"
                        value={newWorkshop.title}
                        onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
                        className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Workshop title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
                      <textarea
                        value={newWorkshop.description}
                        onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
                        className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        rows={4}
                        placeholder="Detailed description of your workshop"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-cyan-800 mb-1">Start Time</label>
                        <input
                          type="datetime-local"
                          value={moment(newWorkshop.start).format('YYYY-MM-DDTHH:mm')}
                          onChange={(e) => setNewWorkshop({...newWorkshop, start: new Date(e.target.value)})}
                          className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cyan-800 mb-1">End Time</label>
                        <input
                          type="datetime-local"
                          value={moment(newWorkshop.end).format('YYYY-MM-DDTHH:mm')}
                          onChange={(e) => setNewWorkshop({...newWorkshop, end: new Date(e.target.value)})}
                          className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cyan-800 mb-1">Location</label>
                      <select
                        value={newWorkshop.location}
                        onChange={(e) => setNewWorkshop({...newWorkshop, location: e.target.value})}
                        className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cyan-800 mb-1">Max Participants</label>
                      <input
                        type="number"
                        value={newWorkshop.maxParticipants}
                        onChange={(e) => setNewWorkshop({...newWorkshop, maxParticipants: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cyan-800 mb-1">Status</label>
                      <select
                        value={newWorkshop.status}
                        onChange={(e) => setNewWorkshop({...newWorkshop, status: e.target.value as any})}
                        className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md"
                    >
                      Schedule Workshop
                    </button>
                  </form>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-cyan-900">Workshop Calendar</h3>
                  <div className="h-[500px]">
                    <Calendar
                      localizer={localizer}
                      events={workshops.map(w => ({
                        ...w,
                        title: w.title,
                        start: new Date(w.start),
                        end: new Date(w.end),
                        allDay: false
                      }))}
                      startAccessor="start"
                      endAccessor="end"
                      style={{
                        height: '100%',
                        fontFamily: 'inherit',
                      }}
                      defaultView={Views.WEEK}
                      views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                      components={{
                        toolbar: CustomToolbar
                      }}
                      eventPropGetter={eventStyleGetter}
                      onSelectEvent={(event) => {
                        const workshop = workshops.find(w => w.id === event.id);
                        if (workshop) {
                          setSelectedWorkshop(workshop);
                          setIsEditModalOpen(true);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workshops' && (
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-900 mb-4 sm:mb-0">My Workshops</h2>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <select 
                      value={workshopFilter}
                      onChange={(e) => setWorkshopFilter(e.target.value)}
                      className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="all">All Status</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="draft">Draft</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Search workshops..." 
                      className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredWorkshops.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-cyan-700">No workshops found matching your criteria</p>
                    </div>
                  ) : (
                    filteredWorkshops.map(workshop => (
                      <div key={workshop.id} className="border border-cyan-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
                            <div>
                              <h3 className="text-lg font-bold text-cyan-900">{workshop.title}</h3>
                              <p className="text-sm text-cyan-700 mt-1">
                                {moment(workshop.start).format('MMMM Do YYYY, h:mm a')} • {workshop.location}
                              </p>
                              <p className="mt-3 text-cyan-800">{workshop.description}</p>
                            </div>
                            <span 
                              className="px-3 py-1 text-xs rounded-full capitalize font-medium mt-2 sm:mt-0"
                              style={{
                                backgroundColor: statusColors[workshop.status].bg,
                                color: statusColors[workshop.status].text
                              }}
                            >
                              {workshop.status}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="w-full sm:max-w-xs mb-4 sm:mb-0">
                              <div className="flex justify-between text-sm text-cyan-800 mb-1">
                                <span>Registration: {workshop.registered}/{workshop.maxParticipants}</span>
                                <span>{Math.round((workshop.registered / workshop.maxParticipants) * 100)}%</span>
                              </div>
                              <div className="w-full bg-cyan-100 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" 
                                  style={{ 
                                    width: `${(workshop.registered / workshop.maxParticipants) * 100}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                className="flex items-center text-sm text-cyan-600 hover:text-cyan-800 px-3 py-1 bg-cyan-50 rounded-md"
                                onClick={() => {
                                  setSelectedWorkshop(workshop);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <FiEdit className="mr-1" /> Edit
                              </button>
                              <button 
                                className="flex items-center text-sm text-red-600 hover:text-red-800 px-3 py-1 bg-red-50 rounded-md"
                                onClick={() => handleDeleteWorkshop(workshop.id)}
                              >
                                <FiTrash2 className="mr-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div className="flex items-center mb-2 sm:mb-0">
                            <div className="flex -space-x-2">
                              {[...Array(Math.min(3, workshop.registered))].map((_, i) => (
                                <div 
                                  key={i} 
                                  className="w-8 h-8 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800"
                                >
                                  {i+1}
                                </div>
                              ))}
                              {workshop.registered > 3 && (
                                <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800">
                                  +{workshop.registered - 3}
                                </div>
                              )}
                            </div>
                            <span className="ml-3 text-sm text-cyan-700">{workshop.registered} participants</span>
                          </div>
                          <button className="text-sm font-medium text-cyan-600 hover:text-cyan-800 flex items-center">
                            Manage <FiChevronRight className="ml-1" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-cyan-900">Participant Feedback</h2>
                
                <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border border-cyan-100 mb-8">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="text-5xl font-bold mr-0 sm:mr-6 text-cyan-600 mb-4 sm:mb-0">
                      {feedback.length > 0 
                        ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length)
                        : '0.0'}
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex justify-center sm:justify-start items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-6 h-6 ${i < Math.round(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-cyan-700">Based on {feedback.length} reviews</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-cyan-900">Recent Feedback</h3>
                  <select
                    value={feedbackFilter}
                    onChange={(e) => setFeedbackFilter(e.target.value)}
                    className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="all">All Ratings</option>
                    <option value="high">4-5 Stars</option>
                    <option value="low">1-2 Stars</option>
                  </select>
                </div>
                
                <div className="space-y-6">
                  {filteredFeedback.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-cyan-700">No feedback found matching your criteria</p>
                    </div>
                  ) : (
                    filteredFeedback.map((item, i) => (
                      <div key={item.id} className="border-b border-cyan-100 pb-6 last:border-0">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-cyan-200 mr-4 flex items-center justify-center text-cyan-800 font-medium">
                            {item.participant.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
                              <div>
                                <h4 className="font-medium text-cyan-900">{item.participant}</h4>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, j) => (
                                    <svg 
                                      key={j} 
                                      className={`w-4 h-4 ${j < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <span className="text-xs text-cyan-600 mt-1 sm:mt-0">
                                {moment(item.date).format('MMM D, YYYY')}
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium text-cyan-800">Workshop: {item.workshopTitle}</span>
                            </div>
                            <p className="mt-3 text-cyan-800">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )} 
          
            {activeTab === 'earnings' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-cyan-900">Earnings Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-xl border border-cyan-100">
                    <div className="flex items-center mb-3">
                      <div className="bg-cyan-100 p-2 rounded-lg mr-3">
                        <FiDollarSign className="text-cyan-600" />
                      </div>
                      <span className="text-sm font-medium text-cyan-800">Total Earnings</span>
                    </div>
                    <p className="text-3xl font-bold text-cyan-900">$1,245.00</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-xl border border-cyan-100">
                    <div className="flex items-center mb-3">
                      <div className="bg-cyan-100 p-2 rounded-lg mr-3">
                        <FiDollarSign className="text-cyan-600" />
                      </div>
                      <span className="text-sm font-medium text-cyan-800">Upcoming Payout</span>
                    </div>
                    <p className="text-3xl font-bold text-cyan-900">$320.50</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-xl border border-cyan-100">
                    <div className="flex items-center mb-3">
                      <div className="bg-cyan-100 p-2 rounded-lg mr-3">
                        <FiCalendar className="text-cyan-600" />
                      </div>
                      <span className="text-sm font-medium text-cyan-800">Workshops This Month</span>
                    </div>
                    <p className="text-3xl font-bold text-cyan-900">4</p>
                  </div>
                </div>
                
                <div className="bg-white border border-cyan-100 rounded-xl overflow-hidden">
                  <div className="p-5 border-b border-cyan-100">
                    <h3 className="text-lg font-bold text-cyan-900">Transaction History</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-cyan-100">
                      <thead className="bg-cyan-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">Workshop</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">Participants</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-cyan-100">
                        {[1, 2, 3, 4].map(i => (
                          <tr key={i} className="hover:bg-cyan-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-800">
                              {moment().subtract(i, 'weeks').format('MMM D, YYYY')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-900">
                              {['React Basics', 'Advanced CSS', 'TypeScript Deep Dive', 'UI Design'][i-1]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-800">
                              {[12, 8, 15, 10][i-1]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-900">
                              ${[120, 80, 150, 100][i-1]}.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                i === 4 ? 'bg-cyan-100 text-cyan-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {i === 4 ? 'Processing' : 'Paid'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex justify-between items-center">
                    <span className="text-sm text-cyan-700">Showing 1 to 4 of 4 entries</span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-cyan-200 rounded text-sm text-cyan-700 bg-white">
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-cyan-200 rounded text-sm text-cyan-700 bg-white">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}