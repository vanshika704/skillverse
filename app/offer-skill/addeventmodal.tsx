
import React, { useState, useEffect } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useLive } from "../hooks/useLive";
import { getUserId } from "../hooks/useUser";

type WorkshopStatus = "draft" | "upcoming";

type Workshop = {
  User: string;
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddWorkshop: (workshop: Workshop) => void;
}

const AddEventModal: React.FC<Props> = ({ isOpen, onClose, selectedDate, onAddWorkshop }) => {
  const { createLive } = useLive();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Online',
    maxParticipants: 100,
    status: 'draft' as WorkshopStatus,
  });

  useEffect(() => {
    if (selectedDate) {
      const startTime = moment(selectedDate).format("HH:mm");
      const endTime = moment(selectedDate).add(1, "hour").format("HH:mm");
      setFormData(prev => ({
        ...prev,
        startTime,
        endTime,
      }));
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const start = moment(`${moment(selectedDate).format("YYYY-MM-DD")}T${formData.startTime}`).toDate();
    const end = moment(`${moment(selectedDate).format("YYYY-MM-DD")}T${formData.endTime}`).toDate();

    const userId = getUserId();
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    const newWorkshop: Workshop = {
      User: userId,
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      start,
      end,
      mode: formData.location,
      maxParticipants: formData.maxParticipants,
      registered: 0,
      status: formData.status,
    };

    const workshopData = {
      _id: newWorkshop.id,
      User: newWorkshop.User,
      title: newWorkshop.title,
      description: newWorkshop.description,
      startTime: newWorkshop.start.toISOString(),
      endTime: newWorkshop.end.toISOString(),
      mode: newWorkshop.mode,
      maxParticipants: newWorkshop.maxParticipants,
      status: newWorkshop.status,
    };

    const toastId = toast.loading("Creating workshop...");
    try {
      await createLive(workshopData);
      toast.success("Workshop created successfully!", { id: toastId });
      onAddWorkshop(newWorkshop);
      onClose();
    } catch (err) {
      console.error("Error creating workshop:", err);
      toast.error("Failed to create workshop", { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Add New Workshop</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Participants</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: +e.target.value })}
              min={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as WorkshopStatus })}
            >
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => {
                toast("Cancelled workshop creation");
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Add Workshop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
