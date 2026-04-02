'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Flag, 
  Trash2, 
  UserX, 
  MoreVertical,
  Send,
  User,
  ShieldAlert,
  Search as SearchIcon
} from 'lucide-react';

// Mock Data
const initialChats = [
  { 
    id: 1, 
    user: 'John Doe', 
    lastMessage: 'This is a message that needs review...', 
    flagged: true, 
    lastTime: '2m ago',
    avatar: 'JD',
    muted: false
  },
  { 
    id: 2, 
    user: 'Jane Smith', 
    lastMessage: 'Looking forward to the meeting tomorrow!', 
    flagged: false, 
    lastTime: '15m ago',
    avatar: 'JS',
    muted: false
  },
  { 
    id: 3, 
    user: 'Alex Johnson', 
    lastMessage: 'Can you help me with my account?', 
    flagged: false, 
    lastTime: '1h ago',
    avatar: 'AJ',
    muted: true
  },
  { 
    id: 4, 
    user: 'Sarah Williams', 
    lastMessage: 'This is inappropriate content!', 
    flagged: true, 
    lastTime: '2h ago',
    avatar: 'SW',
    muted: false
  },
];

const initialMessages = [
  { id: 1, chatId: 1, sender: 'user', text: 'Hello, I have a question about the service.', time: '10:00 AM' },
  { id: 2, chatId: 1, sender: 'admin', text: 'Sure, I can help with that. What is your question?', time: '10:02 AM' },
  { id: 3, chatId: 1, sender: 'user', text: 'I think there is a bug in the payment system.', time: '10:05 AM' },
  { id: 4, chatId: 1, sender: 'user', text: 'This is a message that needs review and moderation.', time: '10:06 AM', flagged: true },
];

export default function ChatModerationPage() {
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  const filteredChats = chats.filter(chat => 
    chat.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const handleFlagUser = (chatId: number) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, flagged: !chat.flagged } : chat
    ));
    if (selectedChat.id === chatId) {
      setSelectedChat(prev => ({ ...prev, flagged: !prev.flagged }));
    }
  };

  const handleMuteUser = (chatId: number) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, muted: !chat.muted } : chat
    ));
    if (selectedChat.id === chatId) {
      setSelectedChat(prev => ({ ...prev, muted: !prev.muted }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      sender: 'admin',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="page-title">Chat Moderation</h1>
        <div style={{ position: 'relative' }}>
          <SearchIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search chat..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', padding: 0, overflow: 'hidden', minHeight: 0 }}>
        {/* Left Panel: Chat List */}
        <div style={{ 
          width: '350px', 
          borderRight: '1px solid var(--border-color)', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#F9FAFB'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Active Conversations</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{ 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '12px', 
                  cursor: 'pointer',
                  backgroundColor: selectedChat.id === chat.id ? 'white' : 'transparent',
                  borderLeft: selectedChat.id === chat.id ? '4px solid var(--primary)' : '4px solid transparent',
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: chat.flagged ? '#FEE2E2' : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: chat.flagged ? '#EF4444' : 'var(--text-muted)',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {chat.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '14px' }}>{chat.user}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{chat.lastTime}</span>
                  </div>
                  <p style={{ 
                    fontSize: '13px', 
                    color: 'var(--text-muted)', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.flagged && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    right: '10px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#EF4444'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          {/* Chat Header */}
          <div style={{ 
            padding: '16px 24px', 
            borderBottom: '1px solid var(--border-color)', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: selectedChat.muted ? '#9CA3AF' : '#10B981' 
              }} />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{selectedChat.user}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedChat.muted ? 'Muted' : 'Online'} | {selectedChat.flagged ? 'Flagged' : 'Verified User'}
                </span>
              </div>
            </div>
            
            {/* Moderation Tools */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                title="Flag User"
                onClick={() => handleFlagUser(selectedChat.id)}
                className="btn-secondary" 
                style={{ 
                  width: '36px', 
                  padding: 0, 
                  borderColor: selectedChat.flagged ? '#EF4444' : '#D1D5DB',
                  color: selectedChat.flagged ? '#EF4444' : 'var(--text-main)'
                }}
              >
                <Flag size={18} fill={selectedChat.flagged ? '#EF4444' : 'transparent'} />
              </button>
              <button 
                title="Mute User"
                onClick={() => handleMuteUser(selectedChat.id)}
                className="btn-secondary" 
                style={{ 
                  width: '36px', 
                  padding: 0,
                  borderColor: selectedChat.muted ? '#F59E0B' : '#D1D5DB',
                  color: selectedChat.muted ? '#F59E0B' : 'var(--text-main)'
                }}
              >
                <UserX size={18} />
              </button>
              <button className="btn-secondary" style={{ width: '36px', padding: 0 }}>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            padding: '24px', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#F9FAFB'
          }}>
            {messages.filter(m => m.chatId === selectedChat.id).map(msg => (
              <div 
                key={msg.id}
                style={{ 
                  alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '12px',
                  borderTopLeftRadius: msg.sender === 'admin' ? '12px' : '0',
                  borderTopRightRadius: msg.sender === 'admin' ? '0' : '12px',
                  backgroundColor: msg.sender === 'admin' ? 'var(--primary)' : 'white',
                  color: msg.sender === 'admin' ? 'white' : 'var(--text-main)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  position: 'relative',
                  border: msg.flagged ? '1.5px solid #EF4444' : 'none'
                }}>
                  {msg.text}
                  
                  {/* Message Action: Delete */}
                  {msg.sender === 'user' && (
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      style={{ 
                        position: 'absolute', 
                        right: '-32px', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s',
                        borderRadius: '4px'
                      }}
                      className="delete-action"
                      title="Delete Message"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--text-muted)', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '4px',
                  justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start'
                }}>
                  {msg.time}
                  {msg.flagged && <ShieldAlert size={12} color="#EF4444" />}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-color)' }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Type your response..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ 
                  flex: 1, 
                  height: '44px', 
                  borderRadius: '22px', 
                  border: '1px solid var(--border-color)',
                  padding: '0 20px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button 
                type="submit"
                className="btn-primary" 
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  padding: 0 
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .delete-action {
          opacity: 0;
        }
        div:hover > .delete-action {
          opacity: 1;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(91, 108, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
