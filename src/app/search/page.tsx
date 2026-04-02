'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  Folder, 
  CheckSquare, 
  User, 
  ArrowRight,
  Filter,
  Users,
  LayoutGrid,
  ChevronRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Mock data for search
  const allResults = [
    { id: 1, type: 'Task', title: 'Update Landing Page', description: 'Redesign the main hero section with new assets.', path: '/tasks/1' },
    { id: 2, type: 'Task', title: 'Fix Auth Bug', description: 'Resolve token expiration issue in the login flow.', path: '/tasks/2' },
    { id: 3, type: 'Project', title: 'Q3 Marketing Site', description: 'Complete overhaul of the marketing website.', path: '/projects/1' },
    { id: 4, type: 'Project', title: 'Mobile App V2', description: 'React Native rewrite of the mobile app.', path: '/projects/2' },
    { id: 5, type: 'User', title: 'Alice Chen', description: 'Senior Frontend Engineer | UI/UX', path: '/users/1' },
    { id: 6, type: 'User', title: 'Bob Smith', description: 'Product Manager', path: '/users/2' },
    { id: 7, type: 'Task', title: 'User Research', description: 'Conduct interviews with 5 key clients.', path: '/tasks/3' },
  ];

  const filteredResults = allResults.filter(item => 
    item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const tasks = filteredResults.filter(r => r.type === 'Task');
  const projects = filteredResults.filter(r => r.type === 'Project');
  const users = filteredResults.filter(r => r.type === 'User');

  const isEmpty = debouncedQuery.trim() !== '' && filteredResults.length === 0;
  const isPristine = debouncedQuery.trim() === '';

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Task': return CheckSquare;
      case 'Project': return Folder;
      case 'User': return User;
      default: return Search;
    }
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'Task': return { bg: 'bg-blue-50 text-blue-700', icon: 'bg-blue-100 text-blue-600' };
      case 'Project': return { bg: 'bg-purple-50 text-purple-700', icon: 'bg-purple-100 text-purple-600' };
      case 'User': return { bg: 'bg-green-50 text-green-700', icon: 'bg-green-100 text-green-600' };
      default: return { bg: 'bg-muted text-muted-foreground', icon: 'bg-muted text-muted-foreground' };
    }
  };

  const ResultGroup = ({ title, items, icon: Icon }: { title: string, items: typeof allResults, icon: any }) => {
    if (items.length === 0) return null;
    
    return (
      <section className="space-y-4 mb-8">
        <div className="flex items-center gap-2 px-1">
          <Icon size={14} className="text-primary" />
           <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
            {title} ({items.length})
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {items.map(item => {
            const styles = getBadgeStyles(item.type);
            const ItemIcon = getIconForType(item.type);
            return (
              <Card 
                key={item.id}
                onClick={() => router.push(item.path)}
                className="group relative cursor-pointer hover:border-primary/30 transition-all duration-200 border-border p-4 bg-background"
              >
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-transparent shadow-sm ${styles.icon}`}>
                       <ItemIcon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Typography variant="small" className="font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">
                          {item.title}
                        </Typography>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${styles.bg}`}>
                          {item.type}
                        </span>
                      </div>
                      <Typography variant="small" className="text-muted-foreground line-clamp-1 leading-none text-[11px] font-medium">
                        {item.description}
                      </Typography>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                 </div>
              </Card>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="text-center pt-8 mb-4">
        <Typography variant="h1" display className="text-4xl tracking-tight mb-2">Global Search</Typography>
        <Typography variant="p" className="text-muted-foreground font-medium">
          Find anything across your tasks, projects, and team directory.
        </Typography>
      </div>

      {/* Top Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all duration-500" />
        <div className="relative">
          <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-16 pl-14 pr-6 rounded-2xl border border-border bg-background shadow-lg shadow-black/5 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 text-lg font-medium transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-2 py-2 mt-2">
         <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
              <History size={14} />
              Recent
           </Button>
           <Button variant="ghost" size="sm" className="gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
              <TrendingUp size={14} />
              Popular
           </Button>
         </div>
         <Button variant="outline" size="sm" className="gap-2 border-border/60 text-xs font-bold px-4">
           <Filter size={14} />
           Smart Filters
         </Button>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

      {/* Search Results Display */}
      <CardContent className="p-0">
        {isPristine ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-border/50 animate-pulse">
              <Search size={32} className="text-muted-foreground/30" />
            </div>
            <Typography variant="p" className="text-muted-foreground italic font-medium">Type a name, task, or keyword to see instant results.</Typography>
          </div>
        ) : isEmpty ? (
          <div className="py-24 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto border border-orange-100">
              <X size={32} className="text-orange-500" />
            </div>
            <div>
              <Typography variant="h3" className="mb-1">No matching results</Typography>
              <Typography variant="p" className="text-muted-foreground">We couldn't find anything matching "{debouncedQuery}"</Typography>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => setQuery('')}>Clear Search</Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500">
            <ResultGroup title="Direct Tasks" items={tasks} icon={CheckSquare} />
            <ResultGroup title="Active Projects" items={projects} icon={Folder} />
            <ResultGroup title="Team Directory" items={users} icon={Users} />
          </div>
        )}
      </CardContent>
    </div>
  );
}

export default function GlobalSearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-50">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <Typography variant="small" className="font-bold tracking-widest uppercase">Indexing results...</Typography>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
