import { useState } from "react";
import moment from "moment";
import { momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import AddEventModal from "./addeventmodal";
import ScheduleNew from "./schedulenew";
import { useLive } from "../hooks/useLive";

const localizer = momentLocalizer(moment);

type WorkshopStatus = "draft" | "upcoming";

interface Workshop {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  mode: string;
  maxParticipants: number;
  registered: number;
  status: WorkshopStatus;
}

interface WorkshopCalendarProps {
  workshops: Workshop[];
  onAddWorkshop: (workshop: Workshop) => void;
  onUpdateWorkshop: (updatedWorkshop: Workshop) => void;
}

const Calendar = dynamic(
  () => import("react-big-calendar").then((mod) => mod.Calendar),
  {
    ssr: false,
    loading: () => <div className="h-[700px]">Loading calendar...</div>,
  }
);

const WorkshopCalendar: React.FC<WorkshopCalendarProps> = ({ workshops, onAddWorkshop, onUpdateWorkshop }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const { updateLive, deleteLive } = useLive();

  const handleDeleteWorkshop = async () => {
    if (!selectedWorkshop) return;
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        await deleteLive(selectedWorkshop.id);
        onUpdateWorkshop({ ...selectedWorkshop, status: "draft" });
        setIsEditModalOpen(false);
      } catch (err) {
        console.error("Error deleting workshop:", err);
      }
    }
  };

  const handleUpdateWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    try {
      await updateLive(selectedWorkshop.id, {
        title: selectedWorkshop.title,
        description: selectedWorkshop.description,
        startTime: selectedWorkshop.start,
        endTime: selectedWorkshop.end,
        mode: selectedWorkshop.mode,
        maxParticipants: selectedWorkshop.maxParticipants,
        status: selectedWorkshop.status,
      });
      onUpdateWorkshop(selectedWorkshop);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating workshop:", err);
    }
  };

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => toolbar.onNavigate("PREV");
    const goToNext = () => toolbar.onNavigate("NEXT");
    const goToCurrent = () => toolbar.onNavigate("TODAY");

    const changeView = (view: any) => {
      toolbar.onView(view);
      setView(view);
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button onClick={goToBack}><FiArrowLeft /></button>
          <button onClick={goToCurrent}>Today</button>
          <button onClick={goToNext}><FiArrowRight /></button>
        </span>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <span className="rbc-btn-group">
          <button onClick={() => changeView(Views.MONTH)} className={toolbar.view === Views.MONTH ? "rbc-active" : ""}>Month</button>
          <button onClick={() => changeView(Views.WEEK)} className={toolbar.view === Views.WEEK ? "rbc-active" : ""}>Week</button>
          <button onClick={() => changeView(Views.DAY)} className={toolbar.view === Views.DAY ? "rbc-active" : ""}>Day</button>
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white flex rounded-xl shadow-xl p-6 max-w-screen overflow-hidden">
      <ScheduleNew onAddWorkshop={onAddWorkshop} />
      <div className="ml-10 w-full">
        <h3 className="text-2xl font-semibold mb-6 text-cyan-900">Workshop Calendar</h3>
        <div className="h-[600px] overflow-auto">
          <Calendar
            localizer={localizer}
            events={workshops.map((ws) => ({
              ...ws,
              start: new Date(ws.start),
              end: new Date(ws.end),
              id: ws.id,
            }))}
            view={view}
            date={date}
            onNavigate={setDate}
            defaultView={Views.MONTH}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            selectable
            onSelectEvent={(event) => {
              const workshop = event as Workshop;
              setSelectedWorkshop({
                ...workshop,
                id: (workshop as any)._id || workshop.id,
                start: new Date((workshop as any).startTime || workshop.start),
                end: new Date((workshop as any).endTime || workshop.end),
              });
              setIsEditModalOpen(true);
            }}
            onSelectSlot={(slotInfo) => {
              setSelectedDate(slotInfo.start);
              setIsAddModalOpen(true);
            }}
            components={{ toolbar: CustomToolbar }}
          />
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedDate={selectedDate}
        onAddWorkshop={onAddWorkshop}
      />

      {isEditModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 bg-neutral-900/90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Workshop</h3>
            <form onSubmit={handleUpdateWorkshop} className="space-y-4">
              <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Title"
                value={selectedWorkshop.title}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, title: e.target.value })}
                required
              />
              <textarea className="w-full px-4 py-2 border rounded-lg" rows={3} placeholder="Description"
                value={selectedWorkshop.description}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, description: e.target.value })}
              />
              <input type="datetime-local" className="w-full px-4 py-2 border rounded-lg"
                value={moment(selectedWorkshop.start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, start: new Date(e.target.value) })}
                required
              />
              <input type="datetime-local" className="w-full px-4 py-2 border rounded-lg"
                value={moment(selectedWorkshop.end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, end: new Date(e.target.value) })}
                required
              />
              <select className="w-full px-4 py-2 border rounded-lg"
                value={selectedWorkshop.mode}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, mode: e.target.value })}
              >
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <input type="number" className="w-full px-4 py-2 border rounded-lg" placeholder="Max Participants"
                value={selectedWorkshop.maxParticipants}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, maxParticipants: Number(e.target.value) })}
                min={1}
              />
              <select className="w-full px-4 py-2 border rounded-lg"
                value={selectedWorkshop.status}
                onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, status: e.target.value as WorkshopStatus })}
              >
                <option value="draft">Draft</option>
                <option value="upcoming">Upcoming</option>
              </select>

              <div className="flex justify-between pt-4">
                <button type="button" className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700" onClick={handleDeleteWorkshop}>
                  Delete
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopCalendar;
