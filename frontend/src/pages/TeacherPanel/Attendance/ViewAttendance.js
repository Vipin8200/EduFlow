import React from 'react';
import {
    Calendar, Search, Filter,
    MoreVertical, ChevronRight, FileBarChart,
    ArrowUpCircle, ArrowDownCircle, Info,
    CheckCircle2, XCircle, Clock
} from 'lucide-react';

const ViewAttendance = () => {
    const records = [
        { date: 'Mar 18, 2026', present: 38, absent: 4, total: 42, status: 'Synced' },
        { date: 'Mar 17, 2026', present: 40, absent: 2, total: 42, status: 'Synced' },
        { date: 'Mar 16, 2026', present: 36, absent: 6, total: 42, status: 'Synced' },
        { date: 'Mar 15, 2026', present: 39, absent: 3, total: 42, status: 'Discrepancy' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Attendance Analytics</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Analytical review of pedagogical presence logs across multi-temporal nodes.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 scale-90 md:scale-100 origin-right transition-transform">
                    <div className="flex bg-white h-12 border border-gray-100 rounded-2xl p-1 shadow-sm">
                        <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                            <Calendar size={14} className="text-gray-400 group-hover:text-[#C29543]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Temporal Filter</span>
                        </div>
                        <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                            <Search size={16} className="text-gray-300" />
                            <input type="text" placeholder="Registry Search..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic w-full" />
                        </div>
                    </div>
                    <button className="h-12 px-8 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-[#C29543] active:scale-95 transition-all">
                        Export Matrix
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {[
                    { label: 'Avg Presence', val: '91.2%', icon: <FileBarChart />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'High Presence', val: '98%', icon: <CheckCircle2 />, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Low Presence', val: '72%', icon: <XCircle />, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Commit Units', val: '24 Nodes', icon: <Clock />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            {React.cloneElement(s.icon, { size: 100 })}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className="text-2xl font-black text-gray-950 italic tracking-tighter leading-tight mt-1">{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[18px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden relative">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <h3 className="text-sm font-black text-gray-950 italic tracking-widest uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-4">Chronological Registry Grid</h3>
                    <div className="p-2 bg-white rounded-xl border border-gray-100 shadow-sm"><Info size={16} className="text-[#C29543]" /></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-widest">Temporal Node</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-widest text-center">Pedagogical Presence</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-widest text-center">Discrepancy Ratio</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-widest text-center">Commit State</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase italic tracking-widest text-center">Module Access</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {records.map((rec, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-all font-sans">
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <p className="text-[11px] font-black text-gray-900 italic tracking-tight uppercase group-hover:translate-x-1 transition-transform">{rec.date}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black italic uppercase shadow-sm shadow-green-100/50">{rec.present} Present</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black italic uppercase shadow-sm shadow-red-100/50">{rec.absent} Absent</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 mx-auto w-max ${rec.status === 'Synced' ? 'bg-orange-50 text-[#C29543] shadow-sm' : 'bg-red-900 text-white shadow-xl shadow-red-950/20'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${rec.status === 'Synced' ? 'bg-[#C29543]' : 'bg-white animate-pulse'}`}></div>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm group-hover:scale-110"><ChevronRight size={16} /></button>
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

export default ViewAttendance;
