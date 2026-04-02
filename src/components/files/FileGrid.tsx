'use client';

import React from 'react';
import { FileItem } from './types';
import FileCard from './FileCard';

interface FileGridProps {
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
}

export default function FileGrid({ files, onFileClick, onDownload, onDelete, onRename }: FileGridProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 border-dashed">
        <p className="text-gray-500 font-medium">No files found</p>
        <p className="text-gray-400 text-sm mt-1">Upload a file to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {files.map(file => (
        <FileCard 
          key={file.id} 
          file={file} 
          onClick={onFileClick} 
          onDownload={onDownload} 
          onDelete={onDelete} 
          onRename={onRename} 
        />
      ))}
    </div>
  );
}
