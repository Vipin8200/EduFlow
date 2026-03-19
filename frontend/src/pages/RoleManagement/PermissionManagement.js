import React, { useState } from 'react';
import {
    ShieldCheck, Plus, Search, Filter,
    MoreVertical, Lock, Key, Eye,
    Edit3, Trash2, PlusSquare, Layout,
    ChevronDown, Save, Share2, Info,
    Shield, Activity, Settings2, MonitorCheck, Users, CheckCircle2
} from 'lucide-react';

const mockModules = [
    { id: 1, name: 'Student Management', sections: ['Profile', 'Admission', 'Attendance'] },
    { id: 2, name: 'Finance & Accounts', sections: ['Fees', 'Payroll', 'Expenses'] },
    { id: 3, name: 'Inventory & Assets', sections: ['Products', 'Stock', 'Allocation'] },
];

const PermissionManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Access Control Matrix</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Map granular permissions to institutional roles across various functional modules.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right transition-all">
                    <button className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Save size={14} /> Commit Changes</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Share2 size={14} /> Export Policy</button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Role Context', val: 'Academic Faculty', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Total Modules', val: '18 Active', icon: <Layout />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Perm Intersection', val: '42 Toggles', icon: <Settings2 />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Access Protocol', val: 'Standard', icon: <Shield />, color: 'text-gray-950', bg: 'bg-gray-100' },
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
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative font-sans">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Module or Section..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Target Role: Academic Faculty</option>
                            <option>Target Role: Student Parent</option>
                        </select>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Module Map</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Conflict Audit</button>
                </div>
            </div>

            {/* Permission Matrix Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700 font-sans">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-[-15deg]">
                    <ShieldCheck size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Authority Mapping Index</h3>
                    <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><Key size={20} /></div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 italic font-black uppercase tracking-widest">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400">Functional Module</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">View</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Append</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Edit</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 text-center">Purge</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockModules.map(mod => (
                                <React.Fragment key={mod.id}>
                                    <tr className="bg-gray-50/50 group/row">
                                        <td className="px-10 py-4" colSpan={5}>
                                            <div className="flex items-center gap-3">
                                                <ChevronDown size={14} className="text-[#C29543]" />
                                                <span className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">{mod.name} Module Block</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {mod.sections.map((section, idx) => (
                                        <tr key={idx} className="hover:bg-orange-50/5 transition-colors group">
                                            <td className="px-12 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-xl group-hover:text-[#C29543] group-hover:bg-white transition-all shadow-sm italic text-[10px] tracking-tighter">SEC</div>
                                                    <span className="font-black text-gray-900 text-sm italic tracking-tighter uppercase underline decoration-gray-50 decoration-4 group-hover:decoration-orange-100">{section} Unit</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-5 text-center">
                                                <div className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-100 bg-green-50 text-green-500 shadow-sm cursor-pointer group-hover:scale-110 transition-transform"><CheckCircle2 size={16} /></div>
                                            </td>
                                            <td className="px-10 py-5 text-center">
                                                <div className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-gray-200 hover:bg-green-50 hover:text-green-500 transition-all cursor-pointer group-hover:scale-110"><PlusSquare size={16} /></div>
                                            </td>
                                            <td className="px-10 py-5 text-center">
                                                <div className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-gray-200 hover:bg-orange-50 hover:text-[#C29543] transition-all cursor-pointer group-hover:scale-110"><Edit3 size={16} /></div>
                                            </td>
                                            <td className="px-10 py-5 text-center">
                                                <div className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-100 bg-white text-gray-200 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer group-hover:scale-110"><Trash2 size={16} /></div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] transform rotate-12 skew-x-12 translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-5">
                        <div className="p-4 bg-white/10 rounded-[24px] border border-white/10 shadow-xl"><ShieldCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Cryptographic Access Policy</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">Institutional permission mapping is protected by a redundant cryptographic audit trail. Changes to the Access Control Matrix require multi-factor verification by the Super Administrative cluster for deployment.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Policy Integrity
                </button>
            </div>
        </div>
    );
};

export default PermissionManagement;
