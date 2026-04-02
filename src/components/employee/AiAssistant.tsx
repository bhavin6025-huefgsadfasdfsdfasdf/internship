'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RotateCcw,
  MessageSquare,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Helper. How can I assist you with your tasks today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [usageCount, setUsageCount] = useState(3); // Start with 3/10 as per prompt
  const maxUsage = 10;
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLimitReached = usageCount >= maxUsage;

  const suggestions = [
    "Summarize task",
    "Help write update"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim() || isLimitReached) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setUsageCount(prev => prev + 1);

    // Mock AI Response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've processed your request regarding "${text}". Here's how I can help... [Mock AI Response Details]`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside style={{
      width: 'var(--ai-sidebar-width)',
      backgroundColor: '#F9FAFB', // Light background different from main UI
      height: 'calc(100vh - var(--employee-topbar-height))',
      position: 'fixed',
      right: 0,
      top: 'var(--employee-topbar-height)',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid var(--border-color)',
      zIndex: 50
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Bot size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>AI Assistant</h3>
            <span style={{ 
              fontSize: '11px', 
              color: isLimitReached ? '#EF4444' : 'var(--text-muted)',
              fontWeight: '500'
            }}>
              {usageCount}/{maxUsage} requests left
            </span>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          title="Reset chat"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '6px',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.role === 'assistant' ? (
              <div 
                className="card"
                style={{ 
                  padding: '12px 14px', 
                  maxWidth: '90%', 
                  fontSize: '13px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  borderRadius: '12px 12px 12px 2px',
                  lineHeight: '1.5'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: 'var(--primary)', fontWeight: '600', fontSize: '11px' }}>
                  <Sparkles size={12} />
                  AI ASSISTANT
                </div>
                {msg.content}
              </div>
            ) : (
              <div 
                style={{ 
                  padding: '10px 14px', 
                  maxWidth: '90%', 
                  fontSize: '13px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '12px 12px 2px 12px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {msg.content}
              </div>
            )}
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Suggestions and Input */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: 'white',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Quick Suggestions */}
        {!isLimitReached && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#F3F4F6',
                  fontSize: '12px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
              >
                <Zap size={10} color="var(--primary)" />
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          position: 'relative',
          opacity: isLimitReached ? 0.6 : 1
        }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isLimitReached ? "Usage limit reached" : "Type your message..."}
            disabled={isLimitReached}
            style={{
              flex: 1,
              height: '40px',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '13px',
              resize: 'none',
              fontFamily: 'inherit',
              outline: 'none',
              backgroundColor: isLimitReached ? '#F3F4F6' : 'white'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLimitReached || !inputValue.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: isLimitReached ? '#D1D5DB' : 'var(--primary)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isLimitReached ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Send size={18} />
          </button>
        </div>
        
        {isLimitReached && (
          <div style={{ 
            fontSize: '11px', 
            color: '#EF4444', 
            textAlign: 'center', 
            fontWeight: '500',
            marginTop: '-4px'
          }}>
            Daily request limit reached. Please try again tomorrow.
          </div>
        )}
      </div>
    </aside>
  );
}
