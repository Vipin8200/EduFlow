import React, { useState } from 'react';
import {
    Clock, Plus, Trash2, Edit2,
    Save, Filter, ChevronRight, Info,
    CheckCircle2, ListChecks, LayoutList,
    Coffee, Sun, Moon
} from 'lucide-react';

const mockPeriods = [
    { id: 1, name: 'First Period', start: '08:00 AM', end: '08:45 AM', type: 'Academic', status: 'Active' },
    { id: 2, name: 'Second Period', start: '08:45 AM', end: '09:30 AM', type: 'Academic', status: 'Active' },
    { id: 3, name: 'Morning Recess', start: '09:30 AM', end: '09:45 AM', type: 'Break', status: 'Fixed' },
    { id: 4, name: 'Third Period', start: '09:45 AM', end: '10:30 AM', type: 'Academic', status: 'Active' },
];

const PeriodSetup = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Academic Period Configuration</h1>
                <p className="text-sm text-gray-500 font-medium">Define the core daily schedule and time slots for institutional activities.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Creation Form */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 self-start border-b-8 border-b-[#C29543]/10">
                    <div className="flex items-center gap-3 pb-6 border-b border-gray-50">
                        <div className="p-3 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><Plus size={24} /></div>
                        <h3 className="font-black text-xl text-gray-900 italic tracking-tight uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-[-4px]">Create Period</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Period Title</label>
                            <input type="text" placeholder="e.g. Zero Hour" className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543] focus:bg-white transition-all italic" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Start Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                    <input type="time" className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">End Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                    <input type="time" className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Slot Category</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 px-4 bg-[#C29543] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100">Academic</button>
                                <button className="py-3 px-4 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-gray-900 transition-all">Break / recess</button>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-gray-900 text-white rounded-[24px] font-black text-xs tracking-[4px] uppercase mt-6 hover:bg-black transition-all shadow-2xl shadow-gray-200 active:scale-95 duration-100">
                            Save Period
                        </button>
                    </div>
                </div>

                {/* Period Timeline List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000"><ListChecks size={200} /></div>
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="font-black text-gray-900 text-sm flex items-center gap-3 italic">
                                <Sun size={18} className="text-[#C29543]" /> Institutional Daily Slot Hierarchy
                            </h3>
                            <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl">
                                <button className="px-4 py-1.5 bg-white text-gray-900 rounded-lg text-[10px] font-black uppercase shadow-sm">Main Shift</button>
                                <button className="px-4 py-1.5 text-gray-400 rounded-lg text-[10px] font-black uppercase hover:text-gray-900">Afternoon</button>
                            </div>
                        </div>

                        <div className="relative border-l-2 border-dashed border-gray-100 ml-4 pl-10 space-y-8 pb-4">
                            {mockPeriods.map((period, i) => (
                                <div key={i} className="relative group transition-all">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[51px] top-6 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-125 ${period.type === 'Break' ? 'bg-[#C29543]' : 'bg-gray-900'}`}></div>

                                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group-hover:border-[#C29543] group-hover:shadow-xl group-hover:shadow-orange-50/50 transition-all flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="text-center min-w-[80px]">
                                                <p className="text-xs font-black text-gray-900 italic tracking-tighter">{period.start}</p>
                                                <div className="h-4 w-px bg-gray-200 mx-auto my-1"></div>
                                                <p className="text-[10px] font-black text-gray-400">{period.end}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-gray-900 italic uppercase underline decoration-gray-50 decoration-8 underline-offset-4 group-hover:decoration-orange-100 transition-all">{period.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${period.type === 'Break' ? 'bg-orange-50 border-orange-100 text-[#C29543]' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>{period.type}</span>
                                                    <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
                                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{period.status} Slot</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-xl hover:text-blue-500 hover:border-blue-100 transition-all shadow-sm"><Edit2 size={16} /></button>
                                            <button className="p-2.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-xl hover:text-red-500 hover:border-red-100 transition-all shadow-sm"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-orange-50/20 p-8 rounded-[40px] border-2 border-dashed border-orange-100 flex items-center gap-6 group hover:border-[#C29543] transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-[#C29543] shadow-md group-hover:rotate-12 transition-transform duration-500"><Plus size={28} /></div>
                                <div>
                                    <h4 className="font-black text-[#C29543] uppercase tracking-widest italic decoration-orange-100 decoration-4 underline">Define Next Slot</h4>
                                    <p className="text-[10px] font-bold text-gray-400 mt-1 max-w-[200px] leading-relaxed">Ensure periods do not overlap. System will auto-validate chronologically.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#C29543]"></div>
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><Info size={24} className="text-[#C29543]" /></div>
                                <h4 className="text-xl font-black italic tracking-tight">Time-Grid Audit</h4>
                            </div>
                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl">The current shift has <span className="text-white font-black underline decoration-[#C29543] decoration-8 underline-offset-4">8 periods</span> defined totaling 6.5 hours of active academic learning. 45 minutes allocated for breaks.</p>
                        </div>
                        <button className="px-8 h-12 bg-[#C29543] text-white rounded-[20px] font-black text-xs uppercase tracking-widest hover:brightness-110 active:translate-y-1 transition-all">
                            Verify Grid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeriodSetup;
