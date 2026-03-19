import React, { useState } from 'react';
import {
    CreditCard, Search, ExternalLink, Filter,
    Calendar, CheckCircle2, XCircle, Clock,
    LayoutGrid, List, RefreshCw, BarChart
} from 'lucide-react';

const mockTransactions = [
    { id: 'TXN-9023412', student: 'Aarav Sharma', amount: 15000, mode: 'Net Banking', date: '2024-03-12 14:20', status: 'Success', gateway: 'Razorpay' },
    { id: 'TXN-9023413', student: 'Priya Verma', amount: 5500, mode: 'UPI', date: '2024-03-12 10:45', status: 'Success', gateway: 'Razorpay' },
    { id: 'TXN-9023414', student: 'Rohan Gupta', amount: 15000, mode: 'Credit Card', date: '2024-03-11 18:30', status: 'Failed', gateway: 'Paytm' },
    { id: 'TXN-9023415', student: 'Sneha Patel', amount: 15000, mode: 'UPI', date: '2024-03-11 09:15', status: 'Success', gateway: 'Razorpay' },
    { id: 'TXN-9023416', student: 'Kabir Singh', amount: 12000, mode: 'Net Banking', date: '2024-03-10 16:50', status: 'Pending', gateway: 'Paytm' },
];

const OnlinePayments = () => {
    const [viewMode, setViewMode] = useState('list'); // 'grid' | 'list'

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Online Transactions</h1>
                    <p className="text-sm text-gray-500 font-medium">Real-time monitoring of all digital gateway payments.</p>
                </div>
                <div className="flex bg-white p-1 border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-orange-50 text-[#C29543]' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-orange-50 text-[#C29543]' : 'text-gray-400'}`}><List size={16} /></button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Today Total', val: '₹42,500', color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Success Rate', val: '98.2%', color: 'text-green-600', bg: 'bg-green-50/50', icon: <CheckCircle2 size={16} /> },
                    { label: 'Active Gateway', val: 'Razorpay / Paytm', color: 'text-blue-600', bg: 'bg-blue-50/50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                            {stat.icon ? stat.icon : <CreditCard size={18} />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls Filter */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Transaction ID or Student Name..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black transition-all outline-none focus:border-[#C29543] focus:bg-white" />
                    </div>
                    <div className="flex gap-3">
                        <div className="px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-xs font-bold text-gray-400">Date Range</span>
                            <div className="flex gap-2">
                                <input type="date" className="bg-transparent text-[10px] font-black text-gray-700 outline-none" />
                                <span className="text-gray-300">to</span>
                                <input type="date" className="bg-transparent text-[10px] font-black text-gray-700 outline-none" />
                            </div>
                        </div>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-[#C29543] hover:border-[#C29543] transition-all"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-xl shadow-gray-200"><RefreshCw size={14} /> Sync Status</button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C29543] text-white rounded-xl font-bold text-xs hover:shadow-xl hover:translate-y-[-2px] transition-all"><BarChart size={14} /> View Analytics</button>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Transaction Ref</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Gateway / Mode</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Date & Time</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockTransactions.map((tx, i) => (
                                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-gray-900 text-xs italic tracking-tighter">{tx.id}</span>
                                            <ExternalLink size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-gray-800 italic">{tx.student}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-gray-900 tracking-tight">₹{tx.amount}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tx.mode}</span>
                                            <span className="text-[11px] font-black text-blue-500 italic leading-none">{tx.gateway}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[11px] font-bold text-gray-500">{tx.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {tx.status === 'Success' && <CheckCircle2 size={14} className="text-green-500" />}
                                            {tx.status === 'Failed' && <XCircle size={14} className="text-red-500" />}
                                            {tx.status === 'Pending' && <Clock size={14} className="text-orange-500 animate-spin" style={{ animationDuration: '10s' }} />}
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${tx.status === 'Success' ? 'bg-green-50 border-green-100 text-green-700' :
                                                    tx.status === 'Failed' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-orange-50 border-orange-100 text-orange-700'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className={`px-3 py-1.5 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tx.status === 'Success' ? 'text-[#C29543] bg-white hover:bg-orange-50 hover:border-orange-100' : 'text-gray-300 pointer-events-none'}`}>
                                            Receipt
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OnlinePayments;
