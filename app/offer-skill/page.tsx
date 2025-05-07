"use client"
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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

export default function OfferskillsPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'workshops' | 'feedback' | 'earnings'>('schedule');
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

  // Framer-inspired cyan color theme
  const colors = {
    primary: '#047575FF',
    primaryLight: '#023B3EFF',
    primaryDark: '#00B7B7',
    background: '#F0FDFF',
    text: '#00333A',
    textLight: '#6699A1',
    accent: '#00A3A3',
    white: '#FFFFFF'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header className="p-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: colors.white }}>Offerskills</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.primaryDark }}></div>
            <span className="font-medium" style={{ color: colors.white }}>John Doe</span>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="py-4 px-6" style={{ backgroundColor: colors.primaryLight }}>
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="text-center">
            <p className="text-sm" style={{ color: colors.text }}>Workshops Hosted</p>
            <p className="text-2xl font-bold" style={{ color: colors.accent }}>12</p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: colors.text }}>Participants</p>
            <p className="text-2xl font-bold" style={{ color: colors.accent }}>156</p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: colors.text }}>Avg. Rating</p>
            <p className="text-2xl font-bold" style={{ color: colors.accent }}>4.8 ★</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: colors.primary }}>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 font-medium ${activeTab === 'schedule' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'schedule' ? colors.primaryDark : colors.textLight,
              borderColor: activeTab === 'schedule' ? colors.primaryDark : 'transparent'
            }}
          >
            Schedule Workshop
          </button>
          <button
            onClick={() => setActiveTab('workshops')}
            className={`px-4 py-2 font-medium ${activeTab === 'workshops' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'workshops' ? colors.primaryDark : colors.textLight,
              borderColor: activeTab === 'workshops' ? colors.primaryDark : 'transparent'
            }}
          >
            My Workshops
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 font-medium ${activeTab === 'feedback' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'feedback' ? colors.primaryDark : colors.textLight,
              borderColor: activeTab === 'feedback' ? colors.primaryDark : 'transparent'
            }}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-2 font-medium ${activeTab === 'earnings' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'earnings' ? colors.primaryDark : colors.textLight,
              borderColor: activeTab === 'earnings' ? colors.primaryDark : 'transparent'
            }}
          >
            Earnings
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'schedule' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Schedule New Workshop</h2>
                <form onSubmit={handleScheduleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: colors.text }}>Title</label>
                    <input
                      type="text"
                      value={newWorkshop.title}
                      onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: colors.primary }}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: colors.text }}>Description</label>
                    <textarea
                      value={newWorkshop.description}
                      onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: colors.primary, minHeight: '100px' }}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: colors.text }}>Start Time</label>
                      <input
                        type="datetime-local"
                        value={moment(newWorkshop.start).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setNewWorkshop({...newWorkshop, start: new Date(e.target.value)})}
                        className="w-full p-2 border rounded"
                        style={{ borderColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: colors.text }}>End Time</label>
                      <input
                        type="datetime-local"
                        value={moment(newWorkshop.end).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setNewWorkshop({...newWorkshop, end: new Date(e.target.value)})}
                        className="w-full p-2 border rounded"
                        style={{ borderColor: colors.primary }}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: colors.text }}>Location</label>
                    <select
                      value={newWorkshop.location}
                      onChange={(e) => setNewWorkshop({...newWorkshop, location: e.target.value})}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: colors.primary }}
                    >
                      <option value="Online">Online</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: colors.text }}>Max Participants</label>
                    <input
                      type="number"
                      value={newWorkshop.maxParticipants}
                      onChange={(e) => setNewWorkshop({...newWorkshop, maxParticipants: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded"
                      style={{ borderColor: colors.primary }}
                      min="1"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded font-medium"
                    style={{ backgroundColor: colors.primary, color: colors.white }}
                  >
                    Schedule Workshop
                  </button>
                </form>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryDark }}>Workshop Calendar</h3>
                <div style={{ height: '500px' }}>
                  <Calendar
                    localizer={localizer}
                    events={workshops.map(w => ({
                      title: w.title,
                      start: w.start,
                      end: w.end,
                      allDay: false
                    }))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                      backgroundColor: colors.white,
                      color: colors.text
                    }}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: colors.primary,
                        borderColor: colors.primaryDark,
                        color: colors.white
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workshops' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>My Workshops</h2>
              <div className="space-y-4">
                {workshops.map(workshop => (
                  <div key={workshop.id} className="p-4 border rounded-lg" style={{ backgroundColor: colors.white, borderColor: colors.primaryLight }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>{workshop.title}</h3>
                        <p className="text-sm" style={{ color: colors.textLight }}>{moment(workshop.start).format('MMMM Do YYYY, h:mm a')}</p>
                        <p className="mt-2" style={{ color: colors.text }}>{workshop.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full capitalize" style={{
                        backgroundColor: workshop.status === 'upcoming' ? colors.primaryLight : 
                                        workshop.status === 'completed' ? '#E0FFE0' : 
                                        workshop.status === 'cancelled' ? '#FFE0E0' : '#F0F0F0',
                        color: workshop.status === 'upcoming' ? colors.primaryDark : 
                               workshop.status === 'completed' ? '#008000' : 
                               workshop.status === 'cancelled' ? '#800000' : colors.text
                      }}>
                        {workshop.status}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm" style={{ color: colors.text }}>{workshop.registered}/{workshop.maxParticipants} registered</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${(workshop.registered / workshop.maxParticipants) * 100}%`,
                              backgroundColor: colors.primary
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.primary, color: colors.primary }}>
                          View
                        </button>
                        <button className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.primary, color: colors.primary }}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Participant Feedback</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
                <div className="flex items-center mb-6">
                  <div className="text-4xl font-bold mr-4" style={{ color: colors.primary }}>4.8</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: colors.textLight }}>Based on 24 reviews</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b pb-4" style={{ borderColor: colors.primaryLight }}>
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: colors.primaryLight }}></div>
                        <span className="font-medium" style={{ color: colors.text }}>Participant {i}</span>
                      </div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className={`w-4 h-4 ${j < (i === 1 ? 5 : i === 2 ? 4 : 3) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        ))}
                      </div>
                      <p style={{ color: colors.text }}>
                        {i === 1 ? 'Amazing workshop! Learned so much about React in such a short time.' : 
                         i === 2 ? 'Great content, but could use more hands-on examples.' : 
                         'Good introduction to the topic, but a bit too basic for my level.'}
                      </p>
                      <p className="text-xs mt-2" style={{ color: colors.textLight }}>Posted on {moment().subtract(i, 'weeks').format('MMMM Do YYYY')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Earnings</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
                  <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Total Earnings</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>$1,245.00</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
                  <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Upcoming Payout</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>$320.50</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
                  <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Workshops This Month</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>4</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: colors.primaryDark }}>Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr style={{ borderBottomColor: colors.primaryLight }}>
                        <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Date</th>
                        <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Workshop</th>
                        <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Participants</th>
                        <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Amount</th>
                        <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map(i => (
                        <tr key={i} style={{ borderBottomColor: colors.primaryLight }}>
                          <td className="py-2 px-4" style={{ color: colors.text }}>{moment().subtract(i, 'weeks').format('MMM D, YYYY')}</td>
                          <td className="py-2 px-4" style={{ color: colors.text }}>{['React Basics', 'Advanced CSS', 'TypeScript Deep Dive', 'UI Design'][i-1]}</td>
                          <td className="py-2 px-4" style={{ color: colors.text }}>{[12, 8, 15, 10][i-1]}</td>
                          <td className="py-2 px-4" style={{ color: colors.text }}>{`$${[120, 80, 150, 100][i-1]}.00`}</td>
                          <td className="py-2 px-4">
                            <span className="px-2 py-1 text-xs rounded-full" style={{ 
                              backgroundColor: i === 4 ? colors.primaryLight : '#E0FFE0',
                              color: i === 4 ? colors.primaryDark : '#008000'
                            }}>
                              {i === 4 ? 'Processing' : 'Paid'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}