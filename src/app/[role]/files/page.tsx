import React from 'react';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';
import FileManager from '@/components/files/FileManager';

export const metadata = {
  title: 'File Manager | Global',
};

export default function GlobalFilesPage() {
  return (
    <MainLayoutWrapper>
      <div className="h-[calc(100vh-140px)]">
        <FileManager />
      </div>
    </MainLayoutWrapper>
  );
}
