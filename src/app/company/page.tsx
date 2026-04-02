'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Pencil, 
  Trash2, 
  X,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  Building2,
  Users,
  Globe,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CompaniesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({ name: '', domain: '' });

  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechFlow Inc.', domain: 'techflow.com', createdDate: 'Oct 12, 2025', adminCount: 5, status: 'Active' },
    { id: 2, name: 'Global Logistics', domain: 'globallogistics.com', createdDate: 'Oct 10, 2025', adminCount: 3, status: 'Active' },
    { id: 3, name: 'Creative Minds', domain: 'creativeminds.io', createdDate: 'Oct 08, 2025', adminCount: 2, status: 'Inactive' },
    { id: 4, name: 'Apex Solutions', domain: 'apex.co', createdDate: 'Oct 05, 2025', adminCount: 8, status: 'Active' },
    { id: 5, name: 'Visionary Ads', domain: 'visionary.com', createdDate: 'Oct 01, 2025', adminCount: 1, status: 'Inactive' },
    { id: 6, name: 'Cloud Nine', domain: 'cloudnine.net', createdDate: 'Sep 28, 2025', adminCount: 4, status: 'Active' },
  ]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreate = () => {
    if (!formData.name) return;
    const newCompany = {
      id: Date.now(),
      name: formData.name,
      domain: formData.domain,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      adminCount: 0,
      status: 'Active'
    };
    setCompanies([newCompany, ...companies]);
    setIsModalOpen(false);
    setFormData({ name: '', domain: '' });
    showSuccess('Company created successfully');
  };

  const handleEdit = () => {
    if (!formData.name) return;
    setCompanies(companies.map(c => c.id === selectedCompany.id ? { ...c, name: formData.name, domain: formData.domain } : c));
    setIsEditModalOpen(false);
    showSuccess('Company updated successfully');
  };

  const handleDelete = () => {
    setCompanies(companies.filter(c => c.id !== selectedCompany.id));
    setIsDeleteModalOpen(false);
    showSuccess('Company deleted successfully');
  };

  const openEdit = (company: any) => {
    setSelectedCompany(company);
    setFormData({ name: company.name, domain: company.domain || '' });
    setIsEditModalOpen(true);
  };

  const openDelete = (company: any) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {successMessage && (
        <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 z-50 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-bold text-sm tracking-tight">{successMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <Typography variant="h2" display>Companies</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Manage your client organizations and their workspace settings.
          </Typography>
        </div>
        <Button className="gap-2 px-6 shadow-md" onClick={() => { setFormData({ name: '', domain: '' }); setIsModalOpen(true); }}>
          <Plus size={18} />
          Add Company
        </Button>
      </div>

      {/* Search + Filter Section */}
      <div className="flex flex-wrap items-center gap-4 saas-card p-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search companies by name or domain..." 
            className="pl-10 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-4 pr-10 rounded-xl border border-border bg-background text-sm font-semibold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-[150px]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <Button variant="secondary" size="icon" className="h-11 w-11">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Companies Table Card */}
      <Card className="overflow-hidden border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Company Organization</Typography>
                </th>
                <th className="px-6 py-4">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Registration Date</Typography>
                </th>
                <th className="px-6 py-4">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Admin Seats</Typography>
                </th>
                <th className="px-6 py-4">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Status</Typography>
                </th>
                <th className="px-6 py-4 text-right">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Actions</Typography>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <Typography variant="small" className="font-bold block text-foreground tracking-tight leading-none mb-1">{company.name}</Typography>
                        <Typography variant="small" className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                          <Globe size={10} />
                          {company.domain}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Typography variant="small" className="text-muted-foreground font-medium whitespace-nowrap">{company.createdDate}</Typography>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Users size={14} className="text-muted-foreground/60" />
                       <Typography variant="small" className="font-bold">{company.adminCount}</Typography>
                       <Typography variant="small" className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Active Admins</Typography>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      company.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={() => openEdit(company)}>
                        <Pencil size={14} className="text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => openDelete(company)}>
                        <Trash2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreHorizontal size={14} className="text-muted-foreground" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <Search size={48} className="mb-2" />
                      <Typography variant="h4" className="mb-0">No companies found</Typography>
                      <Typography variant="small" className="italic">Try adjusting your search or filters</Typography>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Company Modal */}
      {(isModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg p-0 border border-border shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border bg-muted/5 flex justify-between items-center">
              <Typography variant="h3" className="mb-0">{isEditModalOpen ? 'Edit Company' : 'Register New Company'}</Typography>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest px-1">Organization Name</Typography>
                  <Input 
                    placeholder="e.g. Acme Corp"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-11 font-medium"
                  />
                  {!formData.name && <Typography variant="small" className="text-red-500 text-[10px] px-1 font-bold italic">Required field*</Typography>}
                </div>
                
                <div className="space-y-1.5">
                  <Typography variant="small" className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest px-1">Primary Domain</Typography>
                  <Input 
                    placeholder="e.g. acme.com"
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                    className="h-11 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 justify-end">
                <Button variant="outline" className="px-6 font-bold" onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }}>Cancel</Button>
                <Button 
                  className="px-8 font-bold shadow-md"
                  disabled={!formData.name}
                  onClick={isEditModalOpen ? handleEdit : handleCreate}
                >
                  {isEditModalOpen ? 'Save Changes' : 'Create Organization'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 border border-border shadow-2xl space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2 border border-red-100">
                <Trash2 size={32} />
              </div>
              <Typography variant="h3" className="mb-0">Delete Organization?</Typography>
              <Typography variant="p" className="text-muted-foreground text-sm leading-relaxed">
                You are about to delete <strong>{selectedCompany?.name}</strong>. This action will permanently remove all associated data. This cannot be undone.
              </Typography>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 font-bold" onClick={() => setIsDeleteModalOpen(false)}>No, keep it</Button>
              <Button variant="destructive" className="flex-1 font-bold bg-red-600 hover:bg-red-700 shadow-md" onClick={handleDelete}>Yes, delete it</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
