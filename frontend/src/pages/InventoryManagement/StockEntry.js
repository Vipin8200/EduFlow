import React, { useState } from 'react';
import {
    ArrowDownToLine, Plus, Search, Filter,
    MoreVertical, FileText, ShoppingCart,
    Calendar, CheckCircle2, History,
    ShieldCheck, Activity, Info,
    Layout, Warehouse, PackagePlus,
    MonitorCheck, Share2, ClipboardList
} from 'lucide-react';

const mockEntries = [
    { id: 'TX-1024', product: 'Standard Grade Notebook', qty: 200, date: 'Mar 19, 2026', source: 'Purchase Order', status: 'Verified' },
    { id: 'TX-1088', product: 'Precision Microscope X1', qty: 5, date: 'Mar 18, 2026', source: 'Donation Hub', status: 'Pending Audit' },
    { id: 'ADJ-8822', product: 'Ergonomic Desk Frame', qty: -2, date: 'Mar 17, 2026', source: 'Damage Adjust', status: 'Audited' },
];

const StockEntry = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight leading-relaxed">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Inward Logistics</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Perform asset acquisitions, purchase registrations, and inventory adjustments.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <PackagePlus size={18} /> Purchase Registration
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
                {/* Form Sidebar */}
                <div className="xl:col-span-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 border-b-8 border-b-[#C29543]/10 relative group">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <ShoppingCart size={24} className="text-[#C29543]" />
                            <h3 className="font-black text-xl italic uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-[-2px]">Acquisition Desk</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Asset Target</label>
                                <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black italic outline-none focus:border-[#C29543]">
                                    <option>Standard Grade Notebook</option>
                                    <option>Precision Microscope</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Quant Increment</label>
                                <input type="number" placeholder="0.00" className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543] focus:bg-white transition-all italic" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Acquisition Source</label>
                                <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black outline-none italic">
                                    <option>Purchase Lifecycle</option>
                                    <option>Manual Adjustment</option>
                                    <option>Audit Balancing</option>
                                </select>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-[24px] font-black text-xs tracking-[4px] uppercase hover:bg-black transition-all shadow-2xl shadow-gray-200">
                                Commit Entries
                            </button>
                        </div>
                    </div>

                    <div className="bg-orange-50/50 p-6 rounded-[32px] border border-orange-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C29543] animate-pulse"></div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic tracking-widest">Inward Status Audit</h4>
                        </div>
                        <p className="text-[11px] font-bold text-[#C29543] leading-relaxed uppercase tracking-widest italic">Verification latency is optimized at <span className="text-xl font-black italic underline decoration-orange-100 decoration-8 underline-offset-4">0.8 Seconds</span> per commit.</p>
                    </div>
                </div>

                {/* Table / List */}
                <div className="xl:col-span-3 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] relative overflow-hidden transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-6 flex-1">
                            <div className="relative group flex-1 max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                                <input type="text" placeholder="Search Transaction Identifier..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                            </div>
                            <div className="flex gap-4">
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><History size={18} /></button>
                            </div>
                        </div>
                        <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                            <button className="px-5 py-2.5 bg-white text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">Verified Entry</button>
                            <button className="px-5 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Audit Exceptions</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                            <Warehouse size={400} />
                        </div>
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 italic">
                                    <tr className="font-black uppercase tracking-widest">
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400">Transaction ID</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400">Asset Linked</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 text-center">Quant Segment</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 text-center">Source Matrix</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 text-center">Audit Status</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockEntries.map(entry => (
                                        <tr key={entry.id} className="hover:bg-orange-50/5 transition-colors group">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-xl group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all font-black shadow-sm italic text-[10px]">#...{entry.id.slice(-4)}</div>
                                                    <span className="font-black text-gray-900 text-xs italic tracking-tighter">{entry.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{entry.product}</p>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{entry.date}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <span className={`text-[11px] font-black uppercase tracking-widest italic ${entry.qty < 0 ? 'text-red-500' : 'text-[#C29543] underline decoration-orange-100 decoration-4 underline-offset-4'}`}>{entry.qty > 0 ? '+' : ''}{entry.qty} Pcs</span>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{entry.source}</span>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {entry.status === 'Verified' ? (
                                                        <CheckCircle2 size={16} className="text-green-500" />
                                                    ) : entry.status === 'Audited' ? (
                                                        <ShieldCheck size={16} className="text-blue-500" />
                                                    ) : (
                                                        <Activity size={16} className="text-[#C29543] animate-pulse" />
                                                    )}
                                                    <span className="text-[10px] font-black uppercase tracking-widest italic">{entry.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 transition-all bg-white shadow-sm"><FileText size={16} /></button>
                                                    <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black transition-all bg-white shadow-sm"><Share2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-10 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] skew-x-12 translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                        <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="p-4 bg-white/10 rounded-[24px] border border-white/10"><MonitorCheck size={24} className="text-[#C29543]" /></div>
                                <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Inward Data Integrity</h3>
                            </div>
                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">All stock inward entries are cryptographically signed at the point of commit. Purchase Lifecycle entries are automatically cross-indexed with vendor invoices for 100% balance accuracy.</p>
                        </div>
                        <button className="px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                            Perform Inward Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockEntry;
