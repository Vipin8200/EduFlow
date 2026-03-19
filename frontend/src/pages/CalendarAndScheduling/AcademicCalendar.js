import React, { useState } from 'react';
import {
    CalendarDays, Plus, Search, Filter,
    Save, Share2, Printer, Download,
    Award, BookOpen, Clock, Calendar,
    LayoutGrid, List, ChevronRight, Info,
    Monitor, Database, ShieldCheck
} from 'lucide-react';

const mockMilestones = [
    { id: 1, title: 'Session Commencement', date: '2024-04-01', term: 'Term 1', type: 'Academic' },
    { id: 2, title: 'First Periodic Test', date: '2024-05-15', term: 'Term 1', type: 'Examination' },
    { id: 3, title: 'Summer Vacation Break', date: '2024-06-01', term: 'Term 2', type: 'Break' },
    { id: 4, title: 'Registration Deadline', date: '2024-03-31', term: 'Term 0', type: 'Admission' },
];

const AcademicCalendar = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Milestone Registry</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Coordinate the annual academic roadmap and institutional milestones.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform overflow-hidden">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Save size={14} /> Commit Changes</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Share2 size={14} /> Broadcast Sync</button>
                </div>
            </div>

            {/* Calendar Visualization Mockup */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 mb-12">
                <div className="xl:col-span-3 bg-white p-12 rounded-[60px] border border-gray-100 shadow-xl overflow-hidden relative border-t-8 border-t-[#C29543]">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                        <CalendarDays size={500} />
                    </div>
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-6">
                            <h3 className="text-3xl font-black italic tracking-tighter text-gray-900 underline decoration-orange-100 decoration-8 underline-offset-4">April 2024</h3>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-gray-200">Current View</div>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-4 bg-gray-50 border border-gray-100 text-gray-300 rounded-[28px] hover:text-[#C29543] transition-all shadow-sm"><Printer size={20} /></button>
                            <button className="p-4 bg-gray-50 border border-gray-100 text-gray-300 rounded-[28px] hover:text-blue-500 transition-all shadow-sm"><Download size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-6 border-b border-gray-100 pb-10">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[4px]">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-6 py-10">
                        {[...Array(30)].map((_, i) => {
                            const isMile = i === 12 || i === 25;
                            return (
                                <div key={i} className={`min-h-[140px] p-6 rounded-[40px] border border-gray-50 bg-gray-50/20 group hover:bg-white hover:border-[#C29543] hover:shadow-2xl hover:shadow-orange-50/50 transition-all cursor-pointer relative overflow-hidden`}>
                                    <span className={`text-xl font-black text-gray-300 group-hover:text-gray-900 transition-colors ${isMile ? 'text-[#C29543]' : ''}`}>{(i + 1).toString().padStart(2, '0')}</span>
                                    {isMile && (
                                        <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95 duration-500">
                                            <p className="text-[10px] font-black text-gray-900 leading-tight italic underline decoration-orange-100 transition-all decoration-4">Term Assessment</p>
                                            <div className="flex items-center gap-1.5 text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none"><Clock size={10} /> 09:00 AM</div>
                                        </div>
                                    )}
                                    {isMile && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C29543] animate-pulse shadow-sm shadow-orange-200"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="xl:col-span-1 space-y-8">
                    <div className="bg-gray-900 p-10 rounded-[60px] text-white space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5"><Monitor size={150} /></div>
                        <h3 className="text-2xl font-black italic tracking-wide">Registry Stats</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Active Milestones', val: '42' },
                                { label: 'Exam Windows', val: '04 Blocks' },
                                { label: 'Term Breaks', val: '08 Segments' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2 group-hover:border-white/10 transition-colors">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</span>
                                    <span className="text-xl font-black text-[#C29543] italic">{s.val}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-10 flex flex-col items-center">
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:scale-y-125 transition-transform">
                                <div className="h-full bg-[#C29543] transition-all duration-1000 shadow-xl shadow-orange-500/50" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-[9px] font-black text-white/30 tracking-[4px] uppercase mt-4">Session Progress Index</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[50px] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-6 group cursor-pointer hover:border-blue-500 transition-all border-b-8 border-b-blue-100">
                        <div className="p-4 bg-blue-50 text-blue-500 rounded-3xl group-hover:scale-110 transition-transform"><ShieldCheck size={32} /></div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest italic decoration-blue-100 decoration-8 underline-offset-[-2px] underline">Security Sync</h4>
                        <p className="text-[10px] font-bold text-gray-400 max-w-[200px] leading-relaxed uppercase tracking-tighter italic">Institutional Milestone data is encrypted and synced with the Ministry of Education cloud registry. Modification logs are immutable.</p>
                    </div>
                </div>
            </div>

            {/* List Table for Milestones */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-4 underline-offset-4">Academic Term Checklist</h3>
                    <div className="p-2.5 bg-white border border-gray-100 text-[#C29543] rounded-2xl shadow-sm"><Database size={20} /></div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Milestone Goal</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Scheduled Date</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Academic Term</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Event Category</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Synchronization</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockMilestones.map(mile => (
                                <tr key={mile.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-orange-100"><BookOpen size={16} /></div>
                                            <span className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{mile.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 font-black text-gray-400 text-xs tracking-widest italic">{mile.date}</td>
                                    <td className="px-10 py-5 text-center">
                                        <span className="text-[10px] font-black text-[#C29543] uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-orange-50">{mile.term}</span>
                                    </td>
                                    <td className="px-10 py-5">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${mile.type === 'Examination' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-400'
                                            }`}>{mile.type} Milestone</span>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 text-green-600 font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Synchronized <Share2 size={12} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AcademicCalendar;
