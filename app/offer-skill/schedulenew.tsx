


// 'use client';

// import { useState } from "react";
// import moment from "moment";
// import { v4 as uuidv4 } from "uuid";
// import { useLive } from "../hooks/useLive";

// type WorkshopStatus = "draft" | "upcoming";

// type Workshop = {
//   id: string;
//   title: string;
//   description: string;
//   start: Date;
//   end: Date;
//   mode: string;
//   maxParticipants: number;
//   registered: number;
//   status: WorkshopStatus;
//   address: string;
// };

// function ScheduleNew({ onAddWorkshop }: { onAddWorkshop: (workshop: Workshop) => void }) {
//   const [newWorkshop, setNewWorkshop] = useState<Workshop>({
//     id: "",
//     title: "",
//     description: "",
//     start: new Date(),
//     end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
//     mode: "Online",
//     maxParticipants: 10,
//     registered: 0,
//     status: "draft",
//     address: "",
//   });

//   const { createLive, loading, error } = useLive();

//   const handleScheduleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const workshopData = {
//       title: newWorkshop.title,
//       description: newWorkshop.description,
//       startTime: newWorkshop.start,
//       endTime: newWorkshop.end,
//       mode: newWorkshop.mode,
//       address: newWorkshop.address,
//       maxParticipants: newWorkshop.maxParticipants,
//       status: newWorkshop.status,
//     };

//     try {
//       const result = await createLive(workshopData);
//       alert("Live session created!");

//       // Update local list if needed
//       onAddWorkshop({ ...newWorkshop, id: uuidv4() });

//       // Reset form
//       setNewWorkshop({
//         id: "",
//         title: "",
//         description: "",
//         start: new Date(),
//         end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
//         mode: "Online",
//         maxParticipants: 10,
//         registered: 0,
//         status: "draft",
//         address: "",
//       });
//     } catch (err) {
//       console.error("Error creating session:", err);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-bold mb-6 text-cyan-900">Schedule New Workshop</h2>
//       <form onSubmit={handleScheduleSubmit} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
//           <input
//             type="text"
//             value={newWorkshop.title}
//             onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
//             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
//           <textarea
//             value={newWorkshop.description}
//             onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
//             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//             rows={4}
//             required
//           />
//         </div>

//         {/* Start/End Time */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-cyan-800 mb-1">Start Time</label>
//             <input
//               type="datetime-local"
//               value={moment(newWorkshop.start).format("YYYY-MM-DDTHH:mm")}
//               onChange={(e) => setNewWorkshop({ ...newWorkshop, start: new Date(e.target.value) })}
//               className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-cyan-800 mb-1">End Time</label>
//             <input
//               type="datetime-local"
//               value={moment(newWorkshop.end).format("YYYY-MM-DDTHH:mm")}
//               onChange={(e) => setNewWorkshop({ ...newWorkshop, end: new Date(e.target.value) })}
//               className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//               required
//             />
//           </div>
//         </div>

//         {/* Mode and Address */}
//         <div>
//           <label className="block text-sm font-medium text-cyan-800 mb-1">Mode</label>
//           <select
//             value={newWorkshop.mode}
//             onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
//             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//           >
//             <option value="Online">Online</option>
//             <option value="In-Person">In-Person</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>

//           {(newWorkshop.mode === "In-Person" || newWorkshop.mode === "Hybrid") && (
//             <div className="mt-3">
//               <label className="block text-sm font-medium text-cyan-800 mb-1">Location Address</label>
//               <input
//                 type="text"
//                 value={newWorkshop.address || ""}
//                 onChange={(e) => setNewWorkshop({ ...newWorkshop, address: e.target.value })}
//                 placeholder="Enter address"
//                 className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//               />
//             </div>
//           )}
//         </div>

//         {/* Max Participants */}
//         <div>
//           <label className="block text-sm font-medium text-cyan-800 mb-1">Max Participants</label>
//           <input
//             type="number"
//             value={newWorkshop.maxParticipants}
//             onChange={(e) => setNewWorkshop({ ...newWorkshop, maxParticipants: parseInt(e.target.value) })}
//             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//             min={1}
//             required
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-sm font-medium text-cyan-800 mb-1">Status</label>
//           <select
//             value={newWorkshop.status}
//             onChange={(e) => setNewWorkshop({ ...newWorkshop, status: e.target.value as WorkshopStatus })}
//             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
//           >
//             <option value="draft">Draft</option>
//             <option value="upcoming">Upcoming</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
//         >
//           {loading ? "Scheduling..." : "Schedule Workshop"}
//         </button>

//         {error && <p className="text-red-600 mt-2">{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default ScheduleNew;

'use client';

import { useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useLive } from "../hooks/useLive";
import toast from "react-hot-toast";

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
  address: string;
};

function ScheduleNew({ onAddWorkshop }: { onAddWorkshop: (workshop: Workshop) => void }) {
  const [newWorkshop, setNewWorkshop] = useState<Workshop>({
    id: "",
    title: "",
    description: "",
    start: new Date(),
    end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    mode: "Online",
    maxParticipants: 10,
    registered: 0,
    status: "draft",
    address: "",
  });

  const { createLive, loading } = useLive();

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!newWorkshop.title.trim() || !newWorkshop.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    if (newWorkshop.start >= newWorkshop.end) {
      toast.error("End time must be after start time.");
      return;
    }

    const workshopData = {
      title: newWorkshop.title,
      description: newWorkshop.description,
      startTime: newWorkshop.start,
      endTime: newWorkshop.end,
      mode: newWorkshop.mode,
      address: newWorkshop.address,
      maxParticipants: newWorkshop.maxParticipants,
      status: newWorkshop.status,
    };

    const toastId = toast.loading("Scheduling workshop...");
    try {
      await createLive(workshopData);
      toast.success("Workshop scheduled successfully!", { id: toastId });

      // Update local list
      onAddWorkshop({ ...newWorkshop, id: uuidv4() });

      // Reset form
      setNewWorkshop({
        id: "",
        title: "",
        description: "",
        start: new Date(),
        end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        mode: "Online",
        maxParticipants: 10,
        registered: 0,
        status: "draft",
        address: "",
      });
      toast("Form reset!", { icon: "🔄" });
    } catch (err) {
      console.error("Error creating session:", err);
      toast.error("Failed to schedule workshop", { id: toastId });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-900">Schedule New Workshop</h2>
      <form onSubmit={handleScheduleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
          <input
            type="text"
            value={newWorkshop.title}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
          <textarea
            value={newWorkshop.description}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
            rows={4}
            required
          />
        </div>

        {/* Start/End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-800 mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={moment(newWorkshop.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, start: new Date(e.target.value) })}
              className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-800 mb-1">End Time</label>
            <input
              type="datetime-local"
              value={moment(newWorkshop.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => setNewWorkshop({ ...newWorkshop, end: new Date(e.target.value) })}
              className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Mode and Address */}
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Mode</label>
          <select
            value={newWorkshop.mode}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
          >
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {(newWorkshop.mode === "In-Person" || newWorkshop.mode === "Hybrid") && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-cyan-800 mb-1">Location Address</label>
              <input
                type="text"
                value={newWorkshop.address || ""}
                onChange={(e) => setNewWorkshop({ ...newWorkshop, address: e.target.value })}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Max Participants */}
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Max Participants</label>
          <input
            type="number"
            value={newWorkshop.maxParticipants}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, maxParticipants: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
            min={1}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Status</label>
          <select
            value={newWorkshop.status}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, status: e.target.value as WorkshopStatus })}
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
          >
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
        >
          {loading ? "Scheduling..." : "Schedule Workshop"}
        </button>
      </form>
    </div>
  );
}

export default ScheduleNew;
