// "use client"
// import { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Sidebar } from '../components/SideBar';

// const localizer = momentLocalizer(moment);

// type Workshop = {
//   id: string;
//   title: string;
//   description: string;
//   start: Date;
//   end: Date;
//   location: string;
//   maxParticipants: number;
//   registered: number;
//   status: 'draft' | 'upcoming' | 'completed' | 'cancelled';
// };

// export default function OfferskillsPage() {
//   const [activeTab, setActiveTab] = useState<'schedule' | 'workshops' | 'feedback' | 'earnings'>('schedule');
//   const [workshops, setWorkshops] = useState<Workshop[]>([
//     {
//       id: '1',
//       title: 'Introduction to React',
//       description: 'Learn the basics of React and build your first app',
//       start: new Date(2023, 10, 15, 14, 0),
//       end: new Date(2023, 10, 15, 16, 0),
//       location: 'Online',
//       maxParticipants: 20,
//       registered: 15,
//       status: 'upcoming'
//     },
//     {
//       id: '2',
//       title: 'Advanced TypeScript',
//       description: 'Deep dive into TypeScript features',
//       start: new Date(2023, 10, 20, 10, 0),
//       end: new Date(2023, 10, 20, 12, 0),
//       location: 'Online',
//       maxParticipants: 15,
//       registered: 12,
//       status: 'upcoming'
//     },
//     {
//       id: '3',
//       title: 'UI Design Fundamentals',
//       description: 'Learn design principles and Figma basics',
//       start: new Date(2023, 9, 5, 14, 0),
//       end: new Date(2023, 9, 5, 16, 0),
//       location: 'Online',
//       maxParticipants: 25,
//       registered: 25,
//       status: 'completed'
//     }
//   ]);

//   const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
//     title: '',
//     description: '',
//     start: new Date(),
//     end: new Date(new Date().setHours(new Date().getHours() + 2)),
//     location: 'Online',
//     maxParticipants: 10,
//     registered: 0,
//     status: 'draft'
//   });

//   const handleScheduleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const workshop: Workshop = {
//       ...newWorkshop as Omit<Workshop, 'id'>,
//       id: Math.random().toString(36).substring(2, 9),
//     };
//     setWorkshops([...workshops, workshop]);
//     setNewWorkshop({
//       title: '',
//       description: '',
//       start: new Date(),
//       end: new Date(new Date().setHours(new Date().getHours() + 2)),
//       location: 'Online',
//       maxParticipants: 10,
//       registered: 0,
//       status: 'draft'
//     });
//   };


//   const colors = {
//     primary: '#047575FF',
//     primaryLight: '#023B3EFF',
//     primaryDark: '#00B7B7',
//     background: '#F0FDFF',
//     text: '#00333A',
//     textLight: '#6699A1',
//     accent: '#00A3A3',
//     white: '#FFFFFF'
//   };

//   return (
//     <div className='flex'><Sidebar/>
//     <div className="min-h-screen w-screen" style={{ backgroundColor: colors.background }}>
//       {/* Header */}
//       <header className="p-6" style={{ backgroundColor: colors.primary }}>
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <h1 className="text-3xl font-bold" style={{ color: colors.white }}>Offerskills</h1>
//           <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.primaryDark }}></div>
//             <span className="font-medium" style={{ color: colors.white }}>John Doe</span>
//           </div>
//         </div>
//       </header>

//       {/* Stats Bar */}
//       <div className="py-4 px-6" style={{ backgroundColor: colors.primaryLight }}>
//         <div className="max-w-6xl mx-auto flex justify-between">
//           <div className="text-center">
//             <p className="text-sm" style={{ color: colors.text }}>Workshops Hosted</p>
//             <p className="text-2xl font-bold" style={{ color: colors.accent }}>12</p>
//           </div>
//           <div className="text-center">
//             <p className="text-sm" style={{ color: colors.text }}>Participants</p>
//             <p className="text-2xl font-bold" style={{ color: colors.accent }}>156</p>
//           </div>
//           <div className="text-center">
//             <p className="text-sm" style={{ color: colors.text }}>Avg. Rating</p>
//             <p className="text-2xl font-bold" style={{ color: colors.accent }}>4.8 ★</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto p-6">
//         {/* Tabs */}
//         <div className="flex border-b" style={{ borderColor: colors.primary }}>
//           <button
//             onClick={() => setActiveTab('schedule')}
//             className={`px-4 py-2 font-medium ${activeTab === 'schedule' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'schedule' ? colors.primaryDark : colors.textLight,
//               borderColor: activeTab === 'schedule' ? colors.primaryDark : 'transparent'
//             }}
//           >
//             Schedule Workshop
//           </button>
//           <button
//             onClick={() => setActiveTab('workshops')}
//             className={`px-4 py-2 font-medium ${activeTab === 'workshops' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'workshops' ? colors.primaryDark : colors.textLight,
//               borderColor: activeTab === 'workshops' ? colors.primaryDark : 'transparent'
//             }}
//           >
//             My Workshops
//           </button>
//           <button
//             onClick={() => setActiveTab('feedback')}
//             className={`px-4 py-2 font-medium ${activeTab === 'feedback' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'feedback' ? colors.primaryDark : colors.textLight,
//               borderColor: activeTab === 'feedback' ? colors.primaryDark : 'transparent'
//             }}
//           >
//             Feedback
//           </button>
//           <button
//             onClick={() => setActiveTab('earnings')}
//             className={`px-4 py-2 font-medium ${activeTab === 'earnings' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'earnings' ? colors.primaryDark : colors.textLight,
//               borderColor: activeTab === 'earnings' ? colors.primaryDark : 'transparent'
//             }}
//           >
//             Earnings
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-6">
//           {activeTab === 'schedule' && (
//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Schedule New Workshop</h2>
//                 <form onSubmit={handleScheduleSubmit}>
//                   <div className="mb-4">
//                     <label className="block mb-2 font-medium" style={{ color: colors.text }}>Title</label>
//                     <input
//                       type="text"
//                       value={newWorkshop.title}
//                       onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       style={{ borderColor: colors.primary }}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-2 font-medium" style={{ color: colors.text }}>Description</label>
//                     <textarea
//                       value={newWorkshop.description}
//                       onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       style={{ borderColor: colors.primary, minHeight: '100px' }}
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block mb-2 font-medium" style={{ color: colors.text }}>Start Time</label>
//                       <input
//                         type="datetime-local"
//                         value={moment(newWorkshop.start).format('YYYY-MM-DDTHH:mm')}
//                         onChange={(e) => setNewWorkshop({...newWorkshop, start: new Date(e.target.value)})}
//                         className="w-full p-2 border rounded"
//                         style={{ borderColor: colors.primary }}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block mb-2 font-medium" style={{ color: colors.text }}>End Time</label>
//                       <input
//                         type="datetime-local"
//                         value={moment(newWorkshop.end).format('YYYY-MM-DDTHH:mm')}
//                         onChange={(e) => setNewWorkshop({...newWorkshop, end: new Date(e.target.value)})}
//                         className="w-full p-2 border rounded"
//                         style={{ borderColor: colors.primary }}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-2 font-medium" style={{ color: colors.text }}>Location</label>
//                     <select
//                       value={newWorkshop.location}
//                       onChange={(e) => setNewWorkshop({...newWorkshop, location: e.target.value})}
//                       className="w-full p-2 border rounded"
//                       style={{ borderColor: colors.primary }}
//                     >
//                       <option value="Online">Online</option>
//                       <option value="In-Person">In-Person</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-2 font-medium" style={{ color: colors.text }}>Max Participants</label>
//                     <input
//                       type="number"
//                       value={newWorkshop.maxParticipants}
//                       onChange={(e) => setNewWorkshop({...newWorkshop, maxParticipants: parseInt(e.target.value)})}
//                       className="w-full p-2 border rounded"
//                       style={{ borderColor: colors.primary }}
//                       min="1"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 rounded font-medium"
//                     style={{ backgroundColor: colors.primary, color: colors.white }}
//                   >
//                     Schedule Workshop
//                   </button>
//                 </form>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryDark }}>Workshop Calendar</h3>
//                 <div style={{ height: '500px' }}>
//                   <Calendar
//                     localizer={localizer}
//                     events={workshops.map(w => ({
//                       title: w.title,
//                       start: w.start,
//                       end: w.end,
//                       allDay: false
//                     }))}
//                     startAccessor="start"
//                     endAccessor="end"
//                     style={{
//                       backgroundColor: colors.white,
//                       color: colors.text
//                     }}
//                     eventPropGetter={(event) => ({
//                       style: {
//                         backgroundColor: colors.primary,
//                         borderColor: colors.primaryDark,
//                         color: colors.white
//                       }
//                     })}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'workshops' && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>My Workshops</h2>
//               <div className="space-y-4">
//                 {workshops.map(workshop => (
//                   <div key={workshop.id} className="p-4 border rounded-lg" style={{ backgroundColor: colors.white, borderColor: colors.primaryLight }}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>{workshop.title}</h3>
//                         <p className="text-sm" style={{ color: colors.textLight }}>{moment(workshop.start).format('MMMM Do YYYY, h:mm a')}</p>
//                         <p className="mt-2" style={{ color: colors.text }}>{workshop.description}</p>
//                       </div>
//                       <span className="px-2 py-1 text-xs rounded-full capitalize" style={{
//                         backgroundColor: workshop.status === 'upcoming' ? colors.primaryLight : 
//                                         workshop.status === 'completed' ? '#E0FFE0' : 
//                                         workshop.status === 'cancelled' ? '#FFE0E0' : '#F0F0F0',
//                         color: workshop.status === 'upcoming' ? colors.primaryDark : 
//                                workshop.status === 'completed' ? '#008000' : 
//                                workshop.status === 'cancelled' ? '#800000' : colors.text
//                       }}>
//                         {workshop.status}
//                       </span>
//                     </div>
//                     <div className="mt-4 flex justify-between items-center">
//                       <div>
//                         <span className="text-sm" style={{ color: colors.text }}>{workshop.registered}/{workshop.maxParticipants} registered</span>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
//                           <div 
//                             className="h-2.5 rounded-full" 
//                             style={{ 
//                               width: `${(workshop.registered / workshop.maxParticipants) * 100}%`,
//                               backgroundColor: colors.primary
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.primary, color: colors.primary }}>
//                           View
//                         </button>
//                         <button className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.primary, color: colors.primary }}>
//                           Edit
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'feedback' && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Participant Feedback</h2>
//               <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
//                 <div className="flex items-center mb-6">
//                   <div className="text-4xl font-bold mr-4" style={{ color: colors.primary }}>4.8</div>
//                   <div>
//                     <div className="flex items-center mb-1">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <p className="text-sm" style={{ color: colors.textLight }}>Based on 24 reviews</p>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   {[1, 2, 3].map(i => (
//                     <div key={i} className="border-b pb-4" style={{ borderColor: colors.primaryLight }}>
//                       <div className="flex items-center mb-2">
//                         <div className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: colors.primaryLight }}></div>
//                         <span className="font-medium" style={{ color: colors.text }}>Participant {i}</span>
//                       </div>
//                       <div className="flex mb-1">
//                         {[...Array(5)].map((_, j) => (
//                           <svg key={j} className={`w-4 h-4 ${j < (i === 1 ? 5 : i === 2 ? 4 : 3) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                         ))}
//                       </div>
//                       <p style={{ color: colors.text }}>
//                         {i === 1 ? 'Amazing workshop! Learned so much about React in such a short time.' : 
//                          i === 2 ? 'Great content, but could use more hands-on examples.' : 
//                          'Good introduction to the topic, but a bit too basic for my level.'}
//                       </p>
//                       <p className="text-xs mt-2" style={{ color: colors.textLight }}>Posted on {moment().subtract(i, 'weeks').format('MMMM Do YYYY')}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'earnings' && (
//             <div>
//               <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primaryDark }}>Earnings</h2>
//               <div className="grid md:grid-cols-3 gap-6 mb-6">
//                 <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
//                   <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Total Earnings</p>
//                   <p className="text-2xl font-bold" style={{ color: colors.primary }}>$1,245.00</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
//                   <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Upcoming Payout</p>
//                   <p className="text-2xl font-bold" style={{ color: colors.primary }}>$320.50</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
//                   <p className="text-sm font-medium mb-1" style={{ color: colors.textLight }}>Workshops This Month</p>
//                   <p className="text-2xl font-bold" style={{ color: colors.primary }}>4</p>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-sm" style={{ borderColor: colors.primaryLight }}>
//                 <h3 className="text-lg font-bold mb-4" style={{ color: colors.primaryDark }}>Transaction History</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr style={{ borderBottomColor: colors.primaryLight }}>
//                         <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Date</th>
//                         <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Workshop</th>
//                         <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Participants</th>
//                         <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Amount</th>
//                         <th className="text-left py-2 px-4 font-medium" style={{ color: colors.text }}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[1, 2, 3, 4].map(i => (
//                         <tr key={i} style={{ borderBottomColor: colors.primaryLight }}>
//                           <td className="py-2 px-4" style={{ color: colors.text }}>{moment().subtract(i, 'weeks').format('MMM D, YYYY')}</td>
//                           <td className="py-2 px-4" style={{ color: colors.text }}>{['React Basics', 'Advanced CSS', 'TypeScript Deep Dive', 'UI Design'][i-1]}</td>
//                           <td className="py-2 px-4" style={{ color: colors.text }}>{[12, 8, 15, 10][i-1]}</td>
//                           <td className="py-2 px-4" style={{ color: colors.text }}>{`$${[120, 80, 150, 100][i-1]}.00`}</td>
//                           <td className="py-2 px-4">
//                             <span className="px-2 py-1 text-xs rounded-full" style={{ 
//                               backgroundColor: i === 4 ? colors.primaryLight : '#E0FFE0',
//                               color: i === 4 ? colors.primaryDark : '#008000'
//                             }}>
//                               {i === 4 ? 'Processing' : 'Paid'}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//     </div>
//   );
// }

"use client"
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Sidebar } from '../components/SideBar';
import { FiCalendar, FiUsers, FiStar, FiDollarSign, FiEdit, FiEye, FiChevronRight } from 'react-icons/fi';

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

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Offerskills Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-cyan-700 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <span className="font-medium text-white">John Doe</span>
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
                <p className="text-2xl font-bold text-cyan-900">12</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
              <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                <FiUsers className="text-cyan-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-cyan-800">Participants</p>
                <p className="text-2xl font-bold text-cyan-900">156</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
              <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                <FiStar className="text-cyan-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-cyan-800">Avg. Rating</p>
                <p className="text-2xl font-bold text-cyan-900">4.8 ★</p>
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
                        title: w.title,
                        start: w.start,
                        end: w.end,
                        allDay: false
                      }))}
                      startAccessor="start"
                      endAccessor="end"
                      style={{
                        fontFamily: 'inherit',
                        borderRadius: '0.5rem'
                      }}
                      eventPropGetter={() => ({
                        style: {
                          backgroundColor: colors.primary,
                          borderColor: colors.primaryDark,
                          color: colors.white,
                          borderRadius: '4px',
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workshops' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-900">My Workshops</h2>
                  <div className="flex space-x-2">
                    <select className="text-sm border border-cyan-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-cyan-500">
                      <option>All Status</option>
                      <option>Upcoming</option>
                      <option>Completed</option>
                      <option>Draft</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="text-sm border border-cyan-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {workshops.map(workshop => (
                    <div key={workshop.id} className="border border-cyan-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-cyan-900">{workshop.title}</h3>
                            <p className="text-sm text-cyan-700 mt-1">
                              {moment(workshop.start).format('MMMM Do YYYY, h:mm a')} • {workshop.location}
                            </p>
                            <p className="mt-3 text-cyan-800">{workshop.description}</p>
                          </div>
                          <span 
                            className="px-3 py-1 text-xs rounded-full capitalize font-medium"
                            style={{
                              backgroundColor: statusColors[workshop.status].bg,
                              color: statusColors[workshop.status].text
                            }}
                          >
                            {workshop.status}
                          </span>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="w-full max-w-xs">
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
                            <button className="flex items-center text-sm text-cyan-600 hover:text-cyan-800">
                              <FiEye className="mr-1" /> View
                            </button>
                            <button className="flex items-center text-sm text-cyan-600 hover:text-cyan-800">
                              <FiEdit className="mr-1" /> Edit
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex justify-between items-center">
                        <div className="flex items-center">
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
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-cyan-900">Participant Feedback</h2>
                
                <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border border-cyan-100 mb-8">
                  <div className="flex items-center">
                    <div className="text-5xl font-bold mr-6 text-cyan-600">4.8</div>
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-6 h-6 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-cyan-700">Based on 24 reviews</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-cyan-100 pb-6 last:border-0">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-cyan-200 mr-4 flex items-center justify-center text-cyan-800 font-medium">
                          P{i}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-cyan-900">Participant {i}</h4>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, j) => (
                                  <svg 
                                    key={j} 
                                    className={`w-4 h-4 ${j < (i === 1 ? 5 : i === 2 ? 4 : 3) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-cyan-600">
                              {moment().subtract(i, 'weeks').format('MMM D, YYYY')}
                            </span>
                          </div>
                          <p className="mt-3 text-cyan-800">
                            {i === 1 ? 'Amazing workshop! Learned so much about React in such a short time.' : 
                             i === 2 ? 'Great content, but could use more hands-on examples.' : 
                             'Good introduction to the topic, but a bit too basic for my level.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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