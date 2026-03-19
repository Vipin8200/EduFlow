import React, { useState } from 'react';
import {
    Car, Bus, Plus, Search, Filter,
    MoreVertical, User, ShieldCheck,
    AlertCircle, FileText, Upload,
    Save, Trash2, Edit2, Info,
    LayoutGrid, List, CheckCircle2
} from 'lucide-react';

const mockVehicles = [
    { id: 1, number: 'MH-12-AS-1024', name: 'King Bus 01', type: 'Bus', capacity: '60 Seats', driver: 'R. Sharma', status: 'Active', docStatus: 'Verified' },
    { id: 2, number: 'MH-12-BB-8800', name: 'Mini Van 04', type: 'Van', capacity: '12 Seats', driver: 'A. Gupta', status: 'Inactive', docStatus: 'Expiring' },
    { id: 3, number: 'MH-12-AS-1088', name: 'King Bus 02', type: 'Bus', capacity: '60 Seats', driver: 'S. Khan', status: 'Active', docStatus: 'Verified' },
];

const VehicalManagement = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Fleet Registry</h1>
                    <p className="text-sm text-gray-500 font-medium">Coordinate transport assets, driver assignments, and vehicle compliance.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm">
                        <button onClick={() => setViewMode('grid')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
                        <button onClick={() => setViewMode('list')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400'}`}><List size={16} /></button>
                    </div>
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Register Vehicle
                    </button>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Fleet', val: '12 Units', icon: <Bus />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Active Drivers', val: '08 Active', icon: <User />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Document Health', val: '92%', icon: <ShieldCheck />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Expiring Soon', val: '03 Units', icon: <AlertCircle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(stat.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search by Plate or Name..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>All Types</option>
                            <option>HVD (Bus)</option>
                            <option>LVD (Van)</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl">
                    <button className="px-6 py-2 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Main Fleet</button>
                    <button className="px-6 py-2 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-gray-900 transition-all">Archives</button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
                    {mockVehicles.map(v => (
                        <div key={v.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden relative border-b-8 border-b-gray-50 hover:border-b-[#C29543] flex flex-col items-center p-8 text-center hover:shadow-2xl hover:shadow-orange-100/30">
                            <div className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-300 rounded-xl group-hover:text-gray-950 transition-colors cursor-pointer"><MoreVertical size={14} /></div>
                            <div className="w-20 h-20 bg-orange-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-[#C29543] mb-6 group-hover:scale-[1.15] transition-transform duration-500">
                                {v.type === 'Bus' ? <Bus size={32} /> : <Car size={32} />}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-gray-50 decoration-8 underline-offset-[-2px] group-hover:decoration-orange-100 transition-all">{v.number}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-6">{v.name} — {v.capacity}</p>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <div className="p-1 px-1.5 bg-[#C29543] text-white rounded-md"><User size={10} /></div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase italic tracking-tight">{v.driver}</span>
                                </div>
                                <span className={`h-2 w-2 rounded-full ${v.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{v.status}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <button className="py-3.5 bg-gray-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200">View Docs</button>
                                <button className="py-3.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:border-[#C29543] transition-all">Maintenance</button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-orange-50/20 p-12 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#C29543] mb-6 shadow-xl shadow-orange-50 rotate-[-4deg] group-hover:rotate-0 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-lg underline decoration-orange-100 decoration-4 mb-2">Register Asset</h4>
                        <p className="text-[11px] font-bold text-gray-400 max-w-[200px] leading-relaxed uppercase tracking-tighter italic">Enroll new buses, vans or transport units into institutional registry.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm tracking-tight uppercase italic underline decoration-orange-100 decoration-4 underline-offset-4">Fleet Inventory Log</h3>
                        <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><Bus size={20} /></div>
                    </div>
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 italic">
                                <tr>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Plate # / Name</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Load Capacity</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Assigned Driver</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Compliance Status</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockVehicles.map(v => (
                                    <tr key={v.id} className="hover:bg-orange-50/5 transition-colors group">
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-200 transition-all">{v.type === 'Bus' ? <Bus size={18} /> : <Car size={18} />}</div>
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20 leading-tight">{v.number}</p>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{v.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 text-center px-10 py-5">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{v.capacity} Units</span>
                                        </td>
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#C29543]"><User size={14} /></div>
                                                <span className="text-[11px] font-black text-gray-500 uppercase italic tracking-tight">{v.driver}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-lg ${v.docStatus === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}><ShieldCheck size={14} /></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${v.docStatus === 'Verified' ? 'text-green-600' : 'text-red-500'}`}>{v.docStatus}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 text-right">
                                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 hover:border-blue-100 transition-all"><Edit2 size={16} /></button>
                                                <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-green-600 hover:border-green-100 transition-all"><FileText size={16} /></button>
                                                <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-red-500 hover:border-red-100 transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-white/[0.03] transform rotate-12 scale-150 transition-transform duration-1000 group-hover:rotate-0"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><FileText size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-3xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Registry Compliance Hub</h3>
                    </div>
                    <p className="text-gray-400 text-base font-medium leading-relaxed max-w-2xl italic tracking-tight">Access digital copies of RC, Insurance, and Fitness Certificates. The system automatically cross-verifies document validity against institutional Safety Protocols during daily dispatch.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full xl:w-auto scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Audit Compliance</button>
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">System Logs</button>
                </div>
            </div>
        </div>
    );
};

export default VehicalManagement;
