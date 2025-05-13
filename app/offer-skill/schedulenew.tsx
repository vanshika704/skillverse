
import { useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

type WorkshopStatus = "draft" | "upcoming";

type Workshop = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
};

function ScheduleNew({ onAddWorkshop }: { onAddWorkshop: (workshop: Workshop) => void }) {
  const [newWorkshop, setNewWorkshop] = useState<Workshop>({
    id: "",
    title: "",
    description: "",
    start: new Date(),
    end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // Default 2 hours duration
    location: "Online",
    maxParticipants: 10,
    registered: 0,
    status: "draft",
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workshop: Workshop = {
      ...newWorkshop,
      id: uuidv4(),
    };
    onAddWorkshop(workshop);
    setNewWorkshop({
      id: "",
      title: "",
      description: "",
      start: new Date(),
      end: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      location: "Online",
      maxParticipants: 10,
      registered: 0,
      status: "draft",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-900">Schedule New Workshop</h2>
      <form onSubmit={handleScheduleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Title</label>
          <input
            type="text"
            value={newWorkshop.title}
            onChange={(e) =>
              setNewWorkshop({ ...newWorkshop, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Description</label>
          <textarea
            value={newWorkshop.description}
            onChange={(e) =>
              setNewWorkshop({ ...newWorkshop, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cyan-800 mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={moment(newWorkshop.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewWorkshop({
                  ...newWorkshop,
                  start: new Date(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-800 mb-1">End Time</label>
            <input
              type="datetime-local"
              value={moment(newWorkshop.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewWorkshop({
                  ...newWorkshop,
                  end: new Date(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Location</label>
          <select
            value={newWorkshop.location}
            onChange={(e) =>
              setNewWorkshop({ ...newWorkshop, location: e.target.value })
            }
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
            onChange={(e) =>
              setNewWorkshop({
                ...newWorkshop,
                maxParticipants: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-800 mb-1">Status</label>
          <select
            value={newWorkshop.status}
            onChange={(e) =>
              setNewWorkshop({
                ...newWorkshop,
                status: e.target.value as WorkshopStatus,
              })
            }
            className="w-full px-4 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          >
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
        >
          Schedule Workshop
        </button>
      </form>
    </div>
  );
}

export default ScheduleNew;