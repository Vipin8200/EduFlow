import React, { useState } from 'react';
import {
    Share2, Plus, Search, Filter,
    MoreVertical, User, Users, Home,
    CheckCircle2, AlertCircle, Info,
    Layout, History, ArrowUpRight,
    ArrowDownLeft, Share, ClipboardList,
    Box, ShieldCheck, Activity, MonitorCheck
} from 'lucide-react';

const mockAllocations = [
    { id: 'AL-201', product: 'Standard Grade Notebook', recipient: 'Science Dept', qty: 50, date: 'Mar 19, 2026', status: 'Issued' },
    { id: 'AL-202', product: 'Precision Microscope X1', recipient: 'Dr. R. Verma', qty: 1, date: 'Mar 18, 2026', status: 'On Loan' },
    { id: 'AL-203', product: 'Ergonomic Desk Frame', qty: 2, recipient: 'Admin Block', date: 'Mar 17, 2026', status: 'Returned' },
];

const StockAllocation = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight leading-relaxed">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Outward Disbursement</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Manage asset allocation to departments, staff issuance, and return lifecycle.</p>
                </div>
                <div className="flex gap-4 scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-3 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-[#C29543] transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <ArrowUpRight size={18} /> New Disbursement
                    </button>
                    <button className="flex items-center gap-3 px-6 h-12 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black text-xs hover:text-gray-950 transition-all shadow-sm uppercase tracking-widest">
                        <ArrowDownLeft size={18} /> Register Return
                    </button>
                </div>
            </div>

            {/* Allocation Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Disbursements', val: '54 Units', icon: <Share2 />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Pending Returns', val: '12 Assets', icon: <Activity />, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                    { label: 'Permanent Issues', val: '482 Pcs', icon: <Box />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Disbursement Index', val: '98.5%', icon: <ShieldCheck />, color: 'text-green-600', bg: 'bg-green-50/50' },
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

            {/* Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Resident UID or Dept..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Status: Issued Assets</option>
                            <option>Status: Returned</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Active Log</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Historical Trail</button>
                </div>
            </div>

            {/* Allocation Roster Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl shadow-gray-100/30 overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                    <Share size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Disbursement & Return Ledger</h3>
                    <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><ClipboardList size={20} /></div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic font-black uppercase tracking-widest">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest">Trajectory ID</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest">Asset Issued</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest text-center">Recipient Hub</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 font-black uppercase tracking-widest text-center">Life Cycle</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockAllocations.map(alloc => (
                                <tr key={alloc.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-50 border border-gray-100 text-gray-300 rounded-[18px] group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all font-black shadow-sm italic text-[10px] tracking-tighter">UID</div>
                                            <span className="font-black text-gray-900 text-xs italic tracking-tighter">{alloc.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="space-y-0.5">
                                            <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20 leading-tight">{alloc.product}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{alloc.date} | {alloc.qty} Pcs</p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center px-10 py-5">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full flex items-center gap-2 group-hover:bg-white group-hover:border-orange-100 transition-all font-black group-hover:text-[#C29543]">{alloc.recipient}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex items-center gap-3">
                                            {alloc.status === 'Issued' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><CheckCircle2 size={16} className="text-green-500" /> <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic tracking-widest">Active Issue</span></span>
                                            ) : alloc.status === 'On Loan' ? (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><Activity size={16} className="text-blue-500 animate-pulse" /> <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic tracking-widest">Asset Circulating</span></span>
                                            ) : (
                                                <span className="flex items-center gap-2 group-hover:scale-105 transition-transform"><Info size={16} className="text-gray-300" /> <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic tracking-widest">Stock Restored</span></span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-blue-500 hover:border-blue-100 transition-all bg-white shadow-sm active:scale-95"><History size={16} /></button>
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-black hover:border-black transition-all bg-white shadow-sm active:scale-95"><ArrowDownLeft size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-20 transition-transform duration-1000 group-hover:rotate-0"></div>
                <div className="flex-1 space-y-4 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><MonitorCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Disbursement Accountability Map</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">Asset allocations are linked to institutional UID clusters. The "Issue & Return" lifecycle automatically triggers stock level reconciliations across the primary catalog inventory.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Audit Active Assets
                </button>
            </div>
        </div>
    );
};

export default StockAllocation;
