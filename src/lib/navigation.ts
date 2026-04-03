import { 
  Home,
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  MessageSquare, 
  FileUp, 
  Bot,
  Settings,
  HelpCircle,
  Users,
  Briefcase,
  Layers,
  Shield,
  FileText,
  Activity,
  Key,
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  { name: 'My Tasks', icon: CheckSquare, path: '/admin/tasks' },
  { name: 'Timesheet', icon: Clock, path: '/admin/timesheets' },
  { name: 'Discussions', icon: MessageSquare, path: '/admin/discussions' },
  { name: 'My Files', icon: FileUp, path: '/admin/files' },
  { name: 'AI Helper', icon: Bot, path: '/admin/ai-helper' },
];

export const SUPER_ADMIN_NAV_ITEMS = [
  { name: 'Global Control', icon: Shield, path: '/super-admin/dashboard' },
  { name: 'Company Management', icon: Briefcase, path: '/super-admin/company-management' },
  { name: 'Audit Logs', icon: FileText, path: '/super-admin/audit-logs' },
  { name: 'System Health', icon: Activity, path: '/super-admin/system-health' },
  { name: 'API Keys', icon: Key, path: '/super-admin/api-keys' },
  { name: 'Settings', icon: Settings, path: '/super-admin/settings' },
];

export const MANAGER_NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/manager/dashboard' },
  { name: 'Projects', icon: Briefcase, path: '/manager/projects' },
  { name: 'Tasks', icon: CheckSquare, path: '/manager/tasks' },
  { name: 'Timesheet Approval', icon: Layers, path: '/manager/timesheet-approval' },
  { name: 'Team Monitoring', icon: Users, path: '/manager/team' },
  { name: 'Discussions', icon: MessageSquare, path: '/manager/discussion' },
];

export const EMPLOYEE_NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/employee/dashboard' },
  { name: 'My Projects', icon: Briefcase, path: '/employee/projects' },
  { name: 'My Tasks', icon: CheckSquare, path: '/employee/tasks' },
  { name: 'My Timesheet', icon: Clock, path: '/employee/timesheet' },
  { name: 'Discussions', icon: MessageSquare, path: '/employee/discussion' },
];

export const COMMON_SUPPORT_ITEMS = [
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Help Center', icon: HelpCircle, path: '/help' },
];

// Fallback or specific support items per role if needed
export const ADMIN_SUPPORT_ITEMS = [
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
  { name: 'Help Center', icon: HelpCircle, path: '/admin/help' },
];
