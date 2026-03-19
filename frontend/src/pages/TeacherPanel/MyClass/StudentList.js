import React, { useState } from 'react';
import {
    Users, Search, Filter,
    MoreVertical, User, ChevronRight,
    GraduationCap, BookOpen, Clock,
    CheckCircle2, AlertCircle
} from 'lucide-react';

const StudentList = () => {
    const students = [
        { id: 'S101', name: 'Rahul Mevada', roll: '101', grade: '10-A', status: 'Active', photo: 'RM' },
        { id: 'S102', name: 'Sneha Patel', roll: '102', grade: '10-A', status: 'Active', photo: 'SP' },
        { id: 'S103', name: 'Arjun Singh', roll: '103', grade: '10-A', status: 'Active', photo: 'AS' },
        { id: 'S104', name: 'Priya Sharma', roll: '104', grade: '10-A', status: 'Inactive', photo: 'PS' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Student Registry</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Comprehensive inventory of students currently under your pedagogical supervision.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex bg-white h-12 border border-gray-100 rounded-2xl p-1 shadow-sm">
                        <div className="px-4 flex items-center gap-3 border-r border-gray-50 group hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                            <Filter size={14} className="text-gray-400 group-hover:text-[#C29543]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Filters</span>
                        </div>
                        <div className="flex-1 flex items-center px-4 gap-3 min-w-[200px]">
                            <Search size={16} className="text-gray-300" />
                            <input type="text" placeholder="Search Registries..." className="bg-transparent text-[11px] font-bold outline-none uppercase tracking-widest text-gray-600 italic placeholder:text-gray-300 w-full" />
                        </div>
                    </div>
                    <button className="h-12 px-8 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-[#C29543] active:scale-95 transition-all">
                        Bulk View
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {students.map((std) => (
                    <div key={std.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-[#C29543]/30 transition-all group relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            <User size={150} />
                        </div>

                        <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-xl font-black text-gray-300 mb-6 group-hover:scale-110 group-hover:bg-orange-50 group-hover:text-[#C29543] transition-all duration-500 shadow-sm">
                            {std.photo}
                        </div>

                        <div className="text-center space-y-1 mb-6 relative z-10 w-full">
                            <h3 className="text-lg font-black text-gray-900 italic tracking-tight uppercase leading-tight">{std.name}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {std.id}</p>
                                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                <p className="text-[10px] font-black text-[#C29543] uppercase tracking-widest">Roll: {std.roll}</p>
                            </div>
                        </div>

                        <div className="w-full space-y-3 mb-8">
                            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                                <span className="text-[9px] font-black text-gray-400 uppercase italic">Module Class</span>
                                <span className="text-[10px] font-black text-gray-900 italic uppercase">{std.grade}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                                <span className="text-[9px] font-black text-gray-400 uppercase italic">Metric Status</span>
                                <span className={`text-[10px] font-black italic uppercase ${std.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{std.status}</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-xl shadow-gray-200 hover:bg-[#C29543] transition-all relative z-10">
                            Academic Profile <ChevronRight size={14} />
                        </button>
                    </div>
                ))}

                {/* Growth Metric Card */}
                <div className="bg-[#C29543] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                        <GraduationCap size={150} />
                    </div>
                    <h3 className="text-xl font-black uppercase italic tracking-tight underline decoration-white/20 decoration-8 underline-offset-4 mb-4">Integrity Index</h3>
                    <p className="text-white/80 text-xs font-medium leading-relaxed italic mb-8 max-w-xs">Pedagogical health across this cluster is currently benchmarked at 94.2%. Ensure session reports align with individual growth metrics.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl"><CheckCircle2 size={18} /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest">Growth Delta</p>
                                <p className="text-sm font-black italic tracking-tighter text-white">+8.4% This Term</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
