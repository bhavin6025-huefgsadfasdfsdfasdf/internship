'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

export default function SubmitTimesheetPage() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalHours = 40;
  const taskBreakdown = [
    { task: 'Project Alpha - Frontend Dev', hours: 16 },
    { task: 'Project Beta - UI Refactor', hours: 12 },
    { task: 'Internal - Team Meeting', hours: 4 },
    { task: 'Documentation - API Specs', hours: 8 },
  ];

  const handleSubmit = () => {
    setShowModal(true);
  };

  const confirmSubmit = () => {
    setShowModal(false);
    setSubmitted(true);
    // In a real app, you would call an API here
  };

  if (submitted) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        gap: '16px'
      }}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          backgroundColor: '#ECFDF5', 
          color: '#10B981', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CheckCircle2 size={32} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Timesheet Submitted!</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px' }}>
          Your timesheet for the current week has been successfully submitted for review.
        </p>
        <button 
          className="btn-primary" 
          onClick={() => window.location.href = '/employee'}
          style={{ marginTop: '12px' }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 120px)',
      padding: '20px'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            borderRadius: '12px', 
            backgroundColor: '#F3F4F6', 
            color: 'var(--primary)',
            marginBottom: '16px'
          }}>
            <ClipboardList size={28} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Weekly Timesheet Summary</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Week of Mar 24 - Mar 30, 2026</p>
        </div>

        <div style={{ 
          backgroundColor: 'var(--bg-global)', 
          padding: '24px', 
          borderRadius: '12px', 
          textAlign: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total Hours Logged</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Clock size={24} color="var(--primary)" />
            <span style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)' }}>{totalHours}</span>
            <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-muted)', marginTop: '8px' }}>hrs</span>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-main)' }}>TASK BREAKDOWN</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {taskBreakdown.map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '14px'
              }}>
                <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{item.task}</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', height: '48px', fontSize: '16px' }}
          onClick={handleSubmit}
        >
          SUBMIT TIMESHEET
        </button>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
          * Once submitted, your timesheet will be locked for review.
        </p>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ 
            width: '90%', 
            maxWidth: '400px', 
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              backgroundColor: '#FEF3C7', 
              color: '#F59E0B', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <AlertCircle size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Are you sure?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                You are about to submit your timesheet for this week. This action cannot be undone once confirmed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={confirmSubmit}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
