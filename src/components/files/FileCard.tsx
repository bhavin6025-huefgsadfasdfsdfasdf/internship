'use client';

import React, { useState } from 'react';
import { FileItem } from './types';
import { MoreVertical, Download, Trash2, Edit2, FileIcon, ImageIcon, FileTextIcon, VideoIcon, FolderIcon } from 'lucide-react';

interface FileCardProps {
  file: FileItem;
  onClick: (file: FileItem) => void;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
}

export default function FileCard({ file, onClick, onDownload, onDelete, onRename }: FileCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Format size safely
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIcon = () => {
    switch (file.type) {
      case 'image': return <ImageIcon className="w-10 h-10 text-blue-500" />;
      case 'video': return <VideoIcon className="w-10 h-10 text-purple-500" />;
      case 'document': return <FileTextIcon className="w-10 h-10 text-orange-500" />;
      case 'folder': return <FolderIcon className="w-10 h-10 text-yellow-500" />;
      default: return <FileIcon className="w-10 h-10 text-gray-400" />;
    }
  };

  const handleAction = (e: React.MouseEvent, action: 'download' | 'delete' | 'rename') => {
    e.stopPropagation();
    setDropdownOpen(false);
    if (action === 'download') onDownload(file);
    if (action === 'delete') onDelete(file);
    if (action === 'rename') onRename(file);
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer relative group flex flex-col"
      onClick={() => onClick(file)}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
          >
            <MoreVertical size={16} />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1 overflow-hidden">
              <button onClick={(e) => handleAction(e, 'download')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download size={14} /> Download
              </button>
              <button onClick={(e) => handleAction(e, 'rename')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Edit2 size={14} /> Rename
              </button>
              <button onClick={(e) => handleAction(e, 'delete')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        {getIcon()}
      </div>
      
      <div className="mt-auto">
        <p className="font-medium text-sm text-gray-900 truncate" title={file.name}>{file.name}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
          <p className="text-xs text-gray-400">{file.date}</p>
        </div>
      </div>
    </div>
  );
}
