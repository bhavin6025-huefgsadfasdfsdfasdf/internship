'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Flag, 
  Trash2, 
  UserX, 
  MoreVertical,
  Send,
  User,
  ShieldAlert,
  Search as SearchIcon,
  MessageSquare,
  MoreHorizontal,
  Mail,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const initialChats = [
  { 
    id: 1, 
    user: 'John Doe', 
    lastMessage: 'This is a message that needs review...', 
    flagged: true, 
    lastTime: '2m ago',
    avatar: 'JD',
    muted: false,
    status: 'online'
  },
  { 
    id: 2, 
    user: 'Jane Smith', 
    lastMessage: 'Looking forward to the meeting tomorrow!', 
    flagged: false, 
    lastTime: '15m ago',
    avatar: 'JS',
    muted: false,
    status: 'online'
  },
  { 
    id: 3, 
    user: 'Alex Johnson', 
    lastMessage: 'Can you help me with my account?', 
    flagged: false, 
    lastTime: '1h ago',
    avatar: 'AJ',
    muted: true,
    status: 'away'
  },
  { 
    id: 4, 
    user: 'Sarah Williams', 
    lastMessage: 'This is inappropriate content!', 
    flagged: true, 
    lastTime: '2h ago',
    avatar: 'SW',
    muted: false,
    status: 'offline'
  },
];

const initialMessages = [
  { id: 1, chatId: 1, sender: 'user', text: 'Hello, I have a question about the service.', time: '10:00 AM' },
  { id: 2, chatId: 1, sender: 'admin', text: 'Sure, I can help with that. What is your question?', time: '10:02 AM' },
  { id: 3, chatId: 1, sender: 'user', text: 'I think there is a bug in the payment system.', time: '10:05 AM' },
  { id: 4, chatId: 1, sender: 'user', text: 'This is a message that needs review and moderation.', time: '10:06 AM', flagged: true },
];

export default function ChatModerationPage() {
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  const filteredChats = chats.filter(chat => 
    chat.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMessage = (messageId: number) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const handleFlagUser = (chatId: number) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, flagged: !chat.flagged } : chat
    ));
    if (selectedChat.id === chatId) {
      setSelectedChat(prev => ({ ...prev, flagged: !prev.flagged }));
    }
  };

  const handleMuteUser = (chatId: number) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, muted: !chat.muted } : chat
    ));
    if (selectedChat.id === chatId) {
      setSelectedChat(prev => ({ ...prev, muted: !prev.muted }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      sender: 'admin',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Chat Moderation</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1 px-1">
            Monitor and moderate active user conversations to ensure platform safety.
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold px-6 shadow-sm">
             <ShieldAlert size={18} className="text-red-500" />
             Investigation Mode
          </Button>
          <Button className="gap-2 px-6 shadow-md">
            <Zap size={18} />
            Bulk Actions
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Panel: Conversation Sidebar */}
        <Card className="w-[380px] flex flex-col p-0 overflow-hidden shrink-0 border border-border bg-muted/5">
          <div className="p-5 border-b border-border bg-muted/10">
            <div className="relative mb-4">
              <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Find a conversation..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 text-xs shadow-none border-border/50 focus:bg-background rounded-xl"
              />
            </div>
            <div className="flex justify-between items-center px-1">
               <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                 Live Conversations ({filteredChats.length})
               </Typography>
               <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                 <MoreVertical size={14} />
               </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredChats.map(chat => {
              const isActive = selectedChat.id === chat.id;
              return (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border border-transparent flex gap-4 relative group ${isActive ? 'bg-background shadow-md border-border ring-1 ring-black/5' : 'hover:bg-muted/30'}`}
                >
                  <div className="relative shrink-0">
                     <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border-2 border-background ${chat.flagged ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'}`}>
                       {chat.avatar}
                     </div>
                     <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ring-1 ring-black/5 ${chat.status === 'online' ? 'bg-green-500' : chat.status === 'away' ? 'bg-orange-500' : 'bg-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <Typography variant="small" className={`font-bold text-xs truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>
                        {chat.user}
                      </Typography>
                      <Typography variant="small" className="text-[9px] text-muted-foreground/60 font-bold uppercase">{chat.lastTime}</Typography>
                    </div>
                    <Typography variant="small" className="text-[11px] text-muted-foreground line-clamp-1 font-medium italic">
                      {chat.lastMessage}
                    </Typography>
                  </div>
                  {chat.flagged && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                       <Flag size={12} className="text-red-500 fill-red-500 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Panel: Active Chat View */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden border border-border shadow-sm">
           {/* Header */}
           <div className="px-6 py-4 border-b border-border bg-background flex justify-between items-center shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                    <Typography variant="h4" className="mb-0 text-base flex items-center gap-2 tracking-tight">
                       {selectedChat.user}
                       <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${selectedChat.flagged ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                          {selectedChat.flagged ? 'Flagged for Review' : 'Verified Channel'}
                       </span>
                    </Typography>
                    <div className="flex items-center gap-3 mt-1">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          <Activity size={12} className="text-green-500" />
                          Activity Detected
                       </div>
                       <div className="w-1 h-1 rounded-full bg-border" />
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {selectedChat.muted ? <UserX size={12} className="text-orange-500" /> : <ShieldCheck size={12} className="text-primary" />}
                          {selectedChat.muted ? 'Muted by Admin' : 'Full Access'}
                       </div>
                    </div>
                 </div>
              </div>
              <div className="flex gap-2">
                 <Button 
                   variant="outline" 
                   size="icon" 
                   className={`h-9 w-9 rounded-xl transition-all ${selectedChat.flagged ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                   onClick={() => handleFlagUser(selectedChat.id)}
                 >
                   <Flag size={18} fill={selectedChat.flagged ? 'currentColor' : 'transparent'} />
                 </Button>
                 <Button 
                   variant="outline" 
                   size="icon" 
                   className={`h-9 w-9 rounded-xl transition-all ${selectedChat.muted ? 'bg-orange-50 border-orange-200 text-orange-600' : ''}`}
                   onClick={() => handleMuteUser(selectedChat.id)}
                 >
                   <UserX size={18} />
                 </Button>
                 <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                   <MoreHorizontal size={18} />
                 </Button>
              </div>
           </div>

           {/* Messages Scroll Area */}
           <div className="flex-1 overflow-y-auto p-8 bg-muted/10 space-y-6">
              {messages.filter(m => m.chatId === selectedChat.id).map(msg => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[80%] ${isAdmin ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <div className={`relative px-5 py-3 rounded-2xl shadow-sm text-sm font-medium border group transition-all duration-200 ${
                      isAdmin 
                        ? 'bg-primary text-primary-foreground border-primary/20 rounded-tr-none' 
                        : `bg-background text-foreground border-border rounded-tl-none ${msg.flagged ? 'border-red-400 ring-2 ring-red-50' : ''}`
                    }`}>
                      {msg.text}
                      {!isAdmin && (
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className={`flex items-center gap-2 mt-1.5 px-1 ${isAdmin ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                       <Typography variant="small" className="text-[10px] text-muted-foreground font-bold uppercase">{msg.time}</Typography>
                       {msg.flagged && <ShieldAlert size={12} className="text-red-500" />}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
           </div>

           {/* Input Bar */}
           <div className="p-6 bg-background border-t border-border shrink-0 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
             <form onSubmit={handleSendMessage} className="flex gap-4">
                <div className="flex-1 relative group">
                   <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                   <input 
                     type="text" 
                     placeholder="Write your moderation response..." 
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     className="w-full h-12 pl-14 pr-6 rounded-full border border-border bg-muted/20 outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm shadow-inner"
                   />
                </div>
                <Button type="submit" size="icon" className="h-12 w-12 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-transform" disabled={!inputText.trim()}>
                   <Send size={20} />
                </Button>
             </form>
           </div>
        </Card>
      </div>
    </div>
  );
}
