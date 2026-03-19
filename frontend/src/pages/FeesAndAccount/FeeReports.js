import React, { useState } from 'react';
import {
    FileBarChart, Search, Download, Filter,
    TrendingUp, AlertCircle, PieChart, Users,
    BarChart3, RefreshCw, ChevronRight, CheckCircle,
    Info, LayoutGrid, List
} from 'lucide-react';

const mockDefaulters = [
    { id: 'ADM-201', name: 'Aarav Sharma', class: '10-A', pending: 23000, days: 12, contact: '987XXXXX21' },
    { id: 'ADM-205', name: 'Kabir Singh', class: '5-B', pending: 8500, days: 5, contact: '887XXXXX10' },
    { id: 'ADM-209', name: 'Arjun Das', class: '8-C', pending: 42000, days: 45, contact: '787XXXXX44' },
    { id: 'ADM-212', name: 'Meera Reddy', class: '10-A', pending: 15400, days: 20, contact: '687XXXXX33' },
];

const mockCollectionTrend = [
    { month: 'Jan', collected: 450000, pending: 50000 },
    { month: 'Feb', collected: 380000, pending: 120000 },
    { month: 'Mar', collected: 520000, pending: 30000 },
];

const FeeReports = () => {
    const [activeTab, setActiveTab] = useState('collection');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Financial Intelligence Reports</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight italic">Consolidated view of fee collections and delinquency across all grades.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('collection')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'collection' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <TrendingUp size={18} /> Collection Reports
                </button>
                <button
                    onClick={() => setActiveTab('defaulter')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'defaulter' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <AlertCircle size={18} /> Defaulter Reports
                </button>
            </div>

            {activeTab === 'collection' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Yearly Goal', val: '₹1.2 Cr', percent: 84, icon: <TrendingUp />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                            { label: 'Received (YTD)', val: '₹92.4 L', percent: 77, icon: <CheckCircle />, color: 'text-green-600', bg: 'bg-green-50/50' },
                            { label: 'Total Outstanding', val: '₹27.6 L', percent: 23, icon: <AlertCircle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                            { label: 'Active Payers', val: '1,245 Students', percent: 92, icon: <Users />, color: 'text-orange-500', bg: 'bg-orange-50/50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                                    </div>
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                        {React.cloneElement(stat.icon, { size: 24 })}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                                        <span>Progress</span>
                                        <span>{stat.percent}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                        <div className={`h-full rounded-full transition-all duration-1000 ${stat.color.replace('text', 'bg')}`} style={{ width: `${stat.percent}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                                <FileBarChart size={200} />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-gray-900 border-l-4 border-l-[#C29543] pl-4 italic">Revenue Comparison (Last 3 Months)</h3>
                                <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-orange-50 hover:text-[#C29543] transition-all"><RefreshCw size={16} /></button>
                            </div>
                            <div className="h-64 flex items-end gap-12 pt-8 justify-around">
                                {mockCollectionTrend.map((data, i) => (
                                    <div key={i} className="flex-1 max-w-[80px] group relative flex flex-col items-center">
                                        <div className="w-full space-y-1 flex flex-col items-center">
                                            <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: `${(data.pending / 600000) * 200}px` }}></div>
                                            <div className="w-full bg-[#C29543] rounded-t-lg relative group-hover:brightness-110 transition-all shadow-lg shadow-orange-100/30" style={{ height: `${(data.collected / 600000) * 200}px` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black">₹{data.collected / 1000}K</div>
                                            </div>
                                        </div>
                                        <span className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex gap-6 justify-center">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#C29543] rounded-sm shadow-sm shadow-orange-100"></div><span className="text-[10px] font-black text-gray-400 uppercase">Received</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-100 rounded-sm"></div><span className="text-[10px] font-black text-gray-400 uppercase">Pending</span></div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><PieChart size={20} /></div>
                                <h3 className="font-black text-gray-900 text-sm">Mode Distribution</h3>
                            </div>
                            <div className="flex-1 flex flex-col justify-around py-4">
                                {[
                                    { label: 'Online Gateway', percent: 65, color: 'bg-[#C29543]' },
                                    { label: 'Cash Collection', percent: 25, color: 'bg-gray-800' },
                                    { label: 'Bank Cheque', percent: 10, color: 'bg-gray-200' },
                                ].map((mode, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-gray-500 uppercase tracking-widest text-[10px]">{mode.label}</span>
                                            <span className="text-gray-900">{mode.percent}%</span>
                                        </div>
                                        <div className="flex gap-1 h-3">
                                            {[...Array(20)].map((_, idx) => (
                                                <div key={idx} className={`flex-1 rounded-sm ${idx < mode.percent / 5 ? mode.color.replace('bg-', 'bg-') : 'bg-gray-50'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3.5 mt-6 border-2 border-dashed border-gray-100 text-gray-300 rounded-2xl flex items-center justify-center gap-2 hover:border-[#C29543] hover:text-[#C29543] transition-all font-black text-xs uppercase tracking-widest">
                                <Download size={14} /> Full Collection Log
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Defaulter Tab */
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border-l-8 border-l-red-500/10">
                        <div className="flex-1 w-full max-w-lg relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" size={18} />
                            <input type="text" placeholder="Search by Student or Class..." className="w-full pl-12 pr-4 h-12 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-red-500 transition-all placeholder:italic" />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-6 h-12 bg-red-600 text-white rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-xl shadow-lg shadow-red-100 transition-all uppercase tracking-widest">
                                <AlertCircle size={18} /> Bulk Reminders
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="px-6 py-4 border-b border-gray-100 bg-red-50/20 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 text-sm italic tracking-tight uppercase">Defaulter Queue — Urgent Action</h3>
                            <div className="px-3 py-1 bg-white border border-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                                Total At Risk: ₹{mockDefaulters.reduce((acc, curr) => acc + curr.pending, 0)}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-50">
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Grade</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Pending Amount</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Ageing (Days)</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Guardian Contact</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Escalation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockDefaulters.map((row, i) => (
                                        <tr key={i} className="hover:bg-red-50/10 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 border border-gray-100 rounded-lg flex items-center justify-center font-black text-gray-300 group-hover:text-red-500 transition-colors">{(i + 1).toString().padStart(2, '0')}</div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 leading-tight italic">{row.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{row.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100">{row.class}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-black text-red-600 underline decoration-red-100 decoration-2 underline-offset-4">₹{row.pending}</p>
                                            </td>
                                            <td className="px-6 py-4 font-black">
                                                <span className={`text-xs ${row.days > 30 ? 'text-red-700 bg-red-100 px-2 py-0.5 rounded animate-pulse' : 'text-orange-600'}`}>
                                                    {row.days} Days
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center font-black text-xs text-gray-500 italic">
                                                <span className="border-b border-dashed border-gray-200 pb-0.5">{row.contact}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="px-4 py-1.5 bg-white border border-gray-200 text-red-500 font-black text-[10px] rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all uppercase tracking-widest shadow-sm">Notify Now</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeReports;
