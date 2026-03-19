import React from 'react';
import {
    CirclePlus, FileText, Calendar,
    UploadCloud, Send, Info,
    BookOpen, GraduationCap, Clock,
    CheckCircle2, AlertCircle, Share2
} from 'lucide-react';

const AssignHomeWork = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Module Assignment Creation</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Architectural creation of asynchronous learning tasks and knowledge modules.</p>
                </div>
                <div className="flex bg-white p-2 border border-blue-50 rounded-2xl shadow-sm items-center gap-6">
                    <div className="flex items-center gap-3 px-4">
                        <Share2 size={18} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-950 italic">Multi-Channel Broadcast</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-2xl space-y-10 relative overflow-hidden border-t-8 border-t-[#C29543]">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <FileText size={400} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Assignment Class Unit</label>
                                <div className="p-5 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-[#C29543] transition-all cursor-pointer shadow-sm">
                                    <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest">Select Academic Module</span>
                                    <CirclePlus size={18} className="text-gray-300 group-hover:text-[#C29543]" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Temporal Due Date</label>
                                <div className="p-5 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer shadow-sm">
                                    <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest">Select Target Timeline</span>
                                    <Calendar size={18} className="text-blue-200 group-hover:text-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Module Objective / Title</label>
                            <input type="text" placeholder="EX: QUANTUM MECHANICS - SERIES A2 ASSESSMENT" className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] text-xs font-black text-gray-950 uppercase italic tracking-widest placeholder:text-gray-300 focus:outline-none focus:border-[#C29543] transition-all shadow-sm" />
                        </div>

                        <div className="space-y-3 relative z-10">
                            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Assignment Specifications</label>
                            <textarea rows="6" placeholder="DETAILED INSTRUCTIONS FOR KNOWLEDGE MODULE EXECUTION..." className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[40px] text-xs font-black text-gray-950 italic tracking-tight placeholder:text-gray-300 focus:outline-none focus:border-[#C29543] transition-all shadow-sm resize-none"></textarea>
                        </div>

                        <div className="p-10 bg-gray-50 border border-dashed border-[#C29543]/30 rounded-[40px] flex flex-col items-center justify-center space-y-4 group hover:bg-orange-50 transition-all cursor-pointer relative z-10">
                            <div className="p-5 bg-white rounded-[24px] shadow-xl group-hover:scale-110 transition-transform"><UploadCloud size={32} className="text-[#C29543]" /></div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-900 uppercase italic tracking-widest">Knowledge Material Upload</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[3px] mt-1 italic">PDF, MKV, ZIP MAX 250MB SYSTEM LOAD</p>
                            </div>
                        </div>

                        <button className="w-full py-6 bg-gray-950 text-white rounded-[32px] font-black text-[10px] uppercase tracking-[8px] hover:bg-[#C29543] transition-all shadow-2xl shadow-gray-950/20 active:scale-95 relative z-10">
                            COMMIT ASSIGNMENT BROADCAST
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700 font-black text-9xl leading-none italic select-none text-gray-100">B</div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Info size={20} /></div>
                            <h4 className="text-sm font-black italic tracking-widest uppercase underline decoration-blue-50 decoration-8 underline-offset-4">Module Broadcast Info</h4>
                        </div>
                        <p className="text-gray-500 text-xs font-medium italic leading-relaxed tracking-tight underline-offset-2 decoration-gray-100 decoration-1 underline">This knowledge module will be synchronized with the following terminal nodes:</p>

                        <div className="space-y-4">
                            {[
                                { label: 'Parent Terminal', status: 'Priority 1', icon: <CheckCircle2 /> },
                                { label: 'Student Nexus', status: 'Priority 1', icon: <CheckCircle2 /> },
                                { label: 'Admin Registry', status: 'Priority 2', icon: <CirclePlus /> },
                            ].map((n, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-50 transition-all">
                                    <div className="flex items-center gap-3">
                                        {React.cloneElement(n.icon, { size: 14, className: "text-blue-500" })}
                                        <span className="text-[10px] font-black uppercase italic tracking-widest text-gray-900">{n.label}</span>
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic">{n.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-950 p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-700">
                            <GraduationCap size={150} />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-[#C29543]">Temporal Load</h3>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic mb-8 relative z-10">Current pedagogical broadcast load is benchmarked at 64%. You can safely commit 2 more modules this cycle.</p>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden relative z-10">
                            <div className="h-full bg-[#C29543] rounded-full" style={{ width: '64%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignHomeWork;
