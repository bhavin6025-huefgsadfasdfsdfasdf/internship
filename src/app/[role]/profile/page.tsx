"use client";

import React, { useState } from "react";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState({
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Lane, San Francisco, CA",
    role: "Senior Developer",
    company: "TechCorp Inc.",
    joinDate: "Jan 15, 2023",
    lastLogin: "Today, 09:41 AM",
  });

  const [editForm, setEditForm] = useState(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!editForm.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!editForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email))
      newErrors.email = "Invalid email format";
    if (!editForm.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const currentRoleMatch =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "employee";

  const handleSave = () => {
    if (validateForm()) {
      setUser(editForm);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold uppercase shrink-0">
            {user.fullName.charAt(0)}
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.fullName}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md uppercase tracking-wide">
                {user.role}
              </span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setEditForm(user);
            setIsEditModalOpen(true);
          }}
          className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          Edit Profile
        </button>
      </div>

      {/* Middle Section - 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Personal Info
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Full Name
              </p>
              <p className="text-gray-900">{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Phone</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Address
              </p>
              <p className="text-gray-900">
                {user.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Account Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Account Info
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Role</p>
              <p className="text-gray-900">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Company
              </p>
              <p className="text-gray-900">{user.company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Join Date
              </p>
              <p className="text-gray-900">{user.joinDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Last Login
              </p>
              <p className="text-gray-900">{user.lastLogin}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Activity Summary
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-900 font-medium">Logged in</span>
              <span className="text-gray-500">Today, 09:41 AM</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-900 font-medium">
                Updated task status
              </span>
              <span className="text-gray-500">Yesterday, 04:30 PM</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-900 font-medium">
                Uploaded a file
              </span>
              <span className="text-gray-500">Mar 28, 11:20 AM</span>
            </div>
          </div>
        </div>

        {/* Right: Security & Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Security
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">
                Password Management
              </p>
              <p className="text-sm text-gray-600 mb-4">
                You should change your password regularly to prevent
                unauthorized access to your account.
              </p>
              <button className="px-4 py-2 border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow"
                />
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 font-medium rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
