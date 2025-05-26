

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { getUserId } from "../hooks/useUser";
// import { LiveSession, useLive } from "../hooks/useLive";

// type StatusType = "draft" | "upcoming";
// interface LiveSessionsProps {
//   onAddWorkshop?: (workshop: LiveSession & { _id: string; User: string }) => void;
// }
// interface FormState {
//   title: string;
//   description: string;
//   startTime: string;
//   endTime: string;
//   mode: "online" | "offline";
//   address: string;
//   maxParticipants: number;
//   status: StatusType;
// }

// export default function LiveSessions({ onAddWorkshop }: LiveSessionsProps)  {
//   const { loading, error, data, getLives, createLive } = useLive();
//   const userId = getUserId();

//   const [form, setForm] = useState<FormState>({
//     title: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     mode: "online",
//     address: "",
//     maxParticipants: 10,
//     status: "draft",
//   });

 


//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setForm((f) => ({
//       ...f,
//       [name]:
//         name === "maxParticipants"
//           ? Number(value)
//           : (name === "mode" && (value === "online" || value === "offline")
//             ? value
//             : value),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userId) {
//       toast.error("User not logged in.");
//       return;
//     }

//     if (new Date(form.endTime) <= new Date(form.startTime)) {
//       toast.error("End time must be after start time.");
//       return;
//     }

//     const newSession: LiveSession & { _id: string; User: string } = {
//       ...form,
//       _id: `${Date.now()}`,
//       User: userId,
//       maxParticipants: Number(form.maxParticipants),
//       startTime: new Date(form.startTime).toISOString(),
//       endTime: new Date(form.endTime).toISOString(),
//     };

//     toast.info("Creating session...");

//     try {
//       await createLive(newSession);
//       toast.success("Live session created!");
//       if (onAddWorkshop) {
//     onAddWorkshop(newSession);
//   }
//       setForm({
//         title: "",
//         description: "",
//         startTime: "",
//         endTime: "",
//         mode: "online",
//         address: "",
//         maxParticipants: 10,
//         status: "draft",
//       });
    
//     } catch {
//       toast.error("Failed to create session.");
//     }
//   };

//   const formVariant = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   };

//   return (
//     <div className="min-h-screen  font-sans flex flex-col items-center">
//       <ToastContainer
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <motion.form
//         onSubmit={handleSubmit}
//         className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mb-8"
//         variants={formVariant}
//         initial="hidden"
//         animate="visible"
//       >
//         <h2 className="text-3xl font-semibold text-cyan-800 mb-8 border-b border-cyan-200 pb-3">
//           Create New Session
//         </h2>

//         <label className="block mb-6">
//           <span className="text-cyan-900 font-medium">Title</span>
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//             placeholder="Enter session title"
//           />
//         </label>

//         <label className="block mb-6">
//           <span className="text-cyan-900 font-medium">Description</span>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//             rows={2}
//             className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//             placeholder="Brief session description"
//           />
//         </label>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <label>
//             <span className="text-cyan-900 font-medium">Start Time</span>
//             <input
//               type="datetime-local"
//               name="startTime"
//               value={form.startTime}
//               onChange={handleChange}
//               required
//               className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//             />
//           </label>
//           <label>
//             <span className="text-cyan-900 font-medium">End Time</span>
//             <input
//               type="datetime-local"
//               name="endTime"
//               value={form.endTime}
//               onChange={handleChange}
//               required
//               className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//             />
//           </label>
//         </div>

//         <label className="block mb-6">
//           <span className="text-cyan-900 font-medium">Mode</span>
//           <select
//             name="mode"
//             value={form.mode}
//             onChange={handleChange}
//             className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//           >
//             <option value="online">Online</option>
//             <option value="offline">Offline</option>
//           </select>
//         </label>

//         {form.mode === "offline" && (
//           <label className="block mb-6">
//             <span className="text-cyan-900 font-medium">Address</span>
//             <input
//               type="text"
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//               placeholder="Location address"
//             />
//           </label>
//         )}

//         <label className="block mb-6">
//           <span className="text-cyan-900 font-medium">Max Participants</span>
//           <input
//             type="number"
//             name="maxParticipants"
//             value={form.maxParticipants}
//             min={1}
//             onChange={handleChange}
//             className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//           />
//         </label>

//         <label className="block mb-8">
//           <span className="text-cyan-900 font-medium">Status</span>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="mt-2 block w-full rounded-lg border border-cyan-300 px-4 py-3 text-cyan-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
//           >
//             <option value="draft">Draft</option>
//             <option value="upcoming">Upcoming</option>
//           </select>
//         </label>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 ${
//             loading ? "opacity-60 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Creating..." : "Create Session"}
//         </button>
//       </motion.form>
//     </div>
//   );
// }
import React, { useState } from "react";
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
  const { loading, createLive } = useLive();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "maxParticipants"
          ? Math.max(1, Number(value)) // ensure at least 1 participant
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (!form.startTime || !form.endTime) {
      toast.error("Start time and end time are required.");
      return;
    }

    if (new Date(form.endTime) <= new Date(form.startTime)) {
      toast.error("End time must be after start time.");
      return;
    }

    const newSession: LiveSession & { _id: string; User: string } = {
      ...form,
      _id: Date.now().toString(),
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to create session.");
    }
  };

  const formVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen font-sans flex flex-col items-center">
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
