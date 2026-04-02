"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Users, Briefcase, UserCog, Leaf, ArrowRight, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const roles = [
    { id: "super-admin", title: "Super Admin", icon: Shield, description: "System level control" },
    { id: "admin", title: "Admin", icon: UserCog, description: "Company management" },
    { id: "manager", title: "Manager", icon: Briefcase, description: "Team leadership" },
    { id: "employee", title: "Employee", icon: Users, description: "Daily workflow" },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Show success
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-4xl z-10">
        {/* Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-4 mb-12"
        >
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
            <Leaf size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Join NoteFlow</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mt-1 font-medium">
              Create your enterprise account
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">Select your workspace role</h2>
                <p className="text-sm text-muted-foreground mt-2">Choose the role that best defines your position in the organization.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="group"
                  >
                    <Card className="h-full hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative border-border/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-muted-foreground relative z-10">
                        <role.icon size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 relative z-10">{role.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4 relative z-10">{role.description}</p>
                      <div className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                        Select Role <ArrowRight size={12} />
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto w-full"
            >
              <Card variant="glass" className="border-border/50 shadow-2xl shadow-black/5">
                <CardHeader>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep(1)}
                    className="w-fit -ml-2 mb-4 text-muted-foreground hover:text-foreground"
                  >
                    Back to roles
                  </Button>
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <CardDescription>
                    Complete your details for the <span className="text-primary font-semibold">{roles.find(r => r.id === selectedRole)?.title}</span> role.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                        <Input
                          name="fullName"
                          placeholder="Full Name"
                          className="pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="Contact Email"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-primary" />
                        <Input
                          name="password"
                          type="password"
                          placeholder="Secure Password"
                          className="pl-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 mt-2 text-sm font-semibold tracking-wide">
                      Initialize Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto w-full text-center"
            >
              <Card variant="glass" className="py-12 px-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete</h2>
                <p className="text-muted-foreground mb-8">
                  Your account has been initialized successfully. Please proceed to login with your new credentials.
                </p>
                <Link href="/login">
                  <Button className="w-full h-11">
                    Continue to Login
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Link */}
        {step !== 3 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </motion.p>
        )}
      </div>

      <p className="absolute bottom-6 text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.4em]">
        © 2026 NoteFlow AI Systems • Secure Enrollment
      </p>
    </div>
  );
}
