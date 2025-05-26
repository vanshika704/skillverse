

// // 'use client';

// // import { useState } from "react";
// // import moment from "moment";
// // import { v4 as uuidv4 } from "uuid";
// // import { useLive } from "../hooks/useLive";
// // import toast from "react-hot-toast";

// // type WorkshopStatus = "draft" | "upcoming";

// // type Workshop = {
// //   id: string;
// //   title: string;
// //   description: string;
// //   start: Date;
// //   end: Date;
// //   mode: string;
// //   maxParticipants: number;
// //   registered: number;
// //   status: WorkshopStatus;
// //   address: string;
// // };

// // function ScheduleNew({ onAddWorkshop }: { onAddWorkshop: (workshop: Workshop) => void }) {
// //   const [newWorkshop, setNewWorkshop] = useState<Workshop>({
// //     id: "",
// //     title: "",
// //     description: "",
// //     start: new Date(),
// //     end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
// //     mode: "Online",
// //     maxParticipants: 10,
// //     registered: 0,
// //     status: "draft",
// //     address: "",
// //   });

// //   const { createLive, loading } = useLive();

// //   const handleScheduleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Validate required fields
// //     if (!newWorkshop.title.trim() || !newWorkshop.description.trim()) {
// //       toast.error("Title and description are required.");
// //       return;
// //     }

// //     if (newWorkshop.start >= newWorkshop.end) {
// //       toast.error("End time must be after start time.");
// //       return;
// //     }

// //     const workshopData = {
// //       title: newWorkshop.title,
// //       description: newWorkshop.description,
// //       startTime: newWorkshop.start,
// //       endTime: newWorkshop.end,
// //       mode: newWorkshop.mode,
// //       address: newWorkshop.address,
// //       maxParticipants: newWorkshop.maxParticipants,
// //       status: newWorkshop.status,
// //     };

// //     const toastId = toast.loading("Scheduling workshop...");
// //     try {
// //       await createLive(workshopData);
// //       toast.success("Workshop scheduled successfully!", { id: toastId });

// //       // Update local list
// //       onAddWorkshop({ ...newWorkshop, id: uuidv4() });

// //       // Reset form
// //       setNewWorkshop({
// //         id: "",
// //         title: "",
// //         description: "",
// //         start: new Date(),
// //         end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
// //         mode: "Online",
// //         maxParticipants: 10,
// //         registered: 0,
// //         status: "draft",
// //         address: "",
// //       });
// //       toast("Form reset!", { icon: "🔄" });
// //     } catch (err) {
// //       console.error("Error creating session:", err);
// //       toast.error("Failed to schedule workshop", { id: toastId });
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-md p-6">
// //       <h2 className="text-2xl font-bold mb-6 text-cyan-900">Schedule New Workshop</h2>
// //       <form onSubmit={handleScheduleSubmit} className="space-y-4">
// //         {/* Title */}
// //         <div>
// //           <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
// //           <input
// //             type="text"
// //             value={newWorkshop.title}
// //             onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
// //             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //             required
// //           />
// //         </div>

// //         {/* Description */}
// //         <div>
// //           <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
// //           <textarea
// //             value={newWorkshop.description}
// //             onChange={(e) => setNewWorkshop({ ...newWorkshop, description: e.target.value })}
// //             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //             rows={4}
// //             required
// //           />
// //         </div>

// //         {/* Start/End Time */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-cyan-800 mb-1">Start Time</label>
// //             <input
// //               type="datetime-local"
// //               value={moment(newWorkshop.start).format("YYYY-MM-DDTHH:mm")}
// //               onChange={(e) => setNewWorkshop({ ...newWorkshop, start: new Date(e.target.value) })}
// //               className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-cyan-800 mb-1">End Time</label>
// //             <input
// //               type="datetime-local"
// //               value={moment(newWorkshop.end).format("YYYY-MM-DDTHH:mm")}
// //               onChange={(e) => setNewWorkshop({ ...newWorkshop, end: new Date(e.target.value) })}
// //               className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //               required
// //             />
// //           </div>
// //         </div>

// //         {/* Mode and Address */}
// //         <div>
// //           <label className="block text-sm font-medium text-cyan-800 mb-1">Mode</label>
// //           <select
// //             value={newWorkshop.mode}
// //             onChange={(e) => setNewWorkshop({ ...newWorkshop, mode: e.target.value })}
// //             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //           >
// //             <option value="Online">Online</option>
// //             <option value="In-Person">In-Person</option>
// //             <option value="Hybrid">Hybrid</option>
// //           </select>

// //           {(newWorkshop.mode === "In-Person" || newWorkshop.mode === "Hybrid") && (
// //             <div className="mt-3">
// //               <label className="block text-sm font-medium text-cyan-800 mb-1">Location Address</label>
// //               <input
// //                 type="text"
// //                 value={newWorkshop.address || ""}
// //                 onChange={(e) => setNewWorkshop({ ...newWorkshop, address: e.target.value })}
// //                 placeholder="Enter address"
// //                 className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* Max Participants */}
// //         <div>
// //           <label className="block text-sm font-medium text-cyan-800 mb-1">Max Participants</label>
// //           <input
// //             type="number"
// //             value={newWorkshop.maxParticipants}
// //             onChange={(e) => setNewWorkshop({ ...newWorkshop, maxParticipants: parseInt(e.target.value) })}
// //             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //             min={1}
// //             required
// //           />
// //         </div>

// //         {/* Status */}
// //         <div>
// //           <label className="block text-sm font-medium text-cyan-800 mb-1">Status</label>
// //           <select
// //             value={newWorkshop.status}
// //             onChange={(e) => setNewWorkshop({ ...newWorkshop, status: e.target.value as WorkshopStatus })}
// //             className="w-full px-4 py-2 border border-cyan-200 rounded-lg"
// //           >
// //             <option value="draft">Draft</option>
// //             <option value="upcoming">Upcoming</option>
// //           </select>
// //         </div>

// //         {/* Submit */}
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
// //         >
// //           {loading ? "Scheduling..." : "Schedule Workshop"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default ScheduleNew;
// 'use client';

// import { useState } from "react";
// import moment from "moment";
// import { v4 as uuidv4 } from "uuid";
// import { useLive } from "../hooks/useLive";
// import toast from "react-hot-toast";
// import { getUserId } from "../hooks/useUser";

// type WorkshopStatus = "draft" | "upcoming";

// type Workshop = {
//   User: string;
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
//   const initialWorkshopState: Workshop = {
//     User: getUserId() || "",
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
//   };

//   const [newWorkshop, setNewWorkshop] = useState<Workshop>(initialWorkshopState);
//   const { createLive, loading } = useLive();

//   const handleScheduleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const userId = getUserId();
//     if (!userId) {
//       toast.error("User not authenticated");
//       return;
//     }

//     if (!newWorkshop.title.trim() || !newWorkshop.description.trim()) {
//       toast.error("Title and description are required.");
//       return;
//     }

//     if (newWorkshop.start >= newWorkshop.end) {
//       toast.error("End time must be after start time.");
//       return;
//     }

//     const workshopData = {
//       User: userId,
//       title: newWorkshop.title,
//       description: newWorkshop.description,
//       startTime: newWorkshop.start,
//       endTime: newWorkshop.end,
//       mode: newWorkshop.mode,
//       address: newWorkshop.address,
//       maxParticipants: newWorkshop.maxParticipants,
//       status: newWorkshop.status,
//     };

//     const toastId = toast.loading("Scheduling workshop...");
//     try {
//       await createLive(workshopData);
//       toast.success("Workshop scheduled successfully!", { id: toastId });

//       onAddWorkshop({ ...newWorkshop, id: uuidv4() });

//       setNewWorkshop({
//         ...initialWorkshopState,
//         User: getUserId() || "", // Refresh the User ID
//       });

//       toast("Form reset!", { icon: "🔄" });
//     } catch (err) {
//       console.error("Error creating session:", err);
//       toast.error("Failed to schedule workshop", { id: toastId });
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
//                 value={newWorkshop.address}
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
//       </form>
//     </div>
//   );
// }

// export default ScheduleNew;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUserId } from "../hooks/useUser";
import { LiveSession, useLive } from "../hooks/useLive";

type StatusType = "draft" | "upcoming";

interface FormState {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  mode: "online" | "offline";
  address: string;
  maxParticipants: number;
  status: StatusType;
}

export default function LiveSessions() {
  const { loading, error, data, getLives, createLive } = useLive();
  const userId = getUserId();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    mode: "online",
    address: "",
    maxParticipants: 10,
    status: "draft",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      await getLives();
    } catch {
      toast.error("Failed to load sessions.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]:
        name === "maxParticipants"
          ? Number(value)
          : (name === "mode" && (value === "online" || value === "offline")
            ? value
            : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (new Date(form.endTime) <= new Date(form.startTime)) {
      toast.error("End time must be after start time.");
      return;
    }

    const newSession: LiveSession & { _id: string; User: string } = {
      ...form,
      _id: `${Date.now()}`,
      User: userId,
      maxParticipants: Number(form.maxParticipants),
      startTime: new Date(form.startTime).toISOString(),
      endTime: new Date(form.endTime).toISOString(),
    };

    toast.info("Creating session...");

    try {
      await createLive(newSession);
      toast.success("Live session created!");
      setForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        mode: "online",
        address: "",
        maxParticipants: 10,
        status: "draft",
      });
      await loadSessions();
    } catch {
      toast.error("Failed to create session.");
    }
  };

  const formVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen  font-sans flex flex-col items-center">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-8"
        variants={formVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-semibold text-cyan-800 mb-8 border-b border-cyan-200 pb-3">
          Create New Session
        </h2>

        <label className="block mb-6">
          <span className="text-cyan-900 font-medium">Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            placeholder="Enter session title"
          />
        </label>

        <label className="block mb-6">
          <span className="text-cyan-900 font-medium">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={2}
            className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            placeholder="Brief session description"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <label>
            <span className="text-cyan-900 font-medium">Start Time</span>
            <input
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>
          <label>
            <span className="text-cyan-900 font-medium">End Time</span>
            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>
        </div>

        <label className="block mb-6">
          <span className="text-cyan-900 font-medium">Mode</span>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>

        {form.mode === "offline" && (
          <label className="block mb-6">
            <span className="text-cyan-900 font-medium">Address</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              placeholder="Location address"
            />
          </label>
        )}

        <label className="block mb-6">
          <span className="text-cyan-900 font-medium">Max Participants</span>
          <input
            type="number"
            name="maxParticipants"
            value={form.maxParticipants}
            min={1}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </label>

        <label className="block mb-8">
          <span className="text-cyan-900 font-medium">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          >
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Session"}
        </button>
      </motion.form>
    </div>
  );
}
