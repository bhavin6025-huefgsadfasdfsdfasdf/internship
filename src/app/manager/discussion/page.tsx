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
  MessageSquare,
  ChevronDown,
  Circle
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isManager: boolean;
  replies?: Message[];
}

interface Channel {
  id: string;
  name: string;
  type: 'project' | 'general';
  active?: boolean;
}

const channels: Channel[] = [
  { id: '1', name: 'general', type: 'general' },
  { id: '2', name: 'SaaS Platform Redesign', type: 'project', active: true },
  { id: '3', name: 'Mobile App Dev', type: 'project' },
  { id: '4', name: 'Marketing Website', type: 'project' },
];

const initialMessages: Message[] = [
  {
    id: 'm1',
    sender: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    content: 'Completed the mockup for the project dashboard. Let me know what you think!',
    time: '10:30 AM',
    isManager: false,
    replies: [
      {
        id: 'r1',
        sender: 'You',
        avatar: 'https://i.pravatar.cc/150?u=manager',
        content: 'Looks great! Can we adjust the spacing on the KPI cards?',
        time: '10:35 AM',
        isManager: true,
      }
    ]
  },
  {
    id: 'm2',
    sender: 'Sarah Wilson',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'The API endpoint is ready for testing.',
    time: '11:00 AM',
    isManager: false,
  },
  {
    id: 'm3',
    sender: 'You',
    avatar: 'https://i.pravatar.cc/150?u=manager',
    content: 'Perfect. I will review it shortly with the team.',
    time: '11:15 AM',
    isManager: true,
  }
];

export default function DiscussionPage() {
  const [activeChannel, setActiveChannel] = useState('2');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const currentChannel = channels.find(c => c.id === activeChannel);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?u=manager',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isManager: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      {/* LEFT PANEL: CHANNEL / PROJECT LIST */}
      <div style={{
        width: '280px',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Discussions</h2>
            <button style={{ 
              background: 'none', 
              border: 'none', 
              color: '#6B7280', 
              cursor: 'pointer' 
            }}>
              <Plus size={18} />
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ 
              position: 'absolute', 
              left: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9CA3AF' 
            }} />
            <input 
              type="text" 
              placeholder="Search chats..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          <div style={{ padding: '0 20px 8px', fontSize: '12px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
            Channels
          </div>
          {channels.filter(c => c.type === 'general').map(channel => (
            <div 
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                backgroundColor: activeChannel === channel.id ? '#E0E7FF' : 'transparent',
                color: activeChannel === channel.id ? '#5B6CFF' : '#4B5563',
                fontWeight: activeChannel === channel.id ? '500' : '400',
                transition: 'all 0.2s'
              }}
            >
              <Hash size={16} />
              <span>{channel.name}</span>
            </div>
          ))}

          <div style={{ padding: '20px 20px 8px', fontSize: '12px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
            Projects
          </div>
          {channels.filter(c => c.type === 'project').map(channel => (
            <div 
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                backgroundColor: activeChannel === channel.id ? '#E0E7FF' : 'transparent',
                color: activeChannel === channel.id ? '#5B6CFF' : '#4B5563',
                fontWeight: activeChannel === channel.id ? '500' : '400',
                transition: 'all 0.2s'
              }}
            >
              <Circle size={8} fill={activeChannel === channel.id ? '#5B6CFF' : 'currentColor'} />
              <span style={{ 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: CHAT WINDOW */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* TOP: CHANNEL NAME + MEMBERS */}
        <div style={{
          height: '64px',
          padding: '0 24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              fontWeight: '600', 
              fontSize: '18px', 
              color: '#111827' 
            }}>
              {currentChannel?.type === 'project' ? currentChannel.name : `# ${currentChannel?.name}`}
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '4px 8px',
              backgroundColor: '#F3F4F6',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#6B7280'
            }}>
              <Users size={14} />
              <span>12 Members</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
              <Search size={20} />
            </button>
            <button style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* CHAT UI: MESSAGE BUBBLES */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                flexDirection: message.isManager ? 'row-reverse' : 'row',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <img 
                  src={message.avatar} 
                  alt={message.sender}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.isManager ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{message.sender}</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{message.time}</span>
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: message.isManager ? '#5B6CFF' : '#F3F4F6',
                    color: message.isManager ? 'white' : '#1F2937',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {message.content}
                  </div>
                </div>
              </div>

              {/* EXTRA: THREAD REPLIES (INDENTED) */}
              {message.replies && message.replies.map(reply => (
                <div key={reply.id} style={{
                  display: 'flex',
                  flexDirection: reply.isManager ? 'row-reverse' : 'row',
                  gap: '12px',
                  alignItems: 'flex-start',
                  marginLeft: reply.isManager ? '0' : '52px',
                  marginRight: reply.isManager ? '52px' : '0'
                }}>
                  <img 
                    src={reply.avatar} 
                    alt={reply.sender}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: reply.isManager ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', fontSize: '12px' }}>{reply.sender}</span>
                      <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{reply.time}</span>
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      backgroundColor: reply.isManager ? '#5B6CFF' : '#F3F4F6',
                      color: reply.isManager ? 'white' : '#1F2937',
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

        {/* BOTTOM: MESSAGE INPUT BAR */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #E5E7EB'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#F9FAFB',
            padding: '8px 12px',
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}>
            <button style={{ 
              background: 'none', 
              border: 'none', 
              color: '#6B7280', 
              cursor: 'pointer',
              padding: '6px'
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
                padding: '8px 0'
              }}
            />
            <button 
              onClick={handleSendMessage}
              style={{ 
                background: inputValue.trim() ? '#5B6CFF' : '#E5E7EB', 
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
