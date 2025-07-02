
// import moment from "moment";
// import { useState, useEffect } from "react";
// import { FiEdit, FiTrash2, FiChevronRight } from "react-icons/fi";

// type StatusColors = {
//   [key: string]: { bg: string; text: string };
// };
// type WorkshopStatus = "draft" | "upcoming";

// export interface Workshop {
//   location?: string;
//   id: string;
//   title: string;
//   description: string;
//   start: Date;
//   end: Date;
//   mode: string;
//   maxParticipants: number;
//   registered: number;
//   status: WorkshopStatus;
// }

// interface MyWorkshopsProps {
//   workshops: Workshop[];
//   setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
//   workshopFilter: string;
//   setWorkshopFilter: React.Dispatch<React.SetStateAction<string>>;
//   statusColors: StatusColors;
// }

// function MyWorkshops({
//   workshops,
//   setWorkshops,
//   workshopFilter,
//   setWorkshopFilter,
//   statusColors,
// }: MyWorkshopsProps) {
//   const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [formattedWorkshops, setFormattedWorkshops] = useState<
//     (Workshop & { formattedStart: string })[]
//   >([]);

//   // Trigger a re-render every 60 seconds to update "Join Now" visibility
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFormattedWorkshops((prev) => [...prev]);
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const formatted = workshops.map((w) => ({
//       ...w,
//       formattedStart: moment(w.start).format("MMMM Do YYYY, h:mm a"),
//     }));
//     setFormattedWorkshops(formatted);
//   }, [workshops]);

//   const handleDeleteWorkshop = (id: string) => {
//     setWorkshops(workshops.filter((w) => w.id !== id));
//   };

//   const filteredWorkshops =
//     workshopFilter === "all"
//       ? formattedWorkshops
//       : formattedWorkshops.filter((w) => w.status === workshopFilter);

//   const isJoinable = (startTime: Date) => {
//     const now = moment();
//     const start = moment(startTime);
//     return start.diff(now, "minutes") <= 5 && now.isBefore(start.clone().add(1, "hours"));
//   };

//   if (formattedWorkshops.length === 0 && workshops.length > 0) {
//     return <p className="p-6 text-cyan-700">Loading workshops...</p>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h2 className="text-2xl font-bold text-cyan-900 mb-4 sm:mb-0">My Workshops</h2>
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
//           <select
//             value={workshopFilter}
//             onChange={(e) => setWorkshopFilter(e.target.value)}
//             className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
//           >
//             <option value="all">All Status</option>
//             <option value="upcoming">Upcoming</option>
//             <option value="completed">Completed</option>
//             <option value="draft">Draft</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search workshops..."
//             className="text-sm border border-cyan-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
//           />
//         </div>
//       </div>

//       <div className="space-y-4">
//         {filteredWorkshops.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-cyan-700">No workshops found matching your criteria</p>
//           </div>
//         ) : (
//           filteredWorkshops.map((workshop) => (
//             <div
//               key={workshop.id}
//               className="border border-cyan-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
//             >
//               <div className="p-5">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
//                   <div>
//                     <h3 className="text-lg font-bold text-cyan-900">{workshop.title}</h3>
//                     <p className="text-sm text-cyan-700 mt-1">
//                       {workshop.formattedStart} • {workshop.location || "Online"}
//                     </p>
//                     <p className="mt-3 text-cyan-800">{workshop.description}</p>
//                   </div>
//                   <span
//                     className="px-3 py-1 text-xs rounded-full capitalize font-medium mt-2 sm:mt-0"
//                     style={{
//                       backgroundColor: statusColors[workshop.status]?.bg || "#ccc",
//                       color: statusColors[workshop.status]?.text || "#000",
//                     }}
//                   >
//                     {workshop.status}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//                   <div className="w-full sm:max-w-xs mb-4 sm:mb-0">
//                     <div className="flex justify-between text-sm text-cyan-800 mb-1">
//                       <span>
//                         Registration: {workshop.registered}/{workshop.maxParticipants}
//                       </span>
//                       <span>
//                         {Math.round((workshop.registered / workshop.maxParticipants) * 100)}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-cyan-100 rounded-full h-2">
//                       <div
//                         className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"
//                         style={{
//                           width: `${(workshop.registered / workshop.maxParticipants) * 100}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       className="flex items-center text-sm text-cyan-600 hover:text-cyan-800 px-3 py-1 bg-cyan-50 rounded-md"
//                       onClick={() => {
//                         setSelectedWorkshop(workshop);
//                         setIsEditModalOpen(true);
//                       }}
//                     >
//                       <FiEdit className="mr-1" /> Edit
//                     </button>
//                     <button
//                       className="flex items-center text-sm text-red-600 hover:text-red-800 px-3 py-1 bg-red-50 rounded-md"
//                       onClick={() => handleDeleteWorkshop(workshop.id)}
//                     >
//                       <FiTrash2 className="mr-1" /> Delete
//                     </button>
//                     {isJoinable(workshop.start) && (
//                       <button
//                         onClick={() => (window.location.href = `/offer-skill/${workshop.id}`)}
//                         className="flex items-center text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
//                       >
//                         Join Now
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//                 <div className="flex items-center mb-2 sm:mb-0">
//                   <div className="flex -space-x-2">
//                     {[...Array(Math.min(3, workshop.registered || 0))].map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-8 h-8 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800"
//                       >
//                         {i + 1}
//                       </div>
//                     ))}
//                     {workshop.registered > 3 && (
//                       <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800">
//                         +{workshop.registered - 3}
//                       </div>
//                     )}
//                   </div>
//                   <span className="ml-3 text-sm text-cyan-700">
//                     {workshop.registered} participants
//                   </span>
//                 </div>
//                 <button className="text-sm font-medium text-cyan-600 hover:text-cyan-800 flex items-center">
//                   Manage <FiChevronRight className="ml-1" />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyWorkshops;
'use client';

import moment from "moment";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiChevronRight } from "react-icons/fi";

type StatusColors = {
  [key: string]: { bg: string; text: string };
};

type WorkshopStatus = "draft" | "upcoming" | "completed" | "cancelled";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  mode: string;
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
  location?: string;
  isPaid?: boolean; // NEW
  price?: number;    // NEW
}

interface MyWorkshopsProps {
  workshops: Workshop[];
  setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
  workshopFilter: string;
  setWorkshopFilter: React.Dispatch<React.SetStateAction<string>>;
  statusColors: StatusColors;
}

function MyWorkshops({
  workshops,
  setWorkshops,
  workshopFilter,
  setWorkshopFilter,
  statusColors,
}: MyWorkshopsProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formattedWorkshops, setFormattedWorkshops] = useState<
    (Workshop & { formattedStart: string })[]
  >([]);
  const [purchasedWorkshops, setPurchasedWorkshops] = useState<string[]>([]); // track purchased workshops

  // Force periodic re-render
  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedWorkshops((prev) => [...prev]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formatted = workshops.map((w) => ({
      ...w,
      formattedStart: moment(w.start).format("MMMM Do YYYY, h:mm a"),
    }));
    setFormattedWorkshops(formatted);
  }, [workshops]);

  const handleDeleteWorkshop = (id: string) => {
    setWorkshops(workshops.filter((w) => w.id !== id));
  };

  const filteredWorkshops =
    workshopFilter === "all"
      ? formattedWorkshops
      : formattedWorkshops.filter((w) => w.status === workshopFilter);

  const isJoinable = (startTime: Date) => {
    const now = moment();
    const start = moment(startTime);
    return start.diff(now, "minutes") <= 5 && now.isBefore(start.clone().add(1, "hours"));
  };

  // Dummy purchase handler
  const handlePurchase = async (workshop: Workshop) => {
    try {
      // TODO: Implement real API call here
      alert(`Processing payment for ${workshop.title} - $${workshop.price}`);
      setPurchasedWorkshops((prev) => [...prev, workshop.id]);
    } catch (error) {
      alert("Error while purchasing workshop");
    }
  };

  return (
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
          filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="border border-cyan-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-900">{workshop.title}</h3>
                    <p className="text-sm text-cyan-700 mt-1">
                      {workshop.formattedStart} • {workshop.location || "Online"}
                    </p>
                    <p className="mt-3 text-cyan-800">{workshop.description}</p>
                  </div>
                  <span
                    className="px-3 py-1 text-xs rounded-full capitalize font-medium mt-2 sm:mt-0"
                    style={{
                      backgroundColor: statusColors[workshop.status]?.bg || "#ccc",
                      color: statusColors[workshop.status]?.text || "#000",
                    }}
                  >
                    {workshop.status}
                  </span>
                </div>

                {/* Registration Progress */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="w-full sm:max-w-xs mb-4 sm:mb-0">
                    <div className="flex justify-between text-sm text-cyan-800 mb-1">
                      <span>
                        Registration: {workshop.registered}/{workshop.maxParticipants}
                      </span>
                      <span>
                        {Math.round((workshop.registered / workshop.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-cyan-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                        style={{
                          width: `${(workshop.registered / workshop.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
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

                    {isJoinable(workshop.start) &&
                      (workshop.isPaid ? (
                        purchasedWorkshops.includes(workshop.id) ? (
                          <button
                            onClick={() => (window.location.href = `/offer-skill/${workshop.id}`)}
                            className="flex items-center text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
                          >
                            Join Now
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePurchase(workshop)}
                            className="flex items-center text-sm text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-md"
                          >
                            Pay ${workshop.price} & Join
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => (window.location.href = `/offer-skill/${workshop.id}`)}
                          className="flex items-center text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
                        >
                          Join Now
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Participants info */}
              <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, workshop.registered || 0))].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800"
                      >
                        {i + 1}
                      </div>
                    ))}
                    {workshop.registered > 3 && (
                      <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center text-xs font-medium text-cyan-800">
                        +{workshop.registered - 3}
                      </div>
                    )}
                  </div>
                  <span className="ml-3 text-sm text-cyan-700">
                    {workshop.registered} participants
                  </span>
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
  );
}

export default MyWorkshops;
// bc i forgot maine last changes kya kiye theeeeeeeeeeeeeeee all because i give stupid commit message 