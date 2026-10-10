import React, { useState } from 'react';
import { MessageSquare, Search, Send, Users, Image as ImageIcon, Paperclip, MoreVertical, CheckCircle2, ArrowLeft } from 'lucide-react';

export const DirectMessaging = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const [toast, setToast] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'Sarah Jenkins', text: 'Hey, I just sent the updated territory maps to the team.', time: '09:10 AM', isMe: false },
    { id: 2, sender: 'Me', text: 'Great, thanks! Make sure they focus on District 4 today.', time: '09:15 AM', isMe: true },
  ]);

  const contacts = [
    { id: 1, name: 'Team Alpha (All)', type: 'Group', unread: 3, time: '10:42 AM' },
    { id: 2, name: 'Sarah Jenkins', type: 'Sub Coordinator', unread: 0, time: '09:15 AM' },
    { id: 3, name: 'Michael Chen', type: 'Manager', unread: 1, time: 'Yesterday' },
    { id: 4, name: 'Emma Wilson', type: 'Circulator', unread: 0, time: 'Yesterday' },
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setChatHistory([...chatHistory, newMsg]);
    setMessage('');
    
    // Simulate reply
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'Team Member',
        text: 'Got it. Will do!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      }]);
      notify('New message received');
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-4 sm:p-6 flex-shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3 m-0">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--info)' }} />
              </div>
              Direct Messaging
            </h1>
            <p className="mt-1 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
              Communicate with your team, send mass alerts, and manage direct messages.
            </p>
          </div>
          <button onClick={() => notify('Broadcast modal opened')} className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-lg cursor-pointer border-none" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
            <Users className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className={`flex flex-col absolute inset-0 sm:relative sm:inset-auto z-10 sm:z-0 transition-transform w-full sm:w-[320px] flex-shrink-0 ${isMobileChatOpen ? '-translate-x-full sm:translate-x-0' : 'translate-x-0'}`} style={{ borderRight: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="relative">
              <Search className="w-4 h-4 absolute text-tertiary" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search contacts or groups..." 
                className="w-full rounded-lg text-sm focus:outline-none text-primary transition-all"
                style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                onChange={() => notify('Searching messages...')}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => {
              const isActive = activeChat === contact.id;
              return (
                <div 
                  key={contact.id} 
                  onClick={() => { setActiveChat(contact.id); setIsMobileChatOpen(true); }}
                  className="p-4 cursor-pointer transition-colors flex items-center gap-3 hover:bg-surface"
                  style={{ 
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: isActive ? 'var(--info-light)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--info)' : '2px solid transparent'
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                      {contact.name.charAt(0)}
                    </div>
                    {contact.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full font-bold" style={{ backgroundColor: 'var(--error)', color: 'var(--text-on-primary)' }}>
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-semibold truncate text-sm m-0" style={{ color: 'var(--text-primary)' }}>{contact.name}</h4>
                      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{contact.time}</span>
                    </div>
                    <p className="text-xs truncate m-0" style={{ color: 'var(--text-secondary)' }}>{contact.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex flex-col flex-1 h-full w-full absolute inset-0 sm:relative sm:inset-auto z-20 sm:z-0 transition-transform ${isMobileChatOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}`} style={{ backgroundColor: 'var(--background)' }}>
          {/* Chat Header */}
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
            <div className="flex items-center gap-3">
              <button className="sm:hidden p-2 -ml-2 rounded-lg cursor-pointer border-none bg-transparent" style={{ color: 'var(--text-secondary)' }} onClick={() => setIsMobileChatOpen(false)}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                {contacts.find(c => c.id === activeChat)?.name.charAt(0) || 'T'}
              </div>
              <div>
                <h3 className="font-bold m-0" style={{ color: 'var(--text-primary)' }}>{contacts.find(c => c.id === activeChat)?.name || 'Chat'}</h3>
                <p className="text-xs flex items-center gap-1 mt-0.5 m-0" style={{ color: 'var(--success)' }}>
                  <CheckCircle2 className="w-3 h-3" /> Online
                </p>
              </div>
            </div>
            <button className="p-2 transition-colors cursor-pointer border-none bg-transparent" style={{ color: 'var(--text-tertiary)' }}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="text-center text-xs font-medium my-4" style={{ color: 'var(--text-tertiary)' }}>Today</div>
            
            {chatHistory.map((chat) => (
              <div key={chat.id} className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${chat.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                {!chat.isMe && <span className="text-[10px] mb-1 ml-1" style={{ color: 'var(--text-tertiary)' }}>{chat.sender}</span>}
                <div className={`px-4 py-3 ${
                  chat.isMe 
                    ? 'rounded-2xl rounded-br-sm' 
                    : 'rounded-2xl rounded-bl-sm'
                }`} style={{
                  backgroundColor: chat.isMe ? 'var(--info)' : 'var(--surface)',
                  color: chat.isMe ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  border: chat.isMe ? 'none' : '1px solid var(--border)'
                }}>
                  <p className="text-sm m-0 leading-relaxed">{chat.text}</p>
                </div>
                <span className="text-[10px] mt-1 mx-1" style={{ color: 'var(--text-tertiary)' }}>{chat.time}</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 flex-shrink-0" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 rounded-xl p-1 sm:p-2 transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <button className="p-2 transition-colors cursor-pointer border-none bg-transparent hidden sm:block" style={{ color: 'var(--text-tertiary)' }} onClick={() => notify('Attachment clicked')}>
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 transition-colors cursor-pointer border-none bg-transparent" style={{ color: 'var(--text-tertiary)' }} onClick={() => notify('Image attachment clicked')}>
                <ImageIcon className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none focus:outline-none px-2 py-2 text-sm w-full"
                style={{ backgroundColor: 'transparent', color: 'var(--text-primary)' }}
              />
              <button 
                onClick={handleSend}
                className="p-3 rounded-lg transition-colors shadow-sm cursor-pointer border-none" 
                style={{ backgroundColor: message.trim() ? 'var(--info)' : 'var(--border)', color: message.trim() ? 'var(--text-on-primary)' : 'var(--text-secondary)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] px-6 py-3 rounded-xl shadow-xl font-bold animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};
