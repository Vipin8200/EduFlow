import React, { useState } from 'react';
import {
    Library, Plus, Search, Filter,
    MoreVertical, BookOpen, Users,
    Building2, Layout, PlusSquare,
    ChevronRight, Save, Trash2, Edit2,
    Share2, Info, GraduationCap,
    ClipboardList, MonitorCheck
} from 'lucide-react';

const mockCourses = [
    {
        id: 1, name: 'Grade 10 (Secondary)', code: 'G-10', sections: [
            { name: 'Section A', capacity: 40, enrolled: 38 },
            { name: 'Section B', capacity: 40, enrolled: 35 },
        ]
    },
    {
        id: 2, name: 'Grade 12 (Science)', code: 'G-12-SC', sections: [
            { name: 'Section S1', capacity: 30, enrolled: 28 },
        ]
    },
];

const CourseAndSectionSetup = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight leading-relaxed">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Academic Foundation</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Define class hierarchies, section partitions, and localized student enrollment nodes.</p>
                </div>
                <div className="flex gap-4 scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Initialize Grade
                    </button>
                    <button className="flex items-center gap-2 px-6 h-12 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black text-xs hover:text-[#C29543] transition-all shadow-sm uppercase tracking-widest">
                        <PlusSquare size={18} /> Add Section Node
                    </button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Grades', val: '12 Classes', icon: <GraduationCap />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Total Sections', val: '45 Units', icon: <Building2 />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Avg Unit Load', val: '32 Students', icon: <Users />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Struct Integrity', val: 'Optimal', icon: <Library />, color: 'text-gray-950', bg: 'bg-gray-100' },
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
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={16} />
                        <input type="text" placeholder="Search Grade Taxonomy Index..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Wing: Secondary Hub</option>
                            <option>Wing: Primary Block</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Grade View</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Enrollment Audit</button>
                </div>
            </div>

            {/* Course Registry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                {mockCourses.map(course => (
                    <div key={course.id} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-orange-100/30 transition-all group relative overflow-hidden border-b-8 border-b-gray-50 hover:border-b-[#C29543]">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000 rotate-12">
                            <Library size={250} />
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-orange-50 text-[#C29543] rounded-[24px] shadow-sm rotate-8 group-hover:rotate-0 transition-transform"><BookOpen size={24} /></div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase underline decoration-orange-100 decoration-8 underline-offset-[-2px]">{course.name}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] leading-none">Taxonomy ID: {course.code}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-gray-50 text-gray-300 rounded-2xl hover:text-gray-900 transition-colors"><Edit2 size={16} /></button>
                                <button className="p-3 bg-gray-50 text-gray-300 rounded-2xl hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-dashed border-gray-100 mb-8 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-2"><Building2 size={14} className="text-[#C29543]" /> Section Partitions</h4>
                                <span className="text-[10px] font-black text-[#C29543] uppercase tracking-widest italic bg-orange-50 px-3 py-1 rounded-full">{course.sections.length} Active Nodes</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.sections.map((section, idx) => (
                                    <div key={idx} className="p-5 bg-gray-50 border border-gray-100 rounded-[32px] group-hover:bg-white group-hover:border-orange-100 transition-all shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-black text-gray-900 italic tracking-tight">{section.name}</span>
                                            <span className="text-[9px] font-black text-gray-400 italic">#{idx + 1}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-full h-1.5 bg-white border border-gray-50 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#C29543] shadow-lg shadow-orange-100" style={{ width: `${(section.enrolled / section.capacity) * 100}%` }}></div>
                                            </div>
                                            <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase italic">
                                                <span>Load Factor</span>
                                                <span>{section.enrolled} / {section.capacity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <button className="flex-1 py-4 bg-gray-900 text-white rounded-[24px] font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200 flex items-center justify-center gap-2 hover:bg-black active:scale-95"><Users size={12} /> Assign To Section</button>
                            <button className="px-6 py-4 bg-gray-50 border border-gray-100 text-[#C29543] rounded-[24px] hover:bg-white hover:border-[#C29543] transition-all"><Share2 size={16} /></button>
                        </div>
                    </div>
                ))}

                <div className="bg-orange-50/20 p-12 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100 relative min-h-[400px]">
                    <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center text-[#C29543] mb-8 shadow-xl shadow-orange-50 rotate-[-8deg] group-hover:rotate-0 transition-transform">
                        <Plus size={40} />
                    </div>
                    <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-xl underline decoration-orange-100 decoration-4 mb-3 italic tracking-tight">Evolve Structure</h4>
                    <p className="text-[11px] font-bold text-gray-400 max-w-[200px] leading-relaxed uppercase tracking-tighter italic">Define secondary academic tiers or specialized section partitions.</p>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-4">
                        <div className="p-4 bg-white/10 rounded-[28px] border border-white/10 shadow-xl"><MonitorCheck size={28} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Academic Struct Audit</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl italic tracking-tight">Institutional structural nodes are mapped for zero-collision sectioning. Enrollment caps are automatically synchronized with departmental resource capacity trackers.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Verify Structure
                </button>
            </div>
        </div>
    );
};

export default CourseAndSectionSetup;
