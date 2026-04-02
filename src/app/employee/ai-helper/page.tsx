'use client';

import React, { useState } from 'react';
import { Bot, Send, Zap, RotateCcw, AlertCircle } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; text: string; }
const LIMIT = 10;
const STARTERS = [
  'Summarize my tasks',
  'Help write update',
  'Draft a standup note',
  'What should I work on?',
];

export default function EmployeeAiHelperPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m your AI work assistant. Ask me anything to help you be more productive.' }
  ]);
  const [input, setInput] = useState('');
  const [used, setUsed] = useState(3);

  const send = (text: string = input) => {
    if (!text.trim() || used >= LIMIT) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    const aiMsg: Message = { role: 'assistant', text: `Here's a response to "${text.trim()}": This is a placeholder AI response. In production, this would connect to a Gemini or GPT model to provide intelligent task assistance.` };
    setMessages(m => [...m, userMsg, aiMsg]);
    setUsed(u => u + 1);
    setInput('');
  };

  const remaining = LIMIT - used;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} color="white" />
          </div>
          <div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>AI Helper</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Powered by Gemini</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: remaining <= 2 ? '#EF4444' : 'var(--text-muted)' }}>
            {remaining}/{LIMIT} requests left
          </span>
          <div style={{ width: '80px', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(remaining / LIMIT) * 100}%`, backgroundColor: remaining <= 2 ? '#EF4444' : 'var(--primary)', borderRadius: '99px', transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      {/* Quick prompts */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {STARTERS.map(s => (
          <button key={s} onClick={() => send(s)} disabled={used >= LIMIT}
            style={{ padding: '6px 14px', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '12px', color: 'var(--primary)', backgroundColor: '#EEF2FF', cursor: used >= LIMIT ? 'not-allowed' : 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', opacity: used >= LIMIT ? 0.5 : 1 }}>
            <Zap size={12} /> {s}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="table-container" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px', maxHeight: '400px', marginBottom: '16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: m.role === 'user' ? '#E5E7EB' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {m.role === 'user' ? <span style={{ fontSize: '12px', fontWeight: '700' }}>ME</span> : <Bot size={16} color="white" />}
            </div>
            <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', backgroundColor: m.role === 'user' ? 'var(--primary)' : '#F3F4F6', color: m.role === 'user' ? 'white' : 'var(--text-main)', fontSize: '13px', lineHeight: '1.5' }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Limit warning */}
      {used >= LIMIT && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', marginBottom: '12px', color: '#DC2626', fontSize: '13px' }}>
          <AlertCircle size={16} /> Daily limit reached. Resets at midnight.
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} disabled={used >= LIMIT}
          placeholder={used >= LIMIT ? 'Daily limit reached...' : 'Ask AI something...'}
          style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none', backgroundColor: used >= LIMIT ? '#F9FAFB' : 'white' }} />
        <button onClick={() => send()} disabled={used >= LIMIT || !input.trim()} className="btn-primary"
          style={{ height: '44px', padding: '0 20px', gap: '8px', opacity: used >= LIMIT || !input.trim() ? 0.5 : 1, cursor: used >= LIMIT || !input.trim() ? 'not-allowed' : 'pointer' }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
