import React from 'react';
import {
    Search, Filter, MoreVertical,
    ChevronRight, BookOpen, Clock,
    FileText, Video, Link, Trash2,
    Settings2, Info, ArrowUpCircle,
    Database, DownloadCloud, Share2,
    CirclePlus
} from 'lucide-react';

const ManageMaterials = () => {
    const materials = [
        { id: 'MAT01', title: 'Quantum Mechanics Notes', type: 'PDF', class: 'Grade 12-A', date: 'Mar 18, 2026', size: '2.4 MB' },
        { id: 'MAT02', title: 'Physics Series V1', type: 'Video', class: 'Grade 11-B', date: 'Mar 17, 2026', size: '156 MB' },
        { id: 'MAT03', title: 'Chemistry Lab Guide', type: 'Link', class: 'Grade 10-C', date: 'Mar 16, 2026', size: 'Remote' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Knowledge Repository Hub</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Analytical management and integrity check of deployed pedagogical assets.</p>
                </div>
                <div className="flex bg-white h-12 border border-gray-100 rounded-2xl p-1 shadow-sm">
                    <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Filter size={14} className="text-gray-400 group-hover:text-[#C29543]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Asset type</span>
                    </div>
                    <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                        <Search size={16} className="text-gray-300" />
                        <input type="text" placeholder="Registry Search..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic w-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                {[
                    { label: 'Total Assets', val: '24 Nodes', icon: <Database />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Sync Requests', val: '12 Subs', icon: <Share2 />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
                    { label: 'Storage Index', val: 'High (82%)', icon: <ArrowUpCircle />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Integrity', val: 'Verified', icon: <Settings2 />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
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

            <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden relative border-t-8 border-t-[#C29543]">
                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-10 bg-gray-50/20">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-50 text-[#C29543] rounded-3xl shadow-sm"><BookOpen size={24} /></div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-50 decoration-8 underline-offset-[-2px]">Active Asset Inventory</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Pedagogical Resource Synchronization Canvas</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-8 h-14 bg-gray-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[5px] hover:bg-[#C29543] transition-all shadow-xl shadow-gray-950/20">
                        SYNC ALL ASSETS <Share2 size={16} />
                    </button>
                </div>

                <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {materials.map((mat, i) => (
                            <div key={i} className="bg-gray-50/50 p-8 rounded-[40px] border border-transparent hover:border-[#C29543]/30 hover:bg-white transition-all group overflow-hidden relative shadow-sm hover:shadow-xl hover:scale-[1.02] duration-500">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                                    <DownloadCloud size={200} />
                                </div>
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-5 rounded-[28px] shadow-sm transform group-hover:rotate-12 transition-transform ${mat.type === 'PDF' ? 'bg-blue-50 text-blue-500' :
                                        mat.type === 'Video' ? 'bg-red-50 text-red-500' :
                                            'bg-green-50 text-green-500'
                                        }`}>
                                        {mat.type === 'PDF' ? <FileText size={24} /> :
                                            mat.type === 'Video' ? <Video size={24} /> :
                                                <Link size={24} />}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-white text-gray-300 rounded-xl hover:text-blue-500 transition-all shadow-sm"><Settings2 size={16} /></button>
                                        <button className="p-3 bg-white text-gray-300 rounded-xl hover:text-red-500 transition-all shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8 relative z-10">
                                    <h4 className="text-lg font-black text-gray-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{mat.title}</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-gray-950 text-white rounded-lg text-[8px] font-black uppercase tracking-widest">{mat.class}</div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                        <span className="text-[9px] font-black text-gray-400 uppercase italic whitespace-nowrap">{mat.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100/50 relative z-10">
                                    <span className="text-[10px] font-black text-[#C29543] uppercase tracking-[3px] italic">{mat.size} Load</span>
                                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-950 hover:translate-x-1 transition-transform uppercase tracking-widest group">
                                        Open Node <ChevronRight size={14} className="text-[#C29543] group-hover:scale-125 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="border border-dashed border-[#C29543]/30 rounded-[40px] p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-orange-50 transition-all cursor-pointer group">
                            <div className="p-4 bg-white rounded-3xl shadow-xl group-hover:scale-110 transition-transform"><CirclePlus size={32} className="text-[#C29543]" /></div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-gray-900 uppercase italic tracking-widest">Deploy New Asset</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest italic group-hover:text-blue-500 transition-colors">ADD KNOWLEDGE MODULE TO HUB</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 p-10 bg-gray-950 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <ArrowUpCircle size={200} />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-4 bg-white/10 rounded-3xl shadow-xl border border-white/10"><Info size={24} className="text-[#C29543]" /></div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-black italic tracking-widest uppercase">Global Integrity Sync</h4>
                                <p className="text-gray-400 text-sm font-medium italic tracking-tight leading-none">Pedagogical health across the master repository is optimal.</p>
                            </div>
                        </div>
                        <button className="px-10 h-14 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-[5px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                            CLEAN REPOSITORY NODES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMaterials;
