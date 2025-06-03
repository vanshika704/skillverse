
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import { v4 as uuidv4 } from "uuid";
// import toast from "react-hot-toast";
// import { useLive } from "../hooks/useLive";
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
// };

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedDate: Date | null;
//   onAddWorkshop: (workshop: Workshop) => void;
// }

// const AddEventModal: React.FC<Props> = ({ isOpen, onClose, selectedDate, onAddWorkshop }) => {
//   const { createLive } = useLive();

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     startTime: '09:00',
//     endTime: '10:00',
//     location: 'Online',
//     maxParticipants: 100,
//     status: 'draft' as WorkshopStatus,
//   });

//   useEffect(() => {
//     if (selectedDate) {
//       const startTime = moment(selectedDate).format("HH:mm");
//       const endTime = moment(selectedDate).add(1, "hour").format("HH:mm");
//       setFormData(prev => ({
//         ...prev,
//         startTime,
//         endTime,
//       }));
//     }
//   }, [selectedDate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedDate) {
//       toast.error("Please select a date");
//       return;
//     }

//     if (!formData.title.trim()) {
//       toast.error("Title is required");
//       return;
//     }

//     const start = moment(`${moment(selectedDate).format("YYYY-MM-DD")}T${formData.startTime}`).toDate();
//     const end = moment(`${moment(selectedDate).format("YYYY-MM-DD")}T${formData.endTime}`).toDate();

//     const userId = getUserId();
//     if (!userId) {
//       toast.error("User not authenticated");
//       return;
//     }

//     const newWorkshop: Workshop = {
//       User: userId,
//       id: uuidv4(),
//       title: formData.title,
//       description: formData.description,
//       start,
//       end,
//       mode: formData.location,
//       maxParticipants: formData.maxParticipants,
//       registered: 0,
//       status: formData.status,
//     };

//     const workshopData = {
//       _id: newWorkshop.id,
//       User: newWorkshop.User,
//       title: newWorkshop.title,
//       description: newWorkshop.description,
//       startTime: newWorkshop.start.toISOString(),
//       endTime: newWorkshop.end.toISOString(),
//       mode: newWorkshop.mode,
//       maxParticipants: newWorkshop.maxParticipants,
//       status: newWorkshop.status,
//     };

//     const toastId = toast.loading("Creating workshop...");
//     try {
//       await createLive(workshopData);
//       toast.success("Workshop created successfully!", { id: toastId });
//       onAddWorkshop(newWorkshop);
//       onClose();
//     } catch (err) {
//       console.error("Error creating workshop:", err);
//       toast.error("Failed to create workshop", { id: toastId });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-neutral-900/80 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-semibold mb-4">Add New Workshop</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Title</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows={3}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Start Time</label>
//               <input
//                 type="time"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={formData.startTime}
//                 onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={formData.endTime}
//                 onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Location</label>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.location}
//               onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//             >
//               <option value="Online">Online</option>
//               <option value="In-Person">In-Person</option>
//               <option value="Hybrid">Hybrid</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Max Participants</label>
//             <input
//               type="number"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.maxParticipants}
//               onChange={(e) => setFormData({ ...formData, maxParticipants: +e.target.value })}
//               min={1}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value as WorkshopStatus })}
//             >
//               <option value="draft">Draft</option>
//               <option value="upcoming">Upcoming</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 pt-4">
//             <button
//               type="button"
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//               onClick={() => {
//                 toast("Cancelled workshop creation");
//                 onClose();
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
//             >
//               Add Workshop
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEventModal;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getUserId } from "../hooks/useUser";
import { useLive } from "../hooks/useLive";

type WorkshopStatus = "draft" | "upcoming";

interface FormState {
  title: string;
  description: string;
  startTime: string; // datetime-local format ISO string
  endTime: string;   // datetime-local format ISO string
  mode: "online" | "offline" | "hybrid";
  address: string;
  maxParticipants: number;
  status: WorkshopStatus;
  isPaid: boolean;
  price: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkshop: (workshop: any) => void; // you can type better if needed
}

const AddEventModal: React.FC<Props> = ({ isOpen, onClose, onAddWorkshop }) => {
  const { createLive, loading } = useLive();
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
    isPaid: false,
    price: 0,
  });

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        mode: "online",
        address: "",
        maxParticipants: 10,
        status: "draft",
        isPaid: false,
        price: 0,
      });
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    } else if (name === "maxParticipants") {
      val = Math.max(1, Number(value));
    } else if (name === "price") {
      val = Math.max(0, Number(value));
    } else if (name === "mode") {
      val = value.toLowerCase();
      // Normalize "hybrid" option if you want to keep it
      if (!["online", "offline", "hybrid"].includes(val)) {
        val = "online";
      }
    }

    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required.");
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

    if (form.isPaid && form.price <= 0) {
      toast.error("Price must be greater than 0 for paid workshops.");
      return;
    }

    if ((form.mode === "offline" || form.mode === "hybrid") && !form.address.trim()) {
      toast.error("Address is required for offline or hybrid workshops.");
      return;
    }

    const workshopToCreate = {
      _id: Date.now().toString(),
      User: userId,
      title: form.title.trim(),
      description: form.description.trim(),
      startTime: new Date(form.startTime).toISOString(),
      endTime: new Date(form.endTime).toISOString(),
      mode: form.mode,
      address: form.address.trim(),
      maxParticipants: form.maxParticipants,
      status: form.status,
      isPaid: form.isPaid,
      price: form.isPaid ? form.price : 0,
    };

    const toastId = toast.loading("Creating workshop...");

    try {
      await createLive(workshopToCreate);
      toast.success("Workshop created successfully!", { id: toastId });
      onAddWorkshop(workshopToCreate);

      // Reset form after success
      setForm({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        mode: "online",
        address: "",
        maxParticipants: 10,
        status: "draft",
        isPaid: false,
        price: 0,
      });

      onClose();
    } catch (error) {
      console.error("Error creating workshop:", error);
      toast.error("Failed to create workshop", { id: toastId });
    }
  };

  if (!isOpen) return null;

  const formVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/80 flex items-center justify-center z-50 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 max-h-[90vh] overflow-y-auto"
        variants={formVariant}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-semibold mb-6 text-cyan-800">Create New Workshop</h3>

        <label className="block mb-4">
          <span className="font-medium text-cyan-900">Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter workshop title"
            className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium text-cyan-900">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Brief description"
            className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <label>
            <span className="font-medium text-cyan-900">Start Time</span>
            <input
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>

          <label>
            <span className="font-medium text-cyan-900">End Time</span>
            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>
        </div>

        <label className="block mb-4">
          <span className="font-medium text-cyan-900">Mode</span>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>

        {(form.mode === "offline" || form.mode === "hybrid") && (
          <label className="block mb-4">
            <span className="font-medium text-cyan-900">Address</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required={form.mode === "offline" || form.mode === "hybrid"}
              placeholder="Location address"
              className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>
        )}

        <label className="flex items-center mb-4 space-x-3">
          <input
            type="checkbox"
            name="isPaid"
            checked={form.isPaid}
            onChange={handleChange}
            className="rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
          />
          <span className="text-cyan-900 font-medium">Is Paid Workshop?</span>
        </label>

        {form.isPaid && (
          <label className="block mb-6">
            <span className="font-medium text-cyan-900">Price (USD)</span>
            <input
              type="number"
              min={0}
              name="price"
              value={form.price}
              onChange={handleChange}
              required={form.isPaid}
              className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
          </label>
        )}

        <label className="block mb-6">
          <span className="font-medium text-cyan-900">Max Participants</span>
          <input
            type="number"
            min={1}
            name="maxParticipants"
            value={form.maxParticipants}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-cyan-300 px-4 py-2 text-cyan-900 placeholder-cyan-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 text-white py-3 font-semibold text-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Workshop"}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="mt-3 w-full rounded-lg border border-cyan-600 text-cyan-600 py-3 font-semibold text-lg hover:bg-cyan-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </motion.form>
    </div>
  );
};

export default AddEventModal;
