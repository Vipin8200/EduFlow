import React, { useState } from 'react';
import {
    BedDouble, Plus, Search, Filter,
    MoreVertical, User, Users, KeySquare,
    CheckCircle2, AlertCircle, Info,
    LayoutGrid, List, Home, DoorOpen,
    Trash2, Edit2, Share2, Printer
} from 'lucide-react';

const mockRooms = [
    { id: 101, block: 'Wing A', type: 'Triple Share', capacity: 3, filled: 2, status: 'Available', students: ['A. Sharma', 'R. Verma'] },
    { id: 102, block: 'Wing A', type: 'Single Premium', capacity: 1, filled: 1, status: 'Full', students: ['S. Khan'] },
    { id: 201, block: 'Wing B', type: 'Double Share', capacity: 2, filled: 0, status: 'Vacant', students: [] },
    { id: 202, block: 'Wing B', type: 'Double Share', capacity: 2, filled: 2, status: 'Full', students: ['J. Singh', 'M. Das'] },
];

const RoomAllocation = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Dormitory Inventory</h1>
                    <p className="text-sm text-gray-500 font-medium">Coordinate floor-wise occupancy, bed allocations, and student check-ins.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm transition-transform scale-90 md:scale-100 origin-right">
                        <button onClick={() => setViewMode('grid')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
                        <button onClick={() => setViewMode('list')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400'}`}><List size={16} /></button>
                    </div>
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Design New Room
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Capacity', val: '450 Beds', icon: <BedDouble />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Current Occupancy', val: '382 Active', icon: <Users />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Vacant Units', val: '68 Units', icon: <DoorOpen />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Under Maintenance', val: '12 Rooms', icon: <AlertCircle />, color: 'text-red-500', bg: 'bg-red-50/50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                        <div className={`p-4 rounded-[20px] ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(stat.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Room ID or Student..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100 placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Wing A (Main)</option>
                            <option>Wing B (Secondary)</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Allocated</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Under Renovation</button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in zoom-in-95 duration-500">
                    {mockRooms.map(room => (
                        <div key={room.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden relative border-b-8 border-b-gray-50 hover:border-b-[#C29543] flex flex-col items-center p-8 text-center hover:shadow-2xl hover:shadow-orange-100/30">
                            <div className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-300 rounded-xl group-hover:text-gray-950 transition-colors cursor-pointer"><MoreVertical size={14} /></div>

                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-orange-50 border-4 border-white shadow-xl rounded-[28px] flex items-center justify-center text-[#C29543] group-hover:scale-110 transition-transform duration-500">
                                    <Home size={32} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-[10px] font-black italic tracking-tighter border-4 border-white shadow-xl">#{room.id}</div>
                            </div>

                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-gray-50 decoration-8 underline-offset-[-2px] group-hover:decoration-orange-100 transition-all">{room.type}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-6">{room.block}</p>

                            <div className="w-full space-y-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Load Capacity</span>
                                    <span className="text-xs font-black text-gray-900 italic">{room.filled} / {room.capacity}</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-50 border border-gray-100 rounded-full overflow-hidden group-hover:scale-y-125 transition-transform">
                                    <div className={`h-full transition-all duration-700 shadow-xl ${room.filled === room.capacity ? 'bg-red-400 shadow-red-200' : 'bg-[#C29543] shadow-orange-200'}`} style={{ width: `${(room.filled / room.capacity) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="flex -space-x-2 group-hover:-space-x-1 transition-all mb-8">
                                {room.students.map((s, i) => (
                                    <div key={i} className="w-8 h-8 bg-[#C29543]/10 border-2 border-white text-[#C29543] text-[9px] font-black rounded-lg flex items-center justify-center shadow-lg hover:z-20 hover:scale-125 hover:bg-[#C29543] hover:text-white transition-all cursor-pointer uppercase">{s.charAt(0)}</div>
                                ))}
                                {room.filled < room.capacity && (
                                    <div className="w-8 h-8 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-300 rounded-lg flex items-center justify-center hover:bg-orange-50 hover:border-[#C29543] hover:text-[#C29543] transition-all cursor-pointer"><Plus size={10} /></div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <button className="py-3.5 bg-gray-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200 flex items-center justify-center gap-2"><KeySquare size={12} /> Assign</button>
                                <button className="py-3.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:border-[#C29543] transition-all">Audit</button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-orange-50/20 p-12 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#C29543] mb-6 shadow-xl shadow-orange-50 rotate-[-4deg] group-hover:rotate-0 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-lg underline decoration-orange-100 decoration-4 mb-2">Create Segment</h4>
                        <p className="text-[11px] font-bold text-gray-400 max-w-[200px] leading-relaxed uppercase tracking-tighter italic">Define floor boundaries or regional room blocks in the system registry.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm tracking-tight uppercase italic underline decoration-orange-100 decoration-4 underline-offset-4">Inventory Audit Registry</h3>
                        <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><KeySquare size={20} /></div>
                    </div>
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 italic">
                                <tr>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Dorm ID / Unit</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Occupancy Load</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Resident Roster</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">System Status</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockRooms.map(room => (
                                    <tr key={room.id} className="hover:bg-orange-50/5 transition-colors group">
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-200 transition-all shadow-sm">#{room.id}</div>
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20 leading-tight">{room.type}</p>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{room.block}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{room.filled} / {room.capacity} Segments</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5">
                                            <div className="flex -space-x-1.5 overflow-hidden">
                                                {room.students.map((s, i) => (
                                                    <div key={i} className="w-7 h-7 bg-orange-50 border border-white text-[#C29543] text-[9px] font-black rounded-lg flex items-center justify-center uppercase">{s.charAt(0)}</div>
                                                ))}
                                                {room.students.length === 0 && <span className="text-[10px] font-black text-gray-300 italic">No Active Residents</span>}
                                            </div>
                                        </td>
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${room.status === 'Full' ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${room.status === 'Full' ? 'text-red-500' : 'text-green-600'}`}>{room.status === 'Full' ? 'Zero Capacity' : room.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 text-right">
                                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 border border-gray-100 rounded-xl text-gray-300 hover:text-blue-500 transition-all bg-white shadow-sm"><Edit2 size={16} /></button>
                                                <button className="p-2 border border-gray-100 rounded-xl text-gray-300 hover:text-red-500 transition-all bg-white shadow-sm"><Trash2 size={16} /></button>
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
                <div className="absolute top-0 right-0 w-80 h-full bg-white/[0.03] transform rotate-12 scale-150 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px]"><Info size={32} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Allocation Metadata Intelligence</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl italic tracking-tight">Dormitory assignments are automatically cross-indexed with disciplinary histories and medical records. Room status tracking uses a geometric load balancer to ensure equal student distribution across active wings.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full xl:w-auto scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950">Verify Metrics</button>
                    <button className="flex-1 sm:flex-none px-12 h-14 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-white/20 transition-all backdrop-blur-sm">Audit History</button>
                </div>
            </div>
        </div>
    );
};

export default RoomAllocation;
