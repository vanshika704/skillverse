// import moment from "moment";
// import { useState } from "react";
// import { FiEdit, FiTrash2, FiChevronRight } from "react-icons/fi";

// function MyWorkshops({
//   workshops = [],
//   setWorkshops,
//   filteredWorkshops = [],
//   statusColors = {},
//   workshopFilter = "all",
//   setWorkshopFilter
// }: any) {
//   const [selectedWorkshop, setSelectedWorkshop] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const handleDeleteWorkshop = (id: string) => {
//     setWorkshops(workshops.filter((w: any) => w.id !== id));
//   };

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
//           filteredWorkshops.map((workshop: any) => (
//             <div key={workshop.id} className="border border-cyan-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
//               <div className="p-5">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start">
//                   <div>
//                     <h3 className="text-lg font-bold text-cyan-900">{workshop.title}</h3>
//                     <p className="text-sm text-cyan-700 mt-1">
//                       {moment(workshop.start).format('MMMM Do YYYY, h:mm a')} • {workshop.location}
//                     </p>
//                     <p className="mt-3 text-cyan-800">{workshop.description}</p>
//                   </div>
//                   <span
//                     className="px-3 py-1 text-xs rounded-full capitalize font-medium mt-2 sm:mt-0"
//                     style={{
//                       backgroundColor: statusColors[workshop.status]?.bg || "#ccc",
//                       color: statusColors[workshop.status]?.text || "#000"
//                     }}
//                   >
//                     {workshop.status}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//                   <div className="w-full sm:max-w-xs mb-4 sm:mb-0">
//                     <div className="flex justify-between text-sm text-cyan-800 mb-1">
//                       <span>Registration: {workshop.registered}/{workshop.maxParticipants}</span>
//                       <span>{Math.round((workshop.registered / workshop.maxParticipants) * 100)}%</span>
//                     </div>
//                     <div className="w-full bg-cyan-100 rounded-full h-2">
//                       <div
//                         className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"
//                         style={{ width: `${(workshop.registered / workshop.maxParticipants) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
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
//                   <span className="ml-3 text-sm text-cyan-700">{workshop.registered} participants</span>
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

import { useState } from "react";
import { FiEdit, FiTrash2, FiChevronRight } from "react-icons/fi";
import moment from "moment";

type Workshop = {
  id: string;
  title: string;
  start: string;
  location: string;
  description: string;
  status: string;
  registered: number;
  maxParticipants: number;
};

type MyWorkshopsProps = {
  workshops: Workshop[];
  setWorkshops: React.Dispatch<React.SetStateAction<Workshop[]>>;
  filteredWorkshops: Workshop[];
  statusColors: Record<string, { bg: string; text: string }>;
  workshopFilter: string;
  setWorkshopFilter: React.Dispatch<React.SetStateAction<string>>;
};

function MyWorkshops({
  workshops,
  setWorkshops,
  filteredWorkshops,
  statusColors,
  workshopFilter,
  setWorkshopFilter,
}: MyWorkshopsProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteWorkshop = (id: string) => {
    setWorkshops(workshops.filter((w) => w.id !== id));
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
                      {moment(workshop.start).format("MMMM Do YYYY, h:mm a")} • {workshop.location}
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

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="w-full sm:max-w-xs mb-4 sm:mb-0">
                    <div className="flex justify-between text-sm text-cyan-800 mb-1">
                      <span>
                        Registration: {workshop.registered}/{workshop.maxParticipants}
                      </span>
                      <span>{Math.round((workshop.registered / workshop.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-cyan-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600"
                        style={{
                          width: `${(workshop.registered / workshop.maxParticipants) * 100}%`,
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
  );
}

export default MyWorkshops;
