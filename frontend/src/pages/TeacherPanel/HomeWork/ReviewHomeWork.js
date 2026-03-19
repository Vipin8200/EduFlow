import React from 'react';
import {
    Search, Filter, MoreVertical,
    ChevronRight, CheckCircle2, MessageSquare,
    Star, Info, FileBarChart, Clock,
    DownloadCloud, ArrowUpCircle, XCircle
} from 'lucide-react';

const ReviewHomeWork = () => {
    const submissions = [
        { id: 'SUB01', student: 'Rahul Mevada', roll: '01', status: 'Pending Review', submittedAt: 'Mar 18, 04:30 PM', grade: 'Draft' },
        { id: 'SUB02', student: 'Sneha Patel', roll: '02', status: 'Graded', submittedAt: 'Mar 17, 10:20 AM', grade: 'A+' },
        { id: 'SUB03', student: 'Arjun Singh', roll: '03', status: 'Re-evaluation', submittedAt: 'Mar 16, 02:15 PM', grade: 'B' },
        { id: 'SUB04', student: 'Priya Sharma', roll: '04', status: 'Late Submission', submittedAt: 'Mar 15, 09:00 AM', grade: 'C' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Module Review terminal</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Pedagogical assessment and evaluative feedback loop for assigned knowledge modules.</p>
                </div>
                <div className="flex bg-white h-12 border border-gray-100 rounded-2xl p-1 shadow-sm">
                    <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Filter size={14} className="text-gray-400 group-hover:text-[#C29543]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node Filter</span>
                    </div>
                    <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                        <Search size={16} className="text-gray-300" />
                        <input type="text" placeholder="Registry Search..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic w-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                    { label: 'Evaluation Ratio', val: '72%', icon: <FileBarChart />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Pending Nodes', val: '12 Subs', icon: <Clock />, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'High Benchmark', val: 'A+', icon: <Star />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Commit Action', val: 'Required', icon: <Info />, color: 'text-red-500', bg: 'bg-red-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-45 transition-transform duration-1000 rotate-12">
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

            <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden relative border-t-8 border-t-gray-950">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                    <h3 className="text-sm font-black text-gray-950 italic tracking-widest uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-4">Module Submission Registry</h3>
                    <div className="flex gap-4">
                        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm"><DownloadCloud size={18} className="text-[#C29543]" /></div>
                        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm"><MoreVertical size={18} className="text-gray-400" /></div>
                    </div>
                </div>

                <div className="p-10">
                    <div className="space-y-6">
                        {submissions.map((sub, i) => (
                            <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between p-8 bg-gray-50/50 rounded-[40px] border border-transparent hover:border-blue-50 hover:bg-white transition-all group cursor-pointer shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-6 xl:mb-0 lg:flex-1">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-[28px] flex items-center justify-center font-black text-gray-300 text-lg group-hover:bg-blue-100 group-hover:text-blue-500 transition-all shadow-inner-sm">{sub.roll}</div>
                                        <div>
                                            <h4 className="text-lg font-black text-gray-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{sub.student}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Registry Node: {sub.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-blue-500" />
                                            <span className="text-[10px] font-black text-gray-900 italic uppercase tracking-widest whitespace-nowrap">{sub.submittedAt}</span>
                                        </div>
                                        <span className={`px-4 py-1 bg-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm w-max border border-gray-100 ${sub.status === 'Graded' ? 'text-green-600' : sub.status === 'Late Submission' ? 'text-red-500' : 'text-[#C29543]'}`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-6 md:gap-10 mt-6 md:mt-0 xl:flex-1">
                                    <div className="flex items-center gap-4 bg-white p-3 rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Star size={18} /></div>
                                        <span className="text-lg font-black italic text-gray-950 tracking-tighter">{sub.grade === 'Draft' ? 'TBD' : sub.grade} Index</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="p-4 bg-gray-950 text-white rounded-3xl hover:bg-[#C29543] transition-all shadow-xl shadow-gray-950/20 group-hover:scale-105 active:scale-95"><CheckCircle2 size={24} /></button>
                                        <button className="p-4 bg-white text-gray-300 rounded-3xl border border-gray-100 hover:text-gray-950 transition-all shadow-sm"><MessageSquare size={24} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-10 bg-gray-50 rounded-[50px] border border-gray-100 flex flex-col items-center justify-center space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <ArrowUpCircle size={200} />
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-4 bg-white rounded-3xl shadow-xl"><FileBarChart size={32} className="text-[#C29543]" /></div>
                            <h4 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Registry Sync Protocol</h4>
                        </div>
                        <p className="text-gray-400 text-sm font-medium italic leading-relaxed text-center max-w-2xl tracking-tight">Review pedagogical submissions for the current learning module. Synchronization will update student developmental metrics across the master network.</p>
                        <button className="px-12 h-14 bg-gray-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[6px] hover:bg-[#C29543] transition-all shadow-2xl shadow-gray-950/20 active:scale-95 relative z-10 transition-all active:scale-90 flex items-center gap-4">
                            Commit Evaluative Logs <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewHomeWork;
