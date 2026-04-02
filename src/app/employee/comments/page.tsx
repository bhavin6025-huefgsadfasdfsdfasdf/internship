'use client';

import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Comment { id: string; user: string; text: string; time: string; }
const initial: Comment[] = [
  { id: '1', user: 'Manager', text: 'Please update the API docs section with rate limiting details.', time: '2h ago' },
  { id: '2', user: 'Sarah Miller', text: 'I\'ve started on the authentication section.', time: '1h ago' },
];

export default function EmployeeCommentsPage() {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setComments(c => [...c, { id: Date.now().toString(), user: 'You', text: input.trim(), time: 'Just now' }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 className="page-title">Task Comments</h1>

      <div className="table-container p-6" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-main)' }}>Update API Documentation</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: '12px', flexDirection: c.user === 'You' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: c.user === 'You' ? 'var(--primary)' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0, color: c.user === 'You' ? 'white' : 'var(--text-muted)' }}>
                {c.user[0]}
              </div>
              <div style={{ maxWidth: '75%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexDirection: c.user === 'You' ? 'row-reverse' : 'row' }}>
                  <span style={{ fontWeight: '600', fontSize: '13px' }}>{c.user}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.time}</span>
                </div>
                <div style={{ padding: '8px 12px', borderRadius: c.user === 'You' ? '12px 4px 12px 12px' : '4px 12px 12px 12px', backgroundColor: c.user === 'You' ? 'var(--primary)' : '#F3F4F6', color: c.user === 'You' ? 'white' : 'var(--text-main)', fontSize: '13px', lineHeight: '1.5' }}>
                  {c.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Write a comment..."
            style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none' }} />
          <button onClick={send} className="btn-primary" style={{ height: '44px', padding: '0 18px', gap: '6px' }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
