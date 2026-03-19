import React, { useState } from 'react';
import {
    Table2, Search, Filter, Save,
    Share2, Download, Printer, Edit2,
    User, BookOpen, Clock, CalendarDays,
    LayoutGrid, List, ChevronRight, Info
} from 'lucide-react';

const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Social Studies'];
const teachers = ['R. Sharma', 'P. Verma', 'S. Kulkarni', 'A. Mehta', 'M. Das', 'J. Singh'];

const TimetableManagement = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'edit'
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const periods = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Academic Class Timetable</h1>
                    <p className="text-sm text-gray-500 font-medium">Assign weekly curriculum, teachers, and classroom resources.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Save size={14} /> Save Changes</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Share2 size={14} /> Global Share</button>
                </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-8 flex-1">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1 italic">Target Grade</label>
                        <select className="w-full sm:w-48 px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100">
                            {[6, 7, 8, 9, 10, 11, 12].map(c => <option key={c}>Grade {c} - A</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1 italic">Academic Shift</label>
                        <select className="w-full sm:w-48 px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100">
                            <option>Morning Primary Shift</option>
                            <option>Afternoon Secondary Shift</option>
                        </select>
                    </div>
                    <div className="flex items-end gap-3 pb-1">
                        <button className="p-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                        <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-[#C29543] hover:shadow-lg transition-all"><Table2 size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="p-3.5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200"><Printer size={18} /></button>
                    <button className="p-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all shadow-sm"><Download size={18} /></button>
                </div>
            </div>

            {/* Timetable Grid View */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden relative animate-in fade-in zoom-in-95 duration-700">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                    <CalendarDays size={400} />
                </div>
                <div className="overflow-x-auto min-h-[600px]">
                    <div className="min-w-[1200px]">
                        {/* Days Header Row */}
                        <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/50 italic">
                            <div className="p-6 border-r border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[4px] flex items-center justify-center italic">Time / Period</div>
                            {days.map(day => (
                                <div key={day} className="p-6 border-r border-gray-100 text-center text-[10px] font-black text-gray-900 uppercase tracking-[4px] relative group cursor-pointer hover:bg-white transition-colors">
                                    {day}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#C29543] opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                </div>
                            ))}
                        </div>

                        {/* Periods Rows */}
                        <div className="divide-y divide-gray-50">
                            {periods.map((peri, pi) => (
                                <div key={pi} className="grid grid-cols-7 group hover:bg-gray-50/20 transition-all">
                                    {/* Period Label */}
                                    <div className="p-6 border-r border-gray-100 bg-gray-50/20 text-center flex flex-col items-center justify-center gap-1 group-hover:bg-[#C29543]/5 transition-colors border-l-4 border-l-transparent group-hover:border-l-[#C29543]">
                                        <span className="text-sm font-black text-gray-900 italic underline decoration-[#C29543]/20 decoration-8 underline-offset-4">{peri}</span>
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{0 + pi + 8}:00 - {0 + pi + 8}:45</span>
                                    </div>

                                    {/* Day Columns */}
                                    {days.map((day, di) => {
                                        const isRecess = pi === 2;
                                        return (
                                            <div key={di} className={`p-4 border-r border-gray-50 relative group/cell hover:bg-white hover:shadow-xl hover:shadow-orange-50/50 transition-all cursor-pointer ${isRecess ? 'bg-orange-50/20' : ''}`}>
                                                {isRecess ? (
                                                    <div className="h-full flex flex-col items-center justify-center opacity-30 grayscale rotate-[-15deg] group-hover/cell:opacity-100 group-hover/cell:grayscale-0 transition-all">
                                                        <Clock size={20} className="text-[#C29543] mb-1" />
                                                        <span className="text-[9px] font-black uppercase tracking-[4px] text-[#C29543]">Recess</span>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 flex flex-col items-center text-center">
                                                        <div className="space-y-0.5">
                                                            <div className="flex items-center gap-1 text-[9px] font-black text-[#C29543] uppercase tracking-[2px] leading-tight mb-1 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                                                                <BookOpen size={10} /> {subjects[di % 6]}
                                                            </div>
                                                            <p className="text-xs font-black text-gray-900 leading-tight underline decoration-gray-100 decoration-4 group-hover/cell:decoration-orange-100 transition-all">{subjects[(di + pi) % 6]}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 pt-2 border-t border-dashed border-gray-100 w-full justify-center">
                                                            <div className="w-5 h-5 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover/cell:text-blue-500 transition-colors"><User size={10} /></div>
                                                            <span className="text-[10px] font-black text-gray-400 group-hover/cell:text-gray-950 transition-colors italic">{teachers[(di + pi) % 6]}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <button className="absolute top-2 right-2 p-1.5 bg-white shadow-md rounded-lg text-gray-300 opacity-0 group-hover/cell:opacity-100 transition-all hover:text-[#C29543] hover:border-[#C29543] border border-transparent"><Edit2 size={10} /></button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Footer Notice */}
            <div className="mt-12 bg-gray-900 p-10 rounded-[50px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] -rotate-12 translate-x-20"></div>
                <div className="flex-1 text-center lg:text-left space-y-4 relative z-10">
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div className="w-14 h-14 bg-[#C29543] rounded-3xl flex items-center justify-center text-black rotate-[-15deg] group-hover:rotate-0 transition-transform shadow-xl shadow-orange-950"><LayoutGrid size={28} /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase">Synchronization Active</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl italic">The current institutional schedule is live. Any modifications to Grade 10-A timetable will be instantly broadcasted to <span className="text-white font-black underline decoration-[#C29543] decoration-8 underline-offset-4 tracking-[2px]">45 Student Terminals</span> and parent dashboards.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10 scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex-1 sm:flex-none px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Broadcast Timetable</button>
                    <button className="flex-1 sm:flex-none px-10 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">Audit History</button>
                </div>
            </div>
        </div>
    );
};

export default TimetableManagement;
