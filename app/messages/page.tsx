// app/messages/page.tsx
'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FiSend, FiSearch, FiChevronLeft, FiMoreVertical, FiPaperclip, FiMic, FiX, FiUserPlus } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/SideBar';

// Types
interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
}

interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isRead: boolean;
}

const MessagingPage = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample Data
  const users: User[] = [
    { id: 1, name: 'Alex Johnson', avatar: '', status: 'online' },
    { id: 2, name: 'Maria Garcia', avatar: '', status: 'busy', lastSeen: '2h ago' },
    { id: 3, name: 'SkillVerse Team', avatar: '', status: 'online' },
    { id: 4, name: 'Sam Wilson', avatar: '', status: 'offline', lastSeen: '5h ago' },
  ];

  const conversations = users.map(user => ({
    ...user,
    lastMessage: `Sample last message from ${user.name}`,
    unread: Math.random() > 0.5,
  }));

  const messages: Record<number, Message[]> = {
    1: Array(5).fill(0).map((_, i) => ({
      id: `msg-1-${i}`,
      sender: users[0],
      content: i % 2 === 0 ? 'Hey, how about the design workshop?' : 'I think we should cover Figma prototyping!',
      timestamp: `${10 + i}:${i % 2 === 0 ? '30' : '45'} AM`,
      isRead: i < 3,
    })),
    2: Array(3).fill(0).map((_, i) => ({
      id: `msg-2-${i}`,
      sender: users[1],
      content: i % 2 === 0 ? 'Thanks for the feedback!' : 'When can we schedule the next session?',
      timestamp: `${9 + i}:${i % 2 === 0 ? '15' : '30'} AM`,
      isRead: true,
    })),
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, messages]);

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      // In a real app: Send to backend
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50"
    >
      <div className="flex">
        <Sidebar />

        {/* Main Messaging Container */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-white border-b border-cyan-100 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-cyan-900">Messages</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewChatModal(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg flex items-center gap-2"
              >
                <FiUserPlus /> New Chat
              </motion.button>
            </div>
          </motion.div>

          {/* Chat Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Conversations List */}
            <motion.div
              layout
              className={`${activeChat ? 'hidden md:block md:w-96' : 'w-full'} border-r border-cyan-100 bg-white`}
            >
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-3 border-b border-cyan-100"
              >
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-cyan-50"
                  />
                </div>
              </motion.div>

              {/* Conversations */}
              <LayoutGroup>
                <motion.div className="overflow-y-auto h-[calc(100vh-140px)]">
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.05)' }}
                      className={`p-4 border-b border-cyan-100 cursor-pointer ${activeChat === conversation.id ? 'bg-cyan-50' : ''}`}
                      onClick={() => setActiveChat(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          layout
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium 
                            ${conversation.status === 'online' ? 'bg-cyan-100 text-cyan-800' : 
                              conversation.status === 'busy' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {conversation.name.charAt(0)}
                          {conversation.status === 'online' && (
                            <motion.div
                              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            />
                          )}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <motion.h3 
                              className="font-medium text-cyan-900 truncate"
                              layout="position"
                            >
                              {conversation.name}
                            </motion.h3>
                            <motion.span 
                              className={`text-xs ${conversation.unread ? 'text-cyan-600 font-bold' : 'text-gray-500'}`}
                              layout="position"
                            >
                              {conversation.lastSeen || 'Now'}
                            </motion.span>
                          </div>
                          <motion.p 
                            className={`text-sm truncate ${conversation.unread ? 'font-medium text-cyan-900' : 'text-gray-600'}`}
                            layout="position"
                          >
                            {conversation.lastMessage}
                          </motion.p>
                        </div>

                        {conversation.unread && (
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-cyan-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </LayoutGroup>
            </motion.div>

            {/* Chat Area */}
            <AnimatePresence>
              {activeChat ? (
                <motion.div
                  key={`chat-${activeChat}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex-1 flex flex-col bg-cyan-50"
                >
                  {/* Chat Header */}
                  <motion.div
                    className="bg-white p-3 border-b border-cyan-100 flex items-center justify-between shadow-sm"
                    layout
                  >
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-1 text-cyan-600"
                        onClick={() => setActiveChat(null)}
                      >
                        <FiChevronLeft size={20} />
                      </motion.button>
                      <motion.div
                        className="relative w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-medium"
                        layout
                      >
                        {conversations.find(c => c.id === activeChat)?.name.charAt(0)}
                        {conversations.find(c => c.id === activeChat)?.status === 'online' && (
                          <motion.div
                            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          />
                        )}
                      </motion.div>
                      <motion.div layout>
                        <h3 className="font-medium text-cyan-900">
                          {conversations.find(c => c.id === activeChat)?.name}
                        </h3>
                        <motion.p
                          className="text-xs text-cyan-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {conversations.find(c => c.id === activeChat)?.status === 'online' 
                            ? 'Online' 
                            : `Last seen ${conversations.find(c => c.id === activeChat)?.lastSeen || 'recently'}`}
                        </motion.p>
                      </motion.div>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      className="text-cyan-600 p-1"
                    >
                      <FiMoreVertical size={20} />
                    </motion.button>
                  </motion.div>

                  {/* Messages */}
                  <motion.div
                    className="flex-1 overflow-y-auto p-4 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <AnimatePresence>
                      {messages[activeChat]?.map((msg) => (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                          className={`flex ${msg.sender.id === 1 ? 'justify-end' : 'justify-start'}`}
                        >
                          <motion.div
                            className={`max-w-xs md:max-w-md rounded-2xl p-3 relative overflow-hidden ${msg.sender.id === 1 ? 'bg-cyan-600 text-white' : 'bg-white border border-cyan-200'}`}
                            whileHover={{ scale: 1.02 }}
                          >
                            {msg.sender.id !== 1 && (
                              <motion.div
                                className="absolute -left-1 top-0 w-3 h-3 bg-white border-l border-t border-cyan-200 transform rotate-45 -translate-x-1/2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              />
                            )}
                            {msg.sender.id === 1 && (
                              <motion.div
                                className="absolute -right-1 top-0 w-3 h-3 bg-cyan-600 transform rotate-45 translate-x-1/2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              />
                            )}
                            <p>{msg.content}</p>
                            <motion.div
                              className={`flex items-center justify-end gap-1 mt-1 ${msg.sender.id === 1 ? 'text-cyan-200' : 'text-cyan-500'}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <span className="text-xs">{msg.timestamp}</span>
                              {msg.sender.id === 1 && (
                                <span className="text-xs">
                                  {msg.isRead ? '✓✓' : '✓'}
                                </span>
                              )}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </motion.div>

                  {/* Message Input */}
                  <motion.div
                    className="bg-white p-3 border-t border-cyan-100 shadow-sm"
                    layout
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-cyan-600 p-2"
                      >
                        <FiPaperclip size={20} />
                      </motion.button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 py-2 px-4 rounded-full border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      {message ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleSendMessage}
                          className="bg-cyan-600 text-white p-2 rounded-full"
                        >
                          <FiSend size={20} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-cyan-600 p-2"
                        >
                          <FiMic size={20} />
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden md:flex flex-1 items-center justify-center bg-cyan-50"
                >
                  <motion.div
                    className="text-center p-6 max-w-md"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="mx-auto w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                    >
                      <FiSend size={28} />
                    </motion.div>
                    <h3 className="text-xl font-medium text-cyan-900 mb-2">Start a conversation</h3>
                    <p className="text-cyan-700 mb-6">
                      Select a chat or create a new one to connect with the SkillVerse community
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNewChatModal(true)}
                      className="px-6 py-2 bg-cyan-600 text-white rounded-lg"
                    >
                      New Message
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      <AnimatePresence>
        {showNewChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowNewChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-cyan-900">New Message</h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setShowNewChatModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.05)' }}
                    className="p-3 rounded-lg cursor-pointer flex items-center gap-3"
                    onClick={() => {
                      setActiveChat(user.id);
                      setShowNewChatModal(false);
                    }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${user.status === 'online' ? 'bg-cyan-100 text-cyan-800' : 
                        user.status === 'busy' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-cyan-900">{user.name}</h4>
                      <p className="text-xs text-cyan-600">
                        {user.status === 'online' ? 'Online' : user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MessagingPage;