import React, { useState } from 'react';
import {
    CheckCircle2, XCircle, Search, Filter,
    Calendar, Clock, User, ArrowRight,
    Users, AlertCircle, ShieldAlert
} from 'lucide-react';

const MarkAttendance = () => {
    const students = [
        { id: '101', name: 'Rahul Mevada', roll: '01', status: 'Present' },
        { id: '102', name: 'Sneha Patel', roll: '02', status: 'Present' },
        { id: '103', name: 'Arjun Singh', roll: '03', status: 'Absent' },
        { id: '104', name: 'Priya Sharma', roll: '04', status: 'Pending' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Session Log Commitment</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Execute daily pedagogical presence tracking across assigned academic clusters.</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm items-center gap-6">
                    <div className="flex items-center gap-3 px-4 border-r border-gray-50">
                        <Calendar size={18} className="text-[#C29543]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-950">March 19, 2026</span>
                    </div>
                    <div className="flex items-center gap-3 px-4">
                        <Clock size={18} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-950">1st Period (09:00 AM)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Statistics Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-150 transition-transform duration-700 font-black text-9xl leading-none italic select-none">%</div>
                        <h4 className="text-[10px] font-black uppercase italic tracking-[3px] text-[#C29543] mb-2">Class Presence Ratio</h4>
                        <p className="text-5xl font-black tracking-tight italic mb-4">92.4%</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">System benchmark target is 95%. Current cluster health is optimized.</p>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-orange-100 shadow-xl space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-[#C29543]/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Unit Capacity</span>
                            <span className="text-sm font-black text-gray-900">42 Students</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Logged Present</span>
                            <span className="text-sm font-black text-green-600">38 Units</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Logged Absent</span>
                            <span className="text-sm font-black text-red-600">04 Units</span>
                        </div>
                    </div>
                </div>

                {/* Mark Table Panel */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden relative border-t-8 border-t-[#C29543]">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><Users size={20} /></div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 italic tracking-tight uppercase underline decoration-blue-50 decoration-8 underline-offset-[-2px]">Grade 10-A Registry</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Presence Commitment Canvas</p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-[3px] hover:bg-[#C29543] transition-all shadow-lg active:scale-95">Bulk Present All</button>
                        </div>

                        <div className="p-8">
                            <div className="space-y-4">
                                {students.map((std, i) => (
                                    <div key={std.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50/50 rounded-3xl border border-transparent hover:border-orange-100 hover:bg-white transition-all group cursor-pointer shadow-sm">
                                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-300 text-[10px] group-hover:bg-[#C29543]/10 group-hover:text-[#C29543] transition-all">{std.roll}</div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-900 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{std.name}</h4>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global ID: {std.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${std.status === 'Present' ? 'bg-green-600 text-white' : 'bg-white text-gray-300 hover:bg-green-50 hover:text-green-500 border border-gray-100'}`}>
                                                <CheckCircle2 size={20} />
                                            </button>
                                            <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${std.status === 'Absent' ? 'bg-red-500 text-white' : 'bg-white text-gray-300 hover:bg-red-50 hover:text-red-500 border border-gray-100'}`}>
                                                <XCircle size={20} />
                                            </button>
                                            <div className="w-[100px] text-center ml-2">
                                                <span className={`text-[10px] font-black uppercase italic tracking-widest ${std.status === 'Present' ? 'text-green-600' : std.status === 'Absent' ? 'text-red-500' : 'text-gray-300'}`}>
                                                    {std.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-gray-900 rounded-[35px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black italic text-8xl leading-none group-hover:scale-110 transition-transform select-none">COMMIT</div>
                                <div className="space-y-2 relative z-10 text-center md:text-left">
                                    <h4 className="text-xl font-black italic tracking-[4px] uppercase text-[#C29543]">Finalize Commitment</h4>
                                    <p className="text-[10px] font-medium text-gray-400 max-w-sm italic leading-relaxed uppercase tracking-widest">This action will sync session presence to the temporal master registry and notify parent terminal nodes.</p>
                                </div>
                                <button className="px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[5px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                                    Final Sync Matrix
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;
