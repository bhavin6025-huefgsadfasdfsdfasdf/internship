'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Settings, 
  Download, 
  Table as TableIcon, 
  List, 
  ChevronDown,
  Search,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock Data
const users = ['All Users', 'Admin John', 'Admin Sarah', 'System', 'Security', 'User Mike'];
const actionTypes = ['All Actions', 'Login', 'Logout', 'Create Company', 'Update Settings', 'Delete User', 'Backup'];

const mockLogs = [
  { id: 1, timestamp: '2026-03-20 14:30:22', user: 'Admin John', action: 'Created new company: TechFlow Inc.', result: 'Success' },
  { id: 2, timestamp: '2026-03-20 13:15:10', user: 'System', action: 'Daily backup complete', result: 'Success' },
  { id: 3, timestamp: '2026-03-20 12:45:05', user: 'Admin Sarah', action: 'Modified system settings', result: 'Success' },
  { id: 4, timestamp: '2026-03-20 11:20:44', user: 'Security', action: 'Failed login attempt from IP 192.168.1.1', result: 'Failed' },
  { id: 5, timestamp: '2026-03-20 10:05:33', user: 'Admin John', action: 'Deleted inactive user: TestUser', result: 'Success' },
  { id: 6, timestamp: '2026-03-20 09:30:12', user: 'User Mike', action: 'Updated profile information', result: 'Success' },
  { id: 7, timestamp: '2026-03-20 08:15:00', user: 'Security', action: 'Multiple failed login attempts', result: 'Failed' },
  { id: 8, timestamp: '2026-03-20 07:45:22', user: 'System', action: 'Automatic update check', result: 'Success' },
  { id: 9, timestamp: '2026-03-19 23:30:11', user: 'Admin Sarah', action: 'Exported audit logs', result: 'Success' },
  { id: 10, timestamp: '2026-03-19 22:15:05', user: 'Admin John', action: 'Changed password for Admin John', result: 'Success' },
  { id: 11, timestamp: '2026-03-19 21:00:00', user: 'System', action: 'Scheduled task: cleanup', result: 'Success' },
  { id: 12, timestamp: '2026-03-19 20:45:44', user: 'Security', action: 'Blocked suspicious IP', result: 'Success' },
];

export default function AuditLogsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedAction, setSelectedAction] = useState('All Actions');

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h2" display>Audit Logs</Typography>
      </div>
      
      <div className="flex flex-1 overflow-hidden saas-card p-0">
        {/* Left Panel - Filters (260px) */}
        <aside style={{
          width: '260px',
          borderRight: '1px solid var(--border-color)',
          backgroundColor: 'white',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          flexShrink: 0
        }}>
          <div>
            <h3 className="section-title" style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Filters</h3>
            
            {/* User Dropdown */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-main)' }}>USER</label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    appearance: 'none',
                    backgroundColor: '#F9FAFB',
                    cursor: 'pointer'
                  }}
                >
                  {users.map(user => <option key={user} value={user}>{user}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Date Range */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-main)' }}>DATE RANGE</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#F9FAFB',
                  }}
                />
              </div>
              <div style={{ marginTop: '8px' }}>
                <input 
                  type="date"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#F9FAFB',
                  }}
                />
              </div>
            </div>

            {/* Action Type */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-main)' }}>ACTION TYPE</label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    appearance: 'none',
                    backgroundColor: '#F9FAFB',
                    cursor: 'pointer'
                  }}
                >
                  {actionTypes.map(action => <option key={action} value={action}>{action}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>

          <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
            Apply Filters
          </button>
        </aside>

        {/* Right Panel - Content */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-global)',
          overflow: 'hidden'
        }}>
          {/* Top Actions Bar */}
          <header style={{
            padding: '16px 24px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setViewMode('table')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  backgroundColor: viewMode === 'table' ? 'var(--primary)' : 'white',
                  color: viewMode === 'table' ? 'white' : 'var(--text-main)',
                }}
              >
                <TableIcon size={16} />
                Table
              </button>
              <button 
                onClick={() => setViewMode('timeline')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  backgroundColor: viewMode === 'timeline' ? 'var(--primary)' : 'white',
                  color: viewMode === 'timeline' ? 'white' : 'var(--text-main)',
                }}
              >
                <List size={16} />
                Timeline
              </button>
            </div>

            <button className="btn-primary" style={{ height: '36px' }}>
              <Download size={16} />
              Export CSV
            </button>
          </header>

          {/* Main Content Area */}
          <div style={{ flex: 1, overflow: 'hidden', padding: '24px' }}>
            {viewMode === 'table' ? (
              <div className="card" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  borderRadius: '10px',
                  scrollbarWidth: 'thin'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#F9FAFB' }}>
                      <tr>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>TIMESTAMP</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>USER</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>ACTION</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid var(--border-color)' }}>RESULT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLogs.map((log) => (
                        <tr key={log.id} style={{ transition: 'background-color 0.2s' }}>
                          <td style={{ padding: '14px 24px', color: 'var(--text-muted)', fontSize: '13px' }}>{log.timestamp}</td>
                          <td style={{ padding: '14px 24px', fontWeight: '500' }}>{log.user}</td>
                          <td style={{ padding: '14px 24px' }}>{log.action}</td>
                          <td style={{ padding: '14px 24px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              fontWeight: '600',
                              backgroundColor: log.result === 'Success' ? '#ECFDF5' : '#FEF2F2',
                              color: log.result === 'Success' ? '#10B981' : '#EF4444'
                            }}>
                              {log.result === 'Success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                              {log.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card" style={{ height: '100%', overflowY: 'auto', padding: '32px' }}>
                <div style={{ position: 'relative' }}>
                  {/* Timeline Vertical Line */}
                  <div style={{
                    position: 'absolute',
                    left: '16px',
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    backgroundColor: 'var(--border-color)'
                  }}></div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {mockLogs.map((log) => (
                      <div key={log.id} style={{ display: 'flex', gap: '32px', position: 'relative' }}>
                        {/* Timeline Dot */}
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          border: `2px solid ${log.result === 'Success' ? '#10B981' : '#EF4444'}`,
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 0 0 4px white'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: log.result === 'Success' ? '#10B981' : '#EF4444'
                          }}></div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px' }}>{log.action}</h4>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• {log.timestamp}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                            Performed by <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{log.user}</span>
                          </p>
                          <div style={{ marginTop: '8px' }}>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: log.result === 'Success' ? '#10B981' : '#EF4444',
                              textTransform: 'uppercase'
                            }}>
                              {log.result}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
    </div>
    </div>
  );
}
