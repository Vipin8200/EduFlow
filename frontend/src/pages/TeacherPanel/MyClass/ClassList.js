import React from 'react';
import {
    Users, BookOpen, GraduationCap,
    MoreVertical, Search, Filter,
    CheckCircle2, Clock, ChevronRight
} from 'lucide-react';

const ClassList = () => {
    const assignedClasses = [
        { id: '101', name: 'Grade 10-A', subject: 'Mathematics', students: 42, period: '1st Period', time: '09:00 AM' },
        { id: '102', name: 'Grade 11-B', subject: 'Physics', students: 38, period: '3rd Period', time: '11:00 AM' },
        { id: '103', name: 'Grade 12-C', subject: 'Advanced Algebra', students: 35, period: '5th Period', time: '01:30 PM' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Assigned Academic Units</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Overview of all class partitions and modules currently under your instruction.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Active Units</button>
                        <button className="px-4 py-2 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-gray-900">Historical</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {assignedClasses.map((cls) => (
                    <div key={cls.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-[#C29543]/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            <GraduationCap size={150} />
                        </div>

                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 bg-orange-50 text-[#C29543] rounded-[24px]">
                                <BookOpen size={24} />
                            </div>
                            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors"><MoreVertical size={20} /></button>
                        </div>

                        <div className="space-y-1 mb-8">
                            <h3 className="text-xl font-black text-gray-900 italic tracking-tight uppercase">{cls.name}</h3>
                            <p className="text-[10px] font-black text-[#C29543] uppercase tracking-[3px]">{cls.subject}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-gray-50/50 rounded-3xl text-center">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Capacity</p>
                                <p className="text-sm font-black text-gray-900">{cls.students} Total</p>
                            </div>
                            <div className="p-4 bg-gray-50/50 rounded-3xl text-center">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Period</p>
                                <p className="text-sm font-black text-gray-900">{cls.period}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-gray-300" />
                                <span className="text-[10px] font-black text-gray-500 italic uppercase">{cls.time}</span>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-black text-gray-900 hover:translate-x-1 transition-transform uppercase tracking-widest">
                                View Section <ChevronRight size={14} className="text-[#C29543]" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Summary Card */}
                <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/10 rounded-2xl"><CheckCircle2 size={24} className="text-[#C29543]" /></div>
                            <h3 className="text-lg font-black italic tracking-tight uppercase underline decoration-[#C29543] decoration-8">Workload Index</h3>
                        </div>
                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic mb-8">Your specialized academic load is balanced at 85% capacity. Ensure session logs are committed daily for synchronized reporting.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#C29543]">
                            <span>Daily Commitment</span>
                            <span>12 / 14 Units</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#C29543] rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassList;
