'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock,
  User
} from 'lucide-react';

// --- Mock Data Types ---

type TimesheetEntry = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
  taskDescription?: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
};

// --- Helper Functions ---

const getDaysInWeek = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const getIntensityClass = (hours: number) => {
  if (hours === 0) return 'intensity-0';
  if (hours <= 2) return 'intensity-1';
  if (hours <= 4) return 'intensity-2';
  if (hours <= 6) return 'intensity-3';
  if (hours <= 8) return 'intensity-4';
  return 'intensity-5';
};

// --- Mock Data ---

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Doe', role: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', role: 'UI/UX Designer' },
  { id: '3', name: 'Robert Brown', role: 'Project Manager' },
  { id: '4', name: 'Emily Davis', role: 'Backend Developer' },
  { id: '5', name: 'Michael Wilson', role: 'QA Engineer' },
  { id: '6', name: 'Sarah Miller', role: 'Frontend Developer' },
  { id: '7', name: 'David Taylor', role: 'DevOps Engineer' },
];

const generateMockEntries = (employees: Employee[], startDate: Date): TimesheetEntry[] => {
  const entries: TimesheetEntry[] = [];
  const days = getDaysInWeek(startDate);

  employees.forEach(emp => {
    days.forEach(day => {
      const dateStr = formatDate(day);
      // Random hours between 0 and 10, weighted towards 8
      const rand = Math.random();
      const hours = rand > 0.8 ? 0 : rand > 0.2 ? 8 : Math.floor(Math.random() * 10);
      
      entries.push({
        id: `${emp.id}-${dateStr}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date: dateStr,
        hours: hours,
        status: 'pending',
        taskDescription: hours > 0 ? `Working on feature ${Math.floor(Math.random() * 100)}` : undefined
      });
    });
  });
  return entries;
};

// --- Component ---

export default function TimesheetOversight() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [entries, setEntries] = useState(() => generateMockEntries(MOCK_EMPLOYEES, currentWeekStart));

  const weekDays = useMemo(() => getDaysInWeek(currentWeekStart), [currentWeekStart]);

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEntry = useMemo(() => 
    entries.find(e => e.id === selectedEntryId), 
    [entries, selectedEntryId]
  );

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newStart);
    setEntries(generateMockEntries(MOCK_EMPLOYEES, newStart));
    setSelectedEntryId(null);
  };

  const updateEntryStatus = (id: string, status: 'approved' | 'rejected') => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">Timesheet Oversight</h1>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Week Selector */}
          <div className="card" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => handleWeekChange('prev')}
              className="btn-secondary" 
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              <ChevronLeft size={18} />
            </button>
            <span style={{ fontWeight: 500, minWidth: '180px', textAlign: 'center' }}>
              {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button 
              onClick={() => handleWeekChange('next')}
              className="btn-secondary" 
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Search Filter */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ margin: 0 }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '24px', overflow: 'hidden' }}>
        {/* Main Grid Card */}
        <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: '200px', sticky: 'left', background: '#F9FAFB', zIndex: 10 }}>Employee</th>
                  {weekDays.map(day => (
                    <th key={day.toISOString()} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div style={{ fontSize: '15px' }}>{day.getDate()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 500, sticky: 'left', background: 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={16} color="#6B7280" />
                        </div>
                        <div>
                          <div>{emp.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const dateStr = formatDate(day);
                      const entry = entries.find(e => e.employeeId === emp.id && e.date === dateStr);
                      const isSelected = selectedEntryId === entry?.id;
                      
                      return (
                        <td 
                          key={dateStr} 
                          onClick={() => entry && setSelectedEntryId(entry.id)}
                          style={{ padding: '8px', textAlign: 'center', cursor: 'pointer' }}
                        >
                          <div className={`heatmap-cell ${getIntensityClass(entry?.hours || 0)} ${isSelected ? 'selected' : ''}`}>
                            <span className="hour-text">{entry?.hours || 0}h</span>
                            {entry?.status === 'approved' && <div className="status-dot approved" />}
                            {entry?.status === 'rejected' && <div className="status-dot rejected" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="card" style={{ width: '320px', display: 'flex', flexDirection: 'column' }}>
          <h2 className="section-title">Entry Details</h2>
          
          {selectedEntry ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{selectedEntry.employeeName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {selectedEntry.employeeId}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="detail-item">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{new Date(selectedEntry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Hours</div>
                  <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--primary)" />
                    {selectedEntry.hours} hrs
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Task Description</div>
                <div className="detail-value" style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '6px', fontSize: '13px', lineHeight: '1.6' }}>
                  {selectedEntry.taskDescription || 'No description provided.'}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  {selectedEntry.status === 'pending' && <span className="badge badge-pending">Pending Review</span>}
                  {selectedEntry.status === 'approved' && <span className="badge badge-approved">Approved</span>}
                  {selectedEntry.status === 'rejected' && <span className="badge badge-rejected">Rejected</span>}
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', backgroundColor: '#10B981' }}
                  onClick={() => updateEntryStatus(selectedEntry.id, 'approved')}
                  disabled={selectedEntry.status === 'approved'}
                >
                  <CheckCircle2 size={18} />
                  Approve Entry
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ width: '100%', color: '#EF4444', borderColor: '#FECACA' }}
                  onClick={() => updateEntryStatus(selectedEntry.id, 'rejected')}
                  disabled={selectedEntry.status === 'rejected'}
                >
                  <XCircle size={18} />
                  Reject Entry
                </button>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <Clock size={48} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p>Select a cell in the grid to view details and take actions.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .heatmap-cell {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-weight: 500;
          position: relative;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .heatmap-cell:hover {
          transform: scale(1.05);
          z-index: 5;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .heatmap-cell.selected {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(91, 108, 255, 0.2);
        }

        .intensity-0 { background-color: #F9FAFB; color: #9CA3AF; }
        .intensity-1 { background-color: #E0E7FF; color: #4338CA; }
        .intensity-2 { background-color: #C7D2FE; color: #3730A3; }
        .intensity-3 { background-color: #A5B4FC; color: #312E81; }
        .intensity-4 { background-color: #818CF8; color: #FFFFFF; }
        .intensity-5 { background-color: #6366F1; color: #FFFFFF; }

        .hour-text {
          font-size: 13px;
        }

        .status-dot {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .status-dot.approved { background-color: #10B981; }
        .status-dot.rejected { background-color: #EF4444; }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main);
        }

        .badge {
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
        }
        .badge-pending { background-color: #FEF3C7; color: #92400E; }
        .badge-approved { background-color: #D1FAE5; color: #065F46; }
        .badge-rejected { background-color: #FEE2E2; color: #991B1B; }

        th {
          position: sticky;
          top: 0;
          background: #F9FAFB;
          z-index: 5;
        }
      `}</style>
    </div>
  );
}
