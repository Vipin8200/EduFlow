import React, { useState } from 'react';
import {
    Award, BarChart3, Search, Printer,
    Share2, Download, CheckCircle2, AlertCircle,
    Layout, Filter, RefreshCw, Bookmark,
    Database, Eye, EyeOff
} from 'lucide-react';

const mockResults = [
    { id: 'ADM-201', name: 'Aarav Sharma', total: '482/500', percent: '96.4%', grade: 'A+', position: '1st', status: 'Published' },
    { id: 'ADM-202', name: 'Priya Verma', total: '445/500', percent: '89.0%', grade: 'A', position: '5th', status: 'Published' },
    { id: 'ADM-203', name: 'Rohan Gupta', total: '390/500', percent: '78.0%', grade: 'B+', position: '12th', status: 'Draft' },
    { id: 'ADM-204', name: 'Sneha Patel', total: '412/500', percent: '82.4%', grade: 'A', position: '8th', status: 'Pending' },
];

const Results = () => {
    const [selectedExam, setSelectedExam] = useState('First Terminal 2024');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Academic Outcome Analysis</h1>
                    <p className="text-sm text-gray-500 font-medium">Finalize and publish examination results for First Terminal Examination.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm overflow-hidden scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:shadow-xl transition-all"><Database size={14} /> Calculate All</button>
                    <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 font-bold text-xs hover:text-gray-900 transition-all"><Share2 size={14} /> Global Publish</button>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Classes Processed', val: '12 / 12', status: '100%', color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Passing Average', val: '82.4%', status: '+2.1%', color: 'text-green-600', bg: 'bg-green-50/50', icon: <BarChart3 /> },
                    { label: 'Highest Scored', val: '492 / 500', status: 'Rohan (10A)', color: 'text-[#C29543]', bg: 'bg-orange-50/50', icon: <Award /> },
                    { label: 'Deficiency Alarm', val: '8 Students', status: 'Needs Action', color: 'text-red-500', bg: 'bg-red-50/50', icon: <AlertCircle /> },
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                                <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${m.bg} ${m.color} group-hover:scale-110 transition-transform duration-500`}>
                                {m.icon ? React.cloneElement(m.icon, { size: 24 }) : <Bookmark size={24} />}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full text-gray-400">{m.status}</span>
                            <div className="h-0.5 flex-1 bg-gray-50 rounded-full overflow-hidden">
                                <div className={`h-full ${m.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Result by Name or ID..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]" value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
                            <option>First Terminal 2024</option>
                            <option>Annual Final Examination</option>
                        </select>
                        <select className="px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Grade 10-A</option>
                            <option>Grade 9-B</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-xl shadow-gray-300"><RefreshCw size={14} /> Recalculate</button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 font-bold text-xs hover:text-black transition-all"><Filter size={16} /></button>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Rank</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student Summary</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Score Ratio</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Grade Point</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Visibility Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Documents</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockResults.map((res, i) => (
                                <tr key={res.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center font-black text-xs border ${res.position === '1st' ? 'bg-[#C29543] text-white border-orange-200' : 'bg-white text-gray-300 border-gray-100'
                                            }`}>
                                            {res.position}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col space-y-0.5">
                                            <p className="text-sm font-black text-gray-900 leading-tight italic">{res.name}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{res.id} — Aggregate</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="space-y-1 flex flex-col items-center">
                                            <span className="text-sm font-black text-gray-900 italic">{res.total}</span>
                                            <div className="px-2 py-0.5 bg-gray-900/5 rounded-md text-[9px] font-black text-gray-600 tracking-widest">{res.percent}</div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`text-xl font-black ${res.grade === 'A+' ? 'text-[#C29543] underline decoration-orange-100 decoration-4' : 'text-gray-900 font-bold'
                                            }`}>
                                            {res.grade}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            {res.status === 'Published' ? (
                                                <div className="flex items-center gap-1.5 text-green-600 font-black text-[9px] uppercase tracking-widest"><Eye size={12} /> Live</div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-gray-400 font-black text-[9px] uppercase tracking-widest"><EyeOff size={12} /> Hidden</div>
                                            )}
                                            <div className={`h-1.5 w-1.5 rounded-full ${res.status === 'Published' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 hover:border-blue-100 transition-all"><Download size={16} /></button>
                                            <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black hover:border-black transition-all"><Printer size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-8 border-t border-gray-50 bg-gray-50/20 text-center">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed border-b border-dashed border-gray-200 pb-4 mb-4">You are finalizing Grade 10-A Results for {selectedExam}. This action is logged as ADM_EV_902.</p>
                    <button className="px-12 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-sm hover:shadow-2xl transition-all shadow-xl shadow-gray-200 uppercase tracking-[2px] active:scale-95">Save Final Draft</button>
                </div>
            </div>
        </div>
    );
};

export default Results;
