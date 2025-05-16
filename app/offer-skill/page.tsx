// "use client"
// import {  useState } from 'react';
// import {  Views } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Sidebar } from '../components/SideBar';


// import AddCourseButton from '../components/addcourse';
// import StatsBar from './statsbar';

// import Workshop from './calender';

// import Earnings from './earnings';
// import WorkshopCalendar from './calender';
//  type WorkshopStatus = "draft" | "upcoming";

//  type Workshop = {
//   id: string;
//   title: string;
//   description: string;
//   start: Date;
//   end: Date;
//   location: string;
//   maxParticipants: number;
//   registered: number;
//   status: WorkshopStatus;
// };


 
// type Feedback = {
//   id: string;
//   participant: string;
//   rating: number;
//   comment: string;
//   date: Date;
//   workshopId: string;
//   workshopTitle: string;
// };



// export default function OfferskillsPage() {
//   const [activeTab, setActiveTab] = useState<'schedule' | 'workshops' | 'feedback' | 'earnings'>('schedule');
  
//   const [feedback, setFeedback] = useState<Feedback[]>([
//     {
//       id: '1',
//       participant: 'John Doe',
//       rating: 5,
//       comment: 'Amazing workshop! Learned so much about React in such a short time.',
//       date: new Date(2023, 9, 6),
//       workshopId: '3',
//       workshopTitle: 'UI Design Fundamentals'
//     },
//     {
//       id: '2',
//       participant: 'Jane Smith',
//       rating: 4,
//       comment: 'Great content, but could use more hands-on examples.',
//       date: new Date(2023, 9, 7),
//       workshopId: '3',
//       workshopTitle: 'UI Design Fundamentals'
//     },
//     {
//       id: '3',
//       participant: 'Alex Johnson',
//       rating: 3,
//       comment: 'Good introduction to the topic, but a bit too basic for my level.',
//       date: new Date(2023, 9, 8),
//       workshopId: '3',
//       workshopTitle: 'UI Design Fundamentals'
//     }
//   ]);

  
  
//   const [feedbackFilter, setFeedbackFilter] = useState('all');


  
  

//   const colors = {
//     primary: '#06b6d4',
//     primaryLight: '#e0f2fe',
//     primaryDark: '#0e7490',
//     background: '#f8fafc',
//     text: '#1e293b',
//     textLight: '#64748b',
//     accent: '#22d3ee',
//     white: '#ffffff',
//     success: '#10b981',
//     warning: '#f59e0b',
//     error: '#ef4444'
//   };

//   const statusColors = {
//     draft: { bg: '#f3f4f6', text: '#6b7280' },
//     upcoming: { bg: colors.primaryLight, text: colors.primaryDark },
//     completed: { bg: '#dcfce7', text: '#166534' },
//     cancelled: { bg: '#fee2e2', text: '#991b1b' }
//   };

//   const transactionStatusColors = {
//     processing: { bg: colors.primaryLight, text: colors.primaryDark },
//     paid: { bg: '#dcfce7', text: '#166534' },
//     failed: { bg: '#fee2e2', text: '#991b1b' }
//   };

//   // Custom event styles for calendar
//   const eventStyleGetter = (event: any) => {
//     const backgroundColor = event.status === 'completed' ? colors.success : 
//                           event.status === 'cancelled' ? colors.error : 
//                           event.status === 'draft' ? colors.textLight : colors.primary;
    
//     const style = {
//       backgroundColor,
//       borderRadius: '4px',
//       opacity: 0.9,
//       color: 'white',
//       border: '0px',
//       display: 'block',
//       fontSize: '0.85rem'
//     };
    
//     return { style };
//   };

//   // Custom toolbar to add our own buttons and styling
//   const CustomToolbar = (toolbar: any) => {
//     const goToToday = () => {
//       toolbar.onNavigate('TODAY');
//     };

//     const goToPrevious = () => {
//       toolbar.onNavigate('PREV');
//     };

//     const goToNext = () => {
//       toolbar.onNavigate('NEXT');
//     };

//     const changeView = (view: string) => {
//       toolbar.onView(view);
//     };

//     return (
//       <div className="rbc-toolbar mb-4">
//         <div className="flex flex-wrap items-center justify-between">
//           <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//             <button 
//               onClick={goToToday}
//               className="px-3 py-1 text-sm bg-white border border-cyan-200 rounded-md text-cyan-700 hover:bg-cyan-50"
//             >
//               Today
//             </button>
//             <button 
//               onClick={goToPrevious}
//               className="p-1 text-cyan-700 hover:bg-cyan-50 rounded-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="15 18 9 12 15 6"></polyline>
//               </svg>
//             </button>
//             <button 
//               onClick={goToNext}
//               className="p-1 text-cyan-700 hover:bg-cyan-50 rounded-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="9 18 15 12 9 6"></polyline>
//               </svg>
//             </button>
//           </div>
          
//           <span className="text-lg font-medium text-cyan-900 mb-2 sm:mb-0">
//             {toolbar.label}
//           </span>
          
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => changeView(Views.MONTH)}
//               className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.MONTH ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
//             >
//               Month
//             </button>
//             <button 
//               onClick={() => changeView(Views.WEEK)}
//               className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.WEEK ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
//             >
//               Week
//             </button>
//             <button 
//               onClick={() => changeView(Views.DAY)}
//               className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.DAY ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
//             >
//               Day
//             </button>
//             <button 
//               onClick={() => changeView(Views.AGENDA)}
//               className={`px-3 py-1 text-sm rounded-md ${toolbar.view === Views.AGENDA ? 'bg-cyan-100 text-cyan-800' : 'bg-white text-cyan-700 border border-cyan-200'}`}
//             >
//               Agenda
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };


//   const filteredFeedback = feedbackFilter === 'all' 
//     ? feedback 
//     : feedback.filter(f => {
//         if (feedbackFilter === 'high') return f.rating >= 4;
//         if (feedbackFilter === 'low') return f.rating <= 2;
//         return true;
//       });

  

//   function handleAddWorkshop(workshop: Workshop): void {
//     throw new Error('Function not implemented.');
//   }

//   return (
//     <div className='flex min-h-screen bg-gray-50'>
//       <Sidebar />

//       <div className="flex-1 overflow-hidden">
//         {/* Header */}
//         <header className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 shadow-sm">
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-white">Offerskills Dashboard</h1>
//             <div className="flex items-center space-x-4">
            
//                <AddCourseButton/>
//             </div>
//           </div>
//         </header>

//         <StatsBar workshops={[]} feedback={[]}/>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto p-6">
//           {/* Tabs */}
//           <div className="flex space-x-1 bg-cyan-50 p-1 rounded-lg mb-6">
//             {(['schedule', 'workshops', 'feedback', 'earnings'] as const).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
//                   activeTab === tab 
//                     ? 'bg-white text-cyan-600 shadow-sm' 
//                     : 'text-cyan-700 hover:bg-cyan-100'
//                 }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             {activeTab === 'schedule' && (
//              <Workshop workshops={[]} onAddWorkshop={function (workshop: { id: string; title: string; description: string; start: Date; end: Date; location: string; maxParticipants: number; registered: number; status: 'draft' | 'upcoming'; }): void {
//                 throw new Error('Function not implemented.');
//               } } onUpdateWorkshop={function (workshop: { id: string; title: string; description: string; start: Date; end: Date; location: string; maxParticipants: number; registered: number; status: 'draft' | 'upcoming'; }): void {
//                 throw new Error('Function not implemented.');
//               } }/> 
//             )}

//             {activeTab === 'workshops' && (
//  <WorkshopCalendar
//       workshops={Workshop}
//       onAddWorkshop={handleAddWorkshop}
//       onUpdateWorkshop={(workshop: Workshop) => {}}
//     />
//             )}

//             {activeTab === 'feedback' && (
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-6 text-cyan-900">Participant Feedback</h2>
                
//                 <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border border-cyan-100 mb-8">
//                   <div className="flex flex-col sm:flex-row items-center">
//                     <div className="text-5xl font-bold mr-0 sm:mr-6 text-cyan-600 mb-4 sm:mb-0">
//                       {feedback.length > 0 
//                         ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length)
//                         : '0.0'}
//                     </div>
//                     <div className="text-center sm:text-left">
//                       <div className="flex justify-center sm:justify-start items-center mb-2">
//                         {[...Array(5)].map((_, i) => (
//                           <svg 
//                             key={i} 
//                             className={`w-6 h-6 ${i < Math.round(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length) ? 'text-yellow-400' : 'text-gray-300'}`} 
//                             fill="currentColor" 
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <p className="text-sm text-cyan-700">Based on {feedback.length} reviews</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-medium text-cyan-900">Recent Feedback</h3>
//                   <select
//                     value={feedbackFilter}
//                     onChange={(e) => setFeedbackFilter(e.target.value)}
//                     className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
//                   >
//                     <option value="all">All Ratings</option>
//                     <option value="high">4-5 Stars</option>
//                     <option value="low">1-2 Stars</option>
//                   </select>
//                 </div>
                
//                 <div className="space-y-6">
//                   {filteredFeedback.length === 0 ? (
//                     <div className="text-center py-10">
//                       <p className="text-cyan-700">No feedback found matching your criteria</p>
//                     </div>
//                   ) : (
//                     filteredFeedback.map((item, i) => (
//                       <div key={item.id} className="border-b border-cyan-100 pb-6 last:border-0">
//                         <div className="flex items-start">
//                           <div className="w-10 h-10 rounded-full bg-cyan-200 mr-4 flex items-center justify-center text-cyan-800 font-medium">
//                             {item.participant.charAt(0)}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
//                               <div>
//                                 <h4 className="font-medium text-cyan-900">{item.participant}</h4>
//                                 <div className="flex items-center mt-1">
//                                   {[...Array(5)].map((_, j) => (
//                                     <svg 
//                                       key={j} 
//                                       className={`w-4 h-4 ${j < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
//                                       fill="currentColor" 
//                                       viewBox="0 0 20 20"
//                                     >
//                                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                     </svg>
//                                   ))}
//                                 </div>
//                               </div>
//                               <span className="text-xs text-cyan-600 mt-1 sm:mt-0">
//                                 {moment(item.date).format('MMM D, YYYY')}
//                               </span>
//                             </div>
//                             <div className="mt-2">
//                               <span className="text-sm font-medium text-cyan-800">Workshop: {item.workshopTitle}</span>
//                             </div>
//                             <p className="mt-3 text-cyan-800">
//                               {item.comment}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )} 
          
//             {activeTab === 'earnings' && (
//              <Earnings/>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client"
import { useEffect, useMemo, useState } from 'react';
import { Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Sidebar } from '../components/SideBar';
import AddCourseButton from '../components/addcourse';
import StatsBar from './statsbar';
import WorkshopCalendar from './calender';
import Earnings from './earnings';
import MyWorkshops from './myworkshops';
import { useLive } from '../hooks/useLive';
type WorkshopStatus = "draft" | "upcoming";

type Workshop = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
 mode: string;
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
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

export default function OfferskillsPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'workshops' | 'feedback' | 'earnings'>('schedule');
  
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

  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const { getLives } = useLive();
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
useEffect(() => {
  const fetch = async () => {
    const lives = await getLives(); // Now returns the data
    const mapped = lives.map((live: { _id: any; title: any; description: any; startTime: string | number | Date; endTime: string | number | Date; mode: any; maxParticipants: any; registered: any; status: any; }) => ({
      id: live._id!,
      title: live.title,
      description: live.description,
      start: new Date(live.startTime),
      end: new Date(live.endTime),
      mode: live.mode,
      maxParticipants: live.maxParticipants,
      registered: live.registered || 0,
      status: live.status,
    }));
    setWorkshops(mapped);
  };
  fetch();
}, []);

  const transactionStatusColors = {
    processing: { bg: colors.primaryLight, text: colors.primaryDark },
    paid: { bg: '#dcfce7', text: '#166534' },
    failed: { bg: '#fee2e2', text: '#991b1b' }
  };

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

  const filteredFeedback = feedbackFilter === 'all' 
    ? feedback 
    : feedback.filter(f => {
        if (feedbackFilter === 'high') return f.rating >= 4;
        if (feedbackFilter === 'low') return f.rating <= 2;
        return true;
      });

  const handleAddWorkshop = (workshop: Workshop) => {
    setWorkshops([...workshops, workshop]);
  };

  const handleUpdateWorkshop = (updatedWorkshop: Workshop) => {
    setWorkshops(workshops.map(workshop => 
      workshop.id === updatedWorkshop.id ? updatedWorkshop : workshop
    ));
  };

 
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <header className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Offerskills Dashboard</h1>
            <div className="flex items-center space-x-4">
              <AddCourseButton/>
            </div>
          </div>
        </header>

        <StatsBar workshops={workshops} feedback={feedback}/>

        <main className="max-w-7xl mx-auto p-6">
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

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {activeTab === 'schedule' && (
              <WorkshopCalendar
                workshops={workshops}
                onAddWorkshop={handleAddWorkshop}
                onUpdateWorkshop={handleUpdateWorkshop}
              />
            )}

            {activeTab === 'workshops' && (
        <MyWorkshops/>
            )}

            {activeTab === 'feedback' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-cyan-900">Participant Feedback</h2>
                
                <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border border-cyan-100 mb-8">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="text-5xl font-bold mr-0 sm:mr-6 text-cyan-600 mb-4 sm:mb-0">
                      {feedback.length > 0 
                        ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
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
                    filteredFeedback.map((item) => (
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
              <Earnings/>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}