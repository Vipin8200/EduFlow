import React, { useState } from 'react';
import {
    Plane, Plus, Search, Filter,
    Clock, CheckCircle2, XCircle, Calendar,
    FileText, User, Home, MapPin,
    MoreVertical, ArrowRight, Info, Layout,
    ShieldCheck, Activity, Share2, ClipboardList
} from 'lucide-react';

const mockLeaves = [
    { id: 1, name: 'Aarav Sharma', room: '101', type: 'Weekend Leave', destination: 'Local Home', period: 'Mar 24 - Mar 26', status: 'Pending' },
    { id: 2, name: 'Ishani Gupta', room: '202', type: 'Medical Outing', destination: 'City Medical', period: 'Mar 22 (Full Day)', status: 'Approved' },
    { id: 3, name: 'Kabir Singh', room: '101', type: 'Vacation', destination: 'Outstation', period: 'Mar 30 - Apr 05', status: 'Rejected' },
];

const LeaveManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Dormitory Exits</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Regulate residential leaves, specialized outings, and night-stay authorizations.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Request Leave
                </button>
            </div>

            {/* Quick Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Exit ID or Resident..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Status: All Requests</option>
                            <option>Status: Pending</option>
                            <option>Status: Approved</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Pending Desk</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Historical Log</button>
                </div>
            </div>

            {/* Leave Requests Roster Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                    <Plane size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Authorized Exit Queue</h3>
                    <div className="flex gap-3">
                        <div className="p-2.5 bg-white border border-gray-100 text-[#C29543] rounded-2xl shadow-sm"><ClipboardList size={20} /></div>
                    </div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic font-black uppercase tracking-widest">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest">Exit Identity</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest text-center">Trajectory (Dest)</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest text-center">Authorization Cycle</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest text-center">Current Status</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockLeaves.map(leave => (
                                <tr key={leave.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-[18px] group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all shadow-sm">{leave.type === 'Vacation' ? <Plane size={18} /> : <Home size={18} />}</div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{leave.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{leave.type} Request @ Room {leave.room}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center px-10 py-5">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full flex items-center gap-2"><MapPin size={10} className="text-[#C29543]" /> {leave.destination}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[11px] font-black text-[#C29543] uppercase tracking-widest italic underline decoration-orange-100 decoration-4 underline-offset-4">{leave.period}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center justify-center gap-3">
                                            {leave.status === 'Approved' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><CheckCircle2 size={16} className="text-green-500" /> <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic tracking-widest">Authorized</span></span>
                                            ) : leave.status === 'Rejected' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><XCircle size={16} className="text-red-400" /> <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">Declined</span></span>
                                            ) : (
                                                <div className="flex gap-2 animate-pulse">
                                                    <button className="px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 hover:bg-green-600 hover:text-white transition-all shadow-sm group-hover:scale-105">Approve</button>
                                                    <button className="px-4 py-1.5 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:scale-105">Deny</button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 transition-colors shadow-sm bg-white"><FileText size={16} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black transition-colors shadow-sm bg-white"><Share2 size={16} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-gray-950 transition-colors shadow-sm bg-white"><MoreVertical size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-20 transition-transform duration-1000 group-hover:rotate-0"></div>
                <div className="flex-1 space-y-4 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[24px]"><ShieldCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Residential Guard Rails</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">All exit requests are cross-verified with parent authorization protocols via the Institutional Portal. Approved outings generate a Unique Exit QR that must be scanned by institutional security upon departure and return.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Audit Exit Protocols
                </button>
            </div>
        </div>
    );
};

export default LeaveManagement;
