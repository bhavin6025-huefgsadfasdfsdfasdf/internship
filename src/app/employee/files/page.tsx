'use client';

import React from 'react';
import FileUpload from '@/components/employee/FileUpload';

export default function FileUploadPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Upload Documents</h3>
        <FileUpload />
      </div>
    </div>
  );
}
