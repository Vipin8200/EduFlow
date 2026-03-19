import React, { useState } from 'react';
import {
    MapPin, Plus, Search, Filter,
    Bus, User, Clock, Route,
    ChevronRight, Info, Save, Trash2,
    Edit2, Share2, MoreVertical, Layout,
    Milestone, Navigation, ListChecks
} from 'lucide-react';

const mockRoutes = [
    { id: 1, name: 'North Campus Hub', vehicle: 'MH-12-AS-1024', driver: 'R. Sharma', timing: '07:15 AM - 08:00 AM', distance: '12.4 KM', stops: 8, status: 'Active' },
    { id: 2, name: 'Metro Station Loop', vehicle: 'MH-12-BB-8800', driver: 'A. Gupta', timing: '07:30 AM - 08:30 AM', distance: '8.2 KM', stops: 5, status: 'Active' },
    { id: 3, name: 'South Garden Link', vehicle: 'MH-12-AS-1088', driver: 'S. Khan', timing: '07:00 AM - 08:15 AM', distance: '15.8 KM', stops: 12, status: 'Active' },
];

const RouteManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Geometric Route Planning</h1>
                    <p className="text-sm text-gray-500 font-medium">Define transit trajectories, waypoint sequencing, and resource allocation.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:shadow-xl transition-all shadow-lg shadow-orange-100 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Design New Route
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Channels', val: '12 Routes', icon: <Navigation />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Tracked Waypoints', val: '84 Stops', icon: <MapPin />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Avg Transit Time', val: '42.8 Min', icon: <Clock />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Commuter Load', val: '482 Students', icon: <User />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group relative overflow-hidden">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Route Map Index..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100 placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Shift: Morning</option>
                            <option>Shift: Afternoon</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm shadow-gray-100"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-4 items-center scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-6 h-11 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-300"><Milestone size={14} /> Waypoint Master</button>
                    <button className="p-3.5 bg-white border border-gray-100 rounded-xl text-[#C29543] hover:shadow-lg transition-all"><Share2 size={18} /></button>
                </div>
            </div>

            {/* Routes Registry Table */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden group/list relative animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-[-15deg]">
                    <Route size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-sm italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Active Route Channels</h3>
                    <div className="flex gap-3">
                        <div className="p-2.5 bg-white border border-gray-100 text-[#C29543] rounded-2xl shadow-sm"><Route size={20} /></div>
                    </div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Route Descriptor</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Dispatch Unit</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Geometric Scale</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Operator Info</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockRoutes.map(route => (
                                <tr key={route.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-200 transition-all shadow-sm"><Route size={18} /></div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20 leading-tight tracking-tight">{route.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{route.stops} Waypoints — {route.timing}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center px-10 py-5">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{route.vehicle}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[11px] font-black text-[#C29543] uppercase tracking-widest italic">{route.distance}</span>
                                            <div className="h-0.5 w-8 bg-orange-100 rounded-full mt-1"></div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-[#C29543] group-hover:border-orange-200 transition-all"><User size={14} /></div>
                                            <span className="text-[11px] font-black text-gray-500 uppercase italic tracking-tight">{route.driver}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-blue-500 hover:border-blue-100 transition-all shadow-sm bg-white"><Edit2 size={16} /></button>
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-black hover:border-black transition-all shadow-sm bg-white"><Navigation size={16} /></button>
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-red-500 hover:border-red-100 transition-all shadow-sm bg-white"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] rotate-[-15deg] translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><ListChecks size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Dispatch Synchronization</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl italic tracking-tight">The Route Registry is cross-referenced with Driver Duty Logs. Changes to waypoints or timing automatically notify assigned students and parents via push-notification protocols.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full xl:w-auto scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Recalculate Timing</button>
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">Geometric Audit</button>
                </div>
            </div>
        </div>
    );
};

export default RouteManagement;
