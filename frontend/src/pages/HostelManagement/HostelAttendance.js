import React, { useState } from 'react';
import {
    UserCheck, Search, Filter,
    Moon, Sun, Clock, CheckCircle2,
    XCircle, Calendar, AlertTriangle,
    ShieldCheck, BellRing, ChevronRight,
    Info, Layout, Fingerprint, Activity
} from 'lucide-react';

const mockAttendance = [
    { id: 1, name: 'Aarav Sharma', room: '101', status: 'Marked', time: '09:15 PM' },
    { id: 2, name: 'Ishani Gupta', room: '202', status: 'Pending', time: '-' },
    { id: 3, name: 'Kabir Singh', room: '101', status: 'Marked', time: '09:20 PM' },
    { id: 4, name: 'Suhani Verma', room: '304', status: 'On Leave', time: '-' },
];

const HostelAttendance = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Dormitory Night-Audit & Roll-Call</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Perform synchronized attendance for primary and late-night verification cycles.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Fingerprint size={14} /> Commit Audit</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><BellRing size={14} /> Broadcast Alert</button>
                </div>
            </div>

            {/* Attendance Metrics Recap */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Residents', val: '382', icon: <UserCheck />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Present Log', val: '354', icon: <CheckCircle2 />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Active Leaves', val: '18 Units', icon: <Calendar />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Pending Audit', val: '10 Missed', icon: <Activity />, color: 'text-red-500', bg: 'bg-red-50/50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Dashboard Center */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative transition-all">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Resident UID or Room..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Wing A (Dorm-1)</option>
                            <option>Wing B (Dorm-2)</option>
                        </select>
                        <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl">
                            <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1.5"><Sun size={12} /> Entry</button>
                            <button className="px-4 py-2 text-gray-400 hover:text-gray-900 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5"><Moon size={12} /> Night</button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200">Session Reset</button>
                </div>
            </div>

            {/* Attendance Roster Grid/Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                    <UserCheck size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Physical Count Roster</h3>
                    <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Fingerprint size={18} /></div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic font-black uppercase tracking-widest">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400">Resident Identity</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Unit Location</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Checkpoint Stamp</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Verification Status</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockAttendance.map(resident => (
                                <tr key={resident.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-300 group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all shadow-sm">UID</div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{resident.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Registered Resident @ {resident.room}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full">Room #{resident.room}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center px-10 py-5">
                                        <div className="inline-flex flex-col items-center">
                                            <span className={`text-[11px] font-black uppercase tracking-widest italic ${resident.time === '-' ? 'text-gray-300' : 'text-[#C29543] underline decoration-orange-100 decoration-4 underline-offset-4'}`}>{resident.time === '-' ? 'No Stamp' : resident.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center justify-center gap-3">
                                            {resident.status === 'Marked' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><CheckCircle2 size={16} className="text-green-500" /> <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic tracking-widest">Verified Internally</span></span>
                                            ) : resident.status === 'On Leave' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><Calendar size={16} className="text-[#C29543]" /> <span className="text-[10px] font-black text-[#C29543] uppercase tracking-widest italic">Authorized Absent</span></span>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <button className="px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 hover:bg-green-600 hover:text-white transition-all shadow-sm">Mark In</button>
                                                    <button className="px-4 py-1.5 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm">Declare Missing</button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 transition-colors shadow-sm bg-white"><AlertTriangle size={16} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black transition-colors shadow-sm bg-white"><ChevronRight size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] skew-x-12 translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[24px]"><ShieldCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Security Protocol Integrity</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl italic">Hostel attendance logs are automatically cross-audited against biometric entry points. Any unauthorized absenteeism after 10:00 PM triggers an Immediate Escalation Alert to institutional security and residential heads.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Audit Trail
                </button>
            </div>
        </div>
    );
};

export default HostelAttendance;
