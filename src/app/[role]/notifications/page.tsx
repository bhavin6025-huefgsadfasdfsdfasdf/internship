"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default function NotificationsPage() {
  const currentRoleMatch = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'employee';

  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      message: "Server CPU usage exceeded 90% threshold",
      time: "2 mins ago",
      unread: true,
      icon: <AlertCircle className="w-5 h-5 text-red-500" />
    },
    {
      id: 2,
      type: "message",
      message: "Sarah commented on your task 'Update Landing Page'",
      time: "1 hour ago",
      unread: true,
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />
    },
    {
      id: 3,
      type: "success",
      message: "Weekly timesheet approved by Manager",
      time: "Yesterday, 3:45 PM",
      unread: false,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
    },
    {
      id: 4,
      type: "system",
      message: "System maintenance scheduled for coming weekend",
      time: "Oct 12, 10:00 AM",
      unread: false,
      icon: <Bell className="w-5 h-5 text-gray-500" />
    }
  ]);

  const handleMarkAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id: number) => {
    console.log(`Redirecting to detail page for notification ${id}`);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const filteredNotifications = notifications.filter(n => filter === "all" ? true : n.unread);

  return (
    <div className="w-full max-w-[900px] mx-auto py-8 px-4 flex flex-col gap-6">
      
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === "unread" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Unread
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleMarkAsRead}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Mark as read
          </button>
          <button 
            onClick={handleClearAll}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="flex flex-col divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`flex items-start md:items-center gap-4 p-5 cursor-pointer transition-colors hover:bg-gray-50 ${
                  notification.unread ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="shrink-0 mt-1 md:mt-0">
                  {notification.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base ${notification.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {notification.message}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.time}
                  </span>
                  {notification.unread ? (
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1 md:mt-0"></div>
                  ) : (
                    <div className="w-2.5 h-2.5 bg-transparent rounded-full mt-1 md:mt-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              {filter === "unread" 
                ? "You have read all your notifications. You're all caught up!" 
                : "You don't have any notifications right now."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
