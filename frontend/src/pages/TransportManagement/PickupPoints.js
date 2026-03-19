import React, { useState } from 'react';
import {
    MapPinHouse, Plus, Search, Filter,
    Users, Clock, Route, Milestone,
    ChevronRight, Save, Trash2, Edit2,
    Share2, MoreVertical, Layout, MapPin,
    ArrowUpDown, InfoIcon, MonitorCheck
} from 'lucide-react';

const mockPickups = [
    { id: 1, name: 'North Garden Gate', route: 'North Campus Hub', sequence: 1, time: '07:15 AM', students: 12 },
    { id: 2, name: 'Metro Pillar #42', route: 'Metro Station Loop', sequence: 1, time: '07:30 AM', students: 8 },
    { id: 3, name: 'Public Library Corner', route: 'North Campus Hub', sequence: 2, time: '07:22 AM', students: 5 },
    { id: 4, name: 'S. Park Residency', route: 'South Garden Link', sequence: 3, time: '07:15 AM', students: 18 },
];

const PickupPoints = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Pickup Points</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage localized stops, boarding sequences, and student assignments.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Add New Stop
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 animate-in fade-in slide-in-from-top-5 duration-700">
                {/* Form Sidebar / Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 border-b-8 border-b-[#C29543]/10">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <MapPinHouse size={24} className="text-[#C29543]" />
                            <h3 className="font-black text-xl italic uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-[-2px]">Define Stop</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Stop Identifier</label>
                                <input type="text" placeholder="e.g. Crossway Towers" className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543] focus:bg-white transition-all italic placeholder:text-gray-300" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Boarding Schedule</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                    <input type="time" className="w-full pl-11 pr-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:outline-none focus:border-[#C29543]" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Target Route Assignment</label>
                                <select className="w-full px-5 h-12 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black outline-none">
                                    <option>North Campus Hub</option>
                                    <option>Metro Station Loop</option>
                                </select>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-[24px] font-black text-xs tracking-[4px] uppercase hover:bg-black transition-all shadow-2xl shadow-gray-200">
                                Create Stop ID
                            </button>
                        </div>
                    </div>

                    <div className="bg-orange-50/50 p-6 rounded-[32px] border border-orange-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C29543]"></div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic tracking-widest">Boarding Optimization</h4>
                        </div>
                        <p className="text-[11px] font-bold text-[#C29543] leading-relaxed uppercase tracking-widest italic">Wait-time is currently averaged at <span className="text-xl font-black italic underline decoration-orange-100 decoration-8 underline-offset-4">4.2 Minutes</span> per point.</p>
                    </div>
                </div>

                {/* Table Registry */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row gap-6 flex-1">
                            <div className="relative group flex-1 max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input type="text" placeholder="Search Pickup Map Registry..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm" />
                            </div>
                            <div className="flex gap-4">
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><ArrowUpDown size={18} /></button>
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                            </div>
                        </div>
                        <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                            <button className="px-5 py-2.5 bg-white text-gray-900 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Stop List</button>
                            <button className="px-5 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">Student Allocation</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl shadow-gray-100/30 overflow-hidden group/list relative animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                            <MapPinHouse size={300} />
                        </div>
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 italic">
                                    <tr>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Waypoint Descriptor</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Sequence #</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Assigned Route</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Load</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockPickups.map(stat => (
                                        <tr key={stat.id} className="hover:bg-orange-50/5 transition-colors group">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-gray-50 border border-gray-100 text-gray-300 rounded-xl group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all font-black shadow-sm"><MapPin size={16} /></div>
                                                    <div className="space-y-0.5">
                                                        <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{stat.name}</p>
                                                        <p className="text-[10px] font-black text-[#C29543] uppercase tracking-widest flex items-center gap-2 italic leading-none"><Clock size={10} /> {stat.time}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 px-10 py-5">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-black text-gray-400 italic mb-1 group-hover:bg-[#C29543] group-hover:text-white transition-all shadow-sm">#{stat.sequence}</div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{stat.route}</span>
                                            </td>
                                            <td className="px-8 py-4 font-black">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1 px-1.5 bg-blue-50 text-blue-500 rounded-md"><Users size={10} /></div>
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">{stat.students} Boarders</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-blue-500 transition-all bg-white shadow-sm"><Edit2 size={16} /></button>
                                                    <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-black transition-all bg-white shadow-sm"><Users size={16} /></button>
                                                    <button className="p-2 border border-gray-100 rounded-lg text-gray-300 hover:text-red-500 transition-all bg-white shadow-sm"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-10 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] skew-x-12 translate-x-32 transition-transform duration-1000 group-hover:translate-x-0"></div>
                        <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="p-4 bg-white/10 rounded-[24px]"><MonitorCheck size={24} className="text-[#C29543]" /></div>
                                <h3 className="text-xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Allocation Intelligence</h3>
                            </div>
                            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xl italic">Transport stop sequences are optimized for minimum idling. Student allocation to pickup points is automatically validated against residential GIS data to ensure route efficiency.</p>
                        </div>
                        <button className="px-10 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                            Geospatial Audit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickupPoints;
