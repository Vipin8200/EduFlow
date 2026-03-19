import React from 'react';
import {
    Calendar, Clock, BookOpen,
    MoreVertical, ChevronRight, CheckCircle2,
    PlayCircle, AlertCircle, Info,
    GraduationCap, ClipboardList
} from 'lucide-react';

const ExamSchedule = () => {
    const exams = [
        { date: 'Apr 02, 2026', subject: 'Mathematics', type: 'Mid-Term', time: '10:00 AM - 01:00 PM', status: 'Upcoming' },
        { date: 'Apr 04, 2026', subject: 'Physics', type: 'Mid-Term', time: '10:00 AM - 01:00 PM', status: 'Upcoming' },
        { date: 'Apr 06, 2026', subject: 'English', type: 'Mid-Term', time: '10:00 AM - 01:00 PM', status: 'Upcoming' },
        { date: 'Apr 08, 2026', subject: 'History', type: 'Mid-Term', time: '10:00 AM - 01:00 PM', status: 'Upcoming' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Assessment Temporal Map</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Organizational overview of forthcoming evaluative cycles and examination nodes.</p>
                </div>
                <div className="flex bg-white p-2 border border-gray-100 rounded-2xl shadow-sm items-center gap-6">
                    <div className="flex items-center gap-3 px-4">
                        <Calendar size={18} className="text-[#C29543]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-950">Active Cycle: 2025-26</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                    { label: 'Upcoming Nodes', val: '04 Tests', icon: <Calendar />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Evaluation Phase', val: 'Active', icon: <PlayCircle />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Conflict Delta', val: 'Zero', icon: <AlertCircle />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
                    { label: 'Integrity Rating', val: 'Optimal', icon: <GraduationCap />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            {React.cloneElement(s.icon, { size: 100 })}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black italic tracking-tighter text-gray-950`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
                <div className="lg:col-span-3 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                    {exams.map((ex, i) => (
                        <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl overflow-hidden relative group hover:border-[#C29543]/30 transition-all cursor-pointer">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                                <ClipboardList size={200} />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className="w-20 h-24 bg-gray-50 rounded-[30px] border border-gray-100 flex flex-col items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-all shadow-sm">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Date</p>
                                        <p className="text-xl font-black text-gray-900 italic tracking-tighter">{ex.date.split(' ')[1].replace(',', '')}</p>
                                        <p className="text-[9px] font-black text-[#C29543] uppercase italic">{ex.date.split(' ')[0]}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase decoration-[#C29543]/20 decoration-8 group-hover:underline underline-offset-4">{ex.subject}</h3>
                                        <div className="flex items-center gap-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {ex.type} Module</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Synced Nodes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 text-right">
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl group-hover:bg-white transition-all shadow-sm">
                                        <Clock size={16} className="text-gray-300 group-hover:text-[#C29543]" />
                                        <span className="text-[10px] font-black text-gray-900 italic uppercase tracking-widest">{ex.time}</span>
                                    </div>
                                    <span className="px-4 py-1.5 bg-orange-50 text-[#C29543] rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm shadow-orange-100">
                                        {ex.status} Evaluation
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1 space-y-6 sticky top-6">
                    <div className="bg-gray-950 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.02] rotate-12 -translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-3 bg-white/10 rounded-2xl"><Info size={18} className="text-[#C29543]" /></div>
                            <h4 className="text-sm font-black italic tracking-widest uppercase">Protocol Reminder</h4>
                        </div>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic mb-8 relative z-10">All evaluation modules must be synchronized with the master terminal 48 hours prior to node activation. Ensure discrepancy ratios are cleared immediately.</p>
                        <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-white hover:text-black transition-all shadow-xl relative z-10">
                            Full Archive Index
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamSchedule;
