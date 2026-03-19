import React, { useState } from 'react';
import {
    ClipboardCheck, Search, Filter,
    Bus, User, Clock, CheckCircle2,
    XCircle, Calendar, AlertTriangle,
    Send, ChevronRight, Info, Layout,
    Radio, Activity, ShieldAlert
} from 'lucide-react';

const mockAttendance = [
    { id: 1, name: 'Aarav Sharma', grade: '10-A', stop: 'North Garden Gate', route: 'R-01', status: 'Marked' },
    { id: 2, name: 'Ishani Gupta', grade: '08-B', stop: 'Metro Pillar #42', route: 'R-02', status: 'Pending' },
    { id: 3, name: 'Kabir Singh', grade: '09-C', stop: 'Public Library', route: 'R-01', status: 'Marked' },
    { id: 4, name: 'Suhani Verma', grade: '10-A', stop: 'North Garden Gate', route: 'R-01', status: 'Absent' },
];

const TransportAttendance = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Dispatch Roll-Call & Transit Audit</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Real-time attendance tracking for morning and afternoon transport cycles.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Send size={14} /> Commit Attendance</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Radio size={14} /> Live Broadcast</button>
                </div>
            </div>

            {/* Attendance Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Expected Boarders', val: '412', icon: <Bus />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Marked Present', val: '385', icon: <CheckCircle2 />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Absent/Missing', val: '27', icon: <XCircle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                    { label: 'System Compliance', val: '94%', icon: <Activity />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(s.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Multi-Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Boarding UID or Name..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100 placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Route: R-01 North</option>
                            <option>Route: R-02 Metro</option>
                        </select>
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Morning Dispatch</option>
                            <option>Afternoon Dispatch</option>
                        </select>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Mark Active</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Bulk Absent</button>
                </div>
            </div>

            {/* Attendance Registry Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                    <ClipboardCheck size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Dispatch Status Log</h3>
                    <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><Bus size={20} /></div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 italic">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Boarder Identity</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Assigned Hub</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Dispatch Cycle</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Attendance Status</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-sans">
                            {mockAttendance.map(student => (
                                <tr key={student.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-300 group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all shadow-sm">UID</div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{student.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Grade {student.grade} — Bus Stop {student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full">{student.stop}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center px-10 py-5">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[11px] font-black text-[#C29543] uppercase tracking-widest italic underline decoration-orange-100 decoration-4">{student.route}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-3">
                                            {student.status === 'Marked' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><CheckCircle2 size={16} className="text-green-500" /> <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Boarded</span></span>
                                            ) : student.status === 'Absent' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><XCircle size={16} className="text-red-400" /> <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Cancelled</span></span>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <button className="px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 hover:bg-green-600 hover:text-white transition-all shadow-sm">Mark Present</button>
                                                    <button className="px-4 py-1.5 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm">Declare Absent</button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 transition-colors shadow-sm bg-white"><AlertTriangle size={16} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black transition-colors shadow-sm bg-white"><User size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-20 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-4 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><ShieldAlert size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Safety Audit Protocols</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">Transport attendance is cross-referenced with morning school gate logs. Any mismatch between "Bus Boarding" and "Classroom Entry" triggers an Immediate Institutional Alert to transportation heads and safety officers.</p>
                </div>
                <button className="px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Audit Logs
                </button>
            </div>
        </div>
    );
};

export default TransportAttendance;
