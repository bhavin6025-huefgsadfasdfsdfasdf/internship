'use client';

import React, { useState, useRef, DragEvent } from 'react';
import { FileItem } from './types';
import FileGrid from './FileGrid';
import FileList from './FileList';
import FilePreviewPanel from './FilePreviewPanel';
import { UploadCloud, LayoutGrid, List, Search, Plus } from 'lucide-react';

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'Q3_Financial_Report.pdf', size: 2450000, date: 'Oct 15, 2023', type: 'document' },
  { id: '2', name: 'Dashboard_Design_V2.fig', size: 15600000, date: 'Oct 14, 2023', type: 'image' },
  { id: '3', name: 'Marketing_Campaign_Assets', size: 0, date: 'Oct 12, 2023', type: 'folder' },
  { id: '4', name: 'Product_Demo_Final.mp4', size: 125000000, date: 'Oct 10, 2023', type: 'video' },
  { id: '5', name: 'Employee_Handbook_2024.docx', size: 1200000, date: 'Oct 05, 2023', type: 'document' },
];

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const items: FileItem[] = newFiles.map(file => {
      let type: FileItem['type'] = 'other';
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      else if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('word')) type = 'document';
      
      return {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type,
        url: type === 'image' ? URL.createObjectURL(file) : undefined
      };
    });
    
    setFiles(prev => [...items, ...prev]);
  };

  const handleDownload = (file: FileItem) => {
    alert(`Downloading ${file.name}`);
  };

  const handleDelete = (file: FileItem) => {
    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
      setFiles(prev => prev.filter(f => f.id !== file.id));
      if (selectedFile?.id === file.id) setSelectedFile(null);
    }
  };

  const handleRename = (file: FileItem) => {
    const newName = prompt(`Enter new name for ${file.name}`, file.name);
    if (newName && newName.trim() !== '') {
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, name: newName } : f));
      if (selectedFile?.id === file.id) {
        setSelectedFile({ ...selectedFile, name: newName });
      }
    }
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div 
      className={`flex flex-col h-full bg-white rounded-2xl shadow-sm border overflow-hidden ${isDragging ? 'border-primary-500 bg-primary-50/10' : 'border-gray-200'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm border-2 border-dashed border-primary-500 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Drop files to upload</h3>
            <p className="text-gray-500 mt-2">Release to add files to your directory</p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        
        <div className="w-full sm:w-auto flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
            className="hidden" 
            multiple 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            <Plus size={16} /> Upload File
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* File View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50">
          {viewMode === 'grid' ? (
            <FileGrid 
              files={filteredFiles} 
              onFileClick={setSelectedFile} 
              onDownload={handleDownload} 
              onDelete={handleDelete} 
              onRename={handleRename} 
            />
          ) : (
            <FileList 
              files={filteredFiles} 
              onFileClick={setSelectedFile} 
              onDownload={handleDownload} 
              onDelete={handleDelete} 
              onRename={handleRename} 
            />
          )}
        </div>

        {/* Preview Panel */}
        {selectedFile && (
          <div className="hidden lg:block shrink-0">
            <FilePreviewPanel 
              file={selectedFile} 
              onClose={() => setSelectedFile(null)} 
              onDownload={handleDownload}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          </div>
        )}
      </div>

      {/* Mobile Preview Overlay */}
      {selectedFile && (
        <div className="lg:hidden fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedFile(null)} />
          <div className="relative w-full max-w-sm h-full flex transform transition-transform duration-300">
            <FilePreviewPanel 
              file={selectedFile} 
              onClose={() => setSelectedFile(null)} 
              onDownload={handleDownload}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          </div>
        </div>
      )}
    </div>
  );
}
