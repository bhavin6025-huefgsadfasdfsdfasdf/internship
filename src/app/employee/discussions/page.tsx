'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Hash, 
  Users,
  Circle
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
  replies?: Message[];
}

interface Channel {
  id: string;
  name: string;
  type: 'project' | 'general';
}

const channels: Channel[] = [
  { id: '1', name: 'general', type: 'general' },
  { id: '2', name: 'SaaS Platform Redesign', type: 'project' },
  { id: '3', name: 'Mobile App Dev', type: 'project' },
  { id: '4', name: 'Marketing Website', type: 'project' },
];

const initialMessages: Message[] = [
  {
    id: 'm1',
    sender: 'Sarah Wilson',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Has anyone seen the latest design specs for the dashboard?',
    time: '10:30 AM',
    isCurrentUser: false,
    replies: [
      {
        id: 'r1',
        sender: 'You',
        avatar: 'https://i.pravatar.cc/150?u=jd',
        content: 'Yes, I just uploaded them to the project folder.',
        time: '10:35 AM',
        isCurrentUser: true,
      }
    ]
  },
  {
    id: 'm2',
    sender: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    content: 'The API documentation has been updated. Please take a look.',
    time: '11:00 AM',
    isCurrentUser: false,
  },
  {
    id: 'm3',
    sender: 'You',
    avatar: 'https://i.pravatar.cc/150?u=jd',
    content: 'Thanks Alex, reviewing it now.',
    time: '11:15 AM',
    isCurrentUser: true,
  }
];

export default function EmployeeDiscussionPage() {
  const [activeChannelId, setActiveChannelId] = useState('2');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?u=jd',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - var(--employee-topbar-height))',
      backgroundColor: 'white',
      overflow: 'hidden',
      margin: '-24px' // Negate the padding from content-area in MainLayoutWrapper
    }}>
      {/* LEFT: CHANNEL LIST */}
      <div style={{
        width: '260px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>Discussions</h2>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Plus size={18} />
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ 
              position: 'absolute', 
              left: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} />
            <input 
              type="text" 
              placeholder="Search..."
              className="search-input"
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                fontSize: '13px',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          <div style={{ padding: '0 20px 8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Channels
          </div>
          {channels.filter(c => c.type === 'general').map(channel => (
            <div 
              key={channel.id}
              onClick={() => setActiveChannelId(channel.id)}
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                backgroundColor: activeChannelId === channel.id ? '#E0E7FF' : 'transparent',
                color: activeChannelId === channel.id ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: activeChannelId === channel.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              <Hash size={16} />
              <span>{channel.name}</span>
            </div>
          ))}

          <div style={{ padding: '20px 20px 8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Projects
          </div>
          {channels.filter(c => c.type === 'project').map(channel => (
            <div 
              key={channel.id}
              onClick={() => setActiveChannelId(channel.id)}
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                backgroundColor: activeChannelId === channel.id ? '#E0E7FF' : 'transparent',
                color: activeChannelId === channel.id ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: activeChannelId === channel.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              <Circle size={8} fill={activeChannelId === channel.id ? 'var(--primary)' : 'currentColor'} color={activeChannelId === channel.id ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* TOP: CHANNEL HEADER */}
        <div style={{
          height: '64px',
          padding: '0 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              fontWeight: '600', 
              fontSize: '18px', 
              color: 'var(--text-main)' 
            }}>
              {activeChannel?.type === 'project' ? activeChannel.name : `# ${activeChannel?.name}`}
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '4px 8px',
              backgroundColor: '#F3F4F6',
              borderRadius: '12px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <Users size={14} />
              <span>8 Members</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <Search size={20} />
            </button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* MESSAGES AREA */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: '#FFFFFF'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                flexDirection: message.isCurrentUser ? 'row-reverse' : 'row',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <img 
                  src={message.avatar} 
                  alt={message.sender}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', boxShadow: 'var(--shadow-light)' }}
                />
                <div style={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.isCurrentUser ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{message.sender}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{message.time}</span>
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: message.isCurrentUser ? 'var(--primary)' : '#F3F4F6',
                    color: message.isCurrentUser ? 'white' : 'var(--text-main)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {message.content}
                  </div>
                </div>
              </div>

              {/* REPLIES */}
              {message.replies && message.replies.map(reply => (
                <div key={reply.id} style={{
                  display: 'flex',
                  flexDirection: reply.isCurrentUser ? 'row-reverse' : 'row',
                  gap: '12px',
                  alignItems: 'flex-start',
                  marginLeft: reply.isCurrentUser ? '0' : '52px',
                  marginRight: reply.isCurrentUser ? '52px' : '0'
                }}>
                  <img 
                    src={reply.avatar} 
                    alt={reply.sender}
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  />
                  <div style={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: reply.isCurrentUser ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', fontSize: '12px' }}>{reply.sender}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{reply.time}</span>
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: reply.isCurrentUser ? 'var(--primary)' : '#F3F4F6',
                      color: reply.isCurrentUser ? 'white' : 'var(--text-main)',
                      fontSize: '13px',
                      lineHeight: '1.5'
                    }}>
                      {reply.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* BOTTOM: INPUT BAR */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#F9FAFB',
            padding: '8px 12px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <button style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '14px',
                padding: '8px 0',
                color: 'var(--text-main)'
              }}
            />
            <button 
              onClick={handleSendMessage}
              style={{ 
                background: inputValue.trim() ? 'var(--primary)' : '#E5E7EB', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
