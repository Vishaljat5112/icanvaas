import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Users,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  CheckCircle2,
  ArrowLeft,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Plus,
  X,
  AlertTriangle,
  UploadCloud,
  FileText
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

export const DirectMessaging = () => {
  const { addToast } = useToast();
  const { crmUser } = useAuth();

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'broadcast' | 'media'
  const [activeChat, setActiveChat] = useState(1);
  const [chatSearch, setChatSearch] = useState('');
  const [message, setMessage] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  // Broadcast modal form state
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    channel: 'all', // 'all' | 'sms' | 'email' | 'in_app'
    recipientGroup: 'All Team Members',
    body: '',
    urgency: 'normal'
  });

  const contacts = [
    { id: 1, name: 'Team Alpha (All Circulators)', type: 'Field Unit Broadcast', unread: 2, time: '10:42 AM', online: true, isGroup: true },
    { id: 2, name: 'Sarah Jenkins', type: 'Sub Coordinator', unread: 0, time: '09:15 AM', online: true, isGroup: false },
    { id: 3, name: 'Michael Chen', type: 'Logistics Manager', unread: 1, time: 'Yesterday', online: false, isGroup: false },
    { id: 4, name: 'Emma Wilson', type: 'Circulator (Gatherer)', unread: 0, time: 'Yesterday', online: true, isGroup: false },
    { id: 5, name: 'David Ross', type: 'Circulator (Gatherer)', unread: 0, time: 'Oct 03', online: false, isGroup: false }
  ];

  const [chatHistoryMap, setChatHistoryMap] = useState({
    1: [
      { id: 'm1', sender: 'Sarah Jenkins', text: 'Hey team, remember to pick up renewed notary forms at the trailer by 11:00 AM.', time: '08:45 AM', isMe: false },
      { id: 'm2', sender: 'Me', text: 'Updated territory maps have been uploaded to the shared gallery.', time: '09:15 AM', isMe: true },
      { id: 'm3', sender: 'Michael Chen', text: 'All vans in District 4 are stocked with water and clipboards.', time: '10:42 AM', isMe: false }
    ],
    2: [
      { id: 'm4', sender: 'Sarah Jenkins', text: 'Hey, I just sent the updated territory maps to the team.', time: '09:10 AM', isMe: false },
      { id: 'm5', sender: 'Me', text: 'Great, thanks! Make sure they focus on District 4 today.', time: '09:15 AM', isMe: true }
    ],
    3: [
      { id: 'm6', sender: 'Michael Chen', text: 'Need approval on additional parking validation passes for Westside.', time: 'Yesterday', isMe: false }
    ],
    4: [
      { id: 'm7', sender: 'Emma Wilson', text: 'Hit 85 signatures this morning at the plaza. On track for the bonus!', time: 'Yesterday', isMe: false }
    ],
    5: [
      { id: 'm8', sender: 'David Ross', text: 'Checking in at 5th and Main. Foot traffic is steady.', time: 'Oct 03', isMe: false }
    ]
  });

  const activeContact = contacts.find((c) => c.id === activeChat) || contacts[0];
  const activeMessages = chatHistoryMap[activeChat] || [];

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'Me',
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setChatHistoryMap((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));

    setMessage('');
    addToast({
      title: 'Message Staged',
      message: 'Message added to active conversation view.',
      type: 'info'
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastForm.title.trim() || !broadcastForm.body.trim()) {
      addToast({ title: 'Validation Error', message: 'Broadcast title and body are required.', type: 'error' });
      return;
    }

    addToast({
      title: 'Broadcast Staged (UI Phase)',
      message: `Broadcast "${broadcastForm.title}" prepared for ${broadcastForm.recipientGroup} via ${broadcastForm.channel.toUpperCase()}.`,
      type: 'info'
    });

    setIsBroadcastModalOpen(false);
    setBroadcastForm({
      title: '',
      channel: 'all',
      recipientGroup: 'All Team Members',
      body: '',
      urgency: 'normal'
    });
  };

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-4 sm:p-6 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                <MessageSquare className="w-6 h-6" />
              </div>
              Management Direct Messaging & Broadcast
            </h1>
            <p className="mt-1 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
              Coordinate field operations, send targeted team alerts, and supervise circulator conversations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer border-none"
              style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
            >
              <Users className="w-4 h-4" />
              New Mass Broadcast
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Contact Sidebar */}
        <div
          className={`flex flex-col absolute inset-0 sm:relative sm:inset-auto z-10 sm:z-0 transition-transform w-full sm:w-[320px] shrink-0 ${
            isMobileChatOpen ? '-translate-x-full sm:translate-x-0' : 'translate-x-0'
          }`}
          style={{ borderRight: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}
        >
          <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="relative">
              <Search className="w-4 h-4 absolute text-tertiary" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                className="w-full rounded-lg text-xs focus:outline-none transition-all py-2 pl-9 pr-3"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts
              .filter((c) => c.name.toLowerCase().includes(chatSearch.toLowerCase()) || c.type.toLowerCase().includes(chatSearch.toLowerCase()))
              .map((contact) => {
                const isActive = activeChat === contact.id;
                return (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setActiveChat(contact.id);
                      setIsMobileChatOpen(true);
                    }}
                    className="p-3.5 cursor-pointer transition-colors flex items-center gap-3 border-b"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: isActive ? 'var(--info-light)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--info)' : '3px solid transparent'
                    }}
                  >
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                      >
                        {contact.name.charAt(0)}
                      </div>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 bg-emerald-500" style={{ borderColor: 'var(--surface)' }} />
                      )}
                      {contact.unread > 0 && (
                        <span
                          className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full font-bold"
                          style={{ backgroundColor: 'var(--error)', color: 'var(--text-on-primary)' }}
                        >
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-semibold truncate text-xs m-0" style={{ color: 'var(--text-primary)' }}>
                          {contact.name}
                        </h4>
                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                          {contact.time}
                        </span>
                      </div>
                      <p className="text-[11px] truncate m-0" style={{ color: 'var(--text-secondary)' }}>
                        {contact.type}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Chat Workspace */}
        <div
          className={`flex flex-col flex-1 h-full w-full absolute inset-0 sm:relative sm:inset-auto z-20 sm:z-0 transition-transform ${
            isMobileChatOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'
          }`}
          style={{ backgroundColor: 'var(--background)' }}
        >
          {/* Top Bar */}
          <div
            className="h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 border-b"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <button
                className="sm:hidden p-2 -ml-2 rounded-lg cursor-pointer border-none bg-transparent"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setIsMobileChatOpen(false)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                {activeContact.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm m-0" style={{ color: 'var(--text-primary)' }}>
                  {activeContact.name}
                </h3>
                <p className="text-[11px] flex items-center gap-1 mt-0.5 m-0" style={{ color: 'var(--success)' }}>
                  <CheckCircle2 className="w-3 h-3" /> {activeContact.online ? 'Active in Session' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="text-xs text-secondary px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              {activeContact.type}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="text-center text-[11px] font-medium my-2" style={{ color: 'var(--text-tertiary)' }}>
              <span>Encrypted Field Coordination Channel • Today</span>
            </div>

            {activeMessages.map((chat) => (
              <div
                key={chat.id}
                className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${chat.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                {!chat.isMe && (
                  <span className="text-[10px] mb-1 ml-1" style={{ color: 'var(--text-tertiary)' }}>
                    {chat.sender}
                  </span>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl ${chat.isMe ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                  style={{
                    backgroundColor: chat.isMe ? 'var(--info)' : 'var(--surface)',
                    color: chat.isMe ? 'var(--text-on-primary)' : 'var(--text-primary)',
                    border: chat.isMe ? 'none' : '1px solid var(--border)'
                  }}
                >
                  <p className="text-xs sm:text-sm m-0 leading-relaxed">{chat.text}</p>
                </div>
                <span className="text-[10px] mt-1 mx-1" style={{ color: 'var(--text-tertiary)' }}>
                  {chat.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 shrink-0 border-t" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div
              className="flex items-center gap-2 rounded-xl p-1 sm:p-2 border"
              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
            >
              <input
                type="text"
                placeholder={`Message ${activeContact.name}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none focus:outline-none px-3 py-2 text-xs sm:text-sm w-full"
                style={{ backgroundColor: 'transparent', color: 'var(--text-primary)' }}
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="p-2.5 rounded-lg transition-all shadow-sm cursor-pointer border-none disabled:opacity-50"
                style={{
                  backgroundColor: message.trim() ? 'var(--info)' : 'var(--border)',
                  color: message.trim() ? 'var(--text-on-primary)' : 'var(--text-secondary)'
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsBroadcastModalOpen(false)}
        >
          <form
            onSubmit={handleSendBroadcast}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-bold m-0 flex items-center gap-2">
                <Users className="w-5 h-5 text-info" /> Create Mass Broadcast
              </h2>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Broadcast Title *</label>
              <input
                type="text"
                required
                value={broadcastForm.title}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                placeholder="e.g. Mandatory Location Shift Alert"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Channel</label>
                <select
                  value={broadcastForm.channel}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, channel: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="all">Omnichannel (In-App + SMS)</option>
                  <option value="sms">SMS Text Alert Only</option>
                  <option value="email">Email Bulletin Only</option>
                  <option value="in_app">In-App Banner Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Target Group</label>
                <select
                  value={broadcastForm.recipientGroup}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, recipientGroup: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="All Team Members">All Field Circulators</option>
                  <option value="District 4 Team">District 4 Team Only</option>
                  <option value="Mall Shift Team">Westside Mall Shift</option>
                  <option value="Supervisors & Leads">Supervisors & Leads</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Message Content *</label>
              <textarea
                rows={4}
                required
                value={broadcastForm.body}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, body: e.target.value })}
                placeholder="Type your message broadcast..."
                className="w-full text-xs rounded-xl p-3 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer border-none shadow-md"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Dispatch Broadcast
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
