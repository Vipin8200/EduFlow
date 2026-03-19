import React, { useState } from 'react';
import {
    CalendarOff, Plus, Trash2, Edit2,
    Search, Filter, ChevronRight, Info,
    Sun, Moon, CloudSun, CalendarDays,
    InfoIcon, MapPin, ListChecks, Printer
} from 'lucide-react';

const mockHolidays = [
    { id: 1, name: 'Republic Day', date: '2024-01-26', type: 'National', status: 'Fixed' },
    { id: 2, name: 'Holi Festival', date: '2024-03-25', type: 'Gazetted', status: 'Variable' },
    { id: 3, name: 'Good Friday', date: '2024-03-29', type: 'Religious', status: 'Variable' },
    { id: 4, name: 'Eid al-Fitr', date: '2024-04-10', type: 'Religious', status: 'Variable' },
    { id: 5, name: 'Ambedkar Jayanti', date: '2024-04-14', type: 'Gazetted', status: 'Fixed' },
];

const Holidays = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1500px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Holiday Calendar</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Manage national, gazetted, and local vacations for the current session.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:shadow-xl transition-all shadow-lg shadow-orange-100 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Declare Holiday
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Form & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 border-b-8 border-b-[#C29543]/10">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <CalendarOff size={24} className="text-[#C29543]" />
                            <h3 className="font-black text-xl italic uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-[-2px]">Add Record</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Occasion Title</label>
                                <input type="text" placeholder="e.g. Founder's Day" className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543] focus:bg-white transition-all italic placeholder:text-gray-300" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Observance Date</label>
                                <input type="date" className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543]" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Holiday Type</label>
                                <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black outline-none appearance-none">
                                    <option>National Holiday</option>
                                    <option>Gazetted Holiday</option>
                                    <option>Local / Institutional</option>
                                </select>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-[24px] font-black text-xs tracking-[4px] uppercase hover:bg-black transition-all shadow-2xl shadow-gray-200">
                                Save Entry
                            </button>
                        </div>
                    </div>

                    <div className="bg-orange-50/50 p-6 rounded-[32px] border border-orange-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C29543]"></div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Upcoming Academic Break</h4>
                        </div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-900 italic">Spring Vacation</h2>
                            <div className="text-right">
                                <p className="text-lg font-black text-[#C29543]">14th April</p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Starts in 3 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Timeline List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-[-15deg]">
                            <ListChecks size={300} />
                        </div>
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <h3 className="font-black text-gray-900 text-sm italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Session Chronology</h3>
                                <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[9px] font-black text-gray-400">2024-25</div>
                            </div>
                            <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Printer size={16} /></button>
                        </div>

                        <div className="relative border-l-2 border-dashed border-gray-100 ml-4 pl-10 space-y-8 pb-4">
                            {mockHolidays.map((hol, i) => (
                                <div key={i} className="relative group transition-all">
                                    <div className={`absolute -left-[51px] top-6 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-125 ${hol.type === 'National' ? 'bg-[#C29543]' : 'bg-gray-900/50'}`}></div>

                                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group-hover:border-[#C29543] group-hover:shadow-xl group-hover:shadow-orange-50/50 transition-all flex items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <div className="text-center min-w-[70px] space-y-1">
                                                <p className="text-2xl font-black text-gray-900 italic tracking-tighter leading-none">{hol.date.split('-')[2]}</p>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{new Date(hol.date).toLocaleString('default', { month: 'short' })}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-gray-900 italic uppercase leading-none">{hol.name}</h4>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${hol.type === 'National' ? 'bg-orange-50 border-orange-100 text-[#C29543]' : 'bg-gray-50 border-gray-100 text-gray-400'
                                                        }`}>{hol.type} Notice</span>
                                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">{hol.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-300 hover:text-[#C29543] transition-colors"><Edit2 size={16} /></button>
                                            <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-10 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] skew-x-12 translate-x-32 group-hover:translate-x-0 transition-transform duration-1000"></div>
                        <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="p-4 bg-white/10 rounded-[28px]"><InfoIcon size={24} className="text-[#C29543]" /></div>
                                <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Vacation Forecasting</h3>
                            </div>
                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">Institutional holidays are cross-verified against official government circulars. The system automatically recalculates attendance quotas and term-end dates based on declared vacations.</p>
                        </div>
                        <button className="px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                            Session Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Holidays;
