import React, { useState } from 'react';
import {
    Undo2, Search, History, CheckCircle,
    XCircle, Clock, ArrowLeftRight, HelpCircle,
    FileText, User, ChevronRight, AlertCircle
} from 'lucide-react';

const mockRefundHistory = [
    { id: 'REF-001', student: 'Rohan Gupta', admissionId: 'ADM-203', amount: 4500, reason: 'Double Payment', date: '2024-03-05', status: 'Completed' },
    { id: 'REF-002', student: 'Meera Reddy', admissionId: 'ADM-208', amount: 12000, reason: 'Withdrawal', date: '2024-03-10', status: 'In Process' },
    { id: 'REF-003', student: 'Arjun Das', admissionId: 'ADM-209', amount: 2000, reason: 'Overcharge', date: '2024-02-28', status: 'Failed' },
];

const RefundManagement = () => {
    const [activeTab, setActiveTab] = useState('process');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Refund Management</h1>
                <p className="text-sm text-gray-500 font-medium tracking-tight">Systematic processing of student fee reversals and credit notes.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('process')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'process' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <ArrowLeftRight size={18} /> Process Refund
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'history' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <History size={18} /> Refund History
                </button>
            </div>

            {activeTab === 'process' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-orange-50 text-[#C29543] rounded-3xl flex items-center justify-center mb-2 shadow-xl shadow-orange-50 border border-orange-100 rotate-3">
                            <Undo2 size={40} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-black text-xl text-gray-900 leading-tight italic">Initiate Reversal</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Verification Required</p>
                        </div>
                        <div className="w-full space-y-4 pt-4 border-t border-gray-50 text-left">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Student Lookup</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                    <input type="text" placeholder="Admission ID or Name..." className="w-full pl-10 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-[#C29543]" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Refund Amount (₹)</label>
                                <input type="number" placeholder="Enter Amount..." className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black focus:outline-none focus:border-[#C29543]" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Reason for Refund</label>
                                <select className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:border-[#C29543]">
                                    <option>Select Reason...</option>
                                    <option>Withdrawal</option>
                                    <option>Excess Payment</option>
                                    <option>Merit Scholarship Adjustment</option>
                                    <option>Cancelled Admission</option>
                                </select>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide mt-4 hover:bg-black transition-all shadow-xl shadow-gray-200">
                                Verify & Proceed
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative group">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C29543] opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                            <h3 className="font-black text-gray-900 mb-6 flex items-center gap-3 underline decoration-[#C29543]/20 decoration-4">
                                Important Notice
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
                                    <div className="p-2 bg-white text-blue-500 rounded-xl shadow-sm border border-blue-50"><AlertCircle size={18} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-blue-700 text-sm">Policy Awareness</h4>
                                        <p className="text-xs text-blue-600/70 font-bold leading-relaxed">All refunds exceeding ₹5,000 require Secondary Verification from the Accounts Head. Ensure all original receipts are attached electronically.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100 flex items-start gap-4">
                                    <div className="p-2 bg-white text-[#C29543] rounded-xl shadow-sm border border-orange-100"><HelpCircle size={18} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-orange-700 text-sm">Documentation Guide</h4>
                                        <p className="text-xs text-orange-600/70 font-bold leading-relaxed">Prepare the withdrawal form and identity proof of the guardian before submitting the refund request.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute left-0 bottom-0 w-full h-1 bg-[#C29543]"></div>
                            <div className="bg-white/10 p-4 rounded-full"><FileText size={40} className="text-[#C29543]" /></div>
                            <div className="flex-1 text-center md:text-left space-y-1">
                                <h4 className="text-xl font-black">Audit Compliance</h4>
                                <p className="text-xs text-gray-400 font-medium">All refund transactions are logged with an immutable audit trail for yearly compliance checks.</p>
                            </div>
                            <button onClick={() => setActiveTab('history')} className="px-6 py-3 bg-white text-black rounded-xl font-bold text-xs hover:bg-[#C29543] hover:text-white transition-all transform active:scale-95">
                                Review Logs
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h3 className="font-black text-gray-900 italic tracking-tight">Financial Reversal History</h3>
                            <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase text-gray-400">Showing Last 30 Days</div>
                        </div>
                        <div className="relative group w-full max-w-xs transition-all">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#C29543]" size={14} />
                            <input type="text" placeholder="Search history..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-[#C29543] w-full" />
                        </div>
                    </div>
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Refund ID</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Reason / Memo</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Recorded Date</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">State</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockRefundHistory.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-black text-gray-900 italic text-xs underline decoration-gray-100 decoration-2">{row.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400"><User size={14} /></div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 leading-tight">{row.student}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{row.admissionId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-gray-900">₹{row.amount}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">{row.reason}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-black text-gray-400">{row.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${row.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    row.status === 'In Process' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100"><ChevronRight size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RefundManagement;
