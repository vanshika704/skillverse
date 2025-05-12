import { useState } from "react";
import { FiCalendar, FiUsers, FiStar } from "react-icons/fi";

type Workshop = {
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  maxParticipants: number;
  registered: number;
  status: string;
};

type Feedback = {
  rating: number;
};

type StatsBarProps = {
  workshops: Workshop[];
  feedback: Feedback[];
};

function StatsBar({ workshops, feedback }: StatsBarProps) {
  const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
    location: 'Online',
    maxParticipants: 10,
    registered: 0,
    status: 'draft'
  });

  return (
    <>
      {/* Stats Bar */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
              <FiCalendar className="text-cyan-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-cyan-800">Workshops Hosted</p>
              <p className="text-2xl font-bold text-cyan-900">{workshops.length}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
              <FiUsers className="text-cyan-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-cyan-800">Participants</p>
              <p className="text-2xl font-bold text-cyan-900">
                {workshops.reduce((sum, w) => sum + w.registered, 0)}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 flex items-center">
            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
              <FiStar className="text-cyan-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-cyan-800">Avg. Rating</p>
              <p className="text-2xl font-bold text-cyan-900">
                {feedback.length > 0
                  ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
                  : '0.0'} ★
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsBar;
