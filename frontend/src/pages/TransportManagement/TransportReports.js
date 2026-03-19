import React, { useState } from 'react';
import {
    FileBarChart, Search, Filter,
    Bus, User, Clock, FileText,
    Download, Printer, Share2,
    TrendingUp, ShieldCheck, Zap,
    AlertCircle, Activity, Layout,
    PieChart, BarChart4, ClipboardList
} from 'lucide-react';

const TransportReports = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Transit Analytics</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Generate comprehensive logistics reports, fuel audits, and route efficiency metrics.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Download size={14} /> Export Dataset</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Printer size={14} /> Full Audit Print</button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                    { label: 'Avg Route Consumption', val: '14.2 L/Day', icon: <Zap />, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                    { label: 'Vehicle Uptime', val: '98.5%', icon: <TrendingUp />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Maintenance Cost', val: '$1,200', icon: <Activity />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Safety Incidents', val: 'Zero', icon: <ShieldCheck />, color: 'text-green-600', bg: 'bg-green-50/50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[24px] ${s.bg} ${s.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                            {React.cloneElement(s.icon, { size: 28 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Control Center */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="lg:col-span-2 bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group border-t-8 border-t-[#C29543]">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                        <BarChart4 size={300} />
                    </div>
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Fleet Utilization Chart</h3>
                        <div className="flex gap-4">
                            <div className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Last 30 Days</div>
                        </div>
                    </div>

                    <div className="h-[250px] flex items-end justify-between gap-4 border-b border-dashed border-gray-100 pb-10">
                        {[65, 42, 85, 92, 55, 78, 90].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar h-full justify-end">
                                <div className="w-full bg-gray-50 border border-gray-100 rounded-t-2xl relative group-hover/bar:bg-[#C29543]/20 group-hover/bar:border-orange-100 transition-all cursor-pointer" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white rounded-lg text-[10px] font-black scale-0 group-hover/bar:scale-100 transition-transform shadow-xl shadow-gray-200">{h}%</div>
                                    <div className="absolute bottom-0 inset-x-0 bg-[#C29543] rounded-t-2xl shadow-xl shadow-orange-50/50" style={{ height: '30%' }}></div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase italic">Bus {i + 1}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-center text-gray-400 text-xs font-black uppercase tracking-widest italic">Institutional Transit Load Capacity Factor</p>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 border-b-8 border-b-blue-100">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <PieChart size={24} className="text-blue-500" />
                            <h3 className="font-black text-xl italic uppercase underline decoration-blue-50 decoration-8 underline-offset-[-2px]">Report Filter</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Analytical Segment</label>
                                <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black italic outline-none">
                                    <option>Fuel Efficiency Audit</option>
                                    <option>Student Transport Registry</option>
                                    <option>Maintenance History</option>
                                    <option>Attendance Aggregates</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Dimensional Scope</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-3 bg-gray-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest">Monthly</button>
                                    <button className="py-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:border-blue-200 hover:text-blue-600 transition-all">Session</button>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-[#C29543] text-white rounded-[24px] font-black text-xs tracking-[4px] uppercase hover:bg-black transition-all shadow-2xl shadow-orange-100">
                                Run Extraction
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-4 underline-offset-4">Institutional Report Registry</h3>
                    <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><FileText size={20} /></div>
                </div>
                <div className="overflow-x-auto min-h-[300px]">
                    <div className="p-20 text-center flex flex-col items-center gap-6 group">
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-[32px] flex items-center justify-center text-gray-300 group-hover:scale-110 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all duration-500 shadow-sm"><ClipboardList size={32} /></div>
                        <div className="space-y-1">
                            <h4 className="text-2xl font-black text-gray-900 italic tracking-tighter">Ready for Extraction</h4>
                            <p className="text-gray-400 text-sm font-medium tracking-tight italic">Analytical models are synchronized with the core transit database. Configure Segmentation and Scope above to generate the visual report index.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-[-15deg] translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><FileText size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Analytical Metadata Integrity</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl italic tracking-tight">Transport reports utilize verifiable data points from GPS logs and RFID boarding markers. All maintenance summaries are cross-audited against fuel inventory receipts for zero-leakage reporting.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full xl:w-auto scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Verify Metrics</button>
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">Audit History</button>
                </div>
            </div>
        </div>
    );
};

export default TransportReports;
