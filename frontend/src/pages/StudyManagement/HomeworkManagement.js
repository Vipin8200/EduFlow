import React, { useState } from 'react';
import {
    BookText, Plus, Search, FileEdit,
    CheckSquare, Clock, Users, ArrowRight,
    CheckCircle2, XCircle, MoreVertical, Layout,
    Info, List, Calendar, Filter, Send
} from 'lucide-react';

const mockHomeworks = [
    { id: 1, title: 'Calculus Problem Set 4', subject: 'Mathematics', class: '10-A', deadline: '2024-03-20', submissions: '38/45', status: 'Active' },
    { id: 2, title: 'Chemical Bonding Notes', subject: 'Chemistry', class: '11-B', deadline: '2024-03-22', submissions: '12/32', status: 'Active' },
    { id: 3, title: 'Medieval Wars Essay', subject: 'History', class: '9-C', deadline: '2024-03-15', submissions: '45/45', status: 'Completed' },
];

const HomeworkManagement = () => {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Assignment & Homework</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Set expectations and evaluate student performance in daily tasks.</p>
                </div>
                <button className="flex items-center gap-2 px-8 h-12 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:translate-y-[-2px] hover:shadow-xl transition-all shadow-lg shadow-orange-100 uppercase tracking-widest active:scale-95">
                    <Plus size={18} /> Assign Homework
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Pending Reviews', val: '12 Tasks', icon: <Clock />, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                    { label: 'Total Assigned', val: '145 total', icon: <BookText />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Evaluation Rate', val: '94.2%', icon: <CheckCircle2 />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Active Classes', val: '28 Grades', icon: <Users />, color: 'text-gray-900', bg: 'bg-gray-100' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform duration-500`}>
                            {React.cloneElement(stat.icon, { size: 24 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs & Filters */}
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] relative overflow-hidden">
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl">
                    <button onClick={() => setActiveTab('active')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'active' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}>Active Assignments</button>
                    <button onClick={() => setActiveTab('review')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'review' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}>Awaiting Review</button>
                    <button onClick={() => setActiveTab('archive')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'archive' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-900'}`}>Archive</button>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="relative group max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 transition-colors" size={14} />
                        <input type="text" placeholder="Search by Assignment Title..." className="w-full pl-9 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"><Filter size={18} /></button>
                </div>
            </div>

            {/* Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
                {mockHomeworks.map(hw => (
                    <div key={hw.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden relative border-b-8 border-b-gray-50 group-hover:border-b-[#C29543]">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-gray-900 italic tracking-tight">{hw.title}</h3>
                                    <div className="flex items-center gap-2 group-hover:underline decoration-orange-100 decoration-4">
                                        <span className="text-[10px] font-black text-[#C29543] uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{hw.subject}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{hw.class}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-300 group-hover:text-gray-900 transition-colors cursor-pointer"><MoreVertical size={16} /></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                                <div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic underline decoration-gray-100 underline-offset-4"><Calendar size={10} /> Deadline</div>
                                    <p className="text-sm font-black text-gray-900">{hw.deadline}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic underline decoration-gray-100 underline-offset-4"><CheckSquare size={10} /> Submissions</div>
                                    <p className="text-sm font-black text-gray-900">{hw.submissions}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className={`h-2.5 w-2.5 rounded-full ${hw.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></span>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">{hw.status}</span>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-black text-[#C29543] hover:translate-x-1 transition-transform italic">Review Submissions <ArrowRight size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col items-center justify-center text-center p-12 text-white group cursor-pointer hover:scale-[0.98] transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C29543]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Send size={24} className="text-[#C29543] rotate-[-15deg]" />
                    </div>
                    <h4 className="text-xl font-black italic mb-2 underline decoration-[#C29543]/30 decoration-8 underline-offset-4">Assign New Task</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Distribution</p>
                    <div className="mt-8 px-8 py-3 bg-[#C29543] rounded-2xl font-black text-[10px] uppercase tracking-[4px] shadow-lg shadow-orange-950">Draft Task</div>
                </div>
            </div>

            <div className="mt-12 bg-white rounded-[50px] border border-gray-100 shadow-xl p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-40 h-40 rounded-[50px] bg-gray-50 border border-gray-100 flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer overflow-hidden p-4 group">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HW-QR-902`} alt="QR" className="opacity-10 border border-gray-400 p-2 rounded-xl group-hover:opacity-80 transition-opacity" />
                    </div>
                    <div className="text-center md:text-left space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight italic">Quick Student Feedback</h3>
                            <div className="p-2 bg-orange-50 text-[#C29543] rounded-lg"><Info size={20} /></div>
                        </div>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl italic">Students can scan this weekly QR to upload their homework directly from their device. All submissions are automatically indexed by roll number for easy review.</p>
                    </div>
                </div>
                <div className="flex shrink-0 gap-4">
                    <button className="p-4 bg-gray-50 border border-gray-100 rounded-3xl text-gray-400 hover:text-black transition-all hover:shadow-lg"><FileEdit size={24} /></button>
                    <button className="p-4 bg-gray-50 border border-gray-100 rounded-3xl text-gray-400 hover:text-[#C29543] transition-all hover:shadow-lg"><List size={24} /></button>
                </div>
            </div>
        </div>
    );
};

export default HomeworkManagement;
