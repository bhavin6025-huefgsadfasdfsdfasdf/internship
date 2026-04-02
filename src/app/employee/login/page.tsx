"use client";

import React, { useState } from "react";
import { Users, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function EmployeeLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    login('employee', { email, name: 'Employee User' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(25,133,161,0.05),transparent_50%)] pointer-events-none" />
      
      <Card className="w-full max-w-md border-border/50 shadow-2xl shadow-black/10" variant="glass" hoverable={false}>
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold uppercase tracking-[0.2em]">
            <Users size={32} strokeWidth={1.5} />
          </div>
          <CardTitle className="text-2xl italic tracking-tighter">Employee Portal</CardTitle>
          <CardDescription>Access your workspace, tasks, and personal records</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                <Input
                  type="email"
                  placeholder="name@company.com"
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
                  placeholder="Your Password"
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
              Access Workspace
            </Button>

            <div className="pt-6 mt-6 border-t border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center text-primary/40 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-medium leading-relaxed">
                <strong>Personal Data Protection:</strong> Your session is encrypted. Always remember to log out on shared terminals.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.4em]">
        Standard Employee Terminal
      </p>
    </div>
  );
}
