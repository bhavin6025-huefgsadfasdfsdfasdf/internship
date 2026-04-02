'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    // Simulate API call
    console.log('Updating password...', { currentPassword, newPassword });
    setSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - var(--navbar-height) - 48px)',
      width: '100%'
    }}>
      <div className="card" style={{ width: '380px', padding: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            backgroundColor: 'rgba(91, 108, 255, 0.1)', 
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lock size={24} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Change Password</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
            Protect your account with a strong password.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="current" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>CURRENT PASSWORD</label>
            <input 
              id="current"
              type="password" 
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ 
                height: '40px', 
                padding: '0 12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="new" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>NEW PASSWORD</label>
            <input 
              id="new"
              type="password" 
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ 
                height: '40px', 
                padding: '0 12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="confirm" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>CONFIRM PASSWORD</label>
            <input 
              id="confirm"
              type="password" 
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ 
                height: '40px', 
                padding: '0 12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                width: '100%',
                outline: 'none'
              }} 
            />
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#FEF2F2', 
              color: '#DC2626', 
              padding: '10px', 
              borderRadius: '6px', 
              fontSize: '13px',
              fontWeight: '500',
              textAlign: 'center',
              border: '1px solid #FCA5A5'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              backgroundColor: '#F0FDF4', 
              color: '#16A34A', 
              padding: '10px', 
              borderRadius: '6px', 
              fontSize: '13px',
              fontWeight: '500',
              textAlign: 'center',
              border: '1px solid #86EFAC'
            }}>
              {success}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            UPDATE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
