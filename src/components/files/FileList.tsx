'use client';

import React from 'react';
import { FileItem } from './types';
import FileListItem from './FileListItem';

interface FileListProps {
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
}

export default function FileList({ files, onFileClick, onDownload, onDelete, onRename }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 border-dashed">
        <p className="text-gray-500 font-medium">No files found</p>
        <p className="text-gray-400 text-sm mt-1">Upload a file to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="flex-1 pl-4">Name</div>
        <div className="flex items-center gap-6 w-1/3 justify-end pr-10">
          <span className="w-24 text-right">Size</span>
          <span className="w-24 text-right">Date Modified</span>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {files.map(file => (
          <FileListItem 
            key={file.id} 
            file={file} 
            onClick={onFileClick} 
            onDownload={onDownload} 
            onDelete={onDelete} 
            onRename={onRename} 
          />
        ))}
      </div>
    </div>
  );
}
