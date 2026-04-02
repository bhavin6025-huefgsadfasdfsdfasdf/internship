'use client';

import React, { useState } from 'react';
import { FileItem } from './types';
import { MoreVertical, Download, Trash2, Edit2, FileIcon, ImageIcon, FileTextIcon, VideoIcon, FolderIcon } from 'lucide-react';

interface FileListItemProps {
  file: FileItem;
  onClick: (file: FileItem) => void;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
}

export default function FileListItem({ file, onClick, onDownload, onDelete, onRename }: FileListItemProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIcon = () => {
    switch (file.type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'video': return <VideoIcon className="w-5 h-5 text-purple-500" />;
      case 'document': return <FileTextIcon className="w-5 h-5 text-orange-500" />;
      case 'folder': return <FolderIcon className="w-5 h-5 text-yellow-500" />;
      default: return <FileIcon className="w-5 h-5 text-gray-400" />;
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
      className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer group transition-colors"
      onClick={() => onClick(file)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
          {getIcon()}
        </div>
        <div className="flex flex-col truncate">
          <span className="font-medium text-sm text-gray-900 truncate">{file.name}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 w-1/3 justify-end text-sm text-gray-500">
        <span className="w-24 text-right">{formatSize(file.size)}</span>
        <span className="w-24 text-right">{file.date}</span>
        
        <div className="relative w-8 flex justify-end">
          <button 
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
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
    </div>
  );
}
