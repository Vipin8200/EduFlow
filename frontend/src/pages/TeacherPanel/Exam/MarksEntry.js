import React, { useState } from 'react';
import {
    CheckCircle2, AlertCircle, Search, Filter,
    ChevronRight, Save, Share2, Info,
    FileBarChart, GraduationCap, Users,
    Clock, Database
} from 'lucide-react';

const MarksEntry = () => {
    const students = [
        { id: '101', name: 'Rahul Mevada', roll: '01', theory: '78', internal: '18', total: '96', status: 'Draft' },
        { id: '102', name: 'Sneha Patel', roll: '02', theory: '82', internal: '19', total: '101', status: 'Draft' },
        { id: '103', name: 'Arjun Singh', roll: '03', theory: '65', internal: '15', total: '80', status: 'Draft' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Evaluative Index Entry</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Commitment of academic growth metrics to the master evaluative registry.</p>
                </div>
                <div className="flex bg-white p-2 border border-gray-100 rounded-2xl shadow-sm items-center gap-6">
                    <div className="flex bg-gray-50 text-gray-400 p-1 rounded-xl shadow-inner-sm">
                        <button className="px-4 py-2 bg-gray-950 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl">Manual Entry</button>
                        <button className="px-4 py-2 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:text-gray-900 transition-colors">Bulk Import</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                {[
                    { label: 'Evaluation Unit', val: 'Final Term 2026', icon: <FileBarChart />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Cluster Class', val: 'Grade 10-A Module', icon: <Users />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
                    { label: 'Node Subject', val: 'Advanced Physics', icon: <GraduationCap />, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            {React.cloneElement(s.icon, { size: 100 })}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-xl font-black italic tracking-tighter text-gray-950`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative border-t-8 border-t-blue-100">
                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gray-50/20">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-sm"><Database size={24} /></div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-blue-50 decoration-8 underline-offset-[-2px]">Registry Commitment Grid</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Growth Matrix Synchronization Hub</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-3xl flex items-center gap-6 shadow-sm">
                        <div className="flex flex-col text-right">
                            <span className="text-[9px] font-black text-gray-400 uppercase italic">Max Marks Profile</span>
                            <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest underline decoration-[#C29543] decoration-8 underline-offset-[-2px]">100 (80T + 20I)</span>
                        </div>
                        <div className="w-10 h-10 bg-orange-50 text-[#C29543] rounded-2xl flex items-center justify-center font-black italic shadow-inner-sm border border-orange-100">100</div>
                    </div>
                </div>

                <div className="p-10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 rounded-t-3xl">
                                <tr>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-[3px]">Global Identity</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-[3px] text-center">Theory (80)</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-[3px] text-center">Internal (20)</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-[3px] text-center">Commit Total</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-[3px] text-center">Node State</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {students.map((std, i) => (
                                    <tr key={i} className="group hover:bg-blue-50/10 transition-all font-sans cursor-pointer">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-gray-300 text-[10px] group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">{std.roll}</div>
                                                <div className="space-y-1">
                                                    <h4 className="text-[13px] font-black text-gray-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{std.name}</h4>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Master ID: {std.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <input type="text" value={std.theory} className="w-16 h-10 bg-gray-50/50 border border-gray-100 rounded-xl text-center text-[11px] font-black focus:outline-none focus:border-blue-200 transition-all italic shadow-sm shadow-blue-50" />
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <input type="text" value={std.internal} className="w-16 h-10 bg-gray-50/50 border border-gray-100 rounded-xl text-center text-[11px] font-black focus:outline-none focus:border-blue-200 transition-all italic shadow-sm shadow-blue-50" />
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="p-3 bg-gray-900 text-white rounded-2xl w-max mx-auto text-[11px] font-black italic shadow-xl shadow-gray-950/20">{std.total} Index</div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="px-4 py-1.5 bg-orange-50 text-[#C29543] rounded-full text-[9px] font-black uppercase tracking-widest italic border border-orange-100 shadow-sm">{std.status} Node</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] rotate-12 -translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                        <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                            <div className="flex items-center justify-center xl:justify-start gap-4">
                                <div className="p-4 bg-white/10 rounded-[28px] border border-white/10 shadow-xl"><CheckCircle2 size={28} className="text-[#C29543]" /></div>
                                <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Temporal Master Registry</h3>
                            </div>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Evaluative metrics are synchronized across multi-departmental registries. Commitment here affects zero-collision reporting across examination and scholarship clusters.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            <button className="px-10 h-14 bg-white/10 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all shadow-xl shadow-gray-950">
                                Save Draft Node
                            </button>
                            <button className="px-12 h-14 bg-[#C29543] text-white rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white hover:text-black transition-all shadow-xl shadow-[#C29543]/20">
                                Commit Matrix Sync
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarksEntry;
