import React from 'react';
import FileManager from '@/components/files/FileManager';

export const metadata = {
  title: 'File Manager | Global',
};

export default function GlobalFilesPage() {
  return (
    <div className="h-[calc(100vh-140px)]">
      <FileManager />
    </div>
  );
}
