"use client";

import React, { useState } from "react";
import {
  Bell,
  ChevronRight,
  Save,
  RotateCcw,
  Building,
  Mail,
  Fingerprint,
  Globe,
  Clock,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

export default function SettingsPage() {
  const params = useParams();
  const role = (params?.role as string) || "user";
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSaveSettings = () => {
    showSuccess("Settings saved successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {successMessage && (
        <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl flex items-center gap-3 z-50 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-green-500" />
          <span className="font-bold text-sm">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <Typography
          variant="h2"
          className="text-3xl font-bold tracking-tight text-slate-900"
        >
          Settings
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-2 font-medium">
          Configure your personal preferences and workspace settings.
        </Typography>
      </div>

      <div className="grid gap-8">
        {/* Section 1: Workspace Profile */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Typography
              variant="h4"
              className="text-lg font-bold text-slate-800"
            >
              Workspace Profile
            </Typography>
            <Typography
              variant="small"
              className="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
            >
              GENERAL SETUP AND ORGANIZATION BRANDING.
            </Typography>
          </div>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    Organization Name
                  </span>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[200px] text-right">
                  InternSync Pro
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    Admin Email
                  </span>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[200px] text-right">
                  hr@internsync.com
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    Workspace ID
                  </span>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[200px] text-right">
                  tenant-1
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    Default Timezone
                  </span>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[260px] text-right">
                  UTC +5:30 (Chennai, Mumbai)
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 2: Attendance Rules */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Typography
              variant="h4"
              className="text-lg font-bold text-slate-800"
            >
              Attendance Rules
            </Typography>
            <Typography
              variant="small"
              className="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
            >
              DEFINE WORLD-CLASS WORK HOURS AND LATE THRESHOLDS.
            </Typography>
          </div>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <span className="text-sm font-bold text-slate-700">
                  Standard Shift Start
                </span>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[120px] text-center">
                  09:00 AM
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <span className="text-sm font-bold text-slate-700">
                  Grace Period
                </span>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[120px] text-center">
                  15 minutes
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <span className="text-sm font-bold text-slate-700">
                  Automatic Absenteeism
                </span>
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 min-w-[120px] text-center">
                  After 11:30 AM
                </div>
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <span className="text-sm font-bold text-slate-700">
                  Enable weekend tracking
                </span>
                <Switch
                  defaultChecked={false}
                  className="data-[state=checked]:bg-[#0891B2]"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: Communication */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Typography
              variant="h4"
              className="text-lg font-bold text-slate-800"
            >
              Communication
            </Typography>
            <Typography
              variant="small"
              className="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
            >
              CONFIGURE HIGH-PRIORITY EMAIL AND SYSTEM ALERTS.
            </Typography>
          </div>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    Daily Attendance Digest
                  </p>
                </div>
                <Switch
                  defaultChecked={true}
                  className="data-[state=checked]:bg-[#0891B2]"
                />
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    Instant Late-Arrival Alerts
                  </p>
                </div>
                <Switch
                  defaultChecked={true}
                  className="data-[state=checked]:bg-[#0891B2]"
                />
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    Weekly Performance Insights
                  </p>
                </div>
                <Switch
                  defaultChecked={true}
                  className="data-[state=checked]:bg-[#0891B2]"
                />
              </div>

              <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">
                    New Onboarding Notifications
                  </p>
                </div>
                <Switch
                  defaultChecked={false}
                  className="data-[state=checked]:bg-[#0891B2]"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            className="h-11 px-8 font-bold text-slate-600 border-slate-200 hover:bg-slate-50"
          >
            Discard Changes
          </Button>
          <Button
            className="h-11 px-8 font-bold bg-[#0891B2] hover:bg-[#0E7490] text-white flex items-center gap-2"
            onClick={handleSaveSettings}
          >
            <CheckCircle2 size={18} />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
