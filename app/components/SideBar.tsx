"use client"
import React, { useState, FC } from "react";
import {
  FiChevronsRight,
  FiChevronDown,
  FiUsers,
  FiBookOpen,
  FiUserPlus,
  FiMessageCircle,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Main layout component

// Sidebar component
 export const Sidebar: FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-cyan-200 bg-white p-2 shadow-md"
      style={{ width: open ? "240px" : "fit-content" }}
    >
      <BrandHeader open={open} />

      <div className="space-y-1">
        <SidebarOption Icon={FiBookOpen} title="Dashboard" open={open} selected={selected} setSelected={setSelected} />
        <SidebarOption Icon={FiUserPlus} title="Offer Skill" open={open} selected={selected} setSelected={setSelected} />
        <SidebarOption Icon={FiBriefcase} title="Find Skill" open={open} selected={selected} setSelected={setSelected} />
        <SidebarOption Icon={FiMessageCircle} title="Messages" open={open} selected={selected} setSelected={setSelected} notifs={4} />
        <SidebarOption Icon={FiUsers} title="Community" open={open} selected={selected} setSelected={setSelected} />
        <SidebarOption Icon={FiSettings} title="Settings" open={open} selected={selected} setSelected={setSelected} />
      </div>

      <ToggleSidebar open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

// Sidebar option props
interface SidebarOptionProps {
  Icon: React.ElementType;
  title: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}

// SidebarOption component
const SidebarOption: FC<SidebarOptionProps> = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title ? "bg-cyan-100 text-cyan-800" : "text-gray-600 hover:bg-cyan-50"
      }`}
    >
      <motion.div className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute right-2 top-1/2 translate-y-[-50%] rounded-full bg-cyan-500 px-1.5 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

// BrandHeader props
interface BrandHeaderProps {
  open: boolean;
}

// BrandHeader component
const BrandHeader: FC<BrandHeaderProps> = ({ open }) => {
  return (
    <div className="mb-3 border-b border-cyan-200 pb-3">
      <div className="flex cursor-pointer items-center justify-between hover:bg-cyan-50 rounded-md p-2">
        <div className="flex items-center gap-2">
          <motion.div layout className="grid size-10 place-content-center rounded-md bg-cyan-500 text-white font-bold">
            SV
          </motion.div>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm font-semibold">SkillVerse</p>
              <p className="text-xs text-gray-500">Grow & Share</p>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="text-gray-500" />}
      </div>
    </div>
  );
};

// ToggleSidebar props
interface ToggleSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ToggleSidebar component
const ToggleSidebar: FC<ToggleSidebarProps> = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-cyan-200 p-2 hover:bg-cyan-50"
    >
      <div className="flex items-center">
        <div className="grid size-10 place-content-center text-lg text-cyan-600">
          <FiChevronsRight className={`${open ? "rotate-180" : ""} transition-transform`} />
        </div>
        {open && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium text-cyan-700">
            Collapse
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

// MainContent component
const MainContent: FC = () => (
  <div className="w-full min-h-screen p-6 bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
    <h1 className="text-3xl font-bold text-cyan-800 mb-4">Welcome to SkillVerse</h1>
    <p className="text-gray-600">Connect, share, and grow by exchanging your skills with the community.</p>
  </div>
);
