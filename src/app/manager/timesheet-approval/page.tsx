'use client';

import React, { useState, useMemo } from 'react';
import ManagerNavbar from '@/components/manager/ManagerNavbar';
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  User, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface TimesheetEntry {
  id: string;
  employeeName: string;
  employeeRole: string;
  avatar?: string;
  date: string;
  hours: number;
  taskLink: string;
  taskTitle: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  description: string;
  project: string;
}

const MOCK_TIMESHEETS: TimesheetEntry[] = [
  {
    id: 'TS-001',
    employeeName: 'Sarah Miller',
    employeeRole: 'UI/UX Designer',
    date: '2025-10-24',
    hours: 8,
    taskLink: '#',
    taskTitle: 'Homepage Hero Redesign',
    status: 'Pending',
    description: 'Developed high-fidelity mockups for the new mobile-responsive hero section. Focused on typography and CTA placement.',
    project: 'SaaS Platform Redesign'
  },
  {
    id: 'TS-002',
    employeeName: 'Alex Johnson',
    employeeRole: 'Backend Developer',
    date: '2025-10-24',
    hours: 6,
    taskLink: '#',
    taskTitle: 'API Stripe Integration',
    status: 'Approved',
    description: 'Implemented webhook handlers for successful subscription payments and handled edge cases for failed transactions.',
    project: 'Payment Gateway'
  },
  {
    id: 'TS-003',
    employeeName: 'Michael Chen',
    employeeRole: 'Fullstack Developer',
    date: '2025-10-23',
    hours: 7.5,
    taskLink: '#',
    taskTitle: 'Fix: Dashboard Loading bug',
    status: 'Pending',
    description: 'Identified and resolved a race condition in the dashboard data fetching logic that caused intermittent loading spinners.',
    project: 'Internal Dashboard'
  },
  {
    id: 'TS-004',
    employeeName: 'Emma Wilson',
    employeeRole: 'QA Engineer',
    date: '2025-10-23',
    hours: 4,
    taskLink: '#',
    taskTitle: 'Regression Testing v1.2',
    status: 'Rejected',
    description: 'Performed manual regression testing on the auth module. Found 2 blocker issues related to password reset.',
    project: 'Core Security'
  },
  {
    id: 'TS-005',
    employeeName: 'David Park',
    employeeRole: 'DevOps Engineer',
    date: '2025-10-22',
    hours: 8,
    taskLink: '#',
    taskTitle: 'CI/CD Pipeline Optimization',
    status: 'Pending',
    description: 'Reduced build times by 30% by implementing layer caching and parallelizing unit tests in the GitHub Actions workflow.',
    project: 'Infrastructure'
  }
];

export default function TimesheetApprovalPage() {
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(MOCK_TIMESHEETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAction = (id: string, newStatus: TimesheetEntry['status']) => {
    setTimesheets(prev => prev.map(ts => ts.id === id ? { ...ts, status: newStatus } : ts));
  };

  const filteredTimesheets = useMemo(() => {
    return timesheets.filter(ts => 
      ts.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ts.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [timesheets, searchQuery]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#E6F4EA', text: '#1E7E34', dot: '#1E7E34' };
      case 'Rejected': return { bg: '#FCE8E8', text: '#C53030', dot: '#C53030' };
      default: return { bg: '#FFF4E5', text: '#B7791F', dot: '#B7791F' }; // Pending
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-global)' }}>
      <ManagerNavbar title="Timesheet Approval" />
      
      <div className="content-area">
        {/* Filter Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px',
          gap: '16px'
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} />
            <input 
              type="text" 
              placeholder="Search by employee or task..." 
              className="search-input"
              style={{ width: '100%', margin: 0 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary">
              <Calendar size={18} />
              Last 7 Days
              <ChevronDown size={14} />
            </button>
            <button className="btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '48px' }}></th>
                  <th style={{ minWidth: '200px' }}>EMPLOYEE</th>
                  <th>DATE</th>
                  <th>HOURS</th>
                  <th>TASK LINK</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimesheets.map(ts => {
                  const isExpanded = expandedRows.has(ts.id);
                  const styles = getStatusStyles(ts.status);
                  
                  return (
                    <React.Fragment key={ts.id}>
                      <tr 
                        onClick={() => toggleRow(ts.id)}
                        style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                      >
                        <td style={{ textAlign: 'center' }}>
                          {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              backgroundColor: '#E5E7EB',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: 'var(--text-muted)'
                            }}>
                              {ts.employeeName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{ts.employeeName}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ts.employeeRole}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-main)', fontWeight: '500' }}>{ts.date}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                            <Clock size={14} color="var(--primary)" />
                            {ts.hours} hrs
                          </div>
                        </td>
                        <td>
                          <a 
                            href={ts.taskLink} 
                            onClick={(e) => e.stopPropagation()} 
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              color: 'var(--primary)', 
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}
                          >
                            {ts.taskTitle}
                            <ExternalLink size={14} />
                          </a>
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: styles.bg,
                            color: styles.text,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: styles.dot }} />
                            {ts.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }} onClick={e => e.stopPropagation()}>
                            <button 
                              onClick={() => handleAction(ts.id, 'Approved')}
                              style={{ 
                                width: '32px', 
                                height: '32px', 
                                padding: 0, 
                                borderRadius: '6px', 
                                backgroundColor: '#10B981', 
                                color: 'white',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: ts.status === 'Approved' ? 'default' : 'pointer',
                                opacity: ts.status === 'Approved' ? 0.5 : 1
                              }}
                              title="Approve"
                              disabled={ts.status === 'Approved'}
                            >
                              <Check size={18} strokeWidth={3} />
                            </button>
                            <button 
                              onClick={() => handleAction(ts.id, 'Rejected')}
                              style={{ 
                                width: '32px', 
                                height: '32px', 
                                padding: 0, 
                                borderRadius: '6px', 
                                backgroundColor: '#EF4444', 
                                color: 'white',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: ts.status === 'Rejected' ? 'default' : 'pointer',
                                opacity: ts.status === 'Rejected' ? 0.5 : 1
                              }}
                              title="Reject"
                              disabled={ts.status === 'Rejected'}
                            >
                              <X size={18} strokeWidth={3} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr style={{ backgroundColor: '#F9FAFB' }}>
                          <td colSpan={7} style={{ padding: '24px 48px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
                              <div>
                                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                                  WORK DESCRIPTION
                                </h4>
                                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-main)', margin: 0 }}>
                                  {ts.description}
                                </p>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                                    PROJECT
                                  </h4>
                                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{ts.project}</span>
                                </div>
                                <div>
                                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                                    TIMESHEET ID
                                  </h4>
                                  <span style={{ fontSize: '14px', fontFamily: 'monospace' }}>{ts.id}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
        table tr:hover {
          background-color: #F9FAFB;
        }
        
        .btn-secondary {
          height: 38px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
