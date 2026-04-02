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
  CheckCircle2
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
      <div className="flex justify-between items-center mb-2">
        <Typography variant="h2" display>Company Management</Typography>
        <Button variant="primary" onClick={() => { setFormData({ name: '', domain: '' }); setIsModalOpen(true); }}>
          <Plus size={18} />
          Add Company
        </Button>
      </div>
      
      {successMessage && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 9999, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <CheckCircle2 size={20} color="#10B981" />
          <span style={{ fontWeight: '500', fontSize: '14px' }}>{successMessage}</span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search companies..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 pl-4 pr-10 rounded-lg border border-border bg-background text-sm appearance-none cursor-pointer min-w-[140px] outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {filteredCompanies.length === 0 ? (
           <div className="p-12 text-center text-muted-foreground">
              <Typography variant="p">No companies found.</Typography>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Company Name</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Created Date</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Admin Count</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-base">{company.name}</div>
                      <div className="text-xs text-muted-foreground">{company.domain}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{company.createdDate}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-muted rounded-full text-[10px] font-bold">
                        {company.adminCount} ADMINS
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                        company.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="icon"
                          onClick={() => openEdit(company)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => openDelete(company)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Company Modal */}
      {(isModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1100]">
          <Card className="w-[480px] p-0 overflow-hidden shadow-2xl">
            <CardHeader className="flex flex-row justify-between items-center border-b p-6">
              <CardTitle>{isEditModalOpen ? 'Edit Company' : 'Create Company'}</CardTitle>
              <button 
                onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Typography variant="small" className="font-bold uppercase tracking-widest mb-2 block">NAME</Typography>
                  <Input 
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {!formData.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                </div>
                <div>
                  <Typography variant="small" className="font-bold uppercase tracking-widest mb-2 block">DOMAIN</Typography>
                  <Input 
                    placeholder="e.g. company.com"
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  disabled={!formData.name}
                  onClick={isEditModalOpen ? handleEdit : handleCreate}
                >
                  {isEditModalOpen ? 'Save Changes' : 'Create Company'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1100]">
          <Card className="w-[400px] p-6 shadow-2xl">
            <Typography variant="h3" className="mb-2">Delete Company</Typography>
            <Typography variant="p" className="text-muted-foreground mb-6">
              Are you sure you want to delete <strong>{selectedCompany?.name}</strong>? This action cannot be undone.
            </Typography>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="bg-red-500 hover:bg-red-600 border-none" onClick={handleDelete}>
                Delete Company
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
