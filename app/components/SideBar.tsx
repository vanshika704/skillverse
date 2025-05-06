// "use client"
// import React, { useState, FC } from "react";
// import {
//   FiChevronsRight,
//   FiChevronDown,
//   FiUsers,
//   FiBookOpen,
//   FiUserPlus,
//   FiMessageCircle,
//   FiBriefcase,
//   FiSettings,
//   FiHome,
// } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// // Sidebar data
// const sidebarOptions = [
//   { icon: FiHome, title: "Dashboard" },
//   { icon: FiUserPlus, title: "Offer Skill" },
//   { icon: FiBriefcase, title: "Find Skill" },
//   { icon: FiMessageCircle, title: "Messages", notifications: 4 },
//   { icon: FiUsers, title: "Community" },
//   { icon: FiSettings, title: "Settings" },
// ];

// // Main layout component
// export const SidebarLayout: FC = () => {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
//       <Sidebar />
//       <MainContent />
//     </div>
//   );
// };

// // Sidebar component
// export const Sidebar: FC = () => {
//   const [open, setOpen] = useState<boolean>(false); // Initially collapsed
//   const [selected, setSelected] = useState<string>("Dashboard");
//   const [hovered, setHovered] = useState<boolean>(false);

//   return (
//     <motion.nav
//       layout
//       className="sticky top-0 h-screen shrink-0 border-r border-cyan-200 bg-white shadow-lg"
//       style={{ width: open ? "240px" : hovered ? "240px" : "72px" }}
//       onMouseEnter={() => !open && setHovered(true)}
//       onMouseLeave={() => !open && setHovered(false)}
//       transition={{ type: "spring", stiffness: 400, damping: 30 }}
//     >
//       <div className="flex h-full flex-col p-2">
//         <BrandHeader open={open || hovered} />
        
//         <div className="flex-1 space-y-1 overflow-y-auto">
//           {sidebarOptions.map((option) => (
//             <SidebarOption
//               key={option.title}
//               Icon={option.icon}
//               title={option.title}
//               open={open || hovered}
//               selected={selected}
//               setSelected={setSelected}
//               notifs={option.notifications}
//             />
//           ))}
//         </div>

//         <ToggleSidebar open={open} setOpen={setOpen} hovered={hovered} />
//       </div>
//     </motion.nav>
//   );
// };

// // SidebarOption component
// const SidebarOption: FC<SidebarOptionProps> = ({ Icon, title, selected, setSelected, open, notifs }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setSelected(title)}
//       className={`relative flex h-12 w-full items-center rounded-lg transition-all ${
//         selected === title 
//           ? "bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-800 shadow-sm" 
//           : "text-gray-600 hover:bg-cyan-50"
//       }`}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <motion.div 
//         className="grid h-full w-12 place-content-center text-xl"
//         animate={{ 
//           marginRight: open ? "0.5rem" : "0rem",
//           scale: selected === title ? 1.1 : 1
//         }}
//       >
//         <Icon />
//       </motion.div>
      
//       <AnimatePresence>
//         {open && (
//           <motion.span
//             key={`text-${title}`}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -10 }}
//             transition={{ duration: 0.2 }}
//             className="text-sm font-medium"
//           >
//             {title}
//           </motion.span>
//         )}
//       </AnimatePresence>

//       {notifs && (
//         <AnimatePresence>
//           {(open || selected === title) && (
//             <motion.span
//               key={`notif-${title}`}
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 500 }}
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm"
//             >
//               {notifs}
//             </motion.span>
//           )}
//         </AnimatePresence>
//       )}
//     </motion.button>
//   );
// };

// // BrandHeader component
// const BrandHeader: FC<BrandHeaderProps> = ({ open }) => {
//   return (
//     <div className="mb-4 border-b border-cyan-200 pb-4">
//       <motion.div 
//         className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-cyan-50"
//         whileHover={{ scale: 1.01 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <div className="flex items-center gap-2">
//           <motion.div 
//             layout 
//             className="grid size-10 place-content-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-bold shadow-md"
//             animate={{ 
//               scale: open ? 1 : 1.1,
//               rotate: open ? 0 : 360
//             }}
//             transition={{ type: "spring" }}
//           >
//         <Image 
//   src="/assets/skillverselogo.png" 
//   alt="SkillVerse Logo" 
//   width={40} 
//   height={40}
//   className="rounded-lg"
// />

//           </motion.div>
          
//           <AnimatePresence>
//             {open && (
//               <motion.div 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <p className="text-sm font-semibold">SkillVerse</p>
//                 <p className="text-xs text-gray-500">Grow & Share</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
        
//         {open && (
//           <motion.div
//             initial={{ rotate: 180 }}
//             animate={{ rotate: 0 }}
//             transition={{ type: "spring" }}
//           >
//             <FiChevronDown className="text-gray-500" />
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ToggleSidebar component
// const ToggleSidebar: FC<ToggleSidebarProps & { hovered: boolean }> = ({ open, setOpen, hovered }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setOpen((prev) => !prev)}
//       className="mt-auto flex items-center justify-center rounded-lg p-2 hover:bg-cyan-50"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <motion.div 
//         className="text-cyan-600"
//         animate={{ 
//           rotate: open ? 180 : 0,
//           scale: hovered && !open ? 1.2 : 1
//         }}
//         transition={{ type: "spring" }}
//       >
//         <FiChevronsRight size={20} />
//       </motion.div>
      
//       <AnimatePresence>
//         {open && (
//           <motion.span 
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -10 }}
//             className="ml-2 text-xs font-medium text-cyan-700"
//           >
//             Collapse
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// // MainContent component
// const MainContent: FC = () => {
//   const variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="flex-1 p-6">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={variants}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         <motion.h1 
//           className="text-4xl font-bold text-cyan-800 mb-6"
//           whileHover={{ scale: 1.01 }}
//         >
//           Welcome to SkillVerse
//         </motion.h1>
        
//         <motion.p 
//           className="text-lg text-gray-600 mb-8"
//           whileHover={{ scale: 1.005 }}
//         >
//           Connect, share, and grow by exchanging your skills with the community.
//         </motion.p>
        
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-3 gap-6"
//           initial="hidden"
//           animate="visible"
//           transition={{ staggerChildren: 0.1 }}
//         >
//           {[
//             { title: "Find Skills", desc: "Discover talents you need", color: "from-cyan-100 to-cyan-50" },
//             { title: "Offer Skills", desc: "Share what you know", color: "from-purple-100 to-purple-50" },
//             { title: "Connect", desc: "Build your network", color: "from-emerald-100 to-emerald-50" },
//           ].map((card, index) => (
//             <motion.div
//               key={index}
//               variants={variants}
//               className={`bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}
//               whileHover={{ y: -5 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
//               <p className="text-gray-600">{card.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// // Types
// interface SidebarOptionProps {
//   Icon: React.ElementType;
//   title: string;
//   selected: string;
//   setSelected: React.Dispatch<React.SetStateAction<string>>;
//   open: boolean;
//   notifs?: number;
// }

// interface BrandHeaderProps {
//   open: boolean;
// }

// interface ToggleSidebarProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   hovered: boolean;
// }


"use client";
import React, { useState, FC, ReactNode } from "react";
import {
  FiChevronsRight,
  FiChevronDown,
  FiUsers,
  FiUserPlus,
  FiMessageCircle,
  FiBriefcase,
  FiSettings,
  FiHome,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Sidebar options with routes
const sidebarOptions = [
  { icon: FiHome, title: "Dashboard", path: "/dashboard" },
  { icon: FiUserPlus, title: "Offer Skill", path: "/offerSkill" },
  { icon: FiBriefcase, title: "Find Skill", path: "/findSkill" },
  { icon: FiMessageCircle, title: "Messages", path: "/messages", notifications: 4 },
  { icon: FiUsers, title: "Community", path: "/community" },
  { icon: FiSettings, title: "Settings", path: "/settings" },
];

// ✅ Layout wrapper that accepts children
export const SidebarLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

// Sidebar component
export const Sidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [hovered, setHovered] = useState(false);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-cyan-200 bg-white shadow-lg"
      style={{ width: open ? "240px" : hovered ? "240px" : "72px" }}
      onMouseEnter={() => !open && setHovered(true)}
      onMouseLeave={() => !open && setHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex h-full flex-col p-2">
        <BrandHeader open={open || hovered} />
        <div className="flex-1 space-y-1 overflow-y-auto">
          {sidebarOptions.map((option) => (
            <SidebarOption
              key={option.title}
              Icon={option.icon}
              title={option.title}
              open={open || hovered}
              selected={selected}
              setSelected={setSelected}
              notifs={option.notifications}
              path={option.path}
            />
          ))}
        </div>
        <ToggleSidebar open={open} setOpen={setOpen} hovered={hovered} />
      </div>
    </motion.nav>
  );
};

const SidebarOption: FC<SidebarOptionProps> = ({
  Icon, title, selected, setSelected, open, notifs, path,
}) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    router.push(path);
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-12 w-full items-center rounded-lg transition-all ${
        selected === title
          ? "bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-800 shadow-sm"
          : "text-gray-600 hover:bg-cyan-50"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="grid h-full w-12 place-content-center text-xl"
        animate={{
          marginRight: open ? "0.5rem" : "0rem",
          scale: selected === title ? 1.1 : 1,
        }}
      >
        <Icon />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.span
            key={`text-${title}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>

      {notifs && (
        <AnimatePresence>
          {(open || selected === title) && (
            <motion.span
              key={`notif-${title}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm"
            >
              {notifs}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.button>
  );
};

const BrandHeader: FC<BrandHeaderProps> = ({ open }) => (
  <div className="mb-4 border-b border-cyan-200 pb-4">
    <motion.div
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-cyan-50"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          layout
          className="grid size-10 place-content-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-bold shadow-md"
          animate={{
            scale: open ? 1 : 1.1,
            rotate: open ? 0 : 360,
          }}
          transition={{ type: "spring" }}
        >
          <Image
            src="/assets/skillverselogo.png"
            alt="SkillVerse Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-semibold">SkillVerse</p>
              <p className="text-xs text-gray-500">Grow & Share</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {open && (
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring" }}
        >
          <FiChevronDown className="text-gray-500" />
        </motion.div>
      )}
    </motion.div>
  </div>
);

const ToggleSidebar: FC<ToggleSidebarProps & { hovered: boolean }> = ({
  open, setOpen, hovered,
}) => (
  <motion.button
    layout
    onClick={() => setOpen((prev) => !prev)}
    className="mt-auto flex items-center justify-center rounded-lg p-2 hover:bg-cyan-50"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="text-cyan-600"
      animate={{
        rotate: open ? 180 : 0,
        scale: hovered && !open ? 1.2 : 1,
      }}
      transition={{ type: "spring" }}
    >
      <FiChevronsRight size={20} />
    </motion.div>

    <AnimatePresence>
      {open && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="ml-2 text-xs font-medium text-cyan-700"
        >
          Collapse
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

// Types
interface SidebarOptionProps {
  Icon: React.ElementType;
  title: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  notifs?: number;
  path: string;
}

interface BrandHeaderProps {
  open: boolean;
}

interface ToggleSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
