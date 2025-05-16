
import { useState } from "react";
import moment from "moment";
import { momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import AddEventModal from "./addeventmodal";
import ScheduleNew from "./schedulenew";

const localizer = momentLocalizer(moment);

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

const Calendar = dynamic(
  () => import("react-big-calendar").then((mod) => mod.Calendar),
  {
    ssr: false,
    loading: () => <div className="h-[700px]">Loading calendar...</div>,
  }
);

function WorkshopCalendar({ 
  workshops, 
  onAddWorkshop,
  onUpdateWorkshop 
}: { 
  workshops: Workshop[];
  onAddWorkshop: (workshop: Workshop) => void;
  onUpdateWorkshop: (workshop: Workshop) => void;
}) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


const handleUpdateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    onUpdateWorkshop(selectedWorkshop);
    setIsEditModalOpen(false);
  };
  const handleAddWorkshop = (newWorkshop: Workshop) => {
    // Call the onAddWorkshop passed from the parent to update the state
    onAddWorkshop(newWorkshop);
  };

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };

    const changeView = (view: any) => {
      toolbar.onView(view);
      setView(view);
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>
            <FiArrowLeft />
          </button>
          <button type="button" onClick={goToCurrent}>
            Today
          </button>
          <button type="button" onClick={goToNext}>
            <FiArrowRight />
          </button>
        </span>

        <span className="rbc-toolbar-label">{toolbar.label}</span>

        <span className="rbc-btn-group">
          <button
            type="button"
            className={toolbar.view === Views.MONTH ? "rbc-active" : ""}
            onClick={() => changeView(Views.MONTH)}
          >
            Month
          </button>
          <button
            type="button"
            className={toolbar.view === Views.WEEK ? "rbc-active" : ""}
            onClick={() => changeView(Views.WEEK)}
          >
            Week
          </button>
          <button
            type="button"
            className={toolbar.view === Views.DAY ? "rbc-active" : ""}
            onClick={() => changeView(Views.DAY)}
          >
            Day
          </button>
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white flex rounded-xl shadow-xl p-6 max-w-full overflow-hidden">
      <ScheduleNew onAddWorkshop={handleAddWorkshop} />
      <div className="ml-10">
        <h3 className="text-2xl font-semibold mb-6 text-cyan-900">
          Workshop Calendar
        </h3>

        <div className="h-[700px] overflow-auto">
          <Calendar
            localizer={localizer}
            events={workshops}
            style={{ height: "100%" }}
            defaultView={Views.MONTH}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            view={view}
            date={date}
            onNavigate={setDate}
            selectable={true}
            onSelectEvent={(event: object) => {
              const workshopEvent = event as Workshop;  // Explicitly cast to Workshop type
              setSelectedWorkshop(workshopEvent);
              setIsEditModalOpen(true);
            }}
            onSelectSlot={(slotInfo) => {
              setSelectedDate(slotInfo.start);
              setIsAddModalOpen(true);
            }}
            components={{
              toolbar: CustomToolbar,
            }}
            // eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedDate={selectedDate}
        onAddWorkshop={handleAddWorkshop}
      />

      {isEditModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 bg-neutral-900/90 bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Workshop</h3>
            <form onSubmit={handleUpdateWorkshop} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
              <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.title}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.description}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={moment(selectedWorkshop.start).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        start: new Date(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={moment(selectedWorkshop.end).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        end: new Date(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.location}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      location: e.target.value,
                    })
                  }
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={selectedWorkshop.maxParticipants}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        maxParticipants: Number(e.target.value),
                      })
                    }
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Registered
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={selectedWorkshop.registered}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        registered: Number(e.target.value),
                      })
                    }
                    min="0"
                    max={selectedWorkshop.maxParticipants}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.status}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      status: e.target.value as WorkshopStatus,
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      
      )}
    </div>
  );
}

export default WorkshopCalendar;



