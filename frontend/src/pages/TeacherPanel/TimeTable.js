import React from 'react';
import {
    Calendar, Clock, BookOpen,
    MoreVertical, ChevronRight, CheckCircle2,
    PlayCircle, AlertCircle, Info,
    GraduationCap, ClipboardList, Filter,
    Layers, Search, DownloadCloud
} from 'lucide-react';

const TimeTable = () => {
    const timetable = [
        { period: '1st', time: '09:00 AM - 10:00 AM', subject: 'Advanced Physics', class: 'Grade 12-A', room: 'Lab 204' },
        { period: '2nd', time: '10:00 AM - 11:00 AM', subject: 'Quantum Mechanics', class: 'Grade 12-B', room: 'Hall 101' },
        { period: '3rd', time: '11:00 AM - 12:00 PM', subject: 'BREAK', class: 'N/A', room: 'Cafeteria' },
        { period: '4th', time: '12:00 PM - 01:00 PM', subject: 'Theoretical Physics', class: 'Grade 11-A', room: 'Room 302' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-blue-500 decoration-8 underline-offset-4">Temporal Academic Map</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Analytical visualization of your daily and weekly pedagogical commitments.</p>
                </div>
                <div className="flex bg-white h-12 border border-blue-50 rounded-2xl p-1 shadow-sm">
                    <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Calendar size={14} className="text-gray-400 group-hover:text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Weekly View</span>
                    </div>
                    <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                        <Search size={16} className="text-gray-300" />
                        <input type="text" placeholder="Temporal Search..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic w-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {[
                    { label: 'Active Load', val: '06 Periods', icon: <Clock />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Next Session', val: 'Room 204', icon: <Layers />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Integrity Index', val: '100%', icon: <CheckCircle2 />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
                    { label: 'Report Status', val: 'Synced', icon: <Info />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-500 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            {React.cloneElement(s.icon, { size: 100 })}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className="text-2xl font-black italic tracking-tighter text-gray-950">{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden relative border-t-8 border-t-blue-100">
                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-10 bg-gray-50/20">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-sm"><ClipboardList size={24} /></div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-blue-50 decoration-8 underline-offset-[-2px]">Daily Temporal Registry</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Pedagogical Session Synchronization Grid</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-gray-950 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-950/20 active:scale-95"><DownloadCloud size={20} /></button>
                        <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-300 hover:text-blue-500 transition-all shadow-sm"><Filter size={20} /></button>
                    </div>
                </div>

                <div className="p-10">
                    <div className="space-y-6">
                        {timetable.map((item, i) => (
                            <div key={i} className={`flex flex-col xl:flex-row xl:items-center justify-between p-8 rounded-[40px] border border-transparent hover:border-blue-50 hover:bg-white transition-all group cursor-pointer shadow-sm relative overflow-hidden flex-1 ${item.subject === 'BREAK' ? 'bg-orange-50/20 opacity-60' : 'bg-gray-50/50'}`}>
                                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-6 xl:mb-0 lg:flex-1">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-white rounded-[28px] border border-gray-100 flex flex-col items-center justify-center font-black transition-all shadow-sm">
                                            <p className="text-[10px] font-black text-gray-300 uppercase italic">Period</p>
                                            <p className="text-lg font-black text-gray-950 italic tracking-tight leading-none mt-1">{item.period}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-black text-gray-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{item.subject}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.class}</span>
                                                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">{item.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-10 lg:flex-1">
                                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                                        <Clock size={16} className="text-blue-500" />
                                        <span className="text-[11px] font-black text-gray-950 italic uppercase tracking-widest whitespace-nowrap">{item.time}</span>
                                    </div>
                                    <button className="p-4 bg-gray-950 text-white rounded-[24px] hover:bg-blue-600 transition-all shadow-xl shadow-gray-950/20 group-hover:scale-110"><ChevronRight size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-10 bg-[#C29543]/10 border border-[#C29543]/20 rounded-[50px] flex flex-col items-center justify-center space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <PlayCircle size={200} />
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-4 bg-white rounded-3xl shadow-xl"><Info size={24} className="text-[#C29543]" /></div>
                            <h4 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Temporal Master Broadcast</h4>
                        </div>
                        <p className="text-gray-500 text-sm font-medium italic leading-relaxed text-center max-w-2xl tracking-tight">Weekly temporal maps are synchronized across all multi-departmental nexus terminals every Monday 06:00 AM.</p>
                        <button className="px-10 py-5 bg-gray-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[6px] hover:bg-[#C29543] transition-all shadow-2xl shadow-gray-950/20 active:scale-95 relative z-10 transition-all">
                            SYNC TEMPORAL MASTER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTable;
