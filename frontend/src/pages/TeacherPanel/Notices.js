import React from 'react';
import {
    Bell, Search, Filter,
    MoreVertical, ChevronRight, Info,
    CheckCircle2, Clock, Globe,
    ShieldAlert, ArrowUpCircle, Mail
} from 'lucide-react';

const Notices = () => {
    const notices = [
        { id: 'N01', title: 'Pedagogical Framework Update', type: 'Critical', date: 'Mar 18, 2026', sender: 'Admin Nexus', importance: 'High' },
        { id: 'N02', title: 'Temporal Node Adjustment', type: 'Information', date: 'Mar 17, 2026', sender: 'Academic Head', importance: 'Mid' },
        { id: 'N03', title: 'System Maintenance Window', type: 'Alert', date: 'Mar 16, 2026', sender: 'IT Terminal', importance: 'Mid' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-orange-500 decoration-8 underline-offset-4">Institutional Notice Nexus</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Broadcast terminal for critical information and pedagogical protocol updates.</p>
                </div>
                <div className="flex bg-white h-12 border border-gray-100 rounded-2xl p-1 shadow-sm">
                    <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                        <Filter size={14} className="text-gray-400 group-hover:text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node type</span>
                    </div>
                    <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                        <Search size={16} className="text-gray-300" />
                        <input type="text" placeholder="Nexus Search..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic w-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {[
                    { label: 'Unread Nodes', val: '03 Briefs', icon: <Bell />, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Broadcast Scope', val: 'Global', icon: <Globe />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Acknowledge Ratio', val: '98.2%', icon: <CheckCircle2 />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'System Health', val: 'Optimal', icon: <ShieldAlert />, color: 'text-gray-950', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-orange-500 transition-all group overflow-hidden relative">
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

            <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden relative border-t-8 border-t-orange-500">
                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-10 bg-gray-50/20">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-50 text-orange-500 rounded-3xl shadow-sm"><Info size={24} /></div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-50 decoration-8 underline-offset-[-2px]">Active Broadcast Registry</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest mt-1">Cross-Terminal Communication Synchronization Hub</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-8 h-14 bg-gray-950 text-white rounded-[24px] font-black text-[10px] uppercase tracking-[5px] hover:bg-orange-500 transition-all shadow-xl shadow-gray-950/20">
                        SYNC ALL NODES <ArrowUpCircle size={16} />
                    </button>
                </div>

                <div className="p-10">
                    <div className="space-y-6">
                        {notices.map((n, i) => (
                            <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between p-8 bg-gray-50/20 rounded-[40px] border border-transparent hover:border-orange-100 hover:bg-white transition-all group cursor-pointer shadow-sm relative overflow-hidden flex-1">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                                    <Mail size={200} />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-6 xl:mb-0 lg:flex-1 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center font-black transition-all shadow-sm ${n.importance === 'High' ? 'bg-orange-500 text-white shadow-orange-100' : 'bg-white text-gray-300'}`}>
                                            <Bell size={24} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-black text-gray-950 uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{n.title}</h4>
                                            <div className="flex items-center gap-3">
                                                <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white ${n.importance === 'High' ? 'bg-red-500' : 'bg-blue-500'}`}>{n.type} Node</div>
                                                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{n.sender}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-10 lg:flex-1 relative z-10">
                                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-gray-400 group-hover:text-orange-500 transition-colors">
                                        <Clock size={16} />
                                        <span className="text-[11px] font-black italic uppercase tracking-widest whitespace-nowrap">{n.date}</span>
                                    </div>
                                    <button className="flex items-center justify-center gap-3 px-6 h-14 bg-gray-950 text-white rounded-[24px] hover:bg-orange-500 transition-all shadow-xl shadow-gray-950/20 group-hover:scale-105 active:scale-95 text-[9px] font-black uppercase tracking-widest">
                                        Acknowledge <ChevronRight size={16} className="text-[#C29543]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-10 bg-gray-50 border border-gray-100 rounded-[50px] flex flex-col items-center justify-center space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <Globe size={200} />
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-4 bg-white rounded-3xl shadow-xl"><Info size={24} className="text-orange-500" /></div>
                            <h4 className="text-xl font-black italic tracking-widest uppercase underline decoration-orange-500 decoration-8 underline-offset-4">Temporal Master Broadcast</h4>
                        </div>
                        <p className="text-gray-400 text-sm font-medium italic leading-relaxed text-center max-w-2xl tracking-tight">Sync node acknowledgement protocols to ensure zero-latency transmission of pedagogical directives.</p>
                        <button className="px-10 py-5 bg-gray-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[6px] hover:bg-orange-500 transition-all shadow-2xl shadow-gray-950/20 active:scale-95 relative z-10 transition-all">
                            SYNC BROADCAST REGISTRY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notices;
