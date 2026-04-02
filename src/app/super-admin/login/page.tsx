"use client";

import React, { useState } from "react";
import { Shield, Mail, Lock, Eye, EyeOff, Building2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function SuperAdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !company) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    login('super-admin', { email, name: 'Super Admin', company });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(25,133,161,0.05),transparent_50%)] pointer-events-none" />
      
      <Card className="w-full max-w-md border-border/50 shadow-2xl shadow-black/10" variant="glass" hoverable={false}>
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Shield size={32} strokeWidth={1.5} />
          </div>
          <CardTitle className="text-2xl italic tracking-tighter">System Authority</CardTitle>
          <CardDescription>Root Access Terminal for NoteFlow Infrastructure</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Company Selection */}
            <div className="space-y-2">
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                <select
                  className="w-full bg-background border border-border h-10 pl-10 pr-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  <option value="" disabled>Identification Entity</option>
                  <option value="corp-a">Corporation Alpha</option>
                  <option value="corp-b">Corporation Beta</option>
                  <option value="corp-c">Corporation Gamma</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                <Input
                  type="email"
                  placeholder="master@noteflow.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Infrastructure Secret"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] font-bold text-rose-500 uppercase tracking-widest pl-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button type="submit" className="w-full h-11 mt-4">
              Authorize Root Access
            </Button>

            <div className="pt-6 mt-6 border-t border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center text-primary/40 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-medium leading-relaxed">
                <strong>Hyper-Secure Session:</strong> End-to-end encrypted root access. All system-wide modifications require identification.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.4em]">
        Master Control Interface
      </p>
    </div>
  );
}
