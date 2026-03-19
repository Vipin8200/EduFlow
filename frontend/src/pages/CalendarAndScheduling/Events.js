import React, { useState } from 'react';
import {
    PartyPopper, Plus, Search, Filter,
    Calendar, MapPin, Users, ArrowRight,
    Edit2, Trash2, Share2, MoreVertical,
    Star, Clock, Info, LayoutGrid, List
} from 'lucide-react';

const mockEvents = [
    { id: 1, title: 'Grand Annual Sports Meet 2024', date: '2024-04-12', time: '09:00 AM', location: 'Main Stadium', audience: 'All School', status: 'Upcoming', type: 'Featured' },
    { id: 2, title: 'Interschool Debate Championship', date: '2024-04-15', time: '10:30 AM', location: 'Auditorium', audience: 'Grade 9-12', status: 'Registration Open', type: 'Normal' },
    { id: 3, title: 'Science & Innovation Fair', date: '2024-04-18', time: '08:00 AM', location: 'Science Wing', audience: 'All Students', status: 'Upcoming', type: 'Normal' },
    { id: 4, title: 'Alumni Meet & Networking', date: '2024-04-20', time: '05:00 PM', location: 'School Banquet', audience: 'Alumni', status: 'Planning', type: 'Featured' },
];

const Events = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Event Management</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Orchestrate campus activities, cultural fests, and academic symposiums.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-white p-1 border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <button onClick={() => setViewMode('grid')} className={`p-2.5 px-4 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
                        <button onClick={() => setViewMode('list')} className={`p-2.5 px-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-400'}`}><List size={16} /></button>
                    </div>
                    <button className="flex items-center gap-2 px-8 h-12 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:shadow-xl transition-all shadow-lg shadow-orange-100 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Schedule Event
                    </button>
                </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Scheduled Events..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>All Types</option>
                            <option>Featured</option>
                            <option>Registration Open</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-2xl">
                    <button className="px-6 py-2 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Upcoming</button>
                    <button className="px-6 py-2 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-gray-900 transition-all">Past Events</button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in zoom-in-95 duration-500">
                    {mockEvents.map(ev => (
                        <div key={ev.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-orange-100 relative group">
                            {ev.type === 'Featured' && (
                                <div className="absolute top-6 left-6 z-10 p-2 bg-gray-900 text-[#C29543] rounded-xl shadow-xl border border-[#C29543]/20 scale-90 md:scale-100 origin-left"><Star size={16} fill="currentColor" /></div>
                            )}
                            <div className="aspect-[16/10] bg-gray-100 relative group-hover:scale-[1.05] transition-transform duration-700">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute top-6 right-6 p-2 bg-white/40 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/20"><MoreVertical size={14} /></div>
                                <div className="absolute bottom-6 left-6 p-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[3px] border border-[#C29543]/30">
                                    {ev.status}
                                </div>
                            </div>
                            <div className="p-8 space-y-6 flex-1 flex flex-col">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-0.5 w-6 bg-[#C29543] rounded-full"></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{ev.audience}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 italic tracking-tight leading-tight group-hover:underline decoration-orange-100 decoration-8 underline-offset-4 group-hover:text-black transition-colors">{ev.title}</h3>
                                </div>

                                <div className="pt-6 border-t border-gray-50 space-y-3 mt-auto">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest italic"><Calendar size={12} className="text-[#C29543]" /> {ev.date}</div>
                                    <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest italic"><MapPin size={12} className="text-[#C29543]" /> {ev.location}</div>
                                </div>

                                <button className="w-full py-4 bg-gray-50 group-hover:bg-[#C29543] group-hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[4px] transition-all border border-gray-100 group-hover:border-[#C29543] shadow-inner">
                                    Manage Registry
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-orange-50/20 p-8 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100">
                        <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-[#C29543] mb-6 shadow-xl shadow-orange-50 rotate-[-4deg] group-hover:rotate-0 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-lg underline decoration-orange-100 decoration-4 mb-2">Create Gallery Item</h4>
                        <p className="text-[11px] font-bold text-gray-400 max-w-[150px] leading-relaxed uppercase tracking-tighter">Submit a new campus activity or fest for formal scheduling.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm">Recently Indexed Events</h3>
                        <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Users size={18} /></div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Event Title</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Schedule</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Venue</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Target Audience</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockEvents.map(ev => (
                                    <tr key={ev.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-orange-100"><PartyPopper size={14} /></div>
                                                <span className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20 leading-tight">{ev.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-[10px] font-black text-gray-500 uppercase italic tracking-widest">{ev.date}</span>
                                                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest border-t border-gray-50 pt-1 mt-1">{ev.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-[10px] font-black text-[#C29543] uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-orange-50">{ev.location}</span>
                                        </td>
                                        <td className="px-8 py-4 font-black text-gray-400 text-xs italic">{ev.audience}</td>
                                        <td className="px-8 py-4 text-right flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                            <button className="p-2 text-gray-300 hover:text-[#C29543] transition-colors"><Share2 size={16} /></button>
                                            <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-gray-900 p-10 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[600px] h-full bg-white/[0.03] rotate-12 -translate-x-20 transition-transform duration-1000 group-hover:rotate-0"></div>
                <div className="flex-1 space-y-4 text-center md:text-left relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl"><Info size={24} className="text-[#C29543]" /></div>
                        <h4 className="text-2xl font-black italic tracking-wide uppercase">Institutional Calendar Sync</h4>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl italic">All scheduled events are automatically synchronized with student IDs and broadcasted via institutional calendars. Registration deadlines are enforced by the core academic system.</p>
                </div>
                <button className="px-10 h-14 bg-white text-black rounded-[20px] font-black text-xs uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all transform active:scale-95 shadow-xl shadow-gray-950 relative z-10">
                    Audit All Events
                </button>
            </div>
        </div>
    );
};

export default Events;
