import React, { useState } from 'react';
import {
    ListTree, Plus, CirclePlus, Search, Edit2,
    Trash2, ChevronRight, CheckCircle, Save,
    Settings, Users, Info
} from 'lucide-react';

const mockStructures = [
    { id: 1, name: 'General Fee 2024-25', type: 'Yearly', total: 45000, heads: ['Tuition', 'Activity', 'Lab'], classes: 10 },
    { id: 2, name: 'Grade 10 Special', type: 'Monthly', total: 5500, heads: ['Coaching', 'Library'], classes: 1 },
];

const FeeStructure = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Fee Structure Management</h1>
                <p className="text-sm text-gray-500 font-medium">Define and assign standardized fee configuration.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'create' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <CirclePlus size={18} /> Create Structure
                </button>
                <button
                    onClick={() => setActiveTab('assign')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'assign' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <Users size={18} /> Assign to Classes
                </button>
            </div>

            {activeTab === 'create' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Create New Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                        <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-50">
                            <div className="p-2 bg-orange-50 text-[#C29543] rounded-lg items-center justify-center flex"><Settings size={20} /></div>
                            <h3 className="font-black text-gray-900">Configure Head</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Structure Name</label>
                                <input type="text" placeholder="e.g. 2024 Academic Fee" className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Fee Type</label>
                                <select className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]">
                                    <option>One Time Admission</option>
                                    <option>Yearly Basis</option>
                                    <option>Monthly Installments</option>
                                    <option>Quarterly</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 ml-1">Fee Components (Heads)</label>
                                <div className="space-y-2">
                                    {['Tuition Fee', 'Development Fund', 'Exam Fee'].map(head => (
                                        <div key={head} className="flex items-center gap-2 p-2 px-3 bg-gray-50 border border-gray-100 rounded-xl group hover:border-[#C29543] transition-colors">
                                            <span className="text-xs font-bold text-gray-700 flex-1">{head}</span>
                                            <input type="number" placeholder="₹" className="w-20 bg-white border border-gray-200 rounded-lg py-1 px-2 text-xs font-black text-right outline-none focus:border-[#C29543]" />
                                            <button className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-400 text-xs font-bold rounded-xl hover:border-[#C29543] hover:text-[#C29543] transition-all flex items-center justify-center gap-2 mt-2">
                                        <Plus size={14} /> Add New Component
                                    </button>
                                </div>
                            </div>
                            <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide mt-4 hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 duration-100">
                                Save Fee Structure
                            </button>
                        </div>
                    </div>

                    {/* Structure List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-gray-900 text-sm italic">Existing Defined Structures</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {mockStructures.map(s => (
                                    <div key={s.id} className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#C29543] transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-3 flex gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                            <button className="p-1.5 bg-white shadow-md rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-100 transition-all"><Edit2 size={12} /></button>
                                            <button className="p-1.5 bg-white shadow-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white border border-red-100 transition-all"><Trash2 size={12} /></button>
                                        </div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-black text-gray-900 group-hover:text-[#C29543] transition-colors">{s.name}</h4>
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{s.type} Payment</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900 tracking-tight">₹{s.total}</p>
                                                <p className="text-[9px] font-black text-green-500 uppercase tracking-tighter bg-green-50 px-1.5 py-0.5 rounded-full inline-block">Total Value</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                            {s.heads.map(h => (
                                                <span key={h} className="px-2 py-1 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-lg border border-gray-100">{h}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#C29543]/5 p-6 rounded-3xl border border-dashed border-[#C29543]/20 flex items-center gap-5">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#C29543] border border-[#C29543]/10 shadow-sm shrink-0">
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-[#C29543]">Automatic Notifications</h4>
                                <p className="text-xs text-[#C29543]/70 font-bold max-w-md">Whenever a new structure is modified, automated email/SMS notifications will be sent to the assigned parents on the next billing cycle.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Assign Tab */
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black text-gray-900 italic">Assign Structure to Grades</h2>
                            <p className="text-sm text-gray-500 font-medium">Bulk assign defined fee models to academic classes and sections.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">1. Select Destination Grades</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Pre-K', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'].map(c => (
                                        <button key={c} className="text-[10px] font-black py-2 px-1 border border-gray-100 rounded-xl hover:border-[#C29543] hover:bg-orange-50/50 transition-all text-gray-600 active:scale-95">
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">2. Select Structure</label>
                                <div className="space-y-3">
                                    {mockStructures.map(s => (
                                        <div key={s.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 group hover:bg-white hover:shadow-md transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-[#C29543]">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 group-hover:text-[#C29543]"><ListTree size={14} /></div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-gray-800">{s.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400">Total: ₹{s.total}</p>
                                            </div>
                                            <ChevronRight size={14} className="text-gray-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 flex border-t border-gray-50">
                            <button className="ml-auto flex items-center gap-2 px-8 py-3 bg-[#C29543] text-white rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-xl transition-all shadow-lg shadow-orange-100">
                                <Save size={18} /> Apply Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeStructure;
