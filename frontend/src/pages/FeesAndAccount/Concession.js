import React, { useState } from 'react';
import {
    Tag, Plus, Search, Edit2, Trash2,
    UserPlus, Percent, CheckCircle, Info,
    ChevronRight, CreditCard, Filter
} from 'lucide-react';

const mockConcessions = [
    { id: 1, name: 'Sibling Discount', type: 'Percentage', value: 15, active: true },
    { id: 2, name: 'Merit Scholarship', type: 'Fixed', value: 5000, active: true },
    { id: 3, name: 'Staff Child', type: 'Percentage', value: 50, active: true },
];

const mockApplied = [
    { student: 'Aarav Sharma', id: 'ADM-201', rule: 'Sibling Discount', amount: '₹2250', date: '2024-03-01' },
    { student: 'Priya Verma', id: 'ADM-202', rule: 'Merit Scholarship', amount: '₹5000', date: '2024-02-15' },
];

const Concession = () => {
    const [activeTab, setActiveTab] = useState('rules');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Concessions & Scholarships</h1>
                    <p className="text-sm text-gray-500 font-medium">Configure discount rules and manage student applications.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('rules')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'rules' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <Tag size={18} /> Discount Rules
                </button>
                <button
                    onClick={() => setActiveTab('apply')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'apply' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <UserPlus size={18} /> Applied List
                </button>
            </div>

            {activeTab === 'rules' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 self-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Plus size={24} className="text-[#C29543]" />
                            <h3 className="font-black text-gray-900 italic uppercase tracking-tighter text-lg underline decoration-[#C29543]/20 decoration-4">Add New Rule</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Concession Name</label>
                                <input type="text" placeholder="e.g. Sports Quota" className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Value Type</label>
                                <select className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]">
                                    <option>Percentage (%)</option>
                                    <option>Fixed Amount (₹)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Value</label>
                                <div className="relative">
                                    <input type="number" placeholder="Enter number..." className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]" />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Percent size={14} />
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide mt-4 hover:bg-black transition-all shadow-xl shadow-gray-200">
                                Create Rule
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-black text-gray-900 text-sm mb-6 flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-lg"><CheckCircle size={18} /></div>
                                Active Concession Rules
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {mockConcessions.map(rule => (
                                    <div key={rule.id} className="p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#C29543] transition-all group shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#C29543] group-hover:bg-orange-50 transition-all"><Tag size={18} /></div>
                                            <div>
                                                <h4 className="font-black text-gray-900">{rule.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rule.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-black text-gray-900">{rule.type === 'Percentage' ? `${rule.value}%` : `₹${rule.value}`}</p>
                                            <div className="flex gap-2">
                                                <button className="text-gray-300 hover:text-blue-500"><Edit2 size={12} /></button>
                                                <button className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex items-center gap-6">
                            <div className="flex-1 space-y-2">
                                <h4 className="text-lg font-black text-gray-900 underline decoration-orange-100 decoration-4">Quick Application</h4>
                                <p className="text-xs text-gray-500 font-medium">To apply a discount to an individual student, switch to the "Applied List" tab and click "Find Student".</p>
                            </div>
                            <button onClick={() => setActiveTab('apply')} className="px-6 py-2.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl font-black text-xs hover:bg-gray-100 transition-all flex items-center gap-2">
                                Get Started <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                        <div className="flex-1 w-full max-w-lg relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C29543] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search student to apply concession..."
                                className="w-full pl-12 pr-4 h-12 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#C29543] transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-400 hover:text-[#C29543] hover:border-[#C29543] transition-all"><Filter size={20} /></button>
                            <button className="px-8 h-12 bg-[#C29543] text-white rounded-2xl font-black text-sm hover:shadow-xl hover:translate-y-[-2px] transition-all shadow-lg shadow-orange-100">Apply New</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 text-sm">Recently Applied Concessions</h3>
                            <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Info size={16} /></div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Concession Rule</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Saved Amount</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Date Applied</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockApplied.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-gray-900 text-sm italic">{row.student}</td>
                                        <td className="px-6 py-4 font-bold text-gray-400 text-xs">{row.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">{row.rule}</span>
                                        </td>
                                        <td className="px-6 py-4 font-black text-green-600">{row.amount}</td>
                                        <td className="px-6 py-4 text-xs font-bold text-gray-500">{row.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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

export default Concession;
