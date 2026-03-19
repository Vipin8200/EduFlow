import React, { useState } from 'react';
import {
    Settings2, Plus, Search, Filter,
    MoreVertical, Calendar, GraduationCap,
    Clock, Tag, CheckCircle2, Save,
    Share2, Info, Layout, Activity,
    ShieldCheck, Database, MonitorCheck,
    Library, Layers
} from 'lucide-react';

const AcademicSettings = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight leading-relaxed">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Temporal Logic</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Configure academic session cycles, grading frameworks, and naming conventions.</p>
                </div>
                <div className="flex gap-4 scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-[#C29543] transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> New Session Unit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Active Cycle', val: '2025 - 2026', icon: <Calendar />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Grading Models', val: '4 Active', icon: <GraduationCap />, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                    { label: 'Protocol Nodes', val: '12 Sets', icon: <Layers />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Integrity', val: 'Robust', icon: <ShieldCheck />, color: 'text-green-600', bg: 'bg-green-50/50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Academic Year & Terms */}
                <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group border-t-8 border-t-[#C29543]">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <Clock size={250} />
                        </div>
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-50 mb-10">
                            <div className="p-4 bg-orange-50 text-[#C29543] rounded-[24px] shadow-sm"><Settings2 size={24} /></div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-[-2px]">Session Cycle Definition</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Temporal Alignment Hub</p>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10 font-sans">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 ml-1 italic">Active Session Range</label>
                                    <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black outline-none italic transition-all focus:border-[#C29543] focus:bg-white uppercase tracking-widest">
                                        <option>Jun 2025 - Mar 2026</option>
                                        <option>Jan 2026 - Dec 2026</option>
                                    </select>
                                </div>
                                <div className="pt-5 flex items-end">
                                    <button className="w-full py-3 h-12 bg-gray-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200">Commit Cycle</button>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 border border-gray-100 rounded-[40px] space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-2 underline decoration-[#C29543]/20 decoration-4">Institutional Semester Nodes</h4>
                                    <button className="text-[10px] font-black text-[#C29543] hover:underline">+ Define Node</button>
                                </div>
                                <div className="space-y-3">
                                    {['Spring Semester', 'Fall Semester', 'Summer Intensive'].map(term => (
                                        <div key={term} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-100 transition-all shadow-sm group/node cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-green-500 group-hover/node:scale-150 transition-transform shadow-sm"></div>
                                                <span className="text-[10px] font-black text-gray-900 italic tracking-tight uppercase">{term} Unit</span>
                                            </div>
                                            <span className="text-[9px] font-black text-gray-400 italic bg-gray-50 px-3 py-1 rounded-full uppercase">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grading System & Naming */}
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group border-t-8 border-t-blue-100">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-[-15deg]">
                            <GraduationCap size={250} />
                        </div>
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-50 mb-10">
                            <div className="p-4 bg-blue-50 text-blue-500 rounded-[24px] shadow-sm"><Layers size={24} /></div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-blue-50 decoration-8 underline-offset-[-2px]">Evaluation Models</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Grading System Configuration</p>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10 font-sans">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1 ml-1 italic">Active Grading Matrix</label>
                                    <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black outline-none italic transition-all focus:border-blue-500 focus:bg-white uppercase tracking-widest">
                                        <option>Percentage Basis (Normal)</option>
                                        <option>Graded Gpa (4.0 Scale)</option>
                                        <option>Cce Continuous Schema</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 border border-gray-100 rounded-[40px] space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-2 underline decoration-blue-200">Naming Conventions</h4>
                                </div>
                                <div className="space-y-4">
                                    {['Admission No Suffix', 'Receipt Prefix', 'Examination Id Meta'].map(field => (
                                        <div key={field} className="space-y-2">
                                            <p className="text-[10px] font-bold text-gray-400 italic mb-1 ml-1 tracking-widest">{field} Architecture</p>
                                            <input type="text" placeholder="KII-2025-..." className="w-full px-5 h-11 bg-white border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-blue-200 transition-all italic shadow-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px] border border-white/10 shadow-xl"><Database size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Temporal Master Registry</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Institutional temporal logic is synchronized across multi-departmental registries. Setting session cycles or grading frameworks here affects zero-collision reporting across examination and finance clusters.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Framework Integrity
                </button>
            </div>
        </div>
    );
};

export default AcademicSettings;
