import React, { useState } from "react";
import { Building2, MonitorSmartphone, Smartphone, AlertCircle } from "lucide-react";

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    instituteName: "Global International School",
    adminName: "Rakesh Sharma",
    contact: "+91 98765 43210",
    email: "admin@globalschool.edu.in",
    address: "123, Education Hub Road, Knowledge Park II, Tech City - 400001",
  });

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotif: true,
    smsNotif: true,
    pushNotif: false,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Management</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Manage your institute information, security, and preferences.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
          <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-[#0a0a0a] text-white font-semibold hover:bg-black transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* --- Section 1: Personal Information --- */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Column Text */}
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-500 text-sm">Update your institute details and primary administrator contact information.</p>
        </div>

        {/* Right Column Form Card */}
        <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {/* Logo Upload Area */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-xl bg-[#f4f5f8] flex items-center justify-center border border-gray-100 flex-shrink-0">
              <Building2 size={32} className="text-gray-400" />
            </div>
            <div>
              <button className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors mb-2">
                Upload Logo
              </button>
              <p className="text-xs text-gray-400 font-medium">Recommended size 256x256px. JPG, PNG or GIF.</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">Institute Name</label>
              <input
                type="text"
                value={personalInfo.instituteName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, instituteName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">Admin Name</label>
              <input
                type="text"
                value={personalInfo.adminName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, adminName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">Contact Number</label>
              <input
                type="text"
                value={personalInfo.contact}
                onChange={(e) => setPersonalInfo({ ...personalInfo, contact: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">Email Address</label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 text-gray-800"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-800">Address</label>
              <textarea
                rows="3"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 text-gray-800 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      {/* --- Section 2: Login & Security --- */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Login & Security</h2>
          <p className="text-gray-500 text-sm">Manage your password, two-factor authentication, and active sessions.</p>
        </div>

        <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">

          {/* Change Password */}
          <div>
            <label className="text-sm font-bold text-gray-800 block mb-3">Change Password</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="password" placeholder="Current Password" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 placeholder-gray-400" />
              <input type="password" placeholder="New Password" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]/50 placeholder-gray-400" />
              <button className="px-5 py-2.5 rounded-lg border border-gray-300 font-bold text-gray-800 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                Update
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* 2FA Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-800 text-[15px]">Enable Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account using an authenticator app.</p>
            </div>
            {/* Custom Toggle inside */}
            <button
              onClick={() => handleToggle('twoFactor')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${toggles.twoFactor ? 'bg-[#d4aa54]' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Device Management */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 text-[15px]">Device Management & Activity</h3>
              <button className="text-sm font-semibold text-[#C29543] hover:text-[#b08538]">Sign out all devices</button>
            </div>

            {/* Device Table/List */}
            <div className="space-y-4">
              {/* Header Row */}
              <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <div className="col-span-6">Device</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-2">Last Active</div>
                <div className="col-span-1">Status</div>
              </div>

              {/* Device 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center py-2 sm:py-0">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <MonitorSmartphone size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-[14px]">MacBook Pro (Chrome)</p>
                    <p className="text-xs text-gray-400">IP: 192.168.1.1</p>
                  </div>
                </div>
                <div className="col-span-3 text-sm text-gray-600 sm:block flex justify-between">
                  <span className="sm:hidden font-semibold">Location:</span> Mumbai, India
                </div>
                <div className="col-span-2 text-sm text-gray-600 sm:block flex justify-between">
                  <span className="sm:hidden font-semibold">Last Active:</span> Current Session
                </div>
                <div className="col-span-1 sm:block flex justify-end mt-2 sm:mt-0">
                  <span className="inline-flex px-2.5 py-1 rounded bg-green-50 text-[#34a853] text-xs font-bold">Active Now</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 my-2"></div>

              {/* Device 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center py-2 sm:py-0">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Smartphone size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-[14px]">iPhone 13 Pro (Safari)</p>
                    <p className="text-xs text-gray-400">IP: 10.0.0.45</p>
                  </div>
                </div>
                <div className="col-span-3 text-sm text-gray-600 sm:block flex justify-between">
                  <span className="sm:hidden font-semibold">Location:</span> Delhi, India
                </div>
                <div className="col-span-2 text-sm text-gray-600 sm:block flex justify-between">
                  <span className="sm:hidden font-semibold">Last Active:</span> 2 hours ago
                </div>
                <div className="col-span-1 sm:block flex justify-end mt-2 sm:mt-0">
                  <span className="inline-flex px-2.5 py-1 rounded bg-gray-100 text-gray-500 text-xs font-bold">Offline</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 text-[#ef4444] bg-red-50/50 hover:bg-red-50 font-bold text-sm transition-colors w-full sm:w-auto justify-center">
                <AlertCircle size={16} />
                Force Password Reset on Next Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      {/* --- Section 3: Notification Settings --- */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Settings</h2>
          <p className="text-gray-500 text-sm">Choose how you want to be notified about important institute activities.</p>
        </div>

        <div className="lg:w-2/3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <div className="flex flex-col gap-6">
            {/* Email Notif */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-[15px]">Email Notifications</h3>
                <p className="text-sm text-gray-400 mt-1">Receive daily summaries and critical alerts via email.</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotif')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${toggles.emailNotif ? 'bg-[#d4aa54]' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.emailNotif ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            {/* SMS Notif */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-[15px]">SMS Notifications</h3>
                <p className="text-sm text-gray-400 mt-1">Receive urgent alerts like fee collection drops or severe attendance issues via SMS.</p>
              </div>
              <button
                onClick={() => handleToggle('smsNotif')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${toggles.smsNotif ? 'bg-[#d4aa54]' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.smsNotif ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            {/* Push Notif */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-[15px]">Push Notifications</h3>
                <p className="text-sm text-gray-400 mt-1">Receive real-time notifications in your browser or mobile app.</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotif')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${toggles.pushNotif ? 'bg-[#d4aa54]' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.pushNotif ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}