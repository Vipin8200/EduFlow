import React, { useState } from 'react';
import {
    UsersRound, Plus, Search, Filter,
    MoreVertical, UserCheck, Shield, Key,
    Edit2, Trash2, ChevronRight, Info,
    Layout, Database, Activity, ShieldCheck,
    Lock, UserPlus
} from 'lucide-react';

const mockRoles = [
    { id: 1, name: 'Super Administrator', users: 3, level: 'Level 10', status: 'Core', color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, name: 'Academic Faculty', users: 84, level: 'Level 05', status: 'Active', color: 'text-[#C29543]', bg: 'bg-orange-50' },
    { id: 3, name: 'Student Resident', users: 382, level: 'Level 01', status: 'Active', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 4, name: 'Accountant', users: 5, level: 'Level 04', status: 'Locked', color: 'text-gray-900', bg: 'bg-gray-100' },
];

const RoleManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Role Architecture</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Define authority levels, hierarchical clusters, and primary user associations.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-[10px] hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Design New Role Class
                </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Authority Tiers', val: '12 Levels', icon: <Shield />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Active Perm Sets', val: '45 Sets', icon: <Key />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'System Admins', val: '4 Total', icon: <UserCheck />, color: 'text-red-500', bg: 'bg-red-50/50' },
                    { label: 'Security Health', val: 'Robust', icon: <ShieldCheck />, color: 'text-gray-950', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[20px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                            {React.cloneElement(s.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Authority Model Registry..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Flat Overview</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Deep Hierarchy</button>
                </div>
            </div>

            {/* Role Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-in fade-in zoom-in-95 duration-500 font-sans">
                {mockRoles.map(role => (
                    <div key={role.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden relative border-b-8 border-b-gray-50 hover:border-b-[#C29543] flex flex-col items-center p-8 text-center hover:shadow-2xl hover:shadow-orange-100/30">
                        <div className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-300 rounded-xl group-hover:text-gray-950 transition-colors cursor-pointer"><MoreVertical size={14} /></div>

                        <div className="relative mb-6">
                            <div className={`w-20 h-20 shadow-xl rounded-[28px] flex items-center justify-center ${role.color} ${role.bg} group-hover:scale-110 transition-transform duration-500 border-4 border-white`}>
                                <UsersRound size={32} />
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-gray-900 italic tracking-tight uppercase underline decoration-gray-50 decoration-8 underline-offset-[-2px] group-hover:decoration-orange-100 transition-all mb-1">{role.name}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-6">{role.level} Authorization</p>

                        <div className="w-full space-y-4 mb-8">
                            <div className="p-4 bg-gray-50 rounded-[28px] border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-all">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Assigned Entities</p>
                                <p className="text-xl font-black text-gray-900 italic tracking-tight">{role.users} Users</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <button className="py-3.5 bg-gray-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200 flex items-center justify-center gap-2 active:scale-95"><UserPlus size={12} /> Assign</button>
                            <button className="py-3.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:border-[#C29543] transition-all active:scale-95">Edit</button>
                        </div>
                    </div>
                ))}

                <div className="bg-orange-50/20 p-12 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100 group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#C29543] mb-6 shadow-xl shadow-orange-50 rotate-[-4deg] group-hover:rotate-0 transition-transform border border-orange-50">
                        <Plus size={32} />
                    </div>
                    <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-lg underline decoration-orange-100 decoration-4 mb-2">Create Authority</h4>
                    <p className="text-[11px] font-bold text-gray-400 max-w-[180px] leading-relaxed uppercase tracking-tighter italic">Define specialized user roles for institutional access control.</p>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] transform rotate-12 -translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px] border border-white/10"><Lock size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Security Baseline Index</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Institutional role management provides the primary security baseline. All role-user assignments are auditable through the forensic logs, ensuring zero-breach integrity for high-authority clusters.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Audit Trail
                </button>
            </div>
        </div>
    );
};

export default RoleManagement;
