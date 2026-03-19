import React, { useState } from 'react';
import {
    BellRing, Plus, Search, Filter,
    Send, MoreVertical, Calendar, User,
    FileText, CheckCircle2, AlertTriangle, Info,
    Eye, Trash2, Edit2, Share2, Megaphone,
    Mail, MessageSquare, Smartphone
} from 'lucide-react';

const mockNotices = [
    { id: 1, title: 'Annual Sports Day Postponed', category: 'Urgent', date: '2024-03-25', audience: 'All Parents', status: 'Published' },
    { id: 2, title: 'Pre-Board Examination Schedule', category: 'Academic', date: '2024-03-22', audience: 'Grade 10 & 12', status: 'Published' },
    { id: 3, title: 'Summer Uniform Update', category: 'General', date: '2024-03-20', audience: 'All Students', status: 'Draft' },
    { id: 4, title: 'Science Fair Enrollment', category: 'Event', date: '2024-03-18', audience: 'Grade 6-12', status: 'Published' },
];

const Notices = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Notification Hub</h1>
                    <p className="text-sm text-gray-500 font-medium">Broadcast critical bulletins, academic alerts, and administrative updates.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black hover:shadow-xl transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Compose Notice
                </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Broadcasts', val: '24', icon: <Megaphone />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Urgent Alerts', val: '03', icon: <AlertTriangle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                    { label: 'Total Read Rate', val: '92.4%', icon: <Eye />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Drafts pending', val: '08', icon: <FileText />, color: 'text-gray-400', bg: 'bg-gray-100' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform duration-500`}>
                            {React.cloneElement(stat.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Notice Registry..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>All Categories</option>
                            <option>Academic</option>
                            <option>Urgent</option>
                            <option>Event</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-2xl">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">Main Registry</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest">Global Archives</button>
                </div>
            </div>

            {/* Notices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
                {mockNotices.map(notice => (
                    <div key={notice.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden relative flex flex-col hover:shadow-2xl hover:shadow-orange-50/50">
                        <div className={`h-1.5 w-full ${notice.category === 'Urgent' ? 'bg-red-500' :
                                notice.category === 'Academic' ? 'bg-blue-500' : 'bg-[#C29543]'
                            }`}></div>

                        <div className="p-8 space-y-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start">
                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[2px] border ${notice.category === 'Urgent' ? 'bg-red-50 border-red-100 text-red-600' :
                                        notice.category === 'Academic' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-400'
                                    }`}>
                                    {notice.category}
                                </span>
                                <div className="p-2 bg-gray-50 text-gray-300 rounded-lg group-hover:text-gray-900 transition-colors cursor-pointer"><MoreVertical size={14} /></div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <h3 className="text-xl font-black text-gray-900 italic tracking-tight group-hover:underline decoration-orange-100 decoration-8 underline-offset-4">{notice.title}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={10} /> To: {notice.audience}</p>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest"><Calendar size={12} /> {notice.date}</div>
                                <div className="flex items-center gap-2">
                                    {notice.status === 'Published' ? <CheckCircle2 size={16} className="text-green-500" /> : <div className="p-1 bg-gray-100 rounded-md"><FileText size={10} className="text-gray-400" /></div>}
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">{notice.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-between">
                            <button className="text-[10px] font-black text-[#C29543] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform"><Share2 size={12} /> Share</button>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-blue-500 rounded-xl shadow-sm"><Edit2 size={14} /></button>
                                <button className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-red-500 rounded-xl shadow-sm"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[50px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-white/[0.02] transform rotate-12 scale-150 transition-transform duration-1000 group-hover:rotate-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><BellRing size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-3xl font-black italic tracking-widest uppercase">Multi-Channel Distribution</h3>
                    </div>
                    <p className="text-gray-400 text-base font-medium leading-relaxed max-w-2xl italic tracking-tight">Broadcast notices directly to registered endpoints via Email, SMS, or Push Notifications. Institutional audit logs track delivery status to every unique user ID.</p>
                </div>
                <div className="grid grid-cols-3 gap-6 relative z-10">
                    {[
                        { icon: <Mail />, label: 'Email' },
                        { icon: <Smartphone />, label: 'Push' },
                        { icon: <MessageSquare />, label: 'SMS' },
                    ].map((ch, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 group/ch cursor-pointer">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center text-[#C29543] group-hover/ch:bg-[#C29543] group-hover/ch:text-black transition-all duration-300">
                                {React.cloneElement(ch.icon, { size: 24 })}
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover/ch:text-white transition-colors">{ch.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notices;
