'use client';

import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Todo { id: string; text: string; done: boolean; }
const initial: Todo[] = [
  { id: '1', text: 'Review pull request #42', done: false },
  { id: '2', text: 'Update project documentation', done: true },
  { id: '3', text: 'Schedule 1:1 with manager', done: false },
];

export default function EmployeeTodoPage() {
  const [todos, setTodos] = useState<Todo[]>(initial);
  const [input, setInput] = useState('');

  const toggle = (id: string) => setTodos(t => t.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id: string) => setTodos(t => t.filter(i => i.id !== id));
  const add = () => {
    if (!input.trim()) return;
    setTodos(t => [...t, { id: Date.now().toString(), text: input.trim(), done: false }]);
    setInput('');
  };

  const done = todos.filter(t => t.done).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 className="page-title">Personal TODO</h1>

      <div className="table-container p-6" style={{ maxWidth: '560px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{done}/{todos.length} completed</span>
          <div style={{ width: '200px', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${todos.length ? (done / todos.length) * 100 : 0}%`, backgroundColor: 'var(--primary)', borderRadius: '99px', transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {todos.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid var(--border-color)' }}
              className="group">
              <button onClick={() => toggle(t.id)} style={{ color: t.done ? '#10B981' : '#D1D5DB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {t.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </button>
              <span style={{ flex: 1, fontSize: '14px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
                {t.text}
              </span>
              <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F87171', padding: 0, opacity: 0 }}
                className="delete-btn">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Add new todo..."
            style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', backgroundColor: '#F9FAFB' }} />
          <button onClick={add} className="btn-primary" style={{ height: '42px', padding: '0 20px' }}>
            <Plus size={18} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .group:hover .delete-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
