"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Shield,
  Building2,
  Calendar,
  Lock
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface UserCreateFormProps {
  type: "manager" | "employee";
  onSuccess?: () => void;
}

export default function UserCreateForm({ type, onSuccess }: UserCreateFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  if (submitted) {
    return (
      <Card className="animate-in fade-in zoom-in duration-500">
        <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 size={32} />
          </div>
          <CardTitle className="text-2xl mb-2">Registration Successful</CardTitle>
          <CardDescription className="max-w-xs mx-auto">
            The {type} profile has been initialized. Temporary credentials have been sent to their enterprise email.
          </CardDescription>
          <Button 
            onClick={() => setSubmitted(false)} 
            className="mt-8 gap-2"
          >
            Create Another <ArrowRight size={16} />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          {type === "manager" ? <Shield size={24} /> : <User size={24} />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground capitalize">Initialize New {type}</h2>
          <p className="text-sm text-muted-foreground">Fill in the professional profile details below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input placeholder="John Doe" className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input type="email" placeholder="john.doe@company.com" className="pl-10 h-11" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Department</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input placeholder="Engineering" className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Designation</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input placeholder={type === "manager" ? "Senior Lead" : "Associate Developer"} className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Join Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input type="date" className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Temporary Token</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4" />
                <Input type="password" placeholder="••••••••" className="pl-10 h-11" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-2 flex flex-col gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              By submitting this form, you are creating a new production account. The user will be required to change their password on first login.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="h-12 w-full text-sm font-semibold gap-2 shadow-lg shadow-primary/20"
            disabled={loading}
          >
            {loading ? "Initializing Core Profile..." : `Register ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </Button>
        </div>
      </form>
    </div>
  );
}
