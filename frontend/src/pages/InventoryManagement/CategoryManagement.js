import React, { useState } from 'react';
import {
    Folders, Plus, Search, Filter,
    MoreVertical, FolderTree, Edit2, Trash2,
    ChevronRight, ChevronDown, CheckCircle2,
    Info, Layout, Box, Tags, Share2,
    Database, Activity, ShieldCheck
} from 'lucide-react';

const mockCategories = [
    { id: 1, name: 'Academic Stationery', items: 124, status: 'Active', sub: ['Notebooks', 'Pens', 'Exam Sheets'] },
    { id: 2, name: 'Laboratory Equipment', items: 45, status: 'Restricted', sub: ['Chemicals', 'Glassware'] },
    { id: 3, name: 'Institutional Furniture', items: 812, status: 'Active', sub: ['Desks', 'Chairs', 'Office Tables'] },
    { id: 4, name: 'IT Infrastructure', items: 56, status: 'Active', sub: ['Peripherals', 'Servers'] },
];

const CategoryManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Asset Taxonomy</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Define category hierarchies, classification tags, and storage logic.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95 translate-y-0 hover:-translate-y-1">
                    <Plus size={18} /> Define Primary Class
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Categories', val: '24 Classes', icon: <Folders />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Asset Segments', val: '1,240 Items', icon: <Box />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Hierarchy Depth', val: '4 Levels', icon: <FolderTree />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Registry Health', val: 'Healthy', icon: <ShieldCheck />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50`}>
                            {React.cloneElement(s.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Hub Center */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Asset Classification Map..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Class: Physical Goods</option>
                            <option>Class: Virtual Assets</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Flat Registry</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Deep Hierarchy</button>
                </div>
            </div>

            {/* Category Roster Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {mockCategories.map(cat => (
                    <div key={cat.id} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-orange-100/30 transition-all group relative overflow-hidden border-b-8 border-b-gray-50 hover:border-b-[#C29543]">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <Folders size={250} />
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-orange-50 text-[#C29543] rounded-[24px] shadow-sm rotate-[-4deg] group-hover:rotate-0 transition-transform"><Tags size={24} /></div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-[-2px]">{cat.name}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] leading-none">Class Index #{cat.id}</p>
                                </div>
                            </div>
                            <button className="p-3 bg-gray-50 text-gray-300 rounded-2xl hover:text-gray-900 transition-colors"><MoreVertical size={16} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-all">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Linked Assets</p>
                                <p className="text-xl font-black text-gray-900 italic">{cat.items} Pcs</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-all">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Registry Level</p>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white border border-gray-100 rounded-full ${cat.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{cat.status}</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-dashed border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 italic"><ChevronDown size={14} className="text-[#C29543]" /> Sub-Classification Nodes</span>
                                <button className="text-[10px] font-black text-[#C29543] hover:underline transition-all">+ Add Node</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cat.sub.map((s, i) => (
                                    <span key={i} className="px-4 py-2 bg-gray-50 text-gray-500 text-[10px] font-black rounded-xl border border-gray-100 hover:bg-[#C29543] hover:text-white hover:border-transparent transition-all cursor-pointer shadow-sm uppercase italic">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <button className="flex-1 py-4 bg-gray-900 text-white rounded-[24px] font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200 flex items-center justify-center gap-2 hover:bg-black active:scale-95"><Edit2 size={12} /> Refactor Class</button>
                            <button className="px-6 py-4 bg-gray-50 border border-gray-100 text-red-400 rounded-[20px] hover:bg-red-50 hover:border-red-100 transition-all active:scale-95"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}

                <div className="bg-orange-50/20 p-12 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100 overflow-hidden relative min-h-[400px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center text-[#C29543] mb-8 shadow-xl shadow-orange-50 rotate-[-8deg] group-hover:rotate-0 transition-transform relative z-10 border border-orange-50">
                        <Plus size={40} />
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-xl underline decoration-orange-100 decoration-4 mb-3">Initialize Taxon</h4>
                        <p className="text-[11px] font-bold text-gray-400 max-w-[240px] leading-relaxed uppercase tracking-tighter italic">Create primary asset classification branches for the institutional registry.</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] transform skew-x-12 translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-5">
                        <div className="p-4 bg-white/10 rounded-[28px] border border-white/10"><Database size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Categorical Metadata Index</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Institutional asset taxonomy is cross-referenced with budgetary allocation nodes. All category changes are logged in the registry history for multi-department sync synchronization.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full xl:w-auto scale-90 md:scale-100 origin-right transition-all">
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Verify Registry</button>
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">Class Audit</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;
