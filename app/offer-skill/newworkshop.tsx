import { useState } from "react";
import moment from "moment";
import { momentLocalizer, Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { v4 as uuidv4 } from "uuid";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const localizer = momentLocalizer(moment);

type Workshop = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  maxParticipants: number;
  registered: number;
  status: "draft" | "upcoming";
};

function WorkshopCalendar() {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: "1",
      title: "Intro to React",
      description: "Learn React basics",
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 12, 0),
      location: "Online",
      maxParticipants: 20,
      registered: 15,
      status: "upcoming"
    },
    {
      id: "2",
      title: "Advanced TypeScript",
      description: "Deep dive into TS",
      start: new Date(2023, 10, 20, 14, 0),
      end: new Date(2023, 10, 20, 16, 0),
      location: "In-Person",
      maxParticipants: 15,
      registered: 10,
      status: "upcoming"
    }
  ]);

  const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    location: "Online",
    maxParticipants: 10,
    registered: 0,
    status: "draft",
  });

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    location: 'Online',
    maxParticipants: 10,
    status: 'draft' as const
  });

  const eventStyleGetter = (event: Workshop) => {
    let backgroundColor = event.status === 'draft' ? '#64748b' : '#06b6d4';
    
    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        color: "white",
        border: "none",
        padding: "2px 5px",
        fontSize: "0.875rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
    };
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    const start = new Date(selectedDate);
    const [startHours, startMinutes] = newEvent.startTime.split(':').map(Number);
    start.setHours(startHours, startMinutes);
    
    const end = new Date(selectedDate);
    const [endHours, endMinutes] = newEvent.endTime.split(':').map(Number);
    end.setHours(endHours, endMinutes);
    
    const workshop: Workshop = {
      id: uuidv4(),
      title: newEvent.title,
      description: newEvent.description,
      start,
      end,
      location: newEvent.location,
      maxParticipants: newEvent.maxParticipants,
      registered: 0,
      status: newEvent.status
    };
    
    setWorkshops([...workshops, workshop]);
    setIsAddModalOpen(false);
    setNewEvent({ 
      title: '', 
      startTime: '09:00', 
      endTime: '10:00',
      description: '',
      location: 'Online',
      maxParticipants: 10,
      status: 'draft'
    });
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workshop: Workshop = {
      ...(newWorkshop as Omit<Workshop, "id">),
      id: uuidv4(),
    };
    setWorkshops([...workshops, workshop]);
    setNewWorkshop({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      location: "Online",
      maxParticipants: 10,
      registered: 0,
      status: "draft",
    });
  };

  const handleUpdateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;

    const updatedWorkshops = workshops.map((w) =>
      w.id === selectedWorkshop.id ? selectedWorkshop : w
    );
    setWorkshops(updatedWorkshops);
    setIsEditModalOpen(false);
  };

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
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

        <span className="rbc-toolbar-label">
          {toolbar.label}
        </span>

        <span className="rbc-btn-group">
          <button 
            type="button" 
            className={toolbar.view === Views.MONTH ? 'rbc-active' : ''}
            onClick={() => changeView(Views.MONTH)}
          >
            Month
          </button>
          <button 
            type="button" 
            className={toolbar.view === Views.WEEK ? 'rbc-active' : ''}
            onClick={() => changeView(Views.WEEK)}
          >
            Week
          </button>
          <button 
            type="button" 
            className={toolbar.view === Views.DAY ? 'rbc-active' : ''}
            onClick={() => changeView(Views.DAY)}
          >
            Day
          </button>
        </span>
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
      {/* Schedule Form */}
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
                  status: e.target.value as "draft" | "upcoming",
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

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-full overflow-hidden">
        <h3 className="text-2xl font-semibold mb-6 text-cyan-900">Workshop Calendar</h3>
        
        <div className="h-[700px] overflow-auto">
          <Calendar
            localizer={localizer}
            events={workshops}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            defaultView={Views.MONTH}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            view={view}
            date={date}
          
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            selectable={true}
            onSelectEvent={(event) => {
              setSelectedWorkshop(event);
              setIsEditModalOpen(true);
            }}
            onSelectSlot={(slotInfo) => {
              setSelectedDate(slotInfo.start);
              setIsAddModalOpen(true);
            }}
            components={{
              toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && selectedDate && (
        <div className="fixed inset-0 bg-neutral-900/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              Add Workshop on {moment(selectedDate).format('MMMM D, YYYY')}
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
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
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent({...newEvent, maxParticipants: Number(e.target.value)})}
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newEvent.status}
                  onChange={(e) => setNewEvent({...newEvent, status: e.target.value as "draft" | "upcoming"})}
                >
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Add Workshop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Workshop Modal */}
      {isEditModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Workshop</h3>
            <form onSubmit={handleUpdateWorkshop} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.title}
                  onChange={(e) => setSelectedWorkshop({
                    ...selectedWorkshop,
                    title: e.target.value
                  })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.description}
                  onChange={(e) => setSelectedWorkshop({
                    ...selectedWorkshop,
                    description: e.target.value
                  })}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={moment(selectedWorkshop.start).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setSelectedWorkshop({
                      ...selectedWorkshop,
                      start: new Date(e.target.value)
                    })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={moment(selectedWorkshop.end).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setSelectedWorkshop({
                      ...selectedWorkshop,
                      end: new Date(e.target.value)
                    })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedWorkshop.location}
                  onChange={(e) => setSelectedWorkshop({
                    ...selectedWorkshop,
                    location: e.target.value
                  })}
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Max Participants</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={selectedWorkshop.maxParticipants}
                    onChange={(e) => setSelectedWorkshop({
                      ...selectedWorkshop,
                      maxParticipants: Number(e.target.value)
                    })}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Registered</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={selectedWorkshop.registered}
                    onChange={(e) => setSelectedWorkshop({
                      ...selectedWorkshop,
                      registered: Number(e.target.value)
                    })}
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
                  onChange={(e) => setSelectedWorkshop({
                    ...selectedWorkshop,
                    status: e.target.value as "draft" | "upcoming"
                  })}
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