import JitsiMeet from "../Jitsi";

const LivePage = ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Live Workshop Room</h1>
      <JitsiMeet roomName={params.roomId} />
    </div>
  );
};

export default LivePage;
