'use client';

import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  Image as ImageIcon, 
  CheckCircle2, 
  Loader2, 
  X, 
  ArrowLeft,
  Type,
  AlignLeft,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function CreateTaskFromImage() {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  });
  const [isCreated, setIsCreated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    
    // Simulate image read
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      // Simulate AI processing delay
      setTimeout(() => {
        setImage(result);
        setTaskData({
          title: 'Optimize Database Queries',
          description: 'Based on the whiteboard notes: We need to analyze the slow queries in the reporting module and implement indexing on the users and orders table. Also consider adding a caching layer for frequent lookups.'
        });
        setIsUploading(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCreateTask = () => {
    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setIsCreated(true);
    }, 1000);
  };

  const reset = () => {
    setImage(null);
    setTaskData({ title: '', description: '' });
    setIsCreated(false);
  };

  if (isCreated) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 'calc(100vh - 200px)',
        gap: '20px'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          backgroundColor: '#ECFDF5', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#10B981'
        }}>
          <CheckCircle2 size={48} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Task Created Successfully!</h2>
        <p style={{ color: 'var(--text-muted)' }}>Your task has been added to your queue and synced with the team.</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button className="btn-secondary" onClick={reset}>SCAN ANOTHER</button>
          <Link href="/employee/tasks" className="btn-primary">VIEW MY TASKS</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/employee" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Create Task from Image</h1>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {!image ? (
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ 
              padding: '80px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              border: '2px dashed var(--border-color)',
              margin: '24px',
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: '#F9FAFB',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            
            {isUploading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Loader2 size={48} className="animate-spin" color="var(--primary)" />
                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>AI is scanning your image...</span>
              </div>
            ) : (
              <>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#E0E7FF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <FileUp size={32} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Drop your image here</p>
                  <p style={{ color: 'var(--text-muted)' }}>or click to browse your files</p>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-muted)', 
                  backgroundColor: '#E5E7EB', 
                  padding: '4px 12px', 
                  borderRadius: '4px',
                  marginTop: '10px'
                }}>
                  Supports PNG, JPG, WEBP
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', minHeight: '500px' }}>
            {/* Left: Image Preview */}
            <div style={{ 
              flex: 1, 
              backgroundColor: '#F3F4F6', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '24px',
              borderRight: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <img 
                src={image} 
                alt="Uploaded source" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '400px', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }} 
              />
              <button 
                onClick={() => setImage(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  boxShadow: 'var(--shadow-light)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Right: AI Form */}
            <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#EDE9FE', color: '#7C3AED' }}>
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>AI Task Details</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Review and edit generated details</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Type size={14} /> TASK TITLE
                  </label>
                  <input 
                    type="text" 
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '15px',
                      fontWeight: '600',
                      outlineColor: 'var(--primary)',
                      backgroundColor: '#F9FAFB'
                    }}
                    placeholder="Enter task title..."
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlignLeft size={14} /> DESCRIPTION
                  </label>
                  <textarea 
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '14px',
                      height: '180px',
                      resize: 'none',
                      outlineColor: 'var(--primary)',
                      backgroundColor: '#F9FAFB',
                      lineHeight: '1.6'
                    }}
                    placeholder="Enter task description..."
                  />
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => setImage(null)}
                >
                  DISCARD
                </button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 2, gap: '10px' }}
                  onClick={handleCreateTask}
                  disabled={isUploading}
                >
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  CREATE TASK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
