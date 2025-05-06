// import CoverflowCarousel from "../components/cardCarousal";
// import { Sidebar } from "../components/SideBar";

// export default function DashboardPage() {
//   return (
//     <div className="flex w-screen  bg-gradient-to-b from-cyan-100 to-white">
//       <Sidebar/>
//       <div className="flex-col">
//         <div className="text-2xl ml-80 text-cyan-950 font-bold">Explore Latest Workshops</div>
//       <div className="h-64 mt-12 max-w-10/12 mr-40 rounded-4xl bg-gradient-to-br from-cyan-900 to-white"><CoverflowCarousel/></div></div>
      
//       {/* Rest of your dashboard */}
//     </div>
//   );
// }

import CoverflowCarousel from "../components/cardCarousal";
import { Sidebar } from "../components/SideBar";

export default function DashboardPage() {
  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-b from-cyan-100 to-white">
      <Sidebar />

      <div className="flex flex-col flex-1  p-4 ml-2 space-y-8">
        <h1 className="text-3xl text-cyan-950 font-bold">
          Explore Latest Workshops
        </h1>

        <div className="w-[1300px] h-[300px] rounded-3xl shadow-xl bg-gradient-to-br from-cyan-900 to-white">
          <CoverflowCarousel />
        </div>

       
      </div>
    </div>
  );
}
