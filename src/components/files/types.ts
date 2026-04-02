export type FileItem = {
  id: string;
  name: string;
  size: number;
  date: string;
  type: 'image' | 'video' | 'document' | 'folder' | 'other';
  url?: string;
};
