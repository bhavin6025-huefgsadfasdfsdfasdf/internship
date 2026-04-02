'use client';

import React from 'react';
import { FileItem } from './types';
import { X, Download, Trash2, Edit2, FileIcon, ImageIcon, FileTextIcon, VideoIcon, FolderIcon, HardDrive } from 'lucide-react';

interface FilePreviewPanelProps {
  file: FileItem | null;
  onClose: () => void;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
}

export default function FilePreviewPanel({ file, onClose, onDownload, onDelete, onRename }: FilePreviewPanelProps) {
  if (!file) {
    return (
      <div className="w-80 h-full border-l border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <HardDrive className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No file selected</p>
        <p className="text-gray-400 text-sm mt-2">Select a file to view its details</p>
      </div>
    );
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIcon = () => {
    switch (file.type) {
      case 'image': return <ImageIcon className="w-20 h-20 text-blue-500" />;
      case 'video': return <VideoIcon className="w-20 h-20 text-purple-500" />;
      case 'document': return <FileTextIcon className="w-20 h-20 text-orange-500" />;
      case 'folder': return <FolderIcon className="w-20 h-20 text-yellow-500" />;
      default: return <FileIcon className="w-20 h-20 text-gray-400" />;
    }
  };

  return (
    <div className="w-80 h-full border-l border-gray-200 bg-white flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">File Details</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        <div className="flex items-center justify-center py-8 bg-gray-50 rounded-xl mb-6">
          {file.url && file.type === 'image' ? (
            <img src={file.url} alt={file.name} className="max-w-[80%] max-h-40 rounded shadow-sm object-contain" />
          ) : (
            getIcon()
          )}
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-6 truncate break-words" title={file.name}>
          {file.name}
        </h2>

        <div className="space-y-4 flex-1">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</p>
            <p className="text-sm text-gray-800 capitalize">{file.type}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Size</p>
            <p className="text-sm text-gray-800">{formatSize(file.size)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date Modified</p>
            <p className="text-sm text-gray-800">{file.date}</p>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-2">
          <button 
            onClick={() => onDownload(file)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            <Download size={16} /> Download
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onRename(file)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Edit2 size={16} /> Rename
            </button>
            <button 
              onClick={() => onDelete(file)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-red-100 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
